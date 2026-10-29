#!/usr/bin/env node
/**
 * a11y-scan — accessibility checks over the HTML the server actually renders.
 *
 * Why this exists: docs/ROADMAP.md 10.4 asked for axe, and axe asks for a browser. Neither this
 * sandbox nor this repo's CI has one, and a headless-Chromium harness that never runs is decoration.
 * So this tool checks the failures that are objectively visible in server-rendered markup, with no
 * dependencies, on the real routes, logged in as a learner:
 *
 *   - document: <html lang>, one <main>, no <main> nested in <main>, at most one <h1>, and a
 *     heading sequence that never skips a level
 *   - names: every <a> and <button> has an accessible name (text, aria-label(ledby), title, or a
 *     labelled <img>/<svg> inside). A control whose only content is an icon fails hard.
 *   - images: every <img> declares alt (alt="" being the right answer for decoration)
 *   - forms: every input/select/textarea is labelled by <label for>, a wrapping <label>, or
 *     aria-label(ledby)/title. A placeholder is not a label.
 *   - interaction: target="_blank" carries rel~="noopener"; role="button" is keyboard reachable;
 *     no focusable control hides inside aria-hidden
 *   - ids are unique per document
 *
 * What it deliberately does not claim: contrast ratios, focus order, and anything that depends on
 * computed style or a real browser. Those still need axe/Lighthouse against a deployed URL (see the
 * note at the bottom of docs/DESIGN.md). Contrast is defended at the token level instead — the ink
 * ramp in packages/config/tailwind-preset.cjs — not by this scanner.
 *
 *   node tools/a11y-scan.mjs                                  # http://localhost:3000
 *   node tools/a11y-scan.mjs https://learn.cea.ng --no-auth
 *   node tools/a11y-scan.mjs --file saved.html                # one saved document
 *
 * Exit code is 1 when anything is found, so CI is red or green and nothing else.
 */
import { readFileSync } from 'node:fs'

const base = (process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:3000').replace(/\/$/, '')
const wantAuth = !process.argv.includes('--no-auth')

/** Public pages, plus the learner surfaces a signed-in session can reach. */
const PUBLIC = [
  '/', '/courses', '/courses/microsoft-office', '/courses/cybersecurity',
  '/learn/microsoft-office/1', '/learn/web-development/1', '/learn/graphic-design/1',
  '/courses/microsoft-office/map', '/leaderboard', '/certificates', '/certificates/verify',
  '/auth/login', '/auth/register', '/auth/forgot', '/checkout', '/checkout/microsoft-office',
  '/terms', '/privacy', '/offline', '/styleguide', '/nope-not-a-page',
]
const LEARNER = [
  '/dashboard', '/profile', '/settings',
  '/learn/microsoft-office/1?stage=quiz', '/learn/microsoft-office/1?stage=exercise',
  '/learn/microsoft-office/1?stage=case', '/learn/microsoft-office/1?stage=finish',
  '/learn/microsoft-office/2', '/learn/cybersecurity/9', '/courses/typing-computer-basics',
]

// ── a deliberately small HTML reader ────────────────────────────────────────────────
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])

/** Drop what a screen reader never reads; <svg><title> stays, because it is a real accessible name. */
function visible(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|head)\b(?:"[^"]*"|'[^']*'|[^>])*>[\s\S]*?<\/\1\s*>/gi, ' ')
}

function tokens(html) {
  const out = []
  const re = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g
  let m
  while ((m = re.exec(html))) {
    out.push({
      closing: m[1] === '/',
      tag: m[2].toLowerCase(),
      attrs: attrs(m[3]),
      selfClosing: /\/\s*$/.test(m[3]),
      start: m.index,
      end: re.lastIndex,
    })
  }
  return out
}

function attrs(raw) {
  const map = {}
  if (!raw) return map
  const re = /([:@a-zA-Z_][\w:.-]*)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'>]+))?/g
  let m
  while ((m = re.exec(raw))) map[m[1].toLowerCase()] = m[2] === undefined ? '' : m[2].replace(/^["']|["']$/g, '')
  return map
}

/** Tags removed, whitespace folded — the accessible name for most controls. */
function textOf(chunk) {
  return chunk
    .replace(/<(svg|img|picture|canvas)\b(?:"[^"]*"|'[^']*'|[^>])*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<(svg|img|picture|canvas)\b(?:"[^"]*"|'[^']*'|[^>])*\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#x27;|&apos;|&quot;|"/gi, '')
    .replace(/&lt;|&gt;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function findEnd(list, from) {
  const tag = list[from].tag
  let depth = 0
  for (let i = from; i < list.length; i++) {
    const t = list[i]
    if (t.tag !== tag) continue
    if (t.closing) {
      depth--
      if (depth === 0) return t
    } else if (!t.selfClosing && !VOID.has(tag)) depth++
  }
  return null
}

/** Ancestry chain per open tag, so "is this input inside a <label>" is answerable. */
function withAncestry(list) {
  const stack = []
  for (const t of list) {
    t.ancestors = stack.slice()
    if (t.closing) {
      const i = stack.lastIndexOf(t.tag)
      if (i >= 0) stack.length = i
    } else if (!VOID.has(t.tag) && !t.selfClosing) {
      stack.push(t.tag)
    }
  }
  return list
}

function innerHtml(html, list, i) {
  const close = findEnd(list, i)
  return close ? html.slice(list[i].end, close.start) : ''
}

function nameFor(html, list, i) {
  const a = list[i].attrs
  if ((a['aria-label'] || '').trim()) return a['aria-label'].trim()
  if (a['aria-labelledby']) {
    const ids = a['aria-labelledby'].split(/\s+/).filter(Boolean)
    for (const id of ids) {
      const hit = list.findIndex(t => !t.closing && t.attrs.id === id)
      if (hit >= 0) {
        const text = textOf(innerHtml(html, list, hit))
        if (text) return text
      }
    }
    return `ref:${ids.join(',')}` // points at an id; trust it rather than guess
  }
  if ((a.title || '').trim()) return a.title.trim()
  const own = textOf(innerHtml(html, list, i))
  if (own) return own
  const inner = innerHtml(html, list, i)
  const img = /<img\b[^>]*\balt="([^"]{1,120})"/i.exec(inner)
  if (img) return `img:${img[1].trim()}`
  const svgTitle = /<svg\b[^>]*>[\s\S]*?<title[^>]*>([^<]{1,120})</i.exec(inner)
  if (svgTitle) return `icon:${textOf(svgTitle[1])}`
  return ''
}

const labelled = (list, t) =>
  (t.attrs['aria-label'] || '').trim() ||
  (t.attrs['aria-labelledby'] || '').trim() ||
  (t.attrs.title || '').trim() ||
  (t.attrs.id && list.some(x => !x.closing && x.tag === 'label' && (x.attrs.for || '').split(/\s+/).includes(t.attrs.id))) ||
  t.ancestors.includes('label')

// ── the checks ──────────────────────────────────────────────────────────────────────
function scan(html, page) {
  const list = withAncestry(tokens(html))
  const body = visible(html)
  const found = []
  const push = (rule, detail) => found.push(`${page} · ${rule} — ${detail}`)

  const root = list.find(t => !t.closing && t.tag === 'html')
  if (!root) push('document', 'no <html> element')
  else if (!(root.attrs.lang || '').trim()) push('document', '<html> has no lang attribute')

  const mainOpen = (body.match(/<main\b(?:"[^"]*"|'[^']*'|[^>])*>/gi) || []).length
  if (mainOpen === 0 && !/role="main"/.test(body)) push('landmark', 'no <main> landmark')
  if (mainOpen > 1) push('landmark', `${mainOpen} <main> elements — one page, one main region`)
  if (/<main\b[^>]*>[\s\S]{0,4000}<main\b/i.test(body)) push('landmark', '<main> nested inside <main>')

  const hs = []
  const hre = /<h([1-6])\b(?:"[^"]*"|'[^']*'|[^>])*>([\s\S]*?)<\/h\1\s*>/gi
  let m
  while ((m = hre.exec(body))) hs.push({ level: Number(m[1]), text: textOf(m[2]).slice(0, 60) })
  const h1s = hs.filter(h => h.level === 1)
  if (!hs.length) push('heading', 'no headings at all')
  if (h1s.length === 0) push('heading', 'no <h1> — a screen-reader user cannot tell what page this is')
  if (h1s.length > 1) push('heading', `${h1s.length} <h1> elements`)
  for (let i = 1; i < hs.length; i++) {
    if (hs[i].level > hs[i - 1].level + 1) {
      push('heading', `h${hs[i - 1].level} → h${hs[i].level} skips a level, before “${hs[i].text}”`)
      break
    }
  }

  for (let i = 0; i < list.length; i++) {
    const t = list[i]
    if (t.closing) continue

    if (t.tag === 'a' || t.tag === 'button') {
      if (t.attrs['aria-hidden'] === 'true') continue
      if (!nameFor(html, list, i)) {
        const where = t.tag === 'a' ? ` href="${(t.attrs.href ?? '').slice(0, 40)}"` : ''
        push('name', `<${t.tag}${where}> has no accessible name`)
      }
      if (t.tag === 'a' && /^(#|)$/.test(t.attrs.href ?? '') && !t.attrs['aria-controls']) {
        push('link', `<a href="${t.attrs.href ?? ''}"> goes nowhere`)
      }
      if (t.tag === 'a' && /_blank/.test(t.attrs.target || '') && !/noopener|noreferrer/.test(t.attrs.rel || '')) {
        push('link', 'target="_blank" without rel~="noopener"')
      }
    }

    if (t.tag === 'img' && t.attrs.alt === undefined) {
      push('image', `<img src="${(t.attrs.src || '').split('/').pop()}"> has no alt (alt="" is right for decoration)`)
    }

    if (t.tag === 'input' || t.tag === 'select' || t.tag === 'textarea') {
      const type = (t.attrs.type || 'text').toLowerCase()
      if (!['hidden', 'submit', 'button', 'reset'].includes(type) && !labelled(list, t)) {
        const hint = t.attrs.placeholder ? ` placeholder="${t.attrs.placeholder.slice(0, 24)}"` : ''
        push('form', `<${t.tag} name="${t.attrs.name || ''}"${hint}> has no label — a placeholder is not one`)
      }
    }

    if (t.tag === 'label' && !(t.attrs.for || '').trim() && !/<(input|select|textarea)\b/i.test(innerHtml(html, list, i))) {
      push('form', '<label> with neither a `for` nor a wrapped control')
    }

    if (t.attrs.role === 'button' && t.tag !== 'button' && !('tabindex' in t.attrs)) {
      push('keyboard', `role="button" on <${t.tag}> without tabindex — unreachable by keyboard`)
    }

    if (t.attrs['aria-hidden'] === 'true' && /<(a\s+href|button|input|select|textarea)[\s>]/i.test(innerHtml(html, list, i))) {
      push('aria', `aria-hidden="true" on <${t.tag}> hides a focusable control from the reader while the keyboard still reaches it`)
    }
  }

  const seen = new Map()
  for (const t of list) if (t.attrs.id) seen.set(t.attrs.id, (seen.get(t.attrs.id) || 0) + 1)
  for (const [id, n] of seen) if (n > 1) push('id', `id="${id}" appears ${n} times in one document`)

  return found
}

// ── runner ──────────────────────────────────────────────────────────────────────────
let cookie = ''
async function login() {
  if (!wantAuth) return false
  const email = process.env.CEA_A11Y_EMAIL || 'learner@cea.ng'
  const password = process.env.CEA_A11Y_PASSWORD || 'Learner#2024pass'
  try {
    // the API demands the double-submit token on every mutation, exactly as the browser does
    const seed = await fetch(`${base}/api/csrf`)
    const csrf = (seed.headers.getSetCookie?.() ?? []).find(x => x.startsWith('cea_csrf='))?.split(';')[0]
    const r = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      // both halves of the double submit: the cookie the server just set and the matching header
      headers: { 'content-type': 'application/json', ...(csrf ? { cookie: csrf, 'x-cea-csrf': decodeURIComponent(csrf.split('=').slice(1).join('=')) } : {}) },
      body: JSON.stringify({ email, password }),
    })
    const session = (r.headers.getSetCookie?.() ?? []).find(x => x.startsWith('cea_session='))?.split(';')[0]
    if (r.status === 200 && session) {
      const extra = [csrf, session].filter(Boolean).join('; ')
      cookie = (seed.headers.getSetCookie?.() ?? []).concat(r.headers.getSetCookie?.() ?? [])
        .map(x => x.split(';')[0]).filter(x => x.startsWith('cea_')).join('; ') || extra
      return true
    }
    console.log(`  · logging in as ${email} returned ${r.status} — walking public pages only (pnpm db:seed creates the dev learner)`)
    return false
  } catch (e) {
    console.log(`  · ${base} unreachable (${e.message}) — public pages only`)
    return false
  }
}

function fixture() {
  const at = process.argv.indexOf('--file')
  if (at < 0) return null
  const path = process.argv[at + 1]
  return [[path.split('/').pop(), readFileSync(path, 'utf8')]]
}

function report(all, checked, skipped) {
  const counts = {}
  for (const f of all) {
    const k = (f.split(' · ')[1] || 'other').split(' —')[0]
    counts[k] = (counts[k] || 0) + 1
  }
  const by = Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(' ')
  console.log(`a11y-scan: ${checked} rendered page(s)${skipped ? `, ${skipped} skipped` : ''} · ${all.length} finding(s)${by ? ` · ${by}` : ''}`)
  if (all.length) {
    const uniq = [...new Set(all)]
    for (const f of uniq.slice(0, 40)) console.log(`  ✗ ${f}`)
    if (uniq.length > 40) console.log(`  … ${uniq.length - 40} more`)
    console.log('  · contrast, focus order and computed style are out of scope — see the note in docs/DESIGN.md')
    process.exitCode = 1
  } else {
    console.log('  ✓ names, landmarks, headings, form labels, ids and link rels are clean on every page walked')
  }
}

const pages = fixture()
if (pages) {
  const all = []
  for (const [name, html] of pages) all.push(...scan(html, name))
  report(all, pages.length, 0)
} else {
  const authed = await login()
  const list = [...PUBLIC.map(p => [p, false]), ...(authed ? LEARNER.map(p => [p, true]) : [])]
  const all = []
  let checked = 0
  let skipped = 0
  for (const [path, withCookie] of list) {
    let res
    try {
      res = await fetch(base + path, { headers: withCookie && cookie ? { cookie } : {}, redirect: 'follow' })
    } catch (e) {
      console.log(`  ✗ ${path} · transport — ${e.message}`)
      process.exitCode = 1
      continue
    }
    const html = await res.text()
    if (res.status === 404) { checked++; all.push(...scan(html, `${path} (404 page)`)); continue }
    if (res.status >= 400) { all.push(`${path} · transport — page answered ${res.status}`); continue }
    if (!/<html/i.test(html)) { skipped++; continue } // a redirect to the API or a non-HTML body
    all.push(...scan(html, path))
    checked++
  }
  report(all, checked, skipped)
}
