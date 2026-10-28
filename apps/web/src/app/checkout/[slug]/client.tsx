'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button, Card, Chip, ProgressBar, StatBlock, cx, mutate, request, useApi, useSession } from '@cea/ui'
import { PAYMENT, formatNgn } from '@cea/config'

type Options = {
  feeNgn: number
  bank: { accountName: string; accountNumber: string; bank: string; slaHours: number }
  course: { slug: string; title: string; sessionsCount: number; certificate?: boolean }
  access: { enrolled: boolean; paymentStatus: string | null }
  proofLimits: { maxBytes: number; types: string[] }
  alreadyEnrolled?: boolean
}
type Mine = { id: string; reference: string; status: string; amount_ngn: number; created_at: string; proof_key?: string | null; reject_reason?: string | null }

export function CheckoutClient({ course, reference }: { course: any; reference: string }) {
  const { user, refresh } = useSession()
  const opts = useApi<Options>(`/api/payments/options?course=${course.slug}`)
  const mine = useApi<{ payments: Mine[] }>(user ? '/api/payments' : null)
  const [state, setState] = useState<'idle' | 'busy' | 'uploading'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [progress, setProgress] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)

  const active: Mine | undefined = (mine.data?.payments ?? []).find(p => p.status === 'pending' || p.status === 'intent') ?? (mine.data?.payments ?? [])[0]
  const ref = active?.reference || reference

  useEffect(() => { if (active?.amount_ngn) setAmount(String(active.amount_ngn)) }, [active])

  const copy = useCallback(async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(label); setTimeout(() => setCopied(null), 2000) } catch { setCopied(null) }
  }, [])

  if (opts.loading) return <Card><p className="text-sm">Loading the payment instructions…</p></Card>
  if (opts.error) return <Card className="text-center"><p className="text-sm">The academy could not be reached ({opts.error.message}).</p><Button size="sm" className="mt-3" onClick={opts.reload}>Retry</Button></Card>
  if (!user) return (
    <Card className="mx-auto max-w-reading text-center">
      <h1 className="text-lg font-semibold">Create the free account first</h1>
      <p className="mt-1 text-sm text-ink/70 dark:text-light/70">A payment reference has to belong to someone, and we need a way to tell you when it is approved.</p>
      <Link href={`/auth/register?next=/checkout/${course.slug}`} className="mt-3 inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white">Create account</Link>
    </Card>
  )

  const data = opts.data!
  if (data.alreadyEnrolled || active?.status === 'approved') {
    return (
      <Card className="border-success/50 bg-success/6 text-center">
        <h1 className="text-lg font-semibold">You already have this course</h1>
        <p className="mt-1 text-sm text-ink/75 dark:text-light/75">{course.displayTitle || course.name} is unlocked. Do not send another transfer — if you did, reply to the approval email and we will sort it out.</p>
        <Link href={`/learn/${course.slug}/1`} className="mt-3 inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white">Start level 1</Link>
      </Card>
    )
  }

  async function startIntent() {
    setState('busy'); setError(null)
    try {
      const r = await request<{ reference: string; amount: number }>('/api/payments/intent', { method: 'POST', body: { course: course.slug } })
      mine.reload(); refresh(); setAmount(String(r.amount ?? data.feeNgn))
    } catch (e: any) { setError(e?.message || 'Could not create a reference.') } finally { setState('idle') }
  }

  async function uploadProof(e: React.FormEvent) {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) { setError('Choose the screenshot or receipt PDF first.'); return }
    if (file.size > data.proofLimits.maxBytes) { setError(`That file is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is ${Math.round(data.proofLimits.maxBytes / 1024 / 1024)} MB so it uploads on a weak signal too.`); return }
    setState('uploading'); setError(null); setProgress(0)
    const form = new FormData()
    form.append('reference', ref)
    if (amount) form.append('amount', amount.replace(/[^0-9]/g, ''))
    if (note.trim()) form.append('note', note.trim())
    form.append('proof', file, file.name)
    try {
      // XHR, not fetch: a phone on 3G needs a real percentage, not a spinner.
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/payments/proof')
        xhr.withCredentials = true
        xhr.upload.onprogress = ev => { if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100)) }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve()
          else { try { reject(new Error(JSON.parse(xhr.responseText).error || 'Upload refused.')) } catch { reject(new Error('Upload refused.')) } }
        }
        xhr.onerror = () => reject(new Error('The upload dropped. Nothing was lost — try again, the reference is still valid.'))
        const csrf = (document.cookie.match(/(?:^|; )cea_csrf=([^;]*)/) || [])[1]
        if (csrf) xhr.setRequestHeader('x-cea-csrf', decodeURIComponent(csrf))
        xhr.send(form)
      })
      setProgress(100)
      mine.reload(); refresh()
      if (fileRef.current) fileRef.current.value = ''
      setNote('')
    } catch (e: any) { setError(e?.message || 'Upload failed.') } finally { setState('idle') }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <header>
        <p className="text-xs uppercase tracking-widest text-ink/55 dark:text-light/55">Checkout</p>
        <h1 className="mt-1 text-2xl font-bold">{course.displayTitle || course.name}</h1>
        <p className="mt-1 text-sm text-ink/70 dark:text-light/70">
          {data.course.sessionsCount} levels{data.course.certificate ? ' · certificate on completion' : ''}. One payment, yours for life.
        </p>
      </header>

      <Card className="border-gold/50 bg-paper dark:bg-surface-dark-muted">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-base font-semibold">Step 1 · transfer {formatNgn(data.feeNgn)}</h2>
          <span className="text-xs text-ink/60 dark:text-light/60">{PAYMENT.bank}</span>
        </div>
        <dl className="mt-3 space-y-2 text-sm">
          <PayRow label="Account name" value={PAYMENT.accountName} onCopy={() => copy(PAYMENT.accountName, 'name')} copied={copied === 'name'} />
          <PayRow label="Account number" value={PAYMENT.accountNumber} mono onCopy={() => copy(PAYMENT.accountNumber, 'number')} copied={copied === 'number'} />
          <PayRow label="Amount" value={formatNgn(data.feeNgn)} onCopy={() => copy(formatNgn(data.feeNgn), 'amount')} copied={copied === 'amount'} />
          <PayRow label="Reference" value={ref || '—'} mono hint="Put this in the narration/description field of the transfer." />
        </dl>
        {!ref && <Button size="sm" className="mt-3" onClick={startIntent} loading={state === 'busy'}>Create my reference</Button>}
        <p className="mt-3 text-xs text-ink/65 dark:text-light/65">
          The reference is how the accounts team matches your bank line to your account, so please do not invent one.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-semibold">Step 2 · send us the receipt</h2>
        <p className="mt-1 text-sm text-ink/70 dark:text-light/70">A screenshot of the transfer, or the bank’s receipt PDF. {Math.round(data.proofLimits.maxBytes / 1024 / 1024)} MB max · PNG, JPG, WebP or PDF.</p>
        {active?.status === 'pending' && active?.proof_key ? (
          <div className="mt-3 rounded-card bg-warn/10 p-3 text-sm">
            <div className="flex items-center gap-2"><Chip tone="warn">awaiting approval</Chip><span className="font-mono text-xs">{active.reference}</span></div>
            <p className="mt-1.5 text-ink/75 dark:text-light/75">Received. An admin approves receipts within {PAYMENT.slaHours}h; your levels open the moment it happens and we email you.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => mine.reload()}>Check status</Button>
              {ref && <a className="inline-flex min-h-[36px] items-center rounded-pill px-3 text-sm underline" href={`/api/uploads/${active.proof_key}`}>view my receipt</a>}
            </div>
          </div>
        ) : (
          <form onSubmit={uploadProof} className="mt-3 space-y-3">
            <div>
              <label htmlFor="proof" className="block text-sm font-medium">Receipt file</label>
              <input id="proof" ref={fileRef} type="file" accept={data.proofLimits.types.join(',')}
                className="mt-1 block w-full rounded-card border border-surface-line bg-surface p-2 text-sm file:mr-3 file:rounded-pill file:border-0 file:bg-navy file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white dark:border-surface-dark-line dark:bg-surface-dark dark:file:bg-sky dark:file:text-deep" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium">Amount you sent (₦)</label>
                <input id="amount" inputMode="numeric" value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                  className="mt-1 min-h-[44px] w-full rounded-card border border-surface-line bg-surface px-3 tabular-nums dark:border-surface-dark-line dark:bg-surface-dark" />
              </div>
              <div>
                <label htmlFor="note" className="block text-sm font-medium">Note for the accounts team (optional)</label>
                <input id="note" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. transferred from Opay at 20:14"
                  className="mt-1 min-h-[44px] w-full rounded-card border border-surface-line bg-surface px-3 dark:border-surface-dark-line dark:bg-surface-dark" />
              </div>
            </div>
            {state === 'uploading' && <ProgressBar value={progress} label={`uploading ${progress}%`} />}
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" loading={state === 'uploading'} disabled={!ref}>Send receipt</Button>
              {!ref && <span className="text-xs text-warn">Create the reference first.</span>}
            </div>
            {error && <p role="alert" className="rounded-card bg-error/10 p-2 text-sm text-error">{error}</p>}
          </form>
        )}
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatBlock label="Status" value={active?.status ?? 'not started'} tone={active?.status === 'approved' ? 'success' : active?.status === 'rejected' ? 'error' : undefined} />
        <StatBlock label="Fee" value={formatNgn(data.feeNgn)} hint="one-off, no renewal" />
        <StatBlock label="Includes" value={`${data.course.sessionsCount} levels`} hint={data.course.certificate ? '+ certificate' : 'no certificate'} />
      </div>

      <Card className="text-sm">
        <h2 className="font-semibold">Refunds, in plain words</h2>
        <p className="mt-1 text-ink/75 dark:text-light/75">
          {PAYMENT.refundWindowDays} days from approval, as long as you have not opened level 3 — that is the line where the course has clearly
          been used. Write to hello@cea.ng with your reference. The first level stays free either way, so you never have to guess
          whether the teaching suits you.
        </p>
        <p className="mt-2 text-xs text-ink/60 dark:text-light/60">Full terms: <Link href="/terms" className="underline">/terms</Link>.</p>
      </Card>
    </div>
  )
}

function PayRow({ label, value, mono, hint, onCopy, copied }: { label: string; value: string; mono?: boolean; hint?: string; onCopy?: () => void; copied?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-surface-line pb-2 last:border-0 dark:border-surface-dark-line">
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wide text-ink/55 dark:text-light/55">{label}</dt>
        <dd className={cx('truncate text-[15px] font-semibold', mono && 'font-mono text-[15px]')}>{value}</dd>
        {hint && <p className="text-xs text-ink/60 dark:text-light/60">{hint}</p>}
      </div>
      {onCopy && <button type="button" onClick={onCopy} className="min-h-[34px] rounded-pill border border-surface-line px-2.5 text-xs font-medium hover:bg-surface-muted dark:border-surface-dark-line">{copied ? 'copied ✓' : 'copy'}</button>}
    </div>
  )
}
