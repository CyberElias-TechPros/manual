'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('[cea-learn] render error', error) }, [error])
  const offline = typeof navigator !== 'undefined' && !navigator.onLine
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-reading flex-col justify-center gap-3 px-3 py-10">
      <span aria-hidden className="text-3xl">{offline ? '📡' : '⚠️'}</span>
      <h1 className="text-2xl font-bold">{offline ? 'This device lost the network' : 'Something broke on this screen'}</h1>
      <p className="text-[15px] text-ink/75 dark:text-light/75">
        {offline
          ? 'You can keep reading anything already cached. Retry when a signal is back — nothing you answered was thrown away.'
          : 'The lesson you were reading is safe; your quiz answers are queued on this phone. Try again, and if it happens twice the academy wants to know.'}
      </p>
      {error?.message && !offline && (
        <pre className="max-h-32 overflow-auto rounded-card bg-surface-muted p-3 font-mono text-xs text-ink/70 dark:bg-surface-dark-muted dark:text-light/70">{error.message}</pre>
      )}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={reset} className="inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white">Try again</button>
        <Link href="/dashboard" className="inline-flex min-h-[44px] items-center rounded-pill border border-surface-line px-4 text-sm font-medium dark:border-surface-dark-line">Dashboard</Link>
        <a href={`mailto:hello@cea.ng?subject=${encodeURIComponent('Broke in CEA Learn')}&body=${encodeURIComponent(String(error?.digest ?? error?.message ?? ''))}`} className="inline-flex min-h-[44px] items-center rounded-pill px-2 text-sm underline">Report it</a>
      </div>
    </main>
  )
}
