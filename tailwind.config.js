/** @type {import('tailwindcss').Config} */
// Design tokens: see docs/design-system.md. Light "paper" pages with ink
// rules; the home hero and footer use the dark "night" palette.
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F3F1EC",
          2: "#E9E6DE",
          3: "#E4E0D7",
        },
        ink: "#16181A",
        graphite: "#55595D",
        hairline: "#D5D1C7",
        "teal-ink": "#00736E",
        teal: "#00B4AE",
        signal: "#B93A15",
        // Legacy tokens: only for the standalone 3D demos (/power-plant,
        // /factory, /demo3d). Don't use in site pages.
        ice: { light: "#6AEFFF", DEFAULT: "#00D4FF", deep: "#0088A3" },
        darkbg: "#050A14",
        softwhite: "#F4F9FF",
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
        night: {
          DEFAULT: "#0F1011",
          2: "#16181A",
          line: "#2A2D30",
          text: "#E9E6DF",
          muted: "#8E9194",
        },
      },
      fontFamily: {
        sans: ["var(--font-anuphan)", "var(--font-plex-thai)", "system-ui", "sans-serif"],
        display: ["var(--font-anuphan)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "var(--font-plex-thai)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 212, 255, 0.4)",
        "glow-sm": "0 0 15px rgba(0, 212, 255, 0.3)",
      },
      borderRadius: {
        DEFAULT: "2px",
      },
      maxWidth: {
        page: "80rem",
        prose: "40rem",
      },
    },
  },
  plugins: [],
};
