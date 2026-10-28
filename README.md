# Cyber Elias Academy — Course Manuals

Complete teaching & learning materials for all 16 Cyber Elias Academy courses.

## About

**Cyber Elias Academy (cea.ng)** — *From Zero to Expert, Together*
📍 24/26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State, Nigeria

This repository contains three PDF documents for every course:

| Document | Purpose |
|---|---|
| **Course Summary** | Quick reference — what you learn in every session |
| **Teaching Manual** | Ready-to-teach lesson notes with concept diagrams & answer keys |
| **Full Course** | All 7 parts — design, sessions, workbook, instructor manual, labs, capstone, QA |

## Courses

| # | Course | Sessions |
|---|---|---|
| 1 | Typing & Computer Basics | 6 |
| 2 | Microsoft Office | 9 |
| 3 | Data Entry | 6 |
| 4 | Graphic Design | 12 |
| 5 | Content Creation | 9 |
| 6 | Digital Productivity | 6 |
| 7 | Web Design | 12 |
| 8 | Web Development | 12 |
| 9 | Cybersecurity | 9 |
| 10 | Computer Repairs | 12 |
| 11 | Business & Freelancing | 9 |
| 12 | Social Media Management | 9 |
| 13 | Digital Marketing | 9 |
| 14 | Photography | 6 |
| 15 | Video Editing | 9 |
| 16 | Online Teaching | 6 |

**Total: 141 sessions across 16 courses.**

## Structure

```
<course_name>/
  <Course Name>_Course_Summary.pdf    ← what's learned per session
  <Course Name>_Teaching_Manual.pdf   ← full lesson notes for class
  <Course Name>_Full_Course.pdf       ← complete Part 1–7 package
```

## Enrolment

Course fees are paid by bank transfer to:

> **Delgra Ltd** · 6674684361 · Moniepoint MFB

Then upload proof of payment in your dashboard for approval.

## Contact

🌐 [cea.ng](https://cea.ng)

# CEA LEARN — Gamified Interactive Learning App
## ULTRA-GRANULAR IMPLEMENTATION ROADMAP
### Document version 1.0 · Generated for Cyber Elias Academy (cea.ng)

---

# HOW TO READ THIS DOCUMENT

Every task has a unique ID: `PHASE.TASK` (e.g. `3.4` = Phase 3, Task 4).

Status legend:
- **[DONE]** — already completed, do not redo
- **[ ]** — not started
- **[~]** — partially done / needs review

For every task you will find:
- **What** — exactly what to build
- **Why** — the reason it exists
- **Achieves** — the measurable outcome
- **Connects to** — what it plugs into (upstream input / downstream consumer)
- **Depends on** — blockers that must be done first
- **Acceptance** — how we know it is truly done

Effort scale: 🟢 small · 🟡 medium · 🔴 large · ⚫ epic

---

# PART A — VISION & SCOPE

## A1. What we are building

**CEA Learn** — a gamified, interactive, immersive learning web app that delivers all 16 Cyber Elias Academy courses as an addictive, self-paced, mission-based experience. A learner signs up, pays (or is granted) access, and embarks on "missions" (courses) made of "levels" (sessions), earning XP, badges, streaks and rank while actually mastering a real skill.

One sentence: **Duolingo's motivation loop + a real Nigerian skills academy's curriculum + offline-tolerant mobile-first delivery.**

## A2. The audience (who we meet at their point of need)

| Segment | Reality | What the app must do for them |
|---|---|---|
| Academy in-person learner | On academy PC, 105-min class, guided | Mirror the class, let them replay, reinforce with quizzes |
| Remote Nigerian learner | Phone, ₦ data cost, patchy network, often at night | Instant first paint, tiny payloads, offline caching, data-saver mode |
| Freelancer / side-hustler | Learns in bursts, needs proof of skill | Certificates, portfolio tasks, shareable badges |
| Returner (dropped off) | Lost streak, forgot password | Streak-recovery nudge, resume-where-left-off, email re-engagement |

Non-goals (explicitly OUT of v1): native app stores, live video classes, AI tutor chat, multiplayer.

## A3. The gamification thesis (why this app will feel alive)

The content is already excellent. Motivation is the missing layer. We stack 7 mechanics, each tied to a real learning behaviour:

1. **Missions & Levels** — Course = Mission; Session = Level. Progress is a *map*, not a list.
2. **XP** — awarded for lessons read, quizzes passed, exercises submitted. Feeds Level rank.
3. **Rank ladder** — Rookie → Agent → Specialist → Pro → Master → Legend (matches the "Cyber Elias" agent theme).
4. **Streaks** — daily consecutive activity. Streak freeze item. Loss aversion = retention.
5. **Badges** — milestone trophies (first mission, perfect quiz, 7-day streak, course complete).
6. **Hearts-not-punishment** — retries are unlimited; mastery gates progress, not lives (adults hate losing).
7. **Leaderboards** — weekly per-course + global. Opt-in. Nudges social competition.

## A4. Monetization model (as decided)

1. **Course fees (primary)** — learner bank-transfers ₦ to **Delgra Ltd · 6674684361 · Moniepoint MFB**, uploads proof in dashboard, **admin approves**, course unlocks. No automated gateway in v1.
2. **Ads (secondary, passive)** — Google AdSense + ngAdverts (2 slots) placed to earn without wrecking learning UX.
3. **Free hook** — Session 1 of every course is free-preview to drive conversion.

## A5. Tech stack (locked)

| Layer | Choice | Why | Free-tier limit |
|---|---|---|---|
| Frontend | **Next.js 14 (App Router) + TypeScript + Tailwind** | Vercel-native, SSG for content speed, React ecosystem | — |
| Hosting (FE) | **Vercel** | Zero-config Next deploy, global CDN, free tier | 100 GB bandwidth/mo |
| Backend/API | **Cloudflare Workers (Hono)** | Edge speed in Lagos/Abuja, free 100k req/day | 100k req/day |
| Database | **Cloudflare D1 (SQLite)** | Free 5 GB, SQL, pairs with Workers | 5 GB, 5M rows read/day |
| Cache/KV | **Cloudflare KV** | Sessions, rate-limit counters, config flags | 100k reads/day |
| Object storage | **Cloudflare R2** | Uploaded payment-proof images (no egress fee) | 10 GB free |
| Auth | **Lucia Auth (self-hosted) or custom JWT** on Workers | No vendor lock, works with D1 | — |
| Email | **Resend** (transactional) | Welcome, proof-received, approved, streak nudge | 3k emails/mo |
| Content | **Static JSON + MDX** bundled / served from R2 | Content is read-heavy → cache it hard | — |
| Analytics | **Cloudflare Web Analytics + Vercel Analytics** | Free, privacy-friendly, real Core Web Vitals | — |
| Ads | **AdSense + ngAdverts** | As supplied | Revenue |
| CI/CD | **GitHub → Vercel + Wrangler** | Push-to-deploy | — |

## A6. High-level architecture

```
[Learner device: PC / phone]
        │  HTTPS (CDN-cached)
        ▼
[ Vercel — Next.js frontend ]  ← Static: content JSON, SVGs, UI, PWA shell
        │  fetch /api/*
        ▼
[ Cloudflare Worker API (Hono) ]  ← Auth, progress, XP, payments, admin
        │                    │
        ▼                    ▼
   [ Cloudflare D1 ]    [ Cloudflare KV ]     [ Cloudflare R2 ]
    users, progress      sessions, flags       payment-proof images
    payments, xp         rate limits
        │
        ▼
   [ Resend email ]   [ AdSense / ngAdverts injected in FE ]
```

Content lives with the frontend (static, cacheable). Only *personal state* crosses the network → tiny payloads → fast on ₦ data.

---

# PART B — WHAT IS ALREADY DONE  [DONE]

These are prerequisites that are COMPLETE. The app consumes them as input.

| ID | Item | Status | Detail |
|---|---|---|---|
| B1 | 16 full courses | **[DONE]** | Typing, MS Office, Data Entry, Graphic Design, Content Creation, Digital Productivity, Web Design, Web Dev, Cybersecurity, Computer Repairs, Business Freelancing, Social Media, Digital Marketing, Photography, Video Editing, Online Teaching |
| B2 | 141 session lesson notes (A–O) | **[DONE]** | Identification, outcomes, materials, lecture, demo, practical, exercises+keys, case study, troubleshooting, assignment+rubric, knowledge check+key |
| B3 | 141 SVG concept diagrams | **[DONE]** | One per session, CEA-branded |
| B4 | 64 stock photos (local) | **[DONE]** | `_shared_images/`, referenced per session |
| B5 | 16 SVG course covers | **[DONE]** | `assets/covers/` |
| B6 | 48 Mermaid diagrams | **[DONE]** | Embedded in lesson §F |
| B7 | Knowledge checks + answers | **[DONE]** | Section N of every session — **raw material for quizzes** |
| B8 | Exercises + answer keys | **[DONE]** | Sections I/J — **raw material for practice tasks** |
| B9 | Case studies | **[DONE]** | Section K — **raw material for scenario/branching content** |
| B10 | Rubrics | **[DONE]** | Section M — **raw material for self-assessment checklists** |
| B11 | Compiled PDFs | **[DONE]** | Summary + Teaching Manual + Full Course per course |
| B12 | CEA logo | **[DONE]** | `cealogo.png` — the app's brand anchor |

**Key insight:** B7–B10 mean ~60–70% of the interactive question content ALREADY EXISTS in the markdown. The content pipeline (Phase 2) is mostly *extraction*, not authoring.

---

# PART C — IMPLEMENTATION ROADMAP

> Phases are sequential in priority but 2/3 can overlap. Each phase ends with a **gate** you must pass before moving on.

---

## PHASE 0 — FOUNDATION & SETUP
*Purpose: standing up the repos, tooling, and environments so every later phase has a place to land.*

### 0.1 Create monorepo structure
- **What:** `cea-learn/` with `apps/web` (Next.js), `apps/api` (Workers), `packages/ui`, `packages/content`, `packages/config`.
- **Why:** Clean separation lets frontend deploy to Vercel and API to Cloudflare independently while sharing types.
- **Achieves:** One repo, two deployables, shared code.
- **Connects to:** Every later phase.
- **Acceptance:** `pnpm install` runs; both apps scaffold and boot on `localhost`.

### 0.2 Initialize Next.js app (TypeScript, Tailwind, App Router)
- **What:** `create-next-app` with TS + Tailwind + App Router; add `src/` layout.
- **Why:** Base of the whole UI; App Router gives RSC + streaming for fast first paint on slow networks.
- **Connects to:** Vercel deploy (0.6), design system (1.x).
- **Acceptance:** Blank app renders, `npm run build` passes.

### 0.3 Initialize Cloudflare Worker API (Hono + D1)
- **What:** `wrangler` scaffold, Hono router, D1 binding, health endpoint `/api/health`.
- **Why:** Hono is tiny & edge-fast; D1 is the free SQL store.
- **Connects to:** All backend features (auth, progress, payments).
- **Acceptance:** `wrangler dev` serves `/api/health` returning `{ok:true}`.

### 0.4 Version control + branch strategy
- **What:** GitHub repo, `.gitignore`, `main`/`dev` branches, PR-to-merge, conventional commits.
- **Why:** Safety net + deploy hooks.
- **Connects to:** Vercel & Wrangler CI (0.6).
- **Acceptance:** Push to `dev` triggers preview deploy.

### 0.5 Environments & secrets
- **What:** `.env.local`, Vercel env vars, Wrangler secrets (`JWT_SECRET`, `RESEND_KEY`, `ADMIN_KEY`). Never commit secrets.
- **Why:** Security baseline; leaked secrets = account takeover.
- **Acceptance:** Prod & preview envs resolve all vars; repo has zero secrets.

### 0.6 CI/CD wiring
- **What:** GitHub Actions → `pnpm build` + typecheck + lint on PR; `main` → Vercel prod + `wrangler deploy`.
- **Why:** No manual deploys; every change is reproducible.
- **Connects to:** 0.2, 0.3, 0.4.
- **Acceptance:** Green pipeline deploys both apps on merge.

### 0.7 Custom domain + SSL
- **What:** Point a subdomain (e.g. `learn.cea.ng`) at Vercel; `api.cea.ng` (or `/api` rewrite) at the Worker. Force HTTPS.
- **Why:** Brand trust; required for AdSense approval later.
- **Acceptance:** Both URLs live over HTTPS.

### 0.8 Error tracking + logging
- **What:** Integrate Sentry (free tier) on FE + Worker structured logs.
- **Why:** You cannot fix what you cannot see. Essential pre-launch.
- **Connects to:** Every phase's runtime.
- **Acceptance:** A deliberately thrown error appears in Sentry dashboard.

**GATE 0:** Both apps deploy green to live URLs; errors surface in Sentry.

---

## PHASE 1 — DESIGN SYSTEM & BRAND FOUNDATION
*Purpose: one visual language so the app looks premium and consistent everywhere.*

### 1.1 Extract brand tokens from `cealogo.png`
- **What:** Formalise palette: navy `#1a365d`, deep `#0f1b33`, blue `#2c5282`, gold `#d69e2e`, light bg `#f7fafc`; plus success `#38a169`, error `#e53e3e`, warn `#dd6b20`.
- **Why:** Reuses the exact identity already proven in the PDFs → brand coherence.
- **Achieves:** Single source of colour truth (Tailwind `theme.extend` + CSS vars).
- **Acceptance:** Tokens accessible as `bg-navy`, `text-gold` etc.

### 1.2 Typography scale
- **What:** Choose a performance-cheap font (e.g. system stack or self-hosted Inter subset). Define h1–h6/body sizes for mobile + desktop.
- **Why:** Readable lessons on a 5" phone in daylight.
- **Acceptance:** Type ramp documented + applied via Tailwind presets.

### 1.3 Component library scaffold (`packages/ui`)
- **What:** Button, Card, Badge, ProgressBar, Modal, Toast, Tabs, Accordion, Avatar, Input, Skeleton.
- **Why:** Every feature composes from these — no one-off styling.
- **Connects to:** Every UI in Phases 3–7.
- **Acceptance:** Storybook (or a `/styleguide` route) renders all components.

### 1.4 Gamification visual language
- **What:** Design the XP bar, streak flame, badge medals, rank emblems, level-node map, confetti effect.
- **Why:** These are the app's signature — must feel rewarding, not cheap.
- **Achieves:** Distinct "game feel" that differentiates from a boring LMS.
- **Acceptance:** Mockups approved; components exist with animation variants.

### 1.5 Iconography + illustration
- **What:** Icon set (Lucide), plus a consistent spot-illustration style for empty states / congrats.
- **Achieves:** Polished, non-generic feel.
- **Acceptance:** Icons tree-shaken, no icon font.

### 1.6 Responsive + dark-mode foundation
- **What:** Mobile-first breakpoints; `prefers-color-scheme` + manual toggle.
- **Why:** Many learners are on phones at night; dark mode reduces eye strain & battery.
- **Acceptance:** All components legible in light+dark at 360px & 1440px.

### 1.7 Motion system
- **What:** Framer Motion presets: page transitions, XP-gain float, badge pop, progress fill, correct/wrong shake.
- **Why:** Motion communicates feedback — the core of "immersive".
- **Acceptance:** Reduced-motion media query respected everywhere.

**GATE 1:** A live `/styleguide` page shows a branded, responsive, dark-mode-ready component set.

---

## PHASE 2 — CONTENT PIPELINE (markdown → app data)  ⚫ EPIC
*Purpose: transform the 141 lesson-note MD files into structured, queryable, renderable app data. This is the backbone — everything the learner sees flows from here.*

### 2.1 Define the content schema (TypeScript types)
- **What:** Types for `Course`, `Session`, `Section(A–O)`, `Quiz`, `Question`, `Exercise`, `CaseStudy`, `Diagram`, `Rubric`, `Prerequisite`.
- **Why:** A rigid schema lets the UI render anything uniformly and enables progress tracking per granular unit.
- **Connects to:** Content parser (2.2), DB (Phase 4), UI (Phase 5).
- **Acceptance:** Types exported from `packages/content` and used by API+FE.

### 2.2 Build the markdown parser/extractor
- **What:** Node script that reads every `Session_*.md`, splits on `## A.` … `## O.` headings, and emits typed JSON. Handles tables, code blocks, blockquotes, images.
- **Why:** Automates conversion of 141 files — impossible by hand.
- **Achieves:** 141 sessions → 141 structured JSON objects.
- **Connects to:** 2.1 schema → 2.x enrichers → DB/static bundle.
- **Acceptance:** Parser output for all 141 sessions validates against schema.

### 2.3 Quiz extraction engine (from §N knowledge checks)
- **What:** Parse each session's Knowledge Check into `Question[]` — MCQ, T/F, fill-blank, short-answer. Attach the answer key as `correctAnswer` + `explanation`.
- **Why:** Turns existing assessments into instant interactive quizzes with zero new authoring.
- **Achieves:** Auto-generated quiz per session (typically 5–10 Qs).
- **Connects to:** Quiz UI (6.x), XP engine (5.x).
- **Acceptance:** Every session has ≥5 valid questions with correct answers + explanations.

### 2.4 Exercise extraction (from §I/§J)
- **What:** Parse independent exercises + answer keys into `Exercise[]` with `prompt`, `steps`, `modelAnswer`, `rubric`.
- **Why:** Drives the "practice" component and self-check.
- **Connects to:** Practice UI (6.x), self-assessment.
- **Acceptance:** Each session has ≥1 exercise with model answer.

### 2.5 Case-study extraction (from §K)
- **What:** Parse case studies into `CaseStudy[]` with `scenario`, `questions`, `guidance`.
- **Why:** Fuels immersive scenario/branching cards.
- **Acceptance:** Present wherever §K exists; rendered correctly.

### 2.6 Diagram resolver
- **What:** Map each session to its SVG (`assets/concepts/`), cover (`assets/covers/`), and any `_shared_images/` photos. Emit as optimized `<img>` metadata (dimensions, alt).
- **Why:** Visuals must load fast & correctly; SVGs inline or as optimized assets.
- **Connects to:** Asset pipeline (2.9), lesson renderer (5.x).
- **Acceptance:** Every session resolves its diagram; broken refs = build error.

### 2.7 Mermaid → static image
- **What:** Pre-render 48 Mermaid blocks to SVG at build time (no runtime mermaid.js — saves ~300 KB).
- **Why:** Runtime Mermaid is slow on mobile; static SVG is instant.
- **Acceptance:** All 48 render as crisp static SVG.

### 2.8 Content quality gate + linting
- **What:** Script that flags: missing outcomes, sessions with <1 quiz Q, broken image refs, encoding artifacts (e.g. `?"` mojibake seen in source), inconsistent ₦ formatting.
- **Why:** Guarantees no broken/ugly content ships.
- **Achieves:** Clean content score; fixes surfaced for human review.
- **Acceptance:** Lint report = 0 critical issues.

### 2.9 Asset optimization pipeline
- **What:** Images → WebP/AVIF with `sharp`; SVG cleanup; generate multiple sizes; produce a manifest.
- **Why:** ₦ data cost — every KB matters; Vercel serves optimised images.
- **Acceptance:** Total image payload for a course < 1.5 MB; Lighthouse image score green.

### 2.10 Content bundling strategy
- **What:** Decide: static JSON per course in the frontend bundle vs. fetched from R2 on demand. Implement lazy per-course loading.
- **Why:** Instant first paint; load course data only when opened.
- **Acceptance:** Home screen loads without downloading any course content.

### 2.11 Free-preview tagging
- **What:** Mark Session 1 of each course as `isFree: true`; enforce lock on the rest.
- **Why:** The conversion funnel — taste then pay.
- **Connects to:** Payment gate (Phase 7).
- **Acceptance:** Logged-out/guest users can open Session 1 only.

### 2.12 Seed the database with content index
- **What:** Insert courses/sessions metadata (title, order, durations, outcomes, free flag) into D1 so the app can list/search without parsing MD at runtime.
- **Why:** Fast catalogue; SQL search/filter.
- **Connects to:** API (Phase 3), UI catalogue.
- **Acceptance:** API returns full course catalogue in <50 ms.

### 2.13 Content hot-reload for authoring
- **What:** Dev command to re-run the pipeline and refresh without full rebuild.
- **Why:** Fast iteration when fixing content bugs post-launch.
- **Acceptance:** Edit a MD → see change in <10 s.

**GATE 2:** All 141 sessions live as validated JSON with quizzes, exercises, case studies, diagrams — and a green content-lint report.

---

## PHASE 3 — AUTH, ACCOUNTS & PROFILE
*Purpose: let a learner become a known agent with a persistent identity.*

### 3.1 Auth data model (D1)
- **What:** Tables: `users` (id, email, phone, name, password_hash, rank, xp, streak, created_at), `sessions`, `roles` (learner/admin).
- **Why:** Foundation for everything personal.
- **Acceptance:** Schema migrated via Wrangler; indexes on email.

### 3.2 Registration endpoint
- **What:** `POST /api/auth/register` — validate email/phone (NG format), hash password (argon2/bcrypt), create user, send welcome email via Resend.
- **Why:** Onboarding; welcome email sets brand expectation.
- **Connects to:** Resend (Phase 0.5 secrets), login (3.3).
- **Acceptance:** New user in DB; welcome email delivered.

### 3.3 Login / session management
- **What:** `POST /api/auth/login`; issue httpOnly secure JWT (or Lucia session cookie); `GET /api/auth/me`; logout.
- **Why:** Secure access to personal progress; httpOnly prevents XSS theft.
- **Acceptance:** Cookie set, `me` returns profile, logout clears.

### 3.4 Password reset flow
- **What:** Request reset → emailed token → set new password. Token single-use + expiring.
- **Why:** Account lockout is the #1 support burden — self-serve fixes it.
- **Acceptance:** Full loop works; token reuse rejected.

### 3.5 Guest mode (play before signup)
- **What:** Allow browsing free sessions + sample quiz without account; prompt to sign up when saving progress is attempted.
- **Why:** Reduces friction; conversion happens after value is felt.
- **Connects to:** 2.11 free preview.
- **Acceptance:** Guest can take a free quiz; sign-up prompt appears on "save" attempt.

### 3.6 Profile page
- **What:** Avatar (initials/generated), name, email, rank emblem, XP total, streak, badges earned, courses enrolled, join date.
- **Why:** Identity + pride = retention.
- **Connects to:** Gamification (Phase 4/5).
- **Acceptance:** Profile renders real data; avatar generation works.

### 3.7 Admin role + protected routes
- **What:** `role` on user; middleware guards `/admin/*` and admin API endpoints; separate admin login check.
- **Why:** Payment approvals & user management must be restricted.
- **Acceptance:** Non-admin blocked (403); admin sees admin area.

### 3.8 Account security hardening
- **What:** Rate-limit login attempts (KV counter), generic auth errors (no user enumeration), CSRF protection on state-changing routes, secure cookie flags.
- **Why:** Nigerian app with money flowing in = attractive target.
- **Acceptance:** 5 failed logins → temporary lock; security review checklist passed.

### 3.9 Email transactional library
- **What:** Reusable templates: welcome, password-reset, payment-received, payment-approved, payment-rejected, streak-nudge, weekly-digest.
- **Why:** Consistent branded comms; re-engagement.
- **Connects to:** Resend.
- **Acceptance:** Each template renders + sends in staging.

**GATE 3:** A user can register, log in, view profile, reset password; admin routes protected; security checks green.

---

## PHASE 4 — CORE LEARNING EXPERIENCE (the heart)
*Purpose: the actual reading/watching/learning loop. This is where content becomes an experience.*

### 4.1 App shell + navigation
- **What:** Header (logo, rank, streak, XP), sidebar/bottom-nav, breadcrumbs, mobile bottom tab bar.
- **Why:** Orientation + constant gamification visibility.
- **Connects to:** Design system (Phase 1).
- **Acceptance:** Shell stable across all routes; mobile nav usable one-handed.

### 4.2 Course catalogue / home
- **What:** Grid of 16 course cards (cover, title, category, session count, fee, lock state, your progress %). Filter by category; search.
- **Why:** The storefront + the map of everything they can learn.
- **Connects to:** Content index (2.12), payment state (Phase 7).
- **Acceptance:** All 16 render; locked/unlocked states correct; search works.

### 4.3 Course detail page
- **What:** Course hero, description, outcomes, full session list (levels) with per-session status (locked/available/complete), instructor info, "Start/Resume" CTA.
- **Why:** Sets expectations + shows the path.
- **Acceptance:** Session list matches roadmap; resume jumps to correct session.

### 4.4 Mission/Level map view
- **What:** Visual winding path of level-nodes (Session 1…N) with lock/star/progress states — the signature "game" screen.
- **Why:** This is the immersion hook; progress becomes a journey.
- **Connects to:** Gamification (Phase 5), progress (4.6).
- **Acceptance:** Nodes reflect real completion; current node pulses.

### 4.5 Lesson renderer
- **What:** Component that renders a session's structured sections (A–O) as scrollable, section-navigable content: headings, tables, code blocks, callouts, blockquotes, images, diagrams. Sticky section jump-menu.
- **Why:** The core consumption surface — must be beautiful & readable on mobile.
- **Connects to:** Content pipeline (Phase 2), progress tracking (4.6).
- **Acceptance:** All 141 sessions render with zero layout breaks at 360px & 1440px.

### 4.6 Progress tracking (granular)
- **What:** Track: session opened, section scrolled-to, lesson completed, quiz score, exercise submitted. POST to API; store in D1. "Continue where you left off".
- **Why:** Resume + completion % are the retention backbone.
- **Connects to:** API, XP engine (5.x), map (4.4).
- **Acceptance:** Kill the tab mid-lesson; reopen → resume at same spot.

### 4.7 Session completion flow
- **What:** When required steps done → "Level Complete" screen: XP earned animation, streak update, next-level unlock, confetti.
- **Why:** The reward moment — the dopamine hit that forms the habit.
- **Connects to:** XP engine (5.x), confetti (Phase 1.7).
- **Acceptance:** Completing a session reliably triggers reward + unlock.

### 4.8 Data-saver / low-bandwidth mode
- **What:** Toggle that: defers images, disables heavy animations, loads text-first, optional offline caching of opened sessions.
- **Why:** Core to the Nigerian remote-learner reality — respect their ₦ data.
- **Achieves:** Usable on 2G-ish connections.
- **Acceptance:** Lesson text readable with images off; toggle persists.

### 4.9 Offline caching (PWA service worker)
- **What:** Cache app shell + opened course content; serve offline; background-sync progress when back online.
- **Why:** Academy PCs / commutes / outages — learning shouldn't stop.
- **Connects to:** 4.8, 4.6.
- **Acceptance:** Airplane mode → opened lesson still readable; progress syncs on reconnect.

### 4.10 Bookmark & notes
- **What:** Learner can bookmark a section and write a personal note; accessible from profile.
- **Why:** Active recall + personalisation boosts retention.
- **Acceptance:** Notes persist and are user-scoped (no cross-user leak).

### 4.11 Search across enrolled content
- **What:** Full-text search over lessons of accessible courses (client-side index or D1 FTS5).
- **Why:** "How did they say to format ₦?" — quick lookup beats re-reading.
- **Acceptance:** Search returns relevant sessions in <300 ms.

**GATE 4:** A learner can browse → open a course → read a lesson → track progress → complete → get rewarded → resume later. Core loop CLOSED.

---

## PHASE 5 — GAMIFICATION ENGINE
*Purpose: convert the learning loop into a motivation machine.*

### 5.1 XP model definition
- **What:** XP rules table: read lesson +10, pass quiz +20 (bonus for perfect), submit exercise +15, complete session +25, 7-day streak +50. Store XP events in D1.
- **Why:** Quantified progress is the spine of the game feel.
- **Acceptance:** XP awarded correctly; ledger queryable.

### 5.2 Rank ladder
- **What:** Map XP → rank (Rookie 0, Agent 500, Specialist 1500, Pro 4000, Master 10000, Legend 25000). Display emblem + progress-to-next.
- **Why:** Long-term aspiration beyond single courses.
- **Acceptance:** Rank auto-updates; emblem renders.

### 5.3 Streak engine
- **What:** Track `last_active_date` + `streak_count`; daily rollover logic; streak-freeze item (v2 can be earned/purchased); grace on timezone.
- **Why:** Daily habit = the single biggest retention lever (Duolingo proven).
- **Acceptance:** Streak increments once/day, resets after a missed day, freeze protects.

### 5.4 Badge/achievement system
- **What:** Badge catalog (first-lesson, first-course, perfect-quiz, 7/30/100-day-streak, 1000 XP, night-owl, comeback). Event-driven awarding; badge showcase on profile.
- **Why:** Collectibles give mid-term goals and shareable proof.
- **Acceptance:** Badges award automatically at thresholds; no duplicate awards.

### 5.5 Level-completion reward orchestration
- **What:** Single "award" service that, on completion, atomically: grants XP, updates streak, checks badges, unlocks next level, returns summary for the celebration UI.
- **Why:** Centralising prevents double-award bugs & race conditions.
- **Connects to:** 4.7, 5.1–5.4.
- **Acceptance:** One completion call → all side-effects exactly once (idempotent).

### 5.6 Leaderboard
- **What:** Weekly + all-time leaderboards (global + per-course). Opt-in toggle; rank by XP. Store in D1, cache in KV.
- **Why:** Social comparison motivates; opt-out protects privacy.
- **Acceptance:** Leaderboard correct, paginated, respects opt-in.

### 5.7 Progress map visualization polish
- **What:** Animate node states, locked-path grey-out, star ratings (based on quiz score), "boss level" styling for capstone sessions.
- **Why:** Visual progress is self-reinforcing.
- **Acceptance:** Map feels like a game board, not a checklist.

### 5.8 Daily quest / nudge system
- **What:** "Today's mission: finish Session 3 + score 80% on quiz" daily card; streak-at-risk banner when inactive.
- **Why:** Reduces decision fatigue; urgency drives return visits.
- **Connects to:** Email (Phase 3.9), streak (5.3).
- **Acceptance:** Quest refreshes daily; nudge fires on inactivity.

### 5.9 Anti-cheat / integrity basics
- **What:** Server-side quiz scoring (never trust client), time-stamps, prevent instant re-take score farming, cap XP/day.
- **Why:** XP must mean something or the game collapses.
- **Acceptance:** Tampered client requests rejected; XP cap enforced.

**GATE 5:** XP, ranks, streaks, badges, leaderboards all live and correct; completion feels rewarding.

---

## PHASE 6 — INTERACTIVE COMPONENTS (make it truly immersive)
*Purpose: move beyond reading into doing. These components turn passive content into active mastery.*

### 6.1 Quiz engine
- **What:** Component rendering MCQ / T/F / fill-blank / short-answer from extracted questions. Instant feedback, explanation reveal, score, retry, best-score tracking.
- **Why:** Active recall is the highest-ROI learning technique; also the main XP driver.
- **Connects to:** Quiz data (2.3), XP (5.1), server scoring (5.9).
- **Acceptance:** All question types render; scoring server-verified.

### 6.2 Drag-and-drop exercises
- **What:** Draggable items into zones — e.g. match HTML tag → purpose, order workflow steps, sort file types.
- **Why:** Kinesthetic learning; great for procedures & classification in the curriculum.
- **Connects to:** Exercise data (2.4).
- **Acceptance:** Works on touch (mobile) and mouse; accessible via keyboard.

### 6.3 Fill-in-the-blank / code-completion
- **What:** Sentence or snippet with blanks; learner types/selects missing token.
- **Why:** Bridges recognition → production.
- **Acceptance:** Case-insensitive matching, partial-credit options.

### 6.4 Code playground (Web Design & Web Development courses)
- **What:** In-browser HTML/CSS/JS editor (Monaco or CodeMirror) with live preview iframe; starter code from lesson; "run" + reset.
- **Why:** The two coding courses need real practice, not just reading. This is the killer feature for those courses.
- **Connects to:** Lesson content (Phase 2), sandboxed iframe.
- **Acceptance:** Edit → live preview <100 ms; sandboxed (no network escape).

### 6.5 Flashcards (spaced-repetition-ready)
- **What:** Key terms → definitions flip cards per session; mark known/unknown; feeds a simple spaced-repetition queue.
- **Why:** Terminology-heavy courses (Cybersecurity, Office) benefit from drill.
- **Acceptance:** Cards flip smoothly; known-cards deprioritise.

### 6.6 Scenario / branching case studies
- **What:** Present §K case studies as branching decisions ("What do you do?") with consequences — especially for Cybersecurity & Business Freelancing.
- **Why:** Immersive decision-making builds judgement, not just knowledge.
- **Connects to:** Case data (2.5).
- **Acceptance:** Branches navigate; outcome screens explain reasoning.

### 6.7 Self-assessment checklists (from rubrics)
- **What:** Convert §M rubrics into tickable self-check lists the learner completes before submitting assignments.
- **Why:** Metacognition — learners judge their own quality against the standard.
- **Connects to:** Rubric data.
- **Acceptance:** Checklist saves; summary shown.

### 6.8 Interactive SVG diagrams
- **What:** Make the 141 concept SVGs interactive where useful: hover tooltips on parts, tap-to-reveal labels, optional step-through.
- **Why:** Turns static diagrams into explorable learning objects.
- **Acceptance:** Diagrams interactive on touch + hover; graceful fallback to static.

### 6.9 Exercise submission + model-answer reveal
- **What:** Learner writes/pastes their exercise attempt, then reveals the model answer to self-compare; optional self-score.
- **Why:** Compare-and-improve is how real skill forms.
- **Acceptance:** Draft autosaves; reveal is deliberate (not accidental).

### 6.10 Audio/pronunciation or screencast embeds (v2-ready)
- **What:** Reserve component for short audio/video explainers (Photography, Video Editing, Typing).
- **Why:** Some skills are better shown/heard than read.
- **Acceptance:** Component renders placeholder; ready for media.

**GATE 6:** At least 3 interactive types live per relevant course; coding courses have a working playground.

---

## PHASE 7 — PAYMENTS, ENROLLMENT & ADMIN
*Purpose: turn free visitors into paying learners, and give the academy a control room.*

### 7.1 Pricing & package config
- **What:** Store each course's ₦ fee (from design docs: e.g. Web Dev ₦50k, Typing ₦15k, etc.). Admin-editable table.
- **Why:** Fees already defined per course; must be single source of truth.
- **Acceptance:** Fees render on catalogue + checkout.

### 7.2 Checkout / payment-instruction page
- **What:** When learner clicks a locked course → show bank details (**Delgra Ltd · 6674684361 · Moniepoint MFB**), amount, reference code, and "I have paid — upload proof" CTA.
- **Why:** The manual-transfer flow made frictionless and trustworthy.
- **Connects to:** 7.3.
- **Acceptance:** Clear instructions + unique reference per attempt.

### 7.3 Proof-of-payment upload
- **What:** Upload screenshot/receipt to R2 (signed URL), record `payment` row (user, course, amount, reference, file, status=pending, timestamp).
- **Why:** Evidence trail for admin approval.
- **Connects to:** Cloudflare R2, D1.
- **Acceptance:** File stored, row created, user sees "pending" state.

### 7.4 Admin approval queue
- **What:** Admin dashboard: list pending proofs with image preview, amount, reference; Approve / Reject (+reason).
- **Why:** The human gate that grants access.
- **Acceptance:** Approve unlocks the course for that user instantly; reject notifies.

### 7.5 Access gating middleware
- **What:** API + UI check enrollment before serving locked sessions; return 402/403; free sessions (2.11) bypass.
- **Why:** Protects paid content.
- **Acceptance:** Non-payer blocked on Session 2+; payer has full access.

### 7.6 Access-code / comp path
- **What:** Admin can manually grant a course to a user (gift, scholarship, in-person student) without payment.
- **Why:** Real-world academy needs flexibility.
- **Acceptance:** Grant works; logged in admin actions.

### 7.7 Payment status emails
- **What:** Auto-email on: proof received (pending), approved (access granted), rejected (with reason + how to fix).
- **Why:** Trust + reduces "did they get my money?" anxiety (critical for ₦ transfers).
- **Connects to:** Resend (3.9).
- **Acceptance:** 3 emails fire correctly.

### 7.8 Admin: user management
- **What:** Search users, view progress/XP/enrollments, reset password, ban, adjust XP (manual fix), view activity.
- **Why:** Support + operations.
- **Acceptance:** Admin can resolve common support cases without DB access.

### 7.9 Admin: content management
- **What:** View content-lint reports; trigger content hot-reload (2.13); see per-session stats (completion %, avg quiz score).
- **Why:** Data-driven course improvement.
- **Acceptance:** Stats render; reload works.

### 7.10 Admin: dashboard analytics
- **What:** KPIs: signups, active learners, revenue (₦), pending approvals, top courses, completion funnel, streak health.
- **Why:** The academy's business cockpit.
- **Acceptance:** Dashboard live with real data.

### 7.11 Revenue reconciliation report
- **What:** Exportable list of approved payments (date, user, course, amount) → total revenue per period.
- **Why:** Accounting for Delgra Ltd; must reconcile with bank statement.
- **Acceptance:** CSV export accurate.

### 7.12 Refund/expiry policies (config)
- **What:** Configurable access duration (lifetime vs 6 months) and a manual revoke action.
- **Why:** Business policy may change; don't hardcode.
- **Acceptance:** Setting enforced.

**GATE 7:** Full money loop works: browse → pay → upload → approve → access. Admin can run operations.

---

## PHASE 8 — MONETIZATION (ADS)  ⚠️ balance revenue vs learning UX
*Purpose: add passive ad revenue without destroying the learning experience or risking AdSense approval.*

### 8.1 AdSense integration
- **What:** Add supplied AdSense script (`ca-pub-9117572925263537`) to layout; verify with AdSense site verification.
- **Why:** Primary passive revenue.
- **Connects to:** Domain (0.7), content policy.
- **Acceptance:** AdSense console shows verified site; ads serve in staging.

### 8.2 ngAdverts integration (2 slots)
- **What:** Place the two supplied ngAdverts containers (13225, 13226) per spec (`data-cfasync="false"`).
- **Why:** Local Nigerian ad network — often better fill-rate for NG traffic.
- **Acceptance:** Both slots render.

### 8.3 Ad placement strategy (revenue ↑, annoyance ↓)
- **What:** Place ads: between lessons (not during), on catalogue, on completion screens, on leaderboard — **never** inside quiz flow or mid-paragraph. Cap density.
- **Why:** Ads mid-lesson tank completion & can violate AdSense UX policy.
- **Achieves:** Max viewability without breaking the loop.
- **Acceptance:** No ad interrupts a quiz or reading mid-flow; UX review passed.

### 8.4 Ad lazy-loading + performance guard
- **What:** Load ad scripts after content (idle/after-interaction); don't let ads block LCP/Cumulative Layout Shift.
- **Why:** Ads can wreck Core Web Vitals → lower SEO + bad UX.
- **Acceptance:** Lighthouse perf still ≥85 with ads on.

### 8.5 Ad blockers detection (soft)
- **What:** Detect blocked ads; show a gentle "support us by disabling your ad blocker" message — non-blocking.
- **Why:** Recover lost impressions without being hostile.
- **Acceptance:** Message shows only when blocked.

### 8.6 AdSense policy compliance audit
- **What:** Ensure: enough content, clear navigation, privacy policy + ToS pages, no prohibited content, ad/label separation.
- **Why:** Rejection = zero revenue. Compliance is mandatory.
- **Acceptance:** Checklist passed before applying for approval.

### 8.7 Privacy policy & ToS pages
- **What:** Write + publish privacy policy (data collected, cookies, ads, payments) and terms of service.
- **Why:** Legal requirement + AdSense requirement.
- **Acceptance:** Pages live, linked in footer.

### 8.8 Revenue analytics
- **What:** Track ad impressions/clicks (AdSense dashboard + ngAdverts) alongside course revenue in admin KPIs.
- **Why:** Know which monetization actually earns.
- **Acceptance:** Combined revenue view in admin.

**GATE 8:** Ads serving compliantly, not hurting UX/perf, revenue visible.

---

## PHASE 9 — PERFORMANCE, SEO & RELIABILITY
*Purpose: fast everywhere (especially Lagos mobile), discoverable, and stable.*

### 9.1 Core Web Vitals budget
- **What:** Set targets: LCP <2.5s, CLS <0.1, INP <200ms on 4G mobile. Measure on real devices.
- **Why:** Speed = retention + SEO ranking.
- **Acceptance:** Budget met on key routes.

### 9.2 Image & font optimization
- **What:** Next `<Image>` with WebP/AVIF, lazy-load below fold, self-host & subset fonts.
- **Why:** Biggest wins for LCP on mobile.
- **Acceptance:** No oversized images; fonts <100 KB.

### 9.3 Code-splitting & bundle audit
- **What:** Route-based splitting; dynamic-import heavy components (code editor, charts); analyze bundle; remove dead code.
- **Why:** Don't ship the code editor to someone reading a Typing lesson.
- **Acceptance:** Initial JS bundle <150 KB; editor loads only in coding courses.

### 9.4 Caching strategy
- **What:** Static content cache headers + CDN; KV for catalogue/config; revalidate on content update.
- **Why:** Repeat visits near-instant.
- **Acceptance:** Cached routes TTFB <100ms.

### 9.5 API performance + rate limiting
- **What:** Indexes on hot queries; KV-based rate limiting; pagination everywhere.
- **Why:** Edge DB can get slow without discipline.
- **Acceptance:** p95 API <150ms.

### 9.6 SEO foundations
- **What:** Sitemap, robots.txt, per-course metadata + OG images, structured data (Course schema), fast public course pages for preview/indexing.
- **Why:** Free organic discovery of courses.
- **Acceptance:** Rich results test passes; courses indexed.

### 9.7 Error handling & graceful degradation
- **What:** Global error boundary, API failure fallbacks (offline banner, retry), never a white screen.
- **Why:** Trust on flaky networks.
- **Acceptance:** Simulated API down → friendly UI, not crash.

### 9.8 Uptime & monitoring
- **What:** Health checks, uptime monitor (free tier), Sentry alerts, analytics anomaly alerts.
- **Why:** Know about outages before learners tweet about them.
- **Acceptance:** Alerts fire on synthetic failure.

### 9.9 Backup & disaster recovery
- **What:** Scheduled D1 backups; R2 versioning; documented restore procedure.
- **Why:** A DB loss = losing every learner's progress & payment record. Unacceptable.
- **Acceptance:** Backup runs daily; restore tested once.

**GATE 9:** Green Core Web Vitals on mobile, SEO indexed, backups verified.

---

## PHASE 10 — TESTING, QA & ACCESSIBILITY
*Purpose: ship something that doesn't embarrass the academy.*

### 10.1 Unit tests
- **What:** Vitest/Jest for: XP logic, streak rollover, rank thresholds, gating, quiz scoring, content parser.
- **Why:** Gamification logic is bug-prone and visible when wrong.
- **Acceptance:** >80% coverage on logic modules.

### 10.2 Integration tests (API)
- **What:** Test auth, progress, payment approval, gating flows end-to-end against a test D1.
- **Why:** Money + access bugs are costly.
- **Acceptance:** Critical flows covered.

### 10.3 End-to-end tests (Playwright)
- **What:** Key journeys: signup→learn→quiz→complete; guest→pay→upload→admin approve→access.
- **Why:** Catches wiring regressions.
- **Acceptance:** E2E green in CI.

### 10.4 Cross-device / browser matrix
- **What:** Test: Android Chrome (low-end), iOS Safari, Windows Chrome/Edge (academy PCs), Firefox. 360px→1440px.
- **Why:** Nigerian learners on cheap Androids + academy Windows PCs.
- **Acceptance:** No blocking bugs on matrix.

### 10.5 Accessibility (a11y) audit
- **What:** WCAG 2.1 AA: contrast, keyboard nav, focus states, ARIA on quiz/drag components, screen-reader labels, reduced-motion.
- **Why:** Inclusive + often legally required + good SEO.
- **Acceptance:** axe/Lighthouse a11y ≥90; keyboard-only path works.

### 10.6 Security review
- **What:** OWASP top-10 pass: XSS (sanitize content render), SQLi (parameterised), CSRF, authz (IDOR check on progress/payment by user id), upload validation (file type/size), secrets audit.
- **Why:** Real money + real user data.
- **Acceptance:** No high/critical findings.

### 10.7 Load & stress test
- **What:** Simulate cohort spike (e.g. 200 concurrent after a class) against Worker + D1.
- **Why:** Free tiers throttle — know the ceiling before it bites.
- **Acceptance:** Documented limits; graceful degradation, not crash.

### 10.8 Content QA sweep
- **What:** Human read-through of every rendered session for mojibake (the `?"` artifacts), broken links, missing images, formatting.
- **Why:** Auto-lint can't catch awkward prose.
- **Acceptance:** Sign-off per course.

### 10.9 Admin workflow drill
- **What:** Simulate: approve 10 payments, reject 1, grant comp, reset 2 passwords, check stats.
- **Why:** The academy staff must be able to run this without you.
- **Acceptance:** Staff can operate solo; written SOP produced.

**GATE 10:** Tests green, a11y ≥90, no critical security bugs, staff trained.

---

## PHASE 11 — LAUNCH & GROWTH
*Purpose: get it live, get learners on it, keep them coming back.*

### 11.1 Soft launch (beta cohort)
- **What:** Invite 10–20 real learners (academy students); instrument everything; gather feedback.
- **Why:** Real usage exposes what testing can't.
- **Achieves:** Validated product + bug list.
- **Acceptance:** ≥10 learners complete a session; feedback collected.

### 11.2 Feedback loop + rapid fixes
- **What:** In-app feedback button → triage → fix top friction within a week.
- **Why:** Momentum during beta.
- **Acceptance:** Top 5 issues resolved.

### 11.3 Launch checklist
- **What:** Domains, SSL, env vars, backups on, monitoring on, ads approved, legal pages live, payment flow tested with real ₦, admin trained.
- **Why:** No launch-day surprises.
- **Acceptance:** Checklist 100% ticked.

### 11.4 Public launch
- **What:** Announce to academy + social; open registration; monitor dashboards.
- **Acceptance:** Live, first real signups & payments.

### 11.5 Re-engagement engine
- **What:** Streak-nudge emails, "you're 1 lesson from finishing" emails, weekly digest, win-back for lapsed.
- **Why:** Retention > acquisition for a course business.
- **Connects to:** Resend (3.9), streak (5.3).
- **Acceptance:** Automated flows firing.

### 11.6 Growth loops
- **What:** Shareable badge/achievement cards (social), referral reward (free days/course), "bring a friend" leaderboard.
- **Why:** Organic, cheap acquisition in the Nigerian market.
- **Acceptance:** Share flow works; referral tracked.

### 11.7 Post-launch analytics review
- **What:** Weekly: DAU/WAU, retention D7/D30, course completion rate, quiz pass rate, payment conversion, ad RPM, revenue.
- **Why:** Data drives what to build next (v2 priorities).
- **Acceptance:** Recurring review ritual established.

### 11.8 v2 backlog seeding
- **What:** From data: AI tutor, live cohorts, certificates (PDF/NFT), Paystack auto-pay, mobile app (PWA→TWA), more courses, offline audio.
- **Why:** The roadmap never truly ends.
- **Acceptance:** Prioritised v2 backlog doc exists.

**GATE 11:** App publicly live, earning (fees + ads), learners retained, v2 planned.

---

# PART D — DEPENDENCY MAP (what connects to what)

```
Phase 0 (setup) ──► everything
Phase 1 (design) ──► 4,5,6 (all UI)
Phase 2 (content) ──► 4.5 lesson renderer, 6.x interactive, 5.x quizzes
Phase 3 (auth) ──► 4 (progress), 5 (personal), 7 (payments)
Phase 4 (learning loop) ──► 5 (rewards), 7 (gating)
Phase 5 (gamification) ──► 4.7 completion, 6 (quiz XP)
Phase 6 (interactive) ──► 4.5, 5.1 XP
Phase 7 (payments) ──► 4.5 gating, 7.5 access
Phase 8 (ads) ──► needs 0.7 domain + 10.6 compliance
Phase 9 (perf) ──► across all
Phase 10 (QA) ──► gate before 11
Phase 11 (launch) ──► needs all gates
```

Critical path: **0 → 2 → 4 → 5 → 7 → 11**. Phases 6 and 8 can run in parallel with 5/7 once 4 is stable.

---

# PART E — RECOMMENDED BUILD ORDER (pragmatic sequencing)

| Sprint | Focus | Rationale |
|---|---|---|
| Sprint 1 | Phase 0 + 1 | Foundation & brand — nothing works without these |
| Sprint 2 | Phase 2 (parser + schema + quiz extraction) | Content is the product; build the pipeline first |
| Sprint 3 | Phase 3 + 4.1–4.5 | Auth + shell + catalogue + lesson renderer → first readable app |
| Sprint 4 | Phase 4.6–4.11 + 5.1–5.5 | Close the loop + core gamification → first "fun" build |
| Sprint 5 | Phase 5.6–5.9 + 6.1–6.4 | Leaderboard + quizzes + code playground |
| Sprint 6 | Phase 6.5–6.10 + 7.1–7.5 | Remaining interactives + full payment loop |
| Sprint 7 | Phase 7.6–7.12 + 8 | Admin control room + ads |
| Sprint 8 | Phase 9 + 10 | Perf, SEO, security, a11y, testing |
| Sprint 9 | Phase 11 | Beta → fix → launch |

---

# PART F — RISKS & MITIGATIONS

| Risk | Impact | Mitigation |
|---|---|---|
| Content pipeline mis-extracts quizzes | High — core feature empty | Build extractor early; human QA sweep (10.8) |
| Free-tier limits (Workers/D1/Vercel) throttled under load | High — app slow/down | Load test (10.7); KV caching; know ceilings |
| AdSense rejected (policy/UX) | Medium — no ad revenue | Compliance audit (8.6) before applying; legal pages |
| Ads wreck UX/perf | Medium — learners leave | Placement rules (8.3) + perf guard (8.4) |
| Payment fraud (fake proof) | High — revenue loss | Admin human approval + reference match + audit trail |
| Mojibake/encoding bugs in content | Medium — looks unprofessional | Lint (2.8) + human sweep (10.8) |
| Low retention after signup | High — business fails | Streaks, nudges, re-engagement (5.3, 5.8, 11.5) |
| Low-end Android performance | Medium — loses core audience | Mobile-first, data-saver (4.8), perf budget (9.1) |

---

# PART G — DEFINITION OF DONE (global)

The app is "done" when:
1. A new learner can sign up on a phone, on a slow network, and finish a free session.
2. A paying learner can transfer ₦, upload proof, get approved, and complete a full course.
3. Gamification (XP, streak, badge, rank) visibly motivates continued learning.
4. Core Web Vitals green on mobile; a11y ≥90; no critical security bugs.
5. The academy staff can run payments/support/admin without a developer.
6. Ads serve compliantly and earn without harming the experience.
7. Backups run; monitoring alerts work; the team can deploy confidently.

---

*End of roadmap. Each task ID is stable — reference it in issues/commits (e.g. "feat(2.3): quiz extraction").*

# CEA LEARN — MASTER TODO CHECKLIST
### Companion to `ROADMAP.md` · Tick items as you complete them
**Status key:** `[ ]` not started · `[~]` in progress · `[x]` done

> Each item = one unit of work. The `🔗` shows what it feeds. Effort: 🟢 small · 🟡 medium · 🔴 large
> Where you see a Phase gate (■), stop and confirm it passes before starting the next phase.

---

# PHASE 0 — FOUNDATION & SETUP

- [ ] **0.1** Create monorepo `cea-learn/` with `apps/web`, `apps/api`, `packages/ui`, `packages/content`, `packages/config` 🟢
  - Why: two deployables (Vercel + Cloudflare), shared types
  - 🔗 → every later phase
  - Done when: `pnpm install` works, both apps boot on localhost

- [ ] **0.2** Scaffold Next.js app (TypeScript, Tailwind, App Router) 🟢
  - 🔗 → 0.6 deploy, Phase 1 design
  - Done when: `npm run build` passes

- [ ] **0.3** Scaffold Cloudflare Worker API (Hono + D1 binding + `/api/health`) 🟢
  - 🔗 → auth, progress, payments
  - Done when: `wrangler dev` returns `{ok:true}`

- [ ] **0.4** Init GitHub repo, `.gitignore`, `main`/`dev` branches, conventional commits 🟢
  - 🔗 → CI/CD (0.6)

- [ ] **0.5** Configure secrets — Vercel env + `wrangler secret` (`JWT_SECRET`, `RESEND_KEY`, `ADMIN_KEY`) 🟢
  - Why: security baseline; never commit secrets
  - Done when: zero secrets in repo; envs resolve

- [ ] **0.6** Wire CI/CD — GitHub Actions: lint + typecheck + build on PR; `main` → Vercel prod + `wrangler deploy` 🟡
  - 🔗 → 0.2, 0.3, 0.4
  - Done when: green pipeline deploys on merge

- [ ] **0.7** Point `learn.cea.ng` → Vercel; API route → Worker; force HTTPS 🟢
  - Why: brand trust + required for AdSense (8.1)
  - Done when: both live over HTTPS

- [ ] **0.8** Integrate Sentry (free) on FE + Worker structured logs 🟢
  - 🔗 → all runtime monitoring

■ **GATE 0** — both apps deploy live green; a test error shows in Sentry

---

# PHASE 1 — DESIGN SYSTEM & BRAND

- [ ] **1.1** Extract brand tokens from `cealogo.png` → Tailwind theme (navy `#1a365d`, gold `#d69e2e`, etc.) 🟢
  - Why: matches the proven PDF identity → coherence
  - Done when: `bg-navy`, `text-gold` usable

- [ ] **1.2** Define typography scale (mobile + desktop) 🟢
  - Why: readable lessons on a 5" phone

- [ ] **1.3** Build `packages/ui` component lib: Button, Card, Badge, ProgressBar, Modal, Toast, Tabs, Accordion, Input, Skeleton 🟡
  - 🔗 → all UI in Phases 4–7
  - Done when: `/styleguide` renders all

- [ ] **1.4** Design gamification visuals: XP bar, streak flame, badge medals, rank emblems, level-map node, confetti 🔴
  - Why: this is the app's signature "game feel"
  - Done when: components + animation variants exist

- [ ] **1.5** Add icon set (Lucide) + spot illustrations for empty states 🟢

- [ ] **1.6** Set up responsive breakpoints + dark mode (system + toggle) 🟡
  - Why: many learners on phones at night

- [ ] **1.7** Define motion presets (Framer Motion): page transitions, XP float, badge pop, correct/wrong shake; respect `prefers-reduced-motion` 🟡

■ **GATE 1** — live `/styleguide`, branded, responsive, dark-mode ready

---

# PHASE 2 — CONTENT PIPELINE  ⚫ EPIC

- [ ] **2.1** Define TS schema: `Course`, `Session`, `Section(A–O)`, `Quiz`, `Question`, `Exercise`, `CaseStudy`, `Diagram`, `Rubric` 🟡
  - 🔗 → parser, DB, UI
  - Done when: types exported from `packages/content`

- [ ] **2.2** Build markdown parser — read all 141 `Session_*.md`, split on `## A.`…`## O.`, emit typed JSON 🔴
  - Why: impossible by hand
  - Done when: 141 sessions → valid JSON

- [ ] **2.3** Quiz extraction — parse §N knowledge checks → `Question[]` with answer + explanation 🔴
  - Why: auto-generates quizzes, no new authoring
  - 🔗 → 6.1 quiz UI, 5.1 XP
  - Done when: every session ≥5 valid questions

- [ ] **2.4** Exercise extraction — parse §I/§J → `Exercise[]` with prompt + model answer 🟡
  - 🔗 → 6.9 practice

- [ ] **2.5** Case-study extraction — parse §K → `CaseStudy[]` (scenario + questions) 🟢
  - 🔗 → 6.6 branching

- [ ] **2.6** Diagram resolver — map each session → its SVG/cover/photo; error on broken refs 🟢
  - 🔗 → 6.8 interactive diagrams

- [ ] **2.7** Pre-render 48 Mermaid blocks → static SVG (drop runtime mermaid.js, saves ~300 KB) 🟡

- [ ] **2.8** Content lint gate — flag missing outcomes, sessions with <1 quiz Q, broken images, mojibake (`?"`), ₦ format 🟡
  - Done when: 0 critical issues

- [ ] **2.9** Asset optimization — images → WebP/AVIF via `sharp`, SVG cleanup, manifest 🟡
  - Why: ₦ data cost
  - Done when: course image payload <1.5 MB

- [ ] **2.10** Content bundling — per-course lazy-loaded JSON (load only when opened) 🟡
  - Done when: home screen loads with zero course content

- [ ] **2.11** Tag Session 1 of each course `isFree:true`; lock the rest 🟢
  - 🔗 → 7.5 gating, conversion funnel

- [ ] **2.12** Seed D1 with content index (titles, order, outcomes, free flag, fees) 🟡
  - 🔗 → catalogue, search
  - Done when: API returns catalogue <50 ms

- [ ] **2.13** Dev hot-reload for content edits (<10 s) 🟢

■ **GATE 2** — 141 sessions live as validated JSON + quizzes + green lint

---

# PHASE 3 — AUTH & ACCOUNTS

- [ ] **3.1** D1 auth schema — `users`, `sessions`, `roles` 🟡
  - Done when: migrated, email indexed

- [ ] **3.2** Register endpoint — validate NG email/phone, hash password (argon2), send welcome email 🟡
  - 🔗 → Resend

- [ ] **3.3** Login / logout / `GET /me` — httpOnly secure JWT (or Lucia session) 🟡
  - Why: httpOnly blocks XSS token theft

- [ ] **3.4** Password reset — emailed single-use expiring token 🟢
  - Why: #1 support burden → self-serve

- [ ] **3.5** Guest mode — browse free content w/o account; prompt signup on save 🟢
  - 🔗 → 2.11, 5.x

- [ ] **3.6** Profile page — avatar, rank, XP, streak, badges, enrolled courses 🟡
  - 🔗 → 5.x gamification

- [ ] **3.7** Admin role + protected `/admin/*` routes + admin API guards 🟡
  - 🔗 → 7.4 approval

- [ ] **3.8** Security hardening — login rate-limit (KV), no user enumeration, CSRF, secure cookies 🟡
  - Why: money flows through this app

- [ ] **3.9** Email templates — welcome, reset, payment-received/approved/rejected, streak-nudge, digest 🟡
  - 🔗 → Resend, 7.7, 11.5

■ **GATE 3** — register→login→profile→reset works; admin guarded; security checks green

---

# PHASE 4 — CORE LEARNING LOOP  ★ the heart

- [ ] **4.1** App shell + nav — header (logo, rank, streak, XP), sidebar/bottom-tab, breadcrumbs 🟡
  - 🔗 → 1.3 components

- [ ] **4.2** Course catalogue/home — 16 cards (cover, title, fee, lock state, progress %), filter + search 🟡
  - 🔗 → 2.12, 7.x payment state

- [ ] **4.3** Course detail — hero, outcomes, full session list with status, Start/Resume CTA 🟡
  - Done when: resume jumps to correct session

- [ ] **4.4** Mission/Level map — winding path of level-nodes with lock/star/progress states 🔴
  - Why: the signature immersion screen
  - 🔗 → 5.7 polish

- [ ] **4.5** Lesson renderer — render sections A–O (headings, tables, code, callouts, images, diagrams) + sticky jump-menu 🔴
  - 🔗 → 2.x content
  - Done when: all 141 render clean at 360px & 1440px

- [ ] **4.6** Granular progress tracking — opened/section-read/completed/quiz-score; "continue where you left off" 🟡
  - 🔗 → API, 5.x, 4.4
  - Done when: kill tab mid-lesson → reopen resumes

- [ ] **4.7** Session completion flow — "Level Complete" screen: XP animation, streak update, unlock, confetti 🟡
  - 🔗 → 5.5, 1.7

- [ ] **4.8** Data-saver mode — defer images, disable heavy animation, text-first, offline toggle 🟡
  - Why: respect ₦ data (Nigerian remote learner)
  - Done when: lesson text readable with images off

- [ ] **4.9** PWA offline caching — cache shell + opened content; background-sync progress 🟡
  - 🔗 → 4.8, 4.6
  - Done when: airplane mode → lesson still readable

- [ ] **4.10** Bookmark + personal notes per section 🟢
  - Done when: notes persist, user-scoped

- [ ] **4.11** Search across enrolled content (client index or D1 FTS5) 🟡

■ **GATE 4** — browse→open→read→track→complete→reward→resume. Core loop CLOSED

---

# PHASE 5 — GAMIFICATION ENGINE

- [ ] **5.1** XP model — rules table (read +10, quiz pass +20, exercise +15, session +25, streak +50); XP ledger in D1 🟡
  - 🔗 → 4.7, 6.1

- [ ] **5.2** Rank ladder — XP→rank (Rookie→Agent→Specialist→Pro→Master→Legend) with emblem + progress 🟢
  - 🔗 → 3.6 profile

- [ ] **5.3** Streak engine — daily rollover, reset after miss, streak-freeze support 🟡
  - Why: biggest retention lever
  - 🔗 → 5.8, 11.5

- [ ] **5.4** Badge system — catalog (first-lesson, perfect-quiz, 7/30/100-day streak, 1000 XP…) + auto-award + showcase 🟡
  - 🔗 → 3.6

- [ ] **5.5** Award orchestration service — one idempotent call grants XP + streak + badge + unlock, returns summary 🔴
  - Why: prevents double-award/race bugs
  - 🔗 → 4.7

- [ ] **5.6** Leaderboard — weekly + all-time, global + per-course, opt-in, KV-cached 🟡

- [ ] **5.7** Level-map polish — animated nodes, greyed locked path, star ratings by quiz score, "boss level" capstone styling 🟡
  - 🔗 → 4.4

- [ ] **5.8** Daily quest + streak-at-risk nudge 🟢
  - 🔗 → 3.9 email

- [ ] **5.9** Anti-cheat — server-side scoring, timestamps, no score-farming, XP/day cap 🟡
  - Why: XP must mean something
  - 🔗 → 6.1, 10.6

■ **GATE 5** — XP/rank/streak/badge/leaderboard live & correct; completion feels rewarding

---

# PHASE 6 — INTERACTIVE COMPONENTS

- [ ] **6.1** Quiz engine — MCQ/T-F/fill-blank/short-answer, instant feedback, explanation, retry, best-score 🔴
  - 🔗 → 2.3 data, 5.1 XP, 5.9 scoring
  - Done when: all types render; scoring server-verified

- [ ] **6.2** Drag-and-drop exercises — match/order/sort, touch + keyboard accessible 🟡
  - 🔗 → 2.4

- [ ] **6.3** Fill-in-the-blank / code-completion 🟢

- [ ] **6.4** Code playground (Web Design + Web Dev) — Monaco/CodeMirror + live preview iframe, starter code, reset 🔴
  - Why: the coding courses need real practice — killer feature
  - Done when: edit→preview <100 ms, sandboxed

- [ ] **6.5** Flashcards + simple spaced-repetition 🟡
  - Why: terminology-heavy courses (Cybersecurity, Office)

- [ ] **6.6** Branching case studies — decisions with consequences from §K 🔴
  - Why: builds judgement (Cybersecurity, Business)
  - 🔗 → 2.5

- [ ] **6.7** Self-assessment checklists (from §M rubrics) 🟢
  - 🔗 → metacognition

- [ ] **6.8** Interactive SVG diagrams — hover tooltips / tap-to-reveal / step-through on the 141 diagrams 🟡
  - 🔗 → 2.6

- [ ] **6.9** Exercise submission + model-answer reveal + self-score 🟡
  - 🔗 → 2.4

- [ ] **6.10** Media embed component (audio/screencast) — v2-ready placeholder 🟢

■ **GATE 6** — ≥3 interactive types per relevant course; coding courses have working playground

---

# PHASE 7 — PAYMENTS, ENROLLMENT & ADMIN

- [ ] **7.1** Pricing config — per-course ₦ fees, admin-editable 🟢
  - Done when: fees render on catalogue + checkout

- [ ] **7.2** Checkout / payment-instruction page — show **Delgra Ltd · 6674684361 · Moniepoint MFB**, amount, unique reference, "I have paid" CTA 🟡
  - 🔗 → 7.3

- [ ] **7.3** Proof-of-payment upload — signed URL → R2; `payment` row (status=pending) 🟡
  - 🔗 → R2, D1

- [ ] **7.4** Admin approval queue — pending proofs w/ image preview, Approve/Reject(+reason) 🔴
  - Why: the human access gate
  - 🔗 → 3.7 admin

- [ ] **7.5** Access-gating middleware — check enrollment before locked sessions (402/403); free sessions bypass 🟡
  - 🔗 → 2.11
  - Done when: non-payer blocked on Session 2+; payer full access

- [ ] **7.6** Admin comp/grant path — give course without payment (gift/scholarship/in-person) 🟢

- [ ] **7.7** Payment emails — proof received / approved / rejected(with reason) 🟡
  - 🔗 → 3.9 Resend
  - Why: trust is critical for ₦ transfers

- [ ] **7.8** Admin user management — search, view progress/XP, reset password, ban, adjust XP 🟡

- [ ] **7.9** Admin content management — lint reports, hot-reload trigger, per-session stats 🟡

- [ ] **7.10** Admin dashboard KPIs — signups, active, revenue ₦, pending, top courses, funnel 🔴
  - Why: the business cockpit

- [ ] **7.11** Revenue reconciliation export (CSV) — matches Delgra bank statement 🟢

- [ ] **7.12** Access-duration / revoke policy config 🟢

■ **GATE 7** — browse→pay→upload→approve→access works; staff can run ops

---

# PHASE 8 — MONETIZATION (ADS)  ⚠️ protect learning UX

- [ ] **8.1** Integrate AdSense (`ca-pub-9117572925263537`) + site verification 🟢
  - 🔗 → 0.7 domain

- [ ] **8.2** Integrate ngAdverts slots 13225 + 13226 (with `data-cfasync="false"`) 🟢

- [ ] **8.3** Ad placement strategy — between lessons / catalogue / completion / leaderboard; **never** mid-quiz or mid-paragraph; cap density 🔴
  - Why: ads in reading flow tank completion + can violate AdSense UX policy

- [ ] **8.4** Ad lazy-load + perf guard (load after content; don't hurt LCP/CLS) 🟡
  - Done when: Lighthouse perf ≥85 with ads on

- [ ] **8.5** Soft ad-blocker detection → gentle support-us message (non-blocking) 🟢

- [ ] **8.6** AdSense policy compliance audit — content, navigation, privacy/ToS, ad-label separation 🟡
  - Why: rejection = zero revenue

- [ ] **8.7** Publish privacy policy + ToS pages 🟢
  - 🔗 → required by AdSense + legal

- [ ] **8.8** Revenue analytics — ad impressions/clicks + course revenue in admin 🟢

■ **GATE 8** — ads serving compliantly, not hurting UX/perf, revenue visible

---

# PHASE 9 — PERFORMANCE, SEO & RELIABILITY

- [ ] **9.1** Set Core Web Vitals budget — LCP<2.5s, CLS<0.1, INP<200ms on 4G 🟢

- [ ] **9.2** Image + font optimization — Next `<Image>` WebP/AVIF, lazy below fold, self-host subset fonts 🟡
  - Done when: fonts <100 KB

- [ ] **9.3** Code-split + bundle audit — dynamic-import editor/charts; initial JS <150 KB 🟡
  - Why: don't ship code editor to a Typing lesson

- [ ] **9.4** Caching strategy — static headers + CDN, KV catalogue/config, revalidate on update 🟡

- [ ] **9.5** API perf — indexes, KV rate-limit, pagination everywhere 🟡
  - Done when: p95 API <150ms

- [ ] **9.6** SEO — sitemap, robots.txt, per-course metadata + OG images, Course structured data 🟡

- [ ] **9.7** Error handling + graceful degradation — error boundary, offline banner, retry; never white screen 🟡

- [ ] **9.8** Uptime monitoring + alerts (health checks, Sentry, analytics anomalies) 🟢

- [ ] **9.9** Backups — scheduled D1 backup, R2 versioning, tested restore 🔴
  - Why: losing DB = losing all progress + payment records

■ **GATE 9** — green CWV on mobile, SEO indexed, backups verified

---

# PHASE 10 — TESTING, QA & ACCESSIBILITY

- [ ] **10.1** Unit tests (Vitest/Jest) — XP, streak rollover, rank, gating, quiz scoring, parser 🟡
  - Done when: >80% coverage on logic

- [ ] **10.2** API integration tests — auth, progress, payment approval, gating (against test D1) 🟡

- [ ] **10.3** E2E (Playwright) — signup→learn→quiz→complete; guest→pay→upload→approve→access 🔴

- [ ] **10.4** Device/browser matrix — low-end Android, iOS Safari, Windows Chrome/Edge (academy PCs), 360px→1440px 🟡

- [ ] **10.5** Accessibility audit — WCAG 2.1 AA: contrast, keyboard nav, ARIA on quiz/drag, reduced-motion 🟡
  - Done when: axe/Lighthouse a11y ≥90

- [ ] **10.6** Security review — OWASP top-10: XSS sanitize, SQLi, CSRF, IDOR on progress/payment, upload validation 🔴

- [ ] **10.7** Load test — simulate ~200 concurrent (post-class spike) 🟡
  - Why: know free-tier ceiling before it bites

- [ ] **10.8** Human content QA sweep — mojibake, broken links, images, formatting per course 🔴
  - Why: auto-lint can't catch awkward prose

- [ ] **10.9** Admin workflow drill + write SOP so staff can operate solo 🟡

■ **GATE 10** — tests green, a11y ≥90, no critical security bugs, staff trained

---

# PHASE 11 — LAUNCH & GROWTH

- [ ] **11.1** Soft launch beta — invite 10–20 real learners, instrument, collect feedback 🟡

- [ ] **11.2** Feedback loop — in-app button → triage → fix top friction within a week 🟡

- [ ] **11.3** Launch checklist — domains, SSL, env, backups on, monitoring on, ads approved, legal pages, real ₦ payment test, staff trained 🔴

- [ ] **11.4** Public launch — announce, open registration, monitor dashboards 🔴

- [ ] **11.5** Re-engagement engine — streak-nudge, "1 lesson from finishing", weekly digest, win-back 🔴
  - 🔗 → 3.9, 5.3

- [ ] **11.6** Growth loops — shareable badge cards, referral reward, friend leaderboard 🟡

- [ ] **11.7** Weekly analytics review ritual — DAU/WAU, D7/D30 retention, completion, conversion, ad RPM, revenue 🟡

- [ ] **11.8** v2 backlog — AI tutor, live cohorts, certificates, Paystack auto-pay, TWA mobile app, offline audio 🟡

■ **GATE 11** — live, earning (fees + ads), learners retained, v2 planned

---

# QUICK-REFERENCE: SPRINT MAPPING

| Sprint | Do these | Phase |
|---|---|---|
| 1 | 0.1–0.8, 1.1–1.7 | 0 + 1 |
| 2 | 2.1–2.13 | 2 (content first — it IS the product) |
| 3 | 3.1–3.9, 4.1–4.5 | 3 + first half of 4 |
| 4 | 4.6–4.11, 5.1–5.5 | close loop + core gamification |
| 5 | 5.6–5.9, 6.1–6.4 | leaderboard + quizzes + playground |
| 6 | 6.5–6.10, 7.1–7.5 | interactives + payment loop |
| 7 | 7.6–7.12, 8.1–8.8 | admin + ads |
| 8 | 9.1–9.9, 10.1–10.9 | perf + QA |
| 9 | 11.1–11.8 | beta → fix → launch |

**Critical path to a working product:** 0 → 2 → 4 → 5 → 7 → 11
**Parallelizable once Phase 4 is stable:** Phase 6 (interactives) and Phase 8 (ads)

---

*Total tasks: 110. Reference IDs in commits/issues (e.g. `feat(2.3): quiz extraction`). Keep `ROADMAP.md` open for the full why/acceptance detail behind each item.*

