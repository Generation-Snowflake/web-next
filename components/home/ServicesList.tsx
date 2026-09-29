import { Fragment } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/services";

// The two things we get asked for most get their full description; the rest are one line each.
const [lead, second, ...rest] = services;
const featured = [lead, second];

function Stack({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t, i) => (
        <Fragment key={t}>
          <span className="whitespace-nowrap">{t}</span>
          {i < items.length - 1 && " · "}
        </Fragment>
      ))}
    </>
  );
}

export default function ServicesList() {
  return (
    <section aria-labelledby="services-title" className="bg-paper">
      <Container className="grid gap-10 pb-16 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <div className="lg:col-span-4">
          <SectionHeading
            label="Services"
            labelTh="บริการ"
            title={<span id="services-title">What we build</span>}
            titleTh="งานซอฟต์แวร์ที่เรารับทำ"
            description="Custom software for companies, often with a camera, a sensor or a robot on the other end."
          />
          <ButtonLink href="/services" variant="link" className="mt-6">
            All services
          </ButtonLink>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink">
            {featured.map((s) => (
              <li key={s.slug} className="border-b border-hairline py-7">
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
                  <h3 className="text-2xl font-medium tracking-[-0.015em]">
                    <Link href={`/services#${s.slug}`} className="transition-colors duration-150 hover:text-teal-ink">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="font-mono text-[13px] leading-6 text-graphite sm:text-right"><Stack items={s.stack} /></p>
                </div>
                <p className="mt-3 max-w-prose text-[17px] leading-relaxed">{s.summary}</p>
                <p className="mt-3 max-w-prose leading-relaxed text-graphite">{s.description}</p>
              </li>
            ))}
          </ul>
          <ul>
            {rest.map((s) => (
              <li
                key={s.slug}
                className="grid gap-1 border-b border-hairline py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6 xl:grid-cols-[11rem_minmax(0,1fr)_13rem]"
              >
                <h3 className="font-medium">
                  <Link href={`/services#${s.slug}`} className="transition-colors duration-150 hover:text-teal-ink">
                    {s.title}
                  </Link>
                </h3>
                <p className="text-[15px] leading-relaxed text-graphite">{s.summary}</p>
                <p className="font-mono text-[12px] leading-6 text-graphite sm:col-start-2 xl:col-start-auto">
                  <Stack items={s.stack} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
