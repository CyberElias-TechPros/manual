import type { Metadata, Viewport } from 'next'
import './globals.css'
import {Providers, RegisterServiceWorker} from './providers'
import { TopBar, BottomNav, OfflineBanner, XpToaster } from '@cea/ui'

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/search', label: 'Search' },
]

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://learn.cea.ng'),
  title: { default: 'CEA Learn — Cyber Elias Academy', template: '%s · CEA Learn' },
  description:
    'Sixteen job-ready courses with quizzes, projects and streaks. Built for Nigerian phones: small pages, offline reading, one free level in every course.',
  applicationName: 'CEA Learn',
  manifest: '/manifest.webmanifest',
  icons: { icon: '/icons/icon-192.png', apple: '/icons/icon-192.png' },
  openGraph: {
    type: 'website', siteName: 'CEA Learn', title: 'CEA Learn — Cyber Elias Academy',
    description: 'Learn a skill, prove it with a project, keep the streak. First level of every course is free.',
    images: [{ url: '/brand/cealogo.png', width: 512, height: 512, alt: 'Cyber Elias Academy' }],
  },
  twitter: { card: 'summary', site: '@cybereliasacad' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f7fafc' }, { media: '(prefers-color-scheme: dark)', color: '#0f1b33' }],
  width: 'device-width', initialScale: 1, viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <body className="min-h-dvh">
        <Providers>
          <a href="#main" className="cea-skip">Skip to content</a>
          <OfflineBanner />
          <TopBar items={NAV} />
          <main id="main" className="mx-auto w-full max-w-course flex-1 px-3 pb-24 pt-4 sm:px-5 lg:pb-10">{children}</main>
          <BottomNav items={[
            { href: '/', label: 'Home', icon: <NavIcon d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" /> },
            { href: '/courses', label: 'Courses', icon: <NavIcon d="M5 5h14v14H5zM9 9h6M9 13h6" /> },
            { href: '/dashboard', label: 'Today', icon: <NavIcon d="M4 19V9m5 10V5m5 14v-7m5 7V8" /> },
            { href: '/profile', label: 'You', icon: <NavIcon d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" /> },
            { href: '/search', label: 'Find', icon: <NavIcon d="m20 20-4.5-4.5M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" /> },
          ]} />
          <XpToaster />
          <RegisterServiceWorker />
        </Providers>
      </body>
    </html>
  )
}

function NavIcon({ d }: { d: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{d.split('M').filter(Boolean).map((seg, i) => <path key={i} d={`M${seg}`} />)}</svg>
}
