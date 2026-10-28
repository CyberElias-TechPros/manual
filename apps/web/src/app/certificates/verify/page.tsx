import type { Metadata } from 'next'
import { VerifyClient } from '../client-verify'
export const metadata: Metadata = { title: 'Verify a certificate', description: 'Check a Cyber Elias Academy certificate code.', robots: { index: true } }
export const dynamic = 'force-dynamic'
export default function VerifyPage({ searchParams }: { searchParams?: { code?: string } }) {
  return <VerifyClient initial={searchParams?.code ?? ''} />
}
