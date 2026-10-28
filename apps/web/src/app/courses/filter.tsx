'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { cx } from '@cea/ui'

/**
 * 4.11 — the filter box works without JavaScript too (the form GETs to this
 * route), and with JS it filters the already-downloaded list instantly.
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
    <div className="space-y-2">
      <form role="search" action="/courses" className="flex gap-2">
        <label className="sr-only" htmlFor="course-search">Search courses</label>
        <input
          id="course-search" name="q" value={q} onChange={e => setQ(e.target.value)}
          placeholder="Search titles, tools, outcomes…"
          className="min-h-[44px] w-full rounded-pill border border-surface-line bg-surface px-4 text-[15px] outline-none placeholder:text-ink/45 focus:border-navy dark:border-surface-dark-line dark:bg-surface-dark dark:placeholder:text-light/40 dark:focus:border-sky"
        />
        <button type="submit" className="min-h-[44px] shrink-0 rounded-pill bg-navy px-4 text-sm font-medium text-white hover:bg-blue">Search</button>
      </form>
      <div className="no-scrollbar -mx-3 flex gap-1.5 overflow-x-auto px-3 sm:mx-0 sm:px-0">
        <FilterChip active={!track} onClick={() => pick(null)}>All {total}</FilterChip>
        {tracks.map(t => <FilterChip key={t} active={track === t} onClick={() => pick(t)}>{t}</FilterChip>)}
      </div>
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button" onClick={onClick} aria-pressed={!!active}
      className={cx('shrink-0 rounded-pill border px-3 py-1.5 text-sm font-medium transition',
        active ? 'border-navy bg-navy text-white' : 'border-surface-line bg-surface text-ink/75 hover:bg-surface-muted dark:border-surface-dark-line dark:bg-surface-dark dark:text-light/75')}
    >
      {children}
    </button>
  )
}
