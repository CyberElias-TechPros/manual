/**
 * Public entry for the API package (0.1: one codebase, two runtimes).
 *
 *   • apps/web/src/app/api/[[...path]]/route.ts → createApp() + createNodeEnv()
 *   • apps/api/src/worker.ts                    → createApp() + D1/KV/R2 bindings
 *
 * Nothing is exported that requires a Node builtin, so importing `./app.js` from
 * a Worker bundle stays safe; `./node-env.js` is deliberately NOT re-exported
 * here (it pulls node:sqlite and node:fs).
 */
export { createApp } from './app.js'
export type { CeaEnv } from './lib.js'
export { memoryTtl } from './db.js'
