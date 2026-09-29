import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatTHB, productGroups, productSupport, products, startingPrice, type Product } from "@/lib/products";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import { Label } from "@/components/ui/SectionHeading";
import Band from "@/components/products/Band";
import SpecTable from "@/components/products/SpecTable";
import KitComparisonTable from "@/components/products/KitComparisonTable";
import { priceNoteDetail, productQuoteId, quoteHref } from "@/components/products/productUi";

const description =
  "Products from GSF: Makerzoid STEM kits and the RoboPark learning platform for kids, the XLeRobot and LeRobot SO-101 research robots, and the Taktic project management tool.";

export const metadata: Metadata = {
  title: "Products",
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products | GSF Robotics & AI",
    description,
    url: "/products",
  },
};

/** Heading block of one product line: photo left, facts right. */
function LineIntro({ product, figure, specs = 0 }: { product: Product; figure: number; specs?: number }) {
  const from = startingPrice(product);
  const dev = product.status === "in-development";
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      {product.image && (
      <figure className="md:col-span-6">
        <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] bg-paper-3">
          {product.image && (
            <Image
              src={product.image}
              alt={product.imageAlt ?? product.name}
              fill
              sizes="(min-width: 768px) 40rem, 100vw"
              className={product.slug === "makerzoid" ? "object-cover" : "object-contain mix-blend-multiply"}
              priority={figure === 1}
            />
          )}
        </Link>
        <figcaption className="caption mt-2">
          FIG. {figure} — {product.imageAlt ?? product.name}
        </figcaption>
      </figure>
      )}
      <div className={product.image ? "md:col-span-6" : "md:col-span-8"}>
        <Label>
          {product.category} · {product.maker}
        </Label>
        <h3 className="mt-2 text-[1.5rem] font-medium leading-tight tracking-[-0.015em] sm:text-3xl">
          <Link href={`/products/${product.slug}`} className="hover:text-teal-ink">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 max-w-prose text-[17px] leading-relaxed text-graphite">{product.summary}</p>
        <p className="mt-5 font-mono text-[15px]">
          {dev ? (
            <span>In development · testing with early users</span>
          ) : from !== undefined ? (
            <span className="text-signal">
              {formatTHB(from)} to {formatTHB(Math.max(...product.models.map((m) => m.priceTHB ?? 0)))}
            </span>
          ) : (
            <span>Price on request</span>
          )}
        </p>
        {!dev && product.priceNote && (
          <p className="mt-1 max-w-prose text-[14px] text-graphite">
            {from !== undefined ? product.priceNote : priceNoteDetail(product.priceNote)}
          </p>
        )}
        {specs > 0 && <SpecTable specs={product.specs.slice(0, specs)} className="mt-6" />}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={`/products/${product.slug}`} variant="outline">
            {product.name} details
          </ButtonLink>
          {product.siteUrl && (
            <ButtonLink href={product.siteUrl} variant="link">
              Visit {product.siteUrl.replace(/^https?:\/\/(www\.)?/, "")}
            </ButtonLink>
          )}
          <ButtonLink href={quoteHref(productQuoteId(product))} variant="link">
            {dev ? "Ask for early access" : from !== undefined ? "Order or ask" : "Ask for a price"}
          </ButtonLink>
        </div>
        {product.credits && <p className="caption mt-6">{product.credits}</p>}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  let fig = 1;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Products" }]}
        title="Products"
        description="Robot kits for schools, research robots for labs, and software we build ourselves. We import the hardware, set it up if you want, and answer questions after you buy."
      >
        <nav aria-label="Products" className="w-full">
          <ul className="grid border-t border-ink sm:grid-cols-2 lg:grid-cols-5">
            {products.map((p) => {
              const from = startingPrice(p);
              return (
                <li key={p.slug} className="border-b border-hairline lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <a href={`#${p.slug}`} className="block py-3 hover:text-teal-ink lg:px-4 lg:first:pl-0">
                    <span className="block font-medium">{p.name}</span>
                    <span className="caption block">
                      {p.status === "in-development"
                        ? "in development"
                        : from !== undefined
                          ? `from ${formatTHB(from)}`
                          : "price on request"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageHeader>

      {productGroups.map((g) => {
        const items = products.filter((p) => p.group === g.id);
        if (!items.length) return null;
        return (
          <div key={g.id} className="border-t border-ink">
            <Container className="pt-12 md:pt-16">
              <h2 className="text-[1.75rem] font-medium leading-tight tracking-[-0.015em] sm:text-4xl">{g.title}</h2>
              <p className="mt-2 max-w-prose text-[17px] text-graphite">{g.description}</p>
            </Container>
            {items.map((p, i) => (
              <section key={p.slug} id={p.slug} className={`scroll-mt-24 ${i > 0 ? "border-t border-hairline" : ""}`}>
                <Container className="py-12 md:py-16">
                  <LineIntro product={p} figure={fig++} specs={p.models.length > 1 ? 0 : 5} />
                  {p.models.length > 1 && (
                    <div className="mt-14">
                      <h4 className="text-[1.25rem] font-medium tracking-[-0.01em]">The {p.models.length} kits compared</h4>
                      <p className="mb-5 mt-1 text-[15px] text-graphite">
                        Ordered from first kit to competition kit. Prices in Thai baht. Tap a kit for photos and the full box list.
                      </p>
                      <KitComparisonTable product={p} caption={`${p.name} kits compared`} />
                    </div>
                  )}
                </Container>
              </section>
            ))}
          </div>
        );
      })}

      <Band label="From us" title="What we add to the hardware" tone="paper-2">
        <dl className="border-t border-ink">
          {productSupport.map((s) => (
            <div key={s.title} className="grid gap-1 border-b border-hairline py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <dt className="font-medium">{s.title}</dt>
              <dd className="leading-relaxed text-graphite">{s.description}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[15px] text-graphite">
          Need a robot built for a specific job instead? See{" "}
          <Link href="/services" className="link">
            our engineering services
          </Link>
          .
        </p>
      </Band>

      <CtaBand
        title="Ask which kit or robot fits"
        description="Tell us who will use it, how many students or engineers, and when you need it. We reply with a recommendation and a price."
        primary={{ label: "Ask for a quote", href: "/contact?interest=product" }}
      />
    </>
  );
}
