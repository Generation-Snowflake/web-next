"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

// Routes that render full-bleed as their own standalone experience, without the
// main-site Navbar/Footer (and without the GSF intro Preloader).
const BARE_ROUTES = ["/demo3d", "/demoCatalog"];

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );

  if (bare) {
    return (
      <MotionConfig reducedMotion="user">
        <main className="relative z-10">{children}</main>
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-ice focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-darkbg focus:shadow-glow focus:outline-none"
      >
        Skip to content
      </a>
      <Preloader />
      <Navbar />
      <main id="main-content" className="relative z-10">
        {children}
      </main>
      <Footer />
    </MotionConfig>
  );
}
