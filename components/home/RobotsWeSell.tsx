import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import TakticPreview from "@/components/products/TakticPreview";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatTHB, products, startingPrice } from "@/lib/products";

export default function RobotsWeSell() {
  return (
    <section aria-labelledby="robots-title" className="bg-paper">
      <Container className="py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="Products"
            title={<span id="robots-title">What we sell</span>}
            description="Robot kits and a learning platform for kids, research robots for AI labs, and our own software."
          />
          <ButtonLink href="/products" variant="link">
            All products
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
                      <TakticPreview className="absolute inset-0" />
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
                        <span className="chip-info">In development</span>
                      ) : from ? (
                        <span className="text-[15px]">
                          <span className="text-graphite">From </span>
                          <span className="font-mono text-[17px] font-semibold tabular-nums text-ink">{from}</span>
                        </span>
                      ) : (
                        <span className="text-[15px] text-graphite">Price on request</span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-ink">
                        {p.models.length > 1 ? `${p.models.length} models ` : "Details "}
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
