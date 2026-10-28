/** Shared Tailwind preset — the one place brand colour/type/spacing is defined (ROADMAP 1.1, 1.2, 1.6). */
const brand = {
  navy: '#1a365d', deep: '#0f1b33', blue: '#2c5282', sky: '#62b3ec',
  gold: '#d69e2e', mint: '#67d390', coral: '#fb8181',
  light: '#f7fafc', paper: '#fffdf5',
  success: '#38a169', error: '#e53e3e', warn: '#dd6b20', ink: '#12233d',
}

module.exports = {
  theme: {
    extend: {
      colors: {
        ...Object.fromEntries(Object.entries(brand).map(([k, v]) => [k, v])),
        surface: { DEFAULT: '#ffffff', muted: '#f4f7fb', line: '#e2e8f0' },
        'surface-dark': { DEFAULT: '#101d36', muted: '#16264a', line: '#22375f' },
      },
      fontFamily: {
        // system-first (1.2): zero font bytes over a metered 3G link beats a webfont
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        // mobile-first ramp, 360px -> 1440px
        xs: ['0.75rem', { lineHeight: '1.35' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.3rem', { lineHeight: '1.4' }],
        '2xl': ['1.6rem', { lineHeight: '1.25' }],
        '3xl': ['2rem', { lineHeight: '1.2' }],
        '4xl': ['2.5rem', { lineHeight: '1.1' }],
      },
      maxWidth: { reading: '46rem', course: '78rem' },
      borderRadius: { card: '14px', pill: '999px' },
      boxShadow: {
        card: '0 1px 2px rgba(16,29,54,.06), 0 8px 24px -12px rgba(16,29,54,.18)',
        glow: '0 0 0 3px rgba(214,158,46,.28)',
        elev: '0 2px 4px rgba(16,29,54,.05), 0 18px 40px -22px rgba(16,29,54,.35)',
      },
      keyframes: {
        'xp-float': { '0%': { opacity: 0, transform: 'translateY(6px) scale(.9)' }, '25%': { opacity: 1 }, '100%': { opacity: 0, transform: 'translateY(-26px) scale(1.05)' } },
        'badge-pop': { '0%': { transform: 'scale(.6)', opacity: 0 }, '60%': { transform: 'scale(1.12)', opacity: 1 }, '100%': { transform: 'scale(1)' } },
        'shake-x': { '0%,100%': { transform: 'translateX(0)' }, '20%': { transform: 'translateX(-6px)' }, '40%': { transform: 'translateX(6px)' }, '60%': { transform: 'translateX(-3px)' }, '80%': { transform: 'translateX(3px)' } },
        'pulse-node': { '0%,100%': { boxShadow: '0 0 0 0 rgba(214,158,46,.55)' }, '50%': { boxShadow: '0 0 0 10px rgba(214,158,46,0)' } },
        'flame-flicker': { '0%,100%': { transform: 'scale(1) rotate(-1deg)' }, '50%': { transform: 'scale(1.06) rotate(1deg)' } },
        'slide-up': { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'none' } },
        'shimmer': { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
      },
      animation: {
        'xp-float': 'xp-float 1.25s ease-out forwards',
        'badge-pop': 'badge-pop .5s cubic-bezier(.2,1.5,.4,1) both',
        'shake-x': 'shake-x .38s ease-in-out',
        'pulse-node': 'pulse-node 2.1s ease-out infinite',
        'flame': 'flame-flicker 1.6s ease-in-out infinite',
        'slide-up': 'slide-up .32s ease-out both',
        shimmer: 'shimmer 1.4s linear infinite',
      },
    },
  },
  darkMode: 'class',
}
