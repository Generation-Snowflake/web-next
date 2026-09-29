"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CAMERA_FOV, CAMERA_Z } from "./robot/config";
import { setRobotCursor, useRobotInput } from "./robot/input";
import RobotScene from "./robot/RobotScene";

type Quality = "high" | "low";

function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

function usePageVisible() {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => !document.hidden,
    () => true,
  );
}

/** Start phones and low-power devices at a lower pixel ratio. */
function detectQuality(): Quality {
  if (typeof window === "undefined") return "high";
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  return cores <= 4 || memory <= 4 ? "low" : "high";
}

/**
 * Interactive 3D service robot for the home hero.
 *
 * Fills its parent (the hero places it `absolute inset-0` behind the copy).
 * The canvas is transparent and ignores pointer events; the robot follows the
 * cursor anywhere on the page via window listeners, waves when hovered, reacts
 * to clicks/taps on it, and listens for `gsf:robot` CustomEvents
 * (`{ detail: { action: "wave" | "excited" | "calm" } }`).
 */
export default function HeroRobot({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const input = useRobotInput(wrapRef);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pageVisible = usePageVisible();
  const [inView, setInView] = useState(true);
  const [quality, setQuality] = useState<Quality>(detectQuality);
  const active = inView && pageVisible;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "80px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Never leave a stale pointer cursor behind once rendering pauses.
  useEffect(() => {
    if (!active && input.current) setRobotCursor(input.current, false);
  }, [active, input]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full select-none ${className}`}
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        shadows="percentage"
        dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          // ACES rolls highlights off softly, so the white shells never clip.
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV, near: 0.5, far: 60 }}
        style={{ pointerEvents: "none" }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <PerformanceMonitor flipflops={2} onDecline={() => setQuality("low")} />
        <RobotScene input={input} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
