/**
 * PHASE 7 — money, enrolment and the admin control room.
 *
 * The academy takes payment by bank transfer (Delgra Ltd · 6674684361 ·
 * Moniepoint MFB) and a human approves it, so the loop here is:
 *   intent (unique reference) -> upload proof -> pending -> approve/reject
 *   -> enrolment row -> emails -> access (which 7.5 checks on every lesson).
 * No gateway, no card data, nothing to breach — and the reference code is what
 * ties a bank statement line to a learner, which is how the reconciliation CSV
 * (7.11) can be matched by the accountant.
 */
import { Hono, type Context } from 'hono'
import { PAYMENT, DEFAULT_FEES_NGN, ACCESS, ADS, STREAK, formatNgn } from '@cea/config'
import type { CeaEnv, AuthUser } from './lib.js'
import { ApiError, bad, id, paymentReference, randomBytes, readCookie, sha256hex, rateLimit } from './lib.js'
import { accessFor, award, grant, q, sendMail, dayKey, type Row } from './service.js'
import { rankFor, streakAtRisk } from './gamify.js'

type Vars = { user: AuthUser | null }
type Ctx = Context<{ Bindings: CeaEnv; Variables: Vars }>

const now = () => new Date().toISOString()
const json = (c: Ctx, data: unknown, init?: number) => c.json(data as any, init as any)
const body = async (c: Ctx): Promise<Row> => { try { return (await c.req.json()) as Row } catch { return {} } }
const num = (v: unknown, d = 0) => (typeof v === 'number' ? v : Number(v) || d)
const str = (v: unknown, d = '') => (typeof v === 'string' ? v : v == null ? d : String(v))

function requireAdmin(c: Ctx): AuthUser {
  const u = c.get('user')
  if (!u) throw bad(401, 'Admin sign-in required.', 'auth')
  if (u.role !== 'admin') throw bad(403, 'Admin only.', 'forbidden')
  return u
}

async function feeFor(env: CeaEnv, slug: string): Promise<number | null> {
  const row = await q.one(env, 'SELECT fee_ngn FROM course_pricing WHERE course = ?', slug)
  if (row) return Number(row.fee_ngn)
  const index = await env.CONTENT.index()
  const course = index.courses.find((c: Row) => c.slug === slug)
  return course?.feeNgn ?? (DEFAULT_FEES_NGN as Record<string, number>)[slug] ?? null
}

// ---------------------------------------------------------------------------
// learner side
// ---------------------------------------------------------------------------

export function paymentRoutes() {
  const a = new Hono<any, any, any>()

  a.get('/payments/options', async (c: Ctx) => {
    const slug = str(c.req.query('course'))
    const index = await c.env.CONTENT.index()
    const course = index.courses.find((cc: Row) => cc.slug === slug)
    if (!course) throw bad(404, 'Unknown course.', 'no_course')
    const u = c.get('user')
    const info = await accessFor(c.env, u?.id ?? null, slug)
    return json(c, {
      ok: true,
      course: { slug: course.slug, title: course.displayTitle, sessionsCount: course.sessionsCount, certificate: course.certificate },
      feeNgn: await feeFor(c.env, slug),
      bank: { accountName: PAYMENT.accountName, accountNumber: PAYMENT.accountNumber, bank: PAYMENT.bank, slaHours: PAYMENT.slaHours },
      access: info,
      proofLimits: { maxBytes: PAYMENT.proofMaxBytes, types: PAYMENT.proofTypes },
      alreadyEnrolled: info.enrolled,
    })
  })

  /** 7.2 — mint a reference. The learner writes it into the bank transfer note. */
  a.post('/payments/intent', async (c: Ctx) => {
    const u = c.get('user')
    if (!u || u.isGuest) throw bad(401, 'Create an account before paying — the reference must belong to someone.', 'auth')
    const b = await body(c)
    const slug = str(b.course)
    const index = await c.env.CONTENT.index()
    if (!index.courses.some((cc: Row) => cc.slug === slug)) throw bad(404, 'Unknown course.', 'no_course')
    const existing = await q.one(c.env, "SELECT id, reference, status, created_at FROM payments WHERE user_id = ? AND course = ? AND status IN ('pending','intent') AND intent_only = 1 ORDER BY created_at DESC LIMIT 1", u.id, slug)
    if (existing) return json(c, { ok: true, reused: true, ...existing, bank: bankBlock(), amount: await feeFor(c.env, slug) })
    const ref = paymentReference()
    const fee = await feeFor(c.env, slug)
    await q.run(c.env, `INSERT INTO payments (id,user_id,course,amount_ngn,reference,status,payer_name,created_at,intent_only)
      VALUES (?,?,?,?,?,'pending',?,?,'1')`, id(), u.id, slug, fee ?? 0, ref, u.name, now())
    return json(c, { ok: true, reference: ref, amount: fee, bank: bankBlock(), expiresInHours: 72, instructions: instructions(ref, fee) })
  })

  /** 7.3 — proof of payment upload. Validated, size-capped, stored off-box. */
  a.post('/payments/proof', async (c: Ctx) => {
    const u = requireUserish(c)
    const form = await c.req.formData().catch(() => null)
    if (!form) throw bad(422, 'Upload a screenshot of the transfer (PNG, JPG, WebP or PDF).', 'no_file')
    const reference = str(form.get('reference')).toUpperCase().trim()
    const file = form.get('proof') as File | null
    const note = str(form.get('note')).slice(0, 500)
    const payerName = str(form.get('payerName')).slice(0, 80) || u.name
    const amountRaw = str(form.get('amount'))
    if (!reference) throw bad(422, 'Missing payment reference.', 'bad_reference')
    const row = await q.one(c.env, 'SELECT * FROM payments WHERE reference = ? AND user_id = ?', reference, u.id)
    if (!row) throw bad(404, 'That reference is not on your account. Start from the course page.', 'bad_reference')
    if (row.status === 'approved') throw bad(409, 'This payment is already approved.', 'already_approved')
    if (!file || typeof (file as any).arrayBuffer !== 'function') throw bad(422, 'Attach the transfer receipt image.', 'no_file')
    if ((file as File).size > PAYMENT.proofMaxBytes) throw bad(413, `Receipt image must be under ${Math.round(PAYMENT.proofMaxBytes / 1024 / 1024)} MB — your data bundle needs it too.`, 'too_big')
    const type = (file as File).type
    if (!PAYMENT.proofTypes.includes(type)) throw bad(415, `Unsupported file type (${type || 'unknown'}). Use PNG, JPG, WebP or PDF.`, 'bad_type')
    const buf = await (file as File).arrayBuffer()
    const ext = ({ 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'application/pdf': 'pdf' } as Record<string, string>)[type] || 'bin'
    const key = `proofs/${u.id}/${reference}-${randomBytes(4)}.${ext}`
    await c.env.STORAGE.put(key, buf, type)
    const amount = amountRaw ? Number(amountRaw.replace(/[^\d.]/g, '')) : Number(row.amount_ngn || 0)
    if (amount && amount < 0) throw bad(422, 'Amount cannot be negative.', 'bad_amount')
    await q.run(c.env, "UPDATE payments SET proof_key = ?, proof_mime = ?, proof_size = ?, amount_ngn = ?, payer_name = ?, note = ?, status = 'pending', intent_only = 0, created_at = created_at WHERE id = ?",
      key, type, buf.byteLength, amount || row.amount_ngn, payerName, note, row.id)
    await sendMail(c.env, u.email, 'paymentReceived', { reference, course: row.course, amount: formatNgn(amount || row.amount_ngn), name: u.name })
    return json(c, { ok: true, status: 'pending', reference, uploadedBytes: buf.byteLength }, 201)
  })

  a.get('/payments', async (c: Ctx) => {
    const u = c.get('user')
    if (!u) return json(c, { ok: true, payments: [] })
    const rows = await q.all(c.env, 'SELECT * FROM payments WHERE user_id = ? ORDER BY created_at DESC LIMIT 50', u.id)
    return json(c, {
      ok: true,
      payments: rows.map(r => ({
        id: r.id, course: r.course, amountNgn: r.amount_ngn, reference: r.reference, status: r.status,
        hasProof: !!r.proof_key, proofUrl: r.proof_key ? `/api/uploads/${encodeURIComponent(r.proof_key)}` : null,
        rejectReason: r.reject_reason, reviewedAt: r.reviewed_at, createdAt: r.created_at, intentOnly: !!r.intent_only,
      })),
    })
  })

  a.delete('/payments/:id', async (c: Ctx) => {
    // withdrawing an un-reviewed intent is allowed; approved money is not
    const u = requireUserish(c)
    const row = await q.one(c.env, 'SELECT * FROM payments WHERE id = ? AND user_id = ?', c.req.param('id'), u.id)
    if (!row) throw bad(404, 'Not found.', 'not_found')
    if (row.status === 'approved') throw bad(409, 'This payment was approved. Contact the academy for a refund.', 'locked')
    await q.run(c.env, "UPDATE payments SET status = 'expired' WHERE id = ?", row.id)
    return json(c, { ok: true })
  })

  /** 7.6 — comp / gift / scholarship codes. */
  a.post('/codes/redeem', async (c: Ctx) => {
    const u = requireUserish(c)
    const code = str((await body(c)).code).trim().toUpperCase()
    if (code.length < 4) throw bad(422, 'Enter the access code exactly as the academy gave it.', 'bad_code')
    const row = await q.one(c.env, 'SELECT * FROM access_codes WHERE code = ?', code)
    if (!row) throw bad(404, 'That code is not recognised.', 'bad_code')
    if (row.expires_at && Date.parse(row.expires_at) < Date.now()) throw bad(410, 'That code has expired.', 'expired')
    if (row.used_count >= row.max_uses) throw bad(409, 'That code has already been used up.', 'spent')
    if (await q.one(c.env, 'SELECT user_id FROM access_code_redemptions WHERE code = ? AND user_id = ?', code, u.id)) throw bad(409, 'You already used this code.', 'used')
    await grant(c.env, u.id, row.course, 'code', { by: u.id, note: `code ${code}` })
    await q.run(c.env, 'INSERT INTO access_code_redemptions (code,user_id,redeemed_at) VALUES (?,?,?)', code, u.id, now())
    await q.run(c.env, 'UPDATE access_codes SET used_count = used_count + 1 WHERE code = ?', code)
    await sendMail(c.env, u.email, 'enrolmentGranted', { name: u.name, course: row.course, link: `${c.env.PUBLIC_URL}/courses/${row.course}` })
    return json(c, { ok: true, course: row.course })
  })

  /** uploaded receipts: only the owner or an admin may read them (10.6 IDOR check) */
  a.get('/uploads/:key+', async (c: Ctx) => {
    // `:key+` gives the remainder, but a proxied/rewritten request can hand us an
    // empty param, so fall back to slicing the path — and never trust either.
    const raw = c.req.param('key') || c.req.path.replace(/^[^]*\/uploads\//, '')
    const key = decodeURIComponent(raw || '').replace(/^\.\/+/, '')
    if (!key || key.includes('..') || key.startsWith('/')) throw bad(400, 'That receipt reference is not valid.', 'bad_key')
    const u = c.get('user')
    const owner = key.match(/proofs\/([^/]+)\//)?.[1]
    if (!u || (owner !== u.id && u.role !== 'admin')) throw bad(403, 'That receipt is not yours.', 'forbidden')
    const obj = await c.env.STORAGE.get(key)
    if (!obj?.body) throw bad(404, 'File not found.', 'not_found')
    let bytes: Uint8Array
    if (obj.body instanceof Uint8Array) bytes = obj.body
    else {
      const reader = (obj.body as unknown as ReadableStream<Uint8Array>).getReader()
      const chunks: Uint8Array[] = []
      for (;;) { const { done, value } = await reader.read(); if (done) break; if (value) chunks.push(value) }
      const total = chunks.reduce((n, x) => n + x.length, 0)
      bytes = new Uint8Array(total)
      let at = 0
      for (const ch of chunks) { bytes.set(ch, at); at += ch.length }
    }
    return new Response(bytes as unknown as BodyInit, {
      headers: { 'content-type': obj.contentType || 'application/octet-stream', 'cache-control': 'private, max-age=300', 'x-content-type-options': 'nosniff' },
    })
  })

  // ---- certificates (gap closed; the course docs already promise them) ----
  a.get('/certificates', async (c: Ctx) => {
    const u = requireUserish(c)
    const rows = await q.all(c.env, 'SELECT * FROM certificates WHERE user_id = ? ORDER BY issued_at DESC', u.id)
    return json(c, { ok: true, certificates: rows })
  })

  a.post('/certificates/issue', async (c: Ctx) => {
    const u = requireUserish(c)
    const slug = str((await body(c)).course)
    const index = await c.env.CONTENT.index()
    const course = index.courses.find((cc: Row) => cc.slug === slug)
    if (!course) throw bad(404, 'Unknown course.', 'no_course')
    const progress = await q.all(c.env, 'SELECT session_number, completed_at, quiz_best_pct FROM progress WHERE user_id = ? AND course = ?', u.id, slug)
    const done = progress.filter(p => p.completed_at)
    const required = course.sessionsCount
    const avgQuiz = done.length ? Math.round(done.reduce((n, p) => n + Number(p.quiz_best_pct || 0), 0) / done.length) : 0
    const capstoneDone = done.some(p => p.session_number === required)
    const checks = {
      sessionsCompleted: done.length, sessionsRequired: required,
      avgQuizPct: avgQuiz, avgQuizRequired: 70,
      capstoneDone,
    }
    const eligible = done.length >= required && avgQuiz >= 70 && capstoneDone
    if (!eligible) throw bad(422, 'Not yet — the academy issues a certificate after every level, a 70% average and the capstone.', 'not_eligible', checks)
    const code = await certificateCode(u.id, slug)
    const existing = await q.one(c.env, 'SELECT * FROM certificates WHERE code = ?', code)
    if (!existing) {
      await q.run(c.env, 'INSERT INTO certificates (code,user_id,course,learner_name,issued_at,grade,sessions_completed,avg_quiz_pct,capstone,url) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        code, u.id, slug, u.name, now(), avgQuiz >= 90 ? 'Distinction' : avgQuiz >= 80 ? 'Merit' : 'Pass', done.length, avgQuiz, 1, `${c.env.PUBLIC_URL}/certificate/${code}`)
      await award(c.env, { userId: u.id, kind: 'certificate', key: `cert:${slug}`, course: slug, points: 100 }, { course })
      await sendMail(c.env, u.email, 'certificate', { name: u.name, course: course.displayTitle, code, link: `${c.env.PUBLIC_URL}/certificate/${code}` })
    }
    return json(c, { ok: true, code, checks, url: `/certificate/${code}` })
  })

  a.get('/certificates/verify', async (c: Ctx) => {
    const code = str(c.req.query('code')).trim().toUpperCase()
    if (!code) throw bad(422, 'Provide a verification code.', 'bad_code')
    const row = await q.one(c.env, 'SELECT * FROM certificates WHERE code = ?', code)
    if (!row) return json(c, { ok: true, valid: false }, 404)
    const index = await c.env.CONTENT.index()
    const course = index.courses.find((cc: Row) => cc.slug === row.course)
    return json(c, { ok: true, valid: true, learnerName: row.learner_name, course: course?.displayTitle || row.course, issuedAt: row.issued_at, grade: row.grade, code, sessionsCompleted: row.sessions_completed, avgQuizPct: row.avg_quiz_pct })
  })

  return a
}

const requireUserish = (c: Ctx): AuthUser & { email: string } => {
  const u = c.get('user')
  if (!u) throw bad(401, 'Sign in to continue.', 'auth')
  if (u.banned) throw bad(403, 'This account is suspended.', 'banned')
  return u as any
}
const bankBlock = () => ({ accountName: PAYMENT.accountName, accountNumber: PAYMENT.accountNumber, bank: PAYMENT.bank, slaHours: PAYMENT.slaHours })
const instructions = (ref: string, fee: number | null) => [
  `Transfer ${fee ? formatNgn(fee) : 'the course fee'} to ${PAYMENT.accountName}, ${PAYMENT.accountNumber} (${PAYMENT.bank}).`,
  `Use the reference ${ref} in the bank app's narration/description field.`,
  `Screenshot the successful transfer (date, amount and beneficiary must be visible).`,
  `Upload that screenshot here. An instructor confirms it against the statement — usually inside ${PAYMENT.slaHours} hours.`,
]
async function certificateCode(userId: string, course: string) {
  const h = await sha256hex(`${userId}:${course}:cea-cert-v1`)
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const chunk = (n: number, off: number) => Array.from({ length: n }, (_, i) => alphabet[(parseInt(h.slice(off + i * 2, off + i * 2 + 2), 16)) % alphabet.length]).join('')
  return `CEA-${chunk(3, 0)}-${chunk(4, 6)}`
}

// ---------------------------------------------------------------------------
// admin control room (7.4, 7.8-7.12)
// ---------------------------------------------------------------------------

export function adminRoutes() {
  const a = new Hono<any, any, any>()
  const guard = async (c: any, next: () => Promise<void>) => {
    const headerKey = c.req.header('x-cea-admin-key')
    if (headerKey && c.env.SECRETS.admin && headerKey === c.env.SECRETS.admin) return next()
    requireAdmin(c as Ctx)
    return next()
  }
  a.use('*', guard)

  a.get('/overview', async (c: Ctx) => {
    const since = (days: number) => new Date(Date.now() - days * 864e5).toISOString()
    const one = async (sql: string, ...p: unknown[]) => Number((await q.one(c.env, sql, ...p))?.v ?? 0)
    const [signups7, signups30, active7, active30, revenueAll, revenueMonth, pendingCount, approvedCount, rejectedCount, attempts, paidLearners] = await Promise.all([
      one('SELECT COUNT(*) v FROM users WHERE created_at >= ? AND is_guest = 0', since(7)),
      one('SELECT COUNT(*) v FROM users WHERE created_at >= ? AND is_guest = 0', since(30)),
      one('SELECT COUNT(DISTINCT user_id) v FROM xp_events WHERE created_at >= ?', since(7)),
      one('SELECT COUNT(DISTINCT user_id) v FROM xp_events WHERE created_at >= ?', since(30)),
      one("SELECT COALESCE(SUM(amount_ngn),0) v FROM payments WHERE status = 'approved'"),
      one("SELECT COALESCE(SUM(amount_ngn),0) v FROM payments WHERE status = 'approved' AND substr(coalesce(reviewed_at, created_at),1,7) = ?", now().slice(0, 7)),
      one("SELECT COUNT(*) v FROM payments WHERE status = 'pending' AND intent_only = 0"),
      one("SELECT COUNT(*) v FROM payments WHERE status = 'approved'"),
      one("SELECT COUNT(*) v FROM payments WHERE status = 'rejected'"),
      one('SELECT COUNT(*) v FROM quiz_attempts'),
      one("SELECT COUNT(DISTINCT user_id) v FROM payments WHERE status = 'approved'"),
    ])
    const passRate = await q.one(c.env, 'SELECT AVG(score_pct) avg_pct, SUM(passed) passed, COUNT(*) total FROM quiz_attempts')
    const enrollRows = await q.all(c.env, 'SELECT course, COUNT(*) v FROM enrollments WHERE status = ? GROUP BY course ORDER BY v DESC', 'active')
    const funnel = await courseFunnel(c.env)
    const streaks = await q.all(c.env, 'SELECT streak_count, streak_best, last_active_date FROM users WHERE is_guest = 0 AND banned_at IS NULL ORDER BY streak_count DESC LIMIT 400')
    const today = dayKey(new Date())
    const atRisk = streaks.filter(s => streakAtRisk({ count: Number(s.streak_count), lastActiveDate: s.last_active_date ?? null, freezes: 0 })).length
    const adStats = await q.one(c.env, "SELECT SUM(kind='impression') impressions, SUM(kind='click') clicks, SUM(kind='blocked') blocked FROM ad_events WHERE created_at >= ?", since(30))
    return json(c, {
      ok: true, kpis: {
        signups7, signups30, active7, active30, revenueNgnAll: revenueAll, revenueNgnMonth: revenueMonth,
        pendingApprovals: pendingCount, approvedCount, rejectedCount, paidLearners, quizAttempts: attempts,
        avgQuizPct: Math.round(Number(passRate?.avg_pct || 0)), passRatePct: passRate?.total ? Math.round((Number(passRate.passed) / Number(passRate.total)) * 100) : 0,
        atRiskStreaks: atRisk, adImpressions: Number(adStats?.impressions || 0), adClicks: Number(adStats?.clicks || 0), adBlocked: Number(adStats?.blocked || 0),
        paymentConversion: signups30 ? Math.round((paidLearners / signups30) * 100) : 0,
      },
      enrolmentsByCourse: enrollRows.map(r => ({ course: r.course, count: Number(r.v) })),
      funnel,
      topStreaks: streaks.slice(0, 10).map(s => ({ streak: Number(s.streak_count), best: Number(s.streak_best) })),
      generatedAt: now(), today,
    })
  })

  a.get('/payments', async (c: Ctx) => {
    const status = str(c.req.query('status'), 'pending')
    const limit = Math.min(200, num(c.req.query('limit'), 60))
    const where = status === 'all' ? '' : 'WHERE p.status = ?'
    const args = status === 'all' ? [] : [status]
    const rows = await q.all(c.env, `SELECT p.*, u.email, u.name, u.phone FROM payments p LEFT JOIN users u ON u.id = p.user_id ${where} ORDER BY p.created_at DESC LIMIT ${limit}`, ...args)
    return json(c, {
      ok: true, status,
      payments: rows.map(r => ({
        id: r.id, reference: r.reference, status: r.status, amountNgn: r.amount_ngn, course: r.course,
        user: { id: r.user_id, name: r.name, email: r.email, phone: r.phone }, payerName: r.payer_name, note: r.note,
        proofUrl: r.proof_key ? `/api/uploads/${encodeURIComponent(r.proof_key)}` : null, proofMime: r.proof_mime, proofSize: r.proof_size,
        createdAt: r.created_at, reviewedAt: r.reviewed_at, reviewedBy: r.reviewed_by, rejectReason: r.reject_reason,
        intentOnly: !!r.intent_only, waitingHours: Math.round((Date.now() - Date.parse(r.created_at)) / 36e5),
      })),
    })
  })

  /** 7.4 — the human gate. Approving here is what actually grants access. */
  a.post('/payments/:id/approve', async (c: Ctx) => {
    const admin = requireAdmin(c)
    const b = await body(c)
    const row = await q.one(c.env, 'SELECT * FROM payments WHERE id = ?', c.req.param('id'))
    if (!row) throw bad(404, 'Payment not found.', 'not_found')
    if (row.status === 'approved') return json(c, { ok: true, already: true })
    if (!row.proof_key && !b.force) throw bad(422, 'No receipt attached to this reference yet — reject it or wait for the learner to upload.', 'no_proof')
    const amount = num(b.amountNgn, Number(row.amount_ngn || 0))
    await q.run(c.env, "UPDATE payments SET status='approved', reviewed_at=?, reviewed_by=?, amount_ngn=?, note = COALESCE(?, note) WHERE id=?", now(), admin.id, amount, str(b.note) || row.note, row.id)
    await grant(c.env, row.user_id, row.course, 'payment', { by: admin.id, note: `ref ${row.reference}`, paymentId: row.id })
    const user = await q.one(c.env, 'SELECT email,name FROM users WHERE id = ?', row.user_id)
    if (user?.email && !user.email.endsWith('@guest.invalid')) {
      const index = await c.env.CONTENT.index()
      const course = index.courses.find((cc: Row) => cc.slug === row.course)
      await sendMail(c.env, user.email, 'paymentApproved', { name: user.name, course: course?.displayTitle || row.course, link: `${c.env.PUBLIC_URL}/courses/${row.course}` })
    }
    await q.run(c.env, 'INSERT INTO audit_log (id,actor_id,action,target,meta,created_at) VALUES (?,?,?,?,?,?)', id(), admin.id, 'payment.approve', row.reference, JSON.stringify({ amount, course: row.course }), now())
    await award(c.env, { userId: row.user_id, kind: 'badge', key: `paid:${row.id}`, course: row.course, points: 0 })
    return json(c, { ok: true, enrolled: true })
  })

  a.post('/payments/:id/reject', async (c: Ctx) => {
    const admin = requireAdmin(c)
    const b = await body(c)
    const reason = str(b.reason).slice(0, 400)
    if (reason.length < 5) throw bad(422, 'Tell the learner what is wrong so they can fix it.', 'reason_required')
    const row = await q.one(c.env, 'SELECT * FROM payments WHERE id = ?', c.req.param('id'))
    if (!row) throw bad(404, 'Payment not found.', 'not_found')
    await q.run(c.env, "UPDATE payments SET status='rejected', reviewed_at=?, reviewed_by=?, reject_reason=? WHERE id=?", now(), admin.id, reason, row.id)
    const user = await q.one(c.env, 'SELECT email,name FROM users WHERE id = ?', row.user_id)
    if (user?.email && !user.email.endsWith('@guest.invalid')) {
      const index = await c.env.CONTENT.index()
      await sendMail(c.env, user.email, 'paymentRejected', { name: user.name, course: index.courses.find((cc: Row) => cc.slug === row.course)?.displayTitle || row.course, reason, link: `${c.env.PUBLIC_URL}/checkout/${row.course}` })
    }
    await q.run(c.env, 'INSERT INTO audit_log (id,actor_id,action,target,meta,created_at) VALUES (?,?,?,?,?,?)', id(), admin.id, 'payment.reject', row.reference, JSON.stringify({ reason }), now())
    return json(c, { ok: true })
  })

  a.post('/grant', async (c: Ctx) => {
    const admin = requireAdmin(c)
    const b = await body(c)
    const slug = str(b.course)
    const index = await c.env.CONTENT.index()
    if (!index.courses.some((cc: Row) => cc.slug === slug)) throw bad(404, 'Unknown course.', 'no_course')
    const user = b.userId ? await q.one(c.env, 'SELECT * FROM users WHERE id = ?', str(b.userId))
      : await q.one(c.env, 'SELECT * FROM users WHERE lower(email) = ?', str(b.email).trim().toLowerCase())
    if (!user) throw bad(404, 'No learner with that email. Ask them to register first.', 'no_user')
    await grant(c.env, user.id, slug, str(b.source, 'grant') as any, { by: admin.id, note: str(b.note) })
    await q.run(c.env, 'INSERT INTO audit_log (id,actor_id,action,target,meta,created_at) VALUES (?,?,?,?,?,?)', id(), admin.id, 'enrol.grant', `${user.email}/${slug}`, JSON.stringify({ note: str(b.note) }), now())
    if (user.email && !user.email.endsWith('@guest.invalid')) await sendMail(c.env, user.email, 'enrolmentGranted', { name: user.name, course: slug, link: `${c.env.PUBLIC_URL}/courses/${slug}`, note: str(b.note) })
    return json(c, { ok: true, user: user.email, course: slug })
  })

  a.post('/revoke', async (c: Ctx) => {
    const admin = requireAdmin(c)
    const b = await body(c)
    const enrol = await q.one(c.env, 'SELECT * FROM enrollments WHERE user_id=? AND course=?', str(b.userId), str(b.course))
    if (!enrol) throw bad(404, 'No enrolment for that learner and course.', 'not_found')
    await q.run(c.env, "UPDATE enrollments SET status='revoked', revoked_at=?, revoke_reason=? WHERE id=?", now(), str(b.reason).slice(0, 300) || 'revoked by admin', enrol.id)
    await q.run(c.env, 'INSERT INTO audit_log (id,actor_id,action,target,meta,created_at) VALUES (?,?,?,?,?,?)', id(), admin.id, 'enrol.revoke', `${str(b.userId)}/${str(b.course)}`, JSON.stringify({ reason: str(b.reason) }), now())
    return json(c, { ok: true })
  })

  a.get('/users', async (c: Ctx) => {
    const query = str(c.req.query('q')).trim()
    const limit = Math.min(100, num(c.req.query('limit'), 30))
    const like = `%${query}%`
    const rows = query
      ? await q.all(c.env, `SELECT * FROM users WHERE email LIKE ? OR name LIKE ? OR phone LIKE ? ORDER BY created_at DESC LIMIT ${limit}`, like, like, like)
      : await q.all(c.env, `SELECT * FROM users ORDER BY created_at DESC LIMIT ${limit}`)
    const out = []
    for (const u of rows) {
      const enrols = await q.all(c.env, 'SELECT course, source, status, created_at, expires_at FROM enrollments WHERE user_id = ?', u.id)
      const done = await q.all(c.env, 'SELECT course, COUNT(*) c FROM progress WHERE user_id = ? AND completed_at IS NOT NULL GROUP BY course', u.id)
      out.push({
        id: u.id, email: u.email, name: u.name, phone: u.phone, role: u.role, isGuest: !!u.is_guest, banned: !!u.banned_at, bannedReason: u.banned_reason,
        xp: u.xp, rank: rankFor(u.xp || 0).current.name, streak: u.streak_count, best: u.streak_best, joinedAt: u.created_at, lastActive: u.last_active_date,
        enrolments: enrols, completed: Object.fromEntries(done.map(d => [d.course, Number(d.c)])),
        payments: (await q.all(c.env, 'SELECT reference, amount_ngn, status, course, created_at FROM payments WHERE user_id = ? ORDER BY created_at DESC LIMIT 10', u.id)),
      })
    }
    return json(c, { ok: true, users: out })
  })

  a.post('/users/:id/ban', async (c: Ctx) => {
    const admin = requireAdmin(c)
    const b = await body(c)
    await q.run(c.env, 'UPDATE users SET banned_at = ?, banned_reason = ? WHERE id = ?', now(), str(b.reason).slice(0, 300) || 'policy', c.req.param('id'))
    await q.run(c.env, 'DELETE FROM auth_sessions WHERE user_id = ?', c.req.param('id'))
    await q.run(c.env, 'INSERT INTO audit_log (id,actor_id,action,target,meta,created_at) VALUES (?,?,?,?,?,?)', id(), admin.id, 'user.ban', c.req.param('id'), JSON.stringify(b), now())
    return json(c, { ok: true })
  })
  a.post('/users/:id/unban', async (c: Ctx) => {
    const admin = requireAdmin(c)
    await q.run(c.env, 'UPDATE users SET banned_at = NULL, banned_reason = NULL WHERE id = ?', c.req.param('id'))
    await q.run(c.env, 'INSERT INTO audit_log (id,actor_id,action,target,meta,created_at) VALUES (?,?,?,?,?,?)', id(), admin.id, 'user.unban', c.req.param('id'), '{}', now())
    return json(c, { ok: true })
  })
  /** 7.8 — manual XP fix (e.g. after a support call). Audited, and it cannot bypass the ledger. */
  a.post('/users/:id/xp', async (c: Ctx) => {
    const admin = requireAdmin(c)
    const b = await body(c)
    const delta = num(b.delta)
    if (!delta) throw bad(422, 'delta must be a non-zero number.', 'bad_delta')
    if (Math.abs(delta) > 2000) throw bad(422, 'Adjustments above ±2000 XP need a second admin — do it in two steps.', 'too_big')
    const user = await q.one(c.env, 'SELECT xp FROM users WHERE id = ?', c.req.param('id'))
    if (!user) throw bad(404, 'No such learner.', 'not_found')
    await q.run(c.env, 'UPDATE users SET xp = MAX(0, xp + ?), updated_at = ? WHERE id = ?', delta, now(), c.req.param('id'))
    await q.run(c.env, 'INSERT INTO xp_events (id,user_id,kind,points,award_key,created_at) VALUES (?,?,?,?,?,?)',
      id(), c.req.param('id'), 'admin_adjust', delta, `admin-xp:${Date.now()}:${admin.id}`, now())
    await q.run(c.env, 'INSERT INTO audit_log (id,actor_id,action,target,meta,created_at) VALUES (?,?,?,?,?,?)', id(), admin.id, 'user.xp', c.req.param('id'), JSON.stringify({ delta, reason: str(b.reason) }), now())
    return json(c, { ok: true, xp: Number(user.xp) + delta })
  })
  a.post('/users/:id/reset-password', async (c: Ctx) => {
    const admin = requireAdmin(c)
    const temp = `CEA-${randomBytes(5).replace(/[^a-zA-Z0-9]/g, '').slice(0, 8)}!`
    const { hashPassword } = await import('./lib.js')
    await q.run(c.env, 'UPDATE users SET password_hash = ? WHERE id = ?', await hashPassword(temp), c.req.param('id'))
    await q.run(c.env, 'DELETE FROM auth_sessions WHERE user_id = ?', c.req.param('id'))
    await q.run(c.env, 'INSERT INTO audit_log (id,actor_id,action,target,meta,created_at) VALUES (?,?,?,?,?,?)', id(), admin.id, 'user.reset_password', c.req.param('id'), '{}', now())
    return json(c, { ok: true, temporaryPassword: temp, note: 'Send this to the learner once, then make them change it.' })
  })

  a.get('/content', async (c: Ctx) => {
    const report = await c.env.CONTENT.report()
    const stats = await q.all(c.env, `SELECT course, session_number, COUNT(*) learners, AVG(quiz_best_pct) avg_quiz, SUM(CASE WHEN completed_at IS NOT NULL THEN 1 ELSE 0 END) done
      FROM progress GROUP BY course, session_number ORDER BY course, session_number`)
    return json(c, {
      ok: true, report,
      sessions: stats.map(s => ({ course: s.course, session: s.session_number, learners: Number(s.learners), avgQuizPct: Math.round(Number(s.avg_quiz || 0)), completed: Number(s.done) })),
      rebuild: { command: 'pnpm content:build', note: 'run in CI or locally; the app serves the generated bundle', hotReload: 'pnpm --filter @cea/content watch' },
    })
  })

  a.get('/settings', async (c: Ctx) => {
    const rows = await q.all(c.env, 'SELECT * FROM settings')
    const pricing = await q.all(c.env, 'SELECT * FROM course_pricing')
    const codes = await q.all(c.env, 'SELECT * FROM access_codes ORDER BY created_at DESC LIMIT 50')
    const index = await c.env.CONTENT.index()
    return json(c, {
      ok: true, settings: Object.fromEntries(rows.map(r => [r.key, safe(r.value)])),
      pricing: pricing.map(p => ({ course: p.course, feeNgn: p.fee_ngn, updatedAt: p.updated_at })),
      defaults: { fees: DEFAULT_FEES_NGN, access: ACCESS, ads: { enabled: ADS.enabled, policy: ADS.policy }, streak: STREAK },
      courses: index.courses.map((cc: Row) => ({ slug: cc.slug, title: cc.displayTitle, feeNgn: cc.feeNgn, sessions: cc.sessionsCount })),
      accessCodes: codes,
    })
  })

  a.patch('/settings', async (c: Ctx) => {
    const admin = requireAdmin(c)
    const b = await body(c)
    if (b.pricing && typeof b.pricing === 'object') {
      for (const [slug, fee] of Object.entries(b.pricing as Record<string, unknown>)) {
        const n = Math.round(Number(fee))
        if (!Number.isFinite(n) || n < 0 || n > 10_000_000) throw bad(422, `Bad fee for ${slug}.`, 'bad_fee')
        await q.run(c.env, `INSERT INTO course_pricing (course,fee_ngn,updated_at,updated_by) VALUES (?,?,?,?)
          ON CONFLICT(course) DO UPDATE SET fee_ngn = excluded.fee_ngn, updated_at = excluded.updated_at, updated_by = excluded.updated_by`,
          slug, n, now(), admin.id)
      }
    }
    if (b.access && typeof b.access === 'object') {
      await setSetting(c.env, admin.id, 'access', { mode: str((b.access as any).mode, ACCESS.mode), monthsWhenTimed: num((b.access as any).monthsWhenTimed, ACCESS.monthsWhenTimed) })
    }
    if (b.ads && typeof b.ads === 'object') {
      await setSetting(c.env, admin.id, 'ads', { enabled: !!(b.ads as any).enabled, maxPerView: num((b.ads as any).maxPerView, ADS.policy.maxPerView) })
    }
    if (b.announcement) await setSetting(c.env, admin.id, 'announcement', { text: str(b.announcement).slice(0, 240), at: now() })
    await q.run(c.env, 'INSERT INTO audit_log (id,actor_id,action,target,meta,created_at) VALUES (?,?,?,?,?,?)', id(), admin.id, 'settings.patch', 'settings', JSON.stringify(Object.keys(b)), now())
    return json(c, { ok: true })
  })

  a.post('/access-codes', async (c: Ctx) => {
    const admin = requireAdmin(c)
    const b = await body(c)
    const slug = str(b.course)
    const index = await c.env.CONTENT.index()
    if (!index.courses.some((cc: Row) => cc.slug === slug)) throw bad(404, 'Unknown course.', 'no_course')
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const code = `CEA-${Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')}`
    await q.run(c.env, 'INSERT INTO access_codes (code,course,kind,max_uses,note,created_by,created_at,expires_at) VALUES (?,?,?,?,?,?,?,?)',
      code, slug, str(b.kind, 'comp'), Math.max(1, num(b.maxUses, 1)), str(b.note).slice(0, 200), admin.id, now(),
      b.expiresInDays ? new Date(Date.now() + num(b.expiresInDays, 30) * 864e5).toISOString() : null)
    return json(c, { ok: true, code }, 201)
  })

  /** 7.11 — reconciliation CSV, matching what the Delgra Ltd statement shows. */
  a.get('/payments.csv', async (c: Ctx) => {
    const from = str(c.req.query('from'), '0000-01-01')
    const to = str(c.req.query('to'), '9999-12-31')
    const rows = await q.all(c.env, `SELECT p.*, u.email, u.phone FROM payments p LEFT JOIN users u ON u.id = p.user_id
      WHERE p.status = 'approved' AND substr(coalesce(p.reviewed_at, p.created_at),1,10) BETWEEN ? AND ? ORDER BY coalesce(p.reviewed_at,p.created_at) ASC`, from.slice(0, 10), to.slice(0, 10))
    const esc = (v: unknown) => { const s2 = v == null ? '' : String(v); return /[",\n]/.test(s2) ? `"${s2.replace(/"/g, '""')}"` : s2 }
    const head = ['reviewed_at', 'reference', 'learner', 'email', 'phone', 'course', 'amount_ngn', 'status', 'bank', 'account']
    const lines = [head.join(',')]
    let total = 0
    for (const r of rows) {
      total += Number(r.amount_ngn || 0)
      lines.push([r.reviewed_at || r.created_at, r.reference, r.email?.split('@')[0] || r.user_id, r.email, r.phone, r.course, r.amount_ngn, r.status, PAYMENT.bank, PAYMENT.accountNumber].map(esc).join(','))
    }
    lines.push(['# total', '', '', '', '', `${rows.length} approved payments`, String(total), '', '', ''].join(','))
    return new Response(lines.join('\n') + '\n', {
      headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="cea-revenue-${from}-to-${to}.csv"`, 'cache-control': 'no-store' },
    })
  })

  a.get('/audit', async (c: Ctx) => {
    const rows = await q.all(c.env, 'SELECT * FROM audit_log ORDER BY created_at DESC LIMIT 100')
    const emails = await q.all(c.env, 'SELECT * FROM email_log ORDER BY created_at DESC LIMIT 40')
    return json(c, { ok: true, audit: rows, emails })
  })

  /** 5.8 + 11.5 — streak nudges and weekly digest. Point a Cloudflare Cron Trigger at this. */
  a.post('/nudges/run', async (c: Ctx) => {
    const b = await body(c)
    // the cron calls this with a query string (no JSON body), admins call it with a body
    const kind = c.req.query('kind') || str(b.kind, 'streak')
    const today = dayKey(new Date())
    let sent = 0
    if (kind === 'streak' || kind === 'both') {
      const rows = await q.all(c.env, `SELECT id, email, name, streak_count, last_active_date FROM users
        WHERE is_guest = 0 AND banned_at IS NULL AND streak_count > 0 AND last_active_date = ? LIMIT 500`, new Date(Date.now() - 864e5).toISOString().slice(0, 10))
      for (const u of rows) {
        if (!u.email || u.email.endsWith('@guest.invalid')) continue
        const key = `nudge:streak:${u.id}:${today}`
        if (await c.env.KV.get(key)) continue
        await c.env.KV.put(key, '1', { expirationTtl: 86400 * 2 })
        await sendMail(c.env, u.email, 'streakAtRisk', { name: u.name, streak: u.streak_count, link: c.env.PUBLIC_URL })
        sent++
      }
    }
    if (kind === 'digest' || kind === 'both') {
      const rows = await q.all(c.env, `SELECT id, email, name, xp, streak_count FROM users WHERE is_guest = 0 AND banned_at IS NULL AND last_active_date >= ? LIMIT 500`, new Date(Date.now() - 14 * 864e5).toISOString())
      for (const u of rows) {
        if (!u.email || u.email.endsWith('@guest.invalid')) continue
        const key = `nudge:digest:${u.id}:${today}`
        if (await c.env.KV.get(key)) continue
        const weekXp = Number((await q.one(c.env, 'SELECT COALESCE(SUM(points),0) v FROM xp_events WHERE user_id=? AND created_at >= ?', u.id, new Date(Date.now() - 7 * 864e5).toISOString()))?.v ?? 0)
        const courses = Number((await q.one(c.env, 'SELECT COUNT(*) v FROM enrollments WHERE user_id=? AND status=?', u.id, 'active'))?.v ?? 0)
        await c.env.KV.put(key, '1', { expirationTtl: 86400 * 7 })
        await sendMail(c.env, u.email, 'weeklyDigest', { name: u.name, xp: weekXp, streak: u.streak_count, courses, link: c.env.PUBLIC_URL })
        sent++
      }
    }
    return json(c, { ok: true, sent, kind })
  })

  return a
}

async function setSetting(env: CeaEnv, actorId: string, key: string, value: unknown) {
  await q.run(env, `INSERT INTO settings (key, value, updated_at, updated_by) VALUES (?,?,?,?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at, updated_by = excluded.updated_by`,
    key, JSON.stringify(value), now(), actorId)
}

const safe = (s: string) => { try { return JSON.parse(s) } catch { return s } }

async function courseFunnel(env: CeaEnv) {
  const index = await env.CONTENT.index()
  const rows = await q.all(env, `SELECT course, session_number, COUNT(*) AS n FROM progress WHERE completed_at IS NOT NULL GROUP BY course, session_number`)
  const byCourse = new Map<string, Map<number, number>>()
  for (const r of rows) {
    if (!byCourse.has(r.course)) byCourse.set(r.course, new Map())
    byCourse.get(r.course)!.set(Number(r.session_number), Number(r.n))
  }
  return index.courses.map((c: Row) => {
    const m = byCourse.get(c.slug) || new Map<number, number>()
    const total = Math.max(1, ...[...m.values()])
    const at = (n: number) => m.get(Math.max(1, Math.min(c.sessionsCount, Math.ceil(c.sessionsCount * n)))) || 0
    return {
      course: c.slug, title: c.displayTitle, learners: total, sessions: c.sessionsCount,
      steps: [0.02, 0.25, 0.5, 0.75, 1].map(p => ({ pct: Math.round(p * 100), count: at(p) })),
      completionRatePct: Math.round(((m.get(c.sessionsCount) || 0) / total) * 100),
    }
  }).sort((a, b) => b.learners - a.learners)
}
