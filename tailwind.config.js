/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          600: '#0D9488',
        },
        blue: {
          600: '#2563EB',
        },
        slate: {
          900: '#0B1220',
          500: '#64748B',
        },
        white: '#FFFFFF',
        card: '#FFFFFF',
        'card-foreground': '#0B1220',
        'muted-foreground': '#64748B',
      },
      fontFamily: {
        sans: [
          'Geist Sans',
          'Inter',
          'ui-sans-serif',
          'system-ui',
        ],
        mono: [
          'Geist Mono',
          'ui-monospace',
          'SFMono-Regular',
        ],
      },
    },
  },
  plugins: [],
};
