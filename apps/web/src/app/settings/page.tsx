import type { Metadata } from 'next'
import { SettingsClient } from './client'
export const metadata: Metadata = { title: 'Settings', robots: { index: false } }
export const dynamic = 'force-dynamic'
export default function SettingsPage() { return <SettingsClient /> }
