/** @type {import('tailwindcss').Config} */
// Design tokens: see docs/design-system.md. Clean modern light: white pages,
// cool light-grey surfaces, near-black text, soft borders and shadows.
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        paper: {
          DEFAULT: "#FFFFFF", // page background
          2: "#F6F7F9", // subtle section surface
          3: "#EEF0F3", // photo / 3D backdrop
        },
        // Text
        ink: "#0B0C0E",
        graphite: "#5B616B",
        // Borders
        hairline: {
          DEFAULT: "#E5E7EB",
          strong: "#D0D5DD", // form controls, hovered cards
        },
        // Brand
        "teal-ink": "#00736E", // links / text accents (AA on white and paper-2)
        teal: "#00B4AE", // logo teal: dots, icons, fills. Not for body text.
        "teal-wash": "#E6F7F6", // tinted chip backgrounds
        signal: "#C2410C", // prices, errors
        // Legacy tokens: only for the standalone 3D demos (/power-plant,
        // /factory, /demo3d). Don't use in site pages.
        ice: { light: "#6AEFFF", DEFAULT: "#00D4FF", deep: "#0088A3" },
        darkbg: "#050A14",
        softwhite: "#F4F9FF",
        glass: "rgba(255, 255, 255, 0.05)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
        // Dark palette, currently unused by site pages (hero and footer are light).
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
        // Legacy (3D demos only).
        glow: "0 0 30px rgba(0, 212, 255, 0.4)",
        "glow-sm": "0 0 15px rgba(0, 212, 255, 0.3)",
        // Site: soft, low-contrast elevation.
        xs: "0 1px 2px rgba(16, 24, 40, 0.05)",
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.05)",
        "card-hover": "0 2px 4px rgba(16, 24, 40, 0.04), 0 8px 20px -4px rgba(16, 24, 40, 0.10)",
        nav: "0 1px 0 rgba(16, 24, 40, 0.04), 0 4px 16px -8px rgba(16, 24, 40, 0.08)",
      },
      letterSpacing: {
        tightish: "-0.015em",
        heading: "-0.025em",
        display: "-0.035em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        page: "80rem",
        prose: "40rem",
      },
    },
  },
  plugins: [],
};
