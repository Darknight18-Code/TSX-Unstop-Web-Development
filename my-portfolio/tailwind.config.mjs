// tailwind.config.mjs
import { defineConfig } from 'tailwindcss'

export default defineConfig({
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 5s linear infinite',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-left': 'fadeInLeft 1s ease-out 0.3s forwards',
        'wave-slow': 'waveMove 20s ease-in-out infinite',
        'wave-medium': 'waveMove 15s ease-in-out infinite reverse',
        'wave-fast': 'waveMove 10s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        waveMove: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(-50px) translateY(-20px)' },
          '50%': { transform: 'translateX(0px) translateY(-40px)' },
          '75%': { transform: 'translateX(50px) translateY(-20px)' },
        },
        neonPulse: {
          '0%': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
          '100%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
})
