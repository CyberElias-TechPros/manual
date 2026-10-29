'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/**
 * The shared atoms (ROADMAP 1.1/1.2) — Calm Focus edition (docs/DESIGN.md).
 *
 * Four rules the whole file obeys:
 *   1. A container is earned. `Card` is flat by default; `variant="ring"` adds one hairline for
 *      things you can tap. Nothing in a lesson is a box of boxes.
 *   2. Colour means something. Navy = the action you should take. Gold = something you earned.
 *      Red/amber = a verdict. Everything else is ink on paper.
 *   3. Nothing loops. Motion fires once, on the event that caused it.
 *   4. Every component here is keyboard- and screen-reader-named, 44px where it is a target.
 */
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ')

// ---------------------------------------------------------------------------
// buttons + containers
// ---------------------------------------------------------------------------

type Variant = 'primary' | 'gold' | 'ghost' | 'outline' | 'danger'
const VARIANTS: Record<Variant, string> = {
  // one solid action per view; everything else is quieter than it
  primary: 'bg-navy text-white hover:bg-[#152c4d] active:bg-deep border-transparent',
  gold: 'bg-navy text-white hover:bg-[#152c4d] active:bg-deep border-transparent', // retired: reward CTAs are now the primary action
  ghost: 'bg-transparent text-navy dark:text-light hover:bg-surface-muted dark:hover:bg-surface-dark-muted border-transparent',
  outline: 'bg-surface dark:bg-transparent text-navy dark:text-light border-surface-line-strong hover:bg-surface-muted dark:hover:bg-surface-dark-muted dark:border-surface-dark-line-strong',
  danger: 'bg-transparent text-error border-error/30 hover:bg-error/5',
}
const SIZES = { sm: 'px-3.5 py-1.5 text-sm', md: 'px-5 py-2.5 text-base', lg: 'px-6 py-3 text-lg' } as const

export function Button({
  variant = 'primary', size = 'md', loading, iconLeft, className, children, disabled, ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: keyof typeof SIZES; loading?: boolean; iconLeft?: ReactNode }) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-card border font-semibold',
        'transition-colors duration-150 ease-std',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy dark:focus-visible:outline-sky',
        'disabled:opacity-45 disabled:cursor-not-allowed min-h-[44px]',
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

/**
 * `plain` — no border, no shadow: the default for anything that is only grouping content.
 * `ring`  — one hairline: anything the learner can act on.
 * `focus` — the single card on a screen that carries the next step.
 */
export function Card({ as: As = 'div', variant = 'plain', pad = true, hover = false, className, children, ...rest }:
  HTMLAttributes<HTMLElement> & { as?: any; variant?: 'plain' | 'ring' | 'focus'; pad?: boolean; hover?: boolean }) {
  const skin = {
    plain: 'border border-transparent',
    ring: 'border border-surface-line bg-surface dark:border-surface-dark-line dark:bg-surface-dark',
    focus: 'border border-surface-line bg-surface shadow-card dark:border-surface-dark-line dark:bg-surface-dark',
  }[variant]
  return (
    <As {...rest} className={cx(
      'rounded-card',
      variant === 'plain' ? 'bg-surface dark:bg-surface-dark' : skin,
      pad && 'p-5 sm:p-6',
      hover && 'transition-colors duration-150 hover:border-surface-line-strong',
      className,
    )}>
      {children}
    </As>
  )
}

/**
 * The one text-link treatment in the app. Exported as a class rather than a component so pages can
 * put it on `next/link` and keep prefetching (apps/web) while the kit stays router-free.
 */
export const linkClass = 'font-semibold text-navy underline-offset-4 hover:underline dark:text-sky'

/** A quiet piece of metadata: "9 levels · 4 weeks". No pill, no colour, 13px. */
export function Label({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cx('text-[0.8125rem] font-medium text-ink-600 dark:text-light/70', className)}>{children}</span>
}

/** A state, not a decoration. One word, one dot, no fill. */
export function Pill({ tone = 'muted', className, children }: { tone?: 'navy' | 'gold' | 'success' | 'error' | 'warn' | 'muted'; className?: string; children: ReactNode }) {
  const tones = {
    navy: 'text-navy dark:text-sky',
    gold: 'text-[#8a5b0d] dark:text-gold',
    success: 'text-success',
    error: 'text-error',
    warn: 'text-warn',
    muted: 'text-ink-500 dark:text-light/55',
  } as const
  const dot = {
    navy: 'bg-navy dark:bg-sky', gold: 'bg-gold', success: 'bg-success', error: 'bg-error', warn: 'bg-warn', muted: 'bg-ink-300',
  } as const
  return (
    <span className={cx('inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold', tones[tone], className)}>
      <span aria-hidden className={cx('h-1.5 w-1.5 rounded-full', dot[tone])} />
      {children}
    </span>
  )
}

/**
 * There is deliberately no `Chip` here any more. A chip used to be a small box that any label could
 * be put in, which is how the app ended up with a badge on everything; `Pill` is the same idea with
 * the box removed, and the name is gone so the old reflex cannot come back through an import.
 */

/** Section heading inside a page: a small line of intent, then the content. Not a card header. */
export function SectionHead({ title, note, action, id }: { title: string; note?: ReactNode; action?: ReactNode; id?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-surface-line pb-3 dark:border-surface-dark-line">
      <div className="min-w-0">
        <h2 id={id} className="text-xl font-bold text-ink dark:text-light">{title}</h2>
        {note ? <p className="mt-1 max-w-reading text-sm text-ink-500 dark:text-light/60">{note}</p> : null}
      </div>
      {action}
    </div>
  )
}

// ---------------------------------------------------------------------------
// progress, streaks, ranks
// ---------------------------------------------------------------------------

export function ProgressBar({ value, max = 100, tone = 'navy', label, className }:
  { value: number; max?: number; tone?: 'gold' | 'success' | 'navy'; label?: string; className?: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0
  const bg = tone === 'success' ? 'bg-success' : tone === 'gold' ? 'bg-gold' : 'bg-navy dark:bg-sky'
  return (
    <div className={cx('w-full', className)}>
      {label && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3 text-[0.8125rem] text-ink-500 dark:text-light/60">
          <span className="truncate">{label}</span>
          <span className="tabular-nums">{pct}%</span>
        </div>
      )}
      <div
        role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label || 'progress'}
        className="h-1 w-full overflow-hidden rounded-pill bg-surface-line dark:bg-surface-dark-muted"
      >
        <div className={cx('h-full rounded-pill transition-[width] duration-500 ease-std', bg)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

/** 5.3 — the streak is a habit hook, not a ticker. It flickers for nobody; at-risk is a calm word. */
export function StreakFlame({ count, atRisk, freezes = 0, size = 'md' }: { count: number; atRisk?: boolean; freezes?: number; size?: 'sm' | 'md' | 'lg' }) {
  const px = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
  return (
    <span className="inline-flex items-center gap-1.5" title={atRisk ? 'Streak ends tonight unless you finish one level' : `${count}-day streak`}>
      <svg viewBox="0 0 24 24" className={cx(px, 'shrink-0 text-ink-300 dark:text-light/30')} aria-hidden fill="none">
        <path
          d="M12 2.6c2.4 3.2.5 4.9 1.9 6.6.9 1.1 2.3.6 2.9-.7 1.7 2 2.4 3.9 2.4 5.7A7.2 7.2 0 1 1 5.2 12c.9-3.9 4.4-5.6 6.8-9.4Z"
          fill={count > 0 ? (atRisk ? 'none' : '#d69e2e') : 'none'} stroke={count > 0 ? '#d69e2e' : 'currentColor'} strokeWidth="1.5" strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-medium tabular-nums text-ink dark:text-light">{count}</span>
      {freezes > 0 && <span className="text-xs text-ink-500 dark:text-light/60" title={`${freezes} streak freeze${freezes > 1 ? 's' : ''} saved`}>+{freezes} freeze</span>}
      {atRisk && <span className="text-xs text-ink-500 dark:text-light/60">finish one level today</span>}
    </span>
  )
}

export function RankChip({ rank, xp, next }: { rank: { key: string; name: string; blurb?: string }; xp: number; next?: { name: string; min: number } | null }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm" title={rank.blurb}>
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden fill="none">
        <path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.6 6.7 19.5l1.1-6L3.4 9.3l6-.8L12 3Z" fill="#d69e2e" />
      </svg>
      <span className="font-medium text-ink dark:text-light">{rank.name}</span>
      {next && <span className="text-[0.8125rem] text-ink-500 dark:text-light/55">{(next.min - xp).toLocaleString('en-NG')} XP to {next.name}</span>}
    </span>
  )
}

/** 4.7 — three stars per level, from the quiz percentage (shared with the API). */
export function Stars({ n = 0, size = 16 }: { n?: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${n} of 3 stars`}>
      {[1, 2, 3].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none">
          <path d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z"
            fill={i <= n ? '#d69e2e' : 'none'} stroke={i <= n ? '#d69e2e' : 'currentColor'} strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  )
}

/** 7.6 — the only thing a locked level should show. One sentence, one button. */
export function LockNote({ minutes, price, onUnlock }: { minutes?: number; price?: string; onUnlock?: () => void }) {
  return (
    <div className="rounded-card border border-surface-line bg-surface-muted p-5 text-center dark:border-surface-dark-line dark:bg-surface-dark-muted">
      <h3 className="text-base font-medium text-ink dark:text-light">This level is part of the paid course</h3>
      <p className="mx-auto mt-1.5 max-w-measure text-sm text-ink-500 dark:text-light/60">
        Your first level is free so you can judge the teaching before you pay.{minutes ? ` About ${minutes} minutes of work.` : ''}
      </p>
      {onUnlock && (
        <div className="mt-4">
          <Button size="sm" onClick={onUnlock}>Unlock{price ? ` for ${price}` : ''}</Button>
          <p className="mt-2 text-[0.8125rem] text-ink-500 dark:text-light/50">Bank transfer · receipt approved within 24 hours</p>
        </div>
      )}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx('animate-shimmer rounded-card bg-[linear-gradient(90deg,#f1f4f8_25%,#e6ebf2_45%,#f1f4f8_65%)] dark:bg-[linear-gradient(90deg,#17253f_25%,#1d2d4d_45%,#17253f_65%)]', className)} style={{ backgroundSize: '400% 100%' }} />
}

/** +XP floating number (5.8) — CSS only, removed by the parent after the animation. */
export function XpFloat({ xp, label }: { xp: number; label?: string }) {
  if (!xp) return null
  return (
    <span className="pointer-events-none absolute -top-2 right-2 animate-xp-float text-sm font-semibold text-gold" role="status">
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

/** A number on a page. No box, no border — the whitespace is the container. */
export function StatBlock({ label, value, hint, tone }: { label: string; value: ReactNode; hint?: string; tone?: 'gold' | 'success' | 'error' }) {
  return (
    <div>
      <div className="text-[0.8125rem] text-ink-500 dark:text-light/55">{label}</div>
      <div className={cx('mt-0.5 text-2xl font-semibold tabular-nums text-ink dark:text-light', tone === 'gold' && 'text-gold', tone === 'success' && 'text-success', tone === 'error' && 'text-error')}>{value}</div>
      {hint && <div className="mt-0.5 text-[0.8125rem] text-ink-500 dark:text-light/50">{hint}</div>}
    </div>
  )
}
