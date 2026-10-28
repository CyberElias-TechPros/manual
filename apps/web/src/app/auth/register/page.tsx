import type { Metadata } from 'next'
import { AuthForm } from '../form'
export const metadata: Metadata = { title: 'Create your free account', description: 'Track XP, keep a streak, and unlock the offline PWA. Free forever for level 1 of every course.', robots: { index: true } }
export const dynamic = 'force-dynamic'
export default function RegisterPage({ searchParams }: { searchParams?: { next?: string; course?: string; reason?: string } }) {
  return (
    <AuthForm
      mode="register"
      next={searchParams?.next}
      course={searchParams?.course}
      intro={
        searchParams?.reason === 'upgrade'
          ? { tone: 'info', text: 'You have progress on a guest pass. Register with this device’s email and we move everything across — nothing is re-typed.' }
          : undefined
      }
    />
  )
}
