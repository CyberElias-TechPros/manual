import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { Naira } from '@cea/ui'
import { PAYMENT, isFreeAccess } from '@cea/config'
import { blurb, course, courseList, findCourse } from '@/lib/content'
import { CourseAccessPanel, CourseSyllabus } from './client'

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

/**
 * The course page answers four questions in order — what is this, what will I be able to do, what is
 * in it, what does it cost — and asks for one action. Everything else (tools, audience, refunds,
 * study mode) is below the fold in a single definition list instead of four boxes competing.
 */
export default function CoursePage({ params }: { params: { slug: string } }) {
  const meta = findCourse(params.slug)
  if (!meta) notFound()
  const bundle = course(meta.slug)
  if (!bundle && process.env.NODE_ENV === 'development') redirect(`/courses`)
  const first = bundle?.sessions?.[0]
  const title = meta.displayTitle || meta.name

  return (
    <div className="pb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd(meta)) }} />

      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <aside className="lg:col-start-2 lg:row-span-4 lg:pt-2">
          <CourseAccessPanel slug={meta.slug} feeNgn={meta.feeNgn} freeTitle={first?.title} />
        </aside>

        <header className="min-w-0 lg:col-start-1 lg:row-start-1">
          <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-ink-500 dark:text-light/55">
            <a href="/courses" className="underline-offset-2 hover:text-ink hover:underline dark:hover:text-light">Courses</a>
            <span aria-hidden> · </span>{meta.category}
          </nav>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-snugish text-ink sm:text-[2.35rem] dark:text-light">{title}</h1>
          {blurb(meta) && <p className="mt-4 max-w-reading text-lg leading-relaxed text-ink-600 dark:text-light/70">{blurb(meta)}</p>}
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem] text-ink-600 dark:text-light/65">
            <li><span className="font-medium tabular-nums text-ink dark:text-light">{meta.sessionsCount}</span> levels</li>
            <li>{meta.sessionLengthMinutes || 105} minutes each</li>
            {meta.weeks && <li>{meta.weeks} weeks, three nights a week</li>}
            {meta.level && <li>{meta.level.split('(')[0].trim()}</li>}
            {meta.certificate && <li>certificate on completion</li>}
          </ul>
        </header>

        {first && (
          <section aria-labelledby="start-h" className="mt-2 max-w-reading lg:col-start-1 lg:row-start-2">
            <h2 id="start-h" className="sr-only">Start now</h2>
            <p className="border-t border-surface-line pt-5 text-[0.9375rem] leading-relaxed text-ink-700 dark:border-surface-dark-line dark:text-light/80">
              {isFreeAccess()
                ? <>All <strong>{meta.sessionsCount} levels</strong> in this course are unlocked for free right now while payments are paused! Start with Level 1 — “{first.title}” — earn XP, build your streak and work toward your certificate.</>
                : <>Level 1 — “{first.title}” — is free and open right now: {first.durationMinutes || 105} minutes, {first.outcomes?.length || 0} outcome{first.outcomes?.length === 1 ? '' : 's'} and a {first.quiz?.questions?.length || 0}-question check. No card, no payment.</>}
            </p>
          </section>
        )}

        {meta.outcomes?.length ? (
          <section aria-labelledby="outcomes" className="max-w-reading lg:col-start-1 lg:row-start-3">
            <h2 id="outcomes" className="text-xl font-semibold text-ink dark:text-light">What you will be able to do</h2>
            <ul className="mt-3 space-y-2.5 text-base leading-relaxed text-ink-700 dark:text-light/85">
              {meta.outcomes.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </section>
        ) : null}

        <section id="syllabus" aria-labelledby="syllabus-h" className="scroll-mt-20 lg:col-start-1 lg:row-start-4">
          <h2 id="syllabus-h" className="text-xl font-bold text-ink dark:text-light">Course levels (click any level to play &amp; earn XP)</h2>
          <p className="mt-1.5 max-w-reading text-[0.9375rem] text-ink-600 dark:text-light/70">
            Follow the levels in order — every level explains new words in plain English, gives you a short practice task, and awards XP &amp; stars.
          </p>
          <CourseSyllabus slug={meta.slug} />
        </section>
      </div>

      {(meta.tools?.length || meta.audience?.length || meta.prerequisites?.length || meta.studyMode || meta.description) && (
        <section aria-labelledby="detail" className="mt-16 border-t border-surface-line pt-8 dark:border-surface-dark-line">
          <h2 id="detail" className="text-xl font-semibold text-ink dark:text-light">Before you join</h2>
          <dl className="mt-5 max-w-reading divide-y divide-surface-line dark:divide-surface-dark-line">
            {meta.audience?.length ? <DetailList term="Who it is for" items={meta.audience.slice(0, 5)} /> : null}
            {meta.prerequisites?.length ? <DetailList term="Bring with you" items={meta.prerequisites} /> : null}
            {meta.tools?.length ? <DetailList term="Tools you will use" items={meta.tools} /> : null}
            {meta.entryRequirements?.length ? <DetailList term="Entry requirements" items={meta.entryRequirements.slice(0, 4)} /> : null}
            {meta.studyMode ? (
              <div className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="shrink-0 text-ink-500 dark:text-light/55">How it is taught</dt>
                <dd className="text-right text-[0.9375rem] text-ink dark:text-light">{meta.studyMode}</dd>
              </div>
            ) : null}
            {meta.description ? (
              <div className="py-4">
                <dt className="text-ink-500 dark:text-light/55">About this course</dt>
                <dd className="mt-2 max-w-reading whitespace-pre-line text-base leading-relaxed text-ink-700 dark:text-light/85">{meta.description}</dd>
              </div>
            ) : null}
            <div className="flex items-baseline justify-between gap-6 py-3.5">
              <dt className="shrink-0 font-semibold text-ink-600 dark:text-light/70">Standard fee</dt>
              <dd className="text-right text-[0.9375rem] text-ink dark:text-light">
                {isFreeAccess()
                  ? <><span className="text-ink-400 line-through dark:text-light/45"><Naira amount={meta.feeNgn} /></span> · <strong className="text-success">Free right now (payments paused)</strong></>
                  : <><Naira amount={meta.feeNgn} className="font-bold" />, one-off · {PAYMENT.refundWindowDays}-day refund {PAYMENT.refundCondition}</>}
              </dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  )
}

function DetailList({ term, items }: { term: string; items: string[] }) {
  return (
    <div className="py-4">
      <dt className="text-ink-500 dark:text-light/55">{term}</dt>
      <dd>
        <ul className="mt-2 space-y-1.5 text-[0.9375rem] leading-relaxed text-ink-700 dark:text-light/85">
          {items.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </dd>
    </div>
  )
}
