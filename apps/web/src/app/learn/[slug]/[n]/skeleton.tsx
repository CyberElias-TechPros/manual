'use client'
/** The first paint of a level: the same shape as the real page, so nothing jumps (10.1 CLS). */
export function LessonSkeleton() {
  return (
    <div className="mx-auto max-w-reading py-14" aria-busy="true" aria-label="Loading level">
      <div className="animate-shimmer h-3 w-40 rounded bg-surface-muted dark:bg-surface-dark-muted" style={{ backgroundSize: '400% 100%' }} />
      <div className="animate-shimmer mt-3 h-8 w-2/3 rounded bg-surface-muted dark:bg-surface-dark-muted" style={{ backgroundSize: '400% 100%' }} />
      <div className="mt-7 h-px w-full bg-surface-line dark:bg-surface-dark-line" />
      <div className="mt-8 space-y-4">
        {[92, 56, 116, 116, 72].map((h, i) => (
          <div key={i} className="animate-shimmer rounded bg-surface-muted dark:bg-surface-dark-muted" style={{ height: h, backgroundSize: '400% 100%' }} />
        ))}
      </div>
    </div>
  )
}
