import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/", label: "Home", note: "Start again from the front page" },
  { href: "/services", label: "Services", note: "Software, AI and robotics work we do for clients" },
  { href: "/products", label: "Products", note: "Robot kits, research robots and software" },
  { href: "/portfolio", label: "Work", note: "The kinds of projects we build" },
  { href: "/contact", label: "Contact", note: "Phone, email and the contact form" },
];

export default function NotFound() {
  return (
    <section className="pb-20 pt-28 md:pb-28 md:pt-36">
      <Container>
        <p className="chip gap-2 shadow-xs">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          Error 404
        </p>
        <h1 className="mt-6 text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-display sm:text-[3.25rem] lg:text-[4rem]">
          This page doesn&rsquo;t exist
        </h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-graphite">
          The link may be old or the address mistyped. One of these should get you where you were going.
        </p>
        <ul className="card mt-12 max-w-3xl divide-y divide-hairline overflow-hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex flex-col gap-1 px-5 py-4 transition-colors duration-200 hover:bg-paper-2 sm:flex-row sm:items-center sm:gap-6 sm:px-6"
              >
                <span className="w-32 shrink-0 text-lg font-semibold tracking-tightish transition-colors duration-200 group-hover:text-cyan-700">{l.label}</span>
                <span className="flex-1 text-[15px] text-graphite">{l.note}</span>
                <ArrowRight aria-hidden weight="bold" className="h-4 w-4 shrink-0 text-cyan-600 hidden transition-transform duration-200 ease-out group-hover:translate-x-0.5 sm:inline" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
