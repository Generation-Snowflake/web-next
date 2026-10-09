/** @type {import('tailwindcss').Config} */
// Design tokens: see docs/design-system.md. Values come from the GSF Robotics
// and AI Brand Guidelines v1.0 (Oct 2026): 65% Primary Light, 25% Primary
// Dark, 10% cyan accents.
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces (Primary Light + Mist)
        paper: {
          DEFAULT: "#F6FAFC", // Primary Light: page background
          2: "#F1F5F8", // Mist 100: alternate sections, table headers
          3: "#E8EEF2", // Mist 200: photo / 3D backdrop
        },
        card: "#FFFFFF", // raised cards on Primary Light
        mist: { 100: "#F1F5F8", 200: "#E8EEF2", 300: "#D9E0E6" },
        // Text (Primary Dark + Ink scale)
        ink: {
          DEFAULT: "#071128", // Primary Dark: headings, structure, dark sections
          800: "#384152", // sub headings
          700: "#4C5567", // body text
          600: "#5B6474", // secondary text
          500: "#6B7280", // captions / metadata
        },
        graphite: "#5B6474", // = ink-600, kept so existing classes follow the CI
        // Borders
        hairline: {
          DEFAULT: "#E8EEF2", // Mist 200: card border
          strong: "#D9E0E6", // Mist 300: dividers, form controls
        },
        // Accent scale (Circuit Cyan). Cyan 500-200 never carry text on light
        // backgrounds: they fail contrast. Use them for fills, nodes, lines and
        // buttons with Primary Dark text.
        cyan: {
          50: "#EDFDFE",
          100: "#D8F7F9",
          200: "#9EEBF0", // Ice Aqua
          300: "#70E5EB",
          500: "#18D9E3", // Circuit Cyan: CTA, highlight, interactive
          600: "#0FA7B8", // Deep Aqua: hover, data highlight
          700: "#0B8997", // hover / active; large text accents on light (4.2:1)
        },
        // Old names, mapped onto the CI palette so existing classes follow it.
        "teal-ink": "#0B8997",
        teal: "#18D9E3",
        "teal-wash": "#D8F7F9",
        signal: "#071128", // prices: Primary Dark (the CI has no orange)
        // Status colours (Brand Guidelines, Data Visualization)
        success: "#16A34A",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#18D9E3",
        // Dark sections use Primary Dark; these keep the old names working.
        night: {
          DEFAULT: "#071128",
          2: "#0C1A35",
          line: "#1E2B45",
          text: "#F6FAFC",
          muted: "#B4BDC9",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex-thai)", "system-ui", "sans-serif"],
        display: ["var(--font-plex-thai)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "var(--font-plex-thai)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Type scale (Brand Guidelines, Typography). Display/H1/H2 step down
        // on small screens in the components.
        display: ["3.5rem", { lineHeight: "4.25rem", fontWeight: "700" }], // 56/68
        h1: ["2.5rem", { lineHeight: "3.25rem", fontWeight: "600" }], // 40/52
        h2: ["1.75rem", { lineHeight: "2.5rem", fontWeight: "600" }], // 28/40
        h3: ["1.25rem", { lineHeight: "1.875rem", fontWeight: "500" }], // 20/30
        "body-l": ["1rem", { lineHeight: "1.75rem" }], // 16/28
        "body-m": ["0.875rem", { lineHeight: "1.5rem" }], // 14/24
        caption: ["0.75rem", { lineHeight: "1.125rem", fontWeight: "500" }], // 12/18 (CI: 11/18, raised for screens)
      },
      backgroundImage: {
        // Gradient A: Brand Accent (CTA, key graphic, data highlight)
        "gradient-a": "linear-gradient(90deg, #18D9E3 0%, #0FA7B8 100%)",
        // Gradient B: Soft Technology (background, card, section transition)
        "gradient-b": "linear-gradient(90deg, #9EEBF0 0%, #F6FAFC 100%)",
        // Gradient C: Deep Technical (hero, cover, dashboard, dark panels)
        "gradient-c": "linear-gradient(90deg, #071128 0%, #0FA7B8 100%)",
        // Gradient C held dark for longer, for panels and tags that carry
        // white text (white on the Deep Aqua end fails contrast).
        "gradient-c-deep": "linear-gradient(115deg, #071128 0%, #071128 40%, #0FA7B8 150%)",
        // Dot grid used on covers and section headers
        dots: "radial-gradient(circle, rgba(7, 17, 40, 0.16) 1px, transparent 1.2px)",
        "dots-night": "radial-gradient(circle, rgba(158, 235, 240, 0.16) 1px, transparent 1.2px)",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(7, 17, 40, 0.05)",
        card: "0 1px 2px rgba(7, 17, 40, 0.04), 0 1px 3px rgba(7, 17, 40, 0.05)",
        "card-hover": "0 2px 4px rgba(7, 17, 40, 0.04), 0 12px 24px -6px rgba(7, 17, 40, 0.12)",
        nav: "0 1px 0 rgba(7, 17, 40, 0.04), 0 4px 16px -8px rgba(7, 17, 40, 0.10)",
      },
      letterSpacing: {
        tightish: "-0.01em",
        heading: "-0.02em",
        display: "-0.03em",
        label: "0.08em",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      maxWidth: {
        // Grid: 1200px content (1440 desktop minus 2 x 120px margins) + gutters.
        page: "78rem",
        prose: "40rem",
      },
    },
  },
  plugins: [],
};
