#!/usr/bin/env node
/**
 * Dev/preview seed — the gap the README left open ("who is the first admin?").
 *
 *   pnpm db:seed                 # admin + demo learner in ./apps/web/var/cea-learn.sqlite
 *   CEA_SQLITE=… pnpm db:seed    # any D1-shaped sqlite (also usable against D1 via wrangler)
 *
 * Rules we landed on (docs/GAP-ANALYSIS.md §2.5 and docs/DEPLOYMENT.md §6):
 *   • the very first admin is created here, never through the public UI;
 *   • `register` can never mint an admin (role is hardcoded 'learner' in the API);
 *   • promotion after that is `pnpm db:seed --promote <email>` (audited by hand).
 */
import { DatabaseSync } from 'node:sqlite'
import { pbkdf2Sync, randomBytes } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const file = process.env.CEA_SQLITE || join(root, 'var/cea-learn.sqlite')
mkdirSync(dirname(file), { recursive: true })

const ADMIN_EMAIL = (process.env.CEA_ADMIN_EMAIL || 'admin@cea.ng').toLowerCase()
const ADMIN_PASSWORD = process.env.CEA_ADMIN_PASSWORD || 'Admin#2024pass'
const DEMO_EMAIL = (process.env.CEA_DEMO_EMAIL || 'learner@cea.ng').toLowerCase()
const DEMO_PASSWORD = process.env.CEA_DEMO_PASSWORD || 'Learner#2024pass'

const ITER = 210_000
const b64url = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
function hashPassword(password) {
  const salt = b64url(randomBytes(16))
  const bits = pbkdf2Sync(password, salt, ITER, 32, 'sha256')
  return `pbkdf2-sha256$${ITER}$${salt}$${b64url(bits)}`
}

const db = new DatabaseSync(file)
db.exec('PRAGMA journal_mode = WAL')

// A fresh clone has no database at all, so the seed applies the migrations first
// (the same 0001_init.sql the Worker applies through `wrangler d1 migrations apply`).
if (!db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get()) {
  const dir = join(root, 'apps/api/migrations')
  for (const f of (existsSync(dir) ? readdirSync(dir) : []).filter(x => x.endsWith('.sql')).sort()) {
    db.exec(readFileSync(join(dir, f), 'utf8').replace(/^--.*$/gm, ''))
    console.log(`  ✓ applied migration ${f}`)
  }
}

const now = () => new Date().toISOString()
function upsertUser({ email, name, password, role, xp = 0, streak = 0 }) {
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  const hash = hashPassword(password)
  if (existing) {
    db.prepare('UPDATE users SET password_hash = ?, role = ?, updated_at = ? WHERE id = ?').run(hash, role, now(), existing.id)
    return { id: existing.id, created: false }
  }
  const id = randomBytes(12).toString('hex')
  db.prepare(`INSERT INTO users (id,email,phone,name,password_hash,role,xp,streak_count,streak_freezes,is_guest,leaderboard_opt_in,data_saver,created_at,updated_at)
              VALUES (?,?,?, ?,?, ?,?,0,0,0,1,0,?, ?)`)
    .run(id, email, '', name, hash, role, xp, now(), now())
  return { id, created: true }
}

const args = process.argv.slice(2)
if (args[0] === '--promote') {
  const email = String(args[1] || '').toLowerCase()
  const r = db.prepare("UPDATE users SET role = 'admin', updated_at = ? WHERE email = ?").run(now(), email)
  console.log(r.changes ? `✓ ${email} is now an admin` : `✗ no user with that email (${email})`)
  process.exit(r.changes ? 0 : 1)
}

console.log(`seed → ${file}`)
const admin = upsertUser({ email: ADMIN_EMAIL, name: 'CEA Admin', password: ADMIN_PASSWORD, role: 'admin', xp: 0 })
console.log(`  ${admin.created ? '✓ created' : '· updated'} admin ${ADMIN_EMAIL} (password: ${ADMIN_PASSWORD})`)
const demo = upsertUser({ email: DEMO_EMAIL, name: 'Demo Learner', password: DEMO_PASSWORD, role: 'learner', xp: 540, streak: 3 })
console.log(`  ${demo.created ? '✓ created' : '· updated'} learner ${DEMO_EMAIL} (password: ${DEMO_PASSWORD})`)

if (demo.created) {
  db.prepare('UPDATE users SET streak_count = ?, last_active_date = ? WHERE id = ?').run(3, now().slice(0, 10), demo.id)
  db.prepare('INSERT OR IGNORE INTO enrollments (id,user_id,course,source,status,note,created_at) VALUES (?,?,?,?,?,?,?)')
    .run(randomBytes(12).toString('hex'), demo.id, 'web-development', 'grant', 'active', 'seed: unlocked so the admin screens have data', now())
}

// 5.4 — badges are code-defined (BADGES in apps/api/src/gamify.ts) but stored in
// the DB so the copy can be edited later without a deploy.
const badgeRows = db.prepare('SELECT COUNT(*) AS c FROM badges').get().c
if (!badgeRows) console.log('  · badges table empty — it is populated on first registration by the API')

// A redeemable code, so the admin flow can be exercised without a bank transfer.
const code = 'CEA-DEMO-2024'
if (!db.prepare('SELECT code FROM access_codes WHERE code = ?').get(code)) {
  db.prepare('INSERT INTO access_codes (code,course,kind,max_uses,used_count,note,created_by,created_at) VALUES (?,?,?,?,?,?,?,?)')
    .run(code, '*', 'comp', 10, 0, 'seed: demo code for local testing', 'seed', now())
  console.log(`  ✓ access code ${code} (any course, 10 uses)`)
}

// A pending payment, so /admin has something to approve on first open.
if (!db.prepare('SELECT id FROM payments LIMIT 1').get()) {
  const ref = `CEA${String(Date.now()).slice(-8)}`
  db.prepare(`INSERT INTO payments (id,user_id,course,amount_ngn,reference,status,payer_name,note,created_at,intent_only)
              VALUES (?,?, 'web-development', ?, ?, 'pending', 'Demo Learner', 'seed: waiting for the admin queue', ?, 0)`)
    .run(randomBytes(12).toString('hex'), demo.id, 50000, ref, now())
  console.log(`  ✓ pending payment ${ref} (₦50,000) for the admin queue`)
}
console.log('  settings row:', db.prepare('SELECT COUNT(*) AS c FROM settings').get().c ? 'present' : 'defaults (API creates on first admin PATCH)')
db.close()
console.log('done. Sign in at /auth/login — /api/auth/* enforces CSRF, so use the app, not curl by hand.')
