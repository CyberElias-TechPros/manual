/**
 * Repo-root fallback. apps/web has its own copy of this file (Next resolves PostCSS
 * config from the project directory), kept identical on purpose: any other
 * workspace that runs Tailwind — the UI kit's own preview, if it grows one — picks
 * this up instead of getting a half-configured pipeline.
 */
module.exports = require('./apps/web/postcss.config.cjs')
