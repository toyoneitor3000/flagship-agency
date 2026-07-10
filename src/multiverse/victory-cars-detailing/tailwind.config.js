/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#F5F5F7',
          card: '#FFFFFF',
          text: '#1D1D1F',
          subtext: '#86868B',
          blue: '#0071E3',
          border: '#E5E5EA',
        },
        brand: {
          'dark-blue': '#000000', 
          'mid-blue': '#1c1c1e',  
          'accent-blue': '#0A84FF', 
          'cyan': '#06b6d4',      
          'cyan-hover': '#0891b2',
          'slate': '#8e8e93',     
          'white': '#ffffff',
          'petroleum': '#003f5c', 
          'light-blue': '#5E5CE6',
          'black': '#000000',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'var(--font-inter)',
          'sans-serif'
        ],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right, #000000 0%, #1c1c1e 100%)',
        'blue-glow': 'conic-gradient(from 180deg at 50% 50%, #000000 0deg, #0A84FF 180deg, #06b6d4 360deg)',
        'petroleum-to-black': 'linear-gradient(to bottom, #1c1c1e, #000000)',
        'black-to-lightblue': 'linear-gradient(to bottom, #000000, #5E5CE6)',
        'lightblue-to-black': 'linear-gradient(to bottom, #5E5CE6, #000000)',
        'petroleum-black-diagonal': 'linear-gradient(135deg, #1c1c1e 0%, #000000 100%)',
        'black-lightblue-diagonal': 'linear-gradient(135deg, #000000 0%, #5E5CE6 100%)',
        'lightblue-black-diagonal': 'linear-gradient(135deg, #5E5CE6 0%, #000000 100%)',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-glow': 'pulseGlow 3s infinite',
        'gradient-shift': 'gradientShift 10s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
