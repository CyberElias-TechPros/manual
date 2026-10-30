/**
 * Next 14 (App Router) config for CEA Learn.
 *
 * Two things are unusual and both are deliberate:
 *  1. the API runs *inside* this app in production (src/app/api/[[...path]]) so a
 *     Vercel deploy is complete on its own; the same Hono app also runs on a
 *     Cloudflare Worker (apps/api/src/worker.ts) for D1/KV/R2;
 *  2. the content bundle and the migrations are read from disk at runtime, so
 *     they must be traced into the serverless function — hence
 *     outputFileTracingIncludes.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@cea/ui', '@cea/config', '@cea/content', '@cea/api'],
  experimental: {
    // the dev/preview DB driver is a Node builtin; bundling it breaks the build
    serverComponentsExternalPackages: ['node:sqlite'],

    // the API reads the bundle and the SQL migrations from disk at request time,
    // so both have to be traced into the serverless function (the migrations live in
    // apps/api because that is the runtime that owns the schema).
    outputFileTracingIncludes: {
      '/api/[[...path]]': ['.content/**/*', '../../apps/api/migrations/**/*'],
      '/learn/[slug]/[n]': ['.content/index.json'],
    },
  },
  // No `images` block on purpose: the diagrams are plain <img> tags over pre-sized
  // PNG clips from the PDFs (see packages/ui DiagramView). The Next image optimizer
  // would re-encode line art on every request and serve nothing a cache cannot do,
  // and its /_next/image runtime is a dependency we refuse on a metered connection.
  /**
   * The API is mounted inside Next for dev/preview (src/app/api/[[...path]]) and its
   * sources use NodeNext-style `./lib.js` specifiers, because the same files also run
   * under `tsx`/Workers where the extension is required. Webpack is told to try the
   * TypeScript neighbour first, so one set of files serves all three runtimes and no
   * build step rewrites imports.
   */
  webpack: config => {
    config.resolve = config.resolve || {}
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias || {}),
      '.js': ['.ts', '.tsx', '.js'],
      '.jsx': ['.tsx', '.jsx'],
    }
    return config
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // AdSense + ngAdverts (8.1/8.2) need third-party script/frame origins; the
      // policy stays opt-in so a misconfigured slot fails loudly in review, not
      // silently in production.
      "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://ngadverts.com",
      "frame-src 'self' https://googleads.g.doubleclick.net https://ngadverts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://placehold.co",
      "connect-src 'self' https://*.e2b.app",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      // In production the app refuses to be framed at all (clickjacking). In dev the
      // preview lives in an iframe on another host, so it is allowed there only.
      process.env.NODE_ENV === 'production' ? "frame-ancestors 'none'" : "frame-ancestors 'self' https://*.e2b.app",
    ].join('; ')
    const shared = [
      { key: 'Content-Security-Policy', value: csp },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ...(process.env.NODE_ENV === 'production' ? [{ key: 'X-Frame-Options', value: 'DENY' }] : []),
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
    ]
    return [
      { source: '/(.*)', headers: shared },
      // content JSON is immutable per build, so the PWA can reuse it offline
      { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/sw.js', headers: [{ key: 'Cache-Control', value: 'no-cache' }, { key: 'Service-Worker-Allowed', value: '/' }] },
    ]
  },
}

export default nextConfig
