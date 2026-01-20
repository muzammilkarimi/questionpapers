/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'qp-orange' : '#FF914D',
        'qp-orange-dark': '#E67E3C',
        'back-grey' : '#E2E1DF',
      },
      dropShadow: {
        'neo': [
            '-10px -10px 10px #FFFFFF',
            '10px 10px 10px #9E9E9E'
        ],
        'input': [
            '0 -10px -10px 20px #ffffff',
            '0 10px 10px 20px #9e9e9e'
        ],
      }
    },
  },
  plugins: [],
}
