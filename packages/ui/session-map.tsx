'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/** * 4.4 — the mission map. One node per level, in module groups, with the state
 * the API already computed (free / unlocked / locked / pending) plus stars and
 * the resume marker. Capstones render as boss nodes (5.7).
 */
import { XP } from '@cea/config'
import { Pill, Stars, cx } from './primitives'

export interface MapSession {
  number: number
  title: string
  module?: string | null
  minutes?: number
  isFree?: boolean
  isCapstone?: boolean
  quizCount?: number
  words?: number
  state: { state: 'free' | 'unlocked' | 'locked' | 'pending' | 'expired'; completed?: boolean; stars?: number; quizBest?: number | null; lastSeen?: string | null; exerciseSubmitted?: boolean }
}

export function SessionMap({ sessions, slug, hrefFor, onPick }:
  { sessions: MapSession[]; slug: string; hrefFor?: (n: number) => string; onPick?: (n: number) => void }) {
  const groups: { name: string; items: MapSession[] }[] = []
  for (const s of sessions) {
    const name = s.module?.trim() || `Levels ${sessions[0]?.number ?? 1}–${sessions[sessions.length - 1]?.number ?? sessions.length}`
    const last = groups[groups.length - 1]
    if (last && last.name === name) last.items.push(s)
    else groups.push({ name, items: [s] })
  }
  const doneCount = sessions.filter(s => s.state?.completed).length

  return (
    <div className="space-y-5">
      <p className="text-[0.9375rem] text-ink-600 dark:text-light/70">
        <span className="tabular-nums font-bold text-ink dark:text-light">{doneCount}</span> of {sessions.length} levels finished
        {' · '}earn up to <span className="font-bold text-[#8a5b0d] dark:text-gold">+{XP.lessonRead + XP.exerciseSubmit + XP.quizPass + XP.quizPerfectBonus + XP.sessionComplete} XP</span> on every level
        {sessions.some(s => s.isCapstone) ? ' · final level = Boss Project' : ''}
      </p>
      {groups.map((g, gi) => (
        <section key={`${g.name}-${gi}`} aria-label={g.name}>
          <h3 className="mb-1 mt-6 text-[0.8125rem] font-medium text-ink-500 dark:text-light/55">{g.name}</h3>
          <ol className="relative space-y-0 border-l border-surface-line pl-7 dark:border-surface-dark-line">
            {g.items.map(s => (
              <li key={s.number} className="relative">
                <span aria-hidden className={cx('absolute -left-[13px] top-3.5 flex h-6 w-6 items-center justify-center rounded-full border text-[0.6875rem] tabular-nums',
                  s.state?.completed ? 'border-navy bg-navy text-white dark:border-sky dark:bg-sky dark:text-deep' : s.state?.state === 'locked' ? 'border-surface-line bg-canvas text-ink-300 dark:border-surface-dark-line dark:bg-canvas-dark dark:text-light/35' : 'border-surface-line-strong bg-canvas text-ink-600 dark:border-surface-dark-line-strong dark:bg-canvas-dark dark:text-light/70')}>
                  {s.state?.completed ? '✓' : s.number}
                </span>
                <a
                  href={hrefFor ? hrefFor(s.number) : `/learn/${slug}/${s.number}`}
                  onClick={e => { if (onPick) { e.preventDefault(); onPick(s.number) } }}
                  aria-label={`Level ${s.number}: ${s.title}${s.state?.state === 'locked' ? ' (locked)' : ''}`}
                  className={cx('flex items-start gap-3 border-b border-surface-line py-3.5 transition-colors dark:border-surface-dark-line',
                    s.state?.state === 'locked' ? 'opacity-70' : 'hover:bg-surface-muted/50 dark:hover:bg-surface-dark-muted/50')}
                >
                  <span className="min-w-0 flex-1">
                    <span className={cx('text-[0.9375rem] font-bold leading-snug', s.state?.state === 'locked' ? 'text-ink-500 dark:text-light/50' : 'text-ink dark:text-light')}>
                      <span className="mr-1.5 tabular-nums text-ink-400 dark:text-light/40">{s.number}</span>{s.title}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-ink-500 dark:text-light/55">
                      {s.isFree && <Pill tone="success">free</Pill>}
                      {s.state?.state === 'pending' && <Pill tone="warn">awaiting approval</Pill>}
                      {s.state?.state === 'expired' && <Pill tone="error">access ended</Pill>}
                      {s.isCapstone ? <Pill tone="gold">Boss Project · +XP</Pill> : !s.state?.completed && s.state?.state !== 'locked' ? <Pill tone="gold">+{XP.lessonRead + XP.quizPass + XP.sessionComplete} XP</Pill> : null}
                      {s.minutes ? <span>{s.minutes} min</span> : null}
                      {s.quizCount ? <span>{s.quizCount}-question check</span> : null}
                      {s.state?.quizBest != null ? <span className="tabular-nums">best {s.state.quizBest}%</span> : null}
                      {s.state?.exerciseSubmitted ? <span className="text-success">practice submitted</span> : null}
                      {s.state?.lastSeen && !s.state?.completed ? <span className="font-medium text-ink">resume here</span> : null}
                    </span>
                  </span>
                  {s.state?.completed ? <Stars n={s.state.stars ?? 1} size={13} /> : s.state?.state === 'locked' ? <LockIcon /> : null}
                </a>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="mt-1 shrink-0 text-ink-300 dark:text-light/35">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  )
}
function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="mt-1 shrink-0 text-ink-400 dark:text-light/40"><path d="m9 6 6 6-6 6" /></svg>
}
