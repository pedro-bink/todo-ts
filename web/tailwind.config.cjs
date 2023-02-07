/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-bg-blue': '#2a2c36',
        'custom-bg': 'rgb(214, 211, 209)',
        'custom-bg-lightBlue': '#65d9fe',
        'custom-text-blue': '#65d0f8',
      },
    },
  },
  plugins: [],
};
