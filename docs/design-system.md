# GSF site design system

Goal: the site must not look AI-generated. It should read like an engineering
company's datasheet: real facts, real photos, ruled tables, plain words.
Layout = **dark hero on the home page only**, light "paper" everywhere else,
dark footer.

## Tokens (tailwind.config.js)

| Token | Hex | Use |
|---|---|---|
| `paper` | #F3F1EC | page background |
| `paper-2` | #E9E6DE | alternate bands, table headers, contact block |
| `paper-3` | #E4E0D7 | photo backdrop |
| `ink` | #16181A | text, 1px section rules, primary button |
| `graphite` | #55595D | secondary text |
| `hairline` | #D5D1C7 | inner dividers |
| `teal-ink` | #00736E | links, focus ring, active nav |
| `teal` | #00B4AE | logo teal / LED dots on dark only. Never text on paper |
| `signal` | #B93A15 | prices, errors |
| `night` / `night-2` / `night-line` / `night-text` / `night-muted` | #0F1011 / #16181A / #2A2D30 / #E9E6DF / #8E9194 | home hero + footer |

The old tokens (`darkbg`, `ice`, `softwhite`, `glass`, `shadow-glow`, `font-display`)
no longer exist. Remove every use.

Fonts: `font-sans` = Anuphan (Thai + Latin). `font-mono` = IBM Plex Mono (Thai
falls back to IBM Plex Sans Thai). Mono only for real data: SKUs, specs,
units, dates, FIG captions, breadcrumbs.

## Rules

- **No**: gradients, glow shadows, blur/backdrop-blur, glassmorphism, `rounded-2xl`
  and bigger, pill buttons, hover lift (`-translate-y`), scroll fade-ins,
  marquees, particles, uppercase tracked "eyebrow" labels, icon-in-a-square card
  grids, checkmark bullet lists, decorative 01/02/03 numbering, gradient text.
- Radius: `rounded-sm` (2px) on buttons/inputs; 0 on images and tables.
- Structure with **rules**: `border-ink` for major divisions, `border-hairline` inside.
  Prefer ruled lists and tables over cards. Cards only for real objects (a product).
- Left aligned, asymmetric, content decides section height. Vary spacing.
- Headings: weight 500, `tracking-[-0.015em]`. Optional Thai line under a heading
  (`lang="th"`, graphite). Optional mono label above ("Services · บริการ") via `Label`.
- Buttons (`components/ui/Button`): `primary` (ink block), `outline`, `link`
  (underlined teal-ink). Arrow only on the one primary action of a section.
  `tone="night"` on dark backgrounds.
- Figures: `ImageFrame` with a mono caption "FIG. n — what it shows". Don't show
  placeholders when a section can be hidden instead.
- Motion: hover colour changes (150ms) only. The hero robot and 3D product
  viewers are the only animated things.
- Accessibility: AA contrast, visible focus (teal-ink ring), `lang="th"` on Thai.

## Copy

Plain, specific, first person plural. Banned: seamless, cutting-edge, empower,
unlock, elevate, leverage, robust, innovative, transform, harness, intelligent,
"end-to-end", "real world", "from X to Y", "we don't just…". No em dashes in body
copy. Don't list in threes by reflex. Never invent numbers, clients, testimonials,
stock status or policies. Facts live in `lib/*.ts` (site, services, products, team, work).

## Shared pieces

`components/ui/`: Container, Button (ButtonLink), SectionHeading (+ `Label`),
PageHeader (breadcrumb crumbs + H1 + titleTh), ImageFrame, CtaBand (page-specific
contact block: pass a title such as "Ask about SO-101 price and lead time"),
Reveal (no-op wrapper, don't use in new code).
Logos: `/logo-ink.png` (on paper), `/logo-night.png` (on dark).
