import Link from 'next/link'

/**
 * 11.4 — the legal text an app like this must carry, written for a learner rather
 * than for a court, and honest about the two things the README left undecided:
 * refunds (PAYMENT.refundWindowDays) and retention (retentionGraceDays).
 */
export function LegalShell({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-reading px-3 py-8">
      <p className="text-xs uppercase tracking-widest text-ink/55 dark:text-light/55">Cyber Elias Academy</p>
      <h1 className="mt-1 text-3xl font-bold">{title}</h1>
      <p className="mt-1 text-sm text-ink/60 dark:text-light/60">Last updated {updated}. Written to be read — headings say what each part decides.</p>
      <div className="cea-prose mt-6 space-y-6">{children}</div>
      <p className="mt-8 border-t border-surface-line pt-4 text-sm text-ink/60 dark:border-surface-dark-line dark:text-light/60">
        Questions? <a href="mailto:hello@cea.ng" className="underline">hello@cea.ng</a> or 24/26 Ebony Road, Off Rumuola Road, Port Harcourt.
        See also <Link href={title.toLowerCase().includes('privacy') ? '/terms' : '/privacy'} className="font-medium underline">the {title.toLowerCase().includes('privacy') ? 'terms' : 'privacy notice'}</Link>.
      </p>
    </main>
  )
}

export function H({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>
}
