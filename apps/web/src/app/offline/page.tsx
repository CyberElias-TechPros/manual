import type { Metadata } from 'next'
import Link from 'next/link'
import { AdSlot, linkClass } from '@cea/ui'
export const metadata: Metadata = { title: 'You are offline', robots: { index: false } }

/**
 * 10.4 — the fallback the service worker serves when a navigation misses the cache. It has to answer
 * one question: what can I still do right now? — so it leads with reading, and puts payment (the one
 * thing that genuinely cannot work offline) second.
 */
export default function OfflinePage() {
  return (
    <div className="py-10">
      <p className="text-[0.8125rem] text-ink-500 dark:text-light/55">Offline mode</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-snugish text-ink dark:text-light">No signal — the app is still open</h1>
      <p className="mt-3 max-w-reading text-base leading-relaxed text-ink-600 dark:text-light/70">
        Everything you have read on this device is still available. Open the menu and pick a level you
        have visited before. Quizzes you take now are saved on the phone and sent the moment you
        reconnect, so nothing you answer is lost.
      </p>
      <dl className="mt-8 max-w-reading divide-y divide-surface-line dark:divide-surface-dark-line">
        <div className="py-3">
          <dt className="text-[0.8125rem] text-ink-500 dark:text-light/55">Works with no network</dt>
          <dd className="mt-0.5 text-[0.9375rem] text-ink-700 dark:text-light/80">Reading, diagrams you have opened, quizzes, your notes and bookmarks.</dd>
        </div>
        <div className="py-3">
          <dt className="text-[0.8125rem] text-ink-500 dark:text-light/55">Waits for a signal</dt>
          <dd className="mt-0.5 text-[0.9375rem] text-ink-700 dark:text-light/85">Spinning the Daily Bonus Wheel, opening a brand-new level for the first time, and issuing certificates.</dd>
        </div>
        <div className="py-3">
          <dt className="text-[0.8125rem] text-ink-500 dark:text-light/55">Before the network gets thin</dt>
          <dd className="mt-0.5 text-[0.9375rem] text-ink-700 dark:text-light/80">Open the next level once — that is all it takes to keep it on this device.</dd>
        </div>
      </dl>
      <div className="max-w-reading"><AdSlot placement="offline" variant="card" /></div>
      <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/courses" className={linkClass}>Open the catalogue</Link>
        <Link href="/settings" className={linkClass}>Data-saver settings</Link>
      </p>
      <p className="mt-8 max-w-reading border-t border-surface-line pt-4 text-[0.8125rem] leading-relaxed text-ink-500 dark:border-surface-dark-line dark:text-light/55">
        If a cached page looks empty, its diagrams were not saved — lesson text is kept small on purpose and
        fetched once, images only when there is room for them.
      </p>
    </div>
  )
}
