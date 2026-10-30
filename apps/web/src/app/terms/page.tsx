import type { Metadata } from 'next'
import { H, LegalShell } from '../legal'
import { PAYMENT } from '@cea/config'
export const metadata: Metadata = { title: 'Terms', description: 'The deal between you and Cyber Elias Academy: access, fees, refunds, and what we expect of each other.', robots: { index: true } }
export const dynamic = 'force-dynamic'

export default function TermsPage() {
  return (
    <LegalShell title="Terms of use" updated="28 October 2026">
      <section><H>What you are buying</H>
        <p className="mt-2">
          A course on CEA Learn is one payment for lifetime access to that course’s levels, its exercises, its knowledge checks and the
          certificate when you finish. There is no subscription and nothing renews. Level 1 of every course is free and stays free.
        </p>
      </section>
      <section><H>Payment</H>
        <p className="mt-2">
          You transfer {`₦`}{/* fee shown on the checkout screen */} to <strong>{PAYMENT.accountName}</strong> · {PAYMENT.accountNumber} · {PAYMENT.bank}, using the
          reference the app gives you, then upload the receipt. An admin confirms it within {PAYMENT.slaHours} hours on working days. Levels
          unlock at approval, not at the transfer — that is how we keep a bank statement and an account honest without touching your banking login.
        </p>
      </section>
      <section><H>Refunds</H>
        <p className="mt-2">
          Ask within {PAYMENT.refundWindowDays} days of approval and you get all of it back while you have {PAYMENT.refundCondition}. Write to
          hello@cea.ng with your reference. If a course is withdrawn or a level is permanently unavailable, we refund pro-rata without
          conditions. A certificate already issued does not stop a refund of the remainder, but the certificate is voided.
        </p>
      </section>
      <section><H>Our part</H>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Keep the app available (target 99.5 % a month) and the content the same for everyone.</li>
          <li>Answer payment and access questions within one working day.</li>
          <li>Never put an ad inside a quiz or between two paragraphs of a lesson.</li>
          <li>Tell you when something about your data changes, before it affects you.</li>
        </ul>
      </section>
      <section><H>Your part</H>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>One account per person. Do not share logins; the certificate is only worth what it certifies.</li>
          <li>Do not scrape, resell or republish the material. It is the academy’s, and the tutors wrote it for this price.</li>
          <li>Do not fake progress. XP is capped per day on purpose (300) and the server, not the browser, does the scoring; an account that
            games the checks loses the badges and keeps the learning it bothered to fake.</li>
        </ul>
      </section>
      <section><H>Certificates</H>
        <p className="mt-2">
          A certificate states that you completed every level of a course with an average of 70 % or more on the knowledge checks and submitted
          the capstone. It is verifiable by its code. We may withdraw a certificate that was issued on work that turns out not to be yours.
        </p>
      </section>
      <section><H>Liability, plainly</H>
        <p className="mt-2">
          This is teaching, not a guarantee of employment or income. Our maximum liability for a course is the fee you paid for it. Nothing here
          limits your rights under Nigerian consumer law, and Nigerian law governs this agreement, in Rivers State.
        </p>
      </section>
      <section><H>Changes</H>
        <p className="mt-2">
          If these terms change in a way that takes something away, we email you 14 days first and keep the old terms for a course you already paid for.
        </p>
      </section>
    </LegalShell>
  )
}
