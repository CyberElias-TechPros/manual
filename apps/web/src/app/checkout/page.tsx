import { redirect } from 'next/navigation'
import { CourseRows } from '@cea/ui'
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
      <h1 className="text-2xl font-semibold tracking-snugish text-ink dark:text-light">Choose the course to pay for</h1>
      <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-light/70">
        Payment is one bank transfer per course, with its own reference — so the page that shows the account details needs to
        know which course you mean. Pick one and the amount, the transfer details and the “I have paid” step appear there.
      </p>
      <div className="mt-6 border-t border-surface-line dark:border-surface-dark-line">
        <CourseRows
          courses={courses.map(c => ({
            slug: c.slug, title: c.displayTitle || c.name, blurb: blurb(c),
            meta: `${c.sessionsCount} levels`, feeNgn: c.feeNgn, href: `/checkout/${c.slug}`,
          }))}
        />
      </div>
    </div>
  )
}
