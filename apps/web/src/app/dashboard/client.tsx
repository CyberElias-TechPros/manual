'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  AdSlot, Button, Card, Chip, NgAdSlot, ProgressBar, RankChip, Skeleton, StatBlock,
  StreakFlame, request, useApi, useSession,
} from '@cea/ui'
import { XP } from '@cea/config'

type Summary = {
  signedIn: boolean
  user: any
  quest?: { kind: string; label: string; target: number; xp: number; progress: number; done: boolean }
  xpToday?: number
  weeklyXp?: number
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
  const [claiming, setClaiming] = useState<string | null>(null)
  const s = summary.data

  if (loading || (!user && !summary.loading && false)) return <DashboardSkeleton />
  if (!user) return <GuestDashboard />

  if (summary.error) {
    return (
      <Card className="mx-auto max-w-reading text-center">
        <h1 className="text-lg font-semibold">Dashboard offline</h1>
        <p className="mt-1 text-sm text-ink/70 dark:text-light/70">{summary.error.message}{summary.offline ? ' — showing the last version is not possible for this page.' : ''}</p>
        <Button size="sm" className="mt-3" onClick={summary.reload}>Try again</Button>
      </Card>
    )
  }

  const streak = user.streak ?? { count: 0, best: 0, freezes: 0, atRisk: false }
  const xpToday = s?.xpToday ?? 0
  const capLeft = Math.max(0, XP.dailyCap - xpToday)
  const all = s?.continueLearning ?? []
  const resume = all.filter(x => !x.completedAt).slice(0, 3)
  const keepGoing = all.filter(x => !!x.completedAt).slice(0, 3)

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user.name?.split(' ')[0]}</h1>
          <p className="mt-0.5 text-sm text-ink/70 dark:text-light/70">
            {resume.length ? `${resume.length} level${resume.length > 1 ? 's' : ''} waiting, ` : ''}{capLeft > 0 ? `${capLeft} XP still available today.` : 'Daily cap reached — come back tomorrow (that is the point).'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RankChip rank={user.rank?.current ?? { key: 'rookie', name: 'Rookie' }} xp={user.xp} next={user.rank?.next} />
          <StreakFlame count={streak.count} atRisk={streak.atRisk} freezes={streak.freezes} />
        </div>
      </header>

      <section aria-label="Today" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock label="XP today" value={xpToday} hint={`cap ${XP.dailyCap}/day`} tone={capLeft === 0 ? 'gold' : undefined} />
        <StatBlock label="This week" value={s?.weeklyXp ?? 0} hint="leaderboard counts this" />
        <StatBlock label="Streak" value={`${streak.count} day${streak.count === 1 ? '' : 's'}`} hint={streak.atRisk ? 'finish one level tonight' : `best ${streak.best ?? 0}`} tone={streak.atRisk ? 'error' : 'success'} />
        <StatBlock label="Levels done" value={Object.values(s?.user?.completedByCourse ?? {}).reduce((a: number, b: any) => a + Number(b), 0)} hint={`${s?.enrolments?.length ?? 0} course${(s?.enrolments?.length ?? 0) === 1 ? '' : 's'} enrolled`} />
      </section>

      {s?.quest && (
        <Card className="flex flex-wrap items-center gap-4">
          <div className="min-w-[12rem] flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold">Daily quest</h2>
              {s.quest.done ? <Chip tone="success">done</Chip> : <Chip tone="gold">+{s.quest.xp} XP</Chip>}
            </div>
            <p className="mt-0.5 text-sm text-ink/75 dark:text-light/75">{s.quest.label}</p>
            <ProgressBar className="mt-2" value={s.quest.progress} max={s.quest.target} label={`${Math.min(s.quest.progress, s.quest.target)} of ${s.quest.target}`} tone={s.quest.done ? 'success' : 'gold'} />
          </div>
          {resume[0] && <Button size="sm" variant="outline" onClick={() => { location.href = `/learn/${resume[0].course}/${resume[0].sessionNumber}` }}>Do it now</Button>}
        </Card>
      )}

      {s?.pendingPayments?.length ? (
        <Card className="border-warn/45 bg-warn/8">
          <h2 className="text-base font-semibold">Waiting for the academy to approve {s.pendingPayments.length} receipt{s.pendingPayments.length > 1 ? 's' : ''}</h2>
          <ul className="mt-2 space-y-1.5 text-sm">
            {s.pendingPayments.map(p => (
              <li key={p.reference} className="flex flex-wrap items-center justify-between gap-2">
                <span><Link className="font-medium underline" href={`/checkout/${p.course}`}>{p.course.replace(/-/g, ' ')}</Link> <span className="font-mono text-xs opacity-70">{p.reference}</span></span>
                <span className="text-xs text-ink/60 dark:text-light/60">sent {new Date(p.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink/65 dark:text-light/65">Approval usually lands within a day. You do not need to pay again — the level unlocks by itself.</p>
        </Card>
      ) : null}

      <section aria-labelledby="continue">
        <h2 id="continue" className="mb-2 text-lg font-semibold">Pick up where you stopped</h2>
        {resume.length === 0 && keepGoing.length === 0 ? (
          <Card className="text-center">
            <p className="text-sm">Nothing in progress. Open the free level of any course and it will appear here — even after a week.</p>
            <Button size="sm" className="mt-3" onClick={() => { location.href = '/courses' }}>Browse courses</Button>
          </Card>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...resume, ...keepGoing].map(c => (
              <li key={`${c.course}-${c.sessionNumber}`}>
                <Link href={`/learn/${c.course}/${c.sessionNumber}`} className="block h-full">
                  <Card pad={false} className="h-full overflow-hidden transition hover:shadow-glow">
                    <span aria-hidden className="block h-1.5 w-full" style={{ background: c.accent || '#1a365d' }} />
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2 text-xs text-ink/55 dark:text-light/55">
                        <span className="capitalize">{c.course.replace(/-/g, ' ')}</span>
                        <span>level {c.sessionNumber}</span>
                      </div>
                      <h3 className="mt-1 text-[15px] font-semibold leading-snug">{c.sessionTitle || c.title}</h3>
                      <div className="mt-2 flex items-center gap-2 text-xs text-ink/60 dark:text-light/60">
                        {c.completedAt ? <Chip tone="success">completed</Chip> : c.lastSeen ? <Chip tone="muted">resume</Chip> : null}
                        {c.quizBest != null && <span>quiz {c.quizBest}%</span>}
                      </div>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {(due.data?.due?.length ?? 0) > 0 && (
        <section aria-labelledby="due">
          <h2 id="due" className="mb-2 text-lg font-semibold">Cards waiting for a review</h2>
          <Card>
            <p className="text-sm">
              {due.data!.due.length} flashcard{due.data!.due.length > 1 ? 's are' : ' is'} due. Two minutes on these moves more to long-term
              memory than a new level does today — and the deck is inside the lesson it came from.
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {[...new Set(due.data!.due.map(d => d.card_id.replace(/-s\d+-\d+$/, '')))].slice(0, 6).map(slug => (
                <li key={slug}>
                  <Link href={`/learn/${slug}/1`} className="inline-flex min-h-[36px] items-center rounded-pill bg-surface-muted px-3 text-xs font-medium capitalize hover:bg-gold/25 dark:bg-surface-dark-muted">{slug.replace(/-/g, ' ')}</Link>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}

      {(s?.certificates?.length ?? 0) > 0 && (
        <Card>
          <h2 className="text-base font-semibold">Your certificates</h2>
          <ul className="mt-2 space-y-1.5 text-sm">
            {s!.certificates!.map((cert: any) => (
              <li key={cert.id} className="flex items-center justify-between gap-2">
                <Link href={`/certificates/${cert.code}`} className="font-medium capitalize underline">{cert.course.replace(/-/g, ' ')}</Link>
                <span className="font-mono text-xs">{cert.code}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <AdSlot placement="dashboard-side" />
      <NgAdSlot placement="dashboard-side" />
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
      const r = localStorage.getItem('cea:lastLevel')
      if (r) setGuestId(JSON.parse(r).guestId ?? null)
    } catch { /* ignore */ }
  }, [])

  return (
    <div className="mx-auto max-w-reading space-y-4">
      <Card className="text-center">
        <h1 className="text-xl font-bold">Your dashboard starts with an account</h1>
        <p className="mt-1.5 text-sm text-ink/70 dark:text-light/70">
          XP, streaks, badges and the “continue where you stopped” list need somewhere to live. A free account takes 20 seconds and
          keeps working offline; nothing is charged until you choose a paid course.
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <Link href="/auth/register" className="inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white hover:bg-blue">Create free account</Link>
          <Link href="/auth/login" className="inline-flex min-h-[44px] items-center rounded-pill border border-surface-line px-4 text-sm font-medium dark:border-surface-dark-line">Sign in</Link>
        </div>
      </Card>
      <Card>
        <h2 className="text-base font-semibold">Trying it without an account?</h2>
        <p className="mt-1 text-sm text-ink/70 dark:text-light/70">Level 1 of every course is open to everyone. Start with the one you are most curious about:</p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {[['web-development', 'Web Development'], ['cybersecurity', 'Cybersecurity'], ['graphic-design', 'Graphic Design'], ['digital-marketing', 'Digital Marketing']].map(([slug, name]) => (
            <li key={slug}><Link href={`/learn/${slug}/1`} className="flex min-h-[44px] items-center justify-between rounded-card bg-surface-muted px-3 text-sm font-medium hover:bg-gold/20 dark:bg-surface-dark-muted">{name}<span aria-hidden>→</span></Link></li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink/60 dark:text-light/60">
          A guest pass can hold your place for a while, but it lives in this browser only. If this device dies, so does the progress —
          that is why the free account exists.
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Button
            size="sm" variant="outline" loading={busy}
            onClick={async () => {
              setBusy(true); setErr(null)
              try {
                const r = await request<{ guestId: string }>('/api/auth/guest', { method: 'POST', body: {} })
                localStorage.setItem('cea:lastLevel', JSON.stringify({ guestId: r.guestId }))
                setGuestId(r.guestId)
                location.href = '/courses'
              } catch (e: any) { setErr(e?.message || 'Could not start the guest pass.') } finally { setBusy(false) }
            }}
          >Start a guest pass</Button>
          {guestId && <span className="font-mono text-xs text-ink/60 dark:text-light/60">guest {guestId.slice(0, 8)}</span>}
          {err && <span role="alert" className="text-xs text-error">{err}</span>}
        </div>
      </Card>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true">
      <Skeleton className="h-8 w-56" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[0, 1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-card" />)}</div>
      <Skeleton className="h-32 w-full rounded-card" />
    </div>
  )
}
