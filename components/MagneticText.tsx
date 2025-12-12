"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-x-[0.05em] ${className}`}>
      {text.split(" ").map((word, i) => (
        <div key={i} className="flex whitespace-nowrap">
          {word.split("").map((char, j) => (
            <MagneticChar key={j}>{char}</MagneticChar>
          ))}
          {/* Add space after word unless it's the last one */}
          {i < text.split(" ").length - 1 && (
            <span className="w-[0.25em]"> </span>
          )}
        </div>
      ))}
    </div>
  );
}

function MagneticChar({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Magnetic radius
    if (distance < 100) {
      const strength = 1 - distance / 100;
      setPosition({
        x: distanceX * strength * 0.5,
        y: distanceY * strength * 0.5,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block cursor-default lg:hover:text-teal-400 transition-colors duration-200"
    >
      {children}
    </motion.span>
  );
}
