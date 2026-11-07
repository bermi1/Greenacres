/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: { 50: '#EEF7F1', 100: '#DDEFE3', 200: '#B6DEC3', 300: '#7FC496', 400: '#3FA466', 500: '#1A8644', 600: '#0E6B2E', 700: '#0B5525', 800: '#0A3F1D', 900: '#072B15', 950: '#04190C' },
        gold: { 50: '#FFF8E1', 100: '#FFEFB8', 300: '#FFD95A', 400: '#F5C400', 500: '#E0A800', 700: '#8A6A00' },
        clay: { 50: '#FCEEE7', 400: '#E07A4F', 500: '#D9643A', 700: '#9C3F1C' },
        ink: { DEFAULT: '#0E1A13', 2: '#33413A', 3: '#5A665F' },
        line: { DEFAULT: '#E4E1D6', 2: '#CFCBBE' },
        paper: { DEFAULT: '#FAF7EF', 2: '#F1EDE2', 3: '#F5F3EB' },
        sky: { 50: '#EAF1FB', 600: '#1F4FA8', 800: '#1E3A6E' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        lift: '0 18px 40px rgba(14,107,46,.12)',
        card: '0 20px 50px rgba(10,40,20,.10)',
        glow: '0 0 0 1px rgba(245,196,0,.35), 0 20px 60px -10px rgba(245,196,0,.45)',
        deep: '0 40px 80px -20px rgba(4,25,12,.45)',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        pop: { from: { opacity: '0', transform: 'translateY(-6px)' }, to: { opacity: '1', transform: 'none' } },
        kenburns: { from: { transform: 'scale(1.08)' }, to: { transform: 'scale(1)' } },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseRing: { '0%': { transform: 'scale(.8)', opacity: '.7' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        marqueeFull: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-100%)' } },
      },
      animation: {
        fadeUp: 'fadeUp .6s ease both',
        pop: 'pop .3s ease both',
        kenburns: 'kenburns 7s ease-out both',
        marquee: 'marquee 60s linear infinite',
        marqueeFull: 'marqueeFull 40s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        pulseRing: 'pulseRing 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
};
