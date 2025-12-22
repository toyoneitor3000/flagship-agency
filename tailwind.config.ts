import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        display: ['var(--font-space)', 'var(--font-sans)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'brand-cream': '#f0ffcc', // Light cream green
        'brand-green': '#709600', // Dark moss green
      },
    },
  },
  plugins: [],
};
export default config;