import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'You are offline', robots: { index: false } }

/** 10.4 — the fallback the service worker serves when a navigation misses the cache. */
export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-reading flex-col justify-center gap-4 px-3 py-10">
      <span aria-hidden className="text-4xl">📡</span>
      <h1 className="text-2xl font-bold">No signal — the app is still open</h1>
      <p className="text-[15px] text-ink/75 dark:text-light/75">
        Everything you have read on this device is still available: open the menu and go to a level you have visited. Quizzes you take now are
        saved on the phone and sent the moment you reconnect, so nothing you answer is lost.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-ink/70 dark:text-light/70">
        <li><strong>What works offline:</strong> reading, quizzes, notes, your own cached diagrams.</li>
        <li><strong>What waits:</strong> uploading a payment receipt, new levels you have not opened, certificates.</li>
        <li><strong>Tip:</strong> before you travel or the network gets thin, open the next level once — that is all it takes to cache it.</li>
      </ul>
      <p className="text-xs text-ink/55 dark:text-light/55">
        If a page here looks empty, it was not cached — the academy keeps lesson text small on purpose, so it is fetched once and kept from then on.
      </p>
    </main>
  )
}
