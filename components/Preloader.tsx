"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (could be replaced by real asset loading)
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2500);

    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
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
          className="fixed inset-0 z-[9999] bg-[#0A0F1F] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full animate-pulse" />
            <img
              src="/logo-tech.png"
              alt="Loading"
              className="w-32 h-32 md:w-48 md:h-48 object-contain relative z-10"
            />
          </motion.div>

          {/* Loading Text */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-teal-800 via-teal-400 to-teal-800 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-teal-400/60 text-xs uppercase tracking-[0.2em] font-mono"
            >
              Initializing System...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
