import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findCourse } from '@/lib/content'
import { CheckoutClient } from './client'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Checkout', robots: { index: false } }

/**
 * 7.1 — there is no gateway in v1 (by decision, not omission): naira transfers to
 * the academy’s Moniepoint account, a receipt upload, and a human approval. That is
 * how CEA is paid today, it needs no PCI scope, and it works on a phone with no card.
 */
export default function CheckoutPage({ params, searchParams }: { params: { slug: string }; searchParams?: { ref?: string } }) {
  const c = findCourse(params.slug)
  if (!c) notFound()
  return <CheckoutClient course={c} reference={searchParams?.ref ?? ''} />
}
