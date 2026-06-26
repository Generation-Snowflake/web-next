"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Routes that render full-bleed without the site Navbar/Footer.
const BARE_ROUTES = ["/demo3d", "/power-plant"];

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/"),
  );

  if (bare) {
    return <main className="relative z-10">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
