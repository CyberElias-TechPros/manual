'use client'
/**
 * Catalogue rows (4.9). A course list is a decision, not a poster: one row per course, hairline
 * between them, the fee and the size of the commitment visible without hunting, and no colour
 * competing for the eye. Cover art is decorative — where a course has none, the row simply starts
 * at the text, and the list never becomes a grid of gradients.
 */
import { isFreeAccess } from '@cea/config'
import { Naira, Pill, cx } from './primitives'

export interface CourseRowData {
  slug: string
  title: string
  /** "9 levels · 3 weeks · Mondays, Wednesdays, Fridays" — whatever a page needs in one line. */
  meta?: string
  blurb?: string
  feeNgn?: number | null
  cover?: string | null
  category?: string
  level?: string
  certificate?: boolean
  freeFirst?: boolean
  href?: string
}

export function CourseRow({ course, className }: { course: CourseRowData; className?: string }) {
  const href = course.href || `/courses/${course.slug}`
  const freeNow = isFreeAccess()
  return (
    <a
      href={href}
      className={cx('group -mx-3 flex items-start gap-4 rounded-card px-3 py-5 transition-colors duration-150 hover:bg-surface-muted/70 focus-visible:bg-surface-muted/70 dark:hover:bg-surface-dark-muted/60', className)}
    >
      {course.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={course.cover} alt="" width={128} height={86} loading="lazy" decoding="async"
          className="hidden h-[64px] w-[96px] shrink-0 rounded-card border border-surface-line object-cover sm:block dark:border-surface-dark-line"
        />
      ) : (
        <span aria-hidden className="hidden h-[64px] w-[96px] shrink-0 rounded-card bg-surface-muted dark:bg-surface-dark-muted sm:block" />
      )}
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="min-w-0 text-[1.0625rem] font-bold leading-snug text-ink group-hover:underline dark:text-light">{course.title}</span>
          <span className="flex shrink-0 items-baseline gap-2 text-[0.9375rem] tabular-nums">
            {freeNow ? (
              <>
                <span className="text-[0.8125rem] text-ink-400 line-through dark:text-light/45"><Naira amount={course.feeNgn} /></span>
                <Pill tone="success">Free right now</Pill>
              </>
            ) : (
              <span className="font-bold text-ink-700 dark:text-light/85"><Naira amount={course.feeNgn} /></span>
            )}
          </span>
        </span>
        {course.blurb ? <span className="mt-1.5 block max-w-reading text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/75">{course.blurb}</span> : null}
        <span className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] font-medium text-ink-600 dark:text-light/65">
          {course.meta ? <span>{course.meta}</span> : null}
          {course.meta && course.certificate ? <span aria-hidden className="text-ink-300 dark:text-light/30">·</span> : null}
          {course.certificate ? <span>certificate + XP</span> : null}
          {freeNow ? (
            <>
              <span aria-hidden className="text-ink-300 dark:text-light/30">·</span>
              <span className="font-bold text-success">all levels open free · payments paused</span>
            </>
          ) : course.freeFirst !== false ? (
            <>
              <span aria-hidden className="text-ink-300 dark:text-light/30">·</span>
              <span className="font-bold text-success">first level free</span>
            </>
          ) : null}
        </span>
      </span>
    </a>
  )
}

/** The list itself: hairlines instead of boxes. */
export function CourseRows({ courses, className }: { courses: CourseRowData[]; className?: string }) {
  return (
    <ul className={cx('divide-y divide-surface-line dark:divide-surface-dark-line', className)}>
      {courses.map(c => <li key={c.slug}><CourseRow course={c} /></li>)}
    </ul>
  )
}
