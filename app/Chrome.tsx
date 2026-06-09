"use client";

import { usePathname } from "next/navigation";
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
    return <main className="relative z-10">{children}</main>;
  }

  return (
    <>
      <Preloader />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
