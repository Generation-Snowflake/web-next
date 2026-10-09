import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { notFound } from "next/navigation";
import { alternates, langFrom, ogLocale } from "@/lib/i18n";
import { formatTHB, getProductIn, getProductSupport, getProducts, products, startingPrice } from "@/lib/products";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import Band from "@/components/products/Band";
import TakticPreview from "@/components/products/TakticPreview";
import ProductGallery from "@/components/products/ProductGallery";
import SpecTable from "@/components/products/SpecTable";
import InTheBox from "@/components/products/InTheBox";
import KitBlock from "@/components/products/KitBlock";
import KitComparisonTable from "@/components/products/KitComparisonTable";
import ProductJsonLd from "@/components/products/ProductJsonLd";
import Product3DViewer from "@/components/products/viewer/Product3DViewer";
import { priceNoteDetail, productPhotos, productQuoteId, quoteHref } from "@/components/products/productUi";

type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

// The [lang] layout supplies lang; this adds every slug for each language.
export function generateStaticParams(): { slug: string }[] {
  return products.map((p) => ({ slug: p.slug }));
}

const copy = {
  en: {
    products: "Products",
    devLong: "In development · testing with early users",
    devStatus: "In development, testing with early users",
    from: "From ",
    to: "to",
    onRequest: "Price on request",
    onRequestShort: "On request",
    earlyAccess: "Ask for early access",
    orderOrAsk: "Order or ask a question",
    askQuote: "Ask for a quote",
    visit: "Visit",
    madeBy: "Made by",
    category: "Category",
    for: "For",
    status: "Status",
    price: "Price",
    illustration: "Illustration of the board. Task names are examples.",
    featuresLabel: "Features",
    featuresTitle: (name: string) => `What ${name} does`,
    model3dLabel: "3D model",
    model3dArms: "Leader and follower, in 3D",
    model3dRobot: "The whole robot, in 3D",
    model3dArmsNote:
      "Built from the project's URDF and CAD files. Both arms play the same motion here, the way the follower copies the leader. The leader is the one with the handle.",
    model3dRobotNote:
      "Built from the project's simulation model. The motion is a slow demo within the joint limits, not recorded robot data.",
    specsLabel: "Specifications",
    specsShared: "Shared by every kit",
    specsPerKit: "Per-kit specs are in the table below.",
    inTheBox: "In the box",
    kitsLabel: "Kits",
    kitsTitle: (n: number, name: string) => `The ${n} ${name} kits`,
    kitsCaption: (name: string) => `${name} kits compared`,
    useLabel: "Use",
    useTitle: "Where it gets used",
    linksTitle: "Links",
    useCases: "Use cases",
    upstream: "Upstream docs and source",
    website: "Website",
    supportLabel: "From us",
    supportTitle: "What we add to the hardware",
    relatedLabel: "Also from GSF",
    relatedTitle: "Other products",
    devShort: "In development",
    ctaDevTitle: (name: string) => `Try ${name} early`,
    ctaKitTitle: (name: string) => `Order ${name} kits or ask a question`,
    ctaQuoteTitle: (name: string) => `Ask about ${name} price and lead time`,
    ctaDevText: (name: string) =>
      `${name} is still being built and tested. Tell us who would use it and we'll get in touch about early access.`,
    ctaKitText: "Tell us which kit and how many. For schools and bulk orders we quote per order.",
    ctaQuoteText:
      "Tell us what you want to use it for and whether you want it assembled. We reply with a price and a delivery estimate.",
    ctaLabel: (name: string) => `Ask about ${name}`,
  },
  th: {
    products: "สินค้า",
    devLong: "อยู่ระหว่างพัฒนา · ทดสอบกับผู้ใช้กลุ่มแรก",
    devStatus: "อยู่ระหว่างพัฒนา กำลังทดสอบกับผู้ใช้กลุ่มแรก",
    from: "เริ่มต้น ",
    to: "ถึง",
    onRequest: "สอบถามราคา",
    onRequestShort: "สอบถามราคา",
    earlyAccess: "ขอทดลองใช้ก่อนใคร",
    orderOrAsk: "สั่งซื้อหรือสอบถาม",
    askQuote: "ขอใบเสนอราคา",
    visit: "ไปที่",
    madeBy: "ผู้ผลิต",
    category: "ประเภท",
    for: "เหมาะกับ",
    status: "สถานะ",
    price: "ราคา",
    illustration: "ภาพประกอบบอร์ด ชื่องานเป็นเพียงตัวอย่าง",
    featuresLabel: "ความสามารถ",
    featuresTitle: (name: string) => `${name} ทำอะไรได้บ้าง`,
    model3dLabel: "โมเดล 3 มิติ",
    model3dArms: "แขน leader และ follower แบบ 3 มิติ",
    model3dRobot: "หุ่นยนต์ทั้งตัวแบบ 3 มิติ",
    model3dArmsNote:
      "สร้างจากไฟล์ URDF และ CAD ของโครงการ แขนทั้งสองเคลื่อนไหวแบบเดียวกัน เหมือนที่แขน follower ทำตามแขน leader ตัวที่มีด้ามจับคือแขน leader",
    model3dRobotNote:
      "สร้างจากโมเดลสำหรับระบบจำลองของโครงการ การเคลื่อนไหวเป็นเดโมช้าๆ ภายในขอบเขตของข้อต่อ ไม่ใช่ข้อมูลที่บันทึกจากหุ่นจริง",
    specsLabel: "สเปก",
    specsShared: "สเปกที่ทุกชุดมีเหมือนกัน",
    specsPerKit: "สเปกของแต่ละชุดอยู่ในตารางด้านล่าง",
    inTheBox: "ในกล่องมีอะไรบ้าง",
    kitsLabel: "ชุด",
    kitsTitle: (n: number, name: string) => `${name} ทั้ง ${n} ชุด`,
    kitsCaption: (name: string) => `เปรียบเทียบชุด ${name}`,
    useLabel: "การใช้งาน",
    useTitle: "ใช้งานที่ไหนได้บ้าง",
    linksTitle: "ลิงก์",
    useCases: "ตัวอย่างการใช้งาน",
    upstream: "เอกสารและซอร์สโค้ดต้นทาง",
    website: "เว็บไซต์",
    supportLabel: "บริการจากเรา",
    supportTitle: "สิ่งที่เราเพิ่มให้นอกจากตัวฮาร์ดแวร์",
    relatedLabel: "สินค้าอื่นจาก GSF",
    relatedTitle: "สินค้าอื่นๆ",
    devShort: "อยู่ระหว่างพัฒนา",
    ctaDevTitle: (name: string) => `ลองใช้ ${name} ก่อนใคร`,
    ctaKitTitle: (name: string) => `สั่งซื้อชุด ${name} หรือสอบถามเพิ่มเติม`,
    ctaQuoteTitle: (name: string) => `สอบถามราคาและระยะเวลาส่งของ ${name}`,
    ctaDevText: (name: string) =>
      `${name} ยังอยู่ระหว่างพัฒนาและทดสอบ บอกเราว่าใครจะเป็นคนใช้ แล้วเราจะติดต่อกลับเรื่องการทดลองใช้`,
    ctaKitText: "บอกเราว่าต้องการชุดไหนและกี่ชุด สำหรับโรงเรียนและการสั่งจำนวนมาก เราเสนอราคาเป็นรายครั้ง",
    ctaQuoteText: "บอกเราว่าจะใช้ทำอะไร และต้องการให้ประกอบให้หรือไม่ แล้วเราจะแจ้งราคาและระยะเวลาส่งของ",
    ctaLabel: (name: string) => `สอบถามเรื่อง ${name}`,
  },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const lang = await langFrom(params);
  const product = getProductIn(slug, lang);
  if (!product) return {};

  const title = `${product.name}: ${product.category}`;
  const urls = alternates(`/products/${product.slug}`, lang);
  const photo = productPhotos(product)[0];
  return {
    title,
    description: product.summary,
    alternates: urls,
    openGraph: {
      title: `${title} | GSF Robotics & AI`,
      description: product.summary,
      url: urls.canonical as string,
      type: "website",
      locale: ogLocale[lang],
      ...(photo ? { images: [{ url: photo.src, alt: photo.alt }] } : {}),
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const lang = await langFrom(params);
  const c = copy[lang];
  const product = getProductIn(slug, lang);
  if (!product) notFound();

  const photos = productPhotos(product);
  const multi = product.models.length > 1;
  const single = multi ? undefined : product.models[0];
  const from = startingPrice(product);
  const quoteId = productQuoteId(product);
  const related = getProducts(lang).filter((p) => p.slug !== product.slug);
  const name = product.name;
  const dev = product.status === "in-development";
  const hardware = product.group !== "software" && product.slug !== "robopark";

  return (
    <>
      <ProductJsonLd product={product} lang={lang} />

      <PageHeader
        lang={lang}
        crumbs={[{ label: c.products, href: "/products" }, { label: product.name }]}
        title={product.name}
        description={product.tagline}
      >
        <p className="text-[15px]">
          {dev ? (
            <span className="chip-info">{c.devLong}</span>
          ) : from !== undefined ? (
            <>
              <span className="text-graphite">{multi ? c.from : ""}</span>
              <span className="font-mono text-[1.375rem] font-semibold tabular-nums text-ink">{formatTHB(from)}</span>
            </>
          ) : (
            <span className="font-medium text-graphite">{c.onRequest}</span>
          )}
        </p>
        <ButtonLink href={quoteHref(quoteId)} size="lg" arrow>
          {dev ? c.earlyAccess : from !== undefined ? c.orderOrAsk : c.askQuote}
        </ButtonLink>
        {product.siteUrl && (
          <ButtonLink href={product.siteUrl} variant="link">
            {c.visit} {product.siteUrl.replace(/^https?:\/\/(www\.)?/, "")}
          </ButtonLink>
        )}
      </PageHeader>

      {/* Photos + overview */}
      <section>
        <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
          {photos.length > 0 && (
            <div className="md:col-span-7">
              <ProductGallery photos={photos} priority />
              {product.credits && <p className="caption mt-4">{product.credits}</p>}
            </div>
          )}
          {photos.length === 0 && product.illustration === "taktic" && (
            <figure className="md:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-hairline bg-card shadow-card sm:aspect-[16/10]">
                <TakticPreview lang={lang} className="absolute inset-0" />
              </div>
              <figcaption className="caption mt-3">{c.illustration}</figcaption>
            </figure>
          )}
          <div className={photos.length > 0 || product.illustration ? "md:col-span-5" : "md:col-span-7"}>
            <div className="space-y-4 text-lg leading-relaxed text-graphite">
              {product.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="card mt-8 divide-y divide-hairline px-5 text-[15px]">
              {[
                { label: c.madeBy, value: product.maker },
                { label: c.category, value: product.category },
                { label: c.for, value: product.audience.join(lang === "th" ? " · " : ", ") },
              ].map((r) => (
                <div key={r.label} className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                  <dt className="text-graphite">{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-3">
                <dt className="text-graphite">{dev ? c.status : c.price}</dt>
                <dd>
                  {dev ? (
                    c.devStatus
                  ) : from !== undefined ? (
                    <span className="font-mono font-semibold tabular-nums text-ink">
                      {multi ? `${formatTHB(from)} ${c.to} ${formatTHB(Math.max(...product.models.map((m) => m.priceTHB ?? 0)))}` : formatTHB(from)}
                    </span>
                  ) : (
                    c.onRequestShort
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
        <Band label={c.featuresLabel} title={c.featuresTitle(name)}>
          <dl className="card divide-y divide-hairline">
            {product.features.map((f) => (
              <div key={f.title} className="grid gap-1 px-5 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6 sm:px-6">
                <dt className="font-semibold">{f.title}</dt>
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
          label={c.model3dLabel}
          title={product.model3d.kind === "so101" ? c.model3dArms : c.model3dRobot}
          aside={
            product.model3d.kind === "so101"
              ? c.model3dArmsNote
              : c.model3dRobotNote
          }
        >
          <Product3DViewer model={product.model3d} />
        </Band>
      )}

      {/* Specs + in the box */}
      {(product.specs.length > 0 || product.inTheBox.length > 0) && (
        <Band
          id="specs"
          label={c.specsLabel}
          title={multi ? c.specsShared : c.specsLabel}
          aside={multi ? c.specsPerKit : undefined}
        >
          <SpecTable specs={[...product.specs, ...(single?.specs ?? [])]} />
          {product.inTheBox.length > 0 && (
            <div className="mt-12">
              <h3 className="mb-3 text-[1.25rem] font-semibold tracking-tightish">{c.inTheBox}</h3>
              <InTheBox items={product.inTheBox} lang={lang} />
            </div>
          )}
        </Band>
      )}

      {/* Models */}
      {multi && (
        <Band
          id="kits"
          wide
          label={c.kitsLabel}
          title={c.kitsTitle(product.models.length, product.name)}
          aside={product.priceNote}
        >
          <KitComparisonTable product={product} lang={lang} caption={c.kitsCaption(product.name)} />
          <div className="mt-14">
            {product.models.map((m) => (
              <KitBlock key={m.id} product={product} model={m} lang={lang} />
            ))}
          </div>
        </Band>
      )}

      {/* Use cases, links, support */}
      {(product.useCases.length > 0 || product.links.length > 0) && (
      <Band label={c.useLabel} title={product.useCases.length > 0 ? c.useTitle : c.linksTitle}>
        <div className="grid gap-10 sm:grid-cols-2">
          {product.useCases.length > 0 && (
            <div>
              <h3 className="mb-3 text-[15px] font-semibold">{c.useCases}</h3>
              <ul className="card divide-y divide-hairline px-5">
                {product.useCases.map((u) => (
                  <li key={u} className="py-3">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.links.length > 0 && (
            <div>
              <h3 className="mb-3 text-[15px] font-semibold">{hardware ? c.upstream : c.website}</h3>
              <ul className="card divide-y divide-hairline px-5">
                {product.links.map((l) => (
                  <li key={l.href} className="py-3">
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="link">
                      {l.label}
                    </a>
                    <span className="caption ml-2 font-normal">{new URL(l.href).hostname.replace(/^www\./, "")}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Band>
      )}

      {hardware && (
      <Band label={c.supportLabel} title={c.supportTitle}>
        <dl className="card divide-y divide-hairline">
          {getProductSupport(lang).map((s) => (
            <div key={s.title} className="grid gap-1 px-5 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6 sm:px-6">
              <dt className="font-semibold">{s.title}</dt>
              <dd className="leading-relaxed text-graphite">{s.description}</dd>
            </div>
          ))}
        </dl>
      </Band>
      )}

      {/* Related */}
      <Band wide label={c.relatedLabel} title={c.relatedTitle}>
        <ul className="grid gap-6 sm:grid-cols-2">
          {related.map((p) => {
            const start = startingPrice(p);
            return (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="card card-hover group grid h-full grid-cols-[6.5rem_1fr] gap-4 p-3 sm:grid-cols-[9rem_1fr] sm:gap-5"
                >
                  <span className="relative block aspect-square overflow-hidden rounded-lg bg-paper-3">
                    {p.image && (
                      <Image src={p.image} alt="" fill sizes="9rem" className="object-cover mix-blend-multiply" />
                    )}
                    {!p.image && p.illustration === "taktic" && <TakticPreview compact lang={lang} className="absolute inset-0" />}
                  </span>
                  <span className="py-1 pr-2">
                    <span className="caption block">{p.category}</span>
                    <span className="mt-0.5 block text-[1.2rem] font-semibold tracking-tightish transition-colors duration-200 group-hover:text-cyan-700">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-graphite">{p.tagline}</span>
                    <span className="mt-2 block font-mono text-[14px] tabular-nums">
                      {p.status === "in-development" ? (
                        <span className="text-graphite">{c.devShort}</span>
                      ) : start !== undefined ? (
                        <span className="font-semibold text-ink">{c.from}{formatTHB(start)}</span>
                      ) : (
                        <span className="text-graphite">{c.onRequest}</span>
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
        lang={lang}
        title={dev ? c.ctaDevTitle(name) : from !== undefined ? c.ctaKitTitle(name) : c.ctaQuoteTitle(name)}
        description={dev ? c.ctaDevText(name) : from !== undefined ? c.ctaKitText : c.ctaQuoteText}
        primary={{ label: c.ctaLabel(name), href: quoteHref(quoteId) }}
      />
    </>
  );
}
