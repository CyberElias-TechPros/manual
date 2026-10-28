'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button, Card, Pill } from '@cea/ui'

/** Public verifier: an employer without an account should learn the truth in 10 seconds. */
export function VerifyClient({ initial }: { initial: string }) {
  const [code, setCode] = useState(initial)
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'bad'>('idle')
  const [res, setRes] = useState<any>(null)

  async function check(e?: React.FormEvent) {
    e?.preventDefault()
    const clean = code.trim().toUpperCase()
    if (clean.length < 6) { setState('bad'); setRes({ error: 'Codes are at least 6 characters.' }); return }
    setState('busy')
    try {
      const r = await fetch(`/api/certificates/verify?code=${encodeURIComponent(clean)}`, { credentials: 'same-origin' })
      const json = await r.json()
      if (!r.ok) { setState('bad'); setRes(json) }
      else { setState('ok'); setRes(json) }
    } catch {
      setState('bad')
      setRes({ error: 'The verifier is unreachable — check your connection and try again.' })
    }
  }

  return (
    <div className="mx-auto max-w-reading space-y-4 py-2">
      <header>
        <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink/55 dark:text-light/55">For employers</p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-snugish text-ink dark:text-light">Verify a CEA certificate</h1>
        <p className="mt-1 text-sm text-ink/70 dark:text-light/70">
          Type the code from the bottom right of the certificate. It confirms the learner’s name, the course, the grade and the date — nothing else,
          and it is not stored.
        </p>
      </header>
      <Card>
        <form onSubmit={check} className="flex flex-wrap items-end gap-2">
          <div className="min-w-[12rem] flex-1">
            <label htmlFor="code" className="block text-sm font-medium">Certificate code</label>
            <input id="code" value={code} onChange={e => { setCode(e.target.value.toUpperCase()); setState('idle') }}
              placeholder="CEA-XXXXXX" autoCapitalize="characters" autoComplete="off" spellCheck={false}
              className="mt-1 min-h-[48px] w-full rounded-card border border-surface-line bg-surface px-3 font-mono uppercase dark:border-surface-dark-line dark:bg-surface-dark" />
          </div>
          <Button type="submit" loading={state === 'busy'}>Verify</Button>
        </form>
      </Card>

      {state === 'ok' && res?.valid && (
        <Card className="border-success/55 bg-success/6">
          <div className="flex items-center gap-2"><Pill tone="success">genuine</Pill><span className="font-mono text-sm">{res.code}</span></div>
          <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <Field label="Learner" value={res.learnerName} />
            <Field label="Course" value={res.course} />
            <Field label="Grade" value={res.grade} />
            <Field label="Issued" value={new Date(res.issuedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })} />
            <Field label="Levels completed" value={String(res.sessionsCompleted)} />
            <Field label="Average assessment" value={`${res.avgQuizPct}%`} />
          </dl>
          <p className="mt-3 text-xs text-ink/60 dark:text-light/60">
            Need a signed PDF or a phone call to the academy? Email hello@cea.ng quoting the code.
          </p>
        </Card>
      )}
      {state === 'ok' && !res?.valid && (
        <Card className="border-error/55 bg-error/6">
          <h2 className="text-base font-semibold">No certificate with that code</h2>
          <p className="mt-1 text-sm text-ink/75 dark:text-light/75">Double-check the letters (0 and O are not used) and the dashes. If it still fails, ask the holder for the PDF, or email the code to hello@cea.ng and we will look it up by hand.</p>
        </Card>
      )}
      {state === 'bad' && <p role="alert" className="text-sm text-error">{res?.error || 'That did not work.'}</p>}

      <p className="text-xs text-ink/60 dark:text-light/60">
        Issued by <Link href="/courses" className="underline">CEA Learn courses</Link>. Certificates require every level, a 70% average and the capstone.
      </p>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.8125rem] text-ink/55 dark:text-light/55">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
