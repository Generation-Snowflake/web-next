import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { alternates, langFrom, ogLocale, type Lang, type LangParams } from "@/lib/i18n";
import { formatTHB, getProductGroups, getProductSupport, getProducts, startingPrice, type Product } from "@/lib/products";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import { Label } from "@/components/ui/SectionHeading";
import Band from "@/components/products/Band";
import TakticPreview from "@/components/products/TakticPreview";
import SpecTable from "@/components/products/SpecTable";
import KitComparisonTable from "@/components/products/KitComparisonTable";
import { priceNoteDetail, productQuoteId, quoteHref } from "@/components/products/productUi";

const copy = {
  en: {
    metaTitle: "Products",
    metaDescription:
      "Products from GSF: Makerzoid STEM kits and the RoboPark learning platform for kids, the Armo and ArmoGo research robots, and the Taktic project management tool.",
    title: "Products",
    description:
      "Robot kits for schools, research robots for labs, and software we build ourselves. We import the hardware, set it up if you want, and answer questions after you buy.",
    navLabel: "Products",
    devShort: "in development",
    from: (price: string) => `from ${price}`,
    onRequestShort: "price on request",
    devLong: "In development · testing with early users",
    to: "to",
    onRequest: "Price on request",
    details: (name: string) => `${name} details`,
    visit: "Visit",
    earlyAccess: "Ask for early access",
    orderOrAsk: "Order or ask",
    askPrice: "Ask for a price",
    compared: (n: number) => `The ${n} kits compared`,
    comparedNote: "Ordered from first kit to competition kit. Prices in Thai baht. Tap a kit for photos and the full box list.",
    comparedCaption: (name: string) => `${name} kits compared`,
    supportLabel: "From us",
    supportTitle: "What we add to the hardware",
    servicesPre: "Need a robot built for a specific job instead? See ",
    servicesLink: "our engineering services",
    servicesPost: ".",
    ctaTitle: "Ask which kit or robot fits",
    ctaDescription:
      "Tell us who will use it, how many students or engineers, and when you need it. We reply with a recommendation and a price.",
    ctaLabel: "Ask for a quote",
  },
  th: {
    metaTitle: "สินค้า",
    metaDescription:
      "สินค้าจาก GSF: ชุดหุ่นยนต์ STEM Makerzoid และแพลตฟอร์มการเรียนรู้ RoboPark สำหรับเด็ก หุ่นยนต์วิจัย Armo และ ArmoGo และเครื่องมือบริหารโปรเจกต์ Taktic",
    title: "สินค้า",
    description:
      "ชุดหุ่นยนต์สำหรับโรงเรียน หุ่นยนต์วิจัยสำหรับห้องแล็บ และซอฟต์แวร์ที่เราพัฒนาเอง เรานำเข้าฮาร์ดแวร์ ติดตั้งให้ถ้าต้องการ และตอบคำถามหลังการขาย",
    navLabel: "สินค้า",
    devShort: "อยู่ระหว่างพัฒนา",
    from: (price: string) => `เริ่มต้น ${price}`,
    onRequestShort: "สอบถามราคา",
    devLong: "อยู่ระหว่างพัฒนา · ทดสอบกับผู้ใช้กลุ่มแรก",
    to: "ถึง",
    onRequest: "สอบถามราคา",
    details: (name: string) => `รายละเอียด ${name}`,
    visit: "ไปที่",
    earlyAccess: "ขอทดลองใช้ก่อนใคร",
    orderOrAsk: "สั่งซื้อหรือสอบถาม",
    askPrice: "สอบถามราคา",
    compared: (n: number) => `เปรียบเทียบทั้ง ${n} ชุด`,
    comparedNote: "เรียงจากชุดแรกไปจนถึงชุดแข่งขัน ราคาเป็นเงินบาท แตะที่ชุดเพื่อดูรูปและรายการของในกล่องทั้งหมด",
    comparedCaption: (name: string) => `เปรียบเทียบชุด ${name}`,
    supportLabel: "บริการจากเรา",
    supportTitle: "สิ่งที่เราเพิ่มให้นอกจากตัวฮาร์ดแวร์",
    servicesPre: "ต้องการหุ่นยนต์ที่สร้างมาเพื่องานเฉพาะ? ดู",
    servicesLink: "บริการด้านวิศวกรรมของเรา",
    servicesPost: "",
    ctaTitle: "ถามเราได้ว่าชุดไหนหรือหุ่นยนต์ตัวไหนเหมาะ",
    ctaDescription:
      "บอกเราว่าใครจะเป็นคนใช้ มีนักเรียนหรือวิศวกรกี่คน และต้องการใช้เมื่อไร แล้วเราจะแนะนำรุ่นที่เหมาะพร้อมราคา",
    ctaLabel: "ขอใบเสนอราคา",
  },
};

type Copy = (typeof copy)[Lang];

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const lang = await langFrom(params);
  const c = copy[lang];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: alternates("/products", lang),
    openGraph: {
      title: `${c.metaTitle} | GSF Robotics & AI`,
      description: c.metaDescription,
      url: alternates("/products", lang).canonical as string,
      locale: ogLocale[lang],
    },
  };
}

/** Heading block of one product line: photo left, facts right. */
function LineIntro({
  product,
  c,
  lang,
  priority = false,
  specs = 0,
}: {
  product: Product;
  c: Copy;
  lang: Lang;
  priority?: boolean;
  specs?: number;
}) {
  const from = startingPrice(product);
  const dev = product.status === "in-development";
  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      {(product.image || product.illustration) && (
      <figure className="md:col-span-6">
        <Link
          href={`/products/${product.slug}`}
          className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-hairline bg-paper-3 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
        >
          {product.illustration === "taktic" && <TakticPreview lang={lang} className="absolute inset-0" />}
          {product.image && (
            <Image
              src={product.image}
              alt={product.imageAlt ?? product.name}
              fill
              sizes="(min-width: 768px) 40rem, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              priority={priority}
            />
          )}
        </Link>
        <figcaption className="sr-only">{product.imageAlt ?? product.name}</figcaption>
      </figure>
      )}
      <div className={product.image || product.illustration ? "md:col-span-6" : "md:col-span-8"}>
        <Label>
          {product.category} · {product.maker}
        </Label>
        <h3 className="mt-2 text-[1.75rem] font-semibold leading-tight tracking-heading sm:text-[2.25rem]">
          <Link href={`/products/${product.slug}`} className="transition-colors duration-200 hover:text-cyan-700">
            {product.name}
          </Link>
        </h3>
        <p className="mt-3 max-w-prose text-lg leading-relaxed text-graphite">{product.summary}</p>
        <p className="mt-5 text-[15px]">
          {dev ? (
            <span className="chip-info">{c.devLong}</span>
          ) : from !== undefined ? (
            <span className="font-mono text-[18px] font-semibold tabular-nums text-ink">
              {formatTHB(from)} {c.to} {formatTHB(Math.max(...product.models.map((m) => m.priceTHB ?? 0)))}
            </span>
          ) : (
            <span className="font-medium">{c.onRequest}</span>
          )}
        </p>
        {!dev && product.priceNote && (
          <p className="mt-1 max-w-prose text-[14px] text-graphite">
            {from !== undefined ? product.priceNote : priceNoteDetail(product.priceNote)}
          </p>
        )}
        {specs > 0 && <SpecTable specs={product.specs.slice(0, specs)} className="mt-6" />}
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={`/products/${product.slug}`} variant="outline">
            {c.details(product.name)}
          </ButtonLink>
          {product.siteUrl && (
            <ButtonLink href={product.siteUrl} variant="link">
              {c.visit} {product.siteUrl.replace(/^https?:\/\/(www\.)?/, "")}
            </ButtonLink>
          )}
          <ButtonLink href={quoteHref(productQuoteId(product))} variant="link">
            {dev ? c.earlyAccess : from !== undefined ? c.orderOrAsk : c.askPrice}
          </ButtonLink>
        </div>
        {product.credits && <p className="caption mt-6">{product.credits}</p>}
      </div>
    </div>
  );
}

export default async function ProductsPage({ params }: { params: LangParams }) {
  const lang = await langFrom(params);
  const c = copy[lang];
  const products = getProducts(lang);
  return (
    <>
      <PageHeader lang={lang} crumbs={[{ label: c.title }]} title={c.title} description={c.description}>
        <nav aria-label={c.navLabel} className="w-full">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((p) => {
              const from = startingPrice(p);
              return (
                <li key={p.slug}>
                  <a href={`#${p.slug}`} className="card card-hover group block h-full px-4 py-3.5">
                    <span className="block font-semibold tracking-tightish transition-colors duration-200 group-hover:text-cyan-700">{p.name}</span>
                    <span className="caption block">
                      {p.status === "in-development"
                        ? c.devShort
                        : from !== undefined
                          ? c.from(formatTHB(from) as string)
                          : c.onRequestShort}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageHeader>

      {getProductGroups(lang).map((g) => {
        const items = products.filter((p) => p.group === g.id);
        if (!items.length) return null;
        return (
          <div key={g.id} className="border-t border-hairline">
            <Container className="pt-16 md:pt-24">
              <h2 className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading sm:text-[2.5rem]">{g.title}</h2>
              <p className="mt-3 max-w-prose text-lg text-graphite">{g.description}</p>
            </Container>
            {items.map((p, i) => (
              <section key={p.slug} id={p.slug} className={`scroll-mt-24 ${i > 0 ? "border-t border-hairline" : ""}`}>
                <Container className="py-12 md:py-16">
                  <LineIntro product={p} c={c} lang={lang} priority={p.slug === products[0].slug} specs={p.models.length > 1 ? 0 : 5} />
                  {p.models.length > 1 && (
                    <div className="mt-14">
                      <h4 className="text-[1.25rem] font-semibold tracking-tightish">{c.compared(p.models.length)}</h4>
                      <p className="mb-5 mt-1 text-[15px] text-graphite">
                        {c.comparedNote}
                      </p>
                      <KitComparisonTable product={p} lang={lang} caption={c.comparedCaption(p.name)} />
                    </div>
                  )}
                </Container>
              </section>
            ))}
          </div>
        );
      })}

      <Band label={c.supportLabel} title={c.supportTitle} tone="paper-2">
        <dl className="card divide-y divide-hairline">
          {getProductSupport(lang).map((s) => (
            <div key={s.title} className="grid gap-1 px-5 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6 sm:px-6">
              <dt className="font-semibold">{s.title}</dt>
              <dd className="leading-relaxed text-graphite">{s.description}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[15px] text-graphite">
          {c.servicesPre}
          {lang === "en" ? " " : ""}
          <Link href="/services" className="link">
            {c.servicesLink}
          </Link>
          {c.servicesPost}
        </p>
      </Band>

      <CtaBand
        lang={lang}
        title={c.ctaTitle}
        description={c.ctaDescription}
        primary={{ label: c.ctaLabel, href: "/contact?interest=product" }}
      />
    </>
  );
}
