import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findCourse } from '@/lib/content'
import { AdSlot } from '@cea/ui'
import { CourseSyllabus } from '../client'

export const metadata: Metadata = { title: 'Level map', robots: { index: false } }

/** 4.4 — the map gets its own URL so a study group can share one level ("see you at 07"). */
export default function MapPage({ params }: { params: { slug: string } }) {
  const c = findCourse(params.slug)
  if (!c) notFound()
  return (
    <div className="space-y-4">
      <header>
        <p className="text-[0.8125rem] text-ink-500 dark:text-light/55">Level map</p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-snugish text-ink dark:text-light">{c.displayTitle || c.name}</h1>
        <a href={`/courses/${c.slug}`} className="mt-2 inline-block text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">← Course details</a>
      </header>
      <AdSlot placement="map-side" variant="card" />
      <CourseSyllabus slug={c.slug} />
    </div>
  )
}
