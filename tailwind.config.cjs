/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      grey: '#F4F7F9',
      red: '#DF2040',
      green: '#40BF6A',
      primary: '#CA9A6F',
      main: {
        primary: '#CA9A6F',
        secondary: '#1F074D',
      },
    },
    extend: {},
  },
  plugins: [],
}
