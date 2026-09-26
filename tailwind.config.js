/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kiss: {
          bg: '#181818',
          card: '#222222',
          surface: '#2c2c2c',
          header: '#212121',
          accent: '#69f0ae', // KissKH green chevron / tag accent
          orange: '#ff5722', // KissKH logo orange tag
          muted: '#8e8e8e',
          border: '#333333',
        }
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
