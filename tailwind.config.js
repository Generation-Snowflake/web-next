/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          light: "#6AEFFF",
          DEFAULT: "#00D4FF",
          deep: "#0A0F1F",
        },
        darkbg: "#0A0F1F",
        softwhite: "#F4F9FF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 212, 255, 0.4)",
      },
    },
  },
  plugins: [],
};
