import Link from 'next/link'
import { CourseRows } from '@cea/ui'
import { PAYMENT, RANKS, XP } from '@cea/config'
import { blurb, categories, courseList, bundleExists, type IndexCourse } from '@/lib/content'

export const revalidate = 3600

const money = (n: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n)

/**
 * The manual calls typing and computer basics the foundation course, and the level above every
 * other course assumes it. A beginner arriving here with 16 options needs one answer before they
 * need a catalogue, so the home page recommends exactly one place to start.
 */
const START_HERE = 'typing-computer-basics'

const STEPS = [
  { t: 'Read one section at a time', d: 'A level is staged: a short read, then the practice, then the check. You never see the whole manual at once, and the page remembers which stage you stopped on.' },
  { t: 'Do it on your own machine', d: 'Every level ends with something you produce — a spreadsheet, a config, an invoice, a cut. The rubric is given before you start, the model answer after you submit.' },
  { t: 'Answer the knowledge check', d: 'Six questions from the same session, graded on our server, unlimited retries. Passing is what unlocks the next level — not speed, and not attendance.' },
  { t: 'Close the level, keep the habit', d: 'Finishing banks the level credit and keeps your streak. A week of levels is worth a bonus; a missed day can be covered by a freeze you earned.' },
]

export default function HomePage() {
  const courses = courseList()
  const cats = categories()
  const totalLevels = courses.reduce((n, c) => n + (c.sessionsCount || 0), 0)
  const start = courses.find(c => c.slug === START_HERE) ?? courses[0]
  const fees = courses.map(c => c.feeNgn).filter((v): v is number => typeof v === 'number').sort((a, b) => a - b)
  const feeFrom = money(fees[0] ?? 20000)
  const feeTo = money(fees[fees.length - 1] ?? 50000)
  const featured = [start, ...courses.filter(c => c.slug !== start?.slug)].slice(0, 6)

  if (!bundleExists()) {
    return (
      <div className="mx-auto max-w-reading py-16 text-center">
        <h1 className="text-2xl font-semibold text-ink dark:text-light">Content not built yet</h1>
        <p className="mx-auto mt-2 max-w-measure text-[0.9375rem] text-ink-500 dark:text-light/60">
          This app reads its lessons from <code className="rounded bg-surface-muted px-1 dark:bg-surface-dark-muted">apps/web/.content</code>. Run{' '}
          <code className="rounded bg-surface-muted px-1 dark:bg-surface-dark-muted">pnpm content:build</code> (after <code>pnpm content:extract</code> for the PDFs) and reload.
        </p>
      </div>
    )
  }

  return (
    <div className="pb-6">
      <section className="max-w-3xl">
        <p className="text-[0.8125rem] font-medium text-ink-500 dark:text-light/55">Cyber Elias Academy · Lagos</p>
        <h1 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-snugish text-ink sm:text-[2.6rem] dark:text-light">
          Learn the skill you can be paid for, one level at a time.
        </h1>
        <p className="mt-5 max-w-reading text-lg leading-relaxed text-ink-600 dark:text-light/70">
          {courses.length} courses, {totalLevels} levels of lesson, worked demo, practice and check — the same material your
          instructor teaches in class, on your phone, and usable when the data bundle finishes. The first level of every
          course is free, so you can judge the teaching before you pay anything.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/courses" className="inline-flex min-h-[48px] items-center rounded-card bg-navy px-6 text-base font-medium text-white transition-colors hover:bg-[#152c4d]">
            Choose a course
          </Link>
          <Link href="/auth/register" className="inline-flex min-h-[48px] items-center text-base font-medium text-navy underline-offset-4 hover:underline dark:text-sky">
            Create a free account
          </Link>
          <span className="text-[0.8125rem] text-ink-500 dark:text-light/55">No card needed. You pay by transfer when you are ready.</span>
        </div>
      </section>

      {start && (
        <section aria-labelledby="start-here" className="mt-14 rounded-card bg-surface-muted p-6 sm:p-8 dark:bg-surface-dark-muted">
          <h2 id="start-here" className="text-xl font-semibold text-ink dark:text-light">Not sure where to start?</h2>
          <p className="mt-2 max-w-reading text-base leading-relaxed text-ink-600 dark:text-light/70">
            {start.displayTitle || start.name} — {blurb(start)} It is {start.sessionsCount} levels over {start.weeks || 2} weeks,
            {' '}{money(start.feeNgn ?? 0)}, and every other course assumes what it teaches.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={`/learn/${start.slug}/1`} className="inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white hover:bg-[#152c4d]">
              Start level 1 free
            </Link>
            <Link href={`/courses/${start.slug}`} className="text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">Read the syllabus first</Link>
          </div>
        </section>
      )}

      <section aria-labelledby="catalogue" className="mt-16">
        <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-surface-line pb-3 dark:border-surface-dark-line">
          <div>
            <h2 id="catalogue" className="text-xl font-semibold text-ink dark:text-light">Courses</h2>
            <p className="mt-1 text-[0.9375rem] text-ink-500 dark:text-light/55">Sorted by what people start with. Every one ends in a project and a certificate.</p>
          </div>
          <Link href="/courses" className="text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">All {courses.length} courses</Link>
        </header>
        <CourseRows
          className="mt-1"
          courses={featured.map((c: IndexCourse) => ({
            slug: c.slug,
            title: c.displayTitle || c.name,
            blurb: blurb(c),
            meta: [c.category, `${c.sessionsCount} levels`, c.weeks ? `${c.weeks} weeks` : null].filter(Boolean).join(' · '),
            feeNgn: c.feeNgn,
            cover: c.cover,
            certificate: c.certificate,
          }))}
        />
      </section>

      {cats.length > 1 && (
        <nav aria-label="Browse by track" className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
          {cats.map(cat => (
            <Link
              key={cat} href={`/courses?track=${encodeURIComponent(cat)}`}
              className="min-h-[36px] text-[0.9375rem] text-ink-600 underline-offset-4 hover:text-ink hover:underline dark:text-light/65 dark:hover:text-light"
            >
              {cat} <span className="tabular-nums text-ink-400 dark:text-light/40">{courses.filter(c => (c.category || 'Other') === cat).length}</span>
            </Link>
          ))}
        </nav>
      )}

      <section aria-labelledby="how" className="mt-16">
        <h2 id="how" className="text-xl font-semibold text-ink dark:text-light">How one level works</h2>
        <p className="mt-1.5 max-w-reading text-[0.9375rem] text-ink-500 dark:text-light/55">
          About {courses[0]?.sessionLengthMinutes || 105} minutes, taken in four stages. Nothing is timed against you.
        </p>
        <ol className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4">
              <span aria-hidden className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-surface-line-strong text-[0.75rem] tabular-nums text-ink-500 dark:border-surface-dark-line-strong dark:text-light/55">{i + 1}</span>
              <span>
                <span className="block text-base font-medium text-ink dark:text-light">{s.t}</span>
                <span className="mt-1 block max-w-measure text-[0.9375rem] leading-relaxed text-ink-500 dark:text-light/60">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="fees" className="mt-16 grid gap-x-12 gap-y-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 id="fees" className="text-xl font-semibold text-ink dark:text-light">What it costs</h2>
          <p className="mt-2 max-w-reading text-base leading-relaxed text-ink-600 dark:text-light/70">
            One payment per course, in naira, by bank transfer — {feeFrom} to {feeTo} depending on the course. You send the
            receipt, an administrator approves it, and your levels unlock — usually the same day.
          </p>
          <dl className="mt-5 max-w-measure divide-y divide-surface-line text-[0.9375rem] dark:divide-surface-dark-line">
            <Row k="Bank" v={`${PAYMENT.bank} · ${PAYMENT.accountName}`} />
            <Row k="Account number" v={PAYMENT.accountNumber} mono />
            <Row k="Approval" v={`within ${PAYMENT.slaHours} hours of your receipt`} />
            <Row k="Access" v="yours for life; level 1 free, always" />
            <Row k="Refunds" v={`${PAYMENT.refundWindowDays} days, ${PAYMENT.refundCondition}`} />
          </dl>
          <Link href="/courses" className="mt-6 inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">
            Start with the free level of any course
          </Link>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-ink dark:text-light">Ranks, if you like the numbers</h2>
          <p className="mt-2 max-w-reading text-[0.9375rem] leading-relaxed text-ink-500 dark:text-light/55">
            XP only ever goes up, and the daily cap ({XP.dailyCap} XP) exists so the rank rewards a habit instead of a binge. You can ignore all of it and still finish every course.
          </p>
          <ol className="mt-5 divide-y divide-surface-line text-[0.9375rem] dark:divide-surface-dark-line">
            {RANKS.map((r: any) => (
              <li key={r.key} className="flex items-baseline gap-4 py-2.5">
                <span className="w-24 shrink-0 font-medium text-ink dark:text-light">{r.name}</span>
                <span className="tabular-nums text-ink-500 dark:text-light/55">{r.min.toLocaleString('en-NG')} XP</span>
                <span className="min-w-0 flex-1 text-ink-500 dark:text-light/50">{r.blurb}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-ink-500 dark:text-light/55">{k}</dt>
      <dd className={mono ? 'text-right font-mono text-[0.875rem] font-medium text-ink dark:text-light' : 'text-right font-medium text-ink dark:text-light'}>{v}</dd>
    </div>
  )
}

