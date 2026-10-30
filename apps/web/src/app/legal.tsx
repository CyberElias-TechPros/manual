import Link from 'next/link'

/**
 * 11.4 — the legal text an app like this must carry, written for a learner rather
 * than for a court, and honest about the two things the README left undecided:
 * refunds (PAYMENT.refundWindowDays) and retention (retentionGraceDays).
 */
export function LegalShell({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-reading py-8">
      <p className="text-[0.8125rem] text-ink-500 dark:text-light/55">Cyber Elias Academy</p>
      <h1 className="mt-2.5 text-3xl font-semibold tracking-snugish text-ink dark:text-light">{title}</h1>
      <p className="mt-2.5 text-[0.9375rem] text-ink-500 dark:text-light/60">Last updated {updated}. Written to be read — headings say what each part decides.</p>
      <div className="cea-prose mt-8">{children}</div>
      <p className="mt-10 border-t border-surface-line pt-5 text-[0.9375rem] text-ink-500 dark:border-surface-dark-line dark:text-light/60">
        Questions? <a href="mailto:hello@cea.ng" className="text-navy underline underline-offset-2 dark:text-sky">hello@cea.ng</a> or 24/26 Ebony Road, Off Rumuola Road, Port Harcourt.
        See also <Link href={title.toLowerCase().includes('privacy') ? '/terms' : '/privacy'} className="font-medium text-navy underline underline-offset-2 dark:text-sky">the {title.toLowerCase().includes('privacy') ? 'terms' : 'privacy notice'}</Link>.
      </p>
    </div>
  )
}

export function H({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-ink dark:text-light">{children}</h2>
}
