# cea-learn — API

One Hono application (`src/app.ts`) mounted on two runtimes, so the thing you test is the thing that
ships. There is no ORM, no framework beyond Hono, and no second source of truth for a route: the
route table lives in `src/routes.ts` and both runtimes import it.

| runtime | entry | store | used for |
| --- | --- | --- | --- |
| Cloudflare Worker | `src/worker.ts` | D1 (`DB`), KV (`KV` rate limits + `CONTENT_KV`), R2 (`STORAGE` for receipts) | production |
| Node | `src/node-server.ts` → `src/node-env.ts` | `node:sqlite` file + the filesystem under `var/` | `pnpm dev`, CI, any machine without a Cloudflare account |

`node-env.ts` is the only adapter: it exposes the same `env.DB`-shaped object (`prepare / bind / all /
first / run`, `KV.get/put`, R2 `get/put`) over sqlite and a folder, which is why the routes never
import `node:sqlite` or `cloudflare:` bindings directly. `isProduction` refuses to boot with the
default `JWT_SECRET`, and a missing `RESEND_API_KEY` means *write the mail to `var/mail`*, never
*skip sending*.

## Run it

```bash
pnpm install
pnpm content:build                      # the learner bundle + keys/ the API reads (see §Content below)
pnpm db:seed                             # admin + demo learner into var/cea-learn.sqlite
pnpm worker:dev                          # http://localhost:8787/api/health
node tools/smoke-api.mjs                 # 51 assertions against that URL
node tools/smoke-api.mjs http://localhost:8787   # …or any deployed URL
```

`pnpm dev` from the repo root runs the web app, this API and the content watcher together; `--api`
keeps the API on the node runtime without the file watchers.

Dev logins (seeded, and only ever valid when `APP_ENV !== production`):
`admin@cea.ng / Admin#2024pass` · `learner@cea.ng / Learner#2024pass` · `smoke@cea.ng / Smoke#2024pass`
· redeemable code `CEA-DEMO-2024`.

## Environment

| name | what it does | if absent |
| --- | --- | --- |
| `JWT_SECRET` | signs the session cookie | a dev-only default, and production boot refuses |
| `CEA_SQLITE` | sqlite path for the node runtime | `var/cea-learn.sqlite` (a temp file on Vercel) |
| `CEA_ROOT` | where `var/` (mail, uploads, db) lives | the repo root |
| `CEA_CONTENT_DIR` | the built bundle (`index.json`, `courses/`, `keys/`, `search/`) | `apps/web/.content` |
| `PUBLIC_URL` | absolute links in mail and the OG tags | `http://localhost:3000` |
| `APP_ENV` | `production` turns off the dev logins and the default secret | dev |
| `RESEND_API_KEY` | transactional mail (Resend) | writes the message to `var/mail/*.html` instead — never "skip sending" |
| `MAIL_FROM` | sender header | `CEA Learn <learn@cea.ng>` |
| `ADMIN_KEY` | the `x-cea-admin-key` back door for scripts | admin routes need an admin session only |
| `CRON_PATH` | secret segment of `POST /api/admin/nudges/run` | the route needs an admin session |
| `DB` / `KV` / `CONTENT_KV` / `STORAGE` | Worker bindings (D1, rate-limit KV, published content, receipts) | the Worker will not start — see below |

## Routes (61)

Two routes exist only to be probed — `GET /api/health` (which reports whether the content bundle is
loaded) and `GET /api/csrf`. Reading the catalogue, searching it, verifying a certificate code and
fetching one's own upload work without a session; everything else is cookie-scoped, and the admin
group additionally wants `x-cea-admin-key` or an admin session. CSRF is double-submit: no CSRF header
means no mutation, which is why the smoke test asserts that before it asserts anything else.

| group | mount | routes |
| --- | --- | --- |
| auth | `/api/auth` | `register` `login` `logout` `forgot` `reset` `upgrade` `guest` `me` `PATCH me` `DELETE me` `GET me/export` `POST revoke` |
| learning | `/api` | `GET courses[/:slug[/:n]]` (402 when locked) · `POST learn/{open,section,quiz,exercise,scenario,flashcards,checklist,complete,blank}` · `GET learn/due` · `GET/POST/DELETE notes[/:id]` · `GET/POST/DELETE bookmarks[/:id]` · `GET search` · `GET leaderboard` |
| money | `/api` | `GET payments/options` `POST payments/intent` `POST payments/proof` `GET payments` `DELETE payments/:id` `POST codes/redeem` `GET uploads/:key` |
| certificates | `/api` | `GET certificates` `POST certificates/issue` `GET certificates/verify` |
| admin | `/api/admin` | `GET overview` `GET summary` `GET users` `POST users/:id/{ban,unban,xp,reset-password}` `GET payments` `POST payments/{:id/approve,:id/reject}` `GET payments.csv` `GET/POST settings` `POST access-codes` `POST grant` `GET audit` `POST nudges/run` `POST ads/event` `POST feedback` |

Every graded verdict — quiz, exercise, scenario, code blanks — is computed **on the server**, from
`keys/<slug>.json`, and the learner bundle never contains an answer. `tools/leak-audit.mjs` (part of
`pnpm test`) fails the build if one leaks. Awarding is idempotent per `(user_id, kind, key)`, XP is
capped at `XP.dailyCap` per Lagos day, and a level cannot close before `XP.minCompletionSeconds` —
the rules live in `packages/config/index.js`, not in this file.

## Database

`migrations/0001_init.sql` is the whole schema (31 tables, D1-shaped SQL that is also valid sqlite):
`users`, `auth_sessions`, `password_resets`, the two index tables the catalogue reads
(`course_index`, `session_index`), `enrollments`, `course_pricing`, `access_codes` +
`access_code_redemptions`, `payments`, `progress`, `xp_events`, `awards`, `badges`, `user_badges`,
`daily_quests`, `notes`, `bookmarks`, `quiz_attempts`, `exercise_submissions`, `playground_runs`,
`flashcard_reviews`, `feedback`, `audit_log`, `email_log`, `notification_outbox`,
`course_completions`, `settings`, `ad_events`, `certificates`, `leaderboard_weekly`. Receipt files
themselves live in R2 (or `var/uploads` on node), never in the database.

One migration for v1; add `0002_*.sql` rather than editing `0001`, since D1 applies by filename and
an already-applied file is never re-run.

```bash
pnpm --filter @cea/api db:migrate          # local D1 (wrangler --local), for dev:cf
pnpm --filter @cea/api db:migrate:remote   # the real one, once D1 exists
```

## First deploy (the commands `wrangler.toml` points here)

```bash
npx wrangler d1 create cea-learn                     # → paste database_id into wrangler.toml
npx wrangler kv namespace create RATE_LIMITS         # → KV.id
npx wrangler kv namespace create CONTENT              # → CONTENT_KV.id
npx wrangler r2 bucket create cea-learn-receipts     # → STORAGE.bucket_name
npx wrangler secret put JWT_SECRET                    # openssl rand -hex 32
npx wrangler secret put ADMIN_KEY
npx wrangler secret put RESEND_API_KEY
pnpm --filter @cea/api db:migrate:remote
pnpm content:publish                                 # index + search to KV, figures to R2
pnpm --filter @cea/api deploy                        # after filling [vars] PUBLIC_URL etc.
node tools/smoke-api.mjs https://<worker-origin>      # same 51 assertions, in production
```

`crons = ["30 18 * * *"]` (19:30 Lagos) fires `worker.ts → scheduled()`, which re-enters the app
through `POST {CRON_PATH || '/api/admin/nudges/run?kind=both'}` with `x-cea-admin-key` attached — so
the cron and the "run it now" admin button execute the same handler, and there is no second
implementation to drift.

## Tests

* `node tools/smoke-api.mjs [base]` — 51 assertions: CSRF first, then register → guest → merge,
  open → section read → quiz → exercise → scenario → blank → complete, the 402/403 lock states,
  payment intent → proof → approve/reject → refund window, certificate issue + verify, admin
  approve/reject/ban/export, and the leak guarantee. It is run against **both** runtimes in CI
  (`docs/DEPLOYMENT.md` §7) — that is what keeps "dev mirrors prod" true rather than merely claimed.
* `pnpm test` — the content pipeline's own suites plus `tools/leak-audit.mjs`.
* `pnpm typecheck` — `tsc` over `apps/api` too; the Worker types come from `pnpm --filter @cea/api types`
  (`wrangler types`, which writes `env.d.ts`).
