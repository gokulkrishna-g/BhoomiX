/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#fdfbf7',
          100: '#f7f2ea',
          200: '#ede1cf',
          300: '#decaa8',
          400: '#caad7f',
          500: '#b5915c',
          600: '#9d7647',
          700: '#7f5c38',
          800: '#684b31',
          900: '#563e2c',
        }
      }
    },
  },
  plugins: [],
}
