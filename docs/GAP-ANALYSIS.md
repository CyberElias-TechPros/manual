# CEA LEARN — Gap analysis

**What this document is.** `README.md` (PARTS A–G) is the spec: it was written before any
code existed, and it is very good at naming features. It is much quieter on the questions
you only meet while building — the "how exactly", "who says", "what happens when" holes.
This file lists every one of those holes I found, what was decided, and where the decision
now lives in code so it cannot drift.

Method: I read the README end to end (1,394 lines), then audited the repository against it
— `ls` every claim in PART B, then read the 16 course manuals' shared structure (frontmatter,
sections A–O, fee tables, assessment rules) that PART B says the app is built on. Anything
the README asserted, implied or omitted, and that the code had to answer anyway, is below.

**Legend** · `CODE` = closed in code + tests · `DOC` = closed here/at `docs/DEPLOYMENT.md`
· `OPEN` = deliberately not closed, and what is needed to close it.

---

## 1. Claims in the manual that the repository did not support

| # | README claim (PART B) | Reality at the start of this build | Status |
|---|---|---|---|
| 1 | **B2** "141 session lesson notes (`Session_01.md` …) exist, ready to parse" | There were **no markdown files anywhere**. The corpus existed only as 48 PDFs (`*_Teaching_Manual.pdf`, `*_Full_Course.pdf`, `*_Summary.pdf`) in the 16 course folders. Phase 2's "2.2 read all 141 `Session_*.md`" was un-buildable as written. | `CODE` — `tools/pdf-extract/extract.py` (pymupdf, span-geometry reconstruction) produces `content/<slug>/session-NN.md` for all 141 levels + `course.json`. The parser then reads what it wrote. |
| 2 | **B3** "141 SVG concept diagrams, one per session, CEA-branded" | No diagram files of any kind. The figures are vector art *inside* the PDFs. | `CODE` — the extractor clips each level's figure page to a PNG (`content/assets/concepts/<slug>/session-NN.png`, 139 of 141) and writes transcript + hotspot geometry from the same page. |
| 3 | **B4** "64 stock photos (local) in `_shared_images/`, referenced per session" | `_shared_images/` did not exist. Zero learner-facing photos. | `OPEN` — nothing depends on them; the lesson layout was designed around text + clipped figures. If the photos surface later, they drop into `content/assets/photos/` and `DiagramView`'s sibling needs no schema change. |
| 4 | **B6** "48 Mermaid diagrams embedded in lesson §F" | No mermaid blocks in any manual. §F contains fenced code (Excel formulas, JS, HTML) — which the app *does* render and re-uses for `CodeBlanks` (6.3). | `CODE` (deviation) — item 2.7 (pre-render mermaid to save ~300 KB) became "no mermaid runtime is shipped at all", which is the same win with less risk. |
| 5 | **B5** "16 SVG course covers" | Not present. | `CODE` — authored as `content/assets/covers/<slug>.svg` (brand navy/gold, category, level count). |
| 6 | **B12** "`cealogo.png` — the app's brand anchor" | Not present as a file; the logo exists only as a vector on the PDF covers. | `CODE` — `extract.py` pulls the cover drawing into `assets/cealogo.png`; the catalogue covers are authored in SVG, the PWA icons in `apps/web/public/icons/` were made from the raster, and the top-bar mark is inline SVG so no page load pays for a 737 KB file. |
| 7 | **7.1 fee example** "Typing & Computer Basics ₦15,000" | The Typing manual's own fee table says **₦20,000**, and the other 15 courses disagree with any single-number rule too (₦20k–₦50k). | `CODE` — fees are read from each manual into the bundle, and `DEFAULT_FEES_NGN` in `@cea/config` now matches the manuals exactly (it is only the fallback when `course_pricing` and the bundle are both silent). |
| 8 | **Phase 5.4** "rank thresholds: Rookie 0 / Agent 500 / … / Legend 25000" + "XP: read 10, quiz 20 …" | Internally consistent, but **nothing said what earns a "read"** — "+10 XP for reading a session" is unimplementable as written. | `CODE` — see §2.1. |
| 9 | **Phase 8.x** "AdSense + ngAdverts; never mid-quiz or mid-paragraph" | No placements list, no consent story, no fill/no-ad behaviour. | `CODE` + `DOC` — see §3.5 and §5.3. |
| 10 | **Phase 11.x** "refund policy, data retention" | Mentioned nowhere. The course PDFs promise a certificate and say nothing about refunds or retention. | `CODE` — see §4.2/§4.3, stated on `/terms` and `/privacy`. |

---

## 2. Behaviour the spec left undefined (each one had to be *invented* and defended)

### 2.1 What counts as "reading a level" (+10 XP)
The obvious implementation (scroll events per section) is trivially farmable and punishes
slow readers. Shipped rule, in `apps/api/src/routes.ts` + `packages/ui/shell.tsx`:

* the browser marks a section **read** when it is the majority-visible section for ≥1.2 s
  (`IntersectionObserver`, one `POST /api/learn/section` per letter, never repeated);
* the server awards `XP.lessonRead` once, when
  `seen ≥ max(2, ceil(0.6 × learner-visible sections))` — 60 % of the sections a learner is
  actually shown, so instructor-only blocks never count toward it;
* `deltaSec` is recorded but **not** required: a learner with a screen reader or a slow
  connection is not penalised, and the award cannot be bought by idling because it is
  keyed per (user, level) and is capped by `XP.dailyCap`.

### 2.2 Anti-cheat limits, with numbers
`RATE_LIMITS` in `@cea/config` (README 3.7 asked for "rate limiting", never gave figures):
register 5/h/IP, login 8/15 min per email **and** per IP, forgot-password 5/30 min,
quiz 20/5 min, exercise 30/5 min, notes 60/5 min, uploads 12/20 min, payments 10/30 min.
`XP.dailyCap = 300` (a full day of honest study is ~4 levels ≈ 280 XP),
`XP.minCompletionSeconds = 45`, and a quiz submitted in under 3 s with >2 questions is
rejected as `too_fast`. `devHeadroom` multiplies the windows in `development` so the test
suite exercises the same code without tripping it.

### 2.3 What "exercise graded" means when nobody is awake
`POST /api/learn/exercise` returns the model answer + rubric on first submission and awards
`XP.exerciseSubmit` once. Prose is machine-scored in `scoring.ts`
(`0.55 × keyword coverage + 0.45 × figure match`, ≥0.75 = correct, 0.5–0.75 = "a tutor can
confirm", floor 0.4 for ≥12 on-topic tokens). The self-score in the UI is a **reflection**
control, not the mark: XP never depends on what the learner awarded themselves.
`OPEN`: there is no tutor inbox — a "needs a human mark" flag has nowhere to go yet. It is
recorded in `exercise_submissions` and visible in `/admin/users` per learner; a queue is a
Phase 12 item.

### 2.4 Search scope for a locked course
README 4.11 says "search inside enrolled courses" and "search the free preview" without
saying what a locked learner sees. Shipped: results are drawn **only** from level 1 of any
course the learner is not enrolled in (title + text of that level), and hits in
non-enrolled courses carry `locked: true` with no snippet — so search never becomes a way to
read a paid level for free, and still gives a browser something to click.

### 2.5 Who can be an admin, and how the first one appears
`POST /api/auth/register` hard-codes `role='learner'` (there is no "make me staff" hole), and
`PATCH /api/auth/me` cannot touch `role`. The first admin is created out of band:
`node tools/seed.mjs --promote <email>` (dev/demo) or `wrangler d1 execute … UPDATE users SET
role='admin'` (production). Admin routes also accept `x-cea-admin-key` = `ADMIN_KEY` for
scripts. `OPEN`: no UI for promoting a second admin yet — it is a one-row SQL change.

### 2.6 Guest passes and the merge
`POST /api/auth/guest` mints an anonymous account (`@guest.invalid`, no password) so a
curious learner can start before committing. `register` accepts a `guestId` and
`mergeGuest()` moves progress/XP/badges/notes across, then deletes the guest row;
`/settings` also offers `POST /api/auth/upgrade` for the same thing from the guest session.
Guests are excluded from leaderboards, cannot receive email, and their certificates are not
issued (they cannot prove who they are).

### 2.7 Ten levels have no answer key in the source PDFs
`content/**` lint reports `answer-missing` for 10 levels (e.g. `data-entry/session-06`,
`web-design/session-12`): the manual prints the questions but its answer table is missing or
scanned shut. Rather than invent an answer, scoring now **excludes** unkeyed questions from
the denominator and shows *"Unscored — your course manual has no answer key for this one, so
a tutor reads it"* (`apps/api/src/scoring.ts`). A learner can therefore never be failed by a
hole in the source document, and the app never grades on a guess.
`OPEN`: the correct long-term fix is for the academy to publish the missing keys, then
`pnpm content:build` picks them up.

### 2.8 Two levels have no figure in the source
`social-media-management` levels 8 and 9 genuinely have no diagram page in the manual.
Instead of shipping a level with no visual, the build synthesises one from the level's own
procedure (`packages/content/src/build.ts → flowDiagram`), rendered by `DiagramView` as
numbered boxes. It costs zero bytes, is legible at any size, and its transcript *is* the
picture, so the accessibility note cannot drift from the image. Levels with a clipped figure
are unchanged.

### 2.9 What is cached offline, for how long
`apps/web/public/sw.js`: network-first for navigations (so a learner never gets a stale
shell), cache-first for `/assets/**` and `/api/courses/*` GETs (immutable per build), a
`/offline` fallback page, and a background-sync tag for the mutation queue. The queue
(`packages/ui/shell.tsx`) keeps at most 40 mutations, drops ones the server rejected with a
4xx (the learner must see why), and retries the rest on `online`.
`OPEN`: no periodic revalidation of the lesson cache — a content rebuild changes the URL only
if the bundle version changes, so a stale level can survive one app launch. A build-time hash
in the index (`version` field exists, unused by the SW) is the fix.

---

## 3. Product and business holes

### 3.1 Payments: no gateway, and what that implies
v1 is manual bank transfer (Delgra Ltd · 6674684361 · Moniepoint MFB): intent → learner
transfers → uploads a receipt → admin approves → `grant()`. Documented consequences the README
did not state: **nothing is time-limited** (a pending intent stays pending until a human
touches it), there is **no automatic reconciliation** against the bank statement (the CSV at
`/api/admin/payments.csv` is the reconciliation artefact), and a transfer for the *wrong
amount* is handled by the admin editing `amount_ngn` at approval (the UI exposes exactly that
field), not by a second payment.

### 3.2 Refunds
Not in the README at all. Now: **7 days from approval, and only while level 3 of that course
is still locked** (`PAYMENT.refundWindowDays`, `refundCondition`), requested by email with the
reference. Enforced by nothing in code — it is a human policy with a stated number, which is
the honest state for a manual payment rail. `OPEN`: to *pay a refund out* the academy needs the
learner's bank details, which the app does not collect; the refund conversation happens by
email and is recorded in the audit log by hand.

### 3.3 Retention and erasure (NDPR)
`/privacy` states: account + progress + notes are deleted/anonymised on request
(`DELETE /api/auth/me`), payment receipts are kept **90 days** for tax/AML
(`PAYMENT.retentionGraceDays`), certificates keep their code+name in the verification register
indefinitely (an employer must be able to check a five-year-old document), and data
portability is a button (`GET /api/auth/me/export` → one JSON file, no ticket).
`OPEN`: the 90-day receipt deletion is a **manual** step today; a cron is specified in
`docs/DEPLOYMENT.md` §6 but not written.

### 3.4 Certificates were a "v2 backlog" item, but the courses promise one
Every manual says a certificate is issued on completion; the README postponed certificates.
Shipping nothing would have made 16 paid courses promise something the product refused to
give. Shipped v1-lite: server-issued code (`certificateCode()`), grade from the levels' quiz
averages (Distinction ≥90 / Merit ≥80 / Pass), an A4 printable sheet
(`/certificate/[code]`, print CSS in `globals.css`), and a public verifier
(`/certificates/verify`) that returns name, course, grade, date and nothing else.
`OPEN`: no signed PDF, no QR, no issuer of record in the academy's own letterhead.

### 3.5 Ads: consent, filling, and "never mid-quiz"
* `ADS.policy.allowedPlacements` is the only list an ad can use
  (`home-top, home-mid, course-bottom, lesson-bottom, dashboard-side, leaderboard-side,
  certificate-side`) — `AdSlot` refuses anything else, so a future contributor cannot place
  an ad inside a quiz without changing the policy object.
* No CMP is wired. In Nigeria that is fine; for the diaspora learners AdSense's own
  consent message is expected to cover EU traffic. `OPEN`: confirm with the AdSense account
  owner before launch (a real compliance task, not a code task).
* What happens when no ad fills: the slot collapses to nothing (no empty grey box), and the
  `blocked` event counter in `/api/ads/event` lets `/admin` see policy rejections.

### 3.6 Pricing psychology the README skipped
Level 1 of every course is free — but the app also had to decide *when* to show the paywall.
Shipped: the paywall appears (a) on the course page after the free level, (b) as a `402`
`LockNote` when a locked level is opened, (c) never inside a quiz or after a correct answer,
because a learner who just earned XP is being punished for learning.

---

## 4. Engineering gaps

### 4.1 One route table, two runtimes
The API is a Hono app (`apps/api/src/app.ts`) mounted twice: a Cloudflare Worker
(`worker.ts` → D1/KV/R2) and Next's `app/api/[[...path]]/route.ts` (node-env → node:sqlite,
fs storage, mail-to-disk). `tools/smoke-api.mjs` runs the **same 51 assertions against both**,
which is what keeps "dev mirrors prod" from becoming a slogan.

### 4.2 Secrets in a repo that must also run offline
No secrets are committed; `JWT_SECRET` has a dev-only default (`isProduction` refuses to boot
with it), `RESEND_KEY` absent means "write emails to `var/mail`" (never "skip sending"), and
`ADMIN_KEY` is optional. `OPEN`: `wrangler secret put` + Vercel env are documented but not
performed here — they need the academy's accounts.

### 4.3 Answer keys must never reach a browser
`apps/web/.content/keys/<slug>.json` is read by the API and by server modules only; the
learner bundle has quiz `answer`s removed, exercise `modelAnswer`/`code`/`rubric` blanked,
scenario `correctId` nulled, and `codeBlanks` gap answers stripped (they ride in
`keys/` — `POST /api/learn/blank` grades them and reveals ≤2-character hints).
A leak audit over all 16 courses asserts this (`tools/leak-audit.mjs`, run by
`pnpm test`) — it found 38 real leaks when it was written, and 0 now.

### 4.4 What the leak audit caught after it was written
Making the audit a *test* (rather than a one-off script) turned up two fields that had drifted back
into the learner bundle: exercise `rubric[].marks` (the mark allocation) and case-study `resolution`
+ `correctId` (the answer to the branching question). Both are now blanked in the learner copy and
served by `POST /api/learn/{exercise,scenario}` out of `keys/` — which also fixed a live UI bug: the
case study could never highlight the correct branch after a wrong pick, because the field the
component read was always empty.

A third finding was quality rather than security: 12 questions rendered as the single word "Short".
The manuals print `2. Short Answer: <prompt>` with `Answer: …` on the following line, and the
inline-answer splitter cut at the **first** "Answer:" — which was inside the question's own type tag.
It now prefers a line-start label, and only accepts an inline one when enough text survived in front
of it to be a question (23 mangled prompts → 2, and both of those are legitimately short questions).

### 4.5 No image pipeline on purpose
README 2.9 asked for WebP/AVIF via `sharp`. `sharp` is a native optional dependency whose
postinstall is blocked by the workspace's build-script policy, and every runtime here
(Vercel serverless, Workers, CI) would need its own copy. The diagrams are pre-sized PNG
clips of PDF pages: line art where lossy WebP *hurts* and where a re-encode on request costs
CPU for nothing. So: `next/image` is not used, no optimizer runtime is deployed, and
`images` is deliberately absent from `next.config.mjs`.
`OPEN`: if photo assets ever land (§1 row 3), revisit — that is where WebP pays.

### 4.6 Typechecking a monorepo of source-only packages
`packages/*` ship `.ts` sources (no build step, `transpilePackages` in Next). Therefore
`rootDir` is off everywhere and `typecheck` is `tsc -p` per project rather than
`tsc -b` (composite emit fights source-consumption). The API's NodeNext-style `./lib.js`
specifiers are resolved in the web build via `resolve.extensionAlias`, so one set of files
serves `tsx`, Workers and webpack without an import-rewriting step.

### 4.7 Testing
Written and run by `pnpm test`: `packages/content/test/{parse,corpus}.test.ts` (17 assertions —
the A–O split, bare-heading recovery, CP1252 repair, quiz extraction from the manuals' own layout,
and a full `buildAll` pass over the corpus asserting 16 courses · 141 levels · ≥5 questions per
level · a diagram and a case study everywhere · every course priced); `apps/web/test/content.test.ts`
(6 assertions on the bundle reader, including that exactly one level per course is free);
`tools/leak-audit.mjs` (no answer-bearing field in any learner file, and no path by which
`keys/` could be served); the corpus lint gate with `--fail-on-critical`; and
`tools/smoke-api.mjs` (51 black-box assertions: auth, CSRF, locks, XP, idempotency, quotas,
uploads, payments, certificates, admin) run against both runtimes; `tools/route-walk.mjs` (35
routes fetched: expected status, a phrase that proves the page rendered *its* content, no
answer-key pattern anywhere in the HTML, and a 900 KB ceiling per page so a hydration payload
cannot silently double); `tools/assert-bundle-size.mjs` (the corpus may not shrink — 16 courses,
141 levels, ≥900 questions, ≥800k words, every course priced and every lint code non-critical). `.github/workflows/ci.yml`
runs all of it on every PR. `packages/content` has vitest unit tests for the parser/lint.
Measured where a build can measure: `next build` reports **87.2 kB of shared First Load JS** and
prerenders 45 routes, so 10.2's "initial JS < 150 KB" is a fact rather than an intention, and it is
re-checked on every PR because the build is a CI step.

Still `OPEN`: no component tests, no Playwright e2e, no Lighthouse run. LCP/CLS/INP on a real 4G
connection cannot be measured from inside this repository, and the honest claim is that the page
weight and the render path are built for it (system fonts, no ad/editor SDK on the learner path, the
free level's text inlined into the first HTML response, per-course lazy JSON) — the field numbers
come with the deployment, which is why they head the v1.1 list in `docs/ROADMAP.md`. The perf targets
(10.2: LCP <2.5 s, CLS <0.1, INP <200 ms, initial JS <150 KB, p95 API <150 ms) are met *by
construction* (system fonts, no chart/ad SDKs on the learner path, SSR'd free level, lazy
per-course JSON) but **not measured in CI** — that needs a deployed URL, so it is the first
item in `docs/ROADMAP.md`'s v2 list.

---

### 4.8 Dependency build scripts, and why `pnpm install` used to exit 1
`esbuild`, `sharp` and `workerd` all ship postinstall scripts, and pnpm ≥ 12 refuses an install whose
build-script decisions were never recorded: a fresh clone exited 1 with `ERR_PNPM_IGNORED_BUILDS`,
which is the kind of thing that quietly makes a repository un-clonable. `pnpm approve-builds
'!esbuild' '!sharp' '!workerd'` wrote the decision into `pnpm-workspace.yaml` (`allowBuilds`), with
the reason beside each entry. Nothing here needs a native build: `tsx`/`vitest` get their platform
binaries as optional dependencies, `sharp` is unused (§4.5), and `workerd` only matters for
`wrangler dev` — which `pnpm dev` replaces by running the same Hono app on Node.

## 5. Small things that still needed a decision

| Question | Answer shipped | Where |
|---|---|---|
| Which timezone is "today" for streaks? | `Africa/Lagos` for everyone, including the daily XP cap day boundary | `STREAK.timezone`, `dayKey()` |
| Streak freeze: how earned, how many? | +1 freeze every 7 consecutive days, max 2 held, spent only to bridge a 1-day gap; a 2+ day gap without one resets to 1 | `gamify.ts → rollStreak` |
| Can a learner re-take a passed quiz? | Yes, unlimited; only the **best** score and the first pass award XP (`starsFor` uses best) | `learn/quiz` |
| Perfect-quiz bonus definition | every gradeable question at full credit | `award()` `perfectBonus` |
| What does a 402 vs 403 mean? | `402` = needs payment/unapproved, `403` = access expired or suspended, `401` = sign in | `lockState()` |
| Password rules | ≥10 chars, not one repeated character, not digits-only, not on the breached list | `lib.ts → passwordProblem` |
| Session lifetime | 30 days, one row per device in `auth_sessions`, revoked on password reset/erase | `issueSession` |
| Rate-limit identity behind a proxy | `cf-connecting-ip` first, then the leftmost `x-forwarded-for` | `ipOf()` |
| What is a "level" in the URL? | `/learn/<slug>/<n>`, `n` = 1…`sessionsCount`, canonical links only | `learn/[slug]/[n]` |
| Does the app need a service worker in dev? | No — registered only in production builds | `providers.tsx` |
| What happens if the content bundle is missing? | `/api/health` reports `content:""`, pages render a clear "build the bundle" message instead of a stack trace | `content.ts`, `health` |
| Can a learner see the answer key of a question they got wrong? | Yes — in the *graded response* (`modelAnswer`, `explanation`), never in the lesson payload | `learn/quiz` |
| Animation library | None. Motion is CSS transitions + two `requestAnimationFrame` spots (XP float, award toast); Framer Motion (~45 KB) was refused because the budget in 10.2 is 150 KB of initial JS for the whole learner path | `packages/ui/styles.css`, `@media (prefers-reduced-motion: reduce)` |
| Currency format | `₦` + thousands separators, no decimals. `@cea/config` keeps an `Intl`-free `formatNgn` for the API/CSV side; the UI uses `Intl.NumberFormat('en-NG')` (already in V8, no bundle cost) | `@cea/config → formatNgn`, `@cea/ui → Naira` |
| Do ads count as clicks if the learner has Data Saver on? | The slot is not rendered at all, so there is nothing to click and nothing to bill | `useDataSaver` |

## 6. The interface was its own gap (Calm Focus)

The README specifies Phase 1 as tokens, a type ramp, breakpoints, dark mode and "gamification
visuals" — and the first build did exactly that. The result compiled, passed every gate and still
failed the thing a beginner actually needs: every screen was a grid of tinted cards, every number
was a badge, gold appeared on navigation as often as on an earned thing, and a level dumped fifteen
sections into one scroll. Nothing in the spec had asked for **restraint**, so nothing in the spec
had been violated. That is the gap: a design system without a colour-role policy, a density budget
or a staging model will be implemented literally and read as noise.

What was changed, and how it was checked:

| Before | After | Where |
|---|---|---|
| gold primary buttons, gold borders, gold nav accents | navy is the only action colour; `Button variant="gold"` is an alias to primary so a second CTA cannot be written by accident | `primitives.tsx` |
| XP, streak, rank and badge furniture on every page, flame flickering | gold only on what was earned; the flame is static and "at risk" is said in words; counters live on `/dashboard` and `/profile` | `shell.tsx`, `primitives.tsx` |
| a box per paragraph (38 `rounded-card`, tinted fills, `shadow-glow` on hover) | `Card` is flat and borderless by default; `variant="ring"` is the only treatment an interactive panel gets; lists are `divide-y` hairline rows | `catalog.tsx`, `courses`, `dashboard`, `checkout`, `certificates` |
| 15px body, 15 headings, bold everywhere, uppercase `tracking-widest` kickers | 17px/1.7 at a 42rem measure, semibold headings, sentence-case `xs` labels; opacity greys replaced by the `ink` ramp so text does not change value with the surface under it | `tailwind-preset.cjs`, 25 files |
| `animate-pulse` nodes, six looping keyframes | five one-shot keyframes (stage enter, verdict, XP float, badge pop, shake) + `shimmer` on skeletons; a blanket `prefers-reduced-motion` rule | `tailwind-preset.cjs`, `globals.css` |
| a level = one long scroll of fifteen sections | a stage queue — Read → Practise → Check → Case study → Review → Finish — one at a time, `?stage=` in the URL, rail as real buttons with `aria-current`, and a "read the whole level" toggle for deep links and printing | `learn/[slug]/[n]/lesson.tsx` |
| quiz showed all questions at once | one question per screen, `1 of 10`, back/next, submit only at the end; the marks still come from the server | `quiz.tsx` |
| `Finish level` failed with a 409 toast | the Finish stage lists the three things the API requires, in words, and the button explains what is missing | `lesson.tsx` |
| secondary actions styled as outline buttons | `linkClass` — text plus underline offset — so one solid CTA wins each view | `primitives.tsx` |
| `/styleguide` documented a palette with no roles | the page states the colour roles, measures the contrast of the pairs actually shipped, and links the rules in `docs/DESIGN.md`; `/styleguide/lab` fixtures now use the real block/Exercise/Scenario shapes (they had drifted: the lesson-block demo rendered nothing) | `styleguide/*` |
| answer cards (`bg-success/6`, `bg-gold/8`) | a `border-l-2 pl-4` rule, `Label` captions, hairline rows — activity blocks are the same shape as prose | `interactives.tsx` |

Deliberately **not** changed: no API route, no content schema, no award rule, no payment or
certificate flow, no ad placements, no answer-key boundaries. The verification is therefore a compile
plus the existing gates — `pnpm typecheck` 0, `pnpm test` (17 + 6 tests, leak audit 16/16), the corpus
lint at 0 critical, `tools/route-walk.mjs` 36/36 with new markers for the stage rail and the course
promise block, `tools/smoke-api.mjs` 51/51 against both runtimes, and `next build` (shared First Load
JS must stay ≤150 KB).
