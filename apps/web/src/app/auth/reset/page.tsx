import type { Metadata } from 'next'
import { AuthForm } from '../form'
export const metadata: Metadata = { title: 'Choose a new password', robots: { index: false } }
export const dynamic = 'force-dynamic'
export default function ResetPage({ searchParams }: { searchParams?: { token?: string } }) {
  return <AuthForm mode="reset" token={searchParams?.token ?? ''} />
}
