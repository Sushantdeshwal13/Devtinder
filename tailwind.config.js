/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all your React component files
  ],
  theme: {
    extend: {}, //  You can customize your theme here
  },
  plugins: [require("daisyui")], //  Add Tailwind plugins here if needed
}
