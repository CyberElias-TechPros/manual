import Link from 'next/link'
import { courseList } from '@/lib/content'
import { AdSlot, linkClass } from '@cea/ui'

/**
 * A 404 in this app is almost always a level number past the end of a course, a renamed slug, or a
 * link from an old email — so the page says that, and hands over the four courses a learner was
 * probably reaching for instead of a search box they have to think about.
 */
export default function NotFound() {
  const suggestions = courseList().slice(0, 4)
  return (
    <div className="py-10">
      <p className="font-mono text-[0.8125rem] text-ink-500 dark:text-light/55">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-snugish text-ink dark:text-light">That page is not in the academy</h1>
      <p className="mt-3 max-w-reading text-base leading-relaxed text-ink-600 dark:text-light/70">
        Usually a level number past the end of a course, a renamed course, or a link from an old email.
        The catalogue has not moved — if you were heading for one of these, it is still there:
      </p>
      <ul className="mt-6 max-w-reading divide-y divide-surface-line dark:divide-surface-dark-line">
        {suggestions.map(c => (
          <li key={c.slug}>
            <Link href={`/courses/${c.slug}`} className="flex min-h-[48px] items-baseline justify-between gap-4 py-3">
              <span className="font-medium text-navy underline-offset-4 hover:underline dark:text-sky">{c.displayTitle || c.name}</span>
              <span className="text-[0.8125rem] text-ink-500 dark:text-light/55">{c.sessionsCount} levels</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="max-w-reading"><AdSlot placement="notfound" variant="card" /></div>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/courses" className="inline-flex min-h-[48px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white hover:bg-[#152c4d]">Browse all courses</Link>
        <Link href="/dashboard" className={linkClass}>My dashboard</Link>
        <Link href="/search" className={linkClass}>Search the lessons</Link>
      </div>
    </div>
  )
}
