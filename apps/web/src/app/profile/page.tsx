import type { Metadata } from 'next'
import { ProfileClient } from './client'
export const metadata: Metadata = { title: 'Progress & badges', robots: { index: false } }
export const dynamic = 'force-dynamic'
export default function ProfilePage() { return <ProfileClient /> }
