'use client'
import { useEffect } from 'react'
import { SessionProvider, ThemeProvider } from '@cea/ui'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}

/** 10.4 — the PWA shell: cached pages, cached level, queued writes. */
export function RegisterServiceWorker() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') return
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      /* a failed registration must never break a lesson */
    })
  }, [])
  return null
}
