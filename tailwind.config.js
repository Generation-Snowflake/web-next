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
          deep: "#0088A3", // Adjusted for better contrast
        },
        darkbg: "#050A14", // Slightly darker for more depth
        softwhite: "#F4F9FF",
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"], // Added for headings
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 212, 255, 0.4)",
        "glow-sm": "0 0 15px rgba(0, 212, 255, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "conic-gradient(from 180deg at 50% 50%, #00D4FF 0deg, #6AEFFF 180deg, #00D4FF 360deg)",
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
