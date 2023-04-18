/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: "#3E3B4F",
        secondary: "#89B0AE",
        pink: "#F4ACB7",
        gWhite: "#F7F7FF",
        white: '#FDFDFD'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
