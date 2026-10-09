# GSF site design system

Source of truth: **GSF Robotics and AI Brand Guidelines v1.0 (Oct 2026)**, the
CI book. This file translates it into the tokens and components the site uses.
When the two disagree, the CI book wins; update this file.

Brand concept: **"Technology that works in the real world."** Four values:
Engineering precision, Practical intelligence, Human usability, Real-world
impact (`components/home/BrandConcept.tsx`).

## Colour (tailwind.config.js)

Ratio from the CI: **65% Primary Light, 25% Primary Dark, 10% accents.**

| Token | Hex | CI name | Use |
|---|---|---|---|
| `paper` | #F6FAFC | Primary Light | page background |
| `card` | #FFFFFF | | raised cards on Primary Light |
| `paper-2` / `mist-100` | #F1F5F8 | Mist 100 | alternate sections, table headers |
| `paper-3` / `mist-200` / `hairline` | #E8EEF2 | Mist 200 | card borders, photo backdrops |
| `hairline-strong` / `mist-300` | #D9E0E6 | Mist 300 | dividers, section rules, form controls |
| `ink` | #071128 | Primary Dark | headings, structure, dark sections (footer, CTA) |
| `ink-800` | #384152 | Ink 800 | sub headings |
| `ink-700` | #4C5567 | Ink 700 | body text |
| `ink-600` / `graphite` | #5B6474 | Ink 600 | secondary text |
| `ink-500` | #6B7280 | Ink 500 | captions, metadata |
| `cyan-500` / `teal` | #18D9E3 | Circuit Cyan | CTA, highlight, interactive, nodes |
| `cyan-600` | #0FA7B8 | Deep Aqua | hover, data highlight |
| `cyan-700` / `teal-ink` | #0B8997 | Cyan 700 | hover/active; accent text at large sizes only |
| `cyan-200` | #9EEBF0 | Ice Aqua | secondary accent, accents on dark |
| `cyan-50`, `cyan-100`, `cyan-300` | | Cyan scale | tints, hover fills |
| `success` `warning` `error` `info` | #16A34A #F59E0B #EF4444 #18D9E3 | Status colours | status only |

Gradients: `bg-gradient-a` (Brand Accent, CTA buttons), `bg-gradient-b` (Soft
Technology), `bg-gradient-c` (Deep Technical: the heading bar, dark panels).
`bg-gradient-c-deep` holds the dark end longer for panels that carry white
text.

**Contrast rules** (checked, WCAG):
- Cyan 500/300/200 never carry text on light backgrounds (1.3–1.7:1). Use them
  for fills, lines, nodes, and buttons with **Primary Dark text** (10.8:1).
- Cyan 700 on white is 4.2:1: large text only (the cyan second line of a
  Display heading). Small accent text is Primary Dark.
- Error red is for borders and icons; error messages are Primary Dark text
  with a red icon.
- Prices are Primary Dark mono (`.price`); the CI has no orange.

## Typography

- **IBM Plex Sans Thai** for Thai and English, weights 400/500/600/700.
  IBM Plex Mono for prices, SKUs and spec values.
- Type scale (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body-l`,
  `text-body-m`, `text-caption`):

| Style | Size / line | Weight | Used for |
|---|---|---|---|
| Display | 56/68 | Bold 700 | home hero, page H1 (`PageHeader`) |
| H1 | 40/52 | SemiBold 600 | section headings (`SectionHeading` h2) |
| H2 | 28/40 | SemiBold 600 | product-page bands |
| H3 | 20/30 | Medium 500 | card titles |
| Body L | 16/28 | Regular | lead and long-form text (17px on the site) |
| Body M | 14/24 | Regular | general content |
| Caption | 11/18 (12 on screen) | Medium 500 | captions, notes |

- Display and H1 step down on phones.
- Labels (`.label`, `Label`): uppercase, tracked 0.08em, semibold, Ink 700,
  with a cyan circuit node in front.
- Heading pattern from the CI: label, title, optional Thai subtitle, a short
  Gradient C bar (`.accent-bar`), then the body.

## Layout and grid

- Desktop: 12 columns, 24px gutters, 1200px content (`max-w-page` + `px-6`).
- Tablet 8 columns, phone 4 columns, 16px side margins.
- Card grids use `gap-6` (24px).
- Sections alternate `paper` / `paper-2` with a `hairline-strong` top rule,
  `py-20 md:py-28`.

## Graphic elements

All decorative, low opacity, secondary to content:

- `CircuitLines`: traces with 45° bends ending in nodes (CTA band, footer,
  brand concept).
- `ConstructionCircle`: the CI cover circle with square handles (home hero,
  behind the robot).
- `.dot-grid` / `.dot-grid-night`: the CI page dot grid (hero, page headers,
  dark panels), usually faded with a mask.
- `.corner-marks`: the 8px squares on the CI page frame.
- `/logo-watermark.png`: faint snowflake in page headers (opacity ≈ 7%).
- Cursor + Gradient C tag: the CI cover motif (home hero caption).

## Logo

From the CI book, extracted to `/public`:
- `logo.png` / `logo-ink.png`: full colour, for light backgrounds.
- `logo-night.png`: reverse, for Primary Dark backgrounds (footer, icons).
- `logo-mono-white.png`: monochrome on dark.
- `logo-watermark.png`: grey, watermark only.

Lockup: mark + "**GSF** Robotics and AI" (GSF bold). Keep 1X clear space. Don't
stretch, rotate, recolour, add glows/effects, rearrange, or place it on busy
photos.

## Icons

**Phosphor Icons** (`@phosphor-icons/react`), regular weight (outline,
geometric), 24px grid. Server components import from
`@phosphor-icons/react/dist/ssr`. lucide-react is no longer used by site pages.

## Components

- **Button** (`ButtonLink`): `primary` (Gradient A, Primary Dark text, hover
  Deep Aqua), `dark` (Primary Dark), `outline`, `link` (Primary Dark text with
  a cyan arrow). `tone="night"` on dark sections.
- **SectionHeading** + `Label`, **PageHeader** (CI cover: dot grid,
  watermark, Display H1), **CtaBand** (Gradient C panel with circuit traces),
  **Band** (product sections), **ImageFrame**, **Reveal**.
- `.card` (white, Mist border), `.card-hover` (lift + cyan edge), `.chip`,
  `.chip-info` (status: in development), `.link` (Primary Dark, cyan
  underline), `.caption`, `.price`.
- Navbar: transparent at the top, blurred Primary Light when scrolled; active
  link has a cyan underline; CTA is the primary button.
- Footer: Primary Dark with the reverse logo and a Gradient C top rule.

## Photography

Real hardware, real work, clean industrial light, people with machines, cyan
as the signal colour. No stock-photo feel. Software products without photos
get a drawn preview in brand colours, labelled as an illustration (e.g.
`components/products/TakticPreview.tsx`).

## Copy

Plain, specific, first person plural. English on the site, Thai subtitles
with `lang="th"`. Never invent numbers, clients, testimonials, stock status or
policies. Facts live in `lib/*.ts` (site, services, products, training,
work). Avoid: seamless, cutting-edge, empower, unlock, elevate, leverage,
robust, innovative, harness.
