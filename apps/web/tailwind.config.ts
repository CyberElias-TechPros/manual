/** Tailwind for the app; the brand values live in the shared preset (1.1). */
import type { Config } from 'tailwindcss'
import preset from '../../packages/config/tailwind-preset.cjs'

export default {
  presets: [preset as any],
  /*
   * `packages/ui` is flat (seven modules, no subfolders), so the pattern is spelled out
   * instead of using `**`: a `**` that climbs out of the project makes Tailwind warn that it
   * may be scanning node_modules, and that warning is a real 2–3 s of dev-server time on every
   * rebuild — plus a class written in a new subfolder would be silently dropped from the CSS.
   */
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/*.{ts,tsx}'],
  darkMode: 'class',
} satisfies Config
