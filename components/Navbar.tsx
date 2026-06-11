"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { prefersReducedMotion } from "./usePrefersReducedMotion";

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

  section.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  window.history.pushState(null, "", href);
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: Escape to close (returning focus to the toggle) and a simple
  // focus trap so keyboard users can't tab out of the open panel.
  useEffect(() => {
    if (!isOpen) return;

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("a, button")
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-darkbg/80 py-3 backdrop-blur-md"
          : "bg-transparent py-[22px]"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a
          href="#home"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice focus-visible:ring-offset-4 focus-visible:ring-offset-darkbg"
          onMouseEnter={() => broadcastNavigationTarget("#home")}
          onClick={(event) => {
            event.preventDefault();
            scrollToSection("#home");
          }}
        >
          <Image
            src="/logo-tech.png"
            alt="GSF Robotics logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="font-display text-xl font-bold tracking-tighter text-softwhite">
            GSF<span className="text-ice">.</span>
          </span>
        </a>

        <div className="hidden items-center md:flex">
          <div className="flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={() => broadcastNavigationTarget(link.href)}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`relative text-[11px] font-medium uppercase tracking-[0.2em] transition-colors focus-visible:text-ice focus-visible:outline-none ${
                    isActive
                      ? "text-ice"
                      : "text-gray-400 hover:text-softwhite"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-full bg-ice transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <span className="mx-6 h-4 w-px bg-white/15" />

          <a
            href="#contact"
            onMouseEnter={() => broadcastNavigationTarget("#contact")}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("#contact");
            }}
            className="text-sm font-semibold text-ice transition-colors hover:text-ice-light focus-visible:underline focus-visible:outline-none"
          >
            Request a demo
          </a>
        </div>

        <button
          ref={toggleRef}
          className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice focus-visible:ring-offset-2 focus-visible:ring-offset-darkbg md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/10 bg-darkbg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link.href);
                    setIsOpen(false);
                  }}
                  className="rounded py-1 text-xs font-medium uppercase tracking-[0.2em] text-gray-300 transition-colors hover:text-ice focus-visible:text-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice focus-visible:ring-offset-4 focus-visible:ring-offset-darkbg"
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
                className="mt-4 rounded-full bg-ice px-5 py-3 text-center text-sm font-semibold text-darkbg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-light focus-visible:ring-offset-2 focus-visible:ring-offset-darkbg"
              >
                Request a demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
