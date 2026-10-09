"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { usePathname } from "next/navigation";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { localizeHref, stripLang, type Lang } from "@/lib/i18n";
import { getMainNav, getPrimaryCta, getSite } from "@/lib/site";

const MENU_ID = "mobile-navigation";

function isActive(pathname: string, href: string) {
  const path = stripLang(pathname).path;
  return path === href || path.startsWith(`${href}/`);
}

const ui = {
  en: { menu: "Menu", close: "Close", phone: "Phone", email: "Email", hours: "Hours", main: "Main", switchTo: "อ่านเป็นภาษาไทย" },
  th: { menu: "เมนู", close: "ปิด", phone: "โทรศัพท์", email: "อีเมล", hours: "เวลาทำการ", main: "เมนูหลัก", switchTo: "Read in English" },
} satisfies Record<Lang, Record<string, string>>;

/** TH | EN switch. A plain link (full load) so the page's lang attribute,
 *  fonts and metadata all change with it. */
function LangSwitch({ lang, pathname, className = "" }: { lang: Lang; pathname: string; className?: string }) {
  const path = stripLang(pathname).path;
  return (
    <div role="group" aria-label={lang === "th" ? "ภาษา" : "Language"} className={`inline-flex h-9 items-center rounded-lg border border-hairline-strong bg-card p-0.5 text-[13px] font-semibold shadow-xs ${className}`}>
      {(["th", "en"] as const).map((l) => {
        const current = l === lang;
        return (
          <a
            key={l}
            href={localizeHref(path, l)}
            hrefLang={l}
            lang={l}
            data-robot-skip=""
            aria-current={current ? "true" : undefined}
            aria-label={current ? undefined : ui[lang].switchTo}
            className={`flex h-full items-center rounded-md px-2.5 transition-colors duration-200 ${
              current ? "bg-ink text-white" : "text-ink-600 hover:bg-cyan-50 hover:text-ink"
            }`}
          >
            {l.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
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

export default function Navbar({ lang }: { lang: Lang }) {
  const mainNav = getMainNav(lang);
  const primaryCta = getPrimaryCta(lang);
  const site = getSite(lang);
  const t = ui[lang];
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

  // Transparent at the top of the page; once scrolled (or with the menu
  // open) it turns translucent white with a blur and a hairline rule.
  const solid = scrolled || open;

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
    <div ref={rootRef}>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
          solid
            ? "border-hairline bg-paper/80 shadow-nav backdrop-blur-md backdrop-saturate-150 supports-[not(backdrop-filter:blur(0))]:bg-paper"
            : "border-transparent bg-paper/0"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" onClick={close} className="flex shrink-0 items-center gap-2.5 rounded-md">
            <Image
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
            {/* CI lockup: "GSF" bold, "Robotics and AI" regular. */}
            <span className="text-[17px] tracking-[0.02em] text-ink">
              <span className="font-bold">GSF</span> <span className="font-normal">Robotics and AI</span>
            </span>
          </Link>

          <nav aria-label={t.main} className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative rounded-md px-3 py-1.5 text-[15px] font-medium transition-colors duration-200 after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-cyan-500 after:transition-transform after:duration-200 ${
                        active
                          ? "text-ink after:scale-x-100"
                          : "text-ink-600 after:scale-x-0 hover:bg-mist-200/70 hover:text-ink"
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
            <LangSwitch lang={lang} pathname={pathname} className="hidden sm:inline-flex" />
            <Link
              href={primaryCta.href}
              aria-current={ctaActive ? "page" : undefined}
              className="hidden h-9 items-center rounded-lg btn-primary px-4 text-[14px] transition-colors duration-200 sm:inline-flex"
            >
              {primaryCta.label}
            </Link>

            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              aria-expanded={open}
              aria-controls={MENU_ID}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-hairline-strong bg-card px-3 text-[14px] font-medium text-ink shadow-xs transition-colors duration-200 hover:bg-cyan-50 lg:hidden"
            >
              {open ? <X aria-hidden className="h-4 w-4" /> : <List aria-hidden className="h-4 w-4" />}
              {open ? t.close : t.menu}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile panel: white, a list of pages, then the ways to reach us. */}
      <div
        id={MENU_ID}
        ref={panelRef}
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-paper lg:hidden ${
          open ? "visible" : "invisible"
        }`}
      >
        <div className="mx-auto flex min-h-full w-full max-w-page flex-col px-5 pb-10 pt-6 sm:px-8">
          <nav aria-label={t.main}>
            <ul className="divide-y divide-hairline">
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
                        className={`text-2xl font-semibold tracking-heading ${active ? "text-cyan-700" : "text-ink"}`}
                      >
                        {item.label}
                      </span>
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
            className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg btn-primary px-5 text-base"
          >
            {primaryCta.label}
            <ArrowRight aria-hidden weight="bold" className="h-4 w-4" />
          </Link>

          <LangSwitch lang={lang} pathname={pathname} className="mt-6 self-start sm:hidden" />

          <dl className="mt-8 grid gap-3 text-[15px]">
            <div className="rounded-lg border border-hairline bg-card p-4">
              <dt className="caption">{t.phone}</dt>
              <dd className="mt-1 space-y-1">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block font-medium text-ink hover:text-cyan-700">
                    {p.display}
                  </a>
                ))}
              </dd>
            </div>
            <div className="rounded-lg border border-hairline bg-card p-4">
              <dt className="caption">{t.email}</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="break-all text-ink hover:text-cyan-700">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="rounded-lg border border-hairline bg-card p-4">
              <dt className="caption">{t.hours}</dt>
              <dd className="mt-1 text-graphite">{site.hours}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
