"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // ความเร็วพื้นฐาน
      smoothWheel: true, // ทำให้ scroll ลื่น
      syncTouch: false, // ปิดเพราะ mobile จะหน่วง ถ้าเปิด
      touchInertiaMultiplier: 1, // ความลื่นของ touch
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // cubic-bezier แบบหรู ๆ
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return null;
}
