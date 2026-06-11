# Product

## Register

brand

## Users

Two primary audiences land on the GSF Robotics site, and the design serves both without diluting either:

- **Enterprise & industrial buyers** — decision-makers at manufacturing, logistics, and factory operations evaluating automation partners. They arrive skeptical and time-pressed, scanning for proof the team can deliver reliable, real-world systems. Their job: decide whether GSF is credible enough to start a conversation.
- **Investors & strategic partners** — VCs, accelerators, and prospective partners assessing the team, the technology, and where it's headed. They want vision and traction signals fast.

Both contexts are evaluative, not casual. Visitors are judging whether GSF is serious. The site's job is to convert that judgment into a single action: reaching out.

## Product Purpose

GSF Robotics builds robotics and automation systems. The site is the company's primary shop window and credibility engine: it introduces the company, demonstrates technical capability through real work (portfolio, 3D product views, workflow), and routes qualified visitors toward contact.

Success is a visitor who lands skeptical and leaves convinced enough to **request a demo or get in touch**. Contact is the north-star action; everything else (vision, portfolio, services) exists to earn that click.

## Brand Personality

**Cutting-edge, precise, confident.** The tone is futuristic and high-tech without tipping into sci-fi cosplay. Motion and dimensionality (3D models, parallax, particle fields) signal that GSF lives at the frontier, but every effect should read as engineered, not decorative. The voice is direct and technically literate: it shows capability rather than claiming it.

Emotional goal: a visitor should feel they're looking at a team operating ahead of the curve, and that the polish on the surface reflects the rigor underneath.

## Anti-references

This site should NOT look like:

- **A generic SaaS template** — cream/white backgrounds, identical feature-card grids, the big-number hero-metric block, tiny tracked uppercase eyebrows over every section. The current dark, dimensional direction is deliberately the opposite; keep it that way.
- **Cheap or toy robotics** — cartoonish, playful, consumer-gadget styling. GSF builds industrial-grade systems; the design must never undercut that credibility.
- **Corporate stock-photo enterprise** — handshake imagery, soulless factory-floor stock, bland navy-and-gray boilerplate. Show the actual work instead.
- **Cluttered or over-animated** — effects competing for attention, motion everywhere, spectacle drowning the message. The futuristic feel must stay legible; restraint is what separates frontier from gimmick.

## Design Principles

1. **Show the work, don't describe it.** Credibility comes from real artifacts, actual products, 3D models, portfolio pieces, not adjectives. Lead with evidence.
2. **Engineered motion, not decoration.** Every animation should feel purposeful and physically precise. If an effect doesn't reinforce capability or guide attention, cut it.
3. **Frontier with restraint.** The site can feel ahead-of-the-curve and still be calm and readable. Density and glow are tools, not the goal; legibility wins every tradeoff.
4. **Every path leads to contact.** The north-star action is reaching out. Sections build trust and then hand the visitor toward that single next step.
5. **Polish signals rigor.** Surface craft is read as a proxy for engineering quality. Sloppy spacing, broken responsive states, or janky motion don't just look bad, they erode trust in the product.

## Accessibility & Inclusion

Baseline target: **WCAG AA** as a craft floor, with two requirements the user called out explicitly:

- **Respect reduced motion.** The site is motion-heavy (particles, parallax, scroll-driven sections, 3D viewers). Every animated surface needs a `prefers-reduced-motion: reduce` path, typically a static or crossfade fallback. This is non-negotiable given the effect density.
- **Keyboard and screen-reader support.** Full keyboard navigation, visible focus states, semantic landmarks, and meaningful alt text / labels on visual and 3D content. Interactive elements (model viewers, nav, forms) must be operable without a mouse.

On a dark, glow-forward palette, contrast is the easy thing to lose: hold body text to ≥4.5:1 and large text to ≥3:1 against the dark background, and avoid low-opacity muted text for anything that must be read.
