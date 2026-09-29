import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { mainNav, moreNav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { products } from "@/lib/products";

type FooterLink = { label: string; href: string };

// Services and Products have their own columns, so Company skips them.
const companyLinks: FooterLink[] = [...mainNav, ...moreNav].filter(
  (l) => l.href !== "/services" && l.href !== "/products",
);

const linkColumns: { title: string; span: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    span: "lg:col-span-3",
    links: [
      ...services.map((s) => ({ label: s.title, href: `/services#${s.slug}` })),
      { label: "All services", href: "/services" },
    ],
  },
  {
    title: "Products",
    span: "lg:col-span-2",
    links: [
      ...products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
      { label: "All products", href: "/products" },
    ],
  },
  { title: "Company", span: "lg:col-span-3", links: companyLinks },
];

const linkCls = "text-graphite transition-colors duration-200 hover:text-ink";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[14px] font-semibold text-ink">{children}</h2>;
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-hairline bg-paper-2 text-ink">
      <Container className="pb-10 pt-14 md:pt-20">
        <Link href="/" className="inline-flex items-center gap-3 rounded-md">
          <Image src="/logo-ink.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="text-xl font-semibold tracking-tightish">{site.name}</span>
        </Link>
        <p className="mt-3 max-w-prose text-[15px] text-graphite">{site.tagline}</p>

        <div className="mt-12 grid gap-x-8 gap-y-10 text-[15px] sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ColumnTitle>Office</ColumnTitle>
            <address className="mt-4 not-italic leading-relaxed text-graphite">
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
              Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>

            <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-graphite">Phone</dt>
                <dd className="flex flex-wrap gap-x-3">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="text-ink transition-colors duration-200 hover:text-teal-ink">
                      {p.display}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-graphite">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="break-all text-ink transition-colors duration-200 hover:text-teal-ink">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-graphite">Hours</dt>
                <dd className="text-ink">{site.hours}</dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Footer" className="contents">
            {linkColumns.map((col) => (
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

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-6 text-[13px] text-graphite md:flex-row md:justify-between md:gap-8">
          <p>{site.legalName}</p>
          <p>Open-source robot designs (SO-101, XLeRobot) are Apache-2.0 by their authors.</p>
          <p>© {year}</p>
        </div>
      </Container>
    </footer>
  );
}
