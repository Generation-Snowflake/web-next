"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

function broadcastNavigationTarget(href: string) {
  window.dispatchEvent(
    new CustomEvent("gsf:navigation-target", { detail: { target: href } })
  );
}

function scrollToSection(href: string) {
  const sectionId = href.replace("#", "") || "home";
  const section = document.getElementById(sectionId);

  broadcastNavigationTarget(href);

  if (!section) {
    return;
  }

  section.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", href);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-darkbg/80 py-4 backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a
          href="#home"
          className="flex items-center gap-2"
          onMouseEnter={() => broadcastNavigationTarget("#home")}
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("#home");
          }}
        >
          <Image
            src="/logo-tech.png"
            alt="GSF Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-display text-2xl font-bold tracking-tighter">
            GSF<span className="text-ice">.</span>
          </span>
        </a>

        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => broadcastNavigationTarget(link.href)}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(link.href);
              }}
              className="group relative text-sm font-medium text-gray-300 transition-colors hover:text-ice"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-ice transition-all group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            onMouseEnter={() => broadcastNavigationTarget("#contact")}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("#contact");
            }}
            className="rounded-full border border-ice/20 bg-ice/10 px-5 py-2 text-sm font-medium text-ice transition-all duration-300 hover:bg-ice hover:text-darkbg"
          >
            Get Started
          </a>
        </div>

        <button
          className="p-2 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/10 bg-darkbg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link.href);
                    setIsOpen(false);
                  }}
                  className="text-lg font-medium text-gray-300 transition-colors hover:text-ice"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("#contact");
                  setIsOpen(false);
                }}
                className="mt-4 rounded-lg bg-ice px-5 py-3 text-center font-bold text-darkbg"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
