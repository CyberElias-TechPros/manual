#!/usr/bin/env node
/**
 * Leak audit — the one invariant the whole pricing model rests on.
 *
 * The learner bundle is public: it is served to any browser, cached by service workers and
 * re-served offline. So it must not contain what the answer keys contain. This script walks
 * every built course file and fails if any of them still carries a graded value, and it
 * checks the two things that make that safe:
 *
 *   1. every answer-bearing field is empty in apps/web/.content/courses/*.json
 *   2. apps/web/.content/keys/*.json (the keys themselves) exist and are NOT reachable
 *      through any route the web app exposes
 *
 * Run by `pnpm test` and by CI. If a content change ever reintroduces a leak, this exits 1
 * before it can ship — the alternative (a learner discovering it) is a free course.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const DIR = process.env.CEA_CONTENT_DIR || join(ROOT, 'apps/web/.content')
const ANSWER_FIELDS = new Set([
  'answer', 'answerKey', 'modelAnswer', 'correct', 'correctId', 'resolution', 'accept',
  'code', 'starterCode', 'gapAnswers', 'marks',
])
// Fields that may sit empty next to a learner, or carry a *criteria* list with the marks
// removed: seeing how you will be judged is part of the exercise, the numbers are not.
const ALLOWED_IF_EMPTY = new Set(['rubric', 'successCriteria', 'keywords', 'explanation', 'checklist'])

const problems = []
const filled = (v) =>
  Array.isArray(v) ? v.length > 0
    : typeof v === 'string' ? v.trim().length > 0
      : typeof v === 'boolean' ? v
        : v !== null && typeof v === 'object' ? Object.keys(v).length > 0
          : v != null

function walk(node, where, slug) {
  if (!node || typeof node !== 'object') return
  for (const [key, value] of Object.entries(node)) {
    const at = `${slug} · ${where}.${key}`
    if (ANSWER_FIELDS.has(key) && filled(value)) problems.push(`${at} holds "${String(JSON.stringify(value)).slice(0, 90)}"`)
    else if (key === 'rubric' && Array.isArray(value)) {
      for (const row of value) {
        if (row && typeof row === 'object' && filled(row.marks)) problems.push(`${at} exposes marks (${JSON.stringify(row.marks)})`)
      }
    } else if (key === 'blanks' && Array.isArray(value)) {
      for (const b of value) if (b && (filled(b.answer) || filled(b.accepts))) problems.push(`${at} exposes a gap answer`)
    }
    walk(value, `${where}.${key}`, slug)
  }
}

if (!existsSync(join(DIR, 'courses'))) {
  console.error('leak-audit: no built bundle at ' + join(DIR, 'courses') + ' — run `pnpm content:build` first.')
  process.exit(2)
}

let files = 0
for (const f of readdirSync(join(DIR, 'courses'))) {
  if (!f.endsWith('.json')) continue
  files++
  walk(JSON.parse(readFileSync(join(DIR, 'courses', f), 'utf8')), '', f.replace(/\.json$/, ''))
}

// 2. the keys exist (so the audit above means something) and nothing serves them.
const keyFiles = existsSync(join(DIR, 'keys')) ? readdirSync(join(DIR, 'keys')).filter(f => f.endsWith('.json')) : []
if (!keyFiles.length) problems.push('apps/web/.content/keys/ is empty — answer keys were never written, so grading cannot work')

const scanDirs = [join(ROOT, 'apps/web/src'), join(ROOT, 'apps/api/src')]
const offenders = []
for (const dir of scanDirs) {
  if (!existsSync(dir)) continue
  const stack = [dir]
  while (stack.length) {
    const d = stack.pop()
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, entry.name)
      if (entry.isDirectory()) { stack.push(p); continue }
      if (!/\.(ts|tsx|mjs)$/.test(entry.name)) continue
      const text = readFileSync(p, 'utf8')
      // a route that reads keys/ is fine (that is the design); one that puts it in a
      // response body or a static path is the leak
      if (/send\(.*keys\/|static.*\.content\/keys|\/api\/keys|res\.json\(keys\)/s.test(text)) offenders.push(p)
      if (/readFileSync\([^)]*\.content\/keys/.test(text) && !/server-only/.test(text) && p.includes('apps/web')) {
        offenders.push(p + ' (reads keys/ outside the api package)')
      }
    }
  }
}
offenders.forEach(o => problems.push(`keys/ reachable from client code: ${o.replace(ROOT, '')}`))

if (problems.length) {
  console.error(`leak-audit: FAILED (${problems.length} problem${problems.length > 1 ? 's' : ''} across ${files} course bundles)`)
  for (const p of problems.slice(0, 25)) console.error('  ✗ ' + p)
  if (problems.length > 25) console.error(`  … and ${problems.length - 25} more`)
  process.exit(1)
}
console.log(`leak-audit: ✓ ${files} learner bundles carry no answer key · ${keyFiles.length} key files stay server-side`)
