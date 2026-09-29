"use client";

import { useEffect, useRef } from "react";
import { setRobotStage } from "@/components/robot-companion/store";

/**
 * Empty slot where the site-wide robot companion stands while the hero is on
 * screen (components/robot-companion). It draws nothing itself: the one
 * robot canvas lives in the site shell and reads this element's rect.
 */
export default function HeroRobotStage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setRobotStage(el);
    return () => setRobotStage(null, el);
  }, []);
  return <div ref={ref} aria-hidden="true" data-robot-stage="" className="h-full w-full" />;
}
