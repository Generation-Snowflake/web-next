"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";
import { CAMERA_FOV, CAMERA_Z } from "@/components/hero/robot/config";
import { setRobotCursor, useRobotInput, type RobotCommand } from "@/components/hero/robot/input";
import RobotScene from "@/components/hero/robot/RobotScene";
import { installClickThrough } from "./clickThrough";
import { CompanionMotion } from "./motion";
import { companionStore, measureStage, onStageChange } from "./store";

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
  return cores <= 4 || memory <= 4 || window.innerWidth < 768 ? "low" : "high";
}

/** Marks the scene live once frames actually render. */
function ReadyFlag() {
  useFrame(() => {
    companionStore.ready = true;
  });
  return null;
}

/**
 * The site-wide robot companion: ONE fixed, full-viewport, transparent,
 * pointer-events:none canvas, mounted once in the site shell so it survives
 * route changes.
 *
 * - Home page, at the top: the robot stands in the hero's stage slot
 *   (components/home/HeroRobotStage registers it).
 * - Scrolling past the hero: it shrinks and flies to a dock in the bottom-right
 *   corner, then trails the scroll with a little lag and lean. Other pages
 *   start docked.
 * - Pointer clicks on links/buttons: it flies over, pokes the element, then
 *   the original action runs (see clickThrough.ts).
 * - Follows the cursor, waves when hovered, reacts to taps on it, and listens
 *   for `gsf:robot` CustomEvents (`{ detail: { action: "wave" | "excited" |
 *   "calm" | "happy" } }`).
 */
export default function RobotCompanion() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const input = useRobotInput(wrapRef);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pageVisible = usePageVisible();
  const [quality, setQuality] = useState<Quality>(detectQuality);
  const [motion] = useState(() => new CompanionMotion());

  // Hero stage rect + scroll "kick" for the follow lag.
  useEffect(() => {
    let lastY = window.scrollY;
    let ro: ResizeObserver | null = null;
    const observe = () => {
      ro?.disconnect();
      ro = null;
      const el = companionStore.stage;
      if (el) {
        ro = new ResizeObserver(measureStage);
        ro.observe(el);
      }
      measureStage();
    };
    const onScroll = () => {
      const y = window.scrollY;
      // Big jumps (route change, jump links) are not a scroll to chase.
      if (Math.abs(y - lastY) < 400) motion.kick(y - lastY);
      lastY = y;
      measureStage();
    };
    const onResize = () => {
      lastY = window.scrollY;
      measureStage();
    };
    observe();
    const off = onStageChange(() => {
      // Route change: the new page starts at its own scroll position; don't
      // count that jump as a scroll the robot should chase.
      lastY = window.scrollY;
      observe();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      off();
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [motion]);

  // Step out of the way while a disclosure menu (the mobile nav panel) is
  // open: the canvas sits above the navbar so the robot can press nav links.
  const [ducked, setDucked] = useState(false);
  useEffect(() => {
    const check = () => setDucked(document.querySelector('[aria-controls][aria-expanded="true"]') !== null);
    const mo = new MutationObserver(check);
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["aria-expanded"] });
    return () => mo.disconnect();
  }, []);

  // Click → robot presses it.
  useEffect(() => {
    const cue = (action: RobotCommand) => {
      const cmds = input.current.commands;
      cmds.push(action);
      if (cmds.length > 8) cmds.shift();
    };
    return installClickThrough({ motion, isReady: () => companionStore.ready && !document.hidden, cue });
  }, [motion, input]);

  // Hidden tab: frames stop, so run any press that is mid-flight right away.
  useEffect(() => {
    if (pageVisible) return;
    companionStore.ready = false;
    motion.flush();
    if (input.current) setRobotCursor(input.current, false);
  }, [pageVisible, motion, input]);

  useEffect(
    () => () => {
      companionStore.ready = false;
    },
    [],
  );

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[60] select-none transition-opacity duration-150 ${
        ducked ? "opacity-0" : "opacity-100"
      }`}
    >
      <Canvas
        frameloop={pageVisible ? "always" : "never"}
        shadows="percentage"
        dpr={quality === "high" ? [1, 1.5] : [1, 1.25]}
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
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          const canvas = gl.domElement;
          canvas.addEventListener("webglcontextlost", () => {
            companionStore.ready = false;
            motion.flush();
          });
        }}
        fallback={null}
      >
        <PerformanceMonitor flipflops={2} onDecline={() => setQuality("low")} />
        <ReadyFlag />
        <RobotScene input={input} reducedMotion={reducedMotion} motion={motion} />
      </Canvas>
    </div>
  );
}
