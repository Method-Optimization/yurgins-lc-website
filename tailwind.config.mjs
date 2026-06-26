/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand greens (sampled from logo)
        turf: { DEFAULT: '#3E8E2E', dark: '#2E6B22' },
        forest: '#2E6B22',
        'ink-forest': '#1C3A18', // deepest band / footer
        // Accent + CTA — gold is for FILLS with dark text, never small text on white.
        // `deep` passes AA as text on light surfaces; `pale` passes AA as text on green/dark.
        gold: { DEFAULT: '#E8901F', dark: '#C9760E', deep: '#9A5408', pale: '#FBE3B8' },
        // Bull / mascot warm accent — used sparingly
        bull: { DEFAULT: '#8A3B2A', dark: '#6E2E1F' },
        // Neutrals
        cream: { DEFAULT: '#F4F1E6', deep: '#EAE5D4' },
        ink: { DEFAULT: '#1A1A1A', soft: '#3A3A36' },
      },
      fontFamily: {
        // Display: sturdy, crafted grotesque (variable)
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        // Body / UI: warm humanist grotesque (variable)
        sans: ['"Hanken Grotesk Variable"', 'system-ui', 'sans-serif'],
        // Utility / labels / eyebrows / phone: field-spec mono (variable)
        mono: ['"Spline Sans Mono Variable"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid display scale
        'display-lg': ['clamp(2.75rem, 6vw + 1rem, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.25rem, 4vw + 1rem, 4.5rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.875rem, 2.2vw + 1rem, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'h3': ['clamp(1.375rem, 1vw + 1rem, 1.875rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'eyebrow': ['0.8125rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        container: '80rem', // 1280px content frame
        prose: '38rem',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      zIndex: {
        header: '40',
        'mobile-bar': '50',
        modal: '100',
        toast: '110',
      },
      borderRadius: {
        plaque: '1.25rem',
      },
      boxShadow: {
        plaque: '0 18px 50px -12px rgba(26,26,26,0.45)',
        card: '0 1px 2px rgba(26,26,26,0.06), 0 12px 30px -18px rgba(26,26,26,0.25)',
        'card-hover': '0 2px 4px rgba(26,26,26,0.08), 0 22px 48px -20px rgba(26,26,26,0.35)',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
