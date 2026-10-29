/**
 * PHASE 5 — the gamification engine, as pure functions.
 *
 * Everything that decides "what did the learner earn" lives here and has no
 * database access, so 10.1 can unit-test it directly (XP, rank thresholds,
 * streak rollover, gating, badges) without a Worker runtime. The DB-touching
 * orchestration sits in `awards.ts`.
 */
import { XP, RANKS, STREAK, GAME, ACCESS, brand } from '@cea/config'

export interface XpInput {
  kind: XpKind
  points: number
  bonus?: number
  /** 5.9 — server-observed time on the lesson, used to reject instant completes */
  timeSpentSec?: number
}
export type XpKind =
  | 'lesson_read' | 'quiz_pass' | 'quiz_perfect' | 'exercise_submit' | 'session_complete'
  | 'streak_day' | 'streak_week' | 'badge' | 'quest' | 'admin_adjust' | 'certificate'
  // added with the "gamified everywhere" decision (2026-10-29) — all three are server-awarded, so a
  // modified bundle still cannot mint XP: the wheel is rolled from (user, day), the combo is counted
  // from the graded answers on the server, and the show-up bonus is keyed to the day.
  | 'spin' | 'combo' | 'first_level'

/** 5.1 — the single XP table. */
export function xpFor(kind: XpKind, opts: { perfect?: boolean; capLeft?: number; reason?: string } = {}): number {
  const table: Record<XpKind, number> = {
    lesson_read: XP.lessonRead,
    quiz_pass: XP.quizPass + (opts.perfect ? XP.quizPerfectBonus : 0),
    quiz_perfect: XP.quizPerfectBonus,
    exercise_submit: XP.exerciseSubmit,
    session_complete: XP.sessionComplete,
    streak_day: XP.streakDay,
    streak_week: XP.streakWeekBonus,
    badge: XP.badgeAward,
    spin: XP.spinBonus,
    combo: XP.comboStreak,
    first_level: XP.firstLevelToday,
    quest: XP.questComplete,
    admin_adjust: 0,
    certificate: 100,
  }
  const raw = table[kind] ?? 0
  if (kind === 'admin_adjust') return opts.reason === 'manual' ? 0 : raw
  const cap = opts.capLeft === undefined ? Infinity : Math.max(0, opts.capLeft)
  return Math.min(raw, cap)
}

export function rankFor(xp: number) {
  let idx = 0
  for (let i = 0; i < RANKS.length; i++) if (xp >= RANKS[i].min) idx = i
  const current = RANKS[idx]
  const next = RANKS[idx + 1] || null
  const span = next ? next.min - current.min : Math.max(1, xp - current.min)
  return {
    current, next, rankIndex: idx,
    pctIntoRank: next ? Math.min(100, Math.round(((xp - current.min) / span) * 100)) : 100,
    toNext: next ? Math.max(0, next.min - xp) : 0,
  }
}

// ---------------------------------------------------------------------------
// 5.3 streaks
// ---------------------------------------------------------------------------

export interface StreakState { count: number; lastActiveDate: string | null; freezes: number; lostDate?: string | null }

export function dayKey(d: Date, tz: string = STREAK.timezone): string {
  // Intl gives us a real timezone rollover — Lagos has no DST, so this is stable.
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
}

export function daysBetween(a: string, b: string): number {
  const t1 = Date.parse(`${a}T00:00:00Z`)
  const t2 = Date.parse(`${b}T00:00:00Z`)
  if (Number.isNaN(t1) || Number.isNaN(t2)) return 0
  return Math.round((t2 - t1) / 86_400_000)
}

/**
 * Called once per awarding action. `alreadyScoredToday` is derived here so
 * multiple actions in one day cannot inflate the streak.
 * A single missed day is covered by a freeze (Duolingo-style "streak repair").
 */
export function rollStreak(state: StreakState, now: Date = new Date(), opts: { earnedFreeze?: boolean } = {}): StreakState {
  const today = dayKey(now)
  if (state.lastActiveDate === today) {
    return { ...state, freezes: Math.min(STREAK.maxFreezes, state.freezes + (opts.earnedFreeze ? 1 : 0)) }
  }
  const gap = state.lastActiveDate ? daysBetween(state.lastActiveDate, today) : Infinity
  let count: number
  if (gap === 1) count = state.count + 1
  else if (gap === 2 && state.freezes > 0) count = state.count + 1        // freeze consumed below
  else if (gap === Infinity) count = 1
  else count = 1
  const usedFreeze = gap === 2 && state.freezes > 0
  return {
    count,
    lastActiveDate: today,
    freezes: Math.min(STREAK.maxFreezes, Math.max(0, state.freezes - (usedFreeze ? 1 : 0)) + (opts.earnedFreeze ? 1 : 0)),
    lostDate: count === 1 && gap > 2 ? state.lastActiveDate ?? null : state.lostDate ?? null,
  }
}

export function streakAtRisk(state: StreakState, now: Date = new Date()): boolean {
  if (!state.lastActiveDate || state.count === 0) return false
  return dayKey(now) !== state.lastActiveDate
}

// ---------------------------------------------------------------------------
// 5.4 badges
// ---------------------------------------------------------------------------

export interface BadgeDef { key: string; name: string; description: string; icon: string; tier: 'bronze' | 'silver' | 'gold' | 'legend'; xp: number }

export const BADGES: BadgeDef[] = [
  { key: 'first-signature', name: 'Signed In', description: 'Created your CEA Learn account.', icon: '✍️', tier: 'bronze', xp: 20 },
  { key: 'first-level', name: 'First Mission Step', description: 'Finished your first level.', icon: '🎯', tier: 'bronze', xp: 25 },
  { key: 'perfect-quiz', name: 'No Misses', description: 'Scored 100% on a knowledge check.', icon: '💯', tier: 'silver', xp: 40 },
  { key: 'quiz-streak-3', name: 'Three In A Row', description: 'Passed 3 quizzes in a row at 80%+.', icon: '', tier: 'silver', xp: 40 },
  { key: 'streak-7', name: 'Week One Agent', description: 'Active 7 days in a row.', icon: '🔥', tier: 'silver', xp: 50 },
  { key: 'streak-30', name: 'Monthly Discipline', description: 'Active 30 days in a row.', icon: '🌙', tier: 'gold', xp: 120 },
  { key: 'streak-100', name: 'Unbroken', description: 'Active 100 days in a row.', icon: '⚡', tier: 'legend', xp: 300 },
  { key: 'xp-1000', name: 'Thousand Points', description: 'Reached 1,000 XP.', icon: '⭐', tier: 'silver', xp: 30 },
  { key: 'xp-5000', name: 'Serious Operator', description: 'Reached 5,000 XP.', icon: '🌟', tier: 'gold', xp: 80 },
  { key: 'night-owl', name: 'Night Owl', description: 'Studied after 22:00 Lagos time.', icon: '🦉', tier: 'bronze', xp: 15 },
  { key: 'early-bird', name: 'Dawn Patrol', description: 'Studied before 06:00 Lagos time.', icon: '🌅', tier: 'bronze', xp: 15 },
  { key: 'comeback', name: 'Back In The Field', description: 'Returned after a broken streak and completed a level.', icon: '🛠️', tier: 'bronze', xp: 25 },
  { key: 'mission-complete', name: 'Mission Complete', description: 'Completed every level of a course.', icon: '🏅', tier: 'gold', xp: 150 },
  { key: 'capstone-shipped', name: 'Capstone Shipped', description: 'Completed a capstone level.', icon: '🚀', tier: 'gold', xp: 100 },
  { key: 'toolbox', name: 'Full Arsenal', description: 'Opened a note, a bookmark and the playground.', icon: '🧰', tier: 'bronze', xp: 20 },
  { key: 'paid-in-full', name: 'Paid In Full', description: 'Payment approved by the academy.', icon: '🧾', tier: 'silver', xp: 40 },
  { key: 'data-saver', name: 'Data Discipline', description: 'Read a whole lesson in data-saver mode.', icon: '📉', tier: 'bronze', xp: 15 },
  { key: 'three-courses', name: 'Triple Threat', description: 'Completed three courses.', icon: '🎖️', tier: 'legend', xp: 250 },
]
export const BADGE_BY_KEY = new Map(BADGES.map(b => [b.key, b]))

export interface AwardContext {
  user: { xp: number; streak: StreakState; badges: string[]; joinedAt: string }
  course: { slug: string; sessionsCount: number }
  session: { number: number; isCapstone: boolean }
  stats: {
    completedInCourse: number
    coursesCompleted: number
    quizPct: number | null
    quizStreak: number
    timeSpentSec: number
    hadBrokenStreak: boolean
    usedPlayground: boolean
    hasNote: boolean
    hasBookmark: boolean
    dataSaver: boolean
    paymentApproved: boolean
    localHour: number
  }
}

/** Which badges does this action unlock? Pure, so it can be unit-tested. */
export function badgesEarned(ctx: AwardContext): BadgeDef[] {
  const owned = new Set(ctx.user.badges)
  const have = (k: string) => owned.has(k)
  const out: BadgeDef[] = []
  const add = (k: string) => { const b = BADGE_BY_KEY.get(k); if (b && !have(k)) out.push(b) }
  if (ctx.user.xp <= 0) add('first-signature')
  add('first-level')
  if (ctx.stats.quizPct === 100) add('perfect-quiz')
  if (ctx.stats.quizStreak >= 3) add('quiz-streak-3')
  if (ctx.user.streak.count >= 7) add('streak-7')
  if (ctx.user.streak.count >= 30) add('streak-30')
  if (ctx.user.streak.count >= 100) add('streak-100')
  if (ctx.user.xp + 0 >= 1000) add('xp-1000')
  if (ctx.user.xp >= 5000) add('xp-5000')
  if (ctx.stats.localHour >= 22 || ctx.stats.localHour < 4) add('night-owl')
  if (ctx.stats.localHour >= 4 && ctx.stats.localHour < 6) add('early-bird')
  if (ctx.stats.hadBrokenStreak) add('comeback')
  if (ctx.stats.completedInCourse >= ctx.course.sessionsCount) add('mission-complete')
  if (ctx.session.isCapstone && ctx.stats.completedInCourse >= ctx.course.sessionsCount) add('capstone-shipped')
  if (ctx.stats.usedPlayground && ctx.stats.hasNote && ctx.stats.hasBookmark) add('toolbox')
  if (ctx.stats.dataSaver) add('data-saver')
  if (ctx.stats.paymentApproved) add('paid-in-full')
  if (ctx.stats.coursesCompleted >= 3) add('three-courses')
  return out
}

// ---------------------------------------------------------------------------
// 7.5 access gating (shared by the API and the UI so they can never disagree)
// ---------------------------------------------------------------------------

/**
 * 5.x — the daily wheel. Deterministic on purpose: the outcome comes from (user, day, spin number),
 * so a refresh cannot re-roll for a better prize and the client never chooses its own XP. The index
 * is returned too, because the UI has to land the pointer on the segment the server actually picked.
 */
export function spinRoll(userId: string, day: string, spin = 0): { index: number; segment: (typeof GAME.wheel.segments)[number] } {
  const segs = GAME.wheel.segments
  const total = segs.reduce((n, s) => n + s.weight, 0)
  let h = 0
  const seed = `${userId}|${day}|spin|${spin}`
  for (let i = 0; i < seed.length; i++) h = (h * 131 + seed.charCodeAt(i)) >>> 0
  let pick = h % total
  for (let i = 0; i < segs.length; i++) {
    if (pick < segs[i].weight) return { index: i, segment: segs[i] }
    pick -= segs[i].weight
  }
  return { index: 0, segment: segs[0] }
}

/** 5.x — a run of correct answers inside one check. Counted from graded answers, never self-reported. */
export function comboBonus(correctRun: number): number {
  if (correctRun < GAME.combo.trigger) return 0
  return Math.min(GAME.combo.max, (correctRun - GAME.combo.trigger + 1) * GAME.combo.xpPerCorrect)
}

export type LockState = 'free' | 'unlocked' | 'locked' | 'pending' | 'expired'

export function lockState(o: {
  isFree: boolean; enrolled: boolean; paymentStatus?: 'pending' | 'approved' | 'rejected' | null
  expiresAt?: string | null; now?: Date
}): { state: LockState; httpStatus: number } {
  const now = o.now ?? new Date()
  // 7.12 — payments are paused (ACCESS.mode === 'free'): every level is open, so no learner is ever
  // told "locked", and no route needs its own copy of that decision. `CEA_ACCESS_MODE=paid` puts the
  // whole gate back exactly as written below; the checkout flow and the admin queue were never
  // removed, which is the difference between "paused" and "gone".
  if (ACCESS.mode === 'free') return { state: 'unlocked', httpStatus: 200 }
  if (o.enrolled && o.expiresAt && Date.parse(o.expiresAt) < now.getTime()) return { state: 'expired', httpStatus: 403 }
  if (o.enrolled) return { state: 'unlocked', httpStatus: 200 }
  if (o.isFree) return { state: 'free', httpStatus: 200 }
  if (o.paymentStatus === 'pending') return { state: 'pending', httpStatus: 402 }
  return { state: 'locked', httpStatus: 402 }
}

/** 5.7 — stars on a level node come from the quiz score, not from attendance. */
export function starsFor(pct: number | null | undefined): 0 | 1 | 2 | 3 {
  if (pct == null) return 0
  if (pct >= 90) return 3
  if (pct >= 70) return 2
  if (pct >= XP.quizPassPercent) return 1
  return 0
}

// ---------------------------------------------------------------------------
// 5.8 daily quest — deterministic per learner per day, no table needed to plan it
// ---------------------------------------------------------------------------

export type QuestKind = 'one-level' | 'quiz-80' | 'practice-task' | 'review-flashcards' | 'resume'
export interface Quest { kind: QuestKind; label: string; target: number; xp: number }

const POOL: Quest[] = [
  { kind: 'one-level', label: 'Finish one level', target: 1, xp: 30 },
  { kind: 'quiz-80', label: 'Score 80% or more on a knowledge check', target: 1, xp: 30 },
  { kind: 'practice-task', label: 'Submit one practice task', target: 1, xp: 30 },
  { kind: 'review-flashcards', label: 'Review 10 flashcards', target: 10, xp: 30 },
  { kind: 'resume', label: 'Pick up where you stopped', target: 1, xp: 30 },
]

export function questFor(userId: string, day: string): Quest {
  let h = 0
  const seed = `${userId}|${day}`
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return POOL[h % POOL.length]
}

export const LOCAL_NOTE = `Times use ${brand.name}'s timezone (${STREAK.timezone}).`
