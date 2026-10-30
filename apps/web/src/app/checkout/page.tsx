import { redirect } from 'next/navigation'
import { AdSlot, CourseRows, Pill } from '@cea/ui'
import { isFreeAccess } from '@cea/config'
import { blurb, courseList } from '@/lib/content'

/**
 * `/checkout` on its own has no meaning in this app — payment is per course, because the
 * transfer reference and the amount both come from one course's fee. Rather than a 404 for a
 * hand-typed or bookmarked URL, send a signed-in learner to the dashboard (where a pending
 * payment is already waiting for them) and everyone else to the catalogue.
 */
export default function CheckoutIndex() {
  const courses = courseList()
  return (
    <div className="mx-auto max-w-reading py-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold tracking-snugish text-ink dark:text-light">
          {isFreeAccess() ? 'Choose the course to start — free right now' : 'Choose the course to pay for'}
        </h1>
        {isFreeAccess() && <Pill tone="success">Payments paused</Pill>}
      </div>
      <p className="mt-3 text-base leading-relaxed text-ink-700 dark:text-light/85">
        {isFreeAccess()
          ? 'Good news: payments are paused right now! No bank transfer or card is needed — every single level in all 16 courses is open for free. Standard fees are shown below for later reference; click any course to jump straight into Level 1 and start earning XP.'
          : 'Payment is one bank transfer per course, with its own reference — pick one and the transfer details appear there.'}
      </p>
      <AdSlot placement="checkout-note" variant="card" />
      <div className="mt-6 border-t border-surface-line dark:border-surface-dark-line">
        <CourseRows
          courses={courses.map(c => ({
            slug: c.slug, title: c.displayTitle || c.name, blurb: blurb(c),
            meta: `${c.sessionsCount} levels`, feeNgn: c.feeNgn,
            href: isFreeAccess() ? `/learn/${c.slug}/1` : `/checkout/${c.slug}`,
          }))}
        />
      </div>
    </div>
  )
}
