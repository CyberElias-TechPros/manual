/*
 * CEA Learn service worker — Phase 10 (10.3/10.4).
 *
 * Strategy, and why:
 *   /api/*            network-first, 4s timeout, then the last good response.
 *                     A learner on a bad signal still sees their progress page.
 *   /assets/*, /icons network-only, cache-first is NOT enough: the diagrams are
 *   /_next/static     immutable (hashed/long max-age), so cache once, forever.
 *   HTML navigations  network-first → /offline shell. Cached per URL so a level
 *                     you already opened reopens with no data at all.
 *   everything else   stale-if-error, never blocked.
 *
 * Nothing is precached beyond the offline shell: pre-downloading 16 courses
 * would burn the exact data budget this app exists to protect (10.3).
 */
const VERSION = 'cea-v1'
const OFFLINE_URL = '/offline'
const IMMUTABLE = [/^\/assets\//, /^\/icons\//, /^\/brand\//, /^\/_next\/static\//]

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION)
    await c.add(new Request(OFFLINE_URL, { cache: 'reload' })).catch(() => undefined)
    self.skipWaiting()
  })())
})

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k)
    self.clients.claim()
  })())
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') {
    // Offline writes are replayed by the page (localStorage queue), not the
    // worker: the worker cannot read the queue and must not guess its contents.
    return
  }
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (IMMUTABLE.some(re => re.test(url.pathname))) {
    e.respondWith(cacheFirst(req))
    return
  }
  if (url.pathname.startsWith('/api/')) {
    e.respondWith(networkFirst(req, { timeout: 4000, record: false }))
    return
  }
  if (req.mode === 'navigate') {
    e.respondWith(networkFirst(req, { timeout: 6000, record: true }))
  }
})

async function cacheFirst(req) {
  const hit = await caches.match(req)
  if (hit) return hit
  const res = await fetch(req).catch(() => null)
  if (res && res.ok) put(req, res.clone())
  return res || Response.error()
}

async function networkFirst(req, { timeout, record }) {
  const cache = await caches.open(VERSION)
  const hit = await cache.match(req)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(req, { signal: controller.signal })
    clearTimeout(timer)
    if (res.ok && (record || req.destination === 'document')) {
      // Only successful, same-origin documents are kept for offline reading.
      await cache.put(req, res.clone())
      prune(48)
    }
    return res
  } catch (err) {
    clearTimeout(timer)
    if (hit) return hit
    if (req.mode === 'navigate') {
      const offline = await cache.match(OFFLINE_URL)
      if (offline) return offline
    }
    return new Response(JSON.stringify({ ok: false, error: 'Offline and nothing cached for this yet.', code: 'offline' }), {
      status: 503, headers: { 'content-type': 'application/json' },
    })
  }
}

async function put(req, res) {
  const cache = await caches.open(VERSION)
  if (res.ok) { await cache.put(req, res); prune(120) }
}

// 10.3 — keep the cache bounded so the app never fills a 32 GB phone
async function prune(maxEntries) {
  const cache = await caches.open(VERSION)
  const keys = await cache.keys()
  if (keys.length <= maxEntries) return
  for (const k of keys.slice(0, keys.length - maxEntries)) await cache.delete(k)
}

self.addEventListener('message', (e) => {
  if (e.data === 'cea:skip') self.skipWaiting()
})
