import type { Metadata } from 'next'
import { AuthForm } from '../form'
export const metadata: Metadata = { title: 'Sign in', robots: { index: false } }
export const dynamic = 'force-dynamic'
export default function LoginPage({ searchParams }: { searchParams?: { next?: string; reason?: string } }) {
  return (
    <AuthForm
      mode="login"
      next={searchParams?.next}
      intro={
        searchParams?.reason === 'session'
          ? { tone: 'warn', text: 'Your session ran out (it lasts 30 days, but signing in elsewhere or clearing cookies ends it). Sign in again and you land exactly where you were.' }
          : undefined
      }
    />
  )
}
