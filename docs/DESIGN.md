# Design system — Calm Focus

Everything here is implemented, not proposed: the tokens live in
`packages/config/tailwind-preset.cjs`, the components in `packages/ui/*`, the rules below are what
the learner-facing screens in `apps/web/src/app` actually do. `/styleguide` renders this page's
substance with live numbers (measured contrast, the real type ramp, every component state), and
`/styleguide/lab` renders the components themselves from the same modules the app imports.

## Who the screen is for

A learner is usually on an Android phone, often on a metered SIM, often at night, often reading a
manual for them that assumes nothing. They are not browsing; they are trying to accomplish one
thing in Excel and then get back to work. Two consequences drive every rule below:

1. **The reading is the product.** Anything that competes with it — a coloured panel, a badge, a
   looping animation, a card border around a paragraph — costs more attention than it returns.
2. **Data and attention are both scarce.** No webfont bytes, no animation loops, no image that is
   only decoration, no second call to action on a screen.

A page is finished when a beginner can answer three questions without scrolling: *what is this,
what do I do first, what happens when I do it.*

## Eight rules

1. **Navy is the only action colour.** Gold is never a button in a learner flow; if a screen seems
   to need two, one of them is not an action. (`Button variant="gold"` is an alias to primary, so
   two competing CTAs cannot be written by accident.)
2. **Gold marks only what the learner earned** — XP, streak, stars, rank, the certificate seal.
   Nothing decorative is gold. Colour is the signal, so it must be rare.
3. **One thing moves at a time, and it moves once.** Five keyframes: stage entering, verdict, XP
   float, badge pop, shake. Nothing loops — no flickering flame, no pulsing node. `shimmer` stays
   on skeletons because an unfinished thing should look unfinished. All of it is off under
   `prefers-reduced-motion`.
4. **Containers are earned.** Spacing and a hairline separate sections; a box appears only where
   the learner acts (`Card variant="ring"`). Lists of comparable things — courses, receipts,
   certificates, levels — are hairline rows, never grids of cards.
5. **One solid CTA per view.** Everything else is a quiet text link (`linkClass`), so the eye finds
   the action without hunting for it.
6. **Type leads.** 17px on 1.7 at a 42rem measure for anything read; semibold headings, never bold;
   weight and size carry hierarchy, colour carries meaning.
7. **One recommendation per list.** A catalogue row plus a nudge, not a wall of numbers. Progress
   furniture lives on `/dashboard`, `/profile` and the completion screen — the global bar carries a
   quiet `n-day streak` line and the nav carries no counters, so a learner can ignore the scoring
   entirely without losing anything.
8. **A stage, not a scroll.** A level is never fifteen sections long on screen. Read → Practise →
   Check → Case study → Review → Finish, one at a time, position in the URL.

## Tokens

| Token | Value | Role |
| --- | --- | --- |
| `navy` / `blue` / `sky` | `#1a365d` / `#2c5282` / `#62b3ec` | the action colour; `sky` is its dark-mode twin |
| `gold` | `#d69e2e` | earned things only |
| `success` / `error` / `warn` | `#2f855a` / `#c53030` / `#b7791f` | a verdict, nothing else |
| `ink-900 → ink-50` | `#10203a → #f5f7fa` | the whole neutral ramp: text, rules, quiet fills |
| `canvas` | `#fbfcfe` | the page surface — not pure white, not blue-grey |
| `surface(-muted,-line,-line-strong)` | `#fff`, `ink-50/100/200` | cards, fills, hairlines (+ dark twins) |
| `maxWidth.reading / .measure / .course / .wide` | `42 / 34 / 68 / 82rem` | prose · one question · a page · a board |
| `radius.card / .pill` | `12px / 999px` | containers · genuine pills only (a toggle, a dot) |
| `shadow.card / .elev` | one step each | a card at rest · something that floats |

`body` is `bg-canvas text-ink` from `@layer base`, so no page sets its own surface; page padding is
set once in the root layout, so no page sets its own gutters either.

### Type

| Size | Spec | Where |
| --- | --- | --- |
| `4xl` | 2.4rem / 1.10 | the home headline, nowhere else |
| `3xl` | 2rem / 1.18 | document titles |
| `2xl` | 1.625rem / 1.28 | page title |
| `xl` | 1.375rem / 1.40 | section head, level title |
| `lg` | 1.1875rem / 1.65 | activity title, lead-in |
| `base` | 1.0625rem / 1.70 | **the reading size** |
| `sm` | 0.9375rem / 1.60 | secondary copy, rows, options |
| `xs` | 0.8125rem / 1.45 | labels, metadata |

System fonts only (0 webfont bytes). `tracking-snugish` (-0.01em) on display sizes; no uppercase
kickers with wide tracking — the same label at `text-xs text-ink-500` in sentence case does the job
at a fraction of the visual volume. Text on tinted surfaces uses the ramp (`ink-600`, `ink-700`),
never an opacity grey, because an opacity value changes meaning with the surface under it.

## Primitives, and the one job each does

`Button` (4 looks × 3 sizes, `min-h` 36/44/48, `loading` keeps width so the row never jumps) ·
`Card` (`plain` grouping · `ring` interactive · `focus` the single panel that carries the next step ·
`outline` for a sheet) · `Label` (metadata, no colour) · `Pill` (a state, one dot) ·
`SectionHead` (the only section header: 2rem of air, a `border-t` when it is not the first thing) ·
`ProgressBar` (1px navy on an `ink-100` rail) · `StatBlock` (a number on the page, not a number in a
box) · `StreakFlame` (static; "at risk today" says it in words) · `RankChip`, `Stars` (gold) ·
`LockNote` (the paid-door copy, one shape everywhere) · `Spinner`, `Skeleton`, `XpFloat`, `Naira`.

`linkClass` is exported as a *class*, not a component, so pages keep `next/link` prefetch and the kit
stays router-free. `Chip` is **deleted**, not restyled: the name was how a badge ended up on every
label in the app, so removing it is what keeps them out.

## How a level is staged

`/learn/[slug]/[n]` builds a queue of stages from the section kinds —

`Read → Practise → Check → Case study → Review → Finish`

— and shows one at a time. `Read` is itself one section (with the diagram that belongs to it) plus a
step counter; a toggle gives the whole manual at once to anyone who prefers it, which keeps deep
links and printing honest. The rail above the stage is real buttons with `aria-current`, the position
is kept in `?stage=`, and the stage change is announced once to the screen reader and never to a
toast. `Check` is one question per screen, with the marks still computed on the server. `Finish`
lists the three things the API requires before the level can close, in words, instead of failing with
a 409 — so "why can't I close this?" is a sentence on the page rather than a guess.

Two screens that used to be card-festivals follow the same shape: `/courses/[slug]` puts the access
panel first in the DOM and the syllabus second with underline tabs; `/dashboard` is one continue
panel, four numbers on a `border-y` band, one quest line, and hairline lists.

## What this did not change

No API route, no content schema, no award rule, no payment flow. XP, streak maths, ranks, badges,
the daily cap, the ad placements, and the leak model (answers never leave the server) are exactly as
`README.md` and `docs/GAP-ANALYSIS.md` describe. This is a change to how the same product is
presented, so the verification is a compile, the route walk, and the corpus gates — not a migration.
