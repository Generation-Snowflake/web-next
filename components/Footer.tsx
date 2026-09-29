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

const linkCls = "text-night-text transition-colors duration-150 hover:text-teal";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-mono text-[13px] text-night-muted">{children}</h2>;
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="night relative z-10 bg-night text-night-text">
      <Container className="pb-10 pt-14 md:pt-16">
        <Link href="/" className="inline-flex items-center gap-3 rounded-sm">
          <Image src="/logo-night.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="text-xl font-medium tracking-[-0.015em]">{site.name}</span>
        </Link>
        <p className="mt-3 max-w-prose text-[15px] text-night-muted">{site.tagline}</p>

        <div className="mt-10 grid gap-x-8 gap-y-10 border-t border-night-line pt-8 text-[15px] sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ColumnTitle>Office</ColumnTitle>
            <address className="mt-3 not-italic leading-relaxed">
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

            <dl className="mt-6 divide-y divide-night-line border-y border-night-line">
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-night-muted">Phone</dt>
                <dd className="flex gap-3 font-mono text-[14px]">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className={linkCls}>
                      {p.display}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-night-muted">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className={`break-all ${linkCls}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-night-muted">Hours</dt>
                <dd>{site.hours}</dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Footer" className="contents">
            {linkColumns.map((col) => (
              <div key={col.title} className={`border-night-line lg:border-l lg:pl-6 ${col.span}`}>
                <ColumnTitle>{col.title}</ColumnTitle>
                <ul className="mt-3 space-y-2">
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

        <div className="mt-12 flex flex-col gap-2 border-t border-night-line pt-6 text-[13px] text-night-muted md:flex-row md:justify-between md:gap-8">
          <p>{site.legalName}</p>
          <p>Open-source robot designs (SO-101, XLeRobot) are Apache-2.0 by their authors.</p>
          <p className="font-mono">© {year}</p>
        </div>
      </Container>
    </footer>
  );
}
