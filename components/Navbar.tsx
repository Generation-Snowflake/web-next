"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNav, primaryCta, site } from "@/lib/site";

const MENU_ID = "mobile-navigation";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Scroll position as an external store, so the navbar reads it without
// setting state inside an effect (and renders "at the top" on the server).
function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > 8;
const getServerScrolled = () => false;

/**
 * Renders its children everywhere except on the given routes. Used by the
 * (server) Chrome component to drop the navbar/footer on full-bleed routes.
 */
export function HideOnRoutes({
  routes,
  children,
}: {
  routes: readonly string[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hidden = routes.some((r) => pathname === r || pathname.startsWith(`${r}/`));
  return hidden ? null : <>{children}</>;
}

export default function Navbar() {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so any route change
  // closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpenOn(null), []);

  // Over the dark home hero the bar is transparent and uses the night
  // palette; everywhere else (and once scrolled) it is paper with an ink rule.
  const night = pathname === "/" && !scrolled && !open;

  // While the mobile menu is open: lock page scroll, move focus into the
  // panel, close on Escape and keep Tab inside the navbar + panel.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpenOn(null);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !rootRef.current) return;
      const focusables = Array.from(
        rootRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !rootRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !rootRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    // Close if the viewport grows past the mobile breakpoint.
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpenOn(null);

    document.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const ctaActive = isActive(pathname, primaryCta.href);

  return (
    <div ref={rootRef} className={night ? "night" : undefined}>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-150 ${
          night ? "border-transparent bg-transparent" : "border-ink bg-paper"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" onClick={close} className="flex shrink-0 items-center gap-2.5 rounded-sm">
            <Image
              src={night ? "/logo-night.png" : "/logo-ink.png"}
              alt=""
              width={32}
              height={32}
              priority
              className="h-8 w-8 object-contain"
            />
            <span
              className={`text-[17px] font-medium tracking-[-0.015em] ${night ? "text-night-text" : "text-ink"}`}
            >
              GSF <span className={night ? "text-night-muted" : "text-graphite"}>Robotics &amp; AI</span>
            </span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-sm py-1 text-[15px] transition-colors duration-150 ${
                        active
                          ? `underline decoration-2 underline-offset-[7px] ${
                              night ? "text-night-text decoration-teal" : "text-ink decoration-teal-ink"
                            }`
                          : night
                            ? "text-night-muted hover:text-night-text"
                            : "text-graphite hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={primaryCta.href}
              aria-current={ctaActive ? "page" : undefined}
              className={`hidden rounded-sm px-3.5 py-2 text-[14px] font-medium transition-colors duration-150 sm:inline-flex ${
                night ? "bg-night-text text-night hover:bg-white" : "bg-ink text-paper hover:bg-black"
              }`}
            >
              {primaryCta.label}
            </Link>

            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              aria-expanded={open}
              aria-controls={MENU_ID}
              className={`inline-flex h-10 items-center gap-2 rounded-sm border px-3 text-[14px] transition-colors duration-150 lg:hidden ${
                night
                  ? "border-night-muted text-night-text hover:border-night-text"
                  : "border-ink text-ink hover:bg-ink hover:text-paper"
              }`}
            >
              {open ? <X aria-hidden className="h-4 w-4" /> : <Menu aria-hidden className="h-4 w-4" />}
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel: paper, a ruled list of pages, then the ways to reach us. */}
      <div
        id={MENU_ID}
        ref={panelRef}
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-paper lg:hidden ${
          open ? "visible" : "invisible"
        }`}
      >
        <div className="mx-auto flex min-h-full w-full max-w-page flex-col px-5 pb-10 pt-6 sm:px-8">
          <nav aria-label="Main">
            <ul className="divide-y divide-hairline border-y border-ink">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline justify-between gap-4 py-4"
                    >
                      <span
                        className={`text-2xl font-medium tracking-[-0.015em] ${
                          active ? "text-ink underline decoration-teal-ink decoration-2 underline-offset-[6px]" : "text-ink"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.labelTh && (
                        <span lang="th" className="text-[15px] text-graphite">
                          {item.labelTh}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href={primaryCta.href}
            onClick={close}
            aria-current={ctaActive ? "page" : undefined}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-5 py-3 text-base font-medium text-paper hover:bg-black"
          >
            {primaryCta.label}
            <span aria-hidden>→</span>
          </Link>

          <dl className="mt-10 grid gap-y-4 text-[15px]">
            <div className="border-t border-hairline pt-3">
              <dt className="caption">Phone</dt>
              <dd className="mt-1 space-y-1">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block font-mono text-ink hover:text-teal-ink">
                    {p.display}
                  </a>
                ))}
              </dd>
            </div>
            <div className="border-t border-hairline pt-3">
              <dt className="caption">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="break-all text-ink hover:text-teal-ink">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="border-t border-hairline pt-3">
              <dt className="caption">Hours</dt>
              <dd className="mt-1 text-graphite">{site.hours}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
