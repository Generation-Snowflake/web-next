"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ParticleNetwork from "./ParticleNetwork";
import { prefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    label: "AI + CV Systems",
    detail: "Models, detection pipelines, and production interfaces for visual intelligence.",
  },
  {
    label: "Robotics + IoT",
    detail: "Connected machines, sensors, control layers, and monitoring dashboards.",
  },
  {
    label: "Web + Mobile Platforms",
    detail: "Operational software that makes advanced systems usable by real teams.",
  },
];

export default function VisionSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Reduced motion: skip the scroll-triggered reveal, show the final state.
    if (prefersReducedMotion()) {
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden px-6 py-20"
    >
      <div className="absolute left-1/2 top-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-900/20 opacity-50 blur-3xl" />
      <ParticleNetwork />

      <div className="z-10 mx-auto max-w-6xl">
        <div ref={textRef} className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-softwhite md:text-6xl lg:text-7xl">
              From model to machine,
              <span className="mt-3 block text-3xl font-medium text-gray-400 md:text-5xl">
                from sensor to platform.
              </span>
            </h2>
          </div>

          <div className="space-y-8">
            <p className="text-lg leading-8 text-gray-300 md:text-xl">
              GSF connects AI models, robotics control, IoT data, cloud
              infrastructure, and product interfaces into complete systems that
              can be tested, shipped, and operated.
            </p>

            <div className="grid gap-4">
              {capabilities.map((capability) => (
                <div
                  key={capability.label}
                  className="group rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4 transition duration-300 hover:border-ice/50 hover:bg-white/[0.06]"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-ice">
                    {capability.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400 group-hover:text-gray-300">
                    {capability.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
