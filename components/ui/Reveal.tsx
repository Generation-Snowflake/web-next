"use client";

import { useEffect, useRef } from "react";

/**
 * Gentle fade + 12px slide-in when the block scrolls into view.
 *
 * The server renders the content fully visible. On the client, only blocks
 * that are still below the fold get hidden (`.reveal-pending`) and then
 * revealed once. Nothing moves with prefers-reduced-motion, and if
 * IntersectionObserver is missing the content simply stays visible.
 * Styles live in app/globals.css.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Stagger in ms (keep it small: 0–240). */
  delay?: number;
  /** @deprecated ignored; the offset is fixed at 12px. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen (or above it): leave it alone, no flash.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

    el.classList.add("reveal-pending");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          el.classList.add("reveal-in");
          el.classList.remove("reveal-pending");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove("reveal-pending");
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
