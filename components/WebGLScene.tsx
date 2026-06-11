"use client";

import { Component, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Resilience wrapper for React Three Fiber <Canvas> scenes.
 *
 * Two failure modes are covered:
 *  1. No WebGL at all (locked-down browsers, headless renderers, GPU blocklists)
 *     -> detected up front so the canvas never mounts and never logs a context
 *        error. The static `fallback` poster shows instead.
 *  2. A runtime error inside the scene (THREE throw, context loss surfaced as a
 *     React error) -> caught by the boundary so one broken canvas can't blank the
 *     whole hero.
 *
 * The server snapshot is `false`, so these decorative background layers render a
 * static poster on the server and during hydration, then upgrade to the live
 * canvas on capable clients with no hydration mismatch.
 */

let cachedSupport: boolean | null = null;

function detectWebGL(): boolean {
  if (cachedSupport !== null) return cachedSupport;
  try {
    const canvas = document.createElement("canvas");
    cachedSupport = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

const subscribe = () => () => {};

class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[WebGLScene] canvas scene failed, showing fallback", error);
    }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function WebGLScene({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const supported = useSyncExternalStore(
    subscribe,
    detectWebGL, // client snapshot
    () => false // server snapshot: render the poster, never the canvas
  );
  const reducedMotion = usePrefersReducedMotion();

  // No WebGL, or the user prefers reduced motion: show the static poster instead
  // of the continuously-animating scene.
  if (!supported || reducedMotion) {
    return <>{fallback}</>;
  }

  return <CanvasErrorBoundary fallback={fallback}>{children}</CanvasErrorBoundary>;
}
