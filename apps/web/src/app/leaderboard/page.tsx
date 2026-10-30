import type { Metadata } from 'next'
import { LeaderboardClient } from './client'
export const metadata: Metadata = { title: 'Leaderboard', description: 'This week, by course and globally. Opt-in, because ranking yourself against strangers should be your choice.', robots: { index: false } }
export const dynamic = 'force-dynamic'
export default function LeaderboardPage({ searchParams }: { searchParams?: { course?: string; period?: string } }) {
  return <LeaderboardClient course={searchParams?.course ?? ''} period={searchParams?.period === 'alltime' ? 'alltime' : 'week'} />
}
