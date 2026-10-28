# CEA LEARN — deployment & operations runbook

Everything here is the *operator's* half: what to create, in which order, what each variable is
for, and what a person does weekly. The app-side facts (env names, bindings, cron path) were read
out of `apps/api/src/*`, `apps/web/next.config.mjs` and `apps/api/wrangler.toml` — if you add a
binding, update this file in the same PR.

---

## 1. Topology (the README's A5, as built)

```
learner browser ──▶ Vercel  apps/web        Next.js 14 (App Router, static + route handlers)
                          └─ /api/*  ─────▶ same Hono app as below (mounted route handler)
                          └─ /assets/** ◀─ copied from ./assets by tools/link-assets.mjs

Cloudflare Worker  apps/api  Hono + D1 (state) + KV (rate limits, catalogue cache)
                          + R2 (payment proofs, private) + R2/KV (published content JSON)
                          + Cron (18:30 UTC = 19:30 Lagos) for nudges/digest
```

The API is **one route table, two runtimes** (GAP-ANALYSIS §4.1): `apps/api/src/worker.ts` for
Cloudflare, `apps/web/src/app/api/[[...path]]/route.ts` for Vercel/local. Both must pass
`node tools/smoke-api.mjs` (51 assertions) before a release.

## 2. Environment variables

Names below are the ones the code actually reads — there are no others.

| var | where | meaning | if missing |
|---|---|---|---|
| `JWT_SECRET` | Worker, Node API | signs the session cookie | random per boot in dev (**refuses to start** when `APP_ENV=production`) |
| `ADMIN_KEY` | Worker, Node API | lets scripts call `/api/admin/*` with `x-cea-admin-key` | admin UI still works for a `role='admin'` session |
| `RESEND_API_KEY` | Worker, Node API | transactional email | dev writes the HTML to `var/mail/*.html` and logs; **production logs only** (never fails a request because mail is down) |
| `MAIL_FROM` | both | sender, e.g. `CEA Learn <learn@cea.ng>` | `CEA Learn <no-reply@cea.ng>` |
| `PUBLIC_URL` | API | absolute URLs in emails, upload paths | `http://localhost:3000` |
| `APP_ENV` | API | `production` turns on secure cookies, strict secret check, tighter rate limits | `development` |
| `CRON_PATH` | Worker | what the cron hits | `/api/admin/nudges/run?kind=both` |
| `NEXT_PUBLIC_URL` | web | metadata base, sitemap/robots host, canonicals | `https://learn.cea.ng` |
| `NEXT_PUBLIC_ADS` | web | set to `off` to disable every ad slot at build time | ads on, still policy-gated |
| `CEA_CONTENT_DIR` | both | where the built bundle lives | `apps/web/.content` (walks a few cwds, then fails loudly) |
| `CEA_SQLITE` | Node API only | dev/demo database file | `var/cea-learn.sqlite` |
| `CEA_ALLOW_LAB` | web | exposes `/styleguide/lab` | on in dev, off in production |
| `CEA_ADMIN_EMAIL` / `CEA_ADMIN_PASSWORD`, `CEA_DEMO_*`, `CEA_SMOKE_*` | tools/seed, smoke | dev credentials only | seeded defaults (documented in README PART F); never seed in production |

Set them as **secrets**, not plaintext vars:

```bash
wrangler secret put JWT_SECRET        # openssl rand -base64 48
wrangler secret put ADMIN_KEY         # long random; also give it to the ops script
wrangler secret put RESEND_API_KEY
```
Vercel → Project → Settings → Environment Variables: `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_ADS`,
`JWT_SECRET`, `ADMIN_KEY`, `RESEND_API_KEY`, `MAIL_FROM`, `APP_ENV=production` (and Preview =
`APP_ENV=development`, so a preview deploy can never talk to the production D1).

## 3. Cloudflare side, in order

```bash
pnpm --filter @cea/api add -D wrangler          # or use your global wrangler
wrangler login

# 1. databases / namespaces / buckets — copy the printed ids into apps/api/wrangler.toml
wrangler d1 create cea-learn
wrangler kv namespace create KV                  # rate limits
wrangler kv namespace create CONTENT_KV          # published catalogue + search
wrangler r2 bucket create cea-learn-uploads      # payment proofs (private)
wrangler r2 bucket create cea-learn-content      # learner JSON + answer keys

# 2. schema (14 tables + indexes) and the content index
wrangler d1 migrations apply cea-learn --remote
node tools/seed.mjs --sql-only > /tmp/content.sql && wrangler d1 execute cea-learn --remote --file=/tmp/content.sql

# 3. code
node tools/publish-content.mjs            # bundle → KV + R2 (answer keys → R2 only)
pnpm --filter @cea/api deploy             # wrangler deploy (cron from wrangler.toml)
curl -s https://<worker>/api/health       # {"ok":true,"db":"up",...}
```

Notes that cost time if learned later:
* the cron runs `CRON_PATH`, so `/api/admin/nudges/run` must accept `x-cea-admin-key` (it does) —
  if you change `ADMIN_KEY`, redeploy or the daily job silently stops emailing;
* D1 has no `NOW()`-relative indexes, so `progress.last_seen_at` queries are bounded by
  `LIMIT` — do not remove those limits when "optimising";
* answer keys live only in `keys/*.json` inside R2. The Worker never lists the bucket and no
  route reads `content/keys` from a client-supplied path (`tools/leak-audit.mjs` fails CI if a
  route starts doing that).

## 4. Vercel side

* Import the repo, framework auto-detected, root directory `apps/web`.
* Build command `pnpm --filter @cea/web build` (it runs `packages/content`'s build first, so the
  bundle exists inside the serverless function; `outputFileTracingIncludes` copies it in — the
  setting is under `experimental` in Next 14, which is easy to get wrong).
* Output directory `.next`. Install command `pnpm install --frozen-lockfile`.
* Domain `learn.cea.ng` (+ `www` redirect). Vercel issues the cert; force HTTPS.
* The web app talks to the API **through its own `/api/*` route handler**, so no CORS and no
  second hostname in the browser. If you later split them, `PUBLIC_URL` and the CSP's
  `connect-src` both need the Worker origin.

## 5. Content publishing (the only release step that touches learner-facing text)

```bash
# content/ is the corpus; assets/ holds the clipped figures — both are committed sources
git checkout -b content/refresh-<date>
node tools/pdf-extract/extract.py --all            # re-read the PDFs (needs .venv-pdf: pymupdf+Pillow)
node tools/pdf-extract/extract.py --all --repair-only   # encoding pass only, no re-split
pnpm content:build                                  # bundle + lint + seed.sql + report.json
node tools/link-assets.mjs                          # figures → apps/web/public/assets
pnpm test                                           # 23 unit/integration + leak audit + lint gate
pnpm typecheck && pnpm --filter @cea/web build
git add content assets && git commit && gh pr create
# after merge:
node tools/publish-content.mjs                      # KV + R2 (Worker)
```

`--only index,courses` publishes a subset; `--dry-run` prints the plan; `--verify` reads every
object back and compares bytes. A learner sees new text on the next request (KV is read
per-request, cached in-memory for 30 s).

If `pnpm test` fails on the lint gate, the fix belongs in `content/<slug>/session-NN.md`
(mojibake, a missing heading) or in the extractor — **never** by muting the rule.

## 6. Weekly human operations (the SOP for 10.9)

| task | how |
|---|---|
| approve payments | `/admin/payments` → open proof → confirm the **bank statement**, not just the image → Approve (correct the amount here if the learner under/over-paid) → email goes out automatically |
| reject | Reject + one-sentence reason (it is emailed verbatim; "amount short by ₦2,000" beats "invalid") |
| refund request | confirm inside 7 days of approval **and** that level 3 is still locked (`PAYMENT.refundWindowDays`) → transfer back → mark rejected-with-reason or note in `/admin/users`; the app has no refund rail because the academy's own transfer details are the rail |
| grant a course (scholarship, gift, in-person) | `/admin/users` → Grant, or issue an access code and hand it over |
| ban / unban | `/admin/users` → Ban (their sessions die on the next request; the reason is written to the audit log) |
| erase a learner (NDPR) | ask them to use Settings → Delete my account (self-service, deletes rows, keeps a 90-day receipt stub); if they can't log in, run the DELETE statements in `docs/DEPLOYMENT.md` §7 against D1 and record it in the audit |
| second admin | `wrangler d1 execute cea-learn --remote --command "UPDATE users SET role='admin' WHERE email='…'"` (dev/demo: `node tools/seed.mjs --promote <email>`) |
| content gap | the 10 levels with no answer key in the PDFs are listed by `pnpm content:lint`; publish the keys in the manual and rebuild |

## 7. Backups, retention, erase

```bash
# nightly (add as a GitHub Actions schedule, or run by hand before a content release)
wrangler d1 export cea-learn --remote --output=backups/cea-$(date +%F).sql
```
* R2 payment proofs: enable bucket versioning in the Cloudflare dashboard (one click, keeps a
  deleted receipt for 30 days — the tax window is longer, so delete deliberately, not by expiry).
* Receipts older than `PAYMENT.retentionGraceDays` (90) should be pruned:
  ```sql
  DELETE FROM payment_proofs WHERE payment_id IN
    (SELECT id FROM payments WHERE status IN ('approved','rejected') AND decided_at < datetime('now','-90 days'));
  ```
* A learner erasure is, in order: `progress`, `xp_ledger`, `badges`, `notes`, `bookmarks`,
  `flashcard_reviews`, `exercise_submissions`, `payment*` (rows, not the R2 object unless asked),
  `auth_sessions`, `certificates` **except** the verification register entry (name + code + course
  stay — an employer must be able to check a certificate), then `users`.
* Restore test: create a scratch D1, `wrangler d1 execute <scratch> --file=backups/cea-<date>.sql`,
  `GET /api/health`. Do this **before** you need it. A backup that has never been restored is a
  file, not a backup.

## 8. Monitoring

* `/api/health` — DB + bundle state; alert if `content` is empty or `db` isn't `up`.
* Cloudflare → Workers → Logs (structured lines, `trace()` in `routes.ts`) and the D1 metrics
  tab; Vercel → Functions for the web side.
* Sentry is not wired (0.8 deferred); until it is, `/api/admin/audit` + the Worker log tail are
  the incident trail.
* Weekly review ritual (11.7): `/admin/overview` → signups, active 7d, revenue, pending queue,
  funnel; then `pnpm content:lint` to see whether the corpus is drifting.

## 9. Launch checklist (11.3, the boxes that must be ticked outside this repo)

1. `learn.cea.ng` on Vercel with HTTPS; `PUBLIC_URL`/`NEXT_PUBLIC_URL` set to it.
2. Worker deployed; `api/health` green; cron listed (`wrangler deployments view`).
3. D1 migrated and content index seeded; `pnpm test` green on the release commit.
4. Content published (`publish-content.mjs`) and one level read in a **fresh** browser profile.
5. `cea.ng` email: SPF `include:resend._netblocks…`-equivalent + DKIM + return-path verified,
   `MAIL_FROM` on that domain, then a real registration end-to-end (welcome + reset arrive).
6. One real ₦ payment: intent → transfer → proof → approve → level 3 opens; CSV row matches the
   Moniepoint statement.
7. `/terms` + `/privacy` reviewed (refund window, 90-day receipts, NDPR erase path) — legal sign-off.
8. AdSense property verified for the domain; the two ngAdverts slots load; nothing renders inside
   a quiz (check `/learn/<slug>/1` with devtools).
9. Backups scheduled, restore rehearsed once.
10. Staff trained on §6 (approve/reject/grant/ban/erase) with a written SOP — item 10.9's gate.

## 10. Local development (what this repo already does)

```bash
pnpm install                # no build scripts run; see pnpm-workspace.yaml's allowBuilds
pnpm dev                    # :3000 web (API mounted in-process) + :8787 standalone Node API
pnpm db:seed                # dev DB + demo admin/learner/smoke accounts + access code
pnpm content:watch          # rebuild the bundle on any content edit
pnpm test                   # unit + corpus + leak audit + corpus lint
node tools/smoke-api.mjs http://localhost:8787   # against the standalone API
node tools/smoke-api.mjs http://localhost:3000   # against Next's route handler
```

`tools/dev.mjs` prints both URLs and tails the logs. Payment proofs land in
`var/uploads`, email in `var/mail`, the database in `var/cea-learn.sqlite` — all gitignored, all
safe to delete.
