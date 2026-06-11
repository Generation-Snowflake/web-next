"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is in (or near) the viewport, so expensive work
 * tied to it (here: R3F render loops) can pause when scrolled away.
 *
 * Starts `true` so above-the-fold scenes render immediately on load; the
 * observer flips it to `false` once the element is genuinely off screen.
 * `rootMargin` adds a buffer so the scene resumes just before it scrolls in.
 */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}
