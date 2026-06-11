"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { prefersReducedMotion } from "./usePrefersReducedMotion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Short, escapable intro. Reduced motion gets the shortest path; everyone
    // can dismiss on first interaction instead of waiting out a fixed timer.
    const duration = prefersReducedMotion() ? 400 : 900;

    const dismiss = () => {
      setIsLoading(false);
      document.body.style.overflow = ""; // restore the class-based overflow-x guard
    };

    const timer = setTimeout(dismiss, duration);

    const opts = { passive: true, once: true } as const;
    const events = ["scroll", "wheel", "pointerdown", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, dismiss, opts));

    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      events.forEach((e) => window.removeEventListener(e, dismiss));
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#050A14]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.16),transparent_34%),linear-gradient(120deg,rgba(0,212,255,0.06),transparent_42%,rgba(45,212,191,0.08))]" />

          <motion.div
            initial={{ scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.75, ease: "backOut" }}
            className="relative flex h-36 w-36 items-center justify-center md:h-48 md:w-48"
            role="status"
            aria-label="Loading GSF Robotics & AI"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-transparent border-t-ice border-r-ice/30 shadow-[0_0_48px_rgba(0,212,255,0.28)]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-5 rounded-full border border-transparent border-b-teal-300 border-l-teal-300/30"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 rounded-full border border-dashed border-ice/30"
            />
            <motion.div
              animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.72, 1, 0.72] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-8 w-8 rounded-full bg-ice shadow-[0_0_36px_rgba(0,212,255,0.82)]"
            />
            <div className="absolute h-px w-56 bg-gradient-to-r from-transparent via-ice/45 to-transparent" />
            <div className="absolute h-56 w-px bg-gradient-to-b from-transparent via-teal-300/35 to-transparent" />
          </motion.div>

          <div className="relative mt-8 flex flex-col items-center gap-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 220 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-px rounded-full bg-gradient-to-r from-transparent via-ice to-transparent"
            />
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-mono text-xs uppercase tracking-[0.28em] text-teal-300/70"
            >
              Bringing the core online
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
