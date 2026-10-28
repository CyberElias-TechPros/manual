'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button, Label, Pill, ProgressBar, RankChip, Stars, StreakFlame, useApi, useSession, cx } from '@cea/ui'
import { RANKS, XP } from '@cea/config'

/**
 * 5.4/5.5 — the trophy cabinet. Badge definitions come from the API (they are
 * server-side constants, so a cheat cannot invent a badge), the catalogue copy
 * comes from the built content bundle.
 */
export function ProfileClient() {
  const { user, loading } = useSession()
  const summary = useApi<any>(user ? '/api/summary' : null)
  const courses = useApi<{ courses: any[] }>(user ? '/api/courses' : null)
  const [tab, setTab] = useState<'badges' | 'courses' | 'data'>('badges')
  if (loading) return <p className="text-sm text-ink-500 dark:text-light/60">Loading your progress…</p>
  if (!user) return (
    <div className="mx-auto max-w-measure py-12 text-center">
      <h1 className="text-2xl font-semibold text-ink dark:text-light">Sign in to see your badges</h1>
      <p className="mx-auto mt-3 max-w-measure text-[0.9375rem] text-ink-500 dark:text-light/60">Your trophy cabinet, your ranks and the levels you have closed live on the account.</p>
      <Link href="/auth/login?next=/profile" className="mt-6 inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white">Sign in</Link>
    </div>
  )

  const profile = summary.data?.user ?? user
  const owned = new Set((profile.badges ?? []).map((b: any) => b.key))
  const catalogue: any[] = profile.badgeCatalogue ?? []
  const ranks: any[] = profile.ranks ?? RANKS
  const completed: Record<string, number> = profile.completedByCourse ?? {}
  const nextRank = profile.rank?.next

  return (
    <div className="pb-8">
      <header className="max-w-reading">
        <h1 className="text-2xl font-semibold tracking-snugish text-ink sm:text-3xl dark:text-light">{profile.name}</h1>
        <p className="mt-2 text-[0.875rem] text-ink-500 dark:text-light/55">
          {profile.email}{profile.isGuest ? ' · guest pass' : ''} · joined {new Date(profile.joinedAt).toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}
        </p>
      </header>

      <section aria-label="Rank and streak" className="mt-7 max-w-reading">
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 border-y border-surface-line py-5 sm:grid-cols-[1fr_auto_auto] dark:border-surface-dark-line">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <RankChip rank={profile.rank?.current ?? { key: 'rookie', name: 'Rookie' }} xp={profile.xp} next={nextRank} />
              {nextRank
                ? <Label>{(nextRank.min - profile.xp).toLocaleString('en-NG')} XP to {nextRank.name}</Label>
                : <Pill tone="gold">top rank</Pill>}
            </div>
            <ProgressBar className="mt-3" value={nextRank ? profile.xp - (profile.rank?.current?.min ?? 0) : 100} max={nextRank ? nextRank.min - (profile.rank?.current?.min ?? 0) : 100} />
          </div>
          <StreakFlame count={profile.streak?.count ?? 0} atRisk={profile.streak?.atRisk} freezes={profile.streak?.freezes} size="lg" />
          <div>
            <Label>Total XP</Label>
            <div className="text-2xl font-semibold tabular-nums text-ink dark:text-light">{profile.xp.toLocaleString('en-NG')}</div>
          </div>
        </div>
        <ol className="mt-4 grid gap-x-6 gap-y-1.5 text-[0.8125rem] sm:grid-cols-2 lg:grid-cols-3">
          {ranks.map((r: any) => {
            const reached = profile.xp >= r.min
            return (
              <li key={r.key} className="flex items-baseline justify-between gap-3">
                <span className={reached ? 'font-medium text-ink dark:text-light' : 'text-ink-400 dark:text-light/40'}>{r.name}</span>
                <span className={cx('tabular-nums', reached ? 'text-ink-500 dark:text-light/55' : 'text-ink-300 dark:text-light/30')}>{r.min.toLocaleString('en-NG')} XP</span>
              </li>
            )
          })}
        </ol>
      </section>

      <nav aria-label="Profile sections" className="no-scrollbar -mx-1 mt-8 flex gap-6 overflow-x-auto px-1 sm:mx-0 sm:px-0" role="tablist">
        {([['badges', `Badges (${owned.size}/${catalogue.length})`], ['courses', 'Courses'], ['data', 'Data & privacy']] as const).map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={cx('shrink-0 whitespace-nowrap border-b-2 py-2 text-[0.875rem] font-medium transition-colors',
              tab === k ? 'border-navy text-ink dark:border-sky dark:text-light' : 'border-transparent text-ink-500 hover:text-ink dark:text-light/55 dark:hover:text-light')}>
            {label}
          </button>
        ))}
      </nav>

      {tab === 'badges' && (
        <ul className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
          {catalogue.map(b => {
            const has = owned.has(b.key)
            return (
              <li key={b.key} className="flex items-start gap-3.5">
                <span aria-hidden className={cxTile(has)}>{has ? b.icon || '★' : '·'}</span>
                <div className="min-w-0">
                  <h3 className={cx('text-[0.9375rem] font-medium', has ? 'text-ink dark:text-light' : 'text-ink-500 dark:text-light/55')}>{b.name}</h3>
                  <p className="mt-0.5 text-[0.875rem] leading-relaxed text-ink-500 dark:text-light/60">{b.description}</p>
                  <div className="mt-1 flex items-center gap-3 text-[0.8125rem] text-ink-500 dark:text-light/50">
                    <span className={has ? 'text-gold' : undefined}>{has ? 'earned' : `+${b.xp ?? XP.badgeAward} XP`}</span>
                    <span className="capitalize">{b.tier}</span>
                  </div>
                </div>
              </li>
            )
          })}
          {!catalogue.length && <li className="col-span-full text-[0.9375rem] text-ink-500 dark:text-light/55">Badges appear here as the academy’s catalogue loads — usually right after your first level.</li>}
        </ul>
      )}

      {tab === 'courses' && (
        <ul className="mt-5 max-w-reading divide-y divide-surface-line dark:divide-surface-dark-line">
          {(courses.data?.courses ?? []).filter(c => (profile.enrolled ?? []).some((e: any) => (e.course ?? e) === c.slug) || completed[c.slug]).map(c => {
            const doneCount = completed[c.slug] ?? 0
            const finishedCourse = doneCount >= c.sessionsCount
            return (
              <li key={c.slug} className="py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <Link href={`/courses/${c.slug}`} className="text-[0.9375rem] font-medium text-ink underline-offset-4 hover:underline dark:text-light">{c.displayTitle || c.name}</Link>
                  <span className="flex items-center gap-3 text-[0.8125rem] tabular-nums text-ink-500 dark:text-light/55">
                    {doneCount}/{c.sessionsCount} levels
                    {finishedCourse && <Stars n={3} size={13} />}
                  </span>
                </div>
                <ProgressBar className="mt-2.5" value={doneCount} max={c.sessionsCount} tone={finishedCourse ? 'success' : 'navy'} />
                {finishedCourse && <p className="mt-2 text-[0.8125rem] text-ink-600 dark:text-light/65">Course finished — request your certificate from <Link className="text-navy underline underline-offset-2 dark:text-sky" href="/certificates">Certificates</Link>.</p>}
              </li>
            )
          })}
          {!(profile.enrolled ?? []).length && !Object.keys(completed).length && (
            <li className="py-4 text-[0.9375rem] text-ink-500 dark:text-light/55">
              No courses started yet. <Link href="/courses" className="font-medium text-navy underline underline-offset-2 dark:text-sky">Pick one</Link> — the first level of each is free.
            </li>
          )}
        </ul>
      )}

      {tab === 'data' && <DataPanel profile={profile} />}
    </div>
  )
}

function cxTile(has: boolean) {
  return `flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base ${has ? 'bg-gold/20 text-[#8a5b0d] dark:text-gold' : 'bg-surface-muted text-ink-300 dark:bg-surface-dark-muted dark:text-light/30'}`
}

/** 11.4/NDPR — export and erasure have to be buttons a learner can find (gap fix). */
function DataPanel({ profile }: { profile: any }) {
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function exportData() {
    setState('busy')
    try {
      const r = await fetch('/api/auth/me/export', { credentials: 'same-origin' })
      if (!r.ok) throw new Error(await r.text())
      const blob = await r.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'cea-learn-my-data.json'; a.click()
      URL.revokeObjectURL(url)
      setState('done'); setMsg('Download started — one JSON file with your profile, progress, XP ledger and receipts.')
    } catch (e: any) {
      setState('error'); setMsg(e?.message || 'Export failed.')
    }
  }

  return (
    <div className="mt-8 max-w-reading border-t border-surface-line pt-5 dark:border-surface-dark-line">
      <h2 className="text-lg font-semibold text-ink dark:text-light">Your data, in your hands</h2>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/70">
        CEA Learn stores what a course needs: your name, contact, progress, XP ledger and payment receipts.
        No card numbers (payment is by transfer), no tracking pixels beyond the ad counts, and the answer keys never reach your device.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button size="sm" variant="outline" onClick={exportData} loading={state === 'busy'}>Export my data (JSON)</Button>
        <Link href="/settings" className="text-[0.875rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">Privacy settings</Link>
        <Link href="/privacy" className="text-[0.875rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">How we handle data</Link>
      </div>
      {msg && <p role="status" className={cx('mt-3 text-[0.875rem]', state === 'error' ? 'text-error' : 'text-success')}>{msg}</p>}
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-500 dark:text-light/55">
        Deleting your account anonymises it — the receipts stay, because accounting needs them. The button is in Settings → Danger zone.
      </p>
    </div>
  )
}
