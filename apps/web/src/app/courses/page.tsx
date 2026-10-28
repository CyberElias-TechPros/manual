import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Card, Chip, Naira } from '@cea/ui'
import { blurb, categories, courseList } from '@/lib/content'
import { CourseFilter } from './filter'

export const metadata: Metadata = { title: 'Courses', description: 'Every Cyber Elias Academy course, with the syllabus, the fee in naira and a free first level.', alternates: { canonical: '/courses' } }
export const revalidate = 3600

/**
 * The catalogue is rendered on the server from the built bundle: one HTML
 * response, no API round trip, and it works before the learner has data enough
 * to fetch JSON. The filter below is progressive enhancement over this markup.
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
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Courses</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink/70 dark:text-light/70">
          Each course is a mission: {all[0]?.sessionLengthMinutes || 105}-minute levels, three nights a week, the same order your
          instructor follows. The first level is free so you can judge the teaching before you pay anything.
        </p>
      </header>

      <CourseFilter tracks={categories()} total={all.length} />

      {courses.length === 0 ? (
        <Card className="text-center"><p className="text-sm">Nothing matches that yet. <a className="font-medium text-blue underline dark:text-sky" href="/courses">Clear the filters</a>.</p></Card>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(c => (
            <li key={c.slug}>
              <a href={`/courses/${c.slug}`} className="group block h-full">
                <Card pad={false} className="h-full overflow-hidden transition group-hover:shadow-glow">
                  <div className="relative h-24 w-full bg-surface-muted dark:bg-surface-dark-muted">
                    {c.cover
                      ? <img src={c.cover} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                      : <span aria-hidden className="block h-full w-full" style={{ background: `linear-gradient(135deg, ${c.accent || '#1a365d'}, #0f1b33)` }} />}
                    <span className="absolute left-3 top-3"><Chip tone="success">Level 1 free</Chip></span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 text-xs text-ink/55 dark:text-light/55">
                      <span>{c.category}</span><span>{c.sessionsCount} levels{c.weeks ? ` · ${c.weeks} weeks` : ''}</span>
                    </div>
                    <h2 className="mt-1 text-[17px] font-semibold leading-snug group-hover:underline">{c.displayTitle || c.name}</h2>
                    {blurb(c) && <p className="mt-1 line-clamp-2 text-sm text-ink/70 dark:text-light/70">{blurb(c)}</p>}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <Naira amount={c.feeNgn} className="font-semibold" />
                      {c.certificate ? <Chip tone="gold">Certificate</Chip> : <span className="text-xs text-ink/50 dark:text-light/50">no certificate</span>}
                    </div>
                  </div>
                </Card>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
