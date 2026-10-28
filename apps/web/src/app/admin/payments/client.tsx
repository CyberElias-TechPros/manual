'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button, Card, Pill, Skeleton, cx, mutate, request, useApi } from '@cea/ui'
import { PAYMENT, formatNgn } from '@cea/config'

type P = {
  id: string; reference: string; status: string; amountNgn: number; course: string
  user: { id: string; name: string; email: string; phone: string | null } | null
  payerName: string | null; note: string | null; proofUrl: string | null; proofMime: string | null; proofSize: number | null
  createdAt: string; reviewedAt: string | null; reviewedBy: string | null; rejectReason: string | null
  intentOnly: boolean; waitingHours: number
}

/**
 * 7.3/7.4 — the approval queue. Deliberately boring and keyboard-friendly: this is the
 * single screen that decides whether somebody can learn today.
 */
export function PaymentsClient() {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending')
  const data = useApi<{ payments: P[] }>(`/api/admin/payments?status=${status}&limit=100`)
  const [open, setOpen] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [amounts, setAmounts] = useState<Record<string, string>>({})
  const [reasons, setReasons] = useState<Record<string, string>>({})

  async function approve(p: P) {
    setBusy(p.id); setErr(null)
    try {
      await request(`/api/admin/payments/${p.id}/approve`, { method: 'POST', body: { amountNgn: amounts[p.id] ? Number(amounts[p.id]) : p.amountNgn } })
      data.reload()
    } catch (e: any) { setErr(e?.message || 'Approval failed.') } finally { setBusy(null) }
  }
  async function reject(p: P) {
    const reason = (reasons[p.id] ?? '').trim()
    if (reason.length < 5) { setErr('A rejection needs a reason the learner can act on (5+ characters).'); return }
    setBusy(p.id); setErr(null)
    try {
      await request(`/api/admin/payments/${p.id}/reject`, { method: 'POST', body: { reason } })
      data.reload()
    } catch (e: any) { setErr(e?.message || 'Rejection failed.') } finally { setBusy(null) }
  }

  const rows = data.data?.payments ?? []
  const stale = rows.filter(r => r.waitingHours > PAYMENT.slaHours && r.status === 'pending')

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-ink dark:text-light">Payment approvals</h1>
          <p className="mt-0.5 text-sm text-ink-500 dark:text-light/65">
            Transfer to <strong>{PAYMENT.accountName}</strong> · {PAYMENT.accountNumber} · {PAYMENT.bank}. Compare the bank app, then approve.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {(['pending', 'approved', 'rejected', 'all'] as const).map(s => (
            <button key={s} type="button" onClick={() => setStatus(s)} aria-pressed={status === s}
              className={cx('min-h-[36px] rounded-card px-3 text-sm font-medium', status === s ? 'bg-navy text-white' : 'border border-surface-line dark:border-surface-dark-line')}>{s}</button>
          ))}
          <a href={`/api/admin/payments.csv?from=${monthStart()}&to=${today()}`} className="inline-flex min-h-[36px] items-center rounded-card border border-surface-line px-3 text-sm font-medium dark:border-surface-dark-line">CSV (approved)</a>
        </div>
      </header>

      {stale.length > 0 && (
        <Card className="border-error/50 bg-error/6">
          <p className="text-sm"><strong>{stale.length}</strong> past the {PAYMENT.slaHours}h promise — oldest {Math.max(...stale.map(s => s.waitingHours))}h. Approve or reject so the learner is not left guessing.</p>
        </Card>
      )}
      {err && <p role="alert" className="rounded-card bg-error/10 px-3 py-2 text-sm text-error">{err}</p>}

      {data.loading ? (
        <div className="space-y-2">{[0, 1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-card" />)}</div>
      ) : rows.length === 0 ? (
        <Card className="text-center"><p className="text-sm">Nothing {status === 'all' ? 'at all' : `marked ${status}`} yet. A new receipt appears here the moment a learner uploads it.</p></Card>
      ) : (
        <ul className="space-y-2">
          {rows.map(p => (
            <li key={p.id}>
              <Card className={cx(p.status === 'pending' && !p.intentOnly && 'border-gold/45')}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-semibold">{p.reference}</span>
                      <Pill tone={p.status === 'approved' ? 'success' : p.status === 'rejected' ? 'error' : p.intentOnly ? 'muted' : 'warn'}>{p.intentOnly ? 'intent only' : p.status}</Pill>
                      <span className="capitalize text-xs text-ink-500 dark:text-light/60">{p.course.replace(/-/g, ' ')}</span>
                    </div>
                    <p className="mt-1 text-sm">
                      <strong>{formatNgn(p.amountNgn)}</strong> · {p.user?.name ?? 'deleted account'} <span className="text-ink-500 dark:text-light/60">{p.user?.email}</span>
                      {p.payerName && p.payerName.toLowerCase() !== (p.user?.name ?? '').toLowerCase() ? <span className="text-warn"> · sender “{p.payerName}”</span> : null}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-500 dark:text-light/60">
                      {new Date(p.createdAt).toLocaleString('en-NG')} · waiting {p.waitingHours}h
                      {p.reviewedAt ? ` · ${p.status} by staff ${new Date(p.reviewedAt).toLocaleDateString('en-NG')}` : ''}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-1.5">
                    {p.proofUrl && <button type="button" onClick={() => setOpen(open === p.id ? null : p.id)} className="min-h-[36px] rounded-card border border-surface-line px-3 text-sm font-medium dark:border-surface-dark-line">{open === p.id ? 'hide receipt' : 'view receipt'}</button>}
                    {p.status === 'pending' && !p.intentOnly && <>
                      <Button size="sm" loading={busy === p.id} onClick={() => approve(p)}>Approve &amp; unlock</Button>
                      <Button size="sm" variant="outline" onClick={() => reject(p)}>Reject</Button>
                    </>}
                  </div>
                </div>

                {p.note && <p className="mt-2 rounded-card bg-surface-muted px-3 py-2 text-sm dark:bg-surface-dark-muted"><span className="text-[0.8125rem] text-ink-500 dark:text-light/55">Learner note</span><br />{p.note}</p>}
                {p.rejectReason && <p className="mt-2 text-sm text-error">Rejection sent: {p.rejectReason}</p>}

                {open === p.id && p.proofUrl && (
                  <div className="mt-3 space-y-2 border-t border-surface-line pt-3 dark:border-surface-dark-line">
                    <img src={p.proofUrl} alt={`Payment receipt for ${p.reference}`} loading="lazy" className="max-h-[26rem] w-full rounded-card object-contain" />
                    <p className="text-xs text-ink-500 dark:text-light/60">{p.proofMime} · {Math.round((p.proofSize ?? 0) / 1024)} KB · <a href={p.proofUrl} className="underline" target="_blank" rel="noreferrer">open full size</a></p>
                    {p.status === 'pending' && (
                      <div className="grid gap-2 sm:grid-cols-2">
                        <label className="text-xs"><span>Amount to record (₦) — fix it if they sent a different figure</span>
                          <input value={amounts[p.id] ?? String(p.amountNgn)} onChange={e => setAmounts(a => ({ ...a, [p.id]: e.target.value.replace(/[^0-9]/g, '') }))}
                            className="mt-1 min-h-[40px] w-full rounded-card border border-surface-line bg-surface px-2 dark:border-surface-dark-line dark:bg-surface-dark" />
                        </label>
                        <label className="text-xs"><span>Reason if rejecting</span>
                          <input value={reasons[p.id] ?? ''} onChange={e => setReasons(a => ({ ...a, [p.id]: e.target.value }))} placeholder="e.g. screenshot shows ₦25,000, course is ₦30,000"
                            className="mt-1 min-h-[40px] w-full rounded-card border border-surface-line bg-surface px-2 dark:border-surface-dark-line dark:bg-surface-dark" />
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}

      <Card className="text-sm">
        <h2 className="font-semibold">What to check before approving</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px] text-ink-700 dark:text-light/80">
          <li>The reference in the bank narration matches exactly (one wrong letter and it is somebody else’s money).</li>
          <li>The amount matches the fee on the course page, or the shortfall is explained.</li>
          <li>The screenshot timestamp is recent and the beneficiary is Delgra Ltd.</li>
          <li>If it is a partial payment for a scholarship, use <Link href="/admin/settings" className="underline">an access code</Link> or grant the enrolment by hand instead — do not approve a fake full amount.</li>
        </ol>
      </Card>
    </div>
  )
}

const today = () => new Date().toISOString().slice(0, 10)
const monthStart = () => `${today().slice(0, 7)}-01`
