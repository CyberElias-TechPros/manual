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

1. **The reading is the product.** Anything that competes with it — a coloured panel, a looping
   animation, a card border around a paragraph — costs more attention than it returns. (The
   academy's decision of 2026-10-29 changed what this rule *excludes*: ads and game furniture are
   now wanted everywhere. What it still forbids is a competing visual language — see
   "Money and the game" below, which lists the lines that survived.)
2. **Data and attention are both scarce.** No webfont bytes, no animation loops, no image that is
   only decoration, no second call to action on a screen. A sponsored band is exempt from "no
   looping" only in the sense that it is static; it is still one block, not four.

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
   `prefers-reduced-motion`. The one later addition is the bonus wheel's landing (`packages/ui/
   game.tsx`): a 2.6 s transition that runs once and stops, and is skipped entirely for reduced
   motion, where the prize is simply printed — the turn is decoration, the number is information.
4. **Containers are earned.** Spacing and a hairline separate sections; a box appears only where
   the learner acts (`Card variant="ring"`). Lists of comparable things — courses, receipts,
   certificates, levels — are hairline rows, never grids of cards.
5. **One solid CTA per view.** Everything else is a quiet text link (`linkClass`), so the eye finds
   the action without hunting for it.
6. **Type leads, and it leads heavily.** 17px on 1.7 at a 42rem measure for anything read; weight and
   size carry hierarchy, colour carries meaning. On 2026-10-29 the academy asked for type that is
   visibly bold rather than thin, and the answer was one edit in the preset rather than two hundred
   in the pages: the weight aliases in `packages/config/tailwind-preset.cjs` are shifted up a notch
   (`normal`→500, `medium`→600, `semibold`→700, `bold`/`extrabold`→800, `black`→900), and
   `globals.css` sets the body to `font-medium`. So a class that still *reads* `font-semibold` in a
   template paints 700, and the base paragraph is 600 — heavier everywhere, no new class names, and
   a documented one-line way back. (Renaming 300 files to `font-bold` would have made the doc and the
   code disagree, which is the failure this file exists to prevent.)
7. **One recommendation per list.** A catalogue row plus a nudge, not a wall of numbers — and the
   scoring is furniture, not a gate: nothing a learner is owed is withheld for not engaging with it,
   and every number shown is one the API already decided. Since 2026-10-29 the game layer lives in
   the header on every signed-in screen (`XpHud`: streak, rank bar, total) rather than only on
   `/dashboard`, `/profile` and the completion screen; the "ignore it and lose nothing" half of this
   rule is what the change was measured against, and it still holds.
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

## Money and the game — the decision of 2026-10-29

The academy chose two things that this document used to argue against, and the honest way to record
that is to say what changed and what did not. **Payments are paused** (`ACCESS.mode = 'free'` in
`packages/config`): every level opens without a payment, while course cards still print the ₦ fee and
a line saying why it is not being taken. `apps/api/src/money.ts`, the checkout screens, the payments
table and the admin approval queue are all still there and unused — flip `CEA_ACCESS_MODE=paid` and the
same code gates again, with no migration.

**Ads are everywhere now.** The old promise was "never inside a quiz or a lesson body, never above the
fold on mobile, at most two per view". The placement list is now the whole app — 26 named placements (29 slot instances across 18 files), a
band after `<main>` on every route, slots between stages, after a question, beside a completion — and
`ADS.policy.forbidden` is deliberately empty, which is a decision rather than an oversight. Four lines
survived, and they are the ones the code enforces:

| Surviving line | Where it is enforced |
| --- | --- |
| at most `ADS.policy.maxPerView` (8) slots in one view, and every slot's name is a placement that exists | `tools/ad-budget.mjs`, in `pnpm test` — a per-file census of `<AdSlot placement="…">`, plus "nothing is on both lists" |
| a learner on Data Saver sees nothing at all | `adAllowed` in `packages/ui/shell.tsx`, and `useDataSaver` |
| the sponsored band sits *after* the content in the DOM, so the lesson is still the first paint and the skip link still lands on the content | `apps/web/src/app/layout.tsx` |
| an ad never sits between a submitted answer and its verdict | the slot in `packages/ui/quiz.tsx` is under the answer box, and the comment there says so |

An empty ad box looks broken, so an unapproved network renders `HouseAd` — a real promo card picked by a
hash of the placement name. Never `Math.random()` and never a clock: the server and the first client
render must agree, or the page jumps under the learner's thumb. Three slots on one page pick three
different promos, which is what makes it read as a layout instead of litter.

**The game got loud; the arithmetic stayed where it was.** Every number a learner sees is decided by the
API: `award()` mints XP behind idempotency keys, the wheel's prize is `spinRoll(user, day, n)`, a combo
is measured from the marked answers, the show-up bonus is counted from today's awards. No route accepts
a client's claim of any of it, and `xpFor` honours a caller's `points` for `spin` and `combo` only,
because those two are per-learner draws — `/learn/*` never passes the field. `XP.dailyCap` (600) is the
brake on all of it, and `tools/leak-audit.mjs` still fails CI if an answer key rides into a learner
bundle.

What did **not** change is the shape of the product: one stage per screen, one solid CTA per view,
containers earned rather than decorated, hairline lists, the reading measure, the ink ramp instead of
opacity greys, and gold meaning "you earned this" — which is exactly why the streak squares, the
level-up card and the wheel's rare wedge are allowed to be gold.

## Plain English

`content/<slug>/session-NN.md` is the extraction from the trainers' PDFs and stays auditable as such. On
the way into the build, `packages/content/src/plain.ts` runs the plain-English pass defined by
`content-plain/plain-pass.json`: hard formal words become everyday words, every acronym is spelled out in
words the first time a level says it, and the level carries a short glossary strip of the terms that stay
because they are the subject (`LevelGlossary`, above the reading, capped at 12). The pass never touches
fenced code, inline code, headings, table rows, or a word shaped like an identifier — a renamed
`generate_report()` is a wrong instruction, which is worse than a hard word. A definition is held to the
rule it exists to serve (at most 20 words, no word the table itself calls too hard, no unspelled acronym
inside it) by a lint gate, so the file can be edited by a trainer without a reviewer.

## Audits this repo cannot run

The rules above are checkable by eye, but three of the academy's acceptance criteria want a browser,
and neither this repo's CI nor the sandbox it is built in has one. Stated plainly so a green check is
never read as more than it is:

| Wanted | What runs today, in CI | Still open |
| --- | --- | --- |
| axe-core a11y ≥ 90 (10.5) | `node tools/a11y-scan.mjs` — every accessibility rule that is visible in server-rendered HTML: accessible name on each `a`/`button`, one `<main>`, one `<h1>`, no skipped heading level, every control labelled (a placeholder is not a label), no focusable control inside `aria-hidden`, unique `id`s, `rel~="noopener"`, `role="button"` reachable by keyboard. 31 pages, walked logged in as a learner. | contrast ratio, focus order, live-region announcement timing — anything that needs computed style or a real DOM. Run axe/Lighthouse against the deployed URL. |
| Lighthouse, Core Web Vitals (9.1) | `tools/assert-bundle-size.mjs` (87.2 kB shared First Load JS, ceilings asserted), and the ink-over-canvas ramp: contrast is a token decision, so a page cannot fail it on its own | field data on the network learners actually use |
| the ad policy and the plain-English table (8.x, 11.x) | `tools/ad-budget.mjs` (placements, per-view ceiling, no name on both lists) and the `plain-definition` check inside `pnpm content:build` — both in `pnpm test` | whether the copy actually reads simply to a first-week learner: that is a human call, and so is the two-question gap that has no key |
| Playwright E2E (10.3) | `tools/route-walk.mjs` (36 routes: status, content marker, no answer-key pattern) and `tools/smoke-api.mjs` (59 API assertions through the same handlers the Worker runs, derived from config so they hold in free mode and in paid mode alike) | hydration, the offline queue, the receipt-upload widget |

The left column is not a substitute for the right one; `docs/ROADMAP.md` keeps those rows 🔶 rather
than ✅ for exactly this reason, and GATE 10 stays open until a deployed URL exists to measure.
