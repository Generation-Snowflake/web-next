"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSections() {
  useEffect(() => {
    const sections = gsap.utils.toArray(".snap-section");

    gsap.to(sections, {
      yPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".sections-wrapper",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () =>
          "+=" +
          ((document.querySelector(".sections-wrapper") as HTMLElement | null)
            ?.offsetHeight ?? 0),
      },
    });
  }, []);

  return null;
}
