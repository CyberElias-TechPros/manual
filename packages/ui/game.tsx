'use client'
/**
 * The game layer a learner can see (5.9): the bonus wheel and the streak calendar.
 *
 * One rule from the manual governs both files in this folder and it is worth stating where the
 * temptation is strongest: **the page animates, the server decides.** The wheel's prize is rolled in
 * `POST /api/gamify/spin` from a hash of (user, day, which spin), so refreshing cannot re-roll it and
 * a second tab cannot spend tomorrow's spin. What you get back from `mutate` here is a fact, not an
 * input — and this file never adds a number to the learner's XP itself, it only announces what the API
 * already paid (which is what the toast in `shell.tsx` is for).
 *
 * Motion: the disc really turns, and it is the only thing in the app that loops-like — it runs once,
 * lands, and stops. `prefers-reduced-motion` skips the turn and shows the outcome, because the prize
 * is the information; the spinning is decoration (docs/DESIGN.md).
 */
import { useEffect, useRef, useState } from 'react'
import { GAME } from '@cea/config'
import { announceAward, mutate } from './shell'
import { Button, Label, Pill, cx } from './primitives'

/** The wheel's six wedges, in the order the API's roll can land on them. */
const SEGMENTS = GAME.wheel.segments
const SPAN = 360 / SEGMENTS.length
const TOTAL_WEIGHT = SEGMENTS.reduce((n, s) => n + s.weight, 0)

/**
 * Wedge boundaries, weighted — a common prize occupies a wide slice and the rare ones are thin. The
 * same table the server rolls from (`spinRoll`), so what the disc shows and what the API pays cannot
 * drift apart. Colours are the theme's own hexes, spelled out because a `conic-gradient` cannot read a
 * Tailwind class.
 */
function wedgeStops() {
  const fills = ['#1a365d', '#2c5282']
  let angle = 0
  const stops: string[] = []
  const centres: number[] = []
  SEGMENTS.forEach((s, i) => {
    const sweep = (s.weight / TOTAL_WEIGHT) * 360
    const fill = s.xp >= 25 ? '#d69e2e' : s.freeze ? '#67d390' : fills[i % 2]
    stops.push(`${fill} ${angle.toFixed(2)}deg ${(angle + sweep).toFixed(2)}deg`)
    centres.push(angle + sweep / 2)
    angle += sweep
  })
  return { css: `conic-gradient(from 0deg, ${stops.join(', ')})`, centres }
}

export type SpinInfo = { spinsToday: number; spinsLeft: number; bonusAt: number; streak: number }
export type SpinResult = {
  spun?: boolean; reason?: string; index?: number; spinsLeft?: number; spinsToday?: number
  segment?: { id: string; label: string; xp: number; freeze?: number }
  last?: string; award?: any
}

export function SpinWheel({ spin, onChanged }: { spin?: SpinInfo | null; onChanged?: (r: SpinResult) => void }) {
  const { css, centres } = useRef(wedgeStops()).current
  const [turn, setTurn] = useState(0)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<SpinResult | null>(null)
  const [prefersReduced, setPrefersReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setPrefersReduced(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const left = result?.spinsLeft ?? spin?.spinsLeft ?? 0
  const won = result?.spun ? result.segment : null

  async function onSpin() {
    if (busy || left <= 0) return
    setBusy(true)
    try {
      const r = (await mutate('/api/gamify/spin', {})) as SpinResult
      setResult(r)
      onChanged?.(r)
      if (r.spun) {
        announceAward(r.award, 'bonus wheel')
        // Five turns, then land the winning wedge under the pointer at the top. Reduced motion jumps
        // to the resting angle with no transition — the number still reads, nothing spins.
        const target = 360 * 5 - (centres[r.index ?? 0] ?? 0)
        const base = turn + (turn % 360 === 0 ? 0 : 360 - (turn % 360))
        setTurn(prefersReduced ? target : base + target)
      }
    } catch {
      setResult({ spun: false, reason: 'offline' })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section aria-labelledby="wheel-h" className="rounded-panel border border-surface-line bg-surface p-4 sm:p-5 dark:border-surface-dark-line dark:bg-surface-dark">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="wheel-h" className="text-[1.0625rem] font-bold text-ink dark:text-light">Daily bonus wheel</h2>
        <Pill tone={left > 0 ? 'navy' : 'muted'}>{left > 0 ? `${left} spin${left === 1 ? '' : 's'} left today` : 'Spent — back tomorrow'}</Pill>
      </header>
      <p className="mt-1 text-[0.9375rem] text-ink-500 dark:text-light/60">
        The prize is drawn when you tap, by the academy, not by this page. One spin a day; a
        {' '}{GAME.wheel.bonusSpinStreakDays}-day streak earns a second one.
      </p>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <span aria-hidden className="absolute left-1/2 top-[-6px] h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[11px] border-x-transparent border-t-gold" />
          <div
            aria-hidden
            className="h-[168px] w-[168px] rounded-full ring-4 ring-surface-line dark:ring-surface-dark-muted"
            style={{
              background: css,
              transform: `rotate(${turn}deg)`,
              transition: prefersReduced ? 'none' : 'transform 2600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
        <ol className="w-full space-y-1 text-[0.875rem]">
          {SEGMENTS.map(s => (
            <li key={s.id} className={cx('flex items-baseline justify-between gap-3 rounded-card px-2 py-1', won?.id === s.id ? 'bg-gold/15 font-bold text-ink dark:text-light' : 'text-ink-500 dark:text-light/55')}>
              <span>{s.label}</span>
              <span className="tabular-nums">{Math.round((s.weight / TOTAL_WEIGHT) * 100)}%</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={onSpin} disabled={left <= 0 || busy} loading={busy}>
          {busy ? 'Drawing…' : left > 0 ? 'Spin the wheel' : 'No spins left today'}
        </Button>
        {/* The outcome is text, not just an animation: a screen reader and a learner with
            reduced motion get the same prize, in the same words. */}
        <p className="text-[0.9375rem] font-medium text-ink dark:text-light" aria-live="polite">
          {result?.spun && won ? `You won ${won.label}${won.freeze ? ` and a streak shield (+${won.freeze} freeze)` : ''}.`
            : result?.reason === 'spent' ? 'That is today spent. Finish a level and the wheel refills tomorrow.'
            : result?.reason === 'offline' ? 'You are offline — nothing was drawn, so no spin was used.'
            : left > 0 ? '' : 'Come back tomorrow for the next spin.'}
        </p>
      </div>
    </section>
  )
}

/**
 * Twelve weeks of squares (GitHub-style, one per day) tinted by how much XP landed that day. The
 * server decides which days count, from `xp_events` — a day with a quiz pass and no finished level
 * still lights up, which is the honest version of a streak.
 */
export function StreakCalendar({ days, weeks = GAME.streakCalendarWeeks, caption = 'Last 12 weeks' }:
  { days?: { day: string; xp: number }[]; weeks?: number; caption?: string }) {
  const byDay = new Map((days ?? []).map(d => [d.day, Number(d.xp || 0)]))
  // Built client-side (the summary arrives after mount), so a browser in another timezone from the
  // server cannot disagree with the first paint.
  const cells: { key: string; xp: number; today: boolean }[] = []
  const total = weeks * 7
  const now = new Date()
  for (let i = total - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    cells.push({ key, xp: byDay.get(key) ?? 0, today: i === 0 })
  }
  const active = cells.filter(c => c.xp > 0).length
  const xp = cells.reduce((n, c) => n + c.xp, 0)

  return (
    <section aria-label={`Streak calendar, ${caption}`} className="rounded-panel border border-surface-line bg-surface p-4 sm:p-5 dark:border-surface-dark-line dark:bg-surface-dark">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[1.0625rem] font-bold text-ink dark:text-light">Showing up</h2>
        <p className="text-[0.8125rem] text-ink-500 tabular-nums dark:text-light/60">{active} active {active === 1 ? 'day' : 'days'} · {xp} XP</p>
      </header>
      <div className="mt-3 grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-1">
        {cells.map(c => (
          <span
            key={c.key}
            title={c.xp ? `${c.key} — ${c.xp} XP` : `${c.key} — nothing banked`}
            aria-label={c.xp ? `${c.key}: ${c.xp} XP` : `${c.key}: no activity`}
            className={cx(
              'h-3.5 w-3.5 rounded-[3px] sm:h-4 sm:w-4',
              c.xp >= 120 ? 'bg-gold' : c.xp >= 60 ? 'bg-gold/70' : c.xp > 0 ? 'bg-gold/35' : 'bg-surface-line dark:bg-surface-dark-muted',
              c.today && 'ring-2 ring-navy dark:ring-sky',
            )}
          />
        ))}
      </div>
      <p className="sr-only">{active} of the last {total} days had activity, {xp} XP in total.</p>
      <div className="mt-3 flex items-center gap-3 text-[0.75rem] text-ink-500 dark:text-light/55">
        <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-[2px] bg-gold/35" aria-hidden />a little</span>
        <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-[2px] bg-gold" aria-hidden />a full level</span>
        <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-[2px] bg-surface-line dark:bg-surface-dark-muted" aria-hidden />away</span>
        <span className="ml-auto"><Label>Ring = today</Label></span>
      </div>
    </section>
  )
}
