/**
 * Shared Tailwind preset — the one place brand colour/type/spacing is defined (ROADMAP 1.1, 1.2, 1.6).
 *
 * The "Calm Focus" pass (docs/DESIGN.md) is encoded here rather than page by page:
 *   • one accent for actions (navy), one for earned things (gold), everything else neutral;
 *   • type leads and containers follow: 17px body, 1.7 leading, hairline separators instead of
 *     boxes, shadows reserved for things that float;
 *   • no looping animation. Anything that moves, moves once — a learner reading a lesson at
 *     23:00 on a phone should not be chased by a flickering icon.
 */
const brand = {
  navy: '#1a365d',
  deep: '#0f1b33',
  blue: '#2c5282',
  sky: '#62b3ec',
  gold: '#d69e2e',
  mint: '#67d390',
  coral: '#fb8181',
  light: '#f7fafc',
  paper: '#fffdf9',
  success: '#2f855a',
  error: '#c53030',
  warn: '#b7791f',
}

/** The neutral ramp. Text, rules and quiet fills come from here — never from the brand ramp. */
const ink = {
  DEFAULT: '#0b172a',
  900: '#0b172a',
  800: '#13233f',
  700: '#1d304f',
  // -600 and -500 are the two greys this app uses for *body* copy (secondary text, prose, table
  // rows). Darkened significantly so nothing looks thin or faint on a phone in daylight, while
  // keeping clear hierarchy between primary ink and supporting captions.
  600: '#2a3d5d',
  500: '#3c5070',
  400: '#556885',
  300: '#8494ad',
  200: '#cfd8e4',
  100: '#e5ebf3',
  50: '#f4f7fb',
}

module.exports = {
  theme: {
    extend: {
      colors: {
        ...brand,
        ink,
        surface: { DEFAULT: '#ffffff', muted: ink[50], line: ink[100], 'line-strong': ink[200] },
        'surface-dark': { DEFAULT: '#101c33', muted: '#17253f', line: '#22324f', 'line-strong': '#2c3f60' },
        canvas: '#fbfcfe',
        'canvas-dark': '#0b1526',
      },
      // "Not thin." The academy's call on 2026-10-29: a beginner reads this on a phone, often in
      // sunlight, and the system stack's 400 weight disappears on a cheap LCD. Rather than sprinkle
      // `font-bold` over 300 files (which only moves the problem), the weight *scale* is shifted up
      // one step: `font-normal` is 500, `font-medium` is 600, `font-semibold` is 700, `font-bold` is
      // 800. Every component, including the ones in packages/ui, gets heavier in one edit and stays
      // internally consistent — hierarchy still reads, because the steps are still different.
      fontWeight: {
        thin: '500', extralight: '500', light: '500', normal: '500',
        medium: '600', semibold: '700', bold: '800', extrabold: '800', black: '900',
      },
      fontFamily: {
        // system-first (1.2): zero font bytes over a metered 3G link beats a webfont
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        // A beginner reads this for 90 minutes at a time: the ramp starts roomy.
        xs: ['0.8125rem', { lineHeight: '1.45' }],
        sm: ['0.9375rem', { lineHeight: '1.6' }],
        base: ['1.0625rem', { lineHeight: '1.7' }],
        lg: ['1.1875rem', { lineHeight: '1.65' }],
        xl: ['1.375rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        '2xl': ['1.625rem', { lineHeight: '1.28', letterSpacing: '-0.015em' }],
        '3xl': ['2rem', { lineHeight: '1.18', letterSpacing: '-0.02em' }],
        '4xl': ['2.4rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
      },
      letterSpacing: { tightest: '-0.03em', snugish: '-0.01em' },
      lineHeight: { prose: '1.7', relaxed: '1.75' },
      maxWidth: { reading: '42rem', measure: '34rem', course: '68rem', wide: '82rem' },
      spacing: { 18: '4.5rem', 22: '5.5rem', 30: '7.5rem' },
      borderRadius: { card: '12px', pill: '999px', sheet: '16px' },
      boxShadow: {
        // one elevation step, used only where something genuinely floats above the page
        card: '0 1px 2px rgba(16,32,58,.05)',
        elev: '0 18px 42px -26px rgba(16,32,58,.22)',
        glow: '0 0 0 3px rgba(26,54,93,.15)',
      },
      keyframes: {
        'xp-float': { '0%': { opacity: '0', transform: 'translateY(6px)' }, '25%': { opacity: '1' }, '100%': { opacity: '0', transform: 'translateY(-22px)' } },
        'badge-pop': { '0%': { transform: 'scale(.86)', opacity: '0' }, '60%': { transform: 'scale(1.04)', opacity: '1' }, '100%': { transform: 'scale(1)' } },
        'shake-x': { '0%,100%': { transform: 'translateX(0)' }, '20%': { transform: 'translateX(-4px)' }, '40%': { transform: 'translateX(4px)' }, '60%': { transform: 'translateX(-2px)' }, '80%': { transform: 'translateX(2px)' } },
        'slide-up': { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'none' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
      animation: {
        'xp-float': 'xp-float 1.15s ease-out forwards',
        'badge-pop': 'badge-pop .38s ease-out both',
        'shake-x': 'shake-x .3s ease-in-out',
        'slide-up': 'slide-up .22s ease-out both',
        'fade-in': 'fade-in .2s ease-out both',
        shimmer: 'shimmer 2.2s linear infinite',
      },
      transitionTimingFunction: { std: 'cubic-bezier(.2,0,.2,1)' },
    },
  },
  darkMode: 'class',
}
