import { overlay, type Lang, type Overlay } from "@/lib/i18n";

// Company-wide facts and navigation. Every page, the navbar, the footer and
// the JSON-LD read from here so contact details only live in one place.

export const site = {
  name: "GSF Robotics & AI",
  shortName: "GSF",
  legalName: "Generation Snowflake Robotics & AI",
  url: "https://gsf-robotics.com",
  tagline: "Software and robotics engineering from Pak Kret, Nonthaburi.",
  description:
    "GSF Robotics & AI is a small team in Pak Kret, Nonthaburi. We build AI, vision, robotics, IoT, web and mobile systems, and sell STEM and research robots.",
  email: "contact@gsf-company.com",
  phones: [
    { display: "092-270-2597", href: "tel:+66922702597" },
    { display: "086-505-3533", href: "tel:+66865053533" },
  ],
  address: {
    lines: [
      "52/9 Suchawadee Village, Moo 3, Soi Sukhaprachasan 3",
      "Tiwanon Road, Bang Phut",
      "Pak Kret, Nonthaburi 11120",
    ],
    locality: "Pak Kret, Nonthaburi",
    country: "Thailand",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%88%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%8A%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B8%B5+%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B8%9E%E0%B8%B9%E0%B8%94+%E0%B8%9B%E0%B8%B2%E0%B8%81%E0%B9%80%E0%B8%81%E0%B8%A3%E0%B9%87%E0%B8%94+%E0%B8%99%E0%B8%99%E0%B8%97%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5",
  },
  hours: "Mon–Fri, 9:00–18:00 (Bangkok time)",
  social: [{ label: "Facebook", href: "https://www.facebook.com/gsfrobotics" }],
} as const;

const siteTh: Overlay<typeof site> = {
  tagline: "งานวิศวกรรมซอฟต์แวร์และหุ่นยนต์ จากปากเกร็ด นนทบุรี",
  description:
    "GSF Robotics & AI ทีมเล็กๆ ที่ปากเกร็ด นนทบุรี รับพัฒนาระบบ AI, Vision, หุ่นยนต์, IoT, เว็บและแอปมือถือ และจำหน่ายหุ่นยนต์สำหรับการศึกษาและงานวิจัย",
  address: {
    lines: [
      "52/9 หมู่บ้านสุชาวดี หมู่ 3 ซอยสุขประชาสรรค์ 3",
      "ถนนติวานนท์ ตำบลบางพูด",
      "อำเภอปากเกร็ด จังหวัดนนทบุรี 11120",
    ],
    locality: "ปากเกร็ด นนทบุรี",
    country: "ประเทศไทย",
  },
  hours: "จันทร์–ศุกร์ 9:00–18:00 น.",
};

/** Company facts in a language (address, hours and tagline differ). */
export function getSite(lang: Lang): typeof site {
  return lang === "th" ? overlay(site, siteTh) : site;
}

export type NavItem = { label: string; href: string };

const nav = {
  en: {
    main: [
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Classes", href: "/training" },
      { label: "Work", href: "/portfolio" },
      { label: "About", href: "/about" },
    ],
    more: [
      { label: "How we work", href: "/workflow" },
      { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Contact us", href: "/contact" },
  },
  th: {
    main: [
      { label: "บริการ", href: "/services" },
      { label: "สินค้า", href: "/products" },
      { label: "คอร์สเรียน", href: "/training" },
      { label: "ผลงาน", href: "/portfolio" },
      { label: "เกี่ยวกับเรา", href: "/about" },
    ],
    more: [
      { label: "วิธีการทำงาน", href: "/workflow" },
      { label: "ติดต่อ", href: "/contact" },
    ],
    cta: { label: "ติดต่อเรา", href: "/contact" },
  },
} satisfies Record<Lang, { main: NavItem[]; more: NavItem[]; cta: NavItem }>;

/** Main navigation (navbar and footer). Hrefs are in English form; the
 *  i18n Link adds /th on Thai pages. */
export const getMainNav = (lang: Lang): NavItem[] => nav[lang].main;
/** Secondary links (footer). */
export const getMoreNav = (lang: Lang): NavItem[] => nav[lang].more;
export const getPrimaryCta = (lang: Lang): NavItem => nav[lang].cta;

/** mailto: link with a prefilled subject (and optional body). */
export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}
