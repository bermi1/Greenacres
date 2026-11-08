/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Green Acres brand guideline: school green #0A771A, school yellow #FFD801, crest forest #143322
        green: { 50: '#EAF4EC', 100: '#D5EAD9', 200: '#A9D4B2', 300: '#6DB87C', 400: '#2F9A45', 500: '#128A27', 600: '#0A771A', 700: '#086117', 800: '#075214', 900: '#06461A', 950: '#143322' },
        gold: { 50: '#FFF6C2', 100: '#FFEFA0', 300: '#FFE45A', 400: '#FFD801', 500: '#E6C200', 700: '#6B5800' },
        clay: { 50: '#EAF4EC', 400: '#0A771A', 500: '#0A771A', 700: '#086117' },
        ink: { DEFAULT: '#14201A', 2: '#2E3A33', 3: '#4A5750' },
        line: { DEFAULT: '#E1E7E2', 2: '#CBD5CE' },
        paper: { DEFAULT: '#FFFFFF', 2: '#F5F8F5', 3: '#F5F8F5' },
        sky: { 50: '#EAF1FB', 600: '#1F5FBF', 800: '#1E3A6E' },
      },
      fontFamily: {
        sans: ['Lexend', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['"Work Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 18px 40px rgba(14,107,46,.12)',
        card: '0 20px 50px rgba(10,40,20,.10)',
        glow: '0 6px 16px rgba(20,51,34,.12)',
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
