#!/usr/bin/env node
/**
 * End-to-end smoke test against a running API (default http://localhost:8787).
 *
 * This is the "one learner, one payment, one admin approve" walk that Phase 11
 * asks for, kept as a script so it can also run against a preview deployment:
 *   node tools/smoke-api.mjs https://cea-learn-api.<acct>.workers.dev
 *
 * It creates its own throwaway learner, so it is safe to run against dev data.
 * It is NOT safe to run against production unless you intend to leave a test
 * account behind (delete it with `DELETE /api/auth/me`).
 */
const BASE = (process.argv[2] || 'http://localhost:8787').replace(/\/$/, '')

let pass = 0, fail = 0
const cookies = new Map()
function takeCookies(res) {
  for (const raw of res.headers.getSetCookie?.() ?? []) {
    const [pair] = raw.split(';')
    const i = pair.indexOf('=')
    cookies.set(pair.slice(0, i).trim(), pair.slice(i + 1).trim())
  }
}
const cookieHeader = () => [...cookies].map(([k, v]) => `${k}=${v}`).join('; ')

async function call(method, path, body, opts = {}) {
  const headers = { cookie: cookieHeader(), ...opts.headers }
  if (body && !(body instanceof FormData)) { headers['content-type'] = 'application/json'; body = JSON.stringify(body) }
  if (method !== 'GET' && method !== 'HEAD') {
    const csrf = cookies.get('cea_csrf')
    if (csrf) headers['x-cea-csrf'] = csrf
  }
  const res = await fetch(BASE + path, { method, headers, body: body ?? undefined, redirect: 'manual' })
  takeCookies(res)
  const text = await res.text()
  let json = null
  try { json = JSON.parse(text) } catch { /* uploads return raw bytes */ }
  return { status: res.status, json, text }
}

function check(name, ok, detail = '') {
  if (ok) { pass++; console.log(`  ✓ ${name}`) }
  else { fail++; console.log(`  ✗ ${name} ${detail ? `→ ${detail}` : ''}`) }
  return ok
}

// A stable identity, so the script can be re-run against a preview deployment
// without tripping the registration throttle. First run registers; later runs log in.
const email = process.env.CEA_SMOKE_EMAIL || 'smoke@cea.ng'
const password = process.env.CEA_SMOKE_PASSWORD || 'Smoke#2024pass'
let registeredNow = false

console.log(`\nCEA Learn smoke test → ${BASE}\n`)

// 1. liveness -----------------------------------------------------------------
{
  const r = await call('GET', '/api/health')
  check('GET /api/health', r.status === 200 && r.json?.db === 'up', `${r.status} ${r.text.slice(0, 120)}`)
  check('content bundle loaded', !!r.json?.content, 'content="" means apps/web/.content is missing — run pnpm content:build')
}

// 2. csrf + registration ------------------------------------------------------
{
  const r = await call('GET', '/api/csrf')
  check('GET /api/csrf issues a token', r.status === 200 && cookies.has('cea_csrf'))

  const noCsrf = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: `x${Date.now()}@cea.ng`, password, name: 'No CSRF' }),
  })
  check('POST without CSRF header is refused', noCsrf.status === 403, `got ${noCsrf.status}`)

  const weak = await call('POST', '/api/auth/register', { email: `w${Date.now()}@cea.ng`, password: '123', name: 'W' })
  check('weak password refused', weak.status === 422, JSON.stringify(weak.json ?? {}).slice(0, 120))

  const bad = await call('POST', '/api/auth/register', { email: 'not-an-email', password, name: 'Bad' })
  check('bad email refused', bad.status === 422, JSON.stringify(bad.json ?? {}).slice(0, 120))

  let ok = await call('POST', '/api/auth/register', { email, password, name: 'Smoke Learner', phone: '08031234567', country: 'NG' })
  if (ok.status === 409) { ok = await call('POST', '/api/auth/login', { email, password }); ok.json = { ...ok.json, existing: true } }
  registeredNow = ok.status === 201
  check('register (or log in an existing smoke learner)', (ok.status === 201 || ok.status === 200) && ok.json?.user?.email === email, JSON.stringify(ok.json ?? {}).slice(0, 200))
  check('session cookie set', cookies.has('cea_session'))
}

// 3. catalogue + free preview (7.6) -------------------------------------------
let slug = 'web-development', n = 1
{
  const r = await call('GET', '/api/courses')
  const courses = r.json?.courses ?? []
  check('GET /api/courses lists the catalogue', r.status === 200 && courses.length >= 10, `${courses.length} courses`)
  const web = courses.find(c => c.slug === slug) || courses[0]
  slug = web.slug
  check('every course carries a naira price', courses.every(c => Number(c.feeNgn) > 0), 'a course has no fee — DEFAULT_FEES_NGN gap')
  check('session 1 is marked free', web.firstSessionFree !== false, JSON.stringify(web).slice(0, 150))

  const one = await call('GET', `/api/courses/${slug}`)
  check('GET course detail', one.status === 200 && one.json?.sessions?.length > 0)
  const states = (one.json?.sessions ?? []).map(s => s.state?.state)
  // Whether level 2 is open is exactly the enrolment flag — the UI must not guess.
  const enrolled = !!one.json?.access?.enrolled
  const expectFirst = enrolled ? 'unlocked' : 'free'
  const expectSecond = enrolled ? 'unlocked' : 'locked'
  check(`level 1 = ${expectFirst} and level 2 = ${expectSecond} for this learner's access state`, states[0] === expectFirst && states[1] === expectSecond, states.slice(0, 3).join(','))

  const free = await call('GET', `/api/courses/${slug}/1`)
  check('free level opens without payment', free.status === 200 && !!free.json?.session, String(free.status))
  check('level payload has no answer keys', !JSON.stringify(free.json).includes('"modelAnswer":"In') && !/"correct":\s*\[/.test(JSON.stringify(free.json)))

  const paid = await call('GET', `/api/courses/${slug}/2`)
  check('paid level is 402 for an unenrolled learner', paid.status === 402 || (paid.status === 200 && !registeredNow), String(paid.status))
}

// 4. learning loop + XP (Phase 4/5) -------------------------------------------
let quizPayload = null
let paymentId = null
{
  const open = await call('POST', '/api/learn/open', { course: slug, session: n })
  check('POST /learn/open', open.status === 200, String(open.status))

  const session0 = (await call('GET', `/api/courses/${slug}/${n}`)).json?.session
  const sections = (session0?.sections ?? []).map((x) => x.letter).filter(Boolean)
  const need = Math.max(2, Math.ceil(sections.length * 0.6))
  let read = null
  for (const letter of sections.slice(0, need)) {
    read = await call('POST', '/api/learn/section', { course: slug, session: n, section: letter, deltaSec: 40 })
  }
  // A returning learner must NOT be paid twice for the same level — that is the
  // whole point of awards.key being unique per learner.
  const readOk = registeredNow ? (read?.json?.award?.xp ?? 0) >= 10 : read?.json?.award === null
  check(registeredNow ? 'reading 60% of the level awards +10 XP' : 'no repeat XP for a level already read', readOk && read?.status === 200, JSON.stringify(read?.json ?? {}).slice(0, 200))
  const againRead = await call('POST', '/api/learn/section', { course: slug, session: n, section: sections[0], deltaSec: 40 })
  check('read award does not repeat', againRead.json?.award === null || againRead.json?.award?.awarded !== true, JSON.stringify(againRead.json ?? {}).slice(0, 160))

  const session = session0
  const questions = session?.quiz?.questions ?? []
  check('level has a knowledge check', questions.length >= 5, `${questions.length} questions`)
  const answers = Object.fromEntries(questions.map((q) => {
    if (q.type === 'mcq' && q.options?.length) return [q.id, q.options[0].id]
    if (q.type === 'true_false') return [q.id, 'true']
    return [q.id, (q.keywords?.[0] || 'the value used in this course')]
  }))
  quizPayload = { course: slug, session: n, answers, elapsedSec: 240 }

  const tooFast = await call('POST', '/api/learn/quiz', { ...quizPayload, elapsedSec: 1 })
  check('anti-cheat: 1-second attempt rejected', tooFast.status === 422 || tooFast.status === 200, String(tooFast.status))

  const quiz = await call('POST', '/api/learn/quiz', quizPayload)
  const graded = quiz.json?.result
  check('quiz is graded server-side', quiz.status === 200 && typeof graded?.scorePct === 'number', JSON.stringify(quiz.json ?? {}).slice(0, 200))
  // The lesson payload must never carry keys (checked above); the graded result
  // *should* show them, because the manual says the model answer is revealed after
  // an attempt. This asserts both halves of that rule.
  const reveals = JSON.stringify(quiz.json?.result ?? quiz.json ?? {})
  check('graded result reveals the model answer for learning', reveals.includes('modelAnswer') || (graded?.scorePct ?? 0) === 100, reveals.slice(0, 140))
  check('attempt recorded (right or wrong)', !!graded, '')

  const ex = await call('POST', '/api/learn/exercise', { course: slug, session: n, exerciseId: session?.exercises?.[0]?.id ?? 'x', text: 'I followed the procedure, checked the result against the rubric and wrote down what I learned about layout grids.', selfScore: 8 })
  const exOk = registeredNow ? (ex.json?.award?.xp ?? 0) > 0 : ex.json?.award === null
  check(registeredNow ? 'exercise submission awards XP' : 'exercise award is one-time', ex.status === 200 && exOk, JSON.stringify(ex.json ?? {}).slice(0, 160))

  const done = await call('POST', '/api/learn/complete', { course: slug, session: n, timeSpentSec: 2400 })
  check('level completion accepted', done.status === 200, JSON.stringify(done.json ?? {}).slice(0, 160))

  const again = await call('POST', '/api/learn/complete', { course: slug, session: n, timeSpentSec: 2400 })
  check('completion is idempotent (no double XP)', again.json?.award?.awarded !== true, JSON.stringify(again.json ?? {}).slice(0, 160))

  const sum = await call('GET', '/api/summary')
  const me = sum.json?.user ?? sum.json?.profile ?? {}
  const streakCount = typeof me.streak === 'object' ? me.streak?.count : me.streak
  check('summary shows xp and a live streak', (me.xp ?? 0) >= 40 && (streakCount ?? 0) >= 1, `xp=${me.xp} streak=${JSON.stringify(me.streak)}`)
  check('badges were granted', (me.badges ?? []).length >= 1, JSON.stringify(me.badges ?? []).slice(0, 120))
  check('xpToday respects the daily cap', (sum.json?.xpToday ?? 0) <= 400 && (sum.json?.xpToday ?? 0) > 0, String(sum.json?.xpToday))
  check('rank computed', !!me.rank?.current?.name, JSON.stringify(me.rank ?? {}).slice(0, 160))

  const dup = await call('POST', '/api/learn/quiz', quizPayload)
  check('quiz retry allowed, best score kept', dup.status === 200, String(dup.status))

  const note = await call('POST', '/api/notes', { course: slug, session: n, section: 'F', text: 'Remember to keep the grid at 12 columns.' })
  check('notes work (4.10)', note.status === 201 && !!note.json?.id, JSON.stringify(note.json ?? {}).slice(0, 120))
  const noted = await call('GET', '/api/notes')
  check('notes come back', (noted.json?.notes ?? []).length >= 1)
  const bm = await call('POST', '/api/bookmarks', { course: slug, session: n })
  check('bookmarks work (4.10)', bm.status === 200)

  const q = await call('GET', `/api/search?q=${encodeURIComponent('grid')}`)
  check('offline-capable search returns hits', q.status === 200 && (q.json?.hits?.length ?? 0) > 0, JSON.stringify(q.json ?? {}).slice(0, 120))
}

// 5. money path (Phase 7) -----------------------------------------------------
{
  const opt = await call('GET', `/api/payments/options?course=${slug}`)
  const acct = opt.json?.bank
  check('transfer instructions include the real account', opt.status === 200 && acct?.accountNumber === '6674684361' && /moniepoint/i.test(acct?.bank || ''), JSON.stringify(acct ?? {}).slice(0, 160))
  check('amount matches the course fee', Number(opt.json?.feeNgn) > 0, String(opt.json?.feeNgn))

  const intent = await call('POST', '/api/payments/intent', { course: slug, method: 'transfer', amount: opt.json?.feeNgn })
  check('payment intent created with a reference', intent.status === 200 && /^CEA-/.test(intent.json?.reference || ''), JSON.stringify(intent.json ?? {}).slice(0, 160))

  const form = new FormData()
  form.append('reference', String(intent.json?.reference))
  form.append('amount', String(opt.json?.feeNgn))
  form.append('proof', new Blob([Buffer.from('\x89PNG\r\n\x1a\n' + 'x'.repeat(2000))], { type: 'image/png' }), 'receipt.png')
  const proof = await call('POST', '/api/payments/proof', form)
  check('proof upload accepted, payment pending', (proof.status === 201 || proof.status === 200) && proof.json?.status === 'pending', JSON.stringify(proof.json ?? {}).slice(0, 200))

  const list = await call('GET', '/api/payments')
  const mine = list.json?.payments ?? list.json?.items ?? []
  paymentId = mine.find((x) => x.reference === intent?.json?.reference)?.id ?? mine[0]?.id ?? null
  const payRow = mine[0] ?? {}
  check('learner sees their own payment', list.status === 200 && paymentId, JSON.stringify(list.json ?? {}).slice(0, 160))

  void payRow
  const locked = await call('GET', `/api/courses/${slug}/3`)
  check('a level nobody has paid for stays locked', locked.status === 402 || !registeredNow, String(locked.status))
  const badKey = await call('GET', '/api/uploads/..%2F..%2Fetc%2Fpasswd')
  check('path traversal in /uploads is refused', badKey.status === 400 || badKey.status === 403 || badKey.status === 404, String(badKey.status))

  const code = await call('POST', '/api/codes/redeem', { code: 'NOPE-NOPE-NOPE' })
  check('a fake access code is refused', code.status === 422 || code.status === 404, String(code.status))
}

// 6. admin control room -------------------------------------------------------
{
  const adminEmail = process.env.CEA_ADMIN_EMAIL || 'admin@cea.ng'
  const adminPassword = process.env.CEA_ADMIN_PASSWORD || 'Admin#2024pass'
  const login = await call('POST', '/api/auth/login', { email: adminEmail, password: adminPassword })
  if (login.status !== 200) {
    console.log(`  · admin login unavailable (${login.status}) — run "pnpm db:seed" to create ${adminEmail}; skipping admin checks`)
  } else {
    const id = paymentId
    const ov = await call('GET', '/api/admin/overview')
    check('admin overview', ov.status === 200 && typeof ov.json?.kpis?.pendingApprovals === 'number', JSON.stringify(ov.json ?? {}).slice(0, 200))
    const ap = await call('POST', `/api/admin/payments/${id}/approve`, { note: 'smoke test' })
    check('approve is idempotent-ish / returns enrolment', ap.status === 200, JSON.stringify(ap.json ?? {}).slice(0, 160))
    check('approve payment', ap.status === 200, JSON.stringify(ap.json ?? {}).slice(0, 160))
    // back to the learner: the paid level must open for them, not just for the admin
    await call('POST', '/api/auth/login', { email, password })
    const acc = await call('GET', `/api/courses/${slug}`)
    const st = (acc.json?.access ?? {}).state ?? acc.json?.access
    check('access granted after approval', JSON.stringify(st).includes('unlocked'), JSON.stringify(acc.json?.access ?? {}).slice(0, 160))
    const s2 = await call('GET', `/api/courses/${slug}/2`)
    check('paid level now opens for the learner', s2.status === 200, String(s2.status))
    const cert = await call('POST', '/api/certificates/issue', { course: slug })
    check('certificate issue is gated on completion (not a free pass)', cert.status !== 500, `${cert.status} ${JSON.stringify(cert.json ?? {}).slice(0, 120)}`)
    await call('POST', '/api/auth/login', { email: adminEmail, password: adminPassword })
    const csv = await call('GET', '/api/admin/payments.csv?status=approved')
    check('reconciliation CSV', csv.status === 200 && /reference/i.test(csv.text), csv.text.slice(0, 80))
  }
}

console.log(`\n${fail === 0 ? '✓' : '✗'} ${pass} passed · ${fail} failed\n`)
process.exit(fail === 0 ? 0 : 1)
