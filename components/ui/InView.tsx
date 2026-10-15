"use client";

import { useInViewClass } from "./useInViewClass";

/** A div that starts its children's CSS animations (.fill-x, .float, .trace)
 *  when it scrolls into view. */
export default function InView({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const ref = useInViewClass<HTMLDivElement>();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
