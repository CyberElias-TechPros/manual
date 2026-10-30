import type { Metadata } from 'next'
import { H, LegalShell } from '../legal'
export const metadata: Metadata = { title: 'Design system', robots: { index: false } }
export const dynamic = 'force-dynamic'

/**
 * 1.6 + docs/DESIGN.md — the catalogue for the shared kit, and the written form of the Calm Focus
 * rules the learner-facing screens obey. It exists so a contributor can see every component's real
 * states (focus, loading, disabled, dark) in one place instead of guessing from a screen they happen
 * to have open, and so contrast is measured on the pairs actually shipped.
 */
const PALETTE = [
  ['ink', '#10203a', 'body text and headings', '#fbfcfe'],
  ['ink-600', '#4a5a75', 'secondary text, captions', '#fbfcfe'],
  ['navy', '#1a365d', 'the one action colour: primary buttons, active step', '#fbfcfe'],
  ['gold', '#d69e2e', 'only what the learner earned: XP, streak, stars, certificate', '#fbfcfe'],
  ['success', '#2f855a', 'a passed verdict, nothing decorative', '#fbfcfe'],
  ['error', '#c53030', 'a refused one, nothing else', '#fbfcfe'],
  ['white', '#ffffff', 'text on navy · card surface', '#1a365d'],
  ['deep', '#0f1b33', 'code blocks (the only dark panel in a lesson)', '#e6eefb'],
  ['canvas', '#fbfcfe', 'the page surface — not pure white, not blue-grey', '#10203a'],
  ['surface-line', '#e8edf4', 'every separator in the app', '#10203a'],
] as const

const RAMP = [
  ['4xl', '2.4rem / 1.10', 'home headline only'],
  ['3xl', '2rem / 1.18', 'page title (legal, styleguide)'],
  ['2xl', '1.625rem / 1.28', 'page title on a phone, level title on desktop'],
  ['xl', '1.375rem / 1.40', 'section head'],
  ['lg', '1.1875rem / 1.65', 'activity title, lesson lead-in'],
  ['base', '1.0625rem / 1.70', 'the reading size — everything a learner reads'],
  ['sm', '0.9375rem / 1.60', 'secondary copy, rows, options'],
  ['xs', '0.8125rem / 1.45', 'labels, metadata, captions'],
] as const

const contrast = (a: string, b: string) => {
  const L = (h: string) => {
    const v = parseInt(h.slice(1), 16)
    const c = [(v >> 16) & 255, (v >> 8) & 255, v & 255].map(x => {
      const s = x / 255
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  }
  const x = L(a); const y = L(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

export default function StyleguidePage() {
  return (
    <LegalShell title="Design system" updated="28 October 2026">
      <section>
        <H>The one rule</H>
        <p>
          A learner is reading a manual for ninety minutes, on a phone, often on a metered SIM at night. Every decision
          here is measured against that: <strong>one idea on screen, one action per screen, and colour only where it
          means something.</strong> If a pixel does not help them read, decide, or know where they are, it is not in
          the design. The full rationale is in <code>docs/DESIGN.md</code>.
        </p>
      </section>

      <section>
        <H>Colour, with the ratio measured</H>
        <p>
          10.5 needs 4.5:1 for body text. Each row pairs the token with the surface it is actually used on, so a failing
          combination is visible here rather than on a learner’s phone. Navy is the only action colour; gold is reserved
          for what the learner has earned, which is why it is absent from navigation, buttons and borders.
        </p>
        <ul className="mt-3 divide-y divide-surface-line dark:divide-surface-dark-line">
          {PALETTE.map(([name, hex, use, on]) => {
            const ratio = contrast(hex, on)
            return (
              <li key={name} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5">
                <span aria-hidden className="h-6 w-6 shrink-0 rounded border border-surface-line dark:border-surface-dark-line" style={{ background: hex }} />
                <span className="w-28 shrink-0 font-medium">{name}</span>
                <span className="font-mono text-[0.8125rem] text-ink-500 dark:text-light/55">{hex}</span>
                <span className="min-w-[12rem] flex-1 text-[0.875rem] text-ink-600 dark:text-light/65">{use}</span>
                <span className="text-[0.8125rem] tabular-nums text-ink-500 dark:text-light/55">
                  {ratio.toFixed(1)}:1 · {ratio >= 4.5 ? 'AA text' : ratio >= 3 ? 'large text / UI only' : 'decorative only'}
                </span>
              </li>
            )
          })}
        </ul>
        <p>
          Neutral ramp for everything that is not an action or a verdict: <code>ink-900</code> to <code>ink-50</code>{' '}
          (one grey-blue family, defined once in <code>packages/config/tailwind-preset.cjs</code>). Text never uses a
          raw opacity like <code>text-ink-500</code> on a tinted panel — the ramp replaces it, because an opacity grey
          changes value with the surface underneath.
        </p>
      </section>

      <section>
        <H>Type ramp</H>
        <p>
          System fonts, no webfont bytes (1.2). Body is 17px on 1.7 with a 42rem measure — about 66 characters — because
          the reading is the product. Headings are semibold, never bold: at 17px on a phone, weight is what makes a page
          look loud.
        </p>
        <div className="mt-3 space-y-2">
          {RAMP.map(([size, spec, use]) => (
            <p key={size} className={`text-${size} ${['xs', 'sm', 'base'].includes(size) ? '' : 'font-semibold'} flex flex-wrap items-baseline gap-x-3`}>
              <span className={size === 'base' ? 'max-w-reading' : ''}>{size} — From zero to expert, together</span>
              <span className="text-[0.8125rem] font-normal text-ink-500 dark:text-light/55">{spec} · {use}</span>
            </p>
          ))}
        </div>
      </section>

      <section>
        <H>Layout and rhythm</H>
        <ul className="list-disc space-y-1.5">
          <li>One container: <code>max-w-course</code> (68rem) for a page, <code>max-w-reading</code> (42rem) for prose, <code>max-w-measure</code> (34rem) for a single question or form.</li>
          <li>Page padding is set once, in the root layout. Pages do not add their own gutters.</li>
          <li>Sections are separated by <code>border-t</code> plus 2rem–4rem of space, not by a card. A card (<code>Card variant="ring"</code>) is used only where the learner acts: a panel, an input, an activity.</li>
          <li>Lists of things (courses, receipts, certificates, levels) are rows with hairlines, never grids of boxes — comparison is the job.</li>
          <li>44px minimum tap target; 48px for a primary action; 36px minimum for a text link inside a row that is itself tappable.</li>
        </ul>
      </section>

      <section>
        <H>Stages, not scrolls</H>
        <p>
          A level is fifteen sections long in the manual and is never shown that way. <code>/learn/[slug]/[n]</code> builds a
          queue of stages from the section kinds — <strong>Read → Practise → Check → Case study → Review → Finish</strong> — and
          shows one at a time, with a step counter, a stage rail, and the position kept in the URL so a dropped connection
          resumes in the same place. Reading inside a stage is one section per screen; a toggle gives the whole manual at
          once to anyone who prefers it. The knowledge check is one question per screen. The Finish stage lists the three
          things the API requires before the level can close, in plain words, instead of failing with a toast.
        </p>
      </section>

      <section>
        <H>Motion</H>
        <p>
          Five keyframes, all one-shot: <code>slide-up</code> (a stage entering), <code>fade-in</code> (a stage change),{' '}
          <code>xp-float</code> and <code>badge-pop</code> (a reward, on the event that earned it), <code>shake-x</code> (a
          wrong verdict, once). Nothing loops — the flame does not flicker and map nodes do not pulse. <code>shimmer</code>
          stays on skeletons because a skeleton has to look unfinished. All of it is switched off by{' '}
          <code>prefers-reduced-motion</code>.
        </p>
      </section>

      <section>
        <H>Gamification, kept in its lane</H>
        <p>
          XP, streaks, ranks and badges stay exactly as the API awards them — the rules are unchanged — but they live on{' '}
          <code>/dashboard</code>, <code>/profile</code> and the completion screen. The global bar carries one quiet{' '}
          <code>n-day streak</code> line and nothing else; the nav carries no counters. A learner who wants to ignore the
          numbers can, on every screen, without losing anything.
        </p>
      </section>

      <section>
        <H>Components in @cea/ui</H>
        <p>
          The catalogue with live state sits at <code>/styleguide/lab</code> — every primitive rendered by the same modules
          the app imports, so it cannot drift from reality.
        </p>
        <ul className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
          {['Button · 4 looks, 3 sizes, loading', 'Card · plain | ring | focus', 'Label / Pill · metadata vs state', 'SectionHead · the only section header', 'ProgressBar · 1px, navy', 'StatBlock · a number, no box', 'StreakFlame · static, at-risk in words', 'Stars / RankChip · gold, earned only', 'QuizRunner · one question per screen', 'ExerciseBox · rubric + model answer', 'ScenarioRunner · decision + resolution', 'FlashcardDeck · SM-2 light', 'Checklist · pre-flight', 'CodeBlanks · server-checked', 'BlockList · the prose renderer', 'DiagramView · hotspots + transcript', 'SessionMap · the level graph', 'CourseRow(s) · the catalogue list', 'LockNote · the paid-door copy', 'TopBar / BottomNav / XpToaster'].map(x => <li key={x} className="border-b border-surface-line py-1.5 text-[0.9375rem] text-ink-600 dark:border-surface-dark-line dark:text-light/65">{x}</li>)}
        </ul>
      </section>

      <section>
        <H>Non-negotiables</H>
        <ul className="list-disc space-y-1.5">
          <li>44px tap targets, one focus ring style, never <code>outline: none</code> without a replacement.</li>
          <li>Every interactive thing is reachable and named: the stage rail, the quiz and the diagram hotspots are buttons with aria-current / aria-pressed / sr-only legends.</li>
          <li>Ads only at the placements in the policy — never inside a quiz, an exercise or a stage.</li>
          <li>Answer keys never reach the browser; every grade is computed on the server.</li>
          <li>Data-saver mode still costs nothing to look at: no images, no ad frames, no decorative motion (10.3).</li>
        </ul>
      </section>
    </LegalShell>
  )
}
