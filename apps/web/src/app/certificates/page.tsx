import type { Metadata } from 'next'
import { CertificatesClient } from './client'
export const metadata: Metadata = { title: 'Certificates', description: 'Printable certificates for finished Cyber Elias Academy courses, each with a code an employer can verify.', robots: { index: false } }
export const dynamic = 'force-dynamic'
export default function CertificatesPage() { return <CertificatesClient /> }
