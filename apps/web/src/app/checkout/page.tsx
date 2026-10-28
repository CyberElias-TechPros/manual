import { redirect } from 'next/navigation'
import { Card } from '@cea/ui'
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
    <div className="mx-auto max-w-2xl space-y-4 px-1 py-6">
      <h1 className="text-xl font-semibold text-navy dark:text-light">Choose the course to pay for</h1>
      <p className="text-sm text-ink/70 dark:text-light/70">
        Payment is one bank transfer per course, with its own reference — so the page that shows you
        the account details needs to know which course you mean. Pick one and the details, the amount
        and the “I have paid” step appear there.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {courses.map(c => (
          <Card key={c.slug} hover className="!p-3">
            <a href={`/checkout/${c.slug}`} className="block">
              <div className="font-medium text-navy dark:text-light">{c.displayTitle || c.name}</div>
              <div className="mt-0.5 line-clamp-2 text-xs text-ink/65 dark:text-light/65">{blurb(c)}</div>
              <div className="mt-1.5 font-mono text-xs text-gold">{c.feeNgn ? `₦${c.feeNgn.toLocaleString('en-NG')}` : 'fee on request'}</div>
            </a>
          </Card>
        ))}
      </div>
    </div>
  )
}
