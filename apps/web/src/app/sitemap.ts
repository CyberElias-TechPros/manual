import type { MetadataRoute } from 'next'
import { courseList } from '@/lib/content'

/**
 * 9.6 — the pages worth indexing are the ones that sell the course: the catalogue, the 16
 * course pages, and level 1 of each (the free lesson a search visitor can actually read).
 * Everything behind a session (`/learn/<paid>`, `/dashboard`, `/checkout`, `/settings`) is
 * excluded here and disallowed in robots.ts, so a crawler never spends a budget on a 402.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_URL || 'https://learn.cea.ng').replace(/\/$/, '')
  const now = new Date()
  const rows: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/courses`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/certificates`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/leaderboard`, lastModified: now, changeFrequency: 'daily', priority: 0.4 },
    { url: `${base}/offline`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
  for (const c of courseList()) {
    rows.push({ url: `${base}/courses/${c.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 })
    rows.push({ url: `${base}/learn/${c.slug}/1`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })
  }
  return rows
}
