'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button, Card, Chip, ProgressBar, RankChip, Stars, StreakFlame, useApi, useSession } from '@cea/ui'
import { RANKS, XP, formatNgn } from '@cea/config'

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
  if (loading) return <p className="text-sm text-ink/60 dark:text-light/60">Loading your progress…</p>
  if (!user) return (
    <Card className="mx-auto max-w-reading text-center">
      <h1 className="text-lg font-semibold">Sign in to see your badges</h1>
      <Link href="/auth/login?next=/profile" className="mt-3 inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white">Sign in</Link>
    </Card>
  )

  const profile = summary.data?.user ?? user
  const owned = new Set((profile.badges ?? []).map((b: any) => b.key))
  const catalogue: any[] = profile.badgeCatalogue ?? []
  const ranks: any[] = profile.ranks ?? RANKS
  const completed: Record<string, number> = profile.completedByCourse ?? {}
  const nextRank = profile.rank?.next

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="mt-0.5 text-sm text-ink/65 dark:text-light/65">{profile.email}{profile.isGuest ? ' · guest pass' : ''} · joined {new Date(profile.joinedAt).toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3">
          <StreakFlame count={profile.streak?.count ?? 0} atRisk={profile.streak?.atRisk} freezes={profile.streak?.freezes} size="lg" />
          <RankChip rank={profile.rank?.current} xp={profile.xp} next={nextRank} />
        </div>
      </header>

      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-base font-semibold">{profile.rank?.current?.name} · {profile.xp} XP</h2>
          {nextRank ? <span className="text-sm text-ink/70 dark:text-light/70">{nextRank.min - profile.xp} XP to {nextRank.name}</span> : <Chip tone="gold">top rank</Chip>}
        </div>
        <ProgressBar className="mt-2" value={nextRank ? profile.xp - (profile.rank?.current?.min ?? 0) : 100} max={nextRank ? nextRank.min - (profile.rank?.current?.min ?? 0) : 100} />
        <ol className="mt-3 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {ranks.map((r: any) => {
            const reached = profile.xp >= r.min
            return (
              <li key={r.key} className={reached ? '' : 'opacity-55'}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className={reached ? 'font-semibold' : ''}>{r.name}</span>
                  <span className="font-mono text-xs tabular-nums">{formatNgn(r.min).replace('₦', '')} XP</span>
                </div>
                <div className="text-xs text-ink/60 dark:text-light/60">{r.blurb}</div>
              </li>
            )
          })}
        </ol>
      </Card>

      <div className="no-scrollbar -mx-3 flex gap-1.5 overflow-x-auto px-3 sm:mx-0 sm:px-0" role="tablist" aria-label="Profile sections">
        {([['badges', `Badges (${owned.size}/${catalogue.length})`], ['courses', 'Courses'], ['data', 'Data & privacy']] as const).map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={tab === k ? 'shrink-0 rounded-pill bg-navy px-3.5 py-1.5 text-sm font-medium text-white' : 'shrink-0 rounded-pill border border-surface-line px-3.5 py-1.5 text-sm dark:border-surface-dark-line'}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'badges' && (
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {catalogue.map(b => {
            const has = owned.has(b.key)
            return (
              <li key={b.key}>
                <Card className={has ? 'border-gold/55 bg-paper dark:bg-surface-dark-muted' : 'opacity-70'}>
                  <div className="flex items-start gap-3">
                    <span aria-hidden className={cxTile(has)}>{has ? b.icon || '★' : '🔒'}</span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold">{b.name}</h3>
                      <p className="mt-0.5 text-xs text-ink/70 dark:text-light/70">{b.description}</p>
                      <div className="mt-1.5 flex items-center gap-2 text-xs">
                        <Chip tone={has ? 'success' : 'muted'}>{has ? 'earned' : `+${b.xp ?? XP.badgeAward} XP`}</Chip>
                        <span className="capitalize text-ink/55 dark:text-light/55">{b.tier}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </li>
            )
          })}
          {!catalogue.length && <li className="col-span-full"><Card><p className="text-sm">Badges appear here as the academy’s catalogue loads — usually right after your first level.</p></Card></li>}
        </ul>
      )}

      {tab === 'courses' && (
        <ul className="space-y-2">
          {(courses.data?.courses ?? []).filter(c => (profile.enrolled ?? []).some((e: any) => (e.course ?? e) === c.slug) || completed[c.slug]).map(c => {
            const doneCount = completed[c.slug] ?? 0
            return (
              <li key={c.slug}>
                <Card>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link href={`/courses/${c.slug}`} className="font-semibold underline-offset-2 hover:underline">{c.displayTitle || c.name}</Link>
                    <span className="flex items-center gap-2 text-xs text-ink/60 dark:text-light/60">
                      <Chip tone={doneCount >= c.sessionsCount ? 'success' : 'muted'}>{doneCount}/{c.sessionsCount} levels</Chip>
                      <Stars n={doneCount >= c.sessionsCount ? 3 : 0} size={13} />
                    </span>
                  </div>
                  <ProgressBar className="mt-2" value={doneCount} max={c.sessionsCount} tone={doneCount >= c.sessionsCount ? 'success' : 'gold'} />
                  {doneCount >= c.sessionsCount && <p className="mt-2 text-xs text-success">Course finished — request your certificate from <Link className="underline" href="/certificates">/certificates</Link>.</p>}
                </Card>
              </li>
            )
          })}
          {!(profile.enrolled ?? []).length && !Object.keys(completed).length && (
            <li><Card><p className="text-sm">No courses started yet. <Link href="/courses" className="font-medium underline">Pick a mission</Link> — the first level of each is free.</p></Card></li>
          )}
        </ul>
      )}

      {tab === 'data' && <DataPanel profile={profile} />}
    </div>
  )
}

function cxTile(has: boolean) {
  return `flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg ${has ? 'bg-gold/25' : 'bg-surface-muted dark:bg-surface-dark-muted'}`
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
    <Card className="space-y-2">
      <h2 className="text-base font-semibold">Your data, in your hands</h2>
      <p className="text-sm text-ink/75 dark:text-light/75">
        CEA Learn stores what a course needs: your name, contact, progress, XP ledger and payment receipts.
        No card numbers (payment is by transfer), no tracking pixels beyond the ad counts, and the answer keys never reach your device.
      </p>
      <div className="mt-1 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={exportData} loading={state === 'busy'}>Export my data (JSON)</Button>
        <Link href="/settings" className="inline-flex min-h-[36px] items-center rounded-pill border border-surface-line px-3 text-sm font-medium dark:border-surface-dark-line">Privacy settings</Link>
        <Link href="/privacy" className="inline-flex min-h-[36px] items-center rounded-pill px-2 text-sm underline">How we handle data</Link>
      </div>
      {msg && <p role="status" className={state === 'error' ? 'text-xs text-error' : 'text-xs text-success'}>{msg}</p>}
      <p className="text-xs text-ink/60 dark:text-light/60">
        Deleting your account anonymises it (the receipts stay, because accounting needs them) — the button is in Settings → Danger zone.
      </p>
    </Card>
  )
}
