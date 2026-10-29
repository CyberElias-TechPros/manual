import { defineConfig } from 'vitest/config'

/**
 * The app's tsconfig keeps `jsx: 'preserve'` because Next does the transform in the build. A Vitest
 * run is not that build, so esbuild needs to be told to use the automatic runtime — otherwise the
 * first `.tsx` under test compiles to `React.createElement` with no React in scope (test/level-
 * feedback.test.tsx renders a component from source, which is how the lesson's stage markup is
 * pinned without a browser).
 */
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: { environment: 'node', include: ['test/**/*.test.{ts,tsx}'] },
})
