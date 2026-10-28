/**
 * postcss-import runs first so `@import '@cea/ui/styles.css'` in globals.css is
 * inlined *before* Tailwind parses the file — the shared stylesheet uses
 * `@layer base/components`, and Tailwind refuses those in a file where it never
 * saw the matching `@tailwind` directive.
 */
module.exports = { plugins: { 'postcss-import': {}, tailwindcss: {}, autoprefixer: {} } }
