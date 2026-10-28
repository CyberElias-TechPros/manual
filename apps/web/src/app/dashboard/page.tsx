import type { Metadata } from 'next'
import Link from 'next/link'
import { DashboardClient } from './client'

export const metadata: Metadata = { title: 'Dashboard', robots: { index: false } }
export const dynamic = 'force-dynamic'

/** The daily landing page: what is due, what is next, what is at risk (5.x). */
export default function DashboardPage() {
  return <DashboardClient />
}
