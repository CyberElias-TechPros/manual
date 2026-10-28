import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CertificateSheet } from './sheet'

export const dynamic = 'force-dynamic'

/**
 * 8.3 — the printable certificate. Deliberately a client fetch against the public
 * verify endpoint rather than a database read: the sheet must work from a shared
 * link an employer opens, with no session, and the verify route is already the
 * authority on what may be shown about a code.
 */
export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  const code = clean(params.code)
  return {
    title: code ? `Certificate ${code} · Cyber Elias Academy` : 'Certificate',
    description: 'Cyber Elias Academy certificate of completion — verifiable by its code.',
    robots: { index: false, follow: false, noarchive: true },
  }
}

function clean(raw: string | undefined | string[]) {
  const v = Array.isArray(raw) ? raw[0] : raw
  return (v || '').trim().toUpperCase().replace(/[^A-Z0-9-]/g, '')
}

export default function CertificatePage({ params }: { params: { code: string } }) {
  const code = clean(params.code)
  if (!code || code.length < 6) notFound()
  return <CertificateSheet code={code} />
}
