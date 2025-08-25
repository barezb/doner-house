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
        'doner-red': '#A43F42',
        'doner-vermillion': '#E75625',
        'doner-amber': '#FDB719',
        'doner-black': '#171717',
        'doner-white': '#F4F4F5',
      },
      fontFamily: {
        'bronco': ['Impact', 'Helvetica Neue', 'sans-serif'],
        'impact': ['Impact', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}