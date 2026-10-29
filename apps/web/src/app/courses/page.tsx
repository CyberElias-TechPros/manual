import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AdSlot, CourseRows, Pill } from '@cea/ui'
import { isFreeAccess } from '@cea/config'
import { blurb, categories, courseList } from '@/lib/content'
import { CourseFilter } from './filter'

export const metadata: Metadata = { title: 'Courses', description: 'Every Cyber Elias Academy course, with the syllabus, the fee in naira and a free first level.', alternates: { canonical: '/courses' } }
export const revalidate = 3600

/**
 * The catalogue is rendered on the server from the built bundle: one HTML response, no API round
 * trip, and it works before the learner has data enough to fetch JSON. The filter below is
 * progressive enhancement over this markup.
 *
 * One column of rows, not a grid of posters: a learner choosing a course is comparing size, fee and
 * what they will be able to do afterwards, and a card grid makes them click sixteen times to find
 * that out.
 */
export default function CoursesPage({ searchParams }: { searchParams?: { track?: string; q?: string } }) {
  const all = courseList()
  if (!all.length) redirect('/')
  const track = searchParams?.track
  const q = (searchParams?.q || '').toLowerCase().trim()
  const courses = all.filter(c => {
    if (track && (c.category || 'Other') !== track) return false
    if (!q) return true
    return [c.name, c.displayTitle, blurb(c), c.description, (c.outcomes || []).join(' '), (c.tools || []).join(' '), (c.audience || []).join(' ')]
      .filter(Boolean).some(v => String(v).toLowerCase().includes(q))
  })

  return (
    <div className="pb-6">
      <header className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-snugish text-ink sm:text-3xl dark:text-light">All {all.length} Courses</h1>
          {isFreeAccess() && <Pill tone="success">Payments paused · Every level open free</Pill>}
        </div>
        <p className="mt-3 max-w-reading text-base leading-relaxed text-ink-700 dark:text-light/85">
          Every course is broken into clear, beginner-friendly levels written in simple English. Earn XP, keep your daily streak,
          unlock badges and claim a verified certificate — {isFreeAccess() ? 'with all levels unlocked for free right now (standard prices shown for later).' : 'starting with Level 1 free on every course.'}
        </p>
      </header>

      <div className="mt-8">
        <CourseFilter tracks={categories()} total={all.length} />
      </div>

      <AdSlot placement="catalogue-inline" variant="card" />

      {courses.length === 0 ? (
        <div className="mt-10 py-10 text-center">
          <p className="text-base text-ink-600 dark:text-light/70">Nothing matches that yet.</p>
          <a className="mt-3 inline-block text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky" href="/courses">Clear the filters</a>
        </div>
      ) : (
        <section className="mt-2" aria-label={`${courses.length} courses`}>
          <p className="pt-4 text-[0.8125rem] text-ink-500 dark:text-light/55">
            {courses.length} {courses.length === 1 ? 'course' : 'courses'}{track ? ` in ${track}` : ''}
          </p>
          <CourseRows
            courses={courses.map(c => ({
              slug: c.slug,
              title: c.displayTitle || c.name,
              blurb: blurb(c),
              meta: [`${c.sessionsCount} levels`, c.weeks ? `${c.weeks} weeks` : null, c.level ? c.level.split('(')[0].trim() : null].filter(Boolean).join(' · '),
              feeNgn: c.feeNgn,
              cover: c.cover,
              certificate: c.certificate,
            }))}
          />
        </section>
      )}

      <AdSlot placement="catalogue-footer" />
    </div>
  )
}
