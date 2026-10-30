import type { ReactNode } from 'react'
export const metadata = { title: 'Admin · CEA Learn', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

/**
 * 7.9/7.10 — the back office. Nothing here is a separate app: it is the same API,
 * the same session cookie, the same route handler. Every call below is enforced
 * server-side by `requireAdmin`; the client-side gate in <AdminGate/> is only to
 * avoid showing a broken table to a learner who guessed the URL.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-course space-y-4 py-4">{children}</div>
}
