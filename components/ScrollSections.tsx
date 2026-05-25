"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  useEffect(() => {
    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const sections = gsap.utils.toArray<HTMLElement>(".snap-section");

      const animation = gsap.to(sections, {
        yPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".sections-wrapper",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + window.innerHeight * (sections.length - 1),
        },
      });

      return () => {
        animation.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    return () => media.revert();
  }, []);

  return null;
}
