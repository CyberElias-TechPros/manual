'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Button, Card, ProgressBar, cx, request, useSession } from '@cea/ui'

type Mode = 'login' | 'register' | 'forgot' | 'reset'

/**
 * 3.x — one form for all four auth states, because the fields overlap and a
 * learner on a phone should not have to re-learn the layout to sign in.
 *
 * Two rules the copy is doing real work for: the server never says whether an
 * email exists (3.8), and a guest pass is merged rather than abandoned (3.5) —
 * so `register` always sends the stored `guestId` when there is one.
 */
export function AuthForm({ mode, next, course, token, intro }: { mode: Mode; next?: string; course?: string; token?: string; intro?: { tone: 'warn' | 'info'; text: string } }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [phone, setPhone] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<{ message: string; code: string; fields?: Record<string, string> } | null>(null)
  const [sent, setSent] = useState(false)
  const [guestId, setGuestId] = useState<string | null>(null)
  const first = useRef<HTMLInputElement>(null)
  const target = safeNext(next)

  useEffect(() => {
    try { setGuestId(JSON.parse(localStorage.getItem('cea:lastLevel') || '{}').guestId ?? null) } catch { /* ignore */ }
    first.current?.focus()
  }, [mode])

  const pwChecks = useMemo(() => {
    const list = [
      { ok: pw.length >= 10, label: '10 characters or more' },
      { ok: /[a-zA-Z]/.test(pw) && /\d/.test(pw), label: 'letters and numbers' },
      { ok: !/(1234|password|qwerty|admin|iloveyou|letmein)/i.test(pw), label: 'not on the breached list' },
      { ok: !/^(.)\1+$/.test(pw) && pw.length > 0, label: 'not one repeated character' },
    ]
    return list
  }, [pw])
  const pwScore = pwChecks.filter(c => c.ok).length

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setErr(null)
    try {
      if (mode === 'register') {
        const body: Record<string, unknown> = { name, email, password: pw }
        if (phone.trim()) body.phone = phone.trim()
        if (guestId) body.guestId = guestId
        await request('/api/auth/register', { method: 'POST', body })
        location.href = course ? `/learn/${course}/1` : target
        return
      }
      if (mode === 'login') {
        await request('/api/auth/login', { method: 'POST', body: { email, password: pw } })
        location.href = target
        return
      }
      if (mode === 'forgot') {
        await request('/api/auth/forgot', { method: 'POST', body: { email } })
        setSent(true)
        return
      }
      await request('/api/auth/reset', { method: 'POST', body: { token, password: pw } })
      location.href = '/auth/login?next=' + encodeURIComponent(target)
    } catch (e: any) {
      setErr({ message: e?.message || 'Something went wrong.', code: e?.code || 'error', fields: e?.fields })
      if (/session ran out|401/.test(String(e?.code))) setErr(prev => prev)
    } finally { setBusy(false) }
  }

  const title = mode === 'register' ? 'Create your free account' : mode === 'login' ? 'Sign in' : mode === 'forgot' ? 'Reset your password' : 'Choose a new password'

  return (
    <div className="mx-auto max-w-[30rem] space-y-4 py-2">
      <Link href="/" className="mb-6 inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-ink-500 underline-offset-4 hover:text-ink hover:underline dark:text-light/55" aria-label="Back to CEA Learn">← Back to CEA Learn</Link>
      <Card variant="ring" className="p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-snugish text-ink dark:text-light">{title}</h1>
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-500 dark:text-light/60">
          {mode === 'register' && 'Free forever for level 1 of every course. No card details — the academy charges per course, by transfer, only when you are ready.'}
          {mode === 'login' && 'Your streak, XP and offline queue live in this account.'}
          {mode === 'forgot' && 'We will email a link that works for one hour. If the email is not registered, you get the same message — that is deliberate.'}
          {mode === 'reset' && 'Pick something you can type once, sitting down. Resetting also signs you out everywhere else.'}
        </p>

        {intro && <p className={cx('mt-5 rounded-card px-4 py-3 text-[0.9375rem] leading-relaxed', intro.tone === 'warn' ? 'bg-surface-muted text-warn dark:bg-surface-dark-muted' : 'bg-surface-muted text-ink-600 dark:bg-surface-dark-muted dark:text-light/75')}>{intro.text}</p>}
        {guestId && mode === 'register' && (
          <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-600 dark:text-light/70">
            We found progress on this device (guest pass <span className="font-mono">{guestId.slice(0, 6)}…</span>). Finish creating the account and it moves across automatically.
          </p>
        )}

        {sent ? (
          <div className="mt-6 rounded-card bg-surface-muted p-5 dark:bg-surface-dark-muted">
            <p className="text-base font-medium text-ink dark:text-light">Check your inbox.</p>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/70">If that address is with us, a reset link is on its way. No email? Ask the academy at hello@cea.ng — a human can reset it after confirming who you are.</p>
            <Link href="/auth/login" className="mt-4 inline-flex min-h-[44px] items-center rounded-card bg-navy px-4 text-[0.9375rem] font-medium text-white">Back to sign in</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-5" noValidate>
            {mode === 'register' && (
              <Field id="name" label="What should we call you?" error={err?.fields?.name}>
                <input id="name" ref={first as any} value={name} onChange={e => setName(e.target.value)} autoComplete="name" required
                  placeholder="Chidi Okafor" className={inputCls(err?.fields?.name)} />
              </Field>
            )}
            {mode !== 'reset' && (
              <Field id="email" label="Email" hint={mode === 'login' ? undefined : 'We only email about your course: receipts, approvals, and a nudge if your streak is about to break.'} error={err?.fields?.email}>
                <input id="email" ref={mode === 'register' ? undefined : first} type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required
                  inputMode="email" placeholder="you@example.com" className={inputCls(err?.fields?.email)} />
              </Field>
            )}
            {mode === 'register' && (
              <Field id="phone" label="WhatsApp number (optional)" hint="Only used if the academy needs to tell you something about a payment.">
                <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" placeholder="08031234567" className={inputCls()} />
              </Field>
            )}
            {(mode === 'login' || mode === 'register' || mode === 'reset') && (
              <Field id="password" label={mode === 'reset' ? 'New password' : 'Password'} error={err?.fields?.password}>
                <div className="relative">
                  <input id="password" ref={mode === 'reset' ? first : undefined} type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required
                    placeholder={mode === 'login' ? 'Your password' : '10+ characters, easy to remember'} className={inputCls(err?.fields?.password) + ' pr-16'} />
                  <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-[0.8125rem] font-medium text-ink-500 hover:text-ink dark:text-light/55 dark:hover:text-light">
                    {show ? 'hide' : 'show'}
                  </button>
                </div>
                {mode !== 'login' && pw.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    <ProgressBar value={pwScore} max={4} tone={pwScore >= 3 ? 'success' : 'gold'} label="password strength" />
                    <ul className="grid gap-x-4 gap-y-0.5 text-[0.8125rem] sm:grid-cols-2">
                      {pwChecks.map(c => (
                        <li key={c.label} className={c.ok ? 'text-ink-500 line-through decoration-1 dark:text-light/40' : 'text-ink-600 dark:text-light/70'}>{c.label}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Field>
            )}

            {err && (
              <p role="alert" className={cx('rounded-card px-4 py-3 text-[0.9375rem] leading-relaxed', err.code === 'rate_limited' ? 'bg-surface-muted text-warn dark:bg-surface-dark-muted' : 'bg-error/8 text-error')}>
                {err.message}{err.code === 'guest' && <> — or <Link href="/auth/register" className="font-semibold underline">create a password</Link> to keep that guest progress.</>}
              </p>
            )}

            <Button type="submit" className="w-full" loading={busy} disabled={mode === 'register' && pwScore < 3}>
              {mode === 'register' ? 'Create my account' : mode === 'login' ? 'Sign in' : mode === 'forgot' ? 'Email me a reset link' : 'Save new password'}
            </Button>

            <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 pt-2 text-[0.9375rem]">
              {mode === 'login' && <>
                <Link href="/auth/forgot" className="underline">Forgot password?</Link>
                <Link href="/auth/register" className="font-medium text-blue dark:text-sky">New here? Create an account</Link>
              </>}
              {mode === 'register' && <Link href="/auth/login" className="underline">Already have an account? Sign in</Link>}
              {(mode === 'forgot' || mode === 'reset') && <Link href="/auth/login" className="underline">Back to sign in</Link>}
            </div>
          </form>
        )}
      </Card>

      {mode === 'register' && (
        <ul className="mt-1 space-y-1.5 text-[0.875rem] leading-relaxed text-ink-500 dark:text-light/55">
          <li>No card needed — level 1 of every course is open the second your account exists.</li>
          <li>Progress saves offline and syncs later, so a dark room with no signal is still a study session.</li>
        </ul>
      )}
      <p className="text-center text-[0.8125rem] text-ink-500 dark:text-light/50">
        By continuing you accept the <Link href="/terms" className="underline-offset-2 hover:underline">terms</Link> and the <Link href="/privacy" className="underline-offset-2 hover:underline">privacy notice</Link>.
      </p>
    </div>
  )
}

function inputCls(error?: string) {
  return cx('min-h-[48px] w-full rounded-card border bg-surface px-3.5 text-base text-ink outline-none transition-colors placeholder:text-ink-400 focus:border-navy dark:bg-surface-dark dark:text-light dark:placeholder:text-light/40 dark:focus:border-sky',
    error ? 'border-error' : 'border-surface-line dark:border-surface-dark-line')
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.9375rem] font-medium text-ink dark:text-light">{label}</label>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-2 text-[0.875rem] text-error">{error}</p> : hint ? <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-500 dark:text-light/55">{hint}</p> : null}
    </div>
  )
}

/** Only same-origin paths, or `?next=` becomes an open redirect (3.9). */
function safeNext(v?: string) {
  if (!v) return '/dashboard'
  try {
    const u = new URL(v, location.origin)
    if (u.origin !== location.origin) return '/dashboard'
    return u.pathname + u.search
  } catch { return '/dashboard' }
}
