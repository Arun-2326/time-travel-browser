/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cave: ['"Cinzel Decorative"', '"Permanent Marker"', 'cursive', 'system-ui'],
        medieval: ['"MedievalSharp"', '"UnifrakturMaguntia"', '"Cinzel"', 'serif'],
        vintage: ['"Special Elite"', '"Courier Prime"', '"Playfair Display"', 'serif'],
        modern: ['"Inter"', '"system-ui"', '-apple-system', 'sans-serif'],
        future: ['"Orbitron"', '"Rajdhani"', '"Chakra Petch"', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 3s infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'spin-slow': 'spin 12s linear infinite',
        'steam': 'steamRise 2s infinite linear',
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.9', filter: 'brightness(1)' },
          '25%': { opacity: '0.7', filter: 'brightness(0.85)' },
          '50%': { opacity: '1', filter: 'brightness(1.15)' },
          '75%': { opacity: '0.8', filter: 'brightness(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.8), inset 0 0 25px rgba(0, 240, 255, 0.4)' },
        },
        steamRise: {
          '0%': { opacity: '0', transform: 'translateY(0) scale(0.8)' },
          '50%': { opacity: '0.6', transform: 'translateY(-15px) scale(1.2)' },
          '100%': { opacity: '0', transform: 'translateY(-30px) scale(1.6)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        }
      }
    },
  },
  plugins: [],
}
