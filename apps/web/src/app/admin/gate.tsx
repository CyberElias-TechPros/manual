'use client'
import Link from 'next/link'
import { Card, useSession } from '@cea/ui'
import type { ReactNode } from 'react'

export function AdminGate({ children }: { children: ReactNode }) {
  const { user, loading } = useSession()
  if (loading) return <p className="text-sm text-ink/60 dark:text-light/60">Checking your role…</p>
  if (user?.role === 'admin') return <>{children}</>
  return (
    <Card className="mx-auto max-w-reading text-center">
      <h1 className="text-lg font-semibold">Staff only</h1>
      <p className="mt-1 text-sm text-ink/70 dark:text-light/70">
        {user ? `Signed in as ${user.email}, which is a learner account. The API refuses these routes for non-admins — this page is only the polite version of that.` : 'Sign in with a staff account to see approvals and KPIs.'}
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {!user && <Link href="/auth/login?next=/admin" className="inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white">Staff sign in</Link>}
        <Link href="/dashboard" className="inline-flex min-h-[44px] items-center rounded-pill border border-surface-line px-4 text-sm font-medium dark:border-surface-dark-line">Back to my learning</Link>
      </div>
    </Card>
  )
}
