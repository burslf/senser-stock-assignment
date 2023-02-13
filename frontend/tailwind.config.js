const colors = require('tailwindcss/colors')
const { createThemes } = require('tw-colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {}
  },
  plugins: [
    createThemes({
      light: {
      'white': '#FDFDFD',
      'dark-white': '#CFCFCF',
      'black': '#151515',
      'light-black': '#333333',
      'primary': '#333333',
      'secondary': '#FDFDFD',
      'warning': 'red',
      'text-secondary': '#151515',
      'background': '#FDFDFD'
      }, 
      dark: {
        'white': '#FDFDFD',
        'dark-white': '#CFCFCF',
        'black': '#151515',
        'light-black': '#333333',
        'primary': '#333333',
        'secondary': '#333333',
        'warning': 'red',
        'text-secondary': '#FDFDFD',
        'background': '#191919'
      }, 
    })
  ],
  important: true,
}
