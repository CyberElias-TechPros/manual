'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button, Card, Label, Pill, ProgressBar, StatBlock, cx, mutate, request, useApi, useSession } from '@cea/ui'
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

  // The title is in the server HTML on purpose. The transfer details arrive a moment later, but a
  // page whose first paint has no heading at all reads as broken on a slow phone and gives a
  // screen-reader user nothing to announce.
  const head = (
    <header>
      <Label>Checkout</Label>
      <h1 className="mt-1.5 text-2xl font-semibold tracking-snugish text-ink dark:text-light">{course.displayTitle || course.name}</h1>
    </header>
  )

  if (opts.loading) return (
    <div className="mx-auto max-w-reading pb-8">
      {head}
      <p className="mt-4 text-[0.9375rem] text-ink-500 dark:text-light/55" role="status">Loading the payment instructions…</p>
    </div>
  )
  if (opts.error) return (
    <div className="mx-auto max-w-reading pb-8">
      {head}
      <p className="mt-4 text-[0.9375rem] text-ink-600 dark:text-light/70">The academy could not be reached ({opts.error.message}). <button className="font-medium text-navy underline underline-offset-2 dark:text-sky" onClick={opts.reload}>Retry</button></p>
    </div>
  )
  if (!user) return (
    <div className="mx-auto max-w-measure py-10 text-center">
      <h1 className="text-xl font-semibold text-ink dark:text-light">Create the free account first</h1>
      <p className="mx-auto mt-2 max-w-measure text-[0.9375rem] leading-relaxed text-ink-500 dark:text-light/60">A payment reference has to belong to someone, and we need a way to tell you when it is approved.</p>
      <Link href={`/auth/register?next=/checkout/${course.slug}`} className="mt-5 inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white">Create account</Link>
    </div>
  )

  const data = opts.data!
  if (data.alreadyEnrolled || active?.status === 'approved') {
    return (
      <div className="mx-auto max-w-measure py-10 text-center">
        <h1 className="text-xl font-semibold text-ink dark:text-light">You already have this course</h1>
        <p className="mx-auto mt-2 max-w-measure text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/70">{course.displayTitle || course.name} is unlocked. Do not send another transfer — if you did, reply to the approval email and we will sort it out.</p>
        <Link href={`/learn/${course.slug}/1`} className="mt-5 inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white">Start level 1</Link>
      </div>
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
    <div className="mx-auto max-w-reading pb-8">
      <header>
        <Label>Checkout</Label>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-snugish text-ink dark:text-light">{course.displayTitle || course.name}</h1>
        <p className="mt-2.5 text-[0.9375rem] text-ink-500 dark:text-light/55">
          {data.course.sessionsCount} levels{data.course.certificate ? ' · certificate on completion' : ''}. One payment, yours for life.
        </p>
      </header>

      <Card variant="ring" className="mt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-base font-medium text-ink dark:text-light">1 · Transfer {formatNgn(data.feeNgn)}</h2>
          <span className="text-[0.8125rem] text-ink-500 dark:text-light/55">{PAYMENT.bank}</span>
        </div>
        <dl className="mt-4 space-y-1 text-[0.9375rem]">
          <PayRow label="Account name" value={PAYMENT.accountName} onCopy={() => copy(PAYMENT.accountName, 'name')} copied={copied === 'name'} />
          <PayRow label="Account number" value={PAYMENT.accountNumber} mono onCopy={() => copy(PAYMENT.accountNumber, 'number')} copied={copied === 'number'} />
          <PayRow label="Amount" value={formatNgn(data.feeNgn)} onCopy={() => copy(formatNgn(data.feeNgn), 'amount')} copied={copied === 'amount'} />
          <PayRow label="Reference" value={ref || '—'} mono hint="Put this in the narration/description field of the transfer." />
        </dl>
        {!ref && <Button size="sm" className="mt-3" onClick={startIntent} loading={state === 'busy'}>Create my reference</Button>}
        <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-500 dark:text-light/55">
          The reference is how the accounts team matches your bank line to your account, so please do not invent one.
        </p>
      </Card>

      <Card variant="ring" className="mt-6">
        <h2 className="text-base font-medium text-ink dark:text-light">2 · Send us the receipt</h2>
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-500 dark:text-light/60">A screenshot of the transfer, or the bank’s receipt PDF. {Math.round(data.proofLimits.maxBytes / 1024 / 1024)} MB max · PNG, JPG, WebP or PDF.</p>
        {active?.status === 'pending' && active?.proof_key ? (
          <div className="mt-4 rounded-card bg-surface-muted p-4 dark:bg-surface-dark-muted">
            <div className="flex items-center gap-2.5"><Pill tone="warn">awaiting approval</Pill><span className="font-mono text-[0.8125rem] text-ink-500">{active.reference}</span></div>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/70">Received. An admin approves receipts within {PAYMENT.slaHours}h; your levels open the moment it happens and we email you.</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => mine.reload()}>Check status</Button>
              {ref && <a className="inline-flex min-h-[36px] items-center text-[0.875rem] text-navy underline underline-offset-2 dark:text-sky" href={`/api/uploads/${active.proof_key}`}>view my receipt</a>}
            </div>
          </div>
        ) : (
          <form onSubmit={uploadProof} className="mt-4 space-y-4">
            <div>
              <label htmlFor="proof" className="block text-[0.9375rem] font-medium text-ink dark:text-light">Receipt file</label>
              <input id="proof" ref={fileRef} type="file" accept={data.proofLimits.types.join(',')}
                className="mt-1.5 block w-full rounded-card border border-surface-line bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink outline-none transition-colors focus:border-navy file:mr-3 file:border-0 file:bg-transparent file:p-0 file:text-[0.9375rem] file:font-medium file:text-navy file:underline file:underline-offset-2 dark:border-surface-dark-line dark:bg-surface-dark dark:text-light dark:file:text-sky dark:focus:border-sky" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="amount" className="block text-[0.9375rem] font-medium text-ink dark:text-light">Amount you sent (₦)</label>
                <input id="amount" inputMode="numeric" value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                  className="mt-1.5 min-h-[46px] w-full rounded-card border border-surface-line bg-surface px-3.5 tabular-nums text-ink outline-none transition-colors focus:border-navy dark:border-surface-dark-line dark:bg-surface-dark dark:text-light dark:focus:border-sky" />
              </div>
              <div>
                <label htmlFor="note" className="block text-[0.9375rem] font-medium text-ink dark:text-light">Note for the accounts team (optional)</label>
                <input id="note" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. transferred from Opay at 20:14"
                  className="mt-1.5 min-h-[46px] w-full rounded-card border border-surface-line bg-surface px-3.5 text-ink outline-none transition-colors placeholder:text-ink-400 focus:border-navy dark:border-surface-dark-line dark:bg-surface-dark dark:text-light dark:placeholder:text-light/40 dark:focus:border-sky" />
              </div>
            </div>
            {state === 'uploading' && <ProgressBar value={progress} label={`uploading ${progress}%`} />}
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" loading={state === 'uploading'} disabled={!ref}>Send receipt</Button>
              {!ref && <span className="text-[0.8125rem] text-warn">Create the reference in step 1 first.</span>}
            </div>
            {error && <p role="alert" className="rounded-card bg-error/8 px-4 py-3 text-[0.9375rem] leading-relaxed text-error">{error}</p>}
          </form>
        )}
      </Card>

      <div className="mt-8 grid grid-cols-3 gap-x-6 border-y border-surface-line py-5 dark:border-surface-dark-line">
        <StatBlock label="Status" value={active?.status ?? 'not started'} tone={active?.status === 'approved' ? 'success' : active?.status === 'rejected' ? 'error' : undefined} />
        <StatBlock label="Fee" value={formatNgn(data.feeNgn)} hint="one-off, no renewal" />
        <StatBlock label="Includes" value={`${data.course.sessionsCount} levels`} hint={data.course.certificate ? '+ certificate' : 'no certificate'} />
      </div>

      <section className="mt-8">
        <h2 className="text-base font-medium text-ink dark:text-light">Refunds, in plain words</h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/70">
          {PAYMENT.refundWindowDays} days from approval, as long as you have not opened level 3 — that is the line where the course has clearly
          been used. Write to hello@cea.ng with your reference. The first level stays free either way, so you never have to guess
          whether the teaching suits you.
        </p>
        <p className="mt-3 text-[0.8125rem] text-ink-500 dark:text-light/55">Full terms: <Link href="/terms" className="text-navy underline underline-offset-2 dark:text-sky">Terms of use</Link>.</p>
      </section>
    </div>
  )
}

function PayRow({ label, value, mono, hint, onCopy, copied }: { label: string; value: string; mono?: boolean; hint?: string; onCopy?: () => void; copied?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-surface-line py-2.5 last:border-0 dark:border-surface-dark-line">
      <div className="min-w-0">
        <dt className="text-[0.8125rem] text-ink-500 dark:text-light/55">{label}</dt>
        <dd className={cx('truncate text-[0.9375rem] font-medium text-ink dark:text-light', mono && 'font-mono')}>{value}</dd>
        {hint && <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-ink-500 dark:text-light/50">{hint}</p>}
      </div>
      {onCopy && <button type="button" onClick={onCopy} className="min-h-[36px] px-1 text-[0.8125rem] font-medium text-navy underline underline-offset-2 hover:text-ink dark:text-sky dark:hover:text-light">{copied ? 'copied ✓' : 'copy'}</button>}
    </div>
  )
}
