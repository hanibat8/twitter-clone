
module.exports = {
  purge: [
    "./pages/**/*.tsx",
    "./pages/**/*.js",
    "./pages/**/*.ts",
    "./components/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.ts",
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./assets/*.png"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] 
      },
      colors: {
        'regal-blue': '#19163D',
      }
    },
  },
  plugins: [],
}