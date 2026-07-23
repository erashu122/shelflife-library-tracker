/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 18px 55px rgba(15, 23, 42, 0.14)',
        glow: '0 0 34px rgba(20, 184, 166, 0.28)',
      },
      animation: {
        floatIn: 'floatIn 420ms ease-out both',
        riseIn: 'riseIn 620ms cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 2.8s linear infinite',
        pulseGlow: 'pulseGlow 3.2s ease-in-out infinite',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(18px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-220% 0' },
          '100%': { backgroundPosition: '220% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(20, 184, 166, 0)' },
          '50%': { boxShadow: '0 0 34px rgba(20, 184, 166, 0.28)' },
        },
      },
    },
  },
  plugins: [],
};
