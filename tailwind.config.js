/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bts: {
          dark: '#0f0a1c',
          card: 'rgba(25, 17, 46, 0.75)',
          border: 'rgba(168, 85, 247, 0.3)',
          purple: '#a855f7',
          lightPurple: '#c084fc',
          pink: '#f472b6',
          yellow: '#fbbf24',
          cyan: '#38bdf8',
        }
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
