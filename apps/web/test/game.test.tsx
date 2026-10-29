import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { GAME } from '@cea/config'
import { SpinWheel, StreakCalendar } from '../../../packages/ui/game'

/**
 * 5.9 — the wheel and the calendar are drawn after `/api/summary` arrives, so there is no SSR HTML to
 * fetch and assert (the same reason 11.2 renders its component). Rendering from source pins what the
 * learner is actually told — and, more importantly for a reward, that every prize the disc can point
 * at exists in the config the API rolls from.
 */
describe('bonus wheel (5.9)', () => {
  const spin = { spinsToday: 0, spinsLeft: 1, bonusAt: GAME.wheel.bonusSpinStreakDays, streak: 1 }
  const html = renderToStaticMarkup(<SpinWheel spin={spin} />)

  it('shows the same six prizes the server can pay', () => {
    for (const s of GAME.wheel.segments) expect(html).toContain(s.label)
    // one wedge per segment in the gradient, so a prize can never be drawn without a slice
    expect((html.match(/deg /g) ?? []).length).toBe(GAME.wheel.segments.length)
  })

  it('states the odds instead of hiding them', () => {
    const total = GAME.wheel.segments.reduce((n, s) => n + s.weight, 0)
    for (const s of GAME.wheel.segments) {
      expect(html).toContain(`${Math.round((s.weight / total) * 100)}%`)
    }
  })

  it('leaves the result in a live region, so the prize is announced and not only spun', () => {
    expect(html).toContain('aria-live="polite"')
    expect(html).toContain('Daily bonus wheel')
    expect(html).toContain('Spin the wheel')
  })

  it('says so plainly when the day is spent, and refuses the tap', () => {
    const spent = renderToStaticMarkup(<SpinWheel spin={{ ...spin, spinsLeft: 0, spinsToday: 1 }} />)
    expect(spent).toContain('No spins left today')
    expect(spent).toContain('disabled')
    expect(spent).toContain('Spent — back tomorrow')
  })
})

describe('streak calendar (5.9)', () => {
  const pad = (n: number) => String(n).padStart(2, '0')
  const now = new Date()
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`

  it('draws one square per day of the window and counts the active ones out loud', () => {
    const html = renderToStaticMarkup(<StreakCalendar days={[{ day: today, xp: 120 }, { day: '2020-01-01', xp: 40 }]} />)
    const cells = html.match(/aria-label="[^"]*: (?:\d+ XP|no activity)"/g) ?? []
    expect(cells).toHaveLength(GAME.streakCalendarWeeks * 7)
    expect(html).toContain('1 of the last')
    expect(html).toContain('120 XP')
    // the far-past day is outside the 12 weeks, so it must not light a square
    expect(html).not.toContain('2020-01-01: 40 XP')
  })

  it('does not invent activity for a learner with no events', () => {
    const html = renderToStaticMarkup(<StreakCalendar days={[]} />)
    expect(html).toContain('0 of the last')
    expect(html).toContain('Showing up')
  })
})
