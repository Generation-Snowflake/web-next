import Link from "next/link";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import ImageFrame from "@/components/ui/ImageFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatTHB, products, startingPrice } from "@/lib/products";

export default function RobotsWeSell() {
  return (
    <section aria-labelledby="robots-title" className="border-t border-ink bg-paper-2">
      <Container className="py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="Products"
            labelTh="สินค้า"
            title={<span id="robots-title">Robots we sell</span>}
            titleTh="หุ่นยนต์และชุดคิทที่เราขาย"
            description="Kits for classrooms and arms for AI labs. We can assemble, calibrate and teach with them."
          />
          <ButtonLink href="/products" variant="link">
            All products
          </ButtonLink>
        </div>

        <ul className="mt-12 border-t border-ink">
          {products.map((p, i) => {
            const image = p.image ?? p.models.find((m) => m.image)?.image;
            const from = formatTHB(startingPrice(p));
            return (
              <li key={p.slug} className="grid gap-6 border-b border-hairline py-8 last:border-b-0 md:grid-cols-12 md:gap-8">
                {image && (
                  <div className="md:col-span-4">
                    <ImageFrame
                      src={image}
                      alt={`${p.name}, ${p.category.toLowerCase()}`}
                      caption={`FIG. ${i + 2} — ${p.name}`}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      fit="contain"
                    />
                  </div>
                )}
                <div className={image ? "md:col-span-5" : "md:col-span-8"}>
                  <p className="caption">{p.category}</p>
                  <h3 className="mt-1 text-2xl font-medium tracking-[-0.015em]">
                    <Link href={`/products/${p.slug}`} className="transition-colors duration-150 hover:text-teal-ink">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-prose leading-relaxed text-graphite">{p.summary}</p>
                  <dl className="mt-5 border-t border-hairline font-mono text-[13px]">
                    {p.specs.slice(0, 3).map((s) => (
                      <div key={s.label} className="grid grid-cols-[8rem_minmax(0,1fr)] gap-4 border-b border-hairline py-2">
                        <dt className="text-graphite">{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="flex flex-col items-start gap-3 md:col-span-3 md:items-end md:text-right">
                  {from ? (
                    <p className="font-mono text-[15px]">
                      <span className="text-graphite">from </span>
                      <span className="text-xl text-signal">{from}</span>
                    </p>
                  ) : (
                    <p className="font-mono text-[14px] text-graphite">Price on request</p>
                  )}
                  {p.models.length > 1 && <p className="caption">{p.models.length} models</p>}
                  <ButtonLink href={`/products/${p.slug}`} variant="link" className="mt-1">
                    {p.name} details
                  </ButtonLink>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
