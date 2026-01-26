import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Include multiverse tenant sites
    "./src/multiverse/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        display: ['var(--font-space)', 'var(--font-sans)'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        'style-script': ['var(--font-style-script)', 'cursive'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'brand-cream': '#f0ffcc',
        'brand-green': '#709600',
        // Victory Cars brand colors
        brand: {
          'dark-blue': '#020617',
          'mid-blue': '#0f172a',
          'accent-blue': '#1e3a8a',
          'cyan': '#06b6d4',
          'cyan-hover': '#0891b2',
          'slate': '#94a3b8',
          'white': '#ffffff',
          'petroleum': '#003f5c',
          'light-blue': '#4cc9f0',
          'black': '#000000',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(to right, #020617 0%, #0f172a 100%)',
        'blue-glow': 'conic-gradient(from 180deg at 50% 50%, #020617 0deg, #1e3a8a 180deg, #06b6d4 360deg)',
        'petroleum-to-black': 'linear-gradient(to bottom, #003f5c, #000000)',
        'black-to-lightblue': 'linear-gradient(to bottom, #000000, #4cc9f0)',
        'lightblue-to-black': 'linear-gradient(to bottom, #4cc9f0, #000000)',
        'petroleum-black-diagonal': 'linear-gradient(135deg, #003f5c 0%, #000000 100%)',
        'black-lightblue-diagonal': 'linear-gradient(135deg, #000000 0%, #4cc9f0 100%)',
        'lightblue-black-diagonal': 'linear-gradient(135deg, #4cc9f0 0%, #000000 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
