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
  { href: "/products", label: "Products", note: "Makerzoid kits, SO-101 and XLeRobot" },
  { href: "/portfolio", label: "Work", note: "Case notes and 3D demos" },
  { href: "/contact", label: "Contact", note: "Phone, email and the contact form" },
];

export default function NotFound() {
  return (
    <section className="pb-20 pt-28 md:pb-28 md:pt-36">
      <Container>
        <p className="font-mono text-[13px] text-graphite">Error 404</p>
        <h1 className="mt-4 text-[2.5rem] font-medium leading-[1.08] tracking-[-0.015em] sm:text-5xl">
          This page doesn&rsquo;t exist
        </h1>
        <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-graphite">
          The link may be old or the address mistyped. One of these should get you where you were going.
        </p>
        <ul className="mt-10 max-w-3xl border-t border-ink">
          {links.map((l) => (
            <li key={l.href} className="border-b border-hairline">
              <Link
                href={l.href}
                className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="w-32 shrink-0 text-lg font-medium group-hover:text-teal-ink">{l.label}</span>
                <span className="text-[15px] text-graphite">{l.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
