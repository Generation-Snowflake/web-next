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

export type NavItem = { label: string; labelTh?: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Classes", href: "/training" },
  { label: "Work", href: "/portfolio" },
  { label: "About", href: "/about" },
];

/** Secondary links (footer). */
export const moreNav: NavItem[] = [
  { label: "How we work", href: "/workflow" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavItem = { label: "Contact us", href: "/contact" };

/** mailto: link with a prefilled subject (and optional body). */
export function mailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
}
