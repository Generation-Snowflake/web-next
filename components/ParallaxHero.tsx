"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxHero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    gsap.to(el, {
      y: -120,
      scale: 1.15,
      scrollTrigger: {
        trigger: el,
        start: "top top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-screen relative flex items-center justify-center"
    >
      <img src="/logo.png" className="w-48 opacity-90 drop-shadow-glow" />
      <h1 className="absolute text-6xl font-bold text-softwhite">
        GSF Robotics & AI
      </h1>
    </div>
  );
}
