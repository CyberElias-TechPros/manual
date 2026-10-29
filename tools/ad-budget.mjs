#!/usr/bin/env node
/**
 * The ad budget — a static check, because a runtime counter in a React render is a lie.
 *
 * `ADS.policy.maxPerView` is the one promise the "ads everywhere" decision (2026-10-29) kept: past
 * this many slots on a screen the page stops being a lesson and starts being a portal. Counting it at
 * runtime inside `AdSlot` would either double-count under StrictMode or shift layout after paint
 * (10.1 keeps CLS at zero), so it is checked where it is actually decided: in the source, by whoever
 * adds a slot.
 *
 *   node tools/ad-budget.mjs
 *
 * Also asserts the two invariants that make the placement list mean something: every `<AdSlot
 * placement="…">` names a placement in the config (a typo would silently render nothing), and the
 * config's `forbidden` list stays empty-or-honoured — if a name is in both lists, the policy is
 * contradicting itself and the build should say so rather than the learner noticing.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { ADS } from '../packages/config/index.js'

const ROOTS = ['apps/web/src/app', 'packages/ui']
const PAGES = new Set()      // one file == one view, in this app's route-per-folder layout
const seen = []

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx|jsx)$/.test(name)) seen.push(p)
  }
}
for (const r of ROOTS) walk(r)

const allowed = new Set(ADS.policy.allowedPlacements)
const forbidden = new Set(ADS.policy.forbidden ?? [])
const counts = new Map()
const problems = []

for (const file of seen) {
  const src = readFileSync(file, 'utf8')
  const re = /<(?:Ng)?AdSlot\s+placement="([^"]+)"/g
  let m
  while ((m = re.exec(src))) {
    const placement = m[1]
    PAGES.add(file)
    counts.set(file, (counts.get(file) || 0) + 1)
    if (!allowed.has(placement)) problems.push(`${file}: placement "${placement}" is not in ADS.policy.allowedPlacements — it renders nothing at all`)
    if (forbidden.has(placement)) problems.push(`${file}: placement "${placement}" is in allowedPlacements *and* policy.forbidden — the policy contradicts itself`)
  }
}

// Per-file, not per-page, and that is the honest unit here: the kit files hold the slots that only
// render one at a time (the quiz shows one question per screen), while a page file's slots all render
// together. So a page's real total is its own count + the site band + at most one from a kit
// component it embeds — which is what the ceiling is written against.
// The site-wide band in the root layout counts toward every page, so it is added to each file's total.
const layout = readFileSync('apps/web/src/app/layout.tsx', 'utf8')
const siteSlots = (layout.match(/<AdSlot\s+placement="site-footer"/g) || []).length

let over = 0
for (const [file, n] of [...counts].sort((a, b) => b[1] - a[1])) {
  const total = n + siteSlots
  if (total > ADS.policy.maxPerView) {
    over++
    problems.push(`${file}: ${total} ad slots on one view (${n} here + ${siteSlots} from the site band) — maxPerView is ${ADS.policy.maxPerView}`)
  }
}

if (problems.length) {
  for (const p of problems) console.log(`  ✗ ${p}`)
  console.log(`ad-budget: ${problems.length} problem(s) across ${counts.size} files with slots`)
  process.exitCode = 1
} else {
  const heaviest = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]
  console.log(`ad-budget: ✓ ${counts.size} files place ${[...counts.values()].reduce((n, x) => n + x, 0)} slot(s) (+${siteSlots} site-wide band), heaviest page ${heaviest ? heaviest[1] + siteSlots : siteSlots} of max ${ADS.policy.maxPerView}; every placement name resolves`)
}
