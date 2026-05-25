# GSF Deep Tech Landing Page Design

## Goal

Refresh the GSF Robotics & AI landing page into a premium deep tech studio website while preserving the current site's identity: dark technical atmosphere, cyan/teal accents, WebGL/particle motion, section snapping, and futuristic interaction.

The page should communicate that GSF builds advanced AI, robotics, IoT, web, mobile, and backend systems, with the brand emphasis on deep technology rather than a generic software house.

## Audience

Primary audience: business owners, founders, industrial teams, and organizations looking for a team that can turn complex technical ideas into working products.

Secondary audience: technical partners who care about AI, robotics, computer vision, IoT, cloud, and production-grade software delivery.

## Visual Direction

The design direction is "Deep Tech Studio for Intelligent Systems."

The site should feel like an award-level technology studio: cinematic, precise, technical, and polished. It should not feel like a simple SaaS template or a card-heavy agency page.

The existing dark/cyber foundation remains, but the layout will be refined with:

- A stronger first viewport with a clear deep tech headline.
- A moving 3D or technical graphic centerpiece that responds to mouse movement, scroll, or time.
- Layered WebGL/particle ambience behind the hero.
- More disciplined typography and spacing.
- Fewer repeated generic cards.
- Stronger service grouping around AI, robotics, computer vision, IoT, and intelligent software.

## Hero

The hero keeps the current WebGL background but becomes more premium and intentional.

Primary visible brand:

`GSF Robotics & AI`

Main headline:

`Deep tech systems for AI, robotics, IoT, and intelligent software.`

Supporting copy:

`We build production-ready systems across computer vision, autonomous robotics, connected devices, web platforms, and mobile applications.`

Primary CTA:

`Discuss a Project`

Secondary CTA:

`Explore Work`

The hero should include a code-native 3D/technical visual, not a static image. The recommended object is an abstract intelligent machine core: a rotating wireframe orb or robotic sensor node with orbiting data rings, glowing node points, and subtle parallax. It should feel technical and premium, not cartoonish.

The 3D visual must remain readable on desktop and degrade gracefully on mobile. On smaller screens it may become a simplified animated technical graphic to avoid clutter and performance issues.

## Vision Section

The current "Engineering the Future" section becomes more specific to GSF's deep tech offer.

Proposed headline:

`From model to machine, from sensor to platform.`

Supporting copy should explain that GSF connects AI models, robotics control, IoT data, cloud infrastructure, and product interfaces into complete systems.

Proof points should be credible and avoid exaggerated claims unless verified. Prefer capability-based proof over fake metrics. Example proof labels:

- `AI + CV Systems`
- `Robotics + IoT`
- `Web + Mobile Platforms`

## Services Section

Services remain as a grid but with sharper hierarchy and copy.

Priority services:

- `AI & Machine Learning`
- `Computer Vision`
- `Robotics & Automation`
- `IoT Systems`
- `Web Platforms`
- `Mobile Applications`
- `Backend & Cloud`
- `Data Engineering`

The cards should look more engineered: tighter radius, subtle glass surfaces, thin technical borders, hover motion, and icons that match the cyan technical style.

## Portfolio Section

The portfolio preview should become more like case-study previews instead of simple text cards.

Suggested project examples:

- `Vision-Based Identity System`
- `IoT Monitoring Platform`
- `Robotics Control Interface`
- `AI-Assisted Business Workflow`

Each preview should include a short description and technology tags. The section should imply depth and delivery capability without claiming unavailable client details.

## Contact CTA

The homepage must render a contact CTA section because current navigation and hero links point to `#contact`.

Proposed headline:

`Have a complex system to build?`

Supporting copy:

`Tell us what you want to automate, connect, detect, or launch.`

CTA:

`Start the Conversation`

## Motion and Interaction

Motion should support the deep tech feel:

- Hero 3D object rotates slowly and reacts to pointer movement.
- Scroll reveals are smooth but not excessive.
- Service cards can tilt or reveal a technical glow on hover.
- Portfolio previews can show subtle line/grid movement or scan effects.
- Respect `prefers-reduced-motion` where practical.

Avoid random animation that does not reinforce the product story.

## Implementation Constraints

Use the existing Next.js app, Tailwind setup, and component structure.

Use existing dependencies where possible:

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `gsap`
- `framer-motion`
- `lucide-react`

Do not add new packages unless a concrete blocker appears.

Preserve user or existing uncommitted edits unless they are directly part of the landing page change.

## Testing and Verification

After implementation:

- Run lint or build if the project environment allows it.
- Start the dev server and verify the landing page visually.
- Check desktop and mobile layouts.
- Confirm hero CTAs point to valid sections.
- Confirm the 3D/animated visual renders and does not obscure text.
- Confirm no horizontal overflow or broken snap-section behavior.

## Out of Scope

- Real client case studies unless supplied by the user.
- New CMS, backend, or contact form integration.
- Logo redesign.
- Large dependency changes.
