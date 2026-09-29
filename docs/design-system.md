# GSF site design system

Goal: a clean, modern, light product site (think Linear / Vercel / Stripe in
light mode) that still reads as a real engineering company: real prices, real
photos, plain words. Crisp white pages, cool light-grey surfaces, bold
headings, softly rounded cards with subtle shadows, plenty of whitespace.
Everything is light, including the home hero and the footer.

## Tokens (tailwind.config.js)

Token names were kept from the previous system, so existing classes follow the
new values.

| Token | Hex | Use |
|---|---|---|
| `paper` | #FFFFFF | page background, card background |
| `paper-2` | #F6F7F9 | alternate sections, footer, table headers, CTA panel, hover fills |
| `paper-3` | #EEF0F3 | photo placeholders, 3D viewer backdrop (`ViewerScene` uses the same hex) |
| `ink` | #0B0C0E | text, primary button |
| `graphite` | #5B616B | secondary text (6.3:1 on white, AA on paper-2) |
| `hairline` | #E5E7EB | borders and dividers |
| `hairline-strong` | #D0D5DD | form controls, outline buttons, hovered cards |
| `teal-ink` | #00736E | links, section labels, text accents (AA on white and paper-2) |
| `teal` | #00B4AE | logo teal: dots, selected states, icon fills. Never body text |
| `teal-wash` | #E6F7F6 | tinted chip / step-number backgrounds |
| `signal` | #C2410C | prices, errors (5.2:1 on white) |
| `night*` | | dark palette, currently unused by site pages |

Legacy tokens (`ice`, `darkbg`, `softwhite`, `glass`, `shadow-glow`) exist only
for the standalone 3D demos. Don't use them in site pages.

Shadows: `shadow-xs` (buttons, inputs), `shadow-card` (resting card),
`shadow-card-hover` (hovered card), `shadow-nav` (scrolled navbar).
Tracking: `tracking-tightish` (-0.015em, small headings), `tracking-heading`
(-0.025em, section headings), `tracking-display` (-0.035em, H1s).
Easing: `ease-out` is `cubic-bezier(0.22, 1, 0.36, 1)`.

## Typography

- `font-sans` = Anuphan (Thai + Latin) everywhere.
- Headings are `font-semibold` with tight tracking and `text-balance`:
  - Home H1: 44px mobile to 76px desktop (`tracking-display`, leading 1.02).
  - Page H1 (`PageHeader`): 40px to 64px.
  - Section H2 (`SectionHeading`): 32px to 44px. Product `Band` H2: 28px to 36px.
- Lead paragraphs are `text-lg text-graphite`.
- `font-mono` (IBM Plex Mono) only for prices, SKUs and spec values
  (`SpecTable`, `KitComparisonTable`). Add `tabular-nums` to prices.
- No "FIG. n" captions, no mono labels. Small labels use the `.caption` class
  (13px, medium, graphite).

## Components

`app/globals.css` component classes:

- `.card`: `rounded-xl border border-hairline bg-paper shadow-card`.
- `.card-hover`: add to cards that are links. Lifts 2px, stronger shadow and
  border, 300ms ease-out (no lift with reduced motion).
- `.chip`: small rounded-full tag (tech stack, case-study area, status).
- `.link`: teal-ink text link with a soft underline.
- `.caption`: small label (field names, categories).

`components/ui/`:

- **Button** (`ButtonLink`): `primary` (near-black, rounded-lg, h-10/h-12),
  `outline` (white, `hairline-strong` border), `link` (teal-ink text with a
  trailing arrow that nudges on hover). `tone="night"` is deprecated and renders
  the light variants.
- **SectionHeading** + `Label`: teal-ink sentence-case label, big semibold title,
  graphite description.
- **PageHeader**: breadcrumb (sans, graphite), H1, lead, actions; hairline below.
- **CtaBand**: page-specific closing panel on `paper-2`, rounded-xl, contact
  details as small white cards. Give each page its own title.
- **ImageFrame**: rounded-xl frame; optional short caption.
- **Reveal**: gentle fade + 12px slide-in (600ms) the first time a block scrolls
  into view. Server HTML is visible; only blocks below the fold get hidden on
  the client. Disabled with `prefers-reduced-motion`. Use for section content,
  small stagger via `delay` (0 to 240ms).

Patterns:

- Lists of things (services, products, work, class formats, steps) are card
  grids with `gap-4`. With an odd count in a 2-column grid, let the last card
  span both columns.
- Tables and definition lists live inside a `.card` with `divide-y
  divide-hairline`; table headers sit on `paper-2`.
- A dense index (the six smaller services) can use the `gap-px bg-hairline`
  grid trick for clean inner lines.
- Product photos sit on white (`mix-blend-multiply` for studio shots) in a
  rounded frame; lifestyle photos use `object-cover`.
- Sections alternate `paper` / `paper-2` with a `border-hairline` top rule;
  vertical padding `py-20 md:py-28` (sub-sections `py-16 md:py-24`).
- Navbar: transparent at the top; once scrolled `bg-paper/80` + backdrop blur +
  hairline bottom border + `shadow-nav`. Active link is a `paper-2` pill.
- Footer: light, `paper-2`, `logo-ink.png`.

## Rules

- Radius: `rounded-lg` (8px) for buttons, inputs, small tiles; `rounded-xl`
  (12px) for cards, images, panels; `rounded-full` for chips and dots.
- Motion: hover transitions 200 to 300ms (colour, shadow, at most 2px lift or a
  1.02 image zoom), scroll reveals as above. Nothing bouncy, nothing looping
  besides the robot and 3D viewers.
- **No**: neon glows, gradient text, purple gradients, glassmorphism (blur is for
  the navbar only), stock-photo feel, uppercase tracked eyebrows, invented facts.
- Accessibility: AA contrast (graphite and teal-ink pass on white and paper-2),
  visible focus (2px teal-ink outline), `lang="th"` on any Thai text.

## Copy

Plain, specific, first person plural. English only on the site. Banned:
seamless, cutting-edge, empower, unlock, elevate, leverage, robust, innovative,
transform, harness, intelligent, "end-to-end", "real world", "from X to Y",
"we don't just…". No em dashes in body copy. Don't list in threes by reflex.
Never invent numbers, clients, testimonials, stock status or policies. Facts
live in `lib/*.ts` (site, services, products, training, work).

Logos: `/logo-ink.png` (on light backgrounds). `/logo-night.png` is kept for
dark contexts but no site page uses one.
