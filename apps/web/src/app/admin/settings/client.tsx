'use client'
import { useEffect, useState } from 'react'
import { Button, Card, Chip, cx, request, useApi } from '@cea/ui'
import { PAYMENT, formatNgn } from '@cea/config'

/**
 * 7.7/7.12 — pricing, ads, announcements and codes, the four things that change
 * without a deploy. Fees are per course and override the shipped defaults; clearing
 * a field puts the course back on the default.
 */
export function SettingsAdminClient() {
  const data = useApi<{
    settings: Record<string, any>
    pricing: { course: string; feeNgn: number; updatedAt: string }[]
    defaults: { fees: Record<string, number>; access: any; ads: any; streak: any }
    courses: { slug: string; title: string; feeNgn: number | null; sessions: number }[]
    accessCodes: { code: string; course: string; kind: string; max_uses: number; used_count?: number; note: string | null; expires_at: string | null }[]
  }>('/api/admin/settings')
  const [draft, setDraft] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState<string | null>(null)
  const [note, setNote] = useState<{ tone: 'ok' | 'bad'; text: string } | null>(null)
  const [codeCourse, setCodeCourse] = useState('')
  const [codeUses, setCodeUses] = useState('1')
  const [codeNote, setCodeNote] = useState('')
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if (!data.data) return
    setDraft(Object.fromEntries(data.data.courses.map(c => [c.slug, String(overrideFor(data.data!, c.slug) ?? '')])))
    setAnnouncement(data.data.settings?.announcement?.text ?? '')
  }, [data.data])

  if (data.loading) return <p className="text-sm">Loading settings…</p>
  if (data.error) return <Card><p className="text-sm text-error">{data.error.message}</p></Card>
  const d = data.data!

  async function savePricing() {
    const pricing: Record<string, number> = {}
    for (const [slug, v] of Object.entries(draft)) {
      const trimmed = v.trim()
      if (trimmed === '') continue
      const n = Number(trimmed.replace(/[^0-9]/g, ''))
      if (!Number.isFinite(n) || n <= 0) { setNote({ tone: 'bad', text: `${slug}: “${v}” is not a naira amount.` }); return }
      pricing[slug] = n
    }
    setBusy('pricing'); setNote(null)
    try { await request('/api/admin/settings', { method: 'PATCH', body: { pricing } }); setNote({ tone: 'ok', text: 'Fees saved. They apply to new checkouts immediately.' }); data.reload() }
    catch (e: any) { setNote({ tone: 'bad', text: e?.message || 'Save failed.' }) } finally { setBusy(null) }
  }

  async function patch(body: Record<string, unknown>, label: string) {
    setBusy(label); setNote(null)
    try { await request('/api/admin/settings', { method: 'PATCH', body }); setNote({ tone: 'ok', text: 'Saved.' }); data.reload() }
    catch (e: any) { setNote({ tone: 'bad', text: e?.message || 'Save failed.' }) } finally { setBusy(null) }
  }

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Fees, ads &amp; codes</h1>
          <p className="mt-0.5 text-sm text-ink/65 dark:text-light/65">Everything here is runtime state in D1 — the code keeps the defaults, the DB keeps the decisions.</p>
        </div>
        <a href="/api/admin/payments.csv" className="inline-flex min-h-[36px] items-center rounded-pill border border-surface-line px-3 text-sm font-medium dark:border-surface-dark-line">Month CSV</a>
      </header>

      {note && <p role="status" className={cx('rounded-card px-3 py-2 text-sm', note.tone === 'ok' ? 'bg-success/10 text-success' : 'bg-error/10 text-error')}>{note.text}</p>}

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold">Course fees</h2>
          <span className="text-xs text-ink/60 dark:text-light/60">blank = use the shipped default ({formatNgn(Object.values(d.defaults.fees)[0] ?? 0)} sample)</span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {d.courses.map(c => {
            const override = overrideFor(d, c.slug)
            return (
              <label key={c.slug} className="text-sm">
                <span className="block truncate text-[13px] font-medium">{c.title}</span>
                <span className="mt-0.5 flex items-center gap-2 text-[11px] text-ink/55 dark:text-light/55">
                  <Chip tone={override != null ? 'gold' : 'muted'}>{override != null ? 'override' : 'default'}</Chip>
                  default {formatNgn(d.defaults.fees[c.slug] ?? c.feeNgn ?? 0)}
                </span>
                <input inputMode="numeric" value={draft[c.slug] ?? ''} onChange={e => setDraft(v => ({ ...v, [c.slug]: e.target.value }))}
                  placeholder={String(d.defaults.fees[c.slug] ?? c.feeNgn ?? '')}
                  className="mt-1 min-h-[40px] w-full rounded-card border border-surface-line bg-surface px-2 font-mono text-sm tabular-nums dark:border-surface-dark-line dark:bg-surface-dark" />
              </label>
            )
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button size="sm" loading={busy === 'pricing'} onClick={savePricing}>Save fees</Button>
          <span className="text-xs text-ink/60 dark:text-light/60">Learners mid-checkout keep the price they were quoted until their reference expires.</span>
        </div>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <h2 className="text-base font-semibold">Ads</h2>
          <p className="mt-1 text-sm text-ink/70 dark:text-light/70">One switch for both networks, plus the per-view cap. Placements are fixed in code and cannot be moved into a quiz from here.</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button size="sm" variant={d.settings?.ads?.enabled === false ? 'outline' : 'primary'} loading={busy === 'ads'}
              onClick={() => patch({ ads: { enabled: !(d.settings?.ads?.enabled ?? true), maxPerView: d.defaults.ads.policy.maxPerView } }, 'ads')}>
              {d.settings?.ads?.enabled === false ? 'Turn ads on' : 'Turn ads off (launch week)'}
            </Button>
            <Chip tone={d.settings?.ads?.enabled === false ? 'muted' : 'success'}>{d.settings?.ads?.enabled === false ? 'off' : 'on'}</Chip>
            <span className="text-xs text-ink/60 dark:text-light/60">max {d.defaults.ads.policy.maxPerView} per page view</span>
          </div>
        </Card>
        <Card>
          <h2 className="text-base font-semibold">Site announcement</h2>
          <p className="mt-1 text-xs text-ink/60 dark:text-light/60">Shown in the top bar for everyone — use it for a maintenance window or a cohort opening. 240 characters.</p>
          <textarea value={announcement} onChange={e => setAnnouncement(e.target.value.slice(0, 240))} rows={3}
            className="mt-2 w-full rounded-card border border-surface-line bg-surface p-2 text-sm dark:border-surface-dark-line dark:bg-surface-dark" />
          <div className="mt-2 flex items-center gap-2">
            <Button size="sm" loading={busy === 'announce'} disabled={!announcement.trim()} onClick={() => patch({ announcement }, 'announce')}>Post it</Button>
            <Button size="sm" variant="ghost" loading={busy === 'announce-off'} onClick={() => patch({ announcement: '' }, 'announce-off')}>Clear</Button>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-base font-semibold">Access codes</h2>
        <p className="mt-1 text-sm text-ink/70 dark:text-light/70">A code grants one course without a payment — for a workshop, a scholarship, or a payment made in the office. Print it on a slip; the learner redeems it at <code>/courses/&lt;slug&gt;</code>.</p>
        <div className="mt-3 flex flex-wrap items-end gap-2">
          <label className="text-sm"><span className="block text-[13px] font-medium">Course</span>
            <select value={codeCourse} onChange={e => setCodeCourse(e.target.value)} className="mt-1 min-h-[40px] rounded-card border border-surface-line bg-surface px-2 text-sm dark:border-surface-dark-line dark:bg-surface-dark">
              <option value="">Choose…</option>
              {d.courses.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
          </label>
          <label className="text-sm"><span className="block text-[13px] font-medium">Uses</span>
            <input value={codeUses} onChange={e => setCodeUses(e.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" className="mt-1 min-h-[40px] w-20 rounded-card border border-surface-line bg-surface px-2 font-mono text-sm dark:border-surface-dark-line dark:bg-surface-dark" />
          </label>
          <label className="text-sm min-w-[10rem] flex-1"><span className="block text-[13px] font-medium">Note</span>
            <input value={codeNote} onChange={e => setCodeNote(e.target.value)} placeholder="Spring cohort · Port Harcourt" className="mt-1 min-h-[40px] w-full rounded-card border border-surface-line bg-surface px-2 text-sm dark:border-surface-dark-line dark:bg-surface-dark" />
          </label>
          <Button size="sm" loading={busy === 'code'} disabled={!codeCourse} onClick={async () => {
            setBusy('code'); setNote(null)
            try {
              const r = await request<{ code: string }>('/api/admin/access-codes', { method: 'POST', body: { course: codeCourse, maxUses: Number(codeUses) || 1, note: codeNote } })
              setNote({ tone: 'ok', text: `Created ${r.code}` }); data.reload(); setCodeNote('')
            } catch (e: any) { setNote({ tone: 'bad', text: e?.message || 'Could not create the code.' }) } finally { setBusy(null) }
          }}>Generate</Button>
        </div>
        {d.accessCodes.length > 0 && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-xs uppercase tracking-wide text-ink/55 dark:text-light/55"><th className="py-1">Code</th><th>Course</th><th>Kind</th><th>Uses</th><th>Expires</th><th>Note</th></tr></thead>
              <tbody>
                {d.accessCodes.map(c => (
                  <tr key={c.code} className="border-t border-surface-line dark:border-surface-dark-line">
                    <td className="py-1.5 font-mono">{c.code}</td>
                    <td className="capitalize">{c.course.replace(/-/g, ' ')}</td>
                    <td>{c.kind}</td>
                    <td className="tabular-nums">{c.used_count ?? 0}/{c.max_uses}</td>
                    <td className="text-xs">{c.expires_at ? new Date(c.expires_at).toLocaleDateString('en-NG') : 'never'}</td>
                    <td className="text-xs text-ink/60 dark:text-light/60">{c.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card className="text-sm">
        <h2 className="font-semibold">Payment rail (read-only)</h2>
        <p className="mt-1 text-ink/75 dark:text-light/75">
          {PAYMENT.accountName} · <span className="font-mono">{PAYMENT.accountNumber}</span> · {PAYMENT.bank} · SLA {PAYMENT.slaHours}h · proof ≤ {Math.round(PAYMENT.proofMaxBytes / 1024 / 1024)} MB ·
          refunds {PAYMENT.refundWindowDays}d while the third level is still closed. These live in <code>@cea/config</code>, not here —
          a fee change is an ops decision, a bank-account change is a security event and belongs in a reviewed commit.
        </p>
      </Card>
    </div>
  )
}

function overrideFor(d: { pricing: { course: string; feeNgn: number }[] }, slug: string) {
  return d.pricing.find(p => p.course === slug)?.feeNgn ?? null
}
