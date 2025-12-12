"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WebGLBackground from "./WebGLBackground";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxHero() {
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
    // Background animations removed for WebGL replacement


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
      {/* WEBGL BACKGROUND */}
      <WebGLBackground />


      {/* TITLE */}
      <h1
        ref={textRef}
        className="absolute text-5xl md:text-7xl font-bold text-softwhite top-[28%] left-1/2 -translate-x-1/2 opacity-90 z-30 text-center w-full px-4"
      >
        GSF Robotics & AI
      </h1>

      {/* SUBTEXT */}
      <p
        ref={subTextRef}
        className="absolute text-lg md:text-2xl text-gray-300 top-[38%] left-1/2 -translate-x-1/2 opacity-90 z-30 text-center w-full px-4 max-w-4xl"
      >
        รับทำหุ่นยนต์ พัฒนา AI ระบบ IoT และ Software House ครบวงจร
        <br />
        <span className="text-base md:text-lg text-gray-400 mt-2 block">
          Building modern solutions in Robotics, AI, IoT & Software Engineering
        </span>
      </p>

      {/* CTA BUTTONS */}
      <div
        ref={ctaRef}
        className="absolute flex gap-4 top-[55%] left-1/2 -translate-x-1/2 opacity-90 z-30"
      >
        <a
          href="#contact"
          className="px-8 py-3 rounded-full bg-teal-600/80 text-white font-medium hover:bg-teal-500 transition backdrop-blur-md shadow-lg hover:scale-105 transform duration-200"
        >
          ขอใบเสนอราคา
        </a>

        <a
          href="#portfolio"
          className="px-8 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition backdrop-blur-md shadow-lg hover:scale-105 transform duration-200"
        >
          ดูผลงานของเรา
        </a>
      </div>
    </div>
  );
}
