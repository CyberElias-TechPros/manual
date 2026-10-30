import type { Metadata } from 'next'
import { AuthForm } from '../form'
export const metadata: Metadata = { title: 'Reset your password', robots: { index: false } }
export const dynamic = 'force-dynamic'
export default function ForgotPage() { return <AuthForm mode="forgot" /> }
