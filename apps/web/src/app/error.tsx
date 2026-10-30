'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button, linkClass } from '@cea/ui'

/**
 * The two failure modes here are different and the copy says which one happened: no network (keep
 * reading what is cached, nothing is lost) versus a real render error (the digest is the thing to
 * send us). Answers stay queued on the phone either way, so the page leads with that rather than
 * with an apology.
 */
export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error('[cea-learn] render error', error) }, [error])
  const offline = typeof navigator !== 'undefined' && !navigator.onLine
  return (
    <div className="py-10">
      <p className="text-[0.8125rem] text-ink-500 dark:text-light/55">{offline ? 'No connection' : 'Something broke on this screen'}</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-snugish text-ink dark:text-light">
        {offline ? 'The signal went, your progress did not' : 'This screen could not be drawn'}
      </h1>
      <p className="mt-3 max-w-reading text-base leading-relaxed text-ink-600 dark:text-light/70">
        {offline
          ? 'Anything already cached on this device still opens — go to a level you have read before. Retry when a signal is back; nothing you answered was thrown away.'
          : 'The level you were reading is safe, and quiz answers typed on this phone are still queued here. Try again — if it happens twice, the academy wants the details.'}
      </p>
      {!offline && error?.message ? (
        <pre className="mt-6 max-h-32 overflow-auto rounded-card bg-surface-muted p-3 font-mono text-[0.8125rem] leading-relaxed text-ink-600 dark:bg-surface-dark-muted dark:text-light/70">{error.message}</pre>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/dashboard" className={linkClass}>Go to my dashboard</Link>
        {!offline && (
          <a
            href={`mailto:hello@cea.ng?subject=${encodeURIComponent('Broke in CEA Learn')}&body=${encodeURIComponent([
              error?.digest ? `digest: ${error.digest}` : '',
              error?.message ? `message: ${error.message}` : '',
              `url: ${typeof location !== 'undefined' ? location.pathname : ''}`,
            ].filter(Boolean).join('\n'))}`}
            className={linkClass}
          >
            Tell us what happened
          </a>
        )}
      </div>
    </div>
  )
}
