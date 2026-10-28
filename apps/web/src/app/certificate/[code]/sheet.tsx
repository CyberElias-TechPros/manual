'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Cert = {
  valid: boolean
  code: string
  learnerName: string
  course: string
  issuedAt: string
  grade: string
  sessionsCompleted: number
  avgQuizPct: number
}

export function CertificateSheet({ code }: { code: string }) {
  const [cert, setCert] = useState<Cert | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading')

  useEffect(() => {
    const ac = new AbortController()
    fetch(`/api/certificates/verify?code=${encodeURIComponent(code)}`, { signal: ac.signal, credentials: 'same-origin' })
      .then(async r => (r.status === 404 ? setState('missing') : r.ok ? (setCert(await r.json()), setState('ready')) : setState('error')))
      .catch(e => { if (e?.name !== 'AbortError') setState('error') })
    return () => ac.abort()
  }, [code])

  if (state === 'loading') return <div className="mx-auto max-w-[52rem] px-3 py-10 text-center text-sm text-ink/60 dark:text-light/60">Checking the register…</div>
  if (state !== 'ready' || !cert) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-reading flex-col items-center justify-center gap-3 px-3 text-center">
        <h1 className="text-xl font-bold">{state === 'missing' ? 'That code is not in the register' : 'The register is unreachable'}</h1>
        <p className="text-sm text-ink/70 dark:text-light/70">
          {state === 'missing'
            ? <>Nothing was issued for <span className="font-mono">{code}</span>. Codes are printed in one block on the certificate — no spaces. A code typed from a screenshot of an older certificate will not match either, because the academy re-issues them.</>
            : 'The verifier did not answer. This is us, not you — try again in a moment.'}
        </p>
        <div className="mt-1 flex flex-wrap justify-center gap-2">
          <Link href="/certificates/verify" className="inline-flex min-h-[44px] items-center rounded-card bg-navy px-4 text-sm font-medium text-white">Use the verifier</Link>
          {state === 'error' && <button type="button" onClick={() => location.reload()} className="inline-flex min-h-[44px] items-center rounded-card border border-surface-line px-4 text-sm font-medium dark:border-surface-dark-line">Retry</button>}
        </div>
      </main>
    )
  }

  return (
    <div className="mx-auto max-w-[56rem] px-3 py-6">
      <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink/70 dark:text-light/70">
          <span className="font-medium text-success">Verified</span> · issued {new Date(cert.issuedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => window.print()} className="inline-flex min-h-[40px] items-center rounded-card bg-navy px-4 text-sm font-medium text-white">Print or save as PDF</button>
          <Link href="/certificates" className="inline-flex min-h-[40px] items-center rounded-card border border-surface-line px-4 text-sm font-medium dark:border-surface-dark-line">My certificates</Link>
        </div>
      </div>

      <article className="cea-print-sheet mx-auto aspect-[1.414/1] rounded-card border-[6px] border-double border-navy bg-white p-[6%] text-[#1a365d] shadow-elev dark:bg-white" aria-label="Certificate of completion">
        <header className="flex items-start justify-between gap-4">
          <span aria-hidden className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-navy text-2xl font-black text-gold">C</span>
          <div className="text-right text-[11px] uppercase tracking-[0.18em]">
            <p className="font-semibold">Cyber Elias Academy</p>
            <p>24/26 Ebony Road, Rumigama</p>
            <p>Port Harcourt · cea.ng</p>
          </div>
        </header>
        <div className="mt-[8%] text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#2c5282]">Certificate of Completion</p>
          <p className="mt-[6%] text-[13px]">This certifies that</p>
          <h1 className="mt-2 text-[clamp(1.6rem,4.4vw,2.9rem)] font-bold leading-tight">{cert.learnerName}</h1>
          <p className="mt-[5%] text-[13px]">has completed every level, knowledge check and capstone of</p>
          <h2 className="mt-1 text-[clamp(1.1rem,2.6vw,1.7rem)] font-semibold">{cert.course}</h2>
          <p className="mt-[5%] text-[13px]">
            with a final grade of <strong>{cert.grade}</strong> · {cert.sessionsCompleted} levels · average assessment {cert.avgQuizPct}%
          </p>
        </div>
        <footer className="mt-[7%] flex items-end justify-between gap-6 text-[11px]">
          <div className="flex-1 border-t border-[#1a365d] pt-1.5 text-center">Lead Instructor</div>
          <div className="flex-1 border-t border-[#1a365d] pt-1.5 text-center">Programme Director</div>
          <div className="text-center">
            <p className="font-mono">{cert.code}</p>
            <p className="mt-0.5">cea.ng/certificates/verify</p>
          </div>
        </footer>
      </article>

      <p className="no-print mt-4 text-xs text-ink/60 dark:text-light/60">
        Print → “Save as PDF” for a copy to attach to an application. Anyone can confirm this document at
        <Link href={`/certificates/verify?code=${cert.code}`} className="underline"> /certificates/verify</Link> using the code at the bottom right —
        it shows the name, course, grade and date, and nothing else.
      </p>
    </div>
  )
}
