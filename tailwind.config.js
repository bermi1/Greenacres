/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: { 50: '#EEF6F0', 100: '#E3F2E7', 200: '#BFE0C8', 600: '#0E6B2E', 700: '#0A4F22', 800: '#0B3F1D', 900: '#072A14' },
        gold: { 50: '#FFF8DB', 100: '#FFF1C2', 400: '#F5C400', 500: '#E0A800', 700: '#8A6A00' },
        ink: { DEFAULT: '#17201A', 2: '#3D4740', 3: '#5B6470' },
        line: { DEFAULT: '#E2E8E3', 2: '#CBD5CE' },
        paper: { DEFAULT: '#F6F8F5', 2: '#EEF2EF', 3: '#F3F5F2' },
        sky: { 50: '#EAF1FB', 600: '#1F4FA8', 800: '#1E3A6E' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 18px 40px rgba(14,107,46,.12)',
        card: '0 20px 50px rgba(10,40,20,.10)',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        pop: { from: { opacity: '0', transform: 'translateY(-6px)' }, to: { opacity: '1', transform: 'none' } },
        kenburns: { from: { transform: 'scale(1.08)' }, to: { transform: 'scale(1)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        fadeUp: 'fadeUp .6s ease both',
        pop: 'pop .3s ease both',
        kenburns: 'kenburns 7s ease-out both',
        marquee: 'marquee 60s linear infinite',
      },
    },
  },
  plugins: [],
};
