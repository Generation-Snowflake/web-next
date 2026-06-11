"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WebGLBackground from "./WebGLBackground";
import DeepTechCore from "./DeepTechCore";
import { prefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reduced motion: skip the reveal + scrub, leave content in its final state.
    if (prefersReducedMotion()) {
      gsap.set(contentRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.to(contentRef.current, {
        y: -42,
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
          scrub: true,
        },
      });
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <WebGLBackground />
      <DeepTechCore />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_45%,rgba(0,212,255,0.22),transparent_31%),linear-gradient(90deg,rgba(5,10,20,0.98)_0%,rgba(5,10,20,0.78)_42%,rgba(5,10,20,0.22)_72%,rgba(5,10,20,0.82)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-darkbg to-transparent" />
      <div className="absolute right-[8vw] top-28 hidden h-[58vh] w-px bg-gradient-to-b from-transparent via-ice/35 to-transparent lg:block" />
      <div className="absolute right-[5vw] top-[22vh] hidden h-32 w-32 rounded-full border border-ice/15 lg:block" />

      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center px-6 pt-20">
        <div ref={contentRef} className="max-w-3xl text-left">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-ice/80">
            GSF Robotics & AI
          </p>
          <h1 className="text-4xl font-bold leading-[0.96] tracking-tight text-softwhite md:text-6xl lg:text-7xl">
            Deep tech systems for AI, robotics, IoT, and intelligent software.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 md:text-xl">
            We build production-ready systems across computer vision,
            autonomous robotics, connected devices, web platforms, and mobile
            applications.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-ice px-7 py-3 text-sm font-semibold text-darkbg shadow-glow transition duration-300 hover:-translate-y-0.5 hover:bg-ice-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-light focus-visible:ring-offset-2 focus-visible:ring-offset-darkbg"
            >
              Request a demo
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-ice hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice focus-visible:ring-offset-2 focus-visible:ring-offset-darkbg"
            >
              Explore work
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
