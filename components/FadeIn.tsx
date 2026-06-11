"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export default function FadeIn({ children, delay = 0 }: Props) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  // Reduced motion: render content immediately visible, no reveal, no transform.
  if (reducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
