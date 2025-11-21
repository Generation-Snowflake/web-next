"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSection() {
  useEffect(() => {
    const sections: HTMLElement[] = gsap.utils.toArray(
      ".hori-item"
    ) as HTMLElement[];
    const wrapper = document.querySelector(
      ".horizontal-wrapper"
    ) as HTMLElement;

    if (!wrapper || !sections.length) return;

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-wrapper",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + wrapper.offsetWidth,
      },
    });
  }, []);

  return null;
}
