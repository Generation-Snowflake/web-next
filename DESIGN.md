---
name: GSF Robotics & AI
description: A near-black industrial dark system with a single electric-cyan signal accent, glass surfaces, and engineered glow.
colors:
  reactor-cyan: "#00D4FF"
  reactor-cyan-light: "#6AEFFF"
  reactor-cyan-deep: "#0088A3"
  forge-black: "#050A14"
  signal-white: "#F4F9FF"
  ink-text: "#E2F3FF"
  body-text: "#D1D5DB"
  muted-text: "#9CA3AF"
  glass: "#FFFFFF0D"
  glass-border: "#FFFFFF1A"
  catalog-ink: "#0B1A24"
  catalog-teal: "#00A0AB"
  catalog-teal-dark: "#017E88"
  catalog-mist: "#EEF2F4"
  catalog-line: "#DCE3E7"
  catalog-slate: "#5C6E78"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 2
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.3em"
  brand-mark:
    fontFamily: "Outfit, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
rounded:
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  gutter: "24px"
  grid-gap: "16px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.reactor-cyan}"
    textColor: "{colors.forge-black}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.reactor-cyan-light}"
    textColor: "{colors.forge-black}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-ghost:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.signal-white}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  nav-cta:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.reactor-cyan}"
    rounded: "{rounded.full}"
    padding: "8px 20px"
  card-surface:
    backgroundColor: "{colors.glass}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: GSF Robotics & AI

## 1. Overview

**Creative North Star: "The Cold Forge"**

This is precision machining seen under cold light. The surface is a near-black blue, the color of unlit steel, and through it runs a single electric cyan: the energy signature of a working machine, a heat trace at the cutting edge. Nothing on the page is decorative for its own sake. Glow means something is live. An edge lights because it is active. The system reads as engineered first and styled second, which is exactly the impression GSF Robotics needs to leave on the two audiences it serves: industrial buyers deciding whether this team can ship reliable real-world systems, and investors reading the polish as a proxy for rigor.

Density is deliberate but never busy. Large negative space frames hero statements; cyan is rationed so that its appearance always carries information (a CTA, an active state, a live signal). The motion stack (GSAP, Framer Motion, Lenis smooth-scroll, a particle field, parallax, real-time 3D model viewers) exists to demonstrate capability, not to fill silence. Every effect should feel like it was tuned on a bench, not dropped from a library.

This system explicitly rejects four things named in PRODUCT.md. It is not a **generic SaaS template** (no cream backgrounds, no identical feature-card grids, no big-number hero-metric block, no tracked-uppercase eyebrow over every section). It is not **cheap or toy robotics** (nothing cartoonish, playful, or consumer-gadget). It is not **corporate stock-photo enterprise** (no handshake imagery, no soulless factory stock). And it is not **cluttered or over-animated** (the futuristic feel stays legible; restraint is what separates frontier from gimmick).

**Key Characteristics:**
- Near-black steel-blue field (`#050A14`) with one rationed electric-cyan signal (`#00D4FF`).
- Glass surfaces at very low opacity; depth comes from tone and glow, not heavy shadow.
- Glow is functional: it marks live, active, or hovered state, never ambient decoration.
- Engineered motion: parallax, particles, and 3D viewers that show capability, each with a reduced-motion fallback.
- Cyan rarity: the accent appears on a small fraction of any screen, so it always reads as signal.

## 2. Colors

A cold, near-monochrome dark field carrying a single high-energy cyan signal, with a separate light "catalog" sub-palette reserved for the standalone product mini-site.

### Primary
- **Reactor Cyan** (`#00D4FF`): The one signal color. Used for CTAs, active nav states, the logotype dot, hover edges, focus glow, and any element that should read as "live." Its scarcity is the entire point; the moment it appears on more than a small fraction of a screen it stops meaning anything.
- **Reactor Cyan Light** (`#6AEFFF`): The hover/lift state of the primary accent. Primary buttons brighten to this on hover.
- **Reactor Cyan Deep** (`#0088A3`): The contrast-safe cyan, tuned darker for use as text or fine detail where the bright cyan would fail legibility against lighter surfaces.

### Neutral
- **Forge Black** (`#050A14`): The base surface, a near-black steel blue. The body is actually a radial gradient from `#0A1F33` to `#030712`, so the field reads as lit from a cold source rather than flat black.
- **Signal White** (`#F4F9FF`): Headline and high-emphasis text. A cool white, never pure `#FFFFFF`.
- **Ink Text** (`#E2F3FF`): The default body ink set on `<body>`; a soft cyan-white for long-form reading on the dark field.
- **Body Text** (`#D1D5DB`): Standard paragraph text in sections (`gray-300`). Hold to this or lighter for anything that must be read.
- **Muted Text** (`#9CA3AF`): Supporting/secondary copy (`gray-400`). The legibility floor; never go more muted than this for readable text on the dark field.
- **Glass** (`#FFFFFF0D`, rgba white 0.05) and **Glass Border** (`#FFFFFF1A`, rgba white 0.10): The translucent surface and hairline that build cards, the scrolled navbar, and ghost buttons.

### Tertiary (Catalog sub-brand)
A deliberately separate, light, industrial palette scoped only to the standalone `/demoCatalog` mini-site. It is Flender-inspired and must not bleed into the main dark site.
- **Catalog Ink** (`#0B1A24`): Dark slate for the catalog's hero, header, footer.
- **Catalog Teal** (`#00A0AB`) / **Catalog Teal Dark** (`#017E88`): The catalog's petrol-teal brand accent and its hover.
- **Catalog Mist** (`#EEF2F4`): The catalog's light page background.
- **Catalog Line** (`#DCE3E7`): Hairline borders on the catalog's light surfaces.
- **Catalog Slate** (`#5C6E78`): Muted body text on the catalog's light surfaces.

### Named Rules
**The Rationed Signal Rule.** Reactor Cyan is signal, not paint. It appears on at most ~10% of any given screen, and only where it carries meaning: a CTA, an active/hover state, a live readout, the brand mark. If cyan is being used to "add color" or "make it pop," remove it; the dark field and white type carry the design.

**The Two-Worlds Rule.** The dark Forge palette and the light Catalog palette never mix on the same surface. The catalog is a sealed sub-brand. Don't pull `catalog-teal` into the main site, and don't pull `reactor-cyan` into the catalog.

## 3. Typography

**Display / Body Font:** Inter (with `sans-serif` fallback)
**Brand-Mark Font:** Outfit (with `sans-serif` fallback), reserved for the GSF logotype

**Character:** One workhorse family, Inter, carries the entire interface through weight and scale contrast rather than a second typeface. Inter's neutral, technical, grotesque shapes read as engineered and stay razor-legible at small sizes against the dark field. Outfit, a slightly geometric companion, is held back exclusively for the "GSF." brand mark so the wordmark has its own voice without introducing a competing body face.

### Hierarchy
- **Display** (Inter, 700/800, `clamp(2.25rem, 5vw, 4.5rem)` from `text-4xl` to `text-7xl`, line-height 0.96, tracking `-0.02em`): Hero `h1` and section `h2` headings. Tight leading and negative tracking give a dense, machined headline block.
- **Title** (Inter, 600, `1.125rem` / `text-lg`): Card and sub-section headings (e.g. service-card titles), set in Signal White.
- **Body** (Inter, 400, `1rem`–`1.25rem`, line-height 1.75–2 / `leading-8`): Paragraph copy in Body Text gray. Keep measure at 65–75ch (the existing `max-w-2xl`/`max-w-md` constraints do this).
- **Label** (Inter, 600, `0.875rem` / `text-sm`, uppercase, tracking `0.28em`–`0.32em`, Reactor Cyan at ~70–80% opacity): The section kicker / eyebrow. This is a deliberate, consistent brand device here, one named system voice, not a per-section reflex.

### Named Rules
**The One-Family Rule.** Inter does all the work; Outfit is only ever the "GSF." mark. Do not introduce a third family. Hierarchy comes from weight (400 → 600 → 700/800) and scale, not from new typefaces.

**The Load-What-You-Set Rule.** Outfit must actually be loaded (via `next/font` or an `@import`) wherever `font-display` is used; today only Inter is imported, so any `font-display` element silently falls back to system sans. Either load Outfit or stop claiming it.

## 4. Elevation

This system is flat-by-default with light-based depth. Surfaces are translucent glass (`#FFFFFF0D`) over the dark field; separation comes from a hairline border (`#FFFFFF1A`) and tonal shift, not from drop shadows. The only "shadow" in the system is cyan glow, and it is a state signal, not ambient elevation: elements sit flat at rest and light up on hover/active.

### Shadow Vocabulary
- **Glow** (`box-shadow: 0 0 30px rgba(0, 212, 255, 0.4)`): The primary CTA's resting halo, the cyan heat trace that says "this is the live action."
- **Glow Small** (`box-shadow: 0 0 15px rgba(0, 212, 255, 0.3)`): Smaller accented elements and active chips.
- **Card Lift** (`box-shadow: 0 18px 70px rgba(0, 212, 255, 0.12)`): Appears only on card hover, paired with a `-translate-y-1` rise, so depth is a response to interaction.

### Named Rules
**The Glow-Is-State Rule.** Glow is never decoration. It marks the primary action, an active control, or a hovered surface. A card at rest casts nothing; it earns its lift by being touched. If everything glows, nothing reads as live.

## 5. Components

Components feel like **precision instruments, lit from within**: crisp edges, restrained glass, cyan that ignites only on interaction.

### Buttons
- **Shape:** Fully rounded pills (`border-radius: 9999px`).
- **Primary:** Solid Reactor Cyan fill, Forge Black text, `padding: 12px 28px` (`px-7 py-3`; CTAs use `px-8 py-4`), `font-semibold`, resting `Glow` halo.
- **Hover / Focus:** Brightens to Reactor Cyan Light and rises `-translate-y-0.5` over `300ms`. Focus must add a visible cyan ring (see Do's; the current build relies on hover only).
- **Ghost / Secondary:** `glass` fill (`bg-white/5`) with `backdrop-blur-md`, white text, `1px` Glass Border. On hover the border shifts to Reactor Cyan and the fill lifts to `white/10`. Used as the secondary hero action.
- **Nav CTA ("Get Started"):** A smaller cyan-tinted pill, `bg-ice/10` with `border-ice/20` and cyan text; on hover it inverts to a solid cyan fill with Forge Black text.

### Cards / Containers
- **Corner Style:** `12px` radius (`rounded-xl`).
- **Background:** Very low-opacity glass (`bg-white/[0.035]`) over the dark field.
- **Border:** `1px` Glass Border (`white/10`) at rest, shifting to `border-ice/60` on hover.
- **Shadow Strategy:** Flat at rest; on hover, `-translate-y-1` plus the Card Lift glow (see Elevation). A thin cyan top-edge gradient and a faint orbital ring fade in on hover as the "instrument powering up" detail.
- **Internal Padding:** `24px` (`p-6`).

### Navigation
- **Style:** Fixed top bar, transparent over the hero, transitioning on scroll (past 50px) to `bg-darkbg/80` with `backdrop-blur-md` and a `1px` bottom Glass Border.
- **Typography:** `text-sm font-medium`, links in Body Text gray, brightening to Reactor Cyan on hover.
- **Active/Hover:** An underline grows from `width: 0` to full in cyan beneath the hovered link.
- **Mobile:** Collapses to a hamburger (`lucide-react` Menu/X) with an animated panel (Framer Motion). The toggle has `aria-label`; the panel needs focus management and `aria-expanded` (see Do's).

### Forms / Inputs
The current site routes contact via a `mailto:` CTA rather than a rendered form. When real inputs are introduced, they must follow the instrument language: dark glass fill, `1px` Glass Border at rest, Reactor Cyan border + Glow-Small ring on focus, Muted Text placeholder at full `#9CA3AF` (never lighter), and a clear error state in a warm signal color distinct from cyan.

### Signature Component: 3D Product Viewer
The `ModelViewer` / `ProductViewer` (React Three Fiber) is the system's proof-of-capability centerpiece, real-time 3D models a visitor can rotate. It must degrade gracefully (a static product image when WebGL or `prefers-reduced-motion` applies) and expose accessible controls and labels. This is "show the work, don't describe it" made literal.

## 6. Do's and Don'ts

### Do:
- **Do** ration Reactor Cyan to ~10% of any screen, used only where it carries meaning (CTA, active state, live signal, brand mark). The dark field and Signal White type carry the layout.
- **Do** keep readable text at Body Text (`#D1D5DB`) or lighter, and verify ≥4.5:1 against Forge Black; use Reactor Cyan Deep (`#0088A3`), not bright cyan, for any cyan-colored *text*.
- **Do** treat glow as a state signal: resting flat, lighting up on hover/active/focus.
- **Do** give every animated surface (particles, parallax, scroll sequences, the 3D viewer) a `prefers-reduced-motion: reduce` fallback. This is a PRODUCT.md requirement, not a nicety.
- **Do** add visible cyan focus rings and full keyboard operability to every interactive element, including the model viewer and the mobile menu (`aria-expanded`, focus trap, Esc to close).
- **Do** let the real artifacts (3D models, portfolio pieces) be the proof of capability, per "show the work, don't describe it."
- **Do** keep the light Catalog palette sealed inside `/demoCatalog`.

### Don't:
- **Don't** build a **generic SaaS template**: no cream/white backgrounds, no identical feature-card grids, no big-number hero-metric block, and no tracked-uppercase eyebrow over *every* section (the kicker here is one deliberate brand device, not a per-section reflex).
- **Don't** drift toward **cheap or toy robotics**: nothing cartoonish, playful, or consumer-gadget. The system stays industrial-grade.
- **Don't** use **corporate stock-photo** imagery (handshakes, generic factory floors). Show GSF's actual work instead.
- **Don't** over-animate into **clutter**: no competing effects, no motion-for-motion's-sake. Every effect must reinforce capability or guide attention, or it gets cut.
- **Don't** let glow become ambient decoration or spread cyan across large fills; both kill the signal.
- **Don't** introduce a third font family, and don't reference `font-display` (Outfit) without actually loading it.
- **Don't** use `border-left`/`border-right` colored stripes, gradient-filled text, or decorative glassmorphism beyond the established low-opacity surface system.
