/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Opening Hours Sans', 'system-ui', 'sans-serif'],
        mono: ['Opening Hours Sans', 'monospace'],
        display: ['Opening Hours Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
        muted: 'var(--muted)',
        'card-bg': 'var(--card-bg)',
        'tag-bg': 'var(--tag-bg)',
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 