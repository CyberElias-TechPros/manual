'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdSlot, Card, Chip, ProgressBar, Skeleton, cx, mutate, useApi, useSession } from '@cea/ui'
import { XP } from '@cea/config'

type Row = { pos: number; name: string; xp: number; gained: number; id: string; me?: boolean; avatarSeed?: string }

/**
 * 5.6 — leaderboards are opt-in and this week only by default: an all-time list
 * demotivates everyone who joined last month, which is most of the academy.
 */
export function LeaderboardClient({ course, period }: { course: string; period: 'week' | 'alltime' }) {
  const { user, refresh } = useSession()
  const [tab, setTab] = useState<{ course: string; period: 'week' | 'alltime' }>({ course, period })
  useEffect(() => setTab({ course, period }), [course, period])
  const qs = new URLSearchParams()
  if (tab.course) qs.set('course', tab.course)
  qs.set('period', tab.period)
  const data = useApi<{ rows: Row[]; week?: string; me?: Row | null; optInNote?: string }>(`/api/leaderboard?${qs}`)
  const courses = useApi<{ courses: { slug: string; name: string; displayTitle?: string }[] }>('/api/courses')
  const [optBusy, setOptBusy] = useState(false)

  if (!user) {
    return (
      <Card className="mx-auto max-w-reading text-center">
        <h1 className="text-xl font-bold">Leaderboard</h1>
        <p className="mt-1.5 text-sm text-ink/70 dark:text-light/70">Sign in to see this week’s standings. Your name only appears if you switch it on in Settings — nobody is put on a board by default.</p>
        <Link href="/auth/login?next=/leaderboard" className="mt-3 inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white">Sign in</Link>
      </Card>
    )
  }

  const rows = data.data?.rows ?? []
  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <p className="mt-0.5 text-sm text-ink/70 dark:text-light/70">
            {tab.period === 'week' ? `XP earned this week${data.data?.week ? ` (${data.data.week})` : ''}` : 'All-time XP'}{tab.course ? ` · ${tab.course.replace(/-/g, ' ')}` : ' · all courses'}
          </p>
        </div>
        {user.prefs?.leaderboardOptIn === false ? (
          <form className="flex items-center gap-2" onSubmit={async e => {
            e.preventDefault(); setOptBusy(true)
            await mutate('/api/auth/me', { leaderboardOptIn: true }).catch(() => undefined)
            await refresh(); data.reload(); setOptBusy(false)
          }}>
            <p className="max-w-[18rem] text-xs text-ink/65 dark:text-light/65">You are hidden from boards. Turn participation on to appear.</p>
            <button type="submit" disabled={optBusy} className="min-h-[38px] rounded-pill bg-navy px-3 text-sm font-medium text-white">Join</button>
          </form>
        ) : (
          <Chip tone="success">you are visible</Chip>
        )}
      </header>

      <div className="no-scrollbar -mx-3 flex gap-1.5 overflow-x-auto px-3 sm:mx-0 sm:px-0" role="tablist" aria-label="Board scope">
        <BoardTab active={!tab.course} onClick={() => setTab(t => ({ ...t, course: '' }))}>All courses</BoardTab>
        {(courses.data?.courses ?? []).slice(0, 8).map(c => (
          <BoardTab key={c.slug} active={tab.course === c.slug} onClick={() => setTab(t => ({ ...t, course: c.slug }))}>{c.displayTitle || c.name}</BoardTab>
        ))}
        <span className="mx-1 w-px bg-surface-line dark:bg-surface-dark-line" aria-hidden />
        <BoardTab active={tab.period === 'week'} onClick={() => setTab(t => ({ ...t, period: 'week' }))}>This week</BoardTab>
        <BoardTab active={tab.period === 'alltime'} onClick={() => setTab(t => ({ ...t, period: 'alltime' }))}>All time</BoardTab>
      </div>

      {data.loading ? (
        <div className="space-y-2">{[0, 1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-14 w-full rounded-card" />)}</div>
      ) : rows.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm">Nothing for this board yet — the first person to earn XP this week takes it. Finish a level and you could be it.</p>
        </Card>
      ) : (
        <Card pad={false} className="overflow-hidden">
          <ol>
            {rows.map((r, i) => (
              <li key={`${r.pos}-${r.name}`} className={cx('flex items-center gap-3 border-b border-surface-line px-3 py-2.5 last:border-0 dark:border-surface-dark-line', r.me && 'bg-gold/10')}>
                <span className={cx('w-7 shrink-0 text-center font-mono text-sm font-bold', i === 0 && 'text-gold', i === 1 && 'text-ink/60 dark:text-light/60', i === 2 && 'text-warn')}>{r.pos}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-medium">{r.me ? `${r.name} (you)` : r.name}</span>
                  <span className="mt-0.5 block text-xs text-ink/60 dark:text-light/60">
                    {tab.period === 'week' ? `${r.gained.toLocaleString()} XP this week` : `${(r.xp / 1000).toFixed(1)}k lifetime XP`}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block font-mono text-sm font-semibold tabular-nums">{(tab.period === 'week' ? r.gained : r.xp).toLocaleString()} XP</span>
                  {tab.period === 'week' && <span className="block text-[11px] text-ink/55 dark:text-light/55">lifetime {r.xp.toLocaleString()}</span>}
                </span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      {data.data?.me && !rows.some(r => r.me) && (
        <Card className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm">You are not in the top {rows.length || 50} yet — {data.data.me.xp.toLocaleString()} lifetime XP so far.</p>
          <Link href="/courses" className="inline-flex min-h-[36px] items-center rounded-pill bg-navy px-3 text-xs font-medium text-white">Close the gap</Link>
        </Card>
      )}
      {rows.some(r => r.me) && (
        <p className="text-sm text-ink/70 dark:text-light/70">
          You are <strong>#{rows.find(r => r.me)!.pos}</strong>. {rows.find(r => r.me)!.pos > 1
            ? `${(rows[0]?.gained ?? 0) - (rows.find(r => r.me)?.gained ?? 0)} XP behind the leader — a finished level is ${XP.sessionComplete} XP, a perfect quiz ${XP.quizPass + XP.quizPerfectBonus}.`
            : 'You are leading this board. Keep the streak alive.'}
        </p>
      )}
      <AdSlot placement="leaderboard-side" />
    </div>
  )
}

function BoardTab({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" role="tab" aria-selected={!!active} onClick={onClick}
      className={cx('shrink-0 rounded-pill px-3 py-1.5 text-sm font-medium transition', active ? 'bg-navy text-white' : 'text-ink/70 hover:bg-surface-muted dark:text-light/70 dark:hover:bg-surface-dark-muted')}>
      {children}
    </button>
  )
}
