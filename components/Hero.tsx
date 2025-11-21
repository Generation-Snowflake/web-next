"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-ice/5 via-transparent to-transparent blur-3xl opacity-20" />

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold text-softwhite"
      >
        GSF Robotics & AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="mt-6 text-lg md:text-xl text-softwhite/70 max-w-2xl"
      >
        We build intelligent software solutions — Robotics, AI, IoT, Mobile,
        Web, Cloud & Data.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 text-softwhite/50"
      >
        <p className="text-sm">Scroll to explore</p>
      </motion.div>
    </section>
  );
}
