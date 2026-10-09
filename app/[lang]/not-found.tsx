"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "@/components/i18n/Link";
import { useLang } from "@/components/i18n/LangProvider";
import Container from "@/components/ui/Container";

// A client component: not-found pages don't receive route params, so the
// language comes from the LangProvider set up by app/[lang]/layout.tsx.
const copy = {
  en: {
    title: "This page doesn’t exist",
    lead: "The link may be old or the address mistyped. One of these should get you where you were going.",
    links: [
      { href: "/", label: "Home", note: "Start again from the front page" },
      { href: "/services", label: "Services", note: "Software, AI and robotics work we do for clients" },
      { href: "/products", label: "Products", note: "Robot kits, research robots and software" },
      { href: "/portfolio", label: "Work", note: "The kinds of projects we build" },
      { href: "/contact", label: "Contact", note: "Phone, email and the contact form" },
    ],
  },
  th: {
    title: "ไม่พบหน้านี้",
    lead: "ลิงก์อาจเก่าแล้วหรือพิมพ์ที่อยู่ผิด ลองไปที่หน้าใดหน้าหนึ่งด้านล่างนี้",
    links: [
      { href: "/", label: "หน้าแรก", note: "เริ่มใหม่จากหน้าแรก" },
      { href: "/services", label: "บริการ", note: "งานซอฟต์แวร์ AI และหุ่นยนต์ที่เราทำให้ลูกค้า" },
      { href: "/products", label: "สินค้า", note: "ชุดหุ่นยนต์ หุ่นยนต์วิจัย และซอฟต์แวร์" },
      { href: "/portfolio", label: "ผลงาน", note: "ประเภทงานที่เราสร้าง" },
      { href: "/contact", label: "ติดต่อ", note: "โทรศัพท์ อีเมล และแบบฟอร์มติดต่อ" },
    ],
  },
};

export default function NotFound() {
  const lang = useLang();
  const c = copy[lang];
  return (
    <section className="pb-20 pt-28 md:pb-28 md:pt-36">
      <title>{lang === "th" ? "ไม่พบหน้านี้ | GSF Robotics & AI" : "Page not found | GSF Robotics & AI"}</title>
      <meta name="robots" content="noindex, follow" />
      <Container>
        <p className="chip gap-2 shadow-xs">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          Error 404
        </p>
        <h1 className="mt-6 text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-display sm:text-[3.25rem] lg:text-[4rem]">
          {c.title}
        </h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-graphite">{c.lead}</p>
        <ul className="card mt-12 max-w-3xl divide-y divide-hairline overflow-hidden">
          {c.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex flex-col gap-1 px-5 py-4 transition-colors duration-200 hover:bg-paper-2 sm:flex-row sm:items-center sm:gap-6 sm:px-6"
              >
                <span className="w-32 shrink-0 text-lg font-semibold tracking-tightish transition-colors duration-200 group-hover:text-cyan-700">{l.label}</span>
                <span className="flex-1 text-[15px] text-graphite">{l.note}</span>
                <ArrowRight aria-hidden weight="bold" className="hidden h-4 w-4 shrink-0 text-cyan-600 transition-transform duration-200 ease-out group-hover:translate-x-0.5 sm:inline" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
