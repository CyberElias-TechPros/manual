/**
 * CEA Learn API — every route in one place so the Worker and the Next.js
 * server expose byte-identical surfaces.
 *
 * Roadmap coverage: 3.2-3.8 (auth), 4.2/4.3/4.5/4.6/4.7/4.10/4.11 (learning
 * loop), 5.1-5.9 (gamification), 6.1/6.6/6.7/6.9 (interactive scoring),
 * 7.1-7.12 (money + admin), 8.8 (ad telemetry), certificates (gap fix).
 */
import { Hono, type Context } from 'hono'
import { XP, PAYMENT, DEFAULT_FEES_NGN, ACCESS, ADS, formatNgn, RANKS, STREAK, RATE_LIMITS, GAME } from '@cea/config'
import type { CeaEnv, AuthUser } from './lib.js'
import {
  ApiError, bad, cookie, csrfPair, hashPassword, id, verifyPassword,
  normalizePhone, passwordProblem, paymentReference, randomBytes, readCookie, SESSION_COOKIE,
  CSRF_COOKIE, EMAIL_RE, NG_NAIRA_RE, rateLimit, sha256hex,
} from './lib.js'
import { accessFor, assertAccess, award, currentUser, getProgress, grant, issueSession, q, sendMail, upsertProgress, isoWeek, accessPolicy, dayKey, type Row } from './service.js'
import { grade } from './scoring.js'
import { lockState, rankFor, starsFor, questFor, streakAtRisk, BADGES, spinRoll, comboBonus, longestCorrectRun } from './gamify.js'

type Vars = { user: AuthUser | null }
type Ctx = Context<{ Bindings: CeaEnv; Variables: Vars }>

const now = () => new Date().toISOString()
const json = (c: Ctx, data: unknown, init?: number) => c.json(data as any, init as any)
const body = async (c: Ctx): Promise<Row> => { try { return (await c.req.json()) as Row } catch { return {} } }
const num = (v: unknown, d = 0) => (typeof v === 'number' && Number.isFinite(v) ? v : typeof v === 'string' && v.trim() !== '' && Number.isFinite(Number(v)) ? Number(v) : d)
const str = (v: unknown, d = '') => (typeof v === 'string' ? v : typeof v === 'number' ? String(v) : d)
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const sessionSlug = (n: number) => `session-${String(num(n)).padStart(2, '0')}`

// ---------------------------------------------------------------------------
// middleware
// ---------------------------------------------------------------------------

export function middleware(app: Hono<any, any, any>) {
  app.use('*', async (c, next) => {
    const user = await currentUser(c.env, c.req.header('cookie') ?? null)
    c.set('user', user)
    await next()
  })

  // 3.8 CSRF: double-submit cookie. The cookie is readable by JS, the header is not forged cross-site.
  // Server-to-server admin/cron calls carrying the secret `x-cea-admin-key` bypass cookie CSRF.
  app.use('/api/*', async (c, next) => {
    if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(c.req.method)) {
      const adminKey = c.req.header('x-cea-admin-key')
      if (adminKey && c.env.SECRETS.admin && adminKey === c.env.SECRETS.admin) return next()
      const cookieVal = readCookie(c.req.header('cookie') ?? null, CSRF_COOKIE)
      const header = c.req.header('x-cea-csrf')
      if (!cookieVal || !header || header !== cookieVal) {
        throw bad(403, 'Missing or mismatched CSRF token. Reload the page and try again.', 'csrf')
      }
    }
    await next()
  })
}

/**
 * The client may name a section by letter ("F"), by kind ("lecture") or by its
 * heading ("F. Lecture") — all three are how different screens refer to it.
 * Progress is stored as letters so the map and the API agree.
 */
/** Gap answers are code fragments: compare on alphanumerics only, case-insensitive. */
function normalizeAnswer(v: string): string {
  return String(v || '').toLowerCase().replace(/[^a-z0-9₦]+/g, '')
}

function resolveSection(raw: string, lesson: any): string {
  const v = raw.trim()
  if (!v) return ''
  const letter = /^\(?([A-O])\)?$/i.exec(v)?.[1]?.toUpperCase()
  if (letter) return letter
  const lead = /^([A-O])[).\s]/i.exec(v)?.[1]?.toUpperCase()
  const byKind = (lesson?.sections ?? []).find((ss: any) => (ss.kind || '').toLowerCase() === v.toLowerCase() || (ss.title || '').toLowerCase() === v.toLowerCase())
  if (byKind?.letter) return String(byKind.letter).toUpperCase()
  return lead ?? ''
}

/** Best-effort client IP: CF adds the header; the Node dev server does not. */
function ipOf(c: Ctx): string {
  return c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
}

function requireUser(c: Ctx): AuthUser {
  const u = c.get('user')
  if (!u) throw bad(401, 'Sign in to continue.', 'auth')
  if (u.banned) throw bad(403, 'This account was suspended by the academy. Contact hello@cea.ng.', 'banned')
  return u
}
function requireAdmin(c: Ctx): AuthUser {
  const u = requireUser(c)
  if (u.role !== 'admin') throw bad(403, 'Admin only.', 'forbidden')
  return u
}

/** 7.6 — free-preview tagging is enforced here, not in the UI (2.11). */
async function loadSession(env: CeaEnv, courseSlug: string, n: number) {
  const bundle = await env.CONTENT.course(courseSlug)
  if (!bundle) throw bad(404, 'Unknown course.', 'no_course')
  const session = bundle.sessions.find(s => s.number === num(n))
  if (!session) throw bad(404, 'Unknown level in this course.', 'no_session')
  return { course: bundle.course, session }
}

// ---------------------------------------------------------------------------
// auth (Phase 3)
// ---------------------------------------------------------------------------

export function authRoutes() {
  const a = new Hono<any, any, any>()

  a.post('/register', async (c: Ctx) => {
    const ip = ipOf(c)
    const rl = await rateLimit(c.env.KV, `register:${ip}`, RATE_LIMITS.register.limit, RATE_LIMITS.register.windowSec, c.env.ENV)
    if (!rl.ok) throw bad(429, 'Too many attempts from this connection. Try again in a little while.', 'rate_limited', { retryAfter: rl.retryAfter })

    const b = await body(c)
    const email = str(b.email).trim().toLowerCase()
    const name = str(b.name).trim().replace(/\s+/g, ' ').slice(0, 60)
    const password = str(b.password)
    const phone = b.phone ? normalizePhone(str(b.phone)) : null

    if (!EMAIL_RE.test(email)) throw bad(422, 'That email address does not look right.', 'bad_email')
    if (email.length > 160) throw bad(422, 'Email too long.', 'bad_email')
    if (name.length < 2) throw bad(422, 'Tell us what to call you.', 'bad_name')
    const pwProblem = passwordProblem(password)
    if (pwProblem) throw bad(422, pwProblem, 'weak_password')
    if (b.phone && !phone) throw bad(422, 'Nigerian mobile numbers look like 08031234567 or +234 803 123 4567.', 'bad_phone')

    if (await q.one(c.env, 'SELECT id FROM users WHERE email = ?', email)) {
      throw bad(409, 'That email already has an account. Use “Forgot password” if you need back in.', 'email_taken')
    }
    const hash = await hashPassword(password)
    const userId = id()
    await q.run(c.env, `INSERT INTO users (id,email,phone,name,password_hash,role,is_guest,avatar_seed,xp,streak_count,streak_best,streak_freezes,leaderboard_opt_in,created_at,updated_at)
      VALUES (?,?,?,?,?,'learner',0,?,0,0,0,0,1,?,?)`,
      userId, email, phone, name, hash, userId.slice(0, 8), now(), now())
    await ensureBadges(c.env)

    const token = await issueSession(c.env, userId, { ua: c.req.header('user-agent') ?? undefined, ip })
    const csrf = csrfPair(c)
    await sendMail(c.env, email, 'welcome', { name })
    // guest progress is never thrown away (3.5)
    const guestId = str(b.guestId)
    if (guestId) await mergeGuest(c.env, guestId, userId)

    return withSession(c, json(c, { ok: true, user: await profileOf(c.env, userId), csrf }, 201), token, csrf)

  })

  a.post('/login', async (c: Ctx) => {
    const b = await body(c)
    const email = str(b.email).trim().toLowerCase()
    const password = str(b.password)
    const ip = ipOf(c)
    const throttle = await rateLimit(c.env.KV, `login:${email || 'anon'}`, RATE_LIMITS.login.limit, RATE_LIMITS.login.windowSec, c.env.ENV)
    const ipThrottle = await rateLimit(c.env.KV, `login-ip:${ip}`, RATE_LIMITS.loginPerIp.limit, RATE_LIMITS.loginPerIp.windowSec, c.env.ENV)
    if (!throttle.ok || !ipThrottle.ok) {
      throw bad(429, 'Too many tries. Wait five minutes, or reset your password.', 'rate_limited', { retryAfter: 300 })
    }
    const row = email ? await q.one(c.env, 'SELECT * FROM users WHERE email = ?', email) : null
    // generic error: never reveal whether the account exists (3.8)
    if (!row || !(await verifyPassword(password, row.password_hash))) {
      throw bad(401, 'Email or password is not right.', 'bad_credentials')
    }
    if (row.banned_at) throw bad(403, `This account is suspended: ${row.banned_reason || 'contact the academy'}`, 'banned')
    if (row.is_guest) {
      throw bad(401, 'That is a guest account. Create a password to keep your progress.', 'guest')
    }
    const token = await issueSession(c.env, row.id, { ua: c.req.header('user-agent') ?? undefined, ip })
    const csrf = csrfPair(c)
    return withSession(c, json(c, { ok: true, user: await profileOf(c.env, row.id), csrf }), token, csrf)
  })

  a.post('/guest', async (c: Ctx) => {
    const guestId = id()
    await q.run(c.env, `INSERT INTO users (id,email,name,password_hash,role,is_guest,avatar_seed,created_at)
      VALUES (?,?,'Guest learner','!','learner',1,?,?)`, guestId, `${guestId}@guest.invalid`, guestId.slice(0, 8), now())
    const token = await issueSession(c.env, guestId, { ua: c.req.header('user-agent') ?? undefined })
    const csrf = csrfPair(c)
    return withSession(c, json(c, { ok: true, user: await profileOf(c.env, guestId), guestId, csrf }, 201), token, csrf)
  })

  a.post('/logout', async (c: Ctx) => {
    const u = c.get('user')
    if (u) await q.run(c.env, 'DELETE FROM auth_sessions WHERE user_id = ?', u.id)
    const res = json(c, { ok: true })
    res.headers.append('set-cookie', cookie(SESSION_COOKIE, '', { maxAge: 0, secure: c.env.ENV !== 'development' }))
    return res
  })

  a.get('/me', async (c: Ctx) => {
    const u = c.get('user')
    if (!u) return json(c, { ok: true, user: null })
    return json(c, { ok: true, user: await profileOf(c.env, u.id), csrf: c.req.header('cookie')?.match(/cea_csrf=([^;]+)/)?.[1] ?? null })
  })

  a.post('/forgot', async (c: Ctx) => {
    const b0 = await body(c)
    const email = str(b0.email).trim().toLowerCase()
    // 3.7 — a reset form with no throttle is a free email-bombing tool against
    // our Resend quota and against the learner's inbox.
    const rl = await rateLimit(c.env.KV, `forgot:${ipOf(c)}`, RATE_LIMITS.forgotPassword.limit, RATE_LIMITS.forgotPassword.windowSec, c.env.ENV)
    if (!rl.ok) throw bad(429, 'Too many reset requests. Wait a few minutes and try again.', 'rate_limited', { retryAfter: rl.retryAfter })
    const row = EMAIL_RE.test(email) ? await q.one(c.env, 'SELECT id,name FROM users WHERE email = ? AND is_guest = 0', email) : null
    if (row) {
      const token = randomBytes(24)
      const hash = await sha256hex(token)
      await q.run(c.env, 'INSERT INTO password_resets (token_hash,user_id,expires_at,created_at) VALUES (?,?,?,?)',
        hash, row.id, new Date(Date.now() + 3600_000).toISOString(), now())
      await q.run(c.env, 'DELETE FROM password_resets WHERE user_id = ? AND used_at IS NULL AND created_at < ?', row.id, new Date(Date.now() - 3 * 3600_000).toISOString())
      await sendMail(c.env, email, 'passwordReset', { name: row.name, link: `${c.env.PUBLIC_URL}/auth/reset?token=${token}`, minutes: 60 })
    }
    // always the same answer — no user enumeration
    return json(c, { ok: true, sent: true, hint: c.env.ENV === 'development' ? 'In dev, emails land in ./var/mail' : undefined })
  })

  a.post('/reset', async (c: Ctx) => {
    const b = await body(c)
    const token = str(b.token)
    const password = str(b.password)
    if (!token) throw bad(400, 'Reset link is missing its token.', 'bad_token')
    const problem = passwordProblem(password)
    if (problem) throw bad(422, problem, 'weak_password')
    const hash = await sha256hex(token)
    const row = await q.one(c.env, 'SELECT * FROM password_resets WHERE token_hash = ?', hash)
    if (!row || row.used_at || Date.parse(row.expires_at) < Date.now()) throw bad(400, 'That reset link has expired. Request a new one.', 'bad_token')
    await q.run(c.env, 'UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?', await hashPassword(password), now(), row.user_id)
    await q.run(c.env, 'UPDATE password_resets SET used_at = ? WHERE token_hash = ?', now(), hash)
    await q.run(c.env, 'DELETE FROM auth_sessions WHERE user_id = ?', row.user_id)
    return json(c, { ok: true })
  })

  a.post('/upgrade', async (c: Ctx) => {
    const u = requireUser(c)
    if (!u.isGuest) throw bad(400, 'This account is already registered.', 'not_guest')
    const b = await body(c)
    const email = str(b.email).trim().toLowerCase()
    if (!EMAIL_RE.test(email)) throw bad(422, 'That email address does not look right.', 'bad_email')
    const problem = passwordProblem(str(b.password))
    if (problem) throw bad(422, problem, 'weak_password')
    if (await q.one(c.env, 'SELECT id FROM users WHERE email = ? AND id != ?', email, u.id)) throw bad(409, 'That email already has an account.', 'email_taken')
    const target = id()
    await q.run(c.env, `INSERT INTO users (id,email,name,password_hash,role,is_guest,avatar_seed,xp,streak_count,streak_best,streak_freezes,leaderboard_opt_in,created_at)
      SELECT ?,?,?,?,?,role,0,avatar_seed,xp,streak_count,streak_best,streak_freezes,leaderboard_opt_in,created_at FROM users WHERE id = ?`,
      target, email, u.name, await hashPassword(str(b.password)), u.role, target.slice(0, 8), u.id)
    await mergeGuest(c.env, u.id, target)
    await q.run(c.env, 'DELETE FROM users WHERE id = ?', u.id)
    const token = await issueSession(c.env, target, { ua: c.req.header('user-agent') ?? undefined })
    const csrf = csrfPair(c)
    await sendMail(c.env, email, 'welcome', { name: u.name })
    return withSession(c, json(c, { ok: true, user: await profileOf(c.env, target), csrf }), token, csrf)
  })

  a.patch('/me', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const sets: string[] = []
    const vals: unknown[] = []
    const put = (col: string, v: unknown) => { sets.push(`${col} = ?`); vals.push(v) }
    if (b.name !== undefined) { const n = str(b.name).trim().slice(0, 60); if (n.length < 2) throw bad(422, 'Name too short.', 'bad_name'); put('name', n) }
    if (b.phone !== undefined) put('phone', b.phone ? normalizePhone(str(b.phone)) : null)
    if (b.leaderboardOptIn !== undefined) put('leaderboard_opt_in', b.leaderboardOptIn ? 1 : 0)
    if (b.dataSaver !== undefined) put('data_saver', b.dataSaver ? 1 : 0)
    if (b.theme !== undefined) put('theme', ['light', 'dark', 'system'].includes(str(b.theme)) ? str(b.theme) : 'system')
    if (b.emailPrefs !== undefined) put('email_prefs', str(b.emailPrefs).slice(0, 120))
    if (b.password) {
      if (!u.isGuest) {
        const row = await q.one(c.env, 'SELECT password_hash FROM users WHERE id = ?', u.id)
        if (!row || !(await verifyPassword(str(b.currentPassword), row.password_hash))) throw bad(422, 'Current password is not right.', 'bad_password')
      }
      const problem = passwordProblem(str(b.password))
      if (problem) throw bad(422, problem, 'weak_password')
      put('password_hash', await hashPassword(str(b.password)))
    }
    if (!sets.length) return json(c, { ok: true, user: await profileOf(c.env, u.id) })
    put('updated_at', now())
    await q.run(c.env, `UPDATE users SET ${sets.join(', ')} WHERE id = ?`, ...vals, u.id)
    return json(c, { ok: true, user: await profileOf(c.env, u.id) })
  })

  /**
   * 11.4 / NDPR gap fix — data portability. One call, one file: everything the
   * app knows about this learner, in the shape it is stored. (Receipts are included
   * because a learner may need them for their own records even after erasure is
   * requested — the accounting copy is retained separately, as /privacy states.)
   */
  a.get('/me/export', async (c: Ctx) => {
    const u = requireUser(c)
    const tables: [string, string][] = [
      ['progress', 'user_id = ?'], ['xp_events', 'user_id = ?'], ['awards', 'user_id = ?'],
      ['user_badges', 'user_id = ?'], ['enrollments', 'user_id = ?'], ['payments', 'user_id = ?'],
      ['quiz_attempts', 'user_id = ?'], ['exercise_submissions', 'user_id = ?'], ['notes', 'user_id = ?'],
      ['bookmarks', 'user_id = ?'], ['daily_quests', 'user_id = ?'], ['certificates', 'user_id = ?'],
      ['feedback', 'user_id = ?'], ['access_code_redemptions', 'user_id = ?'],
    ]
    const rows: Record<string, unknown> = {}
    for (const [table, where] of tables) {
      rows[table] = await q.all(c.env, `SELECT * FROM ${table} WHERE ${where}`, u.id).catch(() => [])
    }
    const raw = await q.one(c.env, 'SELECT * FROM users WHERE id = ?', u.id)
    const profile = { ...(raw ?? {}) } as Record<string, unknown>
    delete profile.password_hash
    return new Response(JSON.stringify({
      exportedAt: now(), subject: u.email, app: 'CEA Learn', profile, ...rows,
      note: 'Rows are the stored shape. Payment receipts are retained for accounting even after account erasure (see /privacy).',
    }, null, 2), {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'content-disposition': `attachment; filename="cea-learn-${u.email.replace(/[^a-z0-9]/gi, '_')}.json"`,
        'cache-control': 'no-store',
      },
    })
  })

  a.delete('/me', async (c: Ctx) => {
    // 9.9 + NDPR: account deletion anonymises rather than erasing the money trail
    const u = requireUser(c)
    await q.run(c.env, `UPDATE users SET email = ?, name = 'Deleted learner', password_hash = '!', phone = NULL, banned_at = ?, leaderboard_opt_in = 0 WHERE id = ?`,
      `deleted-${u.id}@cea.invalid`, now(), u.id)
    await q.run(c.env, 'DELETE FROM auth_sessions WHERE user_id = ?', u.id)
    await q.run(c.env, 'DELETE FROM notes WHERE user_id = ?', u.id)
    const res = json(c, { ok: true })
    res.headers.append('set-cookie', cookie(SESSION_COOKIE, '', { maxAge: 0, secure: c.env.ENV !== 'development' }))
    return res
  })

  return a
}

async function mergeGuest(env: CeaEnv, from: string, to: string) {
  const tables = [
    ['progress', ['user_id', 'course', 'session_number']],
    ['notes', ['id']], ['bookmarks', ['id']], ['xp_events', ['id']],
    ['user_badges', ['user_id', 'badge_key']], ['exercise_submissions', ['user_id', 'course', 'session_number', 'exercise_id']],
    ['flashcard_reviews', ['user_id', 'card_id']],
  ] as const
  for (const [table, keyCols] of tables) {
    const rows = await q.all(env, `SELECT * FROM ${table} WHERE user_id = ?`, from)
    for (const r of rows) {
      const cols = Object.keys(r)
      const clash = keyCols.length > 1 ? await q.one(env, `SELECT 1 AS x FROM ${table} WHERE ${keyCols.map(() => '? = ?').join(' AND ')}`, ...keyCols.flatMap(k => [r[k], to === from ? r[k] : r[k]])) : null
      if (clash) { await q.run(env, `DELETE FROM ${table} WHERE user_id = ? AND rowid IN (SELECT rowid FROM ${table} WHERE user_id = ?)`, from, from); break }
      await q.run(env, `UPDATE ${table} SET user_id = ? WHERE user_id = ? AND ${cols.map(() => '1=1').join('')}`, to, from)
      break
    }
  }
  await q.run(env, 'UPDATE users SET xp = (SELECT xp FROM users WHERE id = ?), streak_count = (SELECT streak_count FROM users WHERE id = ?), streak_best = (SELECT streak_best FROM users WHERE id = ?), last_active_date = (SELECT last_active_date FROM users WHERE id = ?) WHERE id = ?', from, from, from, from, to).catch(() => undefined)
  await q.run(env, 'DELETE FROM xp_events WHERE user_id = ?', from).catch(() => undefined)
}

async function profileOf(env: CeaEnv, userId: string) {
  const u = await q.one(env, 'SELECT * FROM users WHERE id = ?', userId)
  if (!u) return null
  const badges = await q.all(env, 'SELECT badge_key, awarded_at FROM user_badges WHERE user_id = ? ORDER BY awarded_at DESC', userId)
  const enrols = await q.all(env, 'SELECT course, source, created_at, expires_at FROM enrollments WHERE user_id = ? AND status = ?', userId, 'active')
  const counts = await q.all(env, 'SELECT course, COUNT(*) AS done FROM progress WHERE user_id = ? AND completed_at IS NOT NULL GROUP BY course', userId)
  return {
    id: u.id, email: u.email, phone: u.phone, name: u.name, role: u.role, isGuest: !!u.is_guest,
    avatarSeed: u.avatar_seed, joinedAt: u.created_at, theme: u.theme, emailPrefs: u.email_prefs,
    xp: u.xp || 0, rank: rankFor(u.xp || 0), streak: { count: u.streak_count || 0, best: u.streak_best || 0, freezes: u.streak_freezes || 0, lastActiveDate: u.last_active_date, atRisk: streakAtRisk({ count: u.streak_count || 0, lastActiveDate: u.last_active_date ?? null, freezes: u.streak_freezes || 0 }) },
    prefs: { dataSaver: !!u.data_saver, leaderboardOptIn: !!u.leaderboard_opt_in },
    badges: badges.map(b => ({ key: b.badge_key, at: b.awarded_at })),
    enrolled: enrols, completedByCourse: Object.fromEntries(counts.map(r2 => [r2.course, Number(r2.done)])),
    badgeCatalogue: BADGES.map(b => ({ key: b.key, name: b.name, description: b.description, icon: b.icon, tier: b.tier })),
    ranks: RANKS,
  }
}

async function ensureBadges(env: CeaEnv) {
  const existing = await q.one(env, 'SELECT COUNT(*) AS c FROM badges')
  if (Number(existing?.c || 0) > 0) return
  for (const b of BADGES) {
    await q.run(env, 'INSERT INTO badges (key,name,description,icon,tier,xp_bonus) VALUES (?,?,?,?,?,?)', b.key, b.name, b.description, b.icon, b.tier, b.xp)
      .catch(() => undefined)
  }
}

const isSecureRequest = (url: string) => !['localhost', '127.0.0.1', '[::1]'].includes(new URL(url).hostname)

function withSession(ctx: Ctx, res: Response, token: string, csrf: string) {
  const secure = isSecureRequest(ctx.req.url)
  res.headers.append('set-cookie', cookie(SESSION_COOKIE, token, { secure }))
  res.headers.append('set-cookie', `${CSRF_COOKIE}=${csrf}; Path=/; SameSite=Lax; Max-Age=${3600 * 24 * 30}${secure ? '; Secure' : ''}`)
  return res
}

// ---------------------------------------------------------------------------
// learning loop (Phase 4) + gamification reads (Phase 5)
// ---------------------------------------------------------------------------

export function learnRoutes() {
  const a = new Hono<any, any, any>()

  a.get('/courses', async (c: Ctx) => {
    const index = await c.env.CONTENT.index()
    const u = c.get('user')
    const enrols = u ? await q.all(c.env, 'SELECT course, expires_at FROM enrollments WHERE user_id = ? AND status = ?', u.id, 'active') : []
    const pays = u ? await q.all(c.env, "SELECT course, status FROM payments WHERE user_id = ? ORDER BY created_at DESC", u.id) : []
    const progress = u ? await q.all(c.env, 'SELECT course, session_number, completed_at FROM progress WHERE user_id = ?', u.id) : []
    const pricing = u ? await q.all(c.env, 'SELECT course, fee_ngn FROM course_pricing') : []
    const feeOverride = new Map(pricing.map(p => [p.course, Number(p.fee_ngn)]))
    const enrolled = new Set(enrols.filter(e => !e.expires_at || Date.parse(e.expires_at) > Date.now()).map(e => e.slug ?? e.course))
    const payStatus = new Map<string, string>()
    for (const p of pays) if (!payStatus.has(p.course)) payStatus.set(p.course, p.status)
    const done = new Map<string, number>()
    for (const p of progress) if (p.completed_at) done.set(p.course, (done.get(p.course) || 0) + 1)

    const courses = index.courses.map((course: Row) => {
      const fee = feeOverride.get(course.slug) ?? course.feeNgn ?? DEFAULT_FEES_NGN[course.slug as keyof typeof DEFAULT_FEES_NGN] ?? null
      const st = lockState({ isFree: true, enrolled: enrolled.has(course.slug), paymentStatus: (payStatus.get(course.slug) as any) ?? null })
      const completed = done.get(course.slug) || 0
      return {
        ...course,
        feeNgn: fee,
        access: st.state,
        progressPct: course.sessionsCount ? Math.round((completed / course.sessionsCount) * 100) : 0,
        completedSessions: completed,
        nextSession: Math.min((completed || 0) + 1, course.sessionsCount || 1),
      }
    })
    return json(c, { ok: true, courses, totals: index.totals, generatedAt: index.generatedAt, signedIn: !!u })
  })

  a.get('/courses/:slug', async (c: Ctx) => {
    const slug = (c.req.param('slug') as string)
    const bundle = await c.env.CONTENT.course(slug)
    if (!bundle) throw bad(404, 'No such course.', 'no_course')
    const u = c.get('user')
    const info = await accessFor(c.env, u?.id ?? null, slug)
    const prog = u ? await getProgress(c.env, u.id, slug) : null
    const sessions = bundle.sessions.map(s => ({
      number: s.number, title: s.title, module: s.module, minutes: s.durationMinutes, isFree: s.isFree, isCapstone: s.isCapstone,
      words: s.estWords, quizCount: s.quiz.questions.length,
      state: (() => {
        const p = prog?.get(s.number)
        const lock = lockState({ isFree: s.isFree, enrolled: info.enrolled, paymentStatus: info.paymentStatus, expiresAt: info.expiresAt })
        return { ...lock, completed: !!p?.completed_at, stars: starsFor(p?.quiz_best_pct), quizBest: p?.quiz_best_pct ?? null, lastSeen: p?.last_seen_at ?? null, exerciseSubmitted: !!p?.exercise_submitted_at }
      })(),
    }))
    return json(c, { ok: true, course: bundle.course, access: { ...info, state: lockState({ isFree: false, enrolled: info.enrolled, paymentStatus: info.paymentStatus, expiresAt: info.expiresAt }).state }, sessions })
  })

  /** 4.5 — the lesson payload. Gated by 7.5, and never contains answer keys. */
  a.get('/courses/:slug/:n', async (c: Ctx) => {
    const slug = (c.req.param('slug') as string)
    const n = num(c.req.param('n'))
    const { course, session } = await loadSession(c.env, slug, n)
    const u = c.get('user')
    await assertAccess(c.env, u, slug, { number: session.number, isFree: session.isFree })
    const p = u ? await q.one(c.env, 'SELECT * FROM progress WHERE user_id=? AND course=? AND session_number=?', u.id, slug, n) : null
    return json(c, {
      ok: true, course, session,
      progress: p ? {
        openedAt: p.opened_at, lastSeenAt: p.last_seen_at, completedAt: p.completed_at,
        sectionsSeen: safeJson<string[]>(p.sections_seen, []), resume: safeJson(p.resume_json, null),
        quizBest: p.quiz_best_pct, quizAttempts: p.quiz_attempts, exerciseSubmitted: !!p.exercise_submitted_at,
        checklist: safeJson(p.checklist_json, []), scenario: safeJson(p.scenario_json, null), timeSpentSec: p.time_spent_sec,
      } : null,
      xpRules: XP,
    })
  })

  a.post('/learn/open', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const slug = str(b.course)
    const n = num(b.session)
    const { session } = await loadSession(c.env, slug, n)
    await assertAccess(c.env, u, slug, { number: session.number, isFree: session.isFree })
    await upsertProgress(c.env, u.id, slug, n, { opened_at: now(), last_seen_at: now() })
    return json(c, { ok: true })
  })

  /** 4.6 — scroll/section breadcrumbs. Cheap, batched, and the resume source of truth. */
  a.post('/learn/section', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const slug = str(b.course)
    const n = num(b.session)
    const p0 = await q.one(c.env, 'SELECT * FROM progress WHERE user_id=? AND course=? AND session_number=?', u.id, slug, n)
    if (!p0) throw bad(400, 'Open the level first.', 'not_open')
    const bundle = await c.env.CONTENT.course(slug)
    const lesson = bundle?.sessions.find((ss: any) => ss.number === n)
    const section = resolveSection(str(b.section), lesson)
    const seen = new Set<string>(safeJson<string[]>(p0.sections_seen, []))
    if (section) seen.add(section)
    const time = Number(p0.time_spent_sec || 0) + clamp(num(b.deltaSec ?? b.seconds), 0, 300)
    await q.run(c.env, 'UPDATE progress SET sections_seen = ?, furthest_section = ?, last_seen_at = ?, time_spent_sec = ?, resume_json = ? WHERE user_id=? AND course=? AND session_number=?',
      JSON.stringify([...seen]), section || p0.furthest_section, now(), time, JSON.stringify({ section, anchor: str(b.anchor), pct: clamp(num(b.pct), 0, 100) }),
      u.id, slug, n)

    // 4.3 defines "+10 for reading a session" but never says when a session counts
    // as read. Rule (docs/GAP-ANALYSIS.md §2.1): 60% of the learner-visible
    // sections, which stops a scroll-through from farming XP while still being
    // reachable on a phone. Idempotent through awards.key, so re-entering is free.
    let readAward = null
    const visible = Math.max(1, (lesson?.sections ?? []).filter((ss: any) => ss.kind !== 'instructor_notes').length)
    const required = Math.max(2, Math.ceil(visible * 0.6))
    if (seen.size >= required && !p0.read_awarded_at) {
      readAward = await award(c.env, { userId: u.id, kind: 'lesson_read', key: `${slug}/${sessionSlug(n)}/read`, course: slug, sessionNumber: n, meta: { timeSpentSec: time, sections: seen.size } }, { course: bundle?.course })
      await q.run(c.env, 'UPDATE progress SET read_awarded_at = ? WHERE user_id=? AND course=? AND session_number=?', now(), u.id, slug, n)
    }
    return json(c, { ok: true, sectionsRead: seen.size, sectionsRequired: required, award: readAward })
  })

  /** 6.1 + 5.9 — the client sends answers, the server decides the score. */
  a.post('/learn/quiz', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const slug = str(b.course)
    const n = num(b.session)
    const { course, session } = await loadSession(c.env, slug, n)
    await assertAccess(c.env, u, slug, { number: session.number, isFree: session.isFree })
    const elapsed = clamp(num(b.elapsedSec ?? b.elapsedSeconds ?? b.seconds), 0, 6 * 3600)
    if (elapsed < 3 && session.quiz.questions.length > 2) throw bad(422, 'That was too fast to be a real attempt. Answer the questions and try again.', 'too_fast')

    const keys = (await c.env.CONTENT.keys(slug))?.[session.id]?.quiz ?? {}
    const answers = (b.answers && typeof b.answers === 'object' ? b.answers : {}) as Record<string, string>
    const graded = grade(session.quiz.questions.map((qq: any) => ({ ...qq, ...(keys[qq.id] || {}) })), answers, session.quiz.passPercent)

    await q.run(c.env, 'INSERT INTO quiz_attempts (id,user_id,course,session_number,score_pct,correct,total,elapsed_sec,passed,answers,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      id(), u.id, slug, n, graded.scorePct, graded.correct, graded.total, elapsed, graded.passed ? 1 : 0, JSON.stringify(scrub(answers)), now())
    const p = await q.one(c.env, 'SELECT quiz_best_pct, quiz_attempts FROM progress WHERE user_id=? AND course=? AND session_number=?', u.id, slug, n)
    const best = Math.max(Number(p?.quiz_best_pct || 0), graded.scorePct)
    await q.run(c.env, 'UPDATE progress SET quiz_best_pct = ?, quiz_attempts = quiz_attempts + 1, last_seen_at = ?, quiz_passed_at = COALESCE(quiz_passed_at, ?) WHERE user_id=? AND course=? AND session_number=?',
      best, now(), graded.passed ? now() : null, u.id, slug, n)

    // 5.9 — the combo is measured here, from the marked answers, never from a counter the page
    // keeps: reloading mid-quiz cannot inflate it, and the key rides the best score so a banked
    // level cannot be farmed by retaking it.
    const run = longestCorrectRun(graded.perQuestion ?? [])
    let comboRes = null
    if (run >= GAME.combo.trigger) {
      comboRes = await award(c.env, {
        userId: u.id, kind: 'combo', points: comboBonus(run),
        key: `${slug}/${sessionSlug(n)}/combo/${best}`, course: slug, sessionNumber: n, meta: { run },
      }, { course })
    }

    let awardRes = null
    if (graded.passed) {
      const key = `${slug}/${sessionSlug(n)}/quiz/${best}`
      awardRes = await award(c.env, {
        userId: u.id, kind: 'quiz_pass', key, course: slug, sessionNumber: n, perfect: graded.perfect,
        meta: { quizPct: graded.scorePct, timeSpentSec: elapsed },
      }, { course })
    }
    await bumpQuest(c.env, u.id, graded.scorePct >= 80 ? 'quiz-80' : null)
    return json(c, { ok: true, result: graded, best, award: awardRes, combo: run >= GAME.combo.trigger ? { run, award: comboRes } : null })
  })

  /**
   * 6.3 — code-gap checking. Answers stay on the server (they live in the key file),
   * so a learner can see which gap is wrong and why, but cannot scrape the answers
   * out of the bundle. Deliberately no XP here: it is a self-check, not an assessable
   * artefact, and a farmable one it would otherwise become (5.9).
   */
  a.post('/learn/blank', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const slug = str(b.course), n = num(b.session), blankId = str(b.id)
    const { session } = await loadSession(c.env, slug, n)
    await assertAccess(c.env, u, slug, { number: session.number, isFree: session.isFree })
    const blank = (session.codeBlanks ?? []).find((cb: any) => cb.id === blankId)
    if (!blank) throw bad(404, 'No such exercise in this level.', 'bad_blank')
    const key = (await c.env.CONTENT.keys(slug))?.[session.id]?.codeBlanks?.[blankId]
    const values = Array.isArray(b.values) ? (b.values as unknown[]) : []
    const results = (key?.blanks ?? []).map((expected: any, i: number) => {
      const got = normalizeAnswer(String(values[i] ?? ''))
      const options = [expected.answer, ...(expected.accepts ?? [])].map(normalizeAnswer)
      return got.length > 0 && options.includes(got)
    })
    return json(c, {
      ok: true, results, correctCount: results.filter(Boolean).length, total: results.length,
      explain: (blank as any).explain ?? '',
      // a wrong gap gets the first characters of the expected answer as a nudge
      hints: (key?.blanks ?? []).map((expected: any, i: number) => (results[i] ? '' : String(expected.answer || '').slice(0, 2))),
    })
  })

  /** 6.9 — practice submission, then deliberate model-answer reveal. */
  a.post('/learn/exercise', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const slug = str(b.course)
    const n = num(b.session)
    const exerciseId = str(b.exerciseId)
    const text = str(b.text).slice(0, 20000)
    const { course, session } = await loadSession(c.env, slug, n)
    await assertAccess(c.env, u, slug, { number: session.number, isFree: session.isFree })
    if (!text.trim()) throw bad(422, 'Write something first — an empty attempt is not practice.', 'empty')
    const exercise = session.exercises.find((e: any) => e.id === exerciseId)
    if (!exercise) throw bad(404, 'Unknown exercise in this level.', 'bad_exercise')

    await q.run(c.env, `INSERT INTO exercise_submissions (id,user_id,course,session_number,exercise_id,kind,text,self_score,xp_awarded,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(user_id,course,session_number,exercise_id) DO UPDATE SET text = excluded.text, self_score = excluded.self_score, updated_at = excluded.updated_at`,
      id(), u.id, slug, n, exerciseId, exercise.kind, text, num(b.selfScore, 0), 0, now(), now())
    const firstTime = !(await q.one(c.env, 'SELECT id FROM awards WHERE user_id = ? AND key = ?', u.id, `${slug}/${sessionSlug(n)}/exercise`))
    const res = firstTime
      ? await award(c.env, { userId: u.id, kind: 'exercise_submit', key: `${slug}/${sessionSlug(n)}/exercise`, course: slug, sessionNumber: n }, { course })
      : null
    await bumpQuest(c.env, u.id, 'practice-task')
    const keys = (await c.env.CONTENT.keys(slug))?.[session.id]?.exercises?.[exerciseId]
    return json(c, { ok: true, modelAnswer: keys?.modelAnswer ?? '', code: keys?.code ?? null, rubric: exercise.rubric, award: res, revealed: true })
  })

  a.post('/learn/scenario', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const slug = str(b.course), n = num(b.session)
    const { session, course } = await loadSession(c.env, slug, n)
    await assertAccess(c.env, u, slug, { number: session.number, isFree: session.isFree })
    const scenario = session.scenarios.find((s: any) => s.id === str(b.scenarioId))
    if (!scenario) throw bad(404, 'Unknown case study.', 'bad_scenario')
    const choice = str(b.choiceId)
    const keys = (await c.env.CONTENT.keys(slug))?.[session.id]?.scenarios?.[scenario.id]
    const correct = keys?.correctId ? choice === keys.correctId : null
    const p = await q.one(c.env, 'SELECT scenario_json FROM progress WHERE user_id=? AND course=? AND session_number=?', u.id, slug, n)
    const prior = safeJson<Record<string, string>>(p?.scenario_json, {})
    await q.run(c.env, 'UPDATE progress SET scenario_json = ?, last_seen_at = ? WHERE user_id=? AND course=? AND session_number=?',
      JSON.stringify({ ...prior, [scenario.id]: choice }), now(), u.id, slug, n)
    return json(c, {
      ok: true, correct, feedback: scenario.feedback[choice] ?? 'Read the recommended solution and compare it with your choice.',
      resolution: keys?.resolution ?? scenario.resolution ?? '', correctId: keys?.correctId ?? null,
      example: scenario.example ?? null, award: correct ? await award(c.env, { userId: u.id, kind: 'exercise_submit', key: `${slug}/${sessionSlug(n)}/scenario/${scenario.id}`, course: slug, sessionNumber: n }, { course }) : null,
    })
  })

  /** 6.5 — spaced repetition: Leitner boxes, no external library. */
  a.post('/learn/flashcards', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const reviews = Array.isArray(b.reviews) ? b.reviews.slice(0, 60) : []
    for (const r of reviews) {
      const cardId = str(r.cardId).slice(0, 90)
      const gradeN = clamp(num(r.grade), 0, 5)
      const prior = await q.one(c.env, 'SELECT * FROM flashcard_reviews WHERE user_id = ? AND card_id = ?', u.id, cardId)
      const interval = gradeN <= 1 ? 0 : gradeN <= 2 ? 1 : gradeN <= 3 ? 3 : gradeN <= 4 ? 7 : 21
      const at = new Date(Date.now() + interval * 864e5).toISOString()
      if (prior) {
        await q.run(c.env, 'UPDATE flashcard_reviews SET grade = ?, interval_days = ?, due_at = ?, reviews = reviews + 1, last_reviewed_at = ? WHERE user_id = ? AND card_id = ?',
          gradeN, interval, at, now(), u.id, cardId)
      } else {
        await q.run(c.env, 'INSERT INTO flashcard_reviews (id,user_id,card_id,grade,interval_days,due_at,reviews,last_reviewed_at) VALUES (?,?,?,?,?,?,?,?)',
          id(), u.id, cardId, gradeN, interval, at, 1, now())
      }
    }
    if (reviews.length >= 10) await bumpQuest(c.env, u.id, 'review-flashcards')
    return json(c, { ok: true, reviewed: reviews.length })
  })

  a.get('/learn/due', async (c: Ctx) => {
    const u = requireUser(c)
    const rows = await q.all(c.env, 'SELECT card_id, grade, interval_days, due_at FROM flashcard_reviews WHERE user_id = ? AND (due_at IS NULL OR due_at <= ?) ORDER BY due_at LIMIT 40', u.id, now())
    return json(c, { ok: true, due: rows })
  })

  a.post('/learn/checklist', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const slug = str(b.course), n = num(b.session)
    const items = Array.isArray(b.items) ? b.items.slice(0, 30) : []
    await upsertProgress(c.env, u.id, slug, n, { checklist_json: JSON.stringify(items.map(i => ({ label: str(i.label).slice(0, 200), done: !!i.done }))) })
    return json(c, { ok: true, done: items.filter((i: any) => i.done).length, total: items.length })
  })

  /** 4.7 — the reward moment. Idempotent per level, so a re-tap cannot double-pay. */
  a.post('/learn/complete', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const slug = str(b.course), n = num(b.session)
    const { course, session } = await loadSession(c.env, slug, n)
    await assertAccess(c.env, u, slug, { number: session.number, isFree: session.isFree })
    const p = await q.one(c.env, 'SELECT * FROM progress WHERE user_id=? AND course=? AND session_number=?', u.id, slug, n)
    if (!p?.opened_at) throw bad(422, 'Read the level before marking it complete.', 'not_opened')
    const seconds = clamp(num(b.timeSpentSec ?? b.seconds ?? b.elapsedSec, Number(p.time_spent_sec || 0)), 0, 40000)
    if (seconds < XP.minCompletionSeconds) throw bad(422, `Hold on — ${seconds}s on a ${session.durationMinutes || course.sessionLengthMinutes || 105}-minute level is not a finish. Read the sections and come back.`, 'too_fast')
    if (session.quiz.questions.length && !p.quiz_attempts) throw bad(422, 'Take the knowledge check first — that is what proves the level.', 'quiz_required')

    await q.run(c.env, 'UPDATE progress SET completed_at = COALESCE(completed_at, ?), last_seen_at = ? WHERE user_id=? AND course=? AND session_number=?', now(), now(), u.id, slug, n)
    const res = await award(c.env, {
      userId: u.id, kind: 'session_complete', key: `${slug}/${sessionSlug(n)}/complete`, course: slug, sessionNumber: n,
      meta: { quizPct: p.quiz_best_pct ?? null, timeSpentSec: seconds, isCapstone: !!session.isCapstone, usedPlayground: !!b.usedPlayground },
    }, { course })
    await bumpQuest(c.env, u.id, 'one-level')
    if (p.completed_at) return json(c, { ok: true, award: res, alreadyCompleted: true })
    // 5.9 — showing up is worth something on its own: one flat bonus with the *first* level
    // finished today. Counted from the awards table after this one was banked, so a count of 1
    // means it was today's first; the key carries the day, so a re-tap cannot claim it twice.
    let showUp = null
    if (GAME.firstLevelToday) {
      const bankedToday = await q.one(c.env,
        "SELECT COUNT(*) AS n FROM awards WHERE user_id = ? AND kind = 'session_complete' AND substr(created_at,1,10) = ?",
        u.id, dayKey(new Date()))
      if (Number(bankedToday?.n ?? 0) === 1) {
        showUp = await award(c.env, { userId: u.id, kind: 'first_level', key: `${dayKey(new Date())}:first-level` }, { course })
      }
    }
    return json(c, { ok: true, award: res, showUp, session: { number: n, title: session.title }, course: { slug: course.slug, title: course.displayTitle, sessionsCount: course.sessionsCount } })
  })

  /** dashboard: resume where I left off + today's quest + streak health (5.8) */
  /**
   * 5.9 — the bonus wheel: the one reward in the app that is not a fixed number, so it is rolled
   * here and not in the page. `spinRoll` hashes (user, day, which spin of the day), which means the
   * prize is stable across a refresh, a second click, and a reload on another device — and it can
   * only ever be one of the segments in `GAME.wheel`. The budget lives in the `awards` table (the
   * idempotency key is `<day>:spin:<n>`), so a learner who clears localStorage or opens a second tab
   * cannot spend tomorrow's spin today. A streak of `bonusSpinStreakDays` earns a second spin, which
   * is the whole point: the wheel is a reward for consistency, not a lottery ticket.
   */
  a.post('/gamify/spin', async (c: Ctx) => {
    const u = requireUser(c)
    const day = dayKey(new Date())
    const [userRow, banked] = await Promise.all([
      q.one(c.env, 'SELECT streak_count, streak_freezes FROM users WHERE id = ?', u.id),
      q.all(c.env, "SELECT payload FROM awards WHERE user_id = ? AND kind = 'spin' AND key LIKE ? ORDER BY created_at", u.id, `${day}:spin:%`),
    ])
    const streak = Number(userRow?.streak_count ?? 0)
    const budget = GAME.wheel.spinsPerDay + (streak >= GAME.wheel.bonusSpinStreakDays ? 1 : 0)
    const used = banked.length
    if (used >= budget) {
      const last = safeJson<Row>(banked[banked.length - 1]?.payload, {})
      return json(c, { ok: true, spun: false, reason: 'spent', spinsToday: used, spinsLeft: 0, bonusAt: GAME.wheel.bonusSpinStreakDays, streak, last: last?.meta?.segment ?? null })
    }
    const roll = spinRoll(u.id, day, used)
    const res = await award(c.env, {
      userId: u.id, kind: 'spin', points: roll.segment.xp, key: `${day}:spin:${used}`, meta: { segment: roll.segment.id },
    })
    // The shield segment hands out a streak freeze, clamped to the same ceiling the weekly grant uses.
    const freezes = Number(roll.segment.freeze ?? 0)
    if (freezes > 0) {
      await q.run(c.env, 'UPDATE users SET streak_freezes = MIN(?, streak_freezes + ?) WHERE id = ?', STREAK.maxFreezes, freezes, u.id)
    }
    return json(c, {
      ok: true, spun: true, index: roll.index, segment: roll.segment, freezes: Math.min(STREAK.maxFreezes, Number(userRow?.streak_freezes ?? 0) + freezes),
      spinsToday: used + 1, spinsLeft: budget - used - 1, bonusAt: GAME.wheel.bonusSpinStreakDays, award: res,
    })
  })

  a.get('/summary', async (c: Ctx) => {
    const u = c.get('user')
    const index = await c.env.CONTENT.index()
    if (!u) return json(c, { ok: true, signedIn: false, courses: index.courses.length })
    const profile = await profileOf(c.env, u.id)
    const resume = await q.all(c.env, 'SELECT course, session_number, last_seen_at, completed_at, quiz_best_pct, resume_json FROM progress WHERE user_id = ? ORDER BY last_seen_at DESC LIMIT 8', u.id)
    const enrols = await q.all(c.env, 'SELECT course FROM enrollments WHERE user_id = ? AND status = ?', u.id, 'active')
    const day = dayKey(new Date())
    const quest = questFor(u.id, day)
    const questRow = await q.one(c.env, 'SELECT * FROM daily_quests WHERE user_id = ? AND day = ? AND kind = ?', u.id, day, quest.kind)
    const pending = await q.all(c.env, "SELECT course, reference, created_at FROM payments WHERE user_id = ? AND status = 'pending' ORDER BY created_at DESC LIMIT 4", u.id)
    const certs = await q.all(c.env, 'SELECT * FROM certificates WHERE user_id = ? ORDER BY issued_at DESC', u.id)
    const mine = new Map(resume.map(r => [`${r.course}/${r.session_number}`, r]))
    // Game HUD (5.9): the streak calendar wants "did this learner touch the app that day", not only
    // "did they finish a level", so it reads xp_events — a quiz pass and a spin both light a square.
    const since = new Date(Date.now() - GAME.streakCalendarWeeks * 7 * 864e5).toISOString()
    const activityDays = (await q.all(c.env,
      'SELECT substr(created_at,1,10) AS day, SUM(points) AS xp FROM xp_events WHERE user_id = ? AND created_at >= ? GROUP BY day ORDER BY day',
      u.id, since)).map(r => ({ day: r.day, xp: Number(r.xp || 0) }))
    const spinsUsed = Number((await q.one(c.env,
      "SELECT COUNT(*) AS n FROM awards WHERE user_id = ? AND kind = 'spin' AND key LIKE ?", u.id, `${day}:spin:%`))?.n ?? 0)
    const spinBudget = GAME.wheel.spinsPerDay + ((profile?.streak?.count ?? 0) >= GAME.wheel.bonusSpinStreakDays ? 1 : 0)
    return json(c, {
      ok: true, signedIn: true, user: profile, quest: { ...quest, progress: questRow?.progress ?? 0, done: !!questRow?.done },
      enrolments: enrols.map(e => e.course),
      pendingPayments: pending, certificates: certs,
      continueLearning: resume.map(r => {
        const course = index.courses.find((cc: Row) => cc.slug === r.course)
        return {
          course: r.course, title: course?.displayTitle || r.course, cover: course?.cover, accent: course?.accent,
          sessionNumber: r.session_number, sessionTitle: course?.sessions?.find((s: Row) => s.number === r.session_number)?.title,
          completedAt: r.completed_at, quizBest: r.quiz_best_pct, lastSeen: r.last_seen_at, resume: safeJson(r.resume_json, null),
        }
      }),
      activity: [...mine.values()].length,
      activityDays,
      spin: { spinsToday: spinsUsed, spinsLeft: Math.max(0, spinBudget - spinsUsed), bonusAt: GAME.wheel.bonusSpinStreakDays, streak: profile?.streak?.count ?? 0 },
      xpToday: Number((await q.one(c.env, 'SELECT COALESCE(SUM(points),0) t FROM xp_events WHERE user_id=? AND substr(created_at,1,10)=?', u.id, day))?.t ?? 0),
      weeklyXp: Number((await q.one(c.env, 'SELECT COALESCE(SUM(points),0) t FROM xp_events WHERE user_id=? AND created_at >= ?', u.id, new Date(Date.now() - 7 * 864e5).toISOString()))?.t ?? 0),
    })
  })

  a.get('/leaderboard', async (c: Ctx) => {
    const u = c.get('user')
    const course = str(c.req.query('course'))
    const period = c.req.query('period') === 'alltime' ? 'alltime' : 'weekly'
    const key = `lb:${period}:${course || 'global'}`
    const cached = await c.env.KV.get(key)
    if (cached) return json(c, JSON.parse(cached))
    const week = isoWeek(new Date())
    const rows = period === 'weekly'
      ? await q.all(c.env, `SELECT lw.user_id, u.name, u.xp, SUM(lw.xp) AS gained, u.avatar_seed FROM leaderboard_weekly lw JOIN users u ON u.id = lw.user_id
          WHERE lw.week = ? AND lw.course = ? AND u.leaderboard_opt_in = 1 AND u.is_guest = 0 AND u.banned_at IS NULL
          GROUP BY lw.user_id ORDER BY gained DESC LIMIT 50`, week, course || 'global')
      : course
        // An all-time board *for one course* has to count what was earned in that course, or the tab
        // would be a lie: the global lifetime sort ignores the filter. `xp_events` carries the course
        // on every row (5.9), so the per-course sum is real and needs no new table.
        ? await q.all(c.env, `SELECT e.user_id, u.name, u.xp, SUM(e.points) AS gained, u.avatar_seed
            FROM xp_events e JOIN users u ON u.id = e.user_id
            WHERE e.course = ? AND u.leaderboard_opt_in = 1 AND u.is_guest = 0 AND u.banned_at IS NULL
            GROUP BY e.user_id, u.name, u.xp, u.avatar_seed ORDER BY gained DESC LIMIT 50`, course)
        : await q.all(c.env, `SELECT id AS user_id, name, xp, 0 AS gained, avatar_seed FROM users WHERE leaderboard_opt_in = 1 AND is_guest = 0 AND banned_at IS NULL ORDER BY xp DESC LIMIT 50`)
    const out = {
      ok: true, period, course: course || 'global', week,
      rows: rows.map((r, i) => ({ pos: i + 1, name: r.name, xp: Number(r.xp), gained: Number(r.gained), id: r.user_id, me: r.user_id === u?.id, avatarSeed: r.avatar_seed })),
      me: u && (period === 'alltime' || !!course) && !rows.some(r => r.user_id === u.id)
        ? { pos: null, name: u.name, xp: u.xp, gained: 0, id: u.id, me: true } : null,
      optInNote: 'Learners who turned leaderboards off are not listed.',
    }
    await c.env.KV.put(key, JSON.stringify(out), { expirationTtl: 60 })
    return json(c, out)
  })

  /** 4.11 — server-side tf-idf over the accessible bundle only. */
  a.get('/search', async (c: Ctx) => {
    const u = c.get('user')
    const query = str(c.req.query('q')).toLowerCase().trim()
    if (query.length < 2) return json(c, { ok: true, hits: [], note: 'Type at least two characters.' })
    const index = await c.env.CONTENT.index()
    const terms = query.split(/\s+/).filter(Boolean)
    // Signed in: your enrolled courses search in full, everything else through the
    // free preview level only — that keeps locked lesson text out of the results
    // while still giving a browser something to click (4.11).
    const enrols = u && !u.isGuest
      ? new Set((await q.all(c.env, 'SELECT course FROM enrollments WHERE user_id=? AND status=?', u.id, 'active')).map((x: Row) => x.course))
      : new Set<string>()
    const allowed = index.courses.map((cc: Row) => cc.slug)
    const previewOnly = (slugName: string) => ACCESS.mode !== 'free' && !enrols.has(slugName)
    const hits: Row[] = []
    for (const slug of allowed) {
      const idx = await c.env.CONTENT.search(slug)
      if (!idx) continue
      for (const doc of idx.docs) {
        if (previewOnly(slug) && doc.n !== 1) continue
        let score = 0
        for (const t of terms) {
          const tf = doc.v[t] ?? 0
          if (!tf) continue
          score += tf * (idx.idf[t] ?? 1)
        }
        if (score > 0) hits.push({ course: slug, courseTitle: idx.title, sessionNumber: doc.n, title: doc.t, score: Math.round(score * 100) / 100, free: doc.n === 1, locked: previewOnly(slug) })
      }
    }
    hits.sort((a, b) => b.score - a.score)
    return json(c, { ok: true, query, hits: hits.slice(0, 24), scope: enrols.size, note: ACCESS.mode === 'free' || enrols.size ? undefined : 'Enrol in a course to search all of its levels; right now this covers the free first level of each course.' })
  })

  // ---- 4.10 notes & bookmarks ----
  a.get('/notes', async (c: Ctx) => {
    const u = requireUser(c)
    const rows = await q.all(c.env, 'SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 200', u.id)
    const marks = await q.all(c.env, 'SELECT * FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC LIMIT 200', u.id)
    return json(c, { ok: true, notes: rows.map(mapNote), bookmarks: marks.map(mapMark) })
  })
  a.post('/notes', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const text = str(b.text).slice(0, 6000)
    if (!text.trim()) throw bad(422, 'Nothing to save.', 'empty')
    const noteId = str(b.id) || id()
    const existing = str(b.id) ? await q.one(c.env, 'SELECT id FROM notes WHERE id = ? AND user_id = ?', noteId, u.id) : null
    if (existing) await q.run(c.env, 'UPDATE notes SET text = ?, updated_at = ? WHERE id = ?', text, now(), noteId)
    else await q.run(c.env, 'INSERT INTO notes (id,user_id,course,session_number,section,text,updated_at) VALUES (?,?,?,?,?,?,?)',
      noteId, u.id, str(b.course), num(b.session), str(b.section) || null, text, now())
    return json(c, { ok: true, id: noteId }, 201)
  })
  a.delete('/notes/:id', async (c: Ctx) => {
    const u = requireUser(c)
    await q.run(c.env, 'DELETE FROM notes WHERE id = ? AND user_id = ?', c.req.param('id'), u.id)
    return json(c, { ok: true })
  })
  a.post('/bookmarks', async (c: Ctx) => {
    const u = requireUser(c)
    const b = await body(c)
    const section = str(b.section) || null
    await q.run(c.env, `INSERT INTO bookmarks (id,user_id,course,session_number,section,label,created_at) VALUES (?,?,?,?,?,?,?)
      ON CONFLICT(user_id,course,session_number,section) DO NOTHING`,
      id(), u.id, str(b.course), num(b.session), section, str(b.label).slice(0, 160) || null, now())
    return json(c, { ok: true })
  })
  a.delete('/bookmarks/:id', async (c: Ctx) => {
    const u = requireUser(c)
    await q.run(c.env, 'DELETE FROM bookmarks WHERE id = ? AND user_id = ?', c.req.param('id'), u.id)
    return json(c, { ok: true })
  })

  a.post('/feedback', async (c: Ctx) => {
    const u = c.get('user')
    const b = await body(c)
    const text = str(b.body).trim().slice(0, 2000)
    if (text.length < 4) throw bad(422, 'Tell us a little more.', 'empty')
    await q.run(c.env, 'INSERT INTO feedback (id,user_id,body,page,created_at) VALUES (?,?,?,?,?)', id(), u?.id ?? null, text, str(b.page).slice(0, 200), now())
    return json(c, { ok: true, thanks: true })
  })

  /** 8.8 — ad telemetry. Checked against ADS.policy so config and API never drift. */
  a.post('/ads/event', async (c: Ctx) => {
    const u = c.get('user')
    const b = await body(c)
    const kind = str(b.kind)
    const placement = str(b.placement)
    if (!['impression', 'click', 'blocked'].includes(kind)) throw bad(422, 'Unknown ad event.', 'bad_event')
    if ((ADS.policy.forbidden as readonly string[]).includes(placement) || !(ADS.policy.allowedPlacements as readonly string[]).includes(placement)) {
      throw bad(422, 'This ad placement is not permitted by policy.', 'policy')
    }
    await q.run(c.env, 'INSERT INTO ad_events (id,kind,placement,network,user_id,course,session_number,created_at) VALUES (?,?,?,?,?,?,?,?)',
      id(), kind, placement.slice(0, 60), str(b.network).slice(0, 20) || 'adsense', u?.id ?? null, str(b.course).slice(0, 40) || null, num(b.session) || null, now())
    return json(c, { ok: true })
  })

  return a
}

const mapNote = (r: Row) => ({ id: r.id, course: r.course, session: r.session_number, section: r.section, text: r.text, updatedAt: r.updated_at })
const mapMark = (r: Row) => ({ id: r.id, course: r.course, session: r.session_number, section: r.section, label: r.label, createdAt: r.created_at })

async function bumpQuest(env: CeaEnv, userId: string, kind: string | null) {
  if (!kind) return
  const day = dayKey(new Date())
  const quest = questFor(userId, day)
  if (quest.kind !== kind) return
  const row = await q.one(env, 'SELECT * FROM daily_quests WHERE user_id=? AND day=? AND kind=?', userId, day, kind)
  const target = quest.target
  if (row?.done) return
  const progress = Number(row?.progress || 0) + 1
  if (row) await q.run(env, 'UPDATE daily_quests SET progress = ?, done = ? WHERE user_id=? AND day=? AND kind=?', progress, progress >= target ? 1 : 0, userId, day, kind)
  else await q.run(env, 'INSERT INTO daily_quests (user_id,day,kind,target,progress,done) VALUES (?,?,?,?,?,?)', userId, day, kind, target, 1, progress >= target ? 1 : 0)
  if (progress >= target) {
    await award(env, { userId, kind: 'quest', key: `${day}:quest`, points: quest.xp })
  }
}

function safeJson<T>(v: unknown, fallback: T): T {
  if (typeof v !== 'string' || !v) return fallback
  try { return JSON.parse(v) as T } catch { return fallback }
}
const scrub = (answers: Record<string, string>) => Object.fromEntries(Object.entries(answers).map(([k, v]) => [k, String(v).slice(0, 400)]))
