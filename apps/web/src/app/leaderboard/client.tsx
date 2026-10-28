'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdSlot, Card, Pill, Skeleton, cx, mutate, useApi, useSession } from '@cea/ui'
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
      <div className="mx-auto max-w-measure py-12 text-center">
        <h1 className="text-2xl font-semibold text-ink dark:text-light">Leaderboard</h1>
        <p className="mx-auto mt-3 max-w-measure text-[0.9375rem] leading-relaxed text-ink-500 dark:text-light/60">Sign in to see this week’s standings. Your name only appears if you switch it on in Settings — nobody is put on a board by default.</p>
        <Link href="/auth/login?next=/leaderboard" className="mt-6 inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white">Sign in</Link>
      </div>
    )
  }

  const rows = data.data?.rows ?? []
  return (
    <div className="pb-8">
      <header className="flex max-w-reading flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-snugish text-ink sm:text-3xl dark:text-light">Leaderboard</h1>
          <p className="mt-2 text-[0.9375rem] text-ink-500 dark:text-light/55">
            {tab.period === 'week' ? `XP earned this week${data.data?.week ? ` (${data.data.week})` : ''}` : 'All-time XP'}{tab.course ? ` · ${tab.course.replace(/-/g, ' ')}` : ' · all courses'}
          </p>
        </div>
        {user.prefs?.leaderboardOptIn === false ? (
          <form className="flex items-center gap-2" onSubmit={async e => {
            e.preventDefault(); setOptBusy(true)
            await mutate('/api/auth/me', { leaderboardOptIn: true }).catch(() => undefined)
            await refresh(); data.reload(); setOptBusy(false)
          }}>
            <p className="max-w-[20rem] text-[0.8125rem] leading-relaxed text-ink-500 dark:text-light/55">You are hidden from boards. Turn participation on to appear.</p>
            <button type="submit" disabled={optBusy} className="min-h-[40px] rounded-card bg-navy px-4 text-[0.875rem] font-medium text-white">Join the board</button>
          </form>
        ) : (
          <Pill tone="success">you are visible</Pill>
        )}
      </header>

      <div className="no-scrollbar -mx-1 mt-7 flex gap-5 overflow-x-auto px-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Board scope">
        <BoardTab active={!tab.course} onClick={() => setTab(t => ({ ...t, course: '' }))}>All courses</BoardTab>
        {(courses.data?.courses ?? []).slice(0, 8).map(c => (
          <BoardTab key={c.slug} active={tab.course === c.slug} onClick={() => setTab(t => ({ ...t, course: c.slug }))}>{c.displayTitle || c.name}</BoardTab>
        ))}
        <span className="mx-0.5 w-px shrink-0 self-stretch bg-surface-line dark:bg-surface-dark-line" aria-hidden />
        <BoardTab active={tab.period === 'week'} onClick={() => setTab(t => ({ ...t, period: 'week' }))}>This week</BoardTab>
        <BoardTab active={tab.period === 'alltime'} onClick={() => setTab(t => ({ ...t, period: 'alltime' }))}>All time</BoardTab>
      </div>

      {data.loading ? (
        <div className="mt-4 space-y-3">{[0, 1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div>
      ) : rows.length === 0 ? (
        <p className="mt-10 py-8 text-center text-[0.9375rem] text-ink-500 dark:text-light/55">
          Nothing for this board yet — the first person to earn XP this week takes it. Finish a level and you could be it.
        </p>
      ) : (
        <div className="mt-2 border-t border-surface-line dark:border-surface-dark-line">
          <ol>
            {rows.map((r, i) => (
              <li key={`${r.pos}-${r.name}`} className={cx('flex items-center gap-4 border-b border-surface-line px-2 py-3 dark:border-surface-dark-line', r.me && 'bg-navy/[.04] dark:bg-sky/[.07]')}>
                <span className={cx('w-6 shrink-0 text-right text-[0.875rem] tabular-nums', i === 0 ? 'font-semibold text-gold' : 'text-ink-400 dark:text-light/45')}>{r.pos}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9375rem] font-medium text-ink dark:text-light">{r.me ? `${r.name} (you)` : r.name}</span>
                  <span className="mt-0.5 block text-[0.8125rem] text-ink-500 dark:text-light/55">
                    {tab.period === 'week' ? `${r.gained.toLocaleString()} XP this week` : `${(r.xp / 1000).toFixed(1)}k lifetime XP`}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-[0.9375rem] font-medium tabular-nums text-ink dark:text-light">{(tab.period === 'week' ? r.gained : r.xp).toLocaleString()}<span className="text-ink-400 dark:text-light/45"> XP</span></span>
                  {tab.period === 'week' && <span className="block text-[0.75rem] tabular-nums text-ink-500 dark:text-light/50">lifetime {r.xp.toLocaleString()}</span>}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {data.data?.me && !rows.some(r => r.me) && (
        <p className="mt-5 text-[0.9375rem] text-ink-600 dark:text-light/65">
          You are not in the top {rows.length || 50} yet — {data.data.me.xp.toLocaleString()} lifetime XP so far.{' '}
          <Link href="/courses" className="font-medium text-navy underline-offset-4 hover:underline dark:text-sky">Close the gap</Link>
        </p>
      )}
      {rows.some(r => r.me) && (
        <p className="mt-5 max-w-reading text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/65">
          You are <strong>#{rows.find(r => r.me)!.pos}</strong>. {rows.find(r => r.me)!.pos > 1
            ? `${(rows[0]?.gained ?? 0) - (rows.find(r => r.me)?.gained ?? 0)} XP behind the leader — a finished level is ${XP.sessionComplete} XP, a perfect quiz ${XP.quizPass + XP.quizPerfectBonus}.`
            : 'You are leading this board. Keep the streak alive.'}
        </p>
      )}
      <div className="mt-2 max-w-reading"><AdSlot placement="leaderboard-side" /></div>
    </div>
  )
}

function BoardTab({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" role="tab" aria-selected={!!active} onClick={onClick}
      className={cx('shrink-0 whitespace-nowrap border-b-2 py-2 text-[0.875rem] font-medium transition-colors', active ? 'border-navy text-ink dark:border-sky dark:text-light' : 'border-transparent text-ink-500 hover:text-ink dark:text-light/55 dark:hover:text-light')}>
      {children}
    </button>
  )
}
