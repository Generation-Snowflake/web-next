import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import CircuitLines from "@/components/ui/CircuitLines";
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

const linkCls = "text-night-muted transition-colors duration-200 hover:text-cyan-300";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[12px] font-semibold uppercase tracking-label text-cyan-200">{children}</h2>;
}

export default function Footer() {
  const year = new Date().getFullYear();

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
            <ColumnTitle>Office</ColumnTitle>
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
              Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>

            <dl className="mt-6 divide-y divide-night-line border-y border-night-line">
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-night-muted">Phone</dt>
                <dd className="flex flex-wrap gap-x-3">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="text-white transition-colors duration-200 hover:text-cyan-300">
                      {p.display}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-night-muted">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="break-all text-white transition-colors duration-200 hover:text-cyan-300">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2.5">
                <dt className="text-night-muted">Hours</dt>
                <dd className="text-white">{site.hours}</dd>
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

        <div className="mt-14 flex flex-col gap-2 border-t border-night-line pt-6 text-[13px] text-night-muted md:flex-row md:justify-between md:gap-8">
          <p>{site.legalName}</p>
          <p>Armo and ArmoGo build on SO-101, LeRobot and XLeRobot, Apache-2.0 by their authors.</p>
          <p>© {year}</p>
        </div>
      </Container>
    </footer>
  );
}
