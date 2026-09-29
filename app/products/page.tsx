import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatTHB, getProduct, productSupport, products, startingPrice, type Product } from "@/lib/products";
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
  "Robots we sell, set up and support in Thailand: Makerzoid STEM kits for schools, the XLeRobot dual-arm mobile robot and the LeRobot SO-101 arm pair.";

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
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
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
      <div className="md:col-span-6">
        <Label>
          {product.category} · {product.maker}
        </Label>
        <h2 className="mt-2 text-[1.75rem] font-medium leading-tight tracking-[-0.015em] sm:text-4xl">
          <Link href={`/products/${product.slug}`} className="hover:text-teal-ink">
            {product.name}
          </Link>
        </h2>
        <p className="mt-3 max-w-prose text-[17px] leading-relaxed text-graphite">{product.summary}</p>
        <p className="mt-5 font-mono text-[15px]">
          {from !== undefined ? (
            <span className="text-signal">
              {formatTHB(from)} to {formatTHB(Math.max(...product.models.map((m) => m.priceTHB ?? 0)))}
            </span>
          ) : (
            <span>Price on request</span>
          )}
        </p>
        {product.priceNote && (
          <p className="mt-1 max-w-prose text-[14px] text-graphite">
            {from !== undefined ? product.priceNote : priceNoteDetail(product.priceNote)}
          </p>
        )}
        {specs > 0 && <SpecTable specs={product.specs.slice(0, specs)} className="mt-6" />}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={`/products/${product.slug}`} variant="outline">
            {product.name} details
          </ButtonLink>
          <ButtonLink href={quoteHref(productQuoteId(product))} variant="link">
            {from !== undefined ? "Order or ask" : "Ask for a price"}
          </ButtonLink>
        </div>
        {product.credits && <p className="caption mt-6">{product.credits}</p>}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const makerzoid = getProduct("makerzoid");
  const others = products.filter((p) => p.slug !== "makerzoid");
  let fig = 1;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Products" }]}
        title="Robot kits and arms we sell"
        description="STEM kits for schools and research robots for labs. We import them, assemble and calibrate them if you want, and answer questions in Thai after you buy."
      >
        <nav aria-label="Product lines" className="w-full">
          <ul className="grid border-t border-ink sm:grid-cols-3">
            {products.map((p) => {
              const from = startingPrice(p);
              return (
                <li key={p.slug} className="border-b border-hairline sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <a href={`#${p.slug}`} className="block py-3 hover:text-teal-ink sm:px-4 sm:first:pl-0">
                    <span className="block font-medium">{p.name}</span>
                    <span className="caption block">
                      {p.category} · {from !== undefined ? `from ${formatTHB(from)}` : "price on request"}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageHeader>

      {makerzoid && (
        <section id="makerzoid" className="scroll-mt-24">
          <Container className="py-12 md:py-16">
            <LineIntro product={makerzoid} figure={fig++} />
            <div className="mt-14">
              <h3 className="text-[1.25rem] font-medium tracking-[-0.01em]">The four kits compared</h3>
              <p className="mb-5 mt-1 text-[15px] text-graphite">
                Ordered from first kit to competition kit. Prices in Thai baht. Tap a kit for photos and the full box list.
              </p>
              <KitComparisonTable product={makerzoid} caption="Makerzoid kits compared" />
            </div>
          </Container>
        </section>
      )}

      {others.map((p) => (
        <section key={p.slug} id={p.slug} className="scroll-mt-24 border-t border-ink">
          <Container className="py-12 md:py-16">
            <LineIntro product={p} figure={fig++} specs={5} />
          </Container>
        </section>
      ))}

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
