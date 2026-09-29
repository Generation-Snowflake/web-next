import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatTHB, getProduct, productSupport, products, startingPrice } from "@/lib/products";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import Band from "@/components/products/Band";
import ProductGallery from "@/components/products/ProductGallery";
import SpecTable from "@/components/products/SpecTable";
import InTheBox from "@/components/products/InTheBox";
import KitBlock from "@/components/products/KitBlock";
import KitComparisonTable from "@/components/products/KitComparisonTable";
import ProductJsonLd from "@/components/products/ProductJsonLd";
import Product3DViewer from "@/components/products/viewer/Product3DViewer";
import { priceNoteDetail, productPhotos, productQuoteId, quoteHref } from "@/components/products/productUi";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const title = `${product.name}: ${product.category}`;
  const url = `/products/${product.slug}`;
  const photo = productPhotos(product)[0];
  return {
    title,
    description: product.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | GSF Robotics & AI`,
      description: product.summary,
      url,
      type: "website",
      ...(photo ? { images: [{ url: photo.src, alt: photo.alt }] } : {}),
    },
  };
}

/** Short name for CTA copy: "LeRobot SO-101" → "SO-101". */
const shortName = (name: string) => name.replace(/^LeRobot\s+/, "");

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const photos = productPhotos(product);
  const multi = product.models.length > 1;
  const single = multi ? undefined : product.models[0];
  const from = startingPrice(product);
  const quoteId = productQuoteId(product);
  const related = products.filter((p) => p.slug !== product.slug);
  const name = shortName(product.name);
  const dev = product.status === "in-development";
  const hardware = product.group !== "software" && product.slug !== "robopark";
  let fig = 1;
  const nextFig = () => fig++;
  const galleryFig = nextFig();
  const viewerFig = product.model3d ? nextFig() : 0;

  return (
    <>
      <ProductJsonLd product={product} />

      <PageHeader
        crumbs={[{ label: "Products", href: "/products" }, { label: product.name }]}
        title={product.name}
        description={product.tagline}
      >
        <p className="font-mono text-[15px]">
          {dev ? (
            <span className="text-graphite">In development · testing with early users</span>
          ) : from !== undefined ? (
            <>
              <span className="text-graphite">{multi ? "From " : ""}</span>
              <span className="text-[1.25rem] text-signal">{formatTHB(from)}</span>
            </>
          ) : (
            <span className="text-graphite">Price on request</span>
          )}
        </p>
        <ButtonLink href={quoteHref(quoteId)} size="lg" arrow>
          {dev ? "Ask for early access" : from !== undefined ? "Order or ask a question" : "Ask for a quote"}
        </ButtonLink>
        {product.siteUrl && (
          <ButtonLink href={product.siteUrl} variant="link">
            Visit {product.siteUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </ButtonLink>
        )}
      </PageHeader>

      {/* Photos + overview */}
      <section>
        <Container className="grid gap-10 py-12 md:grid-cols-12 md:py-16">
          {photos.length > 0 && (
            <div className="md:col-span-7">
              <ProductGallery photos={photos} figure={galleryFig} priority />
              {product.credits && <p className="caption mt-4">{product.credits}</p>}
            </div>
          )}
          <div className={photos.length > 0 ? "md:col-span-5" : "md:col-span-7"}>
            <div className="space-y-4 text-[17px] leading-relaxed">
              {product.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-8 border-t border-ink text-[15px]">
              {[
                { label: "Made by", value: product.maker },
                { label: "Category", value: product.category },
                { label: "For", value: product.audience.join(", ") },
              ].map((r) => (
                <div key={r.label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-hairline py-2.5">
                  <dt className="text-graphite">{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-hairline py-2.5">
                <dt className="text-graphite">{dev ? "Status" : "Price"}</dt>
                <dd>
                  {dev ? (
                    "In development, testing with early users"
                  ) : from !== undefined ? (
                    <span className="font-mono text-signal">
                      {multi ? `${formatTHB(from)} to ${formatTHB(Math.max(...product.models.map((m) => m.priceTHB ?? 0)))}` : formatTHB(from)}
                    </span>
                  ) : (
                    "On request"
                  )}
                  {!dev && product.priceNote && (
                    <span className="mt-1 block text-[14px] text-graphite">
                      {from !== undefined ? product.priceNote : priceNoteDetail(product.priceNote)}
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* What it does */}
      {product.features.length > 0 && (
        <Band label="Features" title={`What ${name} does`}>
          <dl className="border-t border-ink">
            {product.features.map((f) => (
              <div key={f.title} className="grid gap-1 border-b border-hairline py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-medium">{f.title}</dt>
                <dd className="leading-relaxed text-graphite">{f.description}</dd>
              </div>
            ))}
          </dl>
        </Band>
      )}

      {/* 3D model */}
      {product.model3d && (
        <Band
          wide
          tone="paper-2"
          label="3D model"
          title={product.model3d.kind === "so101" ? "Leader and follower, in 3D" : "The whole robot, in 3D"}
          aside={
            product.model3d.kind === "so101"
              ? "Built from the project's URDF and CAD files. Both arms play the same motion here, the way the follower copies the leader. The leader is the one with the handle."
              : "Built from the project's simulation model. The motion is a slow demo within the joint limits, not recorded robot data."
          }
        >
          <Product3DViewer model={product.model3d} figure={viewerFig} />
        </Band>
      )}

      {/* Specs + in the box */}
      {(product.specs.length > 0 || product.inTheBox.length > 0) && (
        <Band
          id="specs"
          label="Specifications"
          title={multi ? "Shared by every kit" : "Specifications"}
          aside={multi ? "Per-kit specs are in the table below." : undefined}
        >
          <SpecTable specs={[...product.specs, ...(single?.specs ?? [])]} />
          {product.inTheBox.length > 0 && (
            <div className="mt-12">
              <h3 className="mb-3 text-[1.25rem] font-medium tracking-[-0.01em]">In the box</h3>
              <InTheBox items={product.inTheBox} />
            </div>
          )}
        </Band>
      )}

      {/* Models */}
      {multi && (
        <Band
          id="kits"
          wide
          label="Kits"
          title={`The ${product.models.length} ${product.name} kits`}
          aside={product.priceNote}
        >
          <KitComparisonTable product={product} caption={`${product.name} kits compared`} />
          <div className="mt-14">
            {product.models.map((m) => (
              <KitBlock key={m.id} product={product} model={m} figure={nextFig()} />
            ))}
          </div>
        </Band>
      )}

      {/* Use cases, links, support */}
      {(product.useCases.length > 0 || product.links.length > 0) && (
      <Band label="Use" title={product.useCases.length > 0 ? "Where it gets used" : "Links"}>
        <div className="grid gap-10 sm:grid-cols-2">
          {product.useCases.length > 0 && (
            <div>
              <h3 className="mb-3 text-[15px] font-medium">Use cases</h3>
              <ul className="border-t border-ink">
                {product.useCases.map((u) => (
                  <li key={u} className="border-b border-hairline py-2.5">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.links.length > 0 && (
            <div>
              <h3 className="mb-3 text-[15px] font-medium">{hardware ? "Upstream docs and source" : "Website"}</h3>
              <ul className="border-t border-ink">
                {product.links.map((l) => (
                  <li key={l.href} className="border-b border-hairline py-2.5">
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                      {l.label}
                    </a>
                    <span className="caption ml-2">{new URL(l.href).hostname.replace(/^www\./, "")}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Band>
      )}

      {hardware && (
      <Band label="From us" title="What we add to the hardware">
        <dl className="border-t border-ink">
          {productSupport.map((s) => (
            <div key={s.title} className="grid gap-1 border-b border-hairline py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <dt className="font-medium">{s.title}</dt>
              <dd className="leading-relaxed text-graphite">{s.description}</dd>
            </div>
          ))}
        </dl>
      </Band>
      )}

      {/* Related */}
      <Band wide label="Also from GSF" title="Other products">
        <ul className="grid gap-8 sm:grid-cols-2">
          {related.map((p) => {
            const start = startingPrice(p);
            return (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group grid grid-cols-[8rem_1fr] gap-5 sm:grid-cols-[11rem_1fr]">
                  <span className="relative block aspect-square bg-paper-3">
                    {p.image && (
                      <Image src={p.image} alt="" fill sizes="11rem" className="object-cover mix-blend-multiply" />
                    )}
                  </span>
                  <span className="border-t border-ink pt-3">
                    <span className="caption block">{p.category}</span>
                    <span className="mt-1 block text-[1.25rem] font-medium tracking-[-0.01em] group-hover:text-teal-ink">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-graphite">{p.tagline}</span>
                    <span className="mt-2 block font-mono text-[14px]">
                      {p.status === "in-development" ? (
                        <span className="text-graphite">In development</span>
                      ) : start !== undefined ? (
                        <span className="text-signal">From {formatTHB(start)}</span>
                      ) : (
                        <span className="text-graphite">Price on request</span>
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Band>

      <CtaBand
        title={
          dev
            ? `Try ${name} early`
            : from !== undefined
              ? `Order ${name} kits or ask a question`
              : `Ask about ${name} price and lead time`
        }
        description={
          dev
            ? `${name} is still being built and tested. Tell us who would use it and we'll get in touch about early access.`
            : from !== undefined
            ? "Tell us which kit and how many. For schools and bulk orders we quote per order."
            : "Tell us what you want to use it for and whether you want it assembled. We reply with a price and a delivery estimate."
        }
        primary={{ label: `Ask about ${name}`, href: quoteHref(quoteId) }}
      />
    </>
  );
}
