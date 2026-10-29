import Link from 'next/link'
import { AdSlot, CourseRows, Pill } from '@cea/ui'
import { GAME, PAYMENT, RANKS, XP, isFreeAccess } from '@cea/config'
import { blurb, categories, courseList, bundleExists, type IndexCourse } from '@/lib/content'

export const revalidate = 3600

const money = (n: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n)

/**
 * Typing & Computer Basics is the friendliest starting point in the academy. Every other course
 * builds on it, so a brand-new beginner gets one clear recommendation right at the top.
 */
const START_HERE = 'typing-computer-basics'

const STEPS = [
  {
    t: `1. Read in small, simple steps (+${XP.lessonRead} XP)`,
    d: 'Every level breaks into short, plain-English parts. Tricky words are explained right at the top before you start, and we remember the exact step where you stopped.',
  },
  {
    t: `2. Try a real hands-on task (+${XP.exerciseSubmit} XP)`,
    d: 'Do one practical task yourself — a Word letter, an Excel sheet, a flyer, or a short piece of code. You see the checklist before you begin and the example answer right after.',
  },
  {
    t: `3. Pass the friendly quiz check (+${XP.quizPass}–${XP.quizPass + XP.quizPerfectBonus} XP)`,
    d: `No countdown timer and unlimited retries! Answer in simple everyday words, and string ${GAME.combo.trigger} right answers in a row for an extra Combo XP bonus.`,
  },
  {
    t: `4. Finish the level, spin the wheel & grow your streak (+${XP.sessionComplete} XP)`,
    d: 'Closing a level banks your XP, keeps your daily streak alive, unlocks badges, climbs the weekly leaderboard, and opens the next level toward your certificate.',
  },
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
  const freeNow = isFreeAccess()

  if (!bundleExists()) {
    return (
      <div className="mx-auto max-w-reading py-16 text-center">
        <h1 className="text-2xl font-bold text-ink dark:text-light">Content not built yet</h1>
        <p className="mx-auto mt-2 max-w-measure text-[0.9375rem] text-ink-600 dark:text-light/70">
          This app reads its lessons from <code className="rounded bg-surface-muted px-1 dark:bg-surface-dark-muted">apps/web/.content</code>. Run{' '}
          <code className="rounded bg-surface-muted px-1 dark:bg-surface-dark-muted">pnpm content:build</code> and reload.
        </p>
      </div>
    )
  }

  return (
    <div className="pb-6">
      <section className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[0.8125rem] font-bold text-ink-600 dark:text-light/70">Cyber Elias Academy (CEA) · Learn a real skill</p>
          {freeNow && <Pill tone="success">100% Free Right Now · All {totalLevels} levels open</Pill>}
        </div>
        <h1 className="mt-3 text-3xl font-bold leading-[1.15] tracking-snugish text-ink sm:text-[2.6rem] dark:text-light">
          Learn a job-ready digital skill in simple, everyday English — one fun level at a time.
        </h1>
        <p className="mt-5 max-w-reading text-lg leading-relaxed text-ink-700 dark:text-light/85">
          {courses.length} beginner-friendly courses ({totalLevels} step-by-step levels) written so anyone can understand every
          single idea from zero. Earn <strong>XP</strong>, keep your <strong>daily streak</strong>, spin the{' '}
          <strong>Daily Bonus Wheel</strong>, unlock <strong>badges</strong>, climb the <strong>leaderboard</strong>, and claim your{' '}
          <strong>certificate</strong> — {freeNow ? 'with every level unlocked for free while payments are paused.' : 'starting with Level 1 free on every course.'}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/courses" className="inline-flex min-h-[48px] items-center rounded-card bg-navy px-6 text-base font-bold text-white transition-colors hover:bg-[#152c4d]">
            Pick a free course &amp; start
          </Link>
          <Link href="/auth/register" className="inline-flex min-h-[48px] items-center text-base font-bold text-navy underline-offset-4 hover:underline dark:text-sky">
            Create free account (saves XP &amp; streak)
          </Link>
          <span className="text-[0.875rem] font-semibold text-ink-600 dark:text-light/70">
            {freeNow ? 'No payment, no bank transfer, no card needed.' : 'No card needed to start.'}
          </span>
        </div>
      </section>

      {start && (
        <section aria-labelledby="start-here" className="mt-12 rounded-card border border-surface-line bg-surface-muted p-6 sm:p-8 dark:border-surface-dark-line dark:bg-surface-dark-muted">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="start-here" className="text-xl font-bold text-ink dark:text-light">Brand new? Start right here!</h2>
            <Pill tone="gold">+{XP.lessonRead + XP.quizPass + XP.sessionComplete} XP on Level 1</Pill>
          </div>
          <p className="mt-2 max-w-reading text-base leading-relaxed text-ink-700 dark:text-light/85">
            <strong>{start.displayTitle || start.name}</strong> — {blurb(start)} It has {start.sessionsCount} easy levels
            ({freeNow ? <>standard fee <span className="line-through">{money(start.feeNgn ?? 0)}</span> — <strong>free right now</strong></> : money(start.feeNgn ?? 0)}).
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={`/learn/${start.slug}/1`} className="inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-bold text-white hover:bg-[#152c4d]">
              Open Level 1 now →
            </Link>
            <Link href={`/courses/${start.slug}`} className="text-[0.9375rem] font-bold text-navy underline-offset-4 hover:underline dark:text-sky">See all {start.sessionsCount} levels</Link>
          </div>
        </section>
      )}

      <AdSlot placement="home-inline" />

      <section aria-labelledby="catalogue" className="mt-12">
        <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-surface-line pb-3 dark:border-surface-dark-line">
          <div>
            <h2 id="catalogue" className="text-xl font-bold text-ink dark:text-light">Popular courses to play &amp; master</h2>
            <p className="mt-1 text-[0.9375rem] text-ink-600 dark:text-light/70">
              Every course explains concepts in plain words, awards XP &amp; badges on every level, and ends with a verified certificate.
            </p>
          </div>
          <Link href="/courses" className="text-[0.9375rem] font-bold text-navy underline-offset-4 hover:underline dark:text-sky">See all {courses.length} courses →</Link>
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
              className="min-h-[36px] text-[0.9375rem] font-semibold text-ink-700 underline-offset-4 hover:text-ink hover:underline dark:text-light/80 dark:hover:text-light"
            >
              {cat} <span className="tabular-nums text-ink-500 dark:text-light/55">({courses.filter(c => (c.category || 'Other') === cat).length})</span>
            </Link>
          ))}
        </nav>
      )}

      <section aria-labelledby="how" className="mt-14">
        <h2 id="how" className="text-xl font-bold text-ink dark:text-light">How every level works (simple &amp; stress-free)</h2>
        <p className="mt-1.5 max-w-reading text-[0.9375rem] text-ink-600 dark:text-light/70">
          Four clear steps per level. Go at your own pace — nothing is timed against you, and every step rewards XP.
        </p>
        <ol className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4">
              <span aria-hidden className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-[0.8125rem] font-bold tabular-nums text-white dark:bg-sky dark:text-deep">{i + 1}</span>
              <span>
                <span className="block text-base font-bold text-ink dark:text-light">{s.t}</span>
                <span className="mt-1 block max-w-measure text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/75">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <AdSlot placement="home-mid" variant="card" />

      <section aria-labelledby="fees" className="mt-14 grid gap-x-12 gap-y-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 id="fees" className="text-xl font-bold text-ink dark:text-light">
            {freeNow ? 'Free right now — prices shown for later' : 'What it costs'}
          </h2>
          {freeNow ? (
            <>
              <p className="mt-2 max-w-reading text-base leading-relaxed text-ink-700 dark:text-light/85">
                Standard course fees at Cyber Elias Academy are <strong>{feeFrom} to {feeTo}</strong>, shown on each course card so you
                know the real value of the training. Right now, <strong>payments are paused and supported by partner ads</strong> — so
                every single level across all {courses.length} courses is <strong>100% free to open and finish</strong>!
              </p>
              <dl className="mt-5 max-w-measure divide-y divide-surface-line text-[0.9375rem] dark:divide-surface-dark-line">
                <Row k="Price right now" v="₦0 — all levels open free" />
                <Row k="Standard course value" v={`${feeFrom} – ${feeTo} (paused)`} />
                <Row k="Daily rewards" v="XP, streaks, badges & Daily Bonus Wheel" />
                <Row k="Certificates" v="Printable A4 + public verification code" />
              </dl>
              <Link href="/courses" className="mt-6 inline-flex min-h-[44px] items-center text-[0.9375rem] font-bold text-navy underline-offset-4 hover:underline dark:text-sky">
                Browse all {courses.length} free courses →
              </Link>
            </>
          ) : (
            <>
              <p className="mt-2 max-w-reading text-base leading-relaxed text-ink-700 dark:text-light/85">
                One payment per course, in naira, by bank transfer — {feeFrom} to {feeTo} depending on the course.
              </p>
              <dl className="mt-5 max-w-measure divide-y divide-surface-line text-[0.9375rem] dark:divide-surface-dark-line">
                <Row k="Bank" v={`${PAYMENT.bank} · ${PAYMENT.accountName}`} />
                <Row k="Account number" v={PAYMENT.accountNumber} mono />
                <Row k="Approval" v={`within ${PAYMENT.slaHours} hours of your receipt`} />
              </dl>
            </>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold text-ink dark:text-light">Climb the 6 Academy Ranks</h2>
          <p className="mt-2 max-w-reading text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/70">
            Earn XP from reading, quizzes, combos, daily quests and the Daily Bonus Wheel (up to {XP.dailyCap} XP a day so daily consistency wins!).
          </p>
          <ol className="mt-5 divide-y divide-surface-line text-[0.9375rem] dark:divide-surface-dark-line">
            {RANKS.map((r: any) => (
              <li key={r.key} className="flex items-baseline gap-4 py-2.5">
                <span className="w-28 shrink-0 font-bold text-ink dark:text-light">{r.name}</span>
                <span className="font-semibold tabular-nums text-[#8a5b0d] dark:text-gold">{r.min.toLocaleString('en-NG')} XP</span>
                <span className="min-w-0 flex-1 text-ink-600 dark:text-light/70">{r.blurb}</span>
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
      <dt className="shrink-0 font-medium text-ink-600 dark:text-light/70">{k}</dt>
      <dd className={mono ? 'text-right font-mono text-[0.875rem] font-bold text-ink dark:text-light' : 'text-right font-bold text-ink dark:text-light'}>{v}</dd>
    </div>
  )
}
