import type { Metadata } from 'next'
import { H, LegalShell } from '../legal'
export const metadata: Metadata = { title: 'Design system', robots: { index: false } }
export const dynamic = 'force-dynamic'

/**
 * 1.6 — the living catalogue for the shared kit. It exists so a contributor can see
 * every component's real states (focus, loading, disabled, dark) in one place instead
 * of guessing from a screen they happen to have open, and so contrast was measured on
 * the pair actually shipped together.
 */
const swatches = [
  ['navy', '#1a365d', 'primary, headers'], ['deep', '#0f1b33', 'dark background'],
  ['blue', '#2c5282', 'links, hover'], ['sky', '#62b3ec', 'dark-mode accent'],
  ['gold', '#d69e2e', 'XP, badges, CTAs'], ['mint', '#67d390', 'success in dark'],
  ['coral', '#fb8181', 'error in dark'], ['success', '#38a169', 'passes'],
  ['error', '#e53e3e', 'rejections'], ['warn', '#dd6b20', 'pending'],
  ['light', '#f7fafc', 'page background'], ['paper', '#fffdf5', 'warm card'],
] as const

const contrast = (hex: string, on: string) => {
  const L = (h: string) => {
    const v = parseInt(h.slice(1), 16)
    const c = [(v >> 16) & 255, (v >> 8) & 255, v & 255].map(x => {
      const s = x / 255
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  }
  const a = L(hex); const b = L(on)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

export default function StyleguidePage() {
  return (
    <LegalShell title="Design system" updated="28 October 2026">
      <section>
        <H>Colour, with the ratio measured</H>
        <p className="mt-2 text-[15px]">10.5 needs 4.5:1 for body text. Each chip below pairs the swatch with the surface it is used on, so a failing combination is visible here rather than on a learner’s phone.</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {swatches.map(([name, hex, use]) => {
            const on = name === 'light' || name === 'paper' ? '#12233d' : '#ffffff'
            const bg = name === 'light' || name === 'paper' ? '#ffffff' : hex
            const ratio = contrast(on === '#ffffff' ? hex : hex, on === '#ffffff' ? '#12233d' : on)
            const white = contrast('#ffffff', hex)
            return (
              <li key={name} className="overflow-hidden rounded-card border border-surface-line dark:border-surface-dark-line">
                <div className="flex items-end justify-between p-3" style={{ background: bg, color: on === '#ffffff' ? '#fff' : '#12233d' }}>
                  <span className="font-mono text-xs">{hex}</span>
                  <span className="text-xs opacity-80">{name}</span>
                </div>
                <div className="bg-white p-2 text-xs dark:bg-[#101d36]">
                  <p className="font-medium">{use}</p>
                  <p className="mt-0.5 text-ink/60 dark:text-light/60">on white {white.toFixed(1)}:1 · {white >= 4.5 ? 'AA text ✓' : white >= 3 ? 'large text only' : 'decorative only'} · {ratio.toFixed(1)}:1 vs ink</p>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
      <section>
        <H>Type ramp</H>
        <p className="mt-2 text-[15px]">System fonts, no webfont bytes (1.2). Ramped from 360px up; body is 16px/1.65 with a 46rem measure ≈ 62 characters.</p>
        <div className="mt-3 space-y-1.5">
          {(['4xl', '3xl', '2xl', 'xl', 'lg', 'base', 'sm', 'xs'] as const).map(s => (
            <p key={s} className={`text-${s} ${s === 'base' ? '' : 'font-semibold'}`}>{s} — From zero to expert, together (0.9rem–2.5rem)</p>
          ))}
        </div>
      </section>
      <section>
        <H>Components in @cea/ui</H>
        <p className="mt-2 text-[15px]">The catalogue with live state sits at <code>/styleguide/lab</code> — every primitive, every interaction, rendered by the same modules the app imports, so it cannot drift from reality.</p>
        <ul className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
          {['Button · 5 variants, 3 sizes, loading', 'Card / Chip / StatBlock / ProgressBar', 'QuizRunner · MCQ, true-false, fill-blank, prose', 'ExerciseBox · rubric + model answer', 'ScenarioRunner · decision + resolution', 'FlashcardDeck · SM-2 light', 'Checklist · pre-flight', 'CodeBlanks · server-checked', 'DiagramView · hotspots + transcript', 'SessionMap · the level graph', 'LockNote · 4 lock states', 'TopBar / BottomNav / OfflineBanner / XpToaster'].map(x => <li key={x} className="rounded-card bg-surface-muted px-3 py-2 dark:bg-surface-dark-muted">{x}</li>)}
        </ul>
      </section>
      <section>
        <H>Motion</H>
        <p className="mt-2 text-[15px]">Six keyframes only (xp-float, badge-pop, shake-x, pulse-node, flame, shimmer), each under 400 ms except the idle flame, and all of them switch off under <code>prefers-reduced-motion</code>.</p>
      </section>
      <section>
        <H>Non-negotiables</H>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px]">
          <li>44px tap targets on coarse pointers.</li>
          <li>One focus ring style, never <code>outline: none</code> without a replacement.</li>
          <li>Ads only at the placements in the policy — never mid-quiz.</li>
          <li>Answer keys never reach the browser; every grade is server-side.</li>
        </ul>
      </section>
    </LegalShell>
  )
}
