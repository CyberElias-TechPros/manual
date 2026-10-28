import Link from 'next/link'
import { courseList } from '@/lib/content'

export default function NotFound() {
  const suggestions = courseList().slice(0, 4)
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-reading flex-col justify-center gap-4 px-3 py-10">
      <p className="font-mono text-sm text-gold">404</p>
      <h1 className="text-3xl font-semibold tracking-snugish text-ink dark:text-light">That page is not in the academy</h1>
      <p className="text-[15px] text-ink/75 dark:text-light/75">
        A level number past the end of a course, a renamed slug, or a link from an old email. The catalogue did not move — start here:
      </p>
      <ul className="flex flex-wrap gap-2">
        {suggestions.map(c => (
          <li key={c.slug}>
            <Link href={`/courses/${c.slug}`} className="inline-flex min-h-[44px] items-center rounded-card border border-surface-line px-3 text-sm font-medium capitalize hover:bg-surface-muted dark:border-surface-dark-line dark:hover:bg-surface-dark-muted">
              {(c.displayTitle || c.name).toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-1 flex flex-wrap gap-2">
        <Link href="/courses" className="inline-flex min-h-[44px] items-center rounded-card bg-navy px-4 text-sm font-medium text-white">All courses</Link>
        <Link href="/dashboard" className="inline-flex min-h-[44px] items-center rounded-card border border-surface-line px-4 text-sm font-medium dark:border-surface-dark-line">My dashboard</Link>
        <Link href="/search" className="inline-flex min-h-[44px] items-center rounded-card px-2 text-sm underline">Search the lessons</Link>
      </div>
    </main>
  )
}
