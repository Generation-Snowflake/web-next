"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxHero() {
  const gridRef = useRef(null);
  const dustRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const ctaRef = useRef(null);

  // floating animation refs
  const floatingTargets = [textRef, subTextRef, ctaRef];

  useEffect(() => {
    ScrollTrigger.refresh();

    // ------------------------------------------
    // PARALLAX ON SCROLL
    // ------------------------------------------
    gsap.to(gridRef.current, {
      y: -200,
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top top",
        scrub: true,
      },
    });

    gsap.to(dustRef.current, {
      y: -350,
      opacity: 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: dustRef.current,
        start: "top top",
        scrub: true,
      },
    });

    gsap.to(textRef.current, {
      y: -120,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 95%",
        scrub: true,
      },
    });

    gsap.to([subTextRef.current, ctaRef.current], {
      y: -80,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        scrub: true,
      },
    });

    // ------------------------------------------
    // FLOATING ANIMATION (loop)
    // ------------------------------------------
    floatingTargets.forEach((ref, i) => {
      gsap.to(ref.current, {
        y: "+=10",
        duration: 1 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // ------------------------------------------
    // MOUSE PARALLAX
    // ------------------------------------------
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // tilt left/right
      const y = (e.clientY / window.innerHeight - 0.5) * 20; // tilt up/down

      gsap.to([textRef.current, subTextRef.current, ctaRef.current], {
        x: x,
        y: y,
        duration: 0.6,
        ease: "sine.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* BACKGROUND GRID */}
      <img
        ref={gridRef}
        src="/background.png"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* DUST */}
      <img
        ref={dustRef}
        src="/dust.png"
        className="absolute inset-0 w-full h-full object-cover opacity-15 z-10"
      />

      {/* TITLE */}
      <h1
        ref={textRef}
        className="absolute text-5xl font-bold text-softwhite top-[28%] left-1/2 -translate-x-1/2 opacity-90 z-30 text-center"
      >
        GSF Robotics & AI
      </h1>

      {/* SUBTEXT */}
      <p
        ref={subTextRef}
        className="absolute text-lg text-gray-300 top-[34%] left-1/2 -translate-x-1/2 opacity-90 z-30 text-center"
      >
        Building modern solutions in Robotics, AI, IoT & Software Engineering
      </p>

      {/* CTA BUTTONS */}
      <div
        ref={ctaRef}
        className="absolute flex gap-4 top-[50%] left-1/2 -translate-x-1/2 opacity-90 z-30"
      >
        <a
          href="#contact"
          className="px-6 py-3 rounded-full bg-teal-600/80 text-white font-medium hover:bg-teal-500 transition backdrop-blur-md shadow-lg"
        >
          Get a Quote
        </a>

        <a
          href="#portfolio"
          className="px-6 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition backdrop-blur-md shadow-lg"
        >
          View Portfolio
        </a>
      </div>
    </div>
  );
}
