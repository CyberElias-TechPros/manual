/** Tailwind for the app; the brand values live in the shared preset (1.1). */
import type { Config } from 'tailwindcss'
import preset from '../../packages/config/tailwind-preset.cjs'

export default {
  presets: [preset as any],
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/**/*.{ts,tsx}'],
  darkMode: 'class',
} satisfies Config
