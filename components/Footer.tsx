import Image from "next/image";
import Link from "@/components/i18n/Link";
import Container from "@/components/ui/Container";
import CircuitLines from "@/components/ui/CircuitLines";
import type { Lang } from "@/lib/i18n";
import { getMainNav, getMoreNav, getSite } from "@/lib/site";
import { getServices } from "@/lib/services";
import { getProducts } from "@/lib/products";

type FooterLink = { label: string; href: string };

const ui = {
  en: {
    services: "Services",
    allServices: "All services",
    products: "Products",
    allProducts: "All products",
    company: "Company",
    office: "Office",
    maps: "Open in Google Maps",
    newTab: " (opens in a new tab)",
    phone: "Phone",
    email: "Email",
    hours: "Hours",
    nav: "Footer",
    credits: "Armo and ArmoGo build on SO-101, LeRobot and XLeRobot, Apache-2.0 by their authors.",
  },
  th: {
    services: "บริการ",
    allServices: "บริการทั้งหมด",
    products: "สินค้า",
    allProducts: "สินค้าทั้งหมด",
    company: "บริษัท",
    office: "สำนักงาน",
    maps: "เปิดใน Google Maps",
    newTab: " (เปิดในแท็บใหม่)",
    phone: "โทรศัพท์",
    email: "อีเมล",
    hours: "เวลาทำการ",
    nav: "ส่วนท้าย",
    credits: "Armo และ ArmoGo พัฒนาต่อจาก SO-101, LeRobot และ XLeRobot ซึ่งเผยแพร่ภายใต้ Apache-2.0 โดยผู้พัฒนาแต่ละโครงการ",
  },
} satisfies Record<Lang, Record<string, string>>;

function linkColumns(lang: Lang): { title: string; span: string; links: FooterLink[] }[] {
  const t = ui[lang];
  // Services and Products have their own columns, so Company skips them.
  const companyLinks = [...getMainNav(lang), ...getMoreNav(lang)].filter(
    (l) => l.href !== "/services" && l.href !== "/products",
  );
  return [
    {
      title: t.services,
      span: "lg:col-span-3",
      links: [
        ...getServices(lang).map((s) => ({ label: s.title, href: `/services#${s.slug}` })),
        { label: t.allServices, href: "/services" },
      ],
    },
    {
      title: t.products,
      span: "lg:col-span-2",
      links: [
        ...getProducts(lang).map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
        { label: t.allProducts, href: "/products" },
      ],
    },
    { title: t.company, span: "lg:col-span-3", links: companyLinks },
  ];
}

const linkCls = "text-night-muted transition-colors duration-200 hover:text-cyan-300";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[12px] font-semibold uppercase tracking-label text-cyan-200">{children}</h2>;
}

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const t = ui[lang];
  const site = getSite(lang);

  return (
    <footer className="night relative isolate z-10 overflow-hidden bg-ink text-white">
      <div aria-hidden className="dot-grid-night absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <CircuitLines tone="night" className="absolute right-0 top-0 -z-10 hidden h-56 w-[38rem] opacity-40 md:block" />
      <span aria-hidden className="block h-1 w-full bg-gradient-c" />
      <Container className="pb-10 pt-14 md:pt-20">
        <Link href="/" className="inline-flex items-center gap-3 rounded-md">
          <Image src="/logo-night.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
          <span className="text-xl tracking-[0.02em]">
            <span className="font-bold">GSF</span> Robotics and AI
          </span>
        </Link>
        <p className="mt-3 max-w-prose text-[15px] text-night-muted">{site.tagline}</p>

        <div className="mt-12 grid gap-x-8 gap-y-10 text-[15px] sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ColumnTitle>{t.office}</ColumnTitle>
            <address className="mt-4 not-italic leading-relaxed text-night-muted">
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={site.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-2 inline-block text-[14px]"
            >
              {t.maps}<span className="sr-only">{t.newTab}</span>
            </a>

            <dl className="mt-6 divide-y divide-night-line border-y border-night-line">
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-night-muted">{t.phone}</dt>
                <dd className="flex flex-wrap gap-x-3">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="text-white transition-colors duration-200 hover:text-cyan-300">
                      {p.display}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-night-muted">{t.email}</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="break-all text-white transition-colors duration-200 hover:text-cyan-300">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-night-muted">{t.hours}</dt>
                <dd className="text-white">{site.hours}</dd>
              </div>
            </dl>
          </div>

          <nav aria-label={t.nav} className="contents">
            {linkColumns(lang).map((col) => (
              <div key={col.title} className={col.span}>
                <ColumnTitle>{col.title}</ColumnTitle>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={linkCls}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-night-line pt-6 text-[13px] text-night-muted md:flex-row md:justify-between md:gap-8">
          <p>{site.legalName}</p>
          <p>{t.credits}</p>
          <p>© {year}</p>
        </div>
      </Container>
    </footer>
  );
}
