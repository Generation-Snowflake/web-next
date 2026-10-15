"use client";

import { useEffect, useRef } from "react";

/**
 * Adds "inview-ready" to the element on mount and "is-inview" once it
 * scrolls into view, so CSS can hold an animation until then (see the
 * Motion section of app/globals.css). Does nothing with reduced motion or
 * without IntersectionObserver, which leaves the content in its final state.
 */
export function useInViewClass<T extends Element>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("inview-ready");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-inview");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
