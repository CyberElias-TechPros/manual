import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { Card, Chip, Naira } from '@cea/ui'
import { PAYMENT } from '@cea/config'
import { blurb, course, courseList, findCourse } from '@/lib/content'
import { CourseAccessPanel } from './client'

export const revalidate = 3600

export function generateStaticParams() {
  return courseList().map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = findCourse(params.slug)
  if (!c) return { title: 'Course not found' }
  return {
    title: c.displayTitle || c.name,
    description: blurb(c) || `${c.sessionsCount} levels from Cyber Elias Academy. First level free.`,
    alternates: { canonical: `/courses/${c.slug}` },
    openGraph: { title: c.displayTitle || c.name, description: blurb(c), images: c.cover ? [{ url: c.cover }] : undefined },
  }
}

/**
 * 9.6 — `Course` structured data, built only from what the manual already states: the price
 * a learner pays, the provider, the mode, the workload. A rich result is one of the few SEO
 * wins available to a Nigerian academy, and every field here comes from the built bundle
 * rather than a hand-tuned string that can drift from the course.
 */
function courseJsonLd(c: NonNullable<ReturnType<typeof findCourse>>) {
  const base = (process.env.NEXT_PUBLIC_URL || 'https://learn.cea.ng').replace(/\/$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: c.displayTitle || c.name,
    description: blurb(c),
    educationalLevel: c.level || c.category,
    inLanguage: 'en-NG',
    provider: { '@type': 'Organization', name: 'Cyber Elias Academy', url: 'https://cea.ng' },
    courseCode: c.certificateName,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseWorkload: `${c.weeks || 3} weeks`,
      courseMode: (c.studyMode || '').toLowerCase().includes('online') ? 'blended' : 'classroom',
      location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'NG' } },
    },
    offers: {
      '@type': 'Offer',
      category: 'purchasing',
      price: c.feeNgn ?? 0,
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
      url: `${base}/checkout/${c.slug}`,
      description: `${PAYMENT.bank} transfer to ${PAYMENT.accountName} · ${PAYMENT.accountNumber}. Level 1 is free.`,
    },
  }
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const meta = findCourse(params.slug)
  if (!meta) notFound()
  const bundle = course(meta.slug)
  if (!bundle && process.env.NODE_ENV === 'development') redirect(`/courses`)
  const first = bundle?.sessions?.[0]

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd(meta)) }} />
      <header className="relative overflow-hidden rounded-card bg-deep text-light">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: meta.accent || '#d69e2e' }} />
        <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-xs text-light/60">
              <a href="/courses" className="underline-offset-2 hover:underline">Courses</a> / <span className="text-light/85">{meta.category}</span>
            </nav>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{meta.displayTitle || meta.name}</h1>
            {blurb(meta) && <p className="mt-2 max-w-2xl text-[15px] text-light/85">{blurb(meta)}</p>}
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-light/80">
              <li><span className="font-semibold text-gold">{meta.sessionsCount}</span> levels</li>
              <li>{meta.sessionLengthMinutes || 105} min each</li>
              {meta.weeks && <li>{meta.weeks} weeks · 3 nights</li>}
              {meta.level && <li>{meta.level}</li>}
              {meta.certificate && <li>certificate on completion</li>}
            </ul>
            {meta.studyMode && <p className="mt-2 text-xs text-light/60">{meta.studyMode}</p>}
          </div>
          <div className="rounded-card bg-white/8 p-4 backdrop-blur-sm">
            <div className="flex items-baseline gap-2">
              <Naira amount={meta.feeNgn} className="text-2xl font-bold text-gold" />
              <span className="text-xs text-light/70">one-off · bank transfer</span>
            </div>
            <p className="mt-2 text-sm text-light/85">
              Level 1 is free and stays free. Pay only if the teaching is worth it — then {meta.sessionsCount - 1} levels,
              the projects and the certificate unlock the moment an admin approves your receipt
              ({PAYMENT.slaHours}h target).
            </p>
            <CourseAccessPanel slug={meta.slug} />
          </div>
        </div>
      </header>

      <section id="syllabus" aria-labelledby="syllabus-h" className="scroll-mt-20">
        <h2 id="syllabus-h" className="text-xl font-bold text-navy dark:text-light">The map — {meta.sessionsCount} levels</h2>
        <p className="mt-1 text-sm text-ink/70 dark:text-light/70">Levels open in order. Each one is a mission step, not a video to sit through.</p>
        <CourseSyllabus slug={meta.slug} />
      </section>

      {(meta.outcomes?.length || meta.tools?.length || meta.prerequisites?.length || meta.audience?.length) && (
        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {meta.outcomes?.length ? (
            <Card>
              <h2 className="text-base font-semibold text-navy dark:text-light">You will be able to</h2>
              <ul className="mt-2 space-y-1.5 text-sm">
                {meta.outcomes.map((o, i) => <li key={i} className="flex gap-2"><span aria-hidden className="text-success">✓</span><span>{o}</span></li>)}
              </ul>
            </Card>
          ) : null}
          {meta.tools?.length ? (
            <Card>
              <h2 className="text-base font-semibold text-navy dark:text-light">Tools you will use</h2>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {meta.tools.map((t, i) => <li key={i}><Chip tone="muted">{t}</Chip></li>)}
              </ul>
            </Card>
          ) : null}
          {meta.audience?.length ? (
            <Card>
              <h2 className="text-base font-semibold text-navy dark:text-light">Who it is for</h2>
              <ul className="mt-2 space-y-1.5 text-sm">
                {meta.audience.slice(0, 4).map((a: string, i: number) => <li key={i}>{a}</li>)}
              </ul>
            </Card>
          ) : null}
          {meta.prerequisites?.length ? (
            <Card>
              <h2 className="text-base font-semibold text-navy dark:text-light">Bring with you</h2>
              <ul className="mt-2 space-y-1.5 text-sm">
                {meta.prerequisites.map((t: string, i: number) => <li key={i}>{t}</li>)}
              </ul>
            </Card>
          ) : null}
        </section>
      )}

      {meta.description && (
        <section aria-labelledby="about">
          <h2 id="about" className="text-xl font-bold text-navy dark:text-light">About this course</h2>
          <p className="mt-2 max-w-reading whitespace-pre-line text-[15px] leading-relaxed text-ink/85 dark:text-light/85">{meta.description}</p>
        </section>
      )}

      {first && (
        <Card className="border-gold/50 bg-paper dark:bg-surface-dark-muted">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-navy dark:text-light">Start now: level 1 — “{first.title}”</h2>
              <p className="mt-1 text-sm text-ink/70 dark:text-light/70">
                {first.durationMinutes || 105} minutes · {first.outcomes?.length || 0} outcomes · {first.quiz?.questions?.length || 0}-question knowledge check. No payment, no card.
              </p>
            </div>
            <a href={`/learn/${meta.slug}/1`} className="inline-flex min-h-[44px] items-center rounded-pill bg-gold px-5 text-[15px] font-semibold text-deep hover:brightness-105">
              Open level 1
            </a>
          </div>
        </Card>
      )}
    </div>
  )
}

/** Separate client boundary so the (dynamic) access states never make this page dynamic. */
import { CourseSyllabus } from './client'
