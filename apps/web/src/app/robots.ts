import type { MetadataRoute } from 'next'

/**
 * 9.6 — one rule matters more than the rest here: never spend a crawl on a page that answers
 * 401/402/403 (`/learn/*` beyond the free level, `/dashboard`, `/checkout/*`, `/settings`),
 * and never expose `/admin`. The free level of each course is allowed, because that is the
 * page a search visitor can actually read and the top of the funnel.
 */
export default function robots(): MetadataRoute.Robots {
  const base = (process.env.NEXT_PUBLIC_URL || 'https://learn.cea.ng').replace(/\/$/, '')
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/dashboard', '/profile', '/settings', '/checkout', '/certificate/', '/search?', '/auth/'],
      },
      // An ad crawl of a paid lesson is a wasted crawl and a privacy leak of the URL shape.
      { userAgent: 'adsbot-google', disallow: ['/admin', '/api/', '/learn/'] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
