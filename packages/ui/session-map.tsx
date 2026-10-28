'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/** * 4.4 — the mission map. One node per level, in module groups, with the state
 * the API already computed (free / unlocked / locked / pending) plus stars and
 * the resume marker. Capstones render as boss nodes (5.7).
 */
import { Chip, Stars, cx } from './primitives'

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
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Chip tone={doneCount === sessions.length && sessions.length > 0 ? 'success' : 'muted'}>{doneCount}/{sessions.length} levels cleared</Chip>
        {sessions.some(s => s.isCapstone) && <Chip tone="gold">Boss level at the end</Chip>}
        {sessions.some(s => s.state?.state === 'pending') && <Chip tone="warn">Payment awaiting approval</Chip>}
      </div>
      {groups.map((g, gi) => (
        <section key={`${g.name}-${gi}`} aria-label={g.name}>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink/65 dark:text-light/65">
            <span className="h-px w-4 bg-gold" aria-hidden />{g.name}
          </h3>
          <ol className="relative space-y-2 pl-7 before:absolute before:bottom-4 before:left-[13px] before:top-4 before:w-0.5 before:bg-surface-line dark:before:bg-surface-dark-line">
            {g.items.map(s => (
              <li key={s.number} className="relative">
                <span aria-hidden className={cx('absolute -left-7 top-3.5 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold',
                  s.state?.completed ? 'border-success bg-success text-white' : s.state?.state === 'locked' ? 'border-surface-line bg-surface text-ink/40 dark:border-surface-dark-line dark:bg-surface-dark' : 'border-gold bg-gold text-deep',
                  s.isCapstone && !s.state?.completed && 'animate-pulse-node')}>
                  {s.state?.completed ? '✓' : s.isCapstone ? '★' : s.number}
                </span>
                <a
                  href={hrefFor ? hrefFor(s.number) : `/learn/${slug}/${s.number}`}
                  onClick={e => { if (onPick) { e.preventDefault(); onPick(s.number) } }}
                  aria-label={`Level ${s.number}: ${s.title}${s.state?.state === 'locked' ? ' (locked)' : ''}`}
                  className={cx('flex items-start gap-3 rounded-card border p-3 transition',
                    s.state?.state === 'locked'
                      ? 'border-dashed border-surface-line bg-surface-muted/50 dark:border-surface-dark-line dark:bg-surface-dark/50'
                      : 'border-surface-line bg-surface hover:border-navy hover:shadow-card dark:border-surface-dark-line dark:bg-surface-dark dark:hover:border-sky')}
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className={cx('text-[15px] font-semibold', s.state?.state === 'locked' ? 'text-ink/55 dark:text-light/55' : 'text-navy dark:text-light')}>
                        {s.number}. {s.title}
                      </span>
                      {s.isFree && <Chip tone="success">Free</Chip>}
                      {s.state?.state === 'pending' && <Chip tone="warn">Awaiting approval</Chip>}
                      {s.state?.state === 'expired' && <Chip tone="error">Access ended</Chip>}
                      {s.isCapstone && <Chip tone="gold">Boss</Chip>}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/60 dark:text-light/60">
                      {s.minutes ? <span>{s.minutes} min</span> : null}
                      {s.quizCount ? <span>{s.quizCount} questions</span> : null}
                      {s.state?.quizBest != null ? <span className="tabular-nums">best {s.state.quizBest}%</span> : null}
                      {s.state?.exerciseSubmitted ? <span className="text-success">practice submitted</span> : null}
                      {s.state?.lastSeen && !s.state?.completed ? <span className="text-warn">resume here</span> : null}
                    </span>
                  </span>
                  {s.state?.completed ? <Stars n={s.state.stars ?? 1} /> : s.state?.state === 'locked' ? <LockIcon /> : <ArrowIcon />}
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden className="mt-1 shrink-0 text-ink/45 dark:text-light/45">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  )
}
function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="mt-1 shrink-0 text-gold"><path d="m9 6 6 6-6 6" /></svg>
}
