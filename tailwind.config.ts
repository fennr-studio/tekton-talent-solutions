import type { Config } from 'tailwindcss';

/**
 * Tekton design tokens — editorial display system.
 *
 * The system is built on extreme scale contrast: uppercase condensed display
 * type set at viewport scale with sub-1 line-height, against a light body face.
 * There is deliberately nothing in between; mid-sized type is what makes a
 * layout read as corporate.
 *
 * Colour is four grounds (paper, mist, forest, ink) plus a small set of
 * sticker accents used only on rotated annotation tags.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /** Grounds. */
        paper: '#FFFFFF',
        mist: {
          DEFAULT: '#EAEFEB',
          deep: '#DDE5DF',
        },
        forest: {
          DEFAULT: '#21503C',
          deep: '#173829',
        },
        ink: {
          DEFAULT: '#0B0B0B',
          soft: '#171717',
        },
        /** Type greys — `ghost` is the deactivated display word. */
        ash: '#6B6B6B',
        ghost: '#C9C9C9',
        line: {
          DEFAULT: '#DEDEDE',
          dark: 'rgba(255,255,255,0.16)',
        },
        /** Sticker accents. Used on rotated tags and small marks only. */
        citrus: '#F2E14C',
        lilac: '#C8A8F5',
        peach: '#F6C6A2',
        cobalt: '#2B4BE0',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        /* Small type — tracked, uppercase where used as a label. */
        micro: ['0.6875rem', { lineHeight: '1.25', letterSpacing: '0.08em' }],
        label: ['0.8125rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        body: ['1.0625rem', { lineHeight: '1.5' }],
        lede: ['clamp(1.125rem, 1.5vw, 1.375rem)', { lineHeight: '1.25' }],

        /* Display — uppercase, condensed, set to fill. Line-heights below 1
           are the single most important number in this system. */
        d0: ['clamp(3.5rem, 19vw, 22rem)', { lineHeight: '0.76', letterSpacing: '-0.015em' }],
        d1: ['clamp(3rem, 13vw, 15rem)', { lineHeight: '0.78', letterSpacing: '-0.012em' }],
        d2: ['clamp(2.5rem, 8.5vw, 9rem)', { lineHeight: '0.82', letterSpacing: '-0.01em' }],
        d3: ['clamp(2rem, 5vw, 5rem)', { lineHeight: '0.86', letterSpacing: '-0.008em' }],
        d4: ['clamp(1.5rem, 3vw, 2.75rem)', { lineHeight: '0.92', letterSpacing: '-0.005em' }],
      },
      maxWidth: {
        measure: '34rem',
        'measure-wide': '44rem',
      },
      spacing: {
        gutter: 'clamp(1.25rem, 3.5vw, 4rem)',
        chapter: 'clamp(6rem, 14vw, 15rem)',
      },
      transitionTimingFunction: {
        /** One curve for the whole site. */
        tekton: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.1, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
      keyframes: {
        'marquee-x': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'marquee-x': 'marquee-x 38s linear infinite',
        'scroll-hint': 'scroll-hint 1.9s cubic-bezier(0.16,1,0.3,1) infinite',
      },
      zIndex: {
        nav: '60',
        menu: '80',
        cursor: '90',
        veil: '100',
      },
    },
  },
  plugins: [],
};

export default config;
