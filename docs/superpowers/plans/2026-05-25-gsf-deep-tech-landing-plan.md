# GSF Deep Tech Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the current GSF Robotics & AI landing page into a premium deep tech studio site with stronger copy, refined section design, and a moving 3D technical hero visual.

**Architecture:** Keep the existing Next.js app and landing component structure. Add a focused hero 3D component, refresh section components in place, and wire a contact CTA into the homepage so existing anchors work.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, GSAP, Framer Motion, Three.js, @react-three/fiber, @react-three/drei, lucide-react.

---

## File Structure

- Create `components/DeepTechCore.tsx`: code-native 3D hero centerpiece using React Three Fiber. It owns only the visual object and pointer-reactive animation.
- Modify `components/ParallaxHero.tsx`: update hero copy, layout, CTA labels, and mount `DeepTechCore`.
- Modify `components/VisionSection.tsx`: rewrite positioning and proof blocks for deep tech delivery.
- Modify `components/Services.tsx`: refine service copy and card visual treatment.
- Modify `components/PortfolioPreview.tsx`: replace simple cards with case-study previews and technology tags.
- Modify `components/Contact.tsx`: update landing CTA copy and anchor support.
- Modify `app/page.tsx`: render the contact CTA section after portfolio.
- Modify `app/globals.css`: add small reusable visual utilities only if needed for scanlines or reduced-motion behavior.

## Task 1: Baseline Verification

**Files:**
- Read: `app/page.tsx`
- Read: `components/ParallaxHero.tsx`
- Read: `components/WebGLBackground.tsx`

- [ ] **Step 1: Confirm working tree before implementation**

Run:

```bash
git status --short
```

Expected: existing user changes may appear in `components/MagneticText.tsx`, `package.json`, and `package-lock.json`. Do not revert them.

- [ ] **Step 2: Run static check before edits**

Run:

```bash
pnpm lint
```

Expected: either PASS or a clear pre-existing lint failure. Record the result before editing.

## Task 2: Add Hero 3D Core

**Files:**
- Create: `components/DeepTechCore.tsx`

- [ ] **Step 1: Create the 3D component**

Implement a client component with:

- `Canvas` using alpha background and bounded DPR.
- A central wireframe sphere or machine core.
- Orbiting rings and node points.
- `useFrame` animation for rotation and pointer-reactive tilt.
- `prefers-reduced-motion` fallback that slows or disables intensive motion.

The component should export `DeepTechCore` as default.

- [ ] **Step 2: Verify TypeScript imports**

Run:

```bash
pnpm lint
```

Expected: no missing imports or JSX type errors from the new component.

## Task 3: Refresh Hero

**Files:**
- Modify: `components/ParallaxHero.tsx`

- [ ] **Step 1: Update hero content and layout**

Change the visible copy to:

- Brand: `GSF Robotics & AI`
- Headline: `Deep tech systems for AI, robotics, IoT, and intelligent software.`
- Supporting copy: `We build production-ready systems across computer vision, autonomous robotics, connected devices, web platforms, and mobile applications.`
- Primary CTA: `Discuss a Project`
- Secondary CTA: `Explore Work`

Mount `DeepTechCore` as the hero visual. Keep `WebGLBackground` as ambient background.

- [ ] **Step 2: Keep anchors valid**

Set CTA hrefs:

```tsx
href="#contact"
href="#portfolio"
```

- [ ] **Step 3: Check responsive behavior**

Ensure the hero works as a stacked layout on mobile and a balanced text/visual layout on desktop.

## Task 4: Refresh Vision Section

**Files:**
- Modify: `components/VisionSection.tsx`

- [ ] **Step 1: Update headline and copy**

Use:

```text
From model to machine, from sensor to platform.
```

Explain that GSF connects AI models, robotics control, IoT data, cloud infrastructure, and product interfaces into complete systems.

- [ ] **Step 2: Replace unverifiable metrics**

Use capability proof blocks:

```text
AI + CV Systems
Robotics + IoT
Web + Mobile Platforms
```

Avoid unverifiable numbers like `50+`, `99%`, or `24/7` unless supplied by the user.

## Task 5: Refresh Services

**Files:**
- Modify: `components/Services.tsx`

- [ ] **Step 1: Keep the eight service categories**

Use:

```text
AI & Machine Learning
Computer Vision
Robotics & Automation
IoT Systems
Web Platforms
Mobile Applications
Backend & Cloud
Data Engineering
```

- [ ] **Step 2: Update copy**

Make each card sound like production delivery, not generic capability listing.

- [ ] **Step 3: Refine visual style**

Use tighter card radius, thin technical borders, subtle background gradients, hover glow, and consistent lucide icons.

## Task 6: Refresh Portfolio Preview

**Files:**
- Modify: `components/PortfolioPreview.tsx`

- [ ] **Step 1: Replace two simple cards with four case-study previews**

Use:

```text
Vision-Based Identity System
IoT Monitoring Platform
Robotics Control Interface
AI-Assisted Business Workflow
```

- [ ] **Step 2: Add technology tags**

Use concise tags such as:

```text
Computer Vision
Edge AI
IoT
Realtime Dashboard
Robot UI
Automation
AI Workflow
Web Platform
```

## Task 7: Add Contact CTA to Landing Page

**Files:**
- Modify: `components/Contact.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Update contact CTA copy**

Use:

```text
Have a complex system to build?
Tell us what you want to automate, connect, detect, or launch.
Start the Conversation
```

- [ ] **Step 2: Render contact section on homepage**

Import `ContactSection` in `app/page.tsx` and render:

```tsx
<section id="contact" className="snap-section h-screen">
  <ContactSection />
</section>
```

## Task 8: Final Verification

**Files:**
- Verify all modified files.

- [ ] **Step 1: Run lint**

Run:

```bash
pnpm lint
```

Expected: PASS, or document unrelated pre-existing failures.

- [ ] **Step 2: Run build**

Run:

```bash
pnpm build
```

Expected: PASS.

- [ ] **Step 3: Start dev server**

Run:

```bash
pnpm dev
```

Expected: Next dev server starts and provides a local URL.

- [ ] **Step 4: Visual QA**

Open the homepage and verify:

- Hero 3D visual renders and moves.
- Hero text is readable and not obscured.
- CTAs point to valid sections.
- Services and portfolio sections fit within snap sections.
- Mobile layout has no horizontal overflow.
- Motion is polished and not distracting.

- [ ] **Step 5: Commit implementation**

Run:

```bash
git add app/page.tsx components/DeepTechCore.tsx components/ParallaxHero.tsx components/VisionSection.tsx components/Services.tsx components/PortfolioPreview.tsx components/Contact.tsx app/globals.css
git commit -m "feat: refresh deep tech landing page"
```
