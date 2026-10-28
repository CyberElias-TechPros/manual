import type { Metadata } from 'next'
import { SearchClient } from './client'
export const metadata: Metadata = { title: 'Search', description: 'Find any lesson, checklist item or mistake across the courses you can open.', robots: { index: false } }
export const dynamic = 'force-dynamic'
export default function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  return <SearchClient initial={searchParams?.q ?? ''} />
}
