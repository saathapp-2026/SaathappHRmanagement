/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saath: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#36a9f7',
          500: '#0c8de4',
          600: '#0170c2',
          700: '#02599e',
          800: '#064b82',
          900: '#0b3f6d',
          950: '#072848',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#080d1a',
        }
      }
    },
  },
  plugins: [],
}
