import Link from 'next/link'
import { Card, Chip, Naira, StreakFlame } from '@cea/ui'
import { XP, RANKS, PAYMENT } from '@cea/config'
import { bundleExists, categories, courseList, type IndexCourse , blurb} from '@/lib/content'

export const revalidate = 3600

const money = (n: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n)

export default function HomePage() {
  const courses = courseList()
  const cats = categories()
  const totalLevels = courses.reduce((n, c) => n + (c.sessionsCount || 0), 0)
  const featured = [...courses].sort((a, b) => (b.sessionsCount || 0) - (a.sessionsCount || 0)).slice(0, 6)

  if (!bundleExists()) {
    return (
      <Card className="mx-auto max-w-reading text-center">
        <h1 className="text-2xl font-bold">Content not built yet</h1>
        <p className="mt-2 text-sm text-ink/70 dark:text-light/70">
          This app reads its lessons from <code className="rounded bg-surface-muted px-1 dark:bg-surface-dark-muted">apps/web/.content</code>.
          Run <code className="rounded bg-surface-muted px-1 dark:bg-surface-dark-muted">pnpm content:build</code> (after <code>pnpm content:extract</code> for the PDFs) and reload.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-card bg-deep px-4 py-8 text-light sm:px-8 sm:py-12">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-navy/70 blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-gold/15 blur-2xl" />
        <div className="relative max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-gold">
            From zero to expert, together
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
            Learn a real skill. Prove it with a project. Keep the streak.
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-light/85">
            {courses.length} courses from Cyber Elias Academy, {totalLevels} levels of lesson, demo, practice and quiz —
            the same material your instructor teaches in class, on your phone, even when the data bundle finishes.
            Level 1 of every course is free, forever.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/courses" className="inline-flex min-h-[44px] items-center rounded-pill bg-gold px-5 py-2.5 text-[15px] font-semibold text-deep transition hover:brightness-105 active:translate-y-px">
              Choose a course
            </Link>
            <Link href="/auth/register" className="inline-flex min-h-[44px] items-center rounded-pill border border-white/25 px-5 py-2.5 text-[15px] font-medium text-light transition hover:bg-white/10">
              Create a free account
            </Link>
            <span className="text-xs text-light/65">No card. Pay by transfer when you are ready.</span>
          </div>
          <dl className="mt-7 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [`${courses.length}`, 'courses'],
              [`${totalLevels}`, 'levels'],
              ['105', 'minutes each'],
              ['0', 'KB of video'],
            ].map(([v, k]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-wide text-light/55">{k}</dt>
                <dd className="text-xl font-bold tabular-nums text-gold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="how" className="grid gap-3 sm:grid-cols-3">
        <h2 id="how" className="sr-only">How a level works</h2>
        {[
          { t: 'Read and watch the demo', d: 'Every level follows the manual: objectives, lecture, worked demo, then your turn. Diagrams come straight from the PDF so nothing is lost in translation.', x: `+${XP.lessonRead} XP` },
          { t: 'Answer the knowledge check', d: 'Six questions from the same session. Graded on our server, unlimited retries, model answer shown after every attempt.', x: `+${XP.quizPass} XP` },
          { t: 'Submit the practical task', d: 'The exercise is the point of the course. You get the rubric before you start and the model answer after you submit.', x: `+${XP.exerciseSubmit} XP` },
        ].map((s, i) => (
          <Card key={s.t} className="relative">
            <span className="absolute right-4 top-4 rounded-pill bg-gold/15 px-2 py-0.5 text-xs font-semibold text-[#8a5b0d] dark:text-gold">{s.x}</span>
            <div className="text-xs font-mono text-ink/45 dark:text-light/45">STEP {i + 1}</div>
            <h3 className="mt-1 text-lg font-semibold text-navy dark:text-light">{s.t}</h3>
            <p className="mt-1.5 text-sm text-ink/75 dark:text-light/75">{s.d}</p>
          </Card>
        ))}
      </section>

      <section aria-labelledby="missions">
        <header className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="missions" className="text-2xl font-bold text-navy dark:text-light">Missions — pick your course</h2>
            <p className="text-sm text-ink/70 dark:text-light/70">Courses are missions; each level is a step. Finish 10 of 12 and the academy issues your certificate.</p>
          </div>
          <Link href="/courses" className="text-sm font-medium text-blue underline underline-offset-4 dark:text-sky">All {courses.length} courses →</Link>
        </header>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(c => <CourseCard key={c.slug} course={c} />)}
        </div>
      </section>

      {cats.length > 1 && (
        <section aria-labelledby="bycat" className="rounded-card border border-surface-line bg-surface p-4 dark:border-surface-dark-line dark:bg-surface-dark">
          <h2 id="bycat" className="text-lg font-semibold text-navy dark:text-light">Browse by track</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {cats.map(cat => (
              <li key={cat}>
                <Link href={`/courses?track=${encodeURIComponent(cat)}`} className="inline-flex min-h-[38px] items-center rounded-pill bg-surface-muted px-3.5 py-1.5 text-sm font-medium text-ink transition hover:bg-navy hover:text-white dark:bg-surface-dark-muted dark:text-light/85 dark:hover:bg-sky dark:hover:text-deep">
                  {cat} <span className="ml-1 text-xs opacity-60">{courses.filter(c => (c.category || 'Other') === cat).length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="ranks" className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <Card>
          <h2 id="ranks" className="text-lg font-semibold text-navy dark:text-light">Ranks you can see coming</h2>
          <p className="mt-1 text-sm text-ink/70 dark:text-light/70">XP only ever goes up. The daily cap exists so the leaderboard rewards a habit, not a binge.</p>
          <ol className="mt-3 space-y-2">
            {RANKS.map((r: any, i: number) => (
              <li key={r.key} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/8 text-xs font-bold text-navy dark:bg-sky/15 dark:text-sky">{i + 1}</span>
                <span className="min-w-0">
                  <span className="font-semibold">{r.name}</span>
                  <span className="ml-2 font-mono text-xs text-ink/55 dark:text-light/55">{money(r.min)} XP{r.min === 0 ? '' : '+'}</span>
                  <span className="block text-sm text-ink/70 dark:text-light/70">{r.blurb}</span>
                </span>
              </li>
            ))}
          </ol>
        </Card>
        <Card className="bg-paper dark:bg-surface-dark-muted">
          <h2 className="text-lg font-semibold text-navy dark:text-light">What it costs</h2>
          <p className="mt-1 text-sm text-ink/75 dark:text-light/75">
            One payment per course, in naira, by bank transfer — from {money(PAYMENT.minAmountNgn)} depending on the course.
            You send the receipt, an approval unlocks your levels, usually the same day.
          </p>
          <dl className="mt-3 space-y-1.5 text-sm">
            <Row k="Bank" v={`${PAYMENT.bank} · ${PAYMENT.accountName}`} />
            <Row k="Account" v={PAYMENT.accountNumber} mono />
            <Row k="Approval" v={`within ${PAYMENT.slaHours}h of your receipt`} />
            <Row k="Access" v="yours for life; level 1 free, always" />
            <Row k="Refunds" v={`${PAYMENT.refundWindowDays} days, ${PAYMENT.refundCondition}`} />
          </dl>
          <div className="mt-3 flex items-center gap-2 text-sm text-ink/70 dark:text-light/70">
            <StreakFlame count={3} /> — a 7-day streak is worth {XP.streakWeekBonus} XP and one freeze is banked every {3} days of consistency.
          </div>
          <Link href="/courses" className="mt-4 inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-[15px] font-medium text-white hover:bg-blue">
            Start with the free level
          </Link>
        </Card>
      </section>
    </div>
  )
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-surface-line pb-1.5 last:border-0 dark:border-surface-dark-line">
      <dt className="text-ink/60 dark:text-light/60">{k}</dt>
      <dd className={mono ? 'font-mono text-[13px] font-medium' : 'text-right font-medium'}>{v}</dd>
    </div>
  )
}

export function CourseCard({ course }: { course: IndexCourse }) {
  const c = course
  const accent = c.accent || '#1a365d'
  return (
    <Card pad={false} className="group overflow-hidden">
      <a href={`/courses/${c.slug}`} className="block focus-visible:outline-none" aria-label={`${c.displayTitle || c.name}: see the syllabus`}>
        <div className="relative h-28 w-full overflow-hidden bg-surface-muted dark:bg-surface-dark-muted">
          {c.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={c.cover} alt="" width={480} height={112} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          ) : (
            <div aria-hidden className="h-full w-full" style={{ background: `linear-gradient(135deg, ${accent}, #0f1b33)` }} />
          )}
          <span className="absolute left-3 top-3"><Chip tone="success">Level 1 free</Chip></span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 text-xs text-ink/55 dark:text-light/55">
            <span>{c.category}</span><span>{c.sessionsCount} levels</span>
          </div>
          <h3 className="mt-1 text-[17px] font-semibold leading-snug text-navy group-hover:underline dark:text-light">{c.displayTitle || c.name}</h3>
          {blurb(c) && <p className="mt-1 line-clamp-2 text-sm text-ink/70 dark:text-light/70">{blurb(c)}</p>}
          <div className="mt-3 flex items-center justify-between gap-2">
            <Naira amount={c.feeNgn} className="text-sm font-semibold text-ink dark:text-light" />
            <span className="text-xs text-ink/55 dark:text-light/55">{c.weeks ? `${c.weeks} weeks` : ''}{c.certificate ? ' · certificate' : ''}</span>
          </div>
        </div>
      </a>
    </Card>
  )
}
