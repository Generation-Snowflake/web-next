import Link from "@/components/i18n/Link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import type { Lang } from "@/lib/i18n";
import { formatTHB, getProducts } from "@/lib/products";

type Row = { key: string; name: string; maker: string; spec: string; price?: string; href: string };

const copy = {
  en: { title: "Price list", onRequest: "Price on request" },
  th: { title: "ราคาสินค้า", onRequest: "สอบถามราคา" },
} satisfies Record<Lang, Record<string, string>>;

// Every model we sell, cheapest kit first, so prices are visible on the first scroll.
const rowsFor = (lang: Lang): Row[] => getProducts(lang).filter((p) => !p.status).flatMap((p) =>
  p.models.map((m) => ({
    key: m.id,
    name: m.name,
    maker: p.name,
    spec: m.highlights[0] ?? m.tagline,
    price: formatTHB(m.priceTHB),
    href: p.models.length > 1 ? `/products/${p.slug}#${m.id}` : `/products/${p.slug}`,
  })),
);

export default function PriceStrip({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const rows = rowsFor(lang);
  const priceNote = getProducts(lang).find((p) => p.models.some((m) => m.priceTHB !== undefined))?.priceNote;
  return (
    <section aria-labelledby="price-list" className="bg-paper pb-16 md:pb-24">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 id="price-list" className="text-[15px] font-semibold text-ink">
              {c.title}
            </h2>
            {priceNote && <p className="caption">{priceNote}</p>}
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3 xl:grid-cols-6">
            {rows.map((r) => (
              <li key={r.key}>
                <Link
                  href={r.href}
                  className="card card-hover group flex h-full flex-col justify-between gap-4 p-4"
                >
                  <span className="block min-w-0">
                    <span className="caption block">{r.maker}</span>
                    <span className="mt-0.5 block font-semibold leading-snug tracking-tightish transition-colors duration-200 group-hover:text-cyan-700">
                      {r.name}
                    </span>
                    <span className="mt-1 block text-[14px] leading-snug text-graphite">{r.spec}</span>
                  </span>
                  <span
                    className={`block ${r.price ? "font-mono text-[17px] font-semibold tabular-nums text-ink" : "text-[14px] text-graphite"}`}
                  >
                    {r.price ?? c.onRequest}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
