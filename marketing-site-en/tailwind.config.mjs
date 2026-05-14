/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#8AA5FF',
        'primary-hover': '#7F99FF',
        'primary-deep': '#3B5BFF',
        'primary-active': '#031457',
        'bg-base': '#050505',
        'bg-section': '#080808',
        'bg-card': '#0A0D1A',
        'bg-elevated': '#171A21',
        'text-primary': '#F2F2F2',
        'text-secondary': '#999999',
        'text-tertiary': '#737373',
        'text-muted': '#4D4D4D',
        'border-subtle': '#1F1F1F',
        'border-default': '#2E2E2E',
        'border-emphasis': '#404040',
        'success': '#22C55E',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      maxWidth: {
        'content': '1280px',
        'text': '880px',
        'narrow': '640px',
      },
    },
  },
  plugins: [],
};
