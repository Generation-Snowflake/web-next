import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import TakticPreview from "@/components/products/TakticPreview";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Lang } from "@/lib/i18n";
import { formatTHB, getProducts, startingPrice } from "@/lib/products";

const copy = {
  en: {
    label: "Products",
    title: "What we sell",
    description: "Robot kits and a learning platform for kids, research robots for AI labs, and our own software.",
    all: "All products",
    dev: "In development",
    from: "From ",
    onRequest: "Price on request",
    models: "models",
    details: "Details",
  },
  th: {
    label: "สินค้า",
    title: "สินค้าของเรา",
    description: "ชุดหุ่นยนต์และแพลตฟอร์มการเรียนรู้สำหรับเด็ก หุ่นยนต์วิจัยสำหรับห้องแล็บ AI และซอฟต์แวร์ที่เราพัฒนาเอง",
    all: "สินค้าทั้งหมด",
    dev: "อยู่ระหว่างพัฒนา",
    from: "เริ่มต้น ",
    onRequest: "สอบถามราคา",
    models: "รุ่น",
    details: "ดูรายละเอียด",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function RobotsWeSell({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const products = getProducts(lang);
  return (
    <section aria-labelledby="robots-title" className="bg-paper">
      <Container className="py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label={c.label}
            title={<span id="robots-title">{c.title}</span>}
            description={c.description}
          />
          <ButtonLink href="/products" variant="link">
            {c.all}
          </ButtonLink>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {products.map((p, i) => {
            const image = p.image ?? p.models.find((m) => m.image)?.image;
            const from = formatTHB(startingPrice(p));
            return (
              <Reveal as="li" key={p.slug} delay={(i % 3) * 80} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <Link href={`/products/${p.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
                  <span className={`relative block overflow-hidden border-b border-hairline bg-paper-3 ${i < 2 ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[4/3]"}`}>
                    {image ? (
                      <Image
                        src={image}
                        alt={`${p.name}, ${p.category.toLowerCase()}`}
                        fill
                        sizes="(min-width: 1024px) 40rem, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-[center_30%] transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    ) : p.illustration === "taktic" ? (
                      <TakticPreview lang={lang} className="absolute inset-0" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-semibold tracking-heading text-graphite/70">{p.name}</span>
                      </span>
                    )}
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="caption">{p.category}</span>
                    <span className="mt-1 text-xl font-semibold tracking-heading transition-colors duration-200 group-hover:text-cyan-700">
                      {p.name}
                    </span>
                    <span className="mb-5 mt-2 text-[15px] leading-relaxed text-graphite">{p.summary}</span>
                    <span className="mt-auto flex items-baseline justify-between gap-4 border-t border-hairline pt-4">
                      {p.status === "in-development" ? (
                        <span className="chip-info">{c.dev}</span>
                      ) : from ? (
                        <span className="text-[15px]">
                          <span className="text-graphite">{c.from}</span>
                          <span className="font-mono text-[17px] font-semibold tabular-nums text-ink">{from}</span>
                        </span>
                      ) : (
                        <span className="text-[15px] text-graphite">{c.onRequest}</span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-ink">
                        {p.models.length > 1 ? `${p.models.length} ${c.models} ` : `${c.details} `}
                        <ArrowRight aria-hidden weight="bold" className="h-4 w-4 shrink-0 text-cyan-600 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
