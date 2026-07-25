/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#700c28",
        "primary-hover": "#5a081e",
        "accent-gold": "#b28c3d",
        "accent-gold-hover": "#987532",
      }
    },
  },
  plugins: [],
}
