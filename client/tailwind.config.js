/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',   // Bright Blue
        secondary: '#FACC15', // Sunny Yellow
        accent: '#EF4444',    // Vivid Red
        success: '#10B981',   // Emerald Green
        background: '#F0F9FF', // Light Blue White
      },
      fontFamily: {
        game: ['"Jua"', 'sans-serif'], // Example game-like font
        sans: ['"Pretendard"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      }
    },
  },
  plugins: [],
}
