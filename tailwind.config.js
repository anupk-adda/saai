/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Services Australia Official Colors
        'sa-blue': '#1B365D',        // Primary blue from header
        'sa-light-blue': '#2C5282',  // Lighter blue for hover states
        'sa-accent-blue': '#3182CE', // Accent blue for links
        'sa-dark-blue': '#1A202C',   // Dark blue for text
        'sa-gray': '#4A5568',        // Gray for secondary text
        'sa-light-gray': '#E2E8F0',  // Light gray for backgrounds
        'sa-white': '#FFFFFF',       // Pure white
        'sa-black': '#1A202C',       // Black for text
        'sa-green': '#38A169',       // Success green
        'sa-red': '#E53E3E',         // Error red
        'sa-yellow': '#D69E2E',      // Warning yellow
        'sa-orange': '#DD6B20',      // Orange for highlights
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'sa': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'sa-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
