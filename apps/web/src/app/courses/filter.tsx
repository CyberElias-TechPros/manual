'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { cx } from '@cea/ui'

/**
 * 4.11 — the filter box works without JavaScript too (the form GETs to this route), and with JS it
 * filters the already-downloaded list instantly. Tracks are text, not pills: eleven ways to narrow a
 * list should look quieter than the list itself.
 */
export function CourseFilter({ tracks, total }: { tracks: string[]; total: number }) {
  const params = useSearchParams()
  const router = useRouter()
  const [q, setQ] = useState(params.get('q') ?? '')
  const track = params.get('track')

  function pick(next: string | null) {
    const p = new URLSearchParams(params.toString())
    if (next) p.set('track', next); else p.delete('track')
    router.push(`/courses${p.toString() ? `?${p}` : ''}`)
  }

  return (
    <div className="border-t border-surface-line py-5 dark:border-surface-dark-line">
      <form role="search" action="/courses" className="flex max-w-lg items-center gap-3">
        <label className="sr-only" htmlFor="course-search">Search courses</label>
        <div className="relative flex-1">
          <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="m20 20-4.5-4.5M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
          </svg>
          <input
            id="course-search" name="q" value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search a skill, a tool, a job"
            className="min-h-[46px] w-full rounded-card border border-surface-line bg-surface pl-10 pr-3 text-base text-ink outline-none transition-colors placeholder:text-ink-400 focus:border-navy dark:border-surface-dark-line dark:bg-surface-dark dark:text-light dark:placeholder:text-light/40 dark:focus:border-sky"
          />
        </div>
        <button type="submit" className="min-h-[46px] shrink-0 rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#152c4d]">Search</button>
      </form>
      <nav aria-label="Filter by track" className="no-scrollbar -mx-1 mt-4 flex gap-5 overflow-x-auto px-1">
        <TrackLink active={!track} onClick={() => pick(null)}>All {total}</TrackLink>
        {tracks.map(t => <TrackLink key={t} active={track === t} onClick={() => pick(t)}>{t}</TrackLink>)}
      </nav>
    </div>
  )
}

function TrackLink({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button" onClick={onClick} aria-pressed={!!active}
      className={cx('shrink-0 whitespace-nowrap border-b-2 py-1.5 text-[0.875rem] transition-colors',
        active ? 'border-navy font-medium text-ink dark:border-sky dark:text-light' : 'border-transparent text-ink-500 hover:text-ink dark:text-light/55 dark:hover:text-light')}
    >
      {children}
    </button>
  )
}
