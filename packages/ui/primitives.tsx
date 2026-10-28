'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/** * The shared atoms (ROADMAP 1.1/1.2). Every colour comes from the Tailwind
 * preset, so a brand change is a one-file change. No animation library ships
 * here: the keyframes in packages/config/tailwind-preset.cjs give the same
 * feel for 0 KB, which matters for the <150 KB budget (10.2).
 */
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ')

// ---------------------------------------------------------------------------
// buttons + containers
// ---------------------------------------------------------------------------

type Variant = 'primary' | 'gold' | 'ghost' | 'outline' | 'danger'
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-blue active:bg-navy border-transparent',
  gold: 'bg-gold text-deep hover:brightness-105 active:brightness-95 border-transparent font-semibold',
  ghost: 'bg-transparent text-navy dark:text-light hover:bg-surface-muted dark:hover:bg-surface-dark-muted border-transparent',
  outline: 'bg-transparent text-navy dark:text-light border-surface-line hover:bg-surface-muted dark:border-surface-dark-line dark:hover:bg-surface-dark-muted',
  danger: 'bg-error text-white hover:brightness-105 border-transparent',
}
const SIZES = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2.5 text-base', lg: 'px-5 py-3 text-lg' } as const

export function Button({
  variant = 'primary', size = 'md', loading, iconLeft, className, children, disabled, ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: keyof typeof SIZES; loading?: boolean; iconLeft?: ReactNode }) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-pill border font-medium',
        'transition-[background-color,transform,filter] duration-150 active:translate-y-px',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-sky',
        'disabled:opacity-55 disabled:cursor-not-allowed min-h-[44px]',
        VARIANTS[variant], SIZES[size], className,
      )}
    >
      {loading ? <Spinner /> : iconLeft}
      {children}
    </button>
  )
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cx('inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent', className)} />
  )
}

export function Card({ as: As = 'div', pad = true, hover = false, className, children, ...rest }:
  HTMLAttributes<HTMLElement> & { as?: any; pad?: boolean; hover?: boolean }) {
  return (
    <As {...rest} className={cx(
      'rounded-card border border-surface-line bg-surface shadow-card dark:border-surface-dark-line dark:bg-surface-dark',
      pad && 'p-4 sm:p-5', hover && 'transition-shadow hover:shadow-glow', className,
    )}>
      {children}
    </As>
  )
}

export function Chip({ tone = 'navy', className, children }: { tone?: 'navy' | 'gold' | 'success' | 'error' | 'warn' | 'muted'; className?: string; children: ReactNode }) {
  const tones = {
    navy: 'bg-navy/8 text-navy dark:bg-sky/15 dark:text-sky',
    gold: 'bg-gold/15 text-[#8a5b0d] dark:text-gold',
    success: 'bg-success/12 text-success',
    error: 'bg-error/10 text-error',
    warn: 'bg-warn/12 text-warn',
    muted: 'bg-surface-muted text-ink/70 dark:bg-surface-dark-muted dark:text-light/75',
  } as const
  return <span className={cx('inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-medium', tones[tone], className)}>{children}</span>
}

// ---------------------------------------------------------------------------
// progress, streaks, ranks
// ---------------------------------------------------------------------------

export function ProgressBar({ value, max = 100, tone = 'gold', label, className }:
  { value: number; max?: number; tone?: 'gold' | 'success' | 'navy'; label?: string; className?: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0
  const bg = tone === 'success' ? 'bg-success' : tone === 'navy' ? 'bg-navy dark:bg-sky' : 'bg-gold'
  return (
    <div className={cx('w-full', className)}>
      {label && <div className="mb-1 flex items-baseline justify-between text-xs text-ink/70 dark:text-light/70"><span>{label}</span><span className="tabular-nums">{pct}%</span></div>}
      <div
        role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label || 'progress'}
        className="h-2 w-full overflow-hidden rounded-pill bg-surface-muted dark:bg-surface-dark-muted"
      >
        <div className={cx('h-full rounded-pill transition-[width] duration-500', bg)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

/** 5.3 — the flame is the habit hook; it goes hollow when the streak is at risk. */
export function StreakFlame({ count, atRisk, freezes = 0, size = 'md' }: { count: number; atRisk?: boolean; freezes?: number; size?: 'sm' | 'md' | 'lg' }) {
  const px = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-7 w-7' : 'h-5 w-5'
  return (
    <span className="inline-flex items-center gap-1.5" title={atRisk ? 'Streak ends tonight unless you finish one level' : `${count}-day streak`}>
      <svg viewBox="0 0 24 24" className={cx(px, 'shrink-0', count > 0 && !atRisk && 'animate-flame')} aria-hidden fill="none">
        <path d="M12 2.6c2.4 3.2.5 4.9 1.9 6.6.9 1.1 2.3.6 2.9-.7 1.7 2 2.4 3.9 2.4 5.7A7.2 7.2 0 1 1 5.2 12c.9-3.9 4.4-5.6 6.8-9.4Z"
          fill={count > 0 ? (atRisk ? 'none' : '#d69e2e') : 'none'} stroke={count > 0 ? '#d69e2e' : 'currentColor'} strokeWidth="1.6" strokeLinejoin="round" />
        {count > 0 && !atRisk && <path d="M12 17.6a2.9 2.9 0 0 0 2.9-2.9c0-1.6-1.5-2.3-2.9-4.3-1.4 2-2.9 2.7-2.9 4.3a2.9 2.9 0 0 0 2.9 2.9Z" fill="#fffdf5" />}
      </svg>
      <span className="text-sm font-semibold tabular-nums">{count}</span>
      {freezes > 0 && <span className="text-xs text-sky" title={`${freezes} streak freeze${freezes > 1 ? 's' : ''} saved`}>❄{freezes}</span>}
      {atRisk && <span className="text-xs font-medium text-warn">today</span>}
    </span>
  )
}

export function RankChip({ rank, xp, next }: { rank: { key: string; name: string; blurb?: string }; xp: number; next?: { name: string; min: number } | null }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill bg-deep px-3 py-1.5 text-light" title={rank.blurb}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none">
        <path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.6 6.7 19.5l1.1-6L3.4 9.3l6-.8L12 3Z" fill="#d69e2e" />
      </svg>
      <span className="text-sm font-semibold">{rank.name}</span>
      {next && <span className="text-xs text-light/70">{next.min - xp} XP → {next.name}</span>}
    </span>
  )
}

/** 4.7 — three stars per level, from the quiz percentage (shared with the API). */
export function Stars({ n = 0, size = 16 }: { n?: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${n} of 3 stars`}>
      {[1, 2, 3].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none">
          <path d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z"
            fill={i <= n ? '#d69e2e' : 'none'} stroke={i <= n ? '#d69e2e' : 'currentColor'} strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  )
}

/** 7.6 — the only thing a locked level should show. */
export function LockNote({ minutes, price, onUnlock }: { minutes?: number; price?: string; onUnlock?: () => void }) {
  return (
    <Card className="border-dashed bg-paper dark:bg-surface-dark-muted">
      <div className="flex items-start gap-3">
        <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-navy dark:text-sky" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
        </svg>
        <div className="min-w-0">
          <h3 className="text-base font-semibold">This level is part of the paid course</h3>
          <p className="mt-1 text-sm text-ink/75 dark:text-light/75">
            Your first level is free so you can judge the teaching before you pay.
            {minutes ? ` This one is about ${minutes} minutes of work.` : ''}
          </p>
          {onUnlock && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button size="sm" variant="gold" onClick={onUnlock}>Unlock{price ? ` for ${price}` : ''}</Button>
              <span className="text-xs text-ink/60 dark:text-light/60">Bank transfer · receipt approved within 24h</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx('animate-shimmer rounded-pill bg-[linear-gradient(90deg,#eef2f7_25%,#e2e8f0_37%,#eef2f7_63%)] dark:bg-[linear-gradient(90deg,#16264a_25%,#1d3057_37%,#16264a_63%)]', className)} style={{ backgroundSize: '400% 100%' }} />
}

/** +10 XP floating number (5.8) — CSS only, removed by the parent after the animation. */
export function XpFloat({ xp, label }: { xp: number; label?: string }) {
  if (!xp) return null
  return (
    <span className="pointer-events-none absolute -top-2 right-2 animate-xp-float text-sm font-bold text-gold drop-shadow" role="status">
      +{xp} XP{label ? ` · ${label}` : ''}
    </span>
  )
}

export function Naira({ amount, className }: { amount: number | null | undefined; className?: string }) {
  // A course with no published fee is not ₦0: say what the learner has to do instead.
  if (amount === null || amount === undefined) {
    return <span className={cx(className)}>Fee on request</span>
  }
  return (
    <span className={cx('tabular-nums', className)}>
      {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)}
    </span>
  )
}

export function StatBlock({ label, value, hint, tone }: { label: string; value: ReactNode; hint?: string; tone?: 'gold' | 'success' | 'error' }) {
  return (
    <div className="rounded-card border border-surface-line bg-surface p-3 dark:border-surface-dark-line dark:bg-surface-dark">
      <div className="text-xs uppercase tracking-wide text-ink/55 dark:text-light/55">{label}</div>
      <div className={cx('mt-0.5 text-xl font-semibold tabular-nums', tone === 'gold' && 'text-gold', tone === 'success' && 'text-success', tone === 'error' && 'text-error')}>{value}</div>
      {hint && <div className="mt-0.5 text-xs text-ink/60 dark:text-light/60">{hint}</div>}
    </div>
  )
}
