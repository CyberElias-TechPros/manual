'use client'
/**
 * The first paint of a level: the same shape as the real page, so nothing jumps (10.1 CLS).
 * A paid level's *body* has to wait for the API, because whether you may read it is a database
 * question — but the level's own name is already public in the catalogue, and a page that starts
 * with no heading gives a screen-reader user nothing to announce and a sighted one a grey shrug.
 */
export function LessonSkeleton({ course, n }: { course?: string; n?: number }) {
  return (
    <div className="mx-auto max-w-reading py-14" aria-busy="true" aria-label="Loading level">
      <p className="text-[0.8125rem] font-medium text-ink-500 dark:text-light/55">{course ?? 'Cyber Elias Academy'}</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-snugish text-ink dark:text-light">
        Level {n ?? '…'}
        {n ? '' : ' is loading'}
      </h1>
      <div className="animate-shimmer mt-3 h-3 w-40 rounded bg-surface-muted dark:bg-surface-dark-muted" style={{ backgroundSize: '400% 100%' }} />
      <div className="mt-7 h-px w-full bg-surface-line dark:bg-surface-dark-line" />
      <div className="mt-8 space-y-4">
        {[92, 56, 116, 116, 72].map((h, i) => (
          <div key={i} className="animate-shimmer rounded bg-surface-muted dark:bg-surface-dark-muted" style={{ height: h, backgroundSize: '400% 100%' }} />
        ))}
      </div>
    </div>
  )
}
