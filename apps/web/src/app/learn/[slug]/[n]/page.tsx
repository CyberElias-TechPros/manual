import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { findCourse, sessionAt } from '@/lib/content'
import { LessonView } from './lesson'
import { LessonSkeleton } from './skeleton'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string; n: string } }): Promise<Metadata> {
  const c = findCourse(params.slug)
  if (!c) return { title: 'Level not found' }
  const n = Number(params.n) || 1
  return {
    title: `Level ${n} — ${c.displayTitle || c.name}`,
    description: `Level ${n} of ${c.sessionsCount} in ${c.displayTitle || c.name} at Cyber Elias Academy.`,
    robots: { index: n === 1, follow: true },
  }
}

export default function LearnPage({ params }: { params: { slug: string; n: string } }) {
  const c = findCourse(params.slug)
  if (!c) notFound()
  const n = Math.max(1, Number(params.n) || 1)
  if (n > (c.sessionsCount || 12)) notFound()
  /*
   * 10.2/4.5 — the first free level is inlined from the content bundle, so a learner
   * on a metered 3G link gets the lesson itself in the first HTML response: no API
   * round trip in front of the reading, and the page still means something with JS
   * off. Paid levels are *not* inlined: whether you may read them is a database
   * question, so their text only ever leaves through /api, where access is enforced
   * (7.5) and an intermediary cannot cache a leak.
   */
  const hit = sessionAt(c.slug, n)
  const seed = hit && hit.session.isFree ? { course: hit.course, session: hit.session, progress: null } : undefined
  return (
    <Suspense fallback={<LessonSkeleton course={c.displayTitle || c.name} n={n} />}>
      <LessonView slug={c.slug} n={n} seed={seed} />
    </Suspense>
  )
}
