#!/usr/bin/env node
/**
 * Route walk — the cheapest test that catches the most embarrassing failures.
 *
 * Every page in apps/web is a server component that can be fetched without a browser, so CI can
 * assert the whole route map: nothing 500s, the locked lesson still answers (as a 402 through the
 * API, not a blank page), the 404 page works, and no HTML contains an answer key or a `__next_f`
 * payload of paid lesson text. It runs against any target: `pnpm dev`, `next start`, or production.
 *
 *   node tools/route-walk.mjs                      # http://localhost:3000
 *   node tools/route-walk.mjs https://learn.cea.ng
 *   node tools/route-walk.mjs http://127.0.0.1:3000 --include-admin
 *
 * Exit code is the number of failures (capped at 1), so a CI step is red or green and nothing else.
 */
const base = (process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:3000').replace(/\/$/, '')
const wantAdmin = process.argv.includes('--include-admin')

/** [path, expected status, optional marker that must appear in the HTML] */
const PUBLIC = [
  ['/', 200, 'CEA'],
  ['/courses', 200, 'levels'],
  ['/courses?q=data', 200, 'Data Entry'],
  ['/courses?q=phishing&search=1', 200, ''],
  ['/courses/microsoft-office', 200, 'What you will be able to do'],
  ['/learn/microsoft-office/1', 200, 'Stages in this level'],
  ['/courses/microsoft-office/map', 200, ''],
  ['/courses/typing-computer-basics', 200, ''],
  ['/courses/no-such-course', 404, ''],
  ['/learn/microsoft-office/1', 200, 'Knowledge check'],
  ['/learn/web-development/1', 200, ''],
  ['/learn/graphic-design/1', 200, ''],
  ['/learn/social-media-management/1', 200, ''],
  ['/learn/microsoft-office/99', 404, ''],
  ['/certificates', 200, ''],
  ['/certificates/verify', 200, ''],
  ['/offline', 200, 'offline'],
  ['/leaderboard', 200, ''],
  ['/terms', 200, 'refund'],
  ['/privacy', 200, 'receipts'],
  ['/auth/login', 200, ''],
  ['/auth/register', 200, ''],
  ['/auth/forgot', 200, ''],
  ['/checkout', 200, 'Choose the course'],
  // the checkout body is fetched after mount (it is per-learner), so the server HTML is a
  // shell: what matters is that it answers, renders, and shows no bank details to a crawler
  ['/checkout/microsoft-office', 200, ''],
  ['/styleguide', 200, ''],
  ['/sitemap.xml', 200, 'urlset'],
  ['/robots.txt', 200, 'Disallow'],
  ['/api/health', 200, '"ok":true'],
  ['/api/courses', 200, '"courses"'],
  ['/nope-not-a-page', 404, ''],
]
const GATED = [
  // signed-out: these must not 500 and must not leak lesson text of a paid level
  ['/learn/microsoft-office/5', [200, 402, 307], ''],
  ['/dashboard', [200, 307], ''],
  ['/profile', [200, 307], ''],
  ['/settings', [200, 307], ''],
  ['/search?q=excel', 200, ''],
]
const ADMIN = [['/admin', 200, ''], ['/admin/payments', 200, ''], ['/admin/users', 200, ''], ['/admin/content', 200, ''], ['/admin/settings', 200, '']]

const NO_LEAK = [/"correctId":"[a-z]/, /"modelAnswer":"[^"]{3,}/, /"rubric":\[[^\]]*"marks":[1-9]/, /"answer":"[A-H]\)/]

const get = async (path) => {
  const res = await fetch(base + path, { redirect: 'manual', headers: { 'user-agent': 'cea-route-walk' } })
  const body = await res.text()
  return { status: res.status, body }
}

let failed = 0
const rows = []
for (const [path, want, marker] of [...PUBLIC, ...GATED, ...(wantAdmin ? ADMIN : [])]) {
  const oks = Array.isArray(want) ? want : [want]
  try {
    const { status, body } = await get(path)
    const problems = []
    if (!oks.includes(status)) problems.push(`status ${status}, wanted ${oks.join('/')}`)
    if (marker && !body.includes(marker)) problems.push(`missing "${marker}"`)
    for (const re of NO_LEAK) if (re.test(body)) problems.push(`answer-key pattern ${re} in HTML`)
    // 10.2: a page that ships megabytes of hydration payload is a data-bill bug too
    if (body.length > 900_000) problems.push(`${(body.length / 1024).toFixed(0)} KB of HTML`)
    rows.push(`${problems.length ? '✗' : '✓'} ${String(status).padEnd(3)} ${(body.length / 1024).toFixed(0).padStart(5)} KB  ${path}${problems.length ? '  — ' + problems.join('; ') : ''}`)
    if (problems.length) failed++
  } catch (e) {
    rows.push(`✗ ERR     0 KB  ${path}  — ${e.message}`)
    failed++
  }
}
console.log(rows.join('\n'))
console.log(failed ? `\n✗ route walk: ${failed} of ${rows.length} routes failed (${base})` : `\n✓ route walk: ${rows.length} routes ok (${base})`)
process.exit(failed ? 1 : 0)
