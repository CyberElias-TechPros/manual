'use client'
/**
 * The learner's front door. One thing to do next, then the numbers, then anything that needs a
 * decision (a receipt waiting, cards due). Everything below the fold is a list, not a card: a
 * dashboard that shouts about streaks is how an LMS starts feeling like a game and stops feeling
 * like a class (docs/DESIGN.md).
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  AdSlot, Button, GUEST_KEY, Label, NgAdSlot, Pill, ProgressBar, Skeleton, StatBlock, linkClass,
  SpinWheel, StreakCalendar, StreakFlame, guestIdOf, request, useApi, useSession,
} from '@cea/ui'
import { XP } from '@cea/config'

type Summary = {
  signedIn: boolean
  user: any
  quest?: { kind: string; label: string; target: number; xp: number; progress: number; done: boolean }
  xpToday?: number
  weeklyXp?: number
  activityDays?: { day: string; xp: number }[]
  spin?: { spinsToday: number; spinsLeft: number; bonusAt: number; streak: number }
  enrolments?: string[]
  pendingPayments?: { course: string; reference: string; created_at: string }[]
  certificates?: any[]
  continueLearning?: { course: string; title: string; cover?: string; accent?: string; sessionNumber: number; sessionTitle?: string; completedAt?: string | null; quizBest?: number | null; lastSeen?: string | null; resume?: any }[]
  due?: any[]
}

export function DashboardClient() {
  const { user, loading } = useSession()
  const summary = useApi<Summary>(user ? '/api/summary' : null)
  // /api/learn/due is the spaced-repetition queue (8.x), not "overdue lessons".
  const due = useApi<{ due: { card_id: string; due_at: string | null }[] }>(user ? '/api/learn/due' : null)
  const s = summary.data

  if (loading || (!user && !summary.loading && false)) return <DashboardSkeleton />
  if (!user) return <GuestDashboard />

  if (summary.error) {
    return (
      <div className="mx-auto max-w-reading py-10 text-center">
        <h1 className="text-xl font-semibold text-ink dark:text-light">Dashboard offline</h1>
        <p className="mt-2 text-[0.9375rem] text-ink-500 dark:text-light/60">
          {summary.error.message}{summary.offline ? ' — this page cannot be shown from the cache.' : ''}
        </p>
        <Button size="sm" className="mt-5" onClick={summary.reload}>Try again</Button>
      </div>
    )
  }

  const streak = user.streak ?? { count: 0, best: 0, freezes: 0, atRisk: false }
  const xpToday = s?.xpToday ?? 0
  const capLeft = Math.max(0, XP.dailyCap - xpToday)
  const all = s?.continueLearning ?? []
  const resume = all.filter(x => !x.completedAt)
  const keepGoing = all.filter(x => !!x.completedAt)
  const nextUp = resume[0] ?? keepGoing[0]
  const levelsDone = Object.values(s?.user?.completedByCourse ?? {}).reduce((a: number, b: any) => a + Number(b), 0)
  const dueCourses = [...new Set((due.data?.due ?? []).map(d => d.card_id.replace(/-s\d+-\d+$/, '')))].slice(0, 6)

  return (
    <div className="pb-6">
      <header className="max-w-reading">
        <h1 className="text-2xl font-semibold tracking-snugish text-ink sm:text-3xl dark:text-light">
          Welcome back, {user.name?.split(' ')[0] || 'there'}
        </h1>
        <p className="mt-2 text-base leading-relaxed text-ink-600 dark:text-light/70">
          {nextUp
            ? <>Level {nextUp.sessionNumber} of {nextUp.course.replace(/-/g, ' ')} is waiting. {capLeft > 0 ? `You have ${capLeft} XP still available today.` : 'Today’s XP cap is reached — come back tomorrow, that is the point.'}</>
            : 'Nothing in progress. The first level of every course is free, and it takes about 20 minutes to start.'}
        </p>
      </header>

      {nextUp ? (
        <section aria-labelledby="continue" className="mt-8 max-w-reading">
          <h2 id="continue" className="sr-only">Continue where you stopped</h2>
          <div className="rounded-card border border-surface-line bg-surface p-5 sm:p-6 dark:border-surface-dark-line dark:bg-surface-dark">
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
              <div className="min-w-0">
                <Label>{nextUp.course.replace(/-/g, ' ')} · {nextUp.completedAt ? 'revise again' : `level ${nextUp.sessionNumber}`}</Label>
                <h3 className="mt-1 text-lg font-medium leading-snug text-ink dark:text-light">{nextUp.sessionTitle || nextUp.title}</h3>
                {nextUp.quizBest != null && <p className="mt-1.5 text-[0.875rem] text-ink-500 dark:text-light/55">Knowledge check: best {nextUp.quizBest}%</p>}
              </div>
              <Link href={`/learn/${nextUp.course}/${nextUp.sessionNumber}`} className="inline-flex min-h-[48px] shrink-0 items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#152c4d]">
                {nextUp.completedAt ? 'Open level' : 'Continue'}
              </Link>
            </div>
            {resume.length > 1 && (
              <p className="mt-4 border-t border-surface-line pt-3 text-[0.875rem] text-ink-500 dark:border-surface-dark-line dark:text-light/55">
                {resume.length - 1} other {resume.length - 1 === 1 ? 'level' : 'levels'} open: {resume.slice(1, 4).map(r => `${r.course.replace(/-/g, ' ')} ${r.sessionNumber}`).join(', ')}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="mt-8 max-w-reading">
          <div className="rounded-card border border-surface-line bg-surface p-5 sm:p-6 dark:border-surface-dark-line dark:bg-surface-dark">
            <h2 className="text-lg font-medium text-ink dark:text-light">Pick a course and open its free level</h2>
            <p className="mt-1.5 text-[0.9375rem] text-ink-500 dark:text-light/60">No payment, no card. Level 1 of all 16 courses is open to everyone.</p>
            <div className="mt-4 flex flex-wrap items-center gap-5">
              <Link href="/courses" className="inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white hover:bg-[#152c4d]">Browse courses</Link>
              <Link className={linkClass} href="/learn/typing-computer-basics/1">Start with typing and computer basics</Link>
            </div>
          </div>
        </section>
      )}

      <section aria-label="Your numbers" className="mt-10 max-w-reading">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-y border-surface-line py-6 sm:grid-cols-4 dark:border-surface-dark-line">
          <StatBlock label="XP today" value={xpToday} hint={`of ${XP.dailyCap}`} />
          <StatBlock label="This week" value={s?.weeklyXp ?? 0} hint="what the leaderboard counts" />
          <div>
            <div className="text-[0.8125rem] text-ink-500 dark:text-light/55">Streak</div>
            <div className="mt-0.5 flex items-center gap-2">
              <StreakFlame count={streak.count} atRisk={streak.atRisk} freezes={streak.freezes} />
            </div>
            <div className="mt-0.5 text-[0.8125rem] text-ink-500 dark:text-light/50">best {streak.best ?? 0} days</div>
          </div>
          <StatBlock label="Levels done" value={levelsDone} hint={`${s?.enrolments?.length ?? 0} course${(s?.enrolments?.length ?? 0) === 1 ? '' : 's'} enrolled`} />
        </div>

        {s?.quest && (
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="min-w-0 flex-1 text-[0.9375rem] text-ink-600 dark:text-light/70">
              <span className="font-medium text-ink dark:text-light">Today’s goal</span> · {s.quest.label}
              {s.quest.done ? <Pill tone="success" className="ml-2">done</Pill> : <span className="ml-2 tabular-nums text-ink-500 dark:text-light/55">+{s.quest.xp} XP</span>}
            </p>
            <ProgressBar className="w-full max-w-[12rem]" value={Math.min(s.quest.progress, s.quest.target)} max={s.quest.target} tone={s.quest.done ? 'success' : 'navy'} />
          </div>
        )}
      </section>

      {/* 5.9 — the game half of the front door: the reward you can spend today and the record of the
          days you showed up. Both read what the API already decided (`/api/summary`), and after a spin
          the page re-reads the summary instead of editing the number locally. */}
      <section aria-label="Your streak and today's bonus" className="mt-10 grid max-w-reading gap-5 lg:grid-cols-2">
        <SpinWheel spin={s?.spin} onChanged={() => void summary.reload?.()} />
        <StreakCalendar days={s?.activityDays} />
      </section>

      {s?.pendingPayments?.length ? (
        <section aria-labelledby="pending" className="mt-10 max-w-reading">
          <h2 id="pending" className="text-lg font-semibold text-ink dark:text-light">Waiting for approval</h2>
          <p className="mt-1 text-[0.9375rem] text-ink-500 dark:text-light/55">
            Approval usually lands within a day, and the levels open by themselves — you do not need to pay again.
          </p>
          <ul className="mt-3 divide-y divide-surface-line dark:divide-surface-dark-line">
            {s.pendingPayments.map(p => (
              <li key={p.reference} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                <Link className={linkClass} href={`/checkout/${p.course}`}>{p.course.replace(/-/g, ' ')}</Link>
                <span className="text-[0.8125rem] tabular-nums text-ink-500 dark:text-light/55">
                  <span className="font-mono">{p.reference}</span> · sent {new Date(p.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {(dueCourses.length > 0) && (
        <section aria-labelledby="due" className="mt-10 max-w-reading">
          <h2 id="due" className="text-lg font-semibold text-ink dark:text-light">Cards waiting for a review</h2>
          <p className="mt-1 max-w-reading text-[0.9375rem] leading-relaxed text-ink-500 dark:text-light/55">
            {due.data!.due.length} flashcard{due.data!.due.length > 1 ? 's are' : ' is'} due. Two minutes on these moves more into long-term memory than
            a new level does today, and each deck is inside the level it came from.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
            {dueCourses.map(slug => (
              <li key={slug}><Link className={linkClass} href={`/learn/${slug}/1`}>{slug.replace(/-/g, ' ')}</Link></li>
            ))}
          </ul>
        </section>
      )}

      {(s?.certificates?.length ?? 0) > 0 && (
        <section aria-labelledby="certs" className="mt-10 max-w-reading">
          <h2 id="certs" className="text-lg font-semibold text-ink dark:text-light">Your certificates</h2>
          <ul className="mt-2 divide-y divide-surface-line dark:divide-surface-dark-line">
            {s!.certificates!.map((cert: any) => (
              <li key={cert.id} className="flex items-baseline justify-between gap-4 py-3">
                <Link className={linkClass} href={`/certificates/${cert.code}`}>{cert.course.replace(/-/g, ' ')}</Link>
                <span className="font-mono text-[0.8125rem] text-ink-500 dark:text-light/55">{cert.code}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {keepGoing.length > 0 && resume.length > 0 && (
        <section aria-labelledby="finished" className="mt-10 max-w-reading">
          <h2 id="finished" className="text-lg font-semibold text-ink dark:text-light">Recently finished</h2>
          <ul className="mt-2 divide-y divide-surface-line dark:divide-surface-dark-line">
            {keepGoing.map(c => (
              <li key={`${c.course}-${c.sessionNumber}`} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                <Link className={linkClass} href={`/learn/${c.course}/${c.sessionNumber}`}>{c.sessionTitle || c.title}</Link>
                <span className="text-[0.8125rem] capitalize text-ink-500 dark:text-light/55">{c.course.replace(/-/g, ' ')} · level {c.sessionNumber}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 max-w-reading">
        <AdSlot placement="dashboard-side" />
        <AdSlot placement="dashboard-inline" variant="card" />
        <NgAdSlot placement="dashboard-side" />
      </div>
    </div>
  )
}

function GuestDashboard() {
  const [guestId, setGuestId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      setGuestId(guestIdOf(localStorage))
    } catch { /* ignore */ }
  }, [])

  return (
    <div className="mx-auto max-w-reading py-4">
      <h1 className="text-2xl font-semibold tracking-snugish text-ink dark:text-light">Your dashboard starts with an account</h1>
      <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-light/70">
        XP, streaks, badges and “continue where you stopped” need somewhere to live. A free account takes 20 seconds, works
        offline, and nothing is charged until you choose a paid course.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <Link href="/auth/register" className="inline-flex min-h-[48px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white hover:bg-[#152c4d]">Create a free account</Link>
        <Link className={linkClass} href="/auth/login">Sign in</Link>
      </div>

      <section className="mt-12 border-t border-surface-line pt-6 dark:border-surface-dark-line">
        <h2 className="text-lg font-semibold text-ink dark:text-light">Trying it without an account?</h2>
        <p className="mt-1.5 text-[0.9375rem] text-ink-500 dark:text-light/55">Level 1 of every course is open to everyone. Start with the one you are most curious about:</p>
        <ul className="mt-2 divide-y divide-surface-line dark:divide-surface-dark-line">
          {[['typing-computer-basics', 'Typing & Computer Basics'], ['microsoft-office', 'Microsoft Office'], ['graphic-design', 'Graphic Design'], ['web-development', 'Web Development']].map(([slug, name]) => (
            <li key={slug}>
              <Link href={`/learn/${slug}/1`} className="flex min-h-[52px] items-center justify-between gap-4 text-[0.9375rem] text-ink transition-colors hover:text-navy dark:text-light/85">
                {name}<span aria-hidden className="text-ink-300 dark:text-light/30">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button
            size="sm" variant="outline" loading={busy}
            onClick={async () => {
              setBusy(true); setErr(null)
              try {
                const r = await request<{ guestId: string }>('/api/auth/guest', { method: 'POST', body: {} })
                localStorage.setItem(GUEST_KEY, JSON.stringify({ guestId: r.guestId }))
                setGuestId(r.guestId)
                location.href = '/courses'
              } catch (e: any) { setErr(e?.message || 'Could not start the guest pass.') } finally { setBusy(false) }
            }}
          >Start a guest pass</Button>
          <span className="max-w-measure text-[0.8125rem] leading-relaxed text-ink-500 dark:text-light/50">
            A guest pass holds your place in this browser only — if the device dies, so does the progress. That is why the free account exists.
          </span>
          {guestId && <span className="font-mono text-[0.8125rem] text-ink-500 dark:text-light/55">guest {guestId.slice(0, 8)}</span>}
          {err && <span role="alert" className="text-[0.8125rem] text-error">{err}</span>}
        </div>
      </section>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="max-w-reading space-y-6 py-4" aria-busy="true">
      {/* the page is called Dashboard whether or not the summary has landed yet */}
      <h1 className="text-2xl font-semibold tracking-snugish text-ink sm:text-3xl dark:text-light">Dashboard</h1>
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-28 w-full rounded-card" />
      <div className="grid grid-cols-2 gap-6 border-y border-surface-line py-6 sm:grid-cols-4 dark:border-surface-dark-line">
        {[0, 1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    </div>
  )
}
