# CEA LEARN — build ledger (ROADMAP status)

**What this document is.** `README.md` PART C is the plan: 12 phases, 110 numbered items, each
with a "Done when" clause. This file is the **ledger of what was actually built**, in the same
item numbers, with how each claim was verified. It is the document to argue with: if a row says
✅ and the code does not do it, that is a bug in this file.

Dates: built 2026-10-28, revised 2026-10-29, on branch `arena/d2855a1d-manual`.

**The 2026-10-29 decisions**, because three of them overturn rules this ledger used to record as
deliberate restraint. (1) **Payments are paused**: `ACCESS.mode = 'free'` in `packages/config` opens
every level with no payment, while the price stays printed on each course card with a line explaining
it; the payment code, tables, admin queue and emails are all still in the repo and unused.
(2) **Ads everywhere**: `ADS.policy.forbidden` is emptied and `maxPerView` raised to 8, with 26 named
placements — see §8. (3) **Gamification hard**: the XP/rank/streak HUD moved into the header on every
screen, and the wheel, combos, show-up bonus and streak calendar were added — see §5 and §11. A fourth,
softer change: the corpus now passes a plain-English pass on the way into the build — see §11.

**Status key**
· ✅ built and verified the way the item's "Done when" says
· 🟡 built, with a deviation that was decided and documented (link to `GAP-ANALYSIS.md`)
· 🔶 partial — the main path works, a stated slice is missing
· ⏳ deferred to v2 on purpose (the README's own backlog, or a business decision)
· ❌ not built
· ⚠️ cannot be verified from inside this repo (needs the academy's accounts, DNS or a browser)

**How "verified" is earned here** — not by eyeballing:
`pnpm test` = 45 Vitest cases (29 over the content pipeline, 16 in the app: parser, quiz extraction,
plain-English pass, corpus invariants, the bonus wheel, the streak calendar, the level's feedback line) + the leak audit + the corpus lint gate (0 critical);
`pnpm typecheck` = 4 projects; `next build`; `tools/route-walk.mjs` = 36 routes fetched and asserted
(status, a page-defining phrase, no answer-key pattern in the HTML, a size ceiling);
`tools/a11y-scan.mjs` = 31 rendered pages scanned for names, landmarks, headings, labels, ids;
`tools/assert-bundle-size.mjs` = the corpus may not shrink; `node tools/smoke-api.mjs` = 53
black-box HTTP assertions run against both runtimes.

---

## Phase 0 — foundation

| item | what it asked for | status | where / how verified |
|---|---|---|---|
| 0.1 | pnpm monorepo, 5 workspaces + tools | ✅ | root `pnpm-workspace.yaml`; `apps/web`, `apps/api`, `packages/{ui,content,config}`, `tools` |
| 0.2 | Next.js 14 App Router + TS + Tailwind, `build` passes | ✅ | `apps/web`; `next build` green |
| 0.3 | Worker API on Hono + D1 + `/api/health` | ✅ | `apps/api/src/{worker,app,routes}.ts`; health returns `{ok:true,db:"up"}` in both runtimes |
| 0.4 | repo, `.gitignore`, branch model, conventional commits | 🟡 | repo + `.gitignore` (bundle/`var`/generated assets excluded); no `main`/`dev` split enforced and commits are not linted — one-person repo, revisit at handover |
| 0.5 | secrets in Vercel + `wrangler secret` | 🔶 | no secret is committed; `JWT_SECRET` refuses dev defaults in production; **the real values are not set** (needs the accounts) → `DEPLOYMENT.md` §2 |
| 0.6 | CI: lint+typecheck+build on PR, main deploys | ✅ (work) / ⚠️ (observed) | `.github/workflows/ci.yml` — content build, corpus gate, typecheck, tests+leak audit, `next build`, 53-assertion smoke, size floor; deploy jobs skip until `CEA_DEPLOY_ENABLED` |
| 0.7 | `learn.cea.ng` → Vercel, API → Worker, HTTPS | ⏳ | DNS + project creation belong to the academy; runbook written (`DEPLOYMENT.md` §3–5) |
| 0.8 | Sentry + structured logs | 🔶 | every API response carries a structured log line (`log()` in `routes.ts`) and `/api/admin/audit`; no Sentry tenant |
| **GATE 0** | both apps deploy green; test error visible | 🔶 | both run locally green; deployment ⏳ |

## Phase 1 — design system

| item | status | note |
|---|---|---|
| 1.1 brand tokens → Tailwind | ✅ | `packages/config/tailwind-preset.cjs` — the Calm Focus set: navy is the only action colour, gold only for earned things, an `ink-900→50` neutral ramp, `canvas` surface, `maxWidth{reading 42rem, measure 34rem, course 68rem, wide 82rem}`, one elevation step, five one-shot keyframes. Roles and numbers are written down in `docs/DESIGN.md` |
| 1.2 typography scale | ✅ | the ramp is defined once in the preset (17px/1.7 body, 42rem measure ≈ 66 characters; `xs`→`4xl` documented in `docs/DESIGN.md`), system fonts only, `text-balance`/`text-pretty`, and `.cea-prose` gives the long documents the same rhythm as a lesson. No uppercase `tracking-widest` kickers anywhere in the learner flow |
| 1.3 `packages/ui` component lib | ✅ | `primitives` (Button, Card `plain/ring/focus/outline`, Label, Pill, SectionHead, ProgressBar, StatBlock, StreakFlame, RankChip, Stars, LockNote, Spinner, Skeleton, XpFloat, Naira + `linkClass`), `blocks` (BlockList/BlockView/DiagramView/SectionRail/Prose), `interactives`, `quiz`, `catalog` (CourseRow/CourseRows), `session-map`, `shell`. **No Modal/Tabs/Accordion/Input** on purpose: disclosure is native `<details>`, dialogs are native `<dialog>`, form controls are page-local — one less dependency and no JS for a fold, which is what 10.x actually wants. **`Chip` was deleted from the kit**, not restyled — every page now says `Label` (metadata) or `Pill` (a state), and the old name is gone so a badge-on-everything reflex cannot come back through an import |
| 1.4 gamification visuals | ✅ | XP bar (1px rail), streak (static flame; "at risk today" in words), rank emblem, stars per level, map node states, `XpFloat`. Kept out of the reading: the global bar carries one quiet streak line, the nav carries no counters, and the numbers live on `/dashboard` + `/profile`. **No confetti library** — the completion moment is the float + one toast, on purpose (10.2 budget) |
| 1.5 Lucide icons + empty-state illustrations | ✅ closed as a decision | No icon library, by design: the kit ships nine hand-written inline SVGs (brand mark, nav, flame, star, the map markers) and empty states are a sentence plus one link, which is what 10.2's budget and a 3G phone both prefer. `lucide-react` was declared in two `package.json` files and imported by neither — removed from both, so the reflex cannot come back through a stale dependency |
| 1.6 breakpoints + dark mode | ✅ | `ThemeProvider` (class strategy, system default, persisted), Tailwind breakpoints, `dark:` on every component |
| 1.7 motion presets, `prefers-reduced-motion` | ✅ | five keyframes, all one-shot (stage enter, verdict, xp-float, badge-pop, shake-x) plus `shimmer` only on skeletons; nothing loops. A blanket `@media (prefers-reduced-motion: reduce)` rule in `globals.css` neutralises the CSS transitions and the two `requestAnimationFrame` spots check the media query in JS. **Framer Motion not adopted** (≈45 KB against a 150 KB shared budget) |
| **GATE 1** | ✅ | `/styleguide` (colour roles with the contrast ratio measured on the pairs shipped, the type ramp, the layout/staging rules) + `/styleguide/lab` (every component in its real states, using the real content shapes) |

## Phase 2 — content pipeline

| item | status | note |
|---|---|---|
| 2.1 TS schema | ✅ | `packages/content/src/schema.ts` — `Course`, `Session`, `Section(kind A–O)`, `Quiz`, `Question`, `Exercise`, `Scenario`, `Diagram(+flow)`, `Rubric`, `Block`, `LintIssue` |
| 2.2 parser: split `## A.`…`## O.` → typed JSON | 🟡 | There were **no `Session_*.md` files** (GAP-ANALYSIS §1.1): `tools/pdf-extract/extract.py` writes them from the 48 PDFs, then `parse.ts` does the A–O split — including the bare-letter recovery some manuals need. 141/141 levels parse |
| 2.3 quiz extraction with answer + explanation | ✅ | 991 questions (695 short-answer, 175 MCQ, 69 code, 32 true/false, 20 fill-in) from §M; ≥5 per level in every course; keys separated into `keys/`. The corpus test asserts the floor |
| 2.4 exercise extraction (prompt + model answer) | ✅ | 422 exercises with model answers/rubrics in keys; learner copy keeps criteria, marks nulled |
| 2.5 case-study extraction | ✅ | 141 scenarios (one per level) with situation, facts, options, per-option feedback |
| 2.6 diagram resolver, error on broken refs | 🟡 | 139/141 levels carry a PNG clipped from the manual (transcript + hotspots included); 2 levels have no figure in the PDF, so the build synthesises a flow diagram from the level's own procedure. Lint still fails a **missing file** reference |
| 2.7 pre-render 48 Mermaid blocks | ❌ n/a | No mermaid exists in the source; §F is real code. Nothing to pre-render, nothing gained |
| 2.8 content lint gate | ✅ | `lint.ts` (missing outcomes, quiz-thin, broken/dangling image refs, mojibake, naira format, unclosed fence, short lines, repeated heading…). Today: **0 critical · 1 warn · 1 info** — the whole report is the two questions whose answers are broken in the PDFs (GAP-ANALYSIS §2.7); `--fail-on-critical` in CI |
| 2.9 asset optimization via sharp/WebP | 🟡 refused | No image pipeline (native dep, no visual gain on line-art clips); diagrams are pre-sized PNGs and served from the same origin, cached forever. GAP-ANALYSIS §4.5 |
| 2.10 per-course lazy-loaded JSON | ✅ | `.content/courses/<slug>.json`; home/catalogue read only `index.json`; `useApi` fetches a course on demand |
| 2.11 level 1 free, rest locked | ✅ | `isFree: number===1` + `assertAccess` → HTTP 402; the web test asserts exactly one free level per course |
| 2.12 seed content index into D1 | ✅ | `.content/seed.sql` (141 `session_index` rows + 16 courses) applied by `tools/seed.mjs` |
| 2.13 hot-reload for content edits <10 s | ✅ | `pnpm content:watch` rebuilds; the reader caches by mtime, so a rebuild is picked up without a restart |
| 2.14 Part-1 course metadata (the promise line) | ✅ | `problem`/`audience`/`entry_requirements` are extracted from each manual's Course Design Document and cleaned of PDF page furniture in the tool, not the UI — `tools/pdf-extract/extract.py --meta-only --only problem,audience`, `--clean-lists`; `corpus.test.ts` asserts all 16 courses keep a complete, uncropped promise (`docs/GAP-ANALYSIS.md` §4.9) |
| **GATE 2** | ✅ | 141 levels as validated JSON with quizzes, green lint — now an executable test (`packages/content/test/corpus.test.ts`) |

## Phase 3 — auth & accounts

| item | status | note |
|---|---|---|
| 3.1 D1 schema (users, sessions, roles) | ✅ | `apps/api/migrations/0001_init.sql` (14 tables, indexes); `auth_sessions` row per device |
| 3.2 register, hash password, welcome email | 🟡 | Validation + `pbkdf2-sha256` (210k iterations) instead of argon2: WebCrypto has no argon2/bcrypt and a WASM hash would break the Worker's CPU budget; strength meter + `passwordProblem()` rules; welcome mail via Resend (or `var/mail/` in dev) |
| 3.3 login / logout / `GET /me` | ✅ | httpOnly, SameSite=Lax, Secure in prod, 30-day JWT in a cookie + server-side revocation |
| 3.4 password reset | ✅ | single-use token, 30-min expiry, consumed on use, all sessions revoked |
| 3.5 guest mode | ✅ | `POST /api/auth/guest` + `mergeGuest()` on upgrade; guests can read free levels, do not appear in leaderboards |
| 3.6 profile page | ✅ | `/profile` (badges, courses, data tabs), `/settings` (prefs, password, erase, export) |
| 3.7 admin role + guarded routes | ✅ | `/admin/*` with a gate component + server checks (`role='admin'` or `x-cea-admin-key`); register/PATCH cannot set role |
| 3.8 hardening (rate limit, enumeration, CSRF, cookies) | ✅ | KV-backed sliding windows with per-IP+per-email login limits, identical 401 for wrong user/password, double-submit CSRF on every mutation, secure cookie flags |
| 3.9 email templates | 🔶 | welcome, reset, proof received, approved, rejected (with reason), streak-at-risk nudge, weekly digest — sent via `mail.ts`; **no HTML design pass** (plain, branded text) |
| **GATE 3** | ✅ | register → confirm → log in → reset → delete account is in the smoke suite (53 assertions) |

## Phase 4 — reading & progress

| item | status | note |
|---|---|---|
| 4.1 shell + nav + breadcrumbs | ✅ | TopBar (brand, rank, streak, XP, menu), BottomNav on mobile, breadcrumbs on course/lesson |
| 4.2 catalogue + filter + search | ✅ | `/courses`: 16 cards (cover, blurb, fee, certificate, levels), category filter, `?q=` search, data-saver chips |
| 4.3 course detail | ✅ | hero, blurb, outcomes/tools/audience/bring-with-you, full level list with states, Start/Resume, JSON-LD |
| 4.4 mission/level map | ✅ | `SessionMap` winding path, lock/star/complete states, capstone node styled |
| 4.5 lesson renderer A–O + jump rail | ✅ | `BlockList` (headings, paragraphs, lists, tables, code, callouts, images, diagrams) + `SectionRail` sticky menu |
| 4.6 granular progress + resume | ✅ | opened/section-read/completed/quiz-best/time-spent; "continue where you left off" on dashboard and lesson header |
| 4.7 completion screen | 🔶 | award animation, streak update, next-level unlock, "what you unlocked" — **no confetti** (1.4 note) |
| 4.8 data-saver mode | ✅ | `useDataSaver` + setting; defers diagram images, kills ads, trims animation, text-first |
| 4.9 PWA offline + background sync | 🔶 | installable manifest, SW shell + content cache, mutation queue replayed on `online`; **no periodic content revalidation** (GAP-ANALYSIS §2.9) |
| 4.10 bookmarks + notes per section | ✅ | `POST /api/learn/{blank}`-adjacent note/bookmark endpoints, per-letter anchors, UI in the rail |
| 4.11 search inside content | ✅ | per-course TF-IDF client index + `/search` (enrolled scope; free-level scope otherwise) |
| **GATE 4** | ✅ | offline read of a visited level + queued progress: manual check + smoke assertions |

## Phase 5 — gamification

| item | status | note |
|---|---|---|
| 5.1 XP rules + ledger | ✅ | `XP` in `@cea/config` (read 10, quiz 20, perfect +10, exercise 15, complete 25, streak day 5 / week +50, badge 25) and an `xp_ledger` with a per-award `key` |
| 5.2 rank ladder | ✅ | Rookie 0 → Agent 500 → Specialist 1500 → Pro 4000 → Master 10000 → Legend 25000, `RankChip` with next-rank progress |
| 5.3 streak engine | ✅ | Lagos-day rollover, gap-tolerant +1, freeze earned every 7 days (max 2) and consumed once, else reset |
| 5.4 badges | ✅ | catalogue + `badgesEarned()` pure rule set (first lesson, perfect quiz, 7/30/100-day streak, 1k XP, course done, certificate…), showcase on `/profile` |
| 5.5 award orchestration | ✅ | one idempotent `award()` per (user, kind, key) returning `{xp, levelUp, badges, unlock}`; every POST reuses it |
| 5.6 leaderboards | ✅ | weekly + all-time, global + per-course, opt-in, KV/memory cached, ranks only visible to opted-in learners. 2026-10-29: the per-course *all-time* view used to ignore its own filter (it sorted lifetime XP); it now sums `xp_events` for that course, all 16 courses get a tab rather than the first eight, and the row says "160 XP in this course" instead of a lifetime number |
| 5.7 level-map polish | ✅ | stars by quiz score, greyed locked path, boss styling on the capstone |
| 5.8 daily quests + streak-at-risk nudge | ✅ | 5 quest kinds with XP, `GET /api/learn/due`, cron nudges (`/api/admin/nudges/run`). 2026-10-29: the quest, the streak and the rank bar now sit in the header (`XpHud`, every signed-in screen) and `/dashboard` gained a 12-week streak calendar fed by `xp_events` — a day with only a quiz pass lights up, because that is what showing up means |
| 5.9 anti-cheat | ✅ | server-side scoring only, `minCompletionSeconds`, `too_fast` rejection, daily cap (`XP.dailyCap`, now 600), ungradeable questions excluded rather than guessed. The 2026-10-29 rewards were built to the same rule: the wheel's prize is `spinRoll(user, day, n)` on the server and its budget is counted from the `awards` table, a combo is measured from the marked answers, the show-up bonus is counted from today's awards — no route accepts a client's number, and `xpFor` honours a caller's `points` for `spin`/`combo` only, which `/learn/*` never passes |
| **GATE 5** | ✅ | smoke suite asserts idempotency, the day cap, streak math and that a client cannot post XP |

## Phase 6 — interactivity

| item | status | note |
|---|---|---|
| 6.1 quiz engine | ✅ | MCQ/true-false/fill-blank/short-answer/code, instant feedback, explanation, unlimited retries, best score, pass 60 % |
| 6.2 drag-and-drop exercises | ❌ | Not built. The corpus has no drag-and-drop task to map onto; ordering tasks became checkbox/short-answer equivalents. v1.1 candidate if new content needs it |
| 6.3 fill-in-the-blank / code completion | ✅ | `CodeBlanks` — gaps hidden in the payload, answers server-side (`/api/learn/blank`) |
| 6.4 code playground (Monaco/CodeMirror + preview) | ❌ | Not built; §F code is displayed with runnable steps and `CodeBlanks`. A 900 KB editor fails the 150 KB budget — deferred with that reason |
| 6.5 flashcards + spaced repetition | ✅ | Leitner boxes in `flashcard_reviews`, due queue on the dashboard |
| 6.6 branching case studies | ✅ | `ScenarioRunner` (141 scenes) — the resolution and the correct branch now come from the server after a choice (GAP-ANALYSIS §4.3) |
| 6.7 self-assessment checklists | ✅ | from §M/§L rubric criteria; state saved per level |
| 6.8 interactive diagrams | ✅ | tap/hover hotspots + transcript reveal + data-saver text mode; two levels use the generated flow diagram |
| 6.9 exercise submission + model answer + self-score | ✅ | reveal on submit, self-score is reflection only (never XP), tutor-reads flag for unkeyed prose |
| 6.10 media embed (v2-ready) | 🔶 | `BlockView` renders figures/tables/code; an audio/video embed is not wired (no media in the corpus) |
| **GATE 6** | ✅ | every interactive type present in a real level; `/styleguide/lab` demos all of them |

## Phase 7 — monetization & admin

| item | status | note |
|---|---|---|
| 7.1 per-course ₦ pricing, admin-editable | ✅ | fees read from each manual (₦20k–₦50k) → `course_pricing`; admin can edit and it re-gates instantly |
| 7.2 checkout / payment instruction | ✅ | `/checkout/<slug>` with Delgra Ltd · 6674684361 · Moniepoint MFB, unique reference, amount, SLA, "I have paid" |
| 7.3 proof upload → R2, pending row | ✅ | owner-checked `POST /api/payments/proof` (type + 5 MB limits), `payment` row status `pending` |
| 7.4 admin approval queue | ✅ | `/admin/payments`: preview, approve/reject with reason, amount correction at approval |
| 7.5 access gating middleware (402/403) | ✅ | `assertAccess` + `lockState` free/unlocked/locked/pending/expired; free levels bypass; lesson pages inline **only** free levels |
| 7.6 comp/grant path | ✅ | `/admin/users` grant + access codes (`CEA-DEMO-2024` in seed) |
| 7.7 payment emails | ✅ | received / approved / rejected(reason) via `mail.ts` |
| 7.8 admin user management | ✅ | search, progress/XP view, note, adjust XP, ban/unban, grant/revoke; **password reset is not impersonable** (learner-driven) |
| 7.9 admin content management | 🔶 | `/admin/content` shows the lint report + per-course stats and can rebuild the bundle; no in-UI editor (content is authored in the manuals) |
| 7.10 dashboard KPIs | ✅ | signups, active 7d, revenue ₦, pending queue, top courses, funnel steps |
| 7.11 reconciliation CSV | ✅ | `/api/admin/payments.csv` — one row per approved payment for the Moniepoint statement |
| 7.12 access-duration / revoke policy | ✅ | `course_pricing.duration_days` (null = forever) + revoke endpoint, expiry enforced by `lockState` |
| **GATE 7** | ✅ | full money path is in the smoke suite: intent → proof → approve → level opens → CSV; reject → level stays locked |

## Phase 8 — ads

| item | status | note |
|---|---|---|
| 8.1 AdSense + site verification | 🔶 | tag with `ca-pub-9117572925263537`, deferred `adsbygoogle.push()`, reserved height; the property itself + verification file need the academy's account |
| 8.2 ngAdverts 13225/13226 | 🔶 | `NgAdSlot` with `data-cfasync="false"`; slots fire only where the placement list allows |
| 8.3 placement strategy + density cap | ✅ 🟡 | was: 7 named slots, never inside a quiz/lesson body, never above the mobile fold, at most 2 per view. **Overturned by the academy on 2026-10-29** — 26 named placements (29 slots across 18 files), `forbidden: []`, `maxPerView: 8`. What is still enforced, by `tools/ad-budget.mjs` in `pnpm test`: a slot must name a placement that exists in config, nothing may be on both lists, no file places more than the ceiling. The band sits after `<main>` so the reading is still first paint, and a slot is never between an answer and its verdict |
| 8.4 lazy-load + perf guard | ✅ | IntersectionObserver (200 px) + `requestIdleCallback`, min-height reserve so CLS stays 0 |
| 8.5 ad-blocker soft message | ❌ | not built (would need a detection heuristic we prefer not to guess at) |
| 8.6 AdSense policy audit | 🔶 | privacy + ToS pages, "Advertisement" labels, no ad-heavy pages; the manual audit itself is a launch task |
| 8.7 privacy policy + ToS | ✅ | `/terms` and `/privacy` (refunds, retention, data-saver, ads, NDPR language) |
| 8.8 revenue analytics | 🔶 | impression/blur/blocked counters via `/api/ads/event` + admin panel; no AdSense API import (needs credentials) |
| 8.9 house fill (2026-10-29) | ✅ | with 24 placements, an unapproved network used to render 24 empty boxes. `HouseAd` now fills any slot with no live network — four promo cards (free catalogue, leaderboard, a course, "your ad here" for a sponsor) chosen by a hash of the placement name, so server and first client render agree and nothing repaints. Opt out with `NEXT_PUBLIC_ADS_FILL=off` |
| **GATE 8** | ⚠️ | needs a live domain + approved AdSense account |

## Phase 9 — performance & reliability

| item | status | note |
|---|---|---|
| 9.1 CWV budget | 🟡 | the *weight* half is met and measured in CI (87.2 kB shared First Load JS, free-level text inlined into the first HTML, `tabular-nums` chips that cannot shift layout, no ad/analytics SDK on the lesson path). The *field* half — LCP <2.5 s, CLS <0.1, INP <200 ms on a real 4G phone — needs a deployed URL: Lighthouse CI is the first v1.1 item |
| 9.2 image + font optimization | 🟡 | fonts: none shipped (system stack — 0 KB); images: static files with immutable cache, no `next/image` runtime (GAP-ANALYSIS §4.5) |
| 9.3 code-split + bundle audit | ✅ | measured on `next build`: **First Load JS shared by all 87.2 kB**, lesson page 119 kB, admin pages lazy-loaded via `dynamic()`, no editor/chart/ad SDK in the bundle at all. Under 10.2's 150 KB with room, verified in CI by the build itself |
| 9.2b static rendering | ✅ | 45 routes prerendered at build (home, catalogue, checkout index, offline, legal, styleguide) — a cold request for those never touches a function |
| 9.4 caching strategy | ✅ | `s-maxage` + `stale-while-revalidate` on public GETs, `no-store` on anything personal, `revalidate = 3600` on course pages, immutable asset URLs per build |
| 9.5 API perf (indexes, KV limits, pagination) | ✅ | D1 indexes for every hot path, KV sliding windows, `limit/offset` on admin + search lists |
| 9.6 SEO | ✅ | `sitemap.xml`, `robots.txt`, per-page metadata + canonicals, `Course` JSON-LD, OG images from the generated covers |
| 9.7 error handling / degradation | ✅ | `error.tsx`, `global-error.tsx`, `not-found.tsx`, offline banner, retry affordances, queued mutations — no white screen path found in the route walk |
| 9.8 uptime monitoring + alerts | ⏳ | `/api/health` exists and is the check; the external monitor is a launch task |
| 9.9 backups | 🔶 | D1 is backed up by Cloudflare; R2 versioning + a tested restore are documented in `DEPLOYMENT.md` §7, not executed here |
| **GATE 9** | ⚠️ | measurable only after deployment |

## Phase 10 — QA

| item | status | note |
|---|---|---|
| 10.1 unit tests | ✅ | XP/streak/rank/gating/scoring are covered by the API smoke suite; parser + quiz extraction + corpus invariants by Vitest (`packages/content/test`, 17 tests) |
| 10.2 API integration tests | ✅ | `tools/smoke-api.mjs` — 53 assertions: auth, CSRF, progress, quiz grading, gating (402), payment approval, uploads, certificates, admin, caps |
| 10.3 E2E (Playwright) | 🔶 | `tools/route-walk.mjs` fetches and asserts all 36 routes in CI (status, content marker, no answer-key pattern, size ceiling), `tools/a11y-scan.mjs` scans the same rendered HTML for names/landmarks/headings/labels, and the smoke suite drives the API end to end — what is missing is real *browser* interaction (hydration, offline queue, upload widget), which needs Playwright in the beta phase |
| 10.4 device/browser matrix | ⏳ | needs real hardware; the layout is mobile-first at 360 px and the PWA path is exercised manually |
| 10.5 accessibility | 🔶 | focus-visible rings, labelled controls, `aria-current`, transcripts for every diagram, keyboard-reachable quiz/checkbox flows, reduced-motion, AA contrast tokens; the sponsored bands are `<aside aria-label="Sponsored">` with named links, and the wheel prints its prize as text in a live region. Automated in CI by `node tools/a11y-scan.mjs` over 31 rendered pages while logged in as a learner (**0 findings**): accessible names, landmarks, heading order, form labels, duplicate ids, `aria-hidden` traps, `rel~="noopener"`, unique ids. Contrast ratio, focus order and computed style still need axe/Lighthouse against a deployed URL; drag ARIA n/a (6.2) |
| 10.6 security review | 🔶 | OWASP-shaped: parameterised SQL only, CSP with nonces-free strict sources, no `dangerouslySetInnerHTML` except JSON-LD, upload type+size+ownership checks, IDOR guards on progress/payments/uploads, CSRF double submit, no secrets in the bundle (leak audit). A third-party pen test is out of reach here |
| 10.7 load test (200 concurrent) | ❌ | no k6/autocannon harness yet; the p95 budget is met by construction (static JSON reads, indexed queries) but unproven under load |
| 10.8 content QA sweep | ✅ | the lint gate *is* the sweep (mojibake, broken refs, ₦ format, structure), plus the manual read of the two repaired encodings; the 2 remaining unkeyed questions are recorded as warnings rather than silently patched (92 of the original 94 were this repo's extractor, now fixed — §2.7) |
| 10.9 admin workflow drill + SOP | 🔶 | `/admin` is walkable and `DEPLOYMENT.md` §6 is the written SOP (approve, reject, grant, refund, erase, publish); the drill with real staff hasn't happened |
| **GATE 10** | 🔶 | tests, typecheck, lint and the leak audit are green in CI; the browser/device/load/a11y-automation half is open |

## Phase 11 — launch

| item | status |
|---|---|
| 11.1 beta with 10–20 learners | ⏳ needs a deployment |
| 11.2 in-app feedback loop | 🟡 the Finish stage of every level asks one question — *Was level N clear?* — with three words to tap and an optional note, stored against the page it came from (`POST /api/feedback` → `feedback` table, asserted in the smoke suite). Once per course, never mid-task, and the note box only opens after a word is chosen. What is missing is the admin screen to read them: today the tutors run the SQL in DEPLOYMENT §6 |
| 11.3 launch checklist | ✅ written — `DEPLOYMENT.md` §9 |
| 11.4 public launch | ⏳ |
| 11.5 re-engagement engine | ✅ streak-at-risk + weekly digest + "1 lesson from finishing" via the cron |
| 11.6 growth loops | 🔶 shareable certificate link + verify page exist; referral rewards and badge cards not built |
| 11.7 weekly analytics ritual | 🔶 `/admin/overview` has the numbers; the ritual is a human practice, written into §8 |
| 11.8 v2 backlog | 📋 recorded below |
| 11.9 plain-English pass | ✅ 🟡 `content-plain/plain-pass.json` + `packages/content/src/plain.ts`: strips classroom trainer scripts (`Instructor Script:`, `Ask the class:`, glued `F.1` subheadings) from reading sections, rewrites all 16 course summaries in simple English, runs 102 everyday-word swaps, expands 87 acronyms on first mention, and renders 160 glossary terms above the reading across all 141 levels. Never touches code, headings or table rows, and a definition that breaks the plain rule fails the build. 🟡 because this is a *mechanical* pass: `content-plain/<slug>/session-NN.md` is the override hook for genuine level-by-level rewrites, and no rewrite has been written into it yet — that is 16 courses of trainer time, not a script |
| 11.10 free access (payments paused) | ✅ `ACCESS.mode = 'free'` short-circuits `lockState`, which is the single door every surface reads (`assertAccess`, `accessFor`, the web's lock note, the smoke suite). Prices stay visible with a note; flipping `CEA_ACCESS_MODE=paid` restores gating with no migration. The smoke suite's gating assertions are derived from `ACCESS.mode`, so CI proves the right thing in either mode |
| **GATE 11** | ⏳ |

---

## What is left, in priority order (v1.1)

1. **Deploy** — `DEPLOYMENT.md` §2–5, then set `CEA_DEPLOY_ENABLED` so CI's deploy jobs turn on.
2. **Measure** — Lighthouse CI on the deployed URL against 9.1's numbers; replace "by construction".
3. **Two answer-key lines in the source PDFs** — `web-design` level 10 q1 and `web-development` level 7 q3; retype them in the manual and `pnpm content:build` absorbs them (the other 92 unkeyed questions were ours and are fixed).
4. **axe + Playwright pass** on a deployed URL — closes 10.5's contrast/focus-order half and 10.3's hydration half, and gates 11.1. The markup-level rules are automated already (`tools/a11y-scan.mjs`, in CI).
5. **Receipt retention cron** (3.3 in GAP-ANALYSIS) and the tutor-mark queue for `needs a human` answers.
6. **An admin view for `feedback`** (11.2) — the intake and the table exist now; the tutors still read them with SQL.

## v2 backlog (11.8, as the README frames it)

AI tutor · live cohorts · signed/verifiable PDF certificates with QR · Paystack/Flutterwave auto-pay
(and automatic refund capture) · TWA app shell · offline audio lessons · tutor grading inbox with SLA ·
drag-and-drop exercise type · code playground with a sandboxed preview · published `_shared_images/`
photo pass if those assets are recovered.
