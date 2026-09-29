import Link from "next/link";
import Container from "@/components/ui/Container";
import { formatTHB, products } from "@/lib/products";

type Row = { key: string; name: string; maker: string; spec: string; price?: string; href: string };

// Every model we sell, cheapest kit first, so prices are visible on the first scroll.
const rows: Row[] = products.flatMap((p) =>
  p.models.map((m) => ({
    key: m.id,
    name: m.name,
    maker: p.name,
    spec: m.highlights[0] ?? m.tagline,
    price: formatTHB(m.priceTHB),
    href: p.models.length > 1 ? `/products/${p.slug}#${m.id}` : `/products/${p.slug}`,
  })),
);

const priceNote = products.find((p) => p.models.some((m) => m.priceTHB !== undefined))?.priceNote;

export default function PriceStrip() {
  return (
    <section aria-labelledby="price-list" className="border-b border-ink bg-paper">
      <Container className="pb-8 pt-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h2 id="price-list" className="font-mono text-[13px] text-graphite">
            Price list
          </h2>
          {priceNote && <p className="caption">{priceNote}</p>}
        </div>
        {/* Each cell draws its own top/left hairline; the list clips the ones on the outer edge. */}
        <ul className="mt-4 grid grid-cols-1 overflow-hidden border-t border-ink sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {rows.map((r) => (
            <li key={r.key} className="-ml-px -mt-px border-l border-t border-hairline">
              <Link
                href={r.href}
                className="group flex h-full items-baseline justify-between gap-4 py-3.5 sm:block sm:px-4 sm:py-4"
              >
                <span className="block min-w-0">
                  <span className="block font-mono text-[12px] text-graphite">{r.maker}</span>
                  <span className="block font-medium leading-snug transition-colors duration-150 group-hover:text-teal-ink">
                    {r.name}
                  </span>
                  <span className="mt-0.5 block text-[14px] leading-snug text-graphite">{r.spec}</span>
                </span>
                <span
                  className={`block shrink-0 font-mono sm:mt-2 ${r.price ? "text-[17px] text-signal" : "text-[13px] text-graphite"}`}
                >
                  {r.price ?? "Price on request"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
