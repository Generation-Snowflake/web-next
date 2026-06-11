"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * Reactive hook: re-renders when the user toggles the OS "reduce motion"
 * setting. SSR-safe (server snapshot is `false`).
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/**
 * Imperative read for event handlers and effects (GSAP setup, scroll calls)
 * where a hook can't be used.
 */
export function prefersReducedMotion() {
  return getSnapshot();
}
