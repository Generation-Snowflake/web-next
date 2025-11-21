"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-darkbg/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent backdrop-blur-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="GSF Robotics & AI Logo"
            width={42}
            height={42}
            className="drop-shadow-glow"
          />
          <span className="text-xl font-semibold tracking-wide">
            GSF Robotics & AI
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-softwhite/80">
          <Link className="hover:text-ice transition" href="/services">
            Services
          </Link>
          <Link className="hover:text-ice transition" href="/portfolio">
            Portfolio
          </Link>
          <Link className="hover:text-ice transition" href="/workflow">
            Workflow
          </Link>
          <Link className="hover:text-ice transition" href="/about">
            About
          </Link>
          <Link className="hover:text-ice transition" href="/contact">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
