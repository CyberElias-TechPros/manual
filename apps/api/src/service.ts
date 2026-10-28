/**
 * Service layer — everything that touches money, access or XP.
 *
 * 5.5 award orchestration is here: one idempotent call per achievement, so a
 * double-tapped "complete" button, a retried fetch after a timeout, or a
 * re-render cannot pay XP twice. That is the single most important invariant in
 * the gamification layer.
 */
import { XP, ACCESS, PAYMENT, RANKS, STREAK } from '@cea/config'
import type { CeaEnv, AuthUser, MailMessage } from './lib.js'
import { ApiError, id, randomBytes, sha256hex, signJwt, verifyJwt, SESSION_COOKIE, readCookie } from './lib.js'
import { render } from './mail.js'
import { rankFor, rollStreak, badgesEarned, lockState, dayKey, xpFor, questFor, type StreakState, type XpKind } from './gamify.js'

export interface Row { [k: string]: any }

export const q = {
  async one<T = Row>(env: CeaEnv, sql: string, ...p: unknown[]): Promise<T | null> {
    return (await env.DB.prepare(sql).bind(...p).first<T>()) ?? null
  },
  async all<T = Row>(env: CeaEnv, sql: string, ...p: unknown[]): Promise<T[]> {
    const r = await env.DB.prepare(sql).bind(...p).all<T>()
    return r.results ?? []
  },
  async run(env: CeaEnv, sql: string, ...p: unknown[]) {
    return env.DB.prepare(sql).bind(...p).run()
  },
}

const nowIso = () => new Date().toISOString()

// ---------------------------------------------------------------------------
// identity
// ---------------------------------------------------------------------------

export async function currentUser(env: CeaEnv, cookieHeader: string | null): Promise<AuthUser | null> {
  const token = readCookie(cookieHeader, SESSION_COOKIE)
  if (!token) return null
  const payload = await verifyJwt(token, env.SECRETS.jwt)
  if (!payload?.sub) return null
  const row = await q.one(env, 'SELECT * FROM users WHERE id = ?', payload.sub)
  if (!row || row.banned_at) return null
  if (payload.jti) {
    const sess = await q.one(env, 'SELECT id FROM auth_sessions WHERE id = ? AND expires_at > ?', payload.jti, nowIso())
    if (!sess) return null
  }
  return mapUser(row)
}

export const mapUser = (r: Row): AuthUser => ({
  id: r.id, email: r.email, name: r.name, role: r.role, isGuest: !!r.is_guest,
  xp: r.xp || 0, streakCount: r.streak_count || 0, streakFreezes: r.streak_freezes || 0,
  lastActiveDate: r.last_active_date ?? null, leaderboardOptIn: !!r.leaderboard_opt_in,
  dataSaver: !!r.data_saver, banned: !!r.banned_at,
})

export async function issueSession(env: CeaEnv, userId: string, meta: { ua?: string; ip?: string } = {}) {
  const jti = randomBytes(12)
  const ttl = 60 * 60 * 24 * 30
  const token = await signJwt({ sub: userId, jti }, env.SECRETS.jwt, ttl)
  await q.run(env, 'INSERT INTO auth_sessions (id,user_id,created_at,expires_at,user_agent,ip) VALUES (?,?,?,?,?,?)',
    jti, userId, nowIso(), new Date(Date.now() + ttl * 1000).toISOString(), meta.ua?.slice(0, 200) ?? null, meta.ip ?? null)
  return token
}

// ---------------------------------------------------------------------------
// mail
// ---------------------------------------------------------------------------

export async function sendMail(env: CeaEnv, to: string, template: string, vars: Record<string, any>) {
  if (!to || to.includes('@example.invalid')) return { skipped: true }
  const msg: MailMessage = { ...render(template, { learnUrl: env.PUBLIC_URL, ...vars }), to }
  const record = async (status: string, error?: string) =>
    q.run(env, 'INSERT INTO email_log (id,to_email,template,subject,status,error,created_at) VALUES (?,?,?,?,?,?,?)',
      id(), to, template, msg.subject, status, error ?? null, nowIso())
  try {
    await env.MAIL(msg)
    await record('sent')
  } catch (e: any) {
    await record('failed', String(e?.message || e).slice(0, 300))
    if (env.ENV === 'development') console.warn('[mail] failed:', e?.message)
  }
  return { queued: true }
}

// ---------------------------------------------------------------------------
// access (2.11 free preview + 7.5 gating)
// ---------------------------------------------------------------------------

export interface AccessInfo { enrolled: boolean; paymentStatus: 'pending' | 'approved' | 'rejected' | null; expiresAt: string | null }

export async function accessFor(env: CeaEnv, userId: string | null, course: string): Promise<AccessInfo> {
  if (!userId) return { enrolled: false, paymentStatus: null, expiresAt: null }
  const enrol = await q.one(env, 'SELECT * FROM enrollments WHERE user_id = ? AND course = ? AND status = ?', userId, course, 'active')
  const pay = await q.one(env, "SELECT status FROM payments WHERE user_id = ? AND course = ? ORDER BY CASE status WHEN 'approved' THEN 0 WHEN 'pending' THEN 1 ELSE 2 END, created_at DESC LIMIT 1", userId, course)
  return {
    enrolled: !!enrol && (!enrol.expires_at || Date.parse(enrol.expires_at) > Date.now()),
    paymentStatus: (pay?.status as any) ?? null,
    expiresAt: enrol?.expires_at ?? null,
  }
}

export async function assertAccess(env: CeaEnv, user: AuthUser | null, course: string, session: { number: number; isFree: boolean }) {
  const info = await accessFor(env, user?.id ?? null, course)
  const state = lockState({ isFree: session.isFree, enrolled: info.enrolled, paymentStatus: info.paymentStatus, expiresAt: info.expiresAt })
  if (state.state === 'locked') throw new ApiError(402, 'This level is part of a paid mission. Session 1 is free.', 'locked', { course })
  if (state.state === 'pending') throw new ApiError(402, 'Your payment is with the academy for approval — usually under 24 hours.', 'pending', { course })
  if (state.state === 'expired') throw new ApiError(403, 'Your access to this course expired. Renew or contact the academy.', 'expired', { course })
  return info
}

// ---------------------------------------------------------------------------
// progress
// ---------------------------------------------------------------------------

export async function getProgress(env: CeaEnv, userId: string, course: string) {
  const rows = await q.all(env, 'SELECT * FROM progress WHERE user_id = ? AND course = ?', userId, course)
  const map = new Map<number, Row>()
  for (const r of rows) map.set(r.session_number, r)
  return map
}

const PROGRESS_COLS = [
  'opened_at', 'last_seen_at', 'completed_at', 'sections_seen', 'furthest_section', 'resume_json',
  'quiz_best_pct', 'quiz_attempts', 'quiz_passed_at', 'exercise_submitted_at', 'checklist_json',
  'scenario_json', 'flashcard_json', 'time_spent_sec', 'minutes', 'read_awarded_at',
] as const
type ProgressCol = (typeof PROGRESS_COLS)[number]
type ProgressPatch = Partial<Record<ProgressCol, unknown>>

/** One row per (learner, course, level). Created on first open, patched as they work. */
export async function upsertProgress(env: CeaEnv, userId: string, course: string, n: number, patch: ProgressPatch, minutes = 105) {
  const existing = await q.one(env, 'SELECT * FROM progress WHERE user_id=? AND course=? AND session_number=?', userId, course, n)
  if (!existing) {
    const cols = ['user_id', 'course', 'session_number', ...PROGRESS_COLS]
    const values = cols.map(c => {
      if (c === 'user_id') return userId
      if (c === 'course') return course
      if (c === 'session_number') return n
      if (c === 'minutes') return patch.minutes ?? minutes
      if (c === 'sections_seen') return JSON.stringify(patch.sections_seen ?? [])
      if (c === 'time_spent_sec') return patch.time_spent_sec ?? 0
      if (c === 'quiz_attempts') return patch.quiz_attempts ?? 0
      if (c === 'opened_at' || c === 'last_seen_at') return nowIso()
      return (patch as any)[c] ?? null
    })
    await q.run(env, `INSERT INTO progress (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`, ...values)
    return await q.one(env, 'SELECT * FROM progress WHERE user_id=? AND course=? AND session_number=?', userId, course, n)
  }
  const keys = Object.keys(patch).filter(k => (PROGRESS_COLS as readonly string[]).includes(k) && (patch as any)[k] !== undefined)
  if (keys.length) {
    await q.run(env, `UPDATE progress SET ${keys.map(k => `${k} = ?`).join(', ')} WHERE user_id=? AND course=? AND session_number=?`,
      ...keys.map(k => (patch as any)[k]), userId, course, n)
  }
  return await q.one(env, 'SELECT * FROM progress WHERE user_id=? AND course=? AND session_number=?', userId, course, n)
}

export async function courseCompletionCounts(env: CeaEnv, userId: string, catalogue: { courses: any[] }) {
  const rows = await q.all(env, 'SELECT course, COUNT(*) AS done FROM progress WHERE user_id = ? AND completed_at IS NOT NULL GROUP BY course', userId)
  const need = new Map(catalogue.courses.map((c: any) => [c.slug, c.sessionsCount]))
  const perCourse = new Map<string, number>()
  let finished = 0
  for (const r of rows) {
    const want = need.get(r.course) ?? 0
    perCourse.set(r.course, Number(r.done))
    if (want && Number(r.done) >= want) finished++
  }
  return { perCourse, finished }
}

// ---------------------------------------------------------------------------
// 5.5 award orchestration
// ---------------------------------------------------------------------------

export interface AwardInput {
  userId: string
  kind: 'lesson_read' | 'quiz_pass' | 'exercise_submit' | 'session_complete' | 'streak' | 'badge' | 'quest' | 'certificate' | 'admin_adjust'
  /** stable idempotency key, e.g. `wd/session-03/complete` */
  key: string
  course?: string
  sessionNumber?: number
  points?: number
  perfect?: boolean
  meta?: Record<string, unknown>
}

export interface AwardResult {
  awarded: boolean
  xp: number
  totalXp: number
  rank: ReturnType<typeof rankFor>
  streak: { count: number; freezes: number; justExtended: boolean }
  badges: { key: string; name: string; description: string; icon: string; tier: string }[]
  unlocked?: { course: string; sessionNumber: number; title: string } | null
  duplicate?: boolean
}

/**
 * One entry point for every reward. Idempotent per (user, key); enforces the
 * daily XP cap (5.9); updates the streak at most once per day; checks badges
 * against the freshly-earned state.
 */
export async function award(env: CeaEnv, input: AwardInput, context?: { course?: any }): Promise<AwardResult> {
  const { userId, key } = input
  const kind: XpKind = input.kind === 'streak' ? 'streak_day' : input.kind
  const prior = await q.one(env, 'SELECT id, payload FROM awards WHERE user_id = ? AND key = ?', userId, key)
  const userRow = await q.one(env, 'SELECT * FROM users WHERE id = ?', userId)
  if (!userRow) throw new ApiError(401, 'Account missing', 'no_user')

  const streakOf = (r: Row): StreakState => ({ count: r.streak_count || 0, lastActiveDate: r.last_active_date ?? null, freezes: r.streak_freezes || 0 })

  if (prior) {
    let payload: any = {}
    try { payload = JSON.parse(prior.payload || '{}') } catch { /* row written by an older build */ }
    return {
      awarded: false, duplicate: true, xp: payload.xp ?? 0, totalXp: userRow.xp || 0,
      rank: rankFor(userRow.xp || 0),
      streak: { count: streakOf(userRow).count, freezes: streakOf(userRow).freezes, justExtended: false },
      badges: payload.badges ?? [], unlocked: payload.unlocked ?? null,
    }
  }

  const at = nowIso()
  await q.run(env, 'INSERT INTO awards (id,user_id,key,kind,payload,created_at) VALUES (?,?,?,?,?,?)', id(), userId, key, input.kind, JSON.stringify({ pending: true }), at)

  // ---- XP, capped per day (5.9) ------------------------------------------
  const today = dayKey(new Date())
  const todayTotal = Number((await q.one(env, 'SELECT COALESCE(SUM(points),0) AS t FROM xp_events WHERE user_id = ? AND substr(created_at,1,10) = ?', userId, today))?.t ?? 0)
  const capLeft = Math.max(0, XP.dailyCap - todayTotal)
  const base = xpFor(kind, { perfect: input.perfect, capLeft })
  const perfectExtra = kind === 'quiz_pass' && input.perfect ? Math.min(XP.quizPerfectBonus, Math.max(0, capLeft - base)) : 0

  // ---- streak (5.3): at most one increment per day, freeze can bridge a gap ----
  const before = streakOf(userRow)
  const next = rollStreak(before, new Date())
  const streakAdvanced = next.lastActiveDate !== before.lastActiveDate
  const streakPoints = streakAdvanced ? XP.streakDay + (next.count % 7 === 0 ? XP.streakWeekBonus : 0) : 0
  const freezes = Math.min(STREAK.maxFreezes, next.freezes + (streakAdvanced && next.count > 0 && next.count % STREAK.freezesEarnedEvery === 0 ? 1 : 0))
  const total = Math.min(base + perfectExtra + streakPoints, capLeft)

  if (total > 0) {
    await q.run(env, 'INSERT INTO xp_events (id,user_id,kind,points,course,session_number,award_key,created_at) VALUES (?,?,?,?,?,?,?,?)',
      id(), userId, input.kind, total, input.course ?? null, input.sessionNumber ?? null, `${key}:xp`, at)
    if (streakPoints > 0) {
      await q.run(env, 'INSERT INTO xp_events (id,user_id,kind,points,course,session_number,award_key,created_at) VALUES (?,?,?,?,?,?,?,?)',
        id(), userId, 'streak', streakPoints, input.course ?? null, input.sessionNumber ?? null, `${key}:streak`, at)
    }
  }
  let xp = Number(userRow.xp || 0) + total
  await q.run(env, 'UPDATE users SET xp = ?, streak_count = ?, streak_best = MAX(COALESCE(streak_best,0), ?), streak_freezes = ?, last_active_date = ?, updated_at = ? WHERE id = ?',
    xp, next.count, next.count, freezes, next.lastActiveDate, at, userId)

  // ---- badges (5.4) --------------------------------------------------------
  const owned = new Set((await q.all(env, 'SELECT badge_key FROM user_badges WHERE user_id = ?', userId)).map(r => r.badge_key))
  const { perCourse, finished } = await courseCompletionCounts(env, userId, await env.CONTENT.index())
  const completedInCourse = perCourse.get(input.course || '') ?? 0
  const sessionsCount = context?.course?.sessionsCount ?? 0
  let unlocked: AwardResult['unlocked'] = null
  if (input.kind === 'session_complete' && context?.course) {
    const nextNum = Number(input.sessionNumber || 0) + 1
    if (nextNum <= sessionsCount) {
      const s2 = context.course.sessions?.find((x: any) => x.number === nextNum)
      unlocked = { course: input.course!, sessionNumber: nextNum, title: s2?.title || `Session ${nextNum}` }
    }
    if (completedInCourse >= sessionsCount && sessionsCount > 0) {
      await q.run(env, 'INSERT INTO course_completions (user_id, course, completed_at) VALUES (?,?,?)', userId, input.course, at).catch(() => undefined)
    }
  }
  const badgeCtx = {
    user: { xp, streak: { ...next, freezes }, badges: [...owned], joinedAt: userRow.created_at },
    course: { slug: input.course || '', sessionsCount },
    session: { number: input.sessionNumber || 0, isCapstone: !!input.meta?.isCapstone },
    stats: {
      completedInCourse,
      coursesCompleted: finished,
      quizPct: (input.meta?.quizPct as number) ?? null,
      quizStreak: Number((await q.one(env, 'SELECT COUNT(*) AS c FROM quiz_attempts WHERE user_id = ? AND passed = 1 AND score_pct >= 80 AND created_at >= ?', userId, new Date(Date.now() - 21 * 864e5).toISOString()))?.c ?? 0),
      timeSpentSec: Number(input.meta?.timeSpentSec || 0),
      hadBrokenStreak: before.count === 0 && Number(userRow.streak_best || 0) >= 3,
      usedPlayground: !!input.meta?.usedPlayground,
      hasNote: !!(await q.one(env, 'SELECT id FROM notes WHERE user_id = ? LIMIT 1', userId)),
      hasBookmark: !!(await q.one(env, 'SELECT id FROM bookmarks WHERE user_id = ? LIMIT 1', userId)),
      dataSaver: !!userRow.data_saver,
      paymentApproved: !!(await q.one(env, "SELECT id FROM payments WHERE user_id = ? AND status = 'approved' LIMIT 1", userId)),
      localHour: Number(new Intl.DateTimeFormat('en-GB', { timeZone: STREAK.timezone, hour: '2-digit', hour12: false }).format(new Date())),
    },
  }
  const newBadges = badgesEarned(badgeCtx as any).filter(b => !owned.has(b.key))
  for (const b of newBadges) {
    await q.run(env, 'INSERT INTO user_badges (user_id,badge_key,awarded_at) VALUES (?,?,?)', userId, b.key, at)
    await q.run(env, 'INSERT INTO xp_events (id,user_id,kind,points,award_key,created_at) VALUES (?,?,?,?,?,?)', id(), userId, 'badge', b.xp, `${key}:badge:${b.key}`, at)
  }
  xp += newBadges.reduce((n, b) => n + b.xp, 0)
  if (newBadges.length) await q.run(env, 'UPDATE users SET xp = ? WHERE id = ?', xp, userId)

  const payload = { xp: total, badges: newBadges, unlocked, totalXp: xp }
  await q.run(env, 'UPDATE awards SET payload = ? WHERE user_id = ? AND key = ?', JSON.stringify(payload), userId, key)

  if (userRow.leaderboard_opt_in && total > 0) {
    const week = isoWeek(new Date())
    await q.run(env, `INSERT INTO leaderboard_weekly (week,user_id,course,xp) VALUES (?,?,'global',?) ON CONFLICT(week,user_id,course) DO UPDATE SET xp = xp + excluded.xp`, week, userId, total)
    if (input.course) {
      await q.run(env, `INSERT INTO leaderboard_weekly (week,user_id,course,xp) VALUES (?,?,?,?) ON CONFLICT(week,user_id,course) DO UPDATE SET xp = xp + excluded.xp`, week, userId, input.course, total)
    }
  }

  return {
    awarded: total > 0, xp: total, totalXp: xp, rank: rankFor(xp),
    streak: { count: next.count, freezes, justExtended: streakAdvanced },
    badges: newBadges, unlocked,
  }
}

export function isoWeek(d: Date): string {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  const dayNum = (date.getUTCDay() + 6) % 7
  date.setUTCDate(date.getUTCDate() - dayNum + 3)
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4))
  const week = 1 + Math.round(((date.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7)
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

export { xpFor }
export const accessPolicy = () => (ACCESS.mode === 'lifetime' ? null : new Date(Date.now() + ACCESS.monthsWhenTimed * 30 * 864e5).toISOString())

export async function grant(env: CeaEnv, userId: string, course: string, source: 'payment' | 'grant' | 'code' | 'beta', opts: { by?: string; note?: string; paymentId?: string } = {}) {
  const existing = await q.one(env, 'SELECT id, status FROM enrollments WHERE user_id=? AND course=?', userId, course)
  if (existing) {
    await q.run(env, "UPDATE enrollments SET status='active', source=?, expires_at=?, revoked_at=NULL, note=COALESCE(?, note) WHERE id=?", source, accessPolicy(), opts.note ?? null, existing.id)
    return { renewed: true }
  }
  await q.run(env, 'INSERT INTO enrollments (id,user_id,course,source,status,granted_by,note,payment_id,created_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?)',
    id(), userId, course, source, 'active', opts.by ?? null, opts.note ?? null, opts.paymentId ?? null, nowIso(), accessPolicy())
  return { granted: true }
}

export function questForUser(userId: string, day: string) { return questFor(userId, day) }
export { PAYMENT, RANKS, dayKey, sha256hex }
