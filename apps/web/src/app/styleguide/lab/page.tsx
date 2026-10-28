import { notFound } from 'next/navigation'
import { LabClient } from './lab'
export const dynamic = 'force-dynamic'
/** 1.6 — a contributor tool. Not indexed, and closed in production unless explicitly opened. */
export default function LabPage() {
  if (process.env.NODE_ENV === 'production' && process.env.CEA_ALLOW_LAB !== '1') notFound()
  return <LabClient />
}
