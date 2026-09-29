import Link from "next/link";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/services";

// The two things we get asked for most get their full description; the rest are one line each.
const [lead, second, ...rest] = services;
const featured = [lead, second];

export default function ServicesList() {
  return (
    <section aria-labelledby="services-title" className="border-t border-hairline bg-paper-2">
      <Container className="py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="Services"
            title={<span id="services-title">What we build</span>}
            description="Custom software for companies, often with a camera, a sensor or a robot on the other end."
          />
          <ButtonLink href="/services" variant="link">
            All services
          </ButtonLink>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {featured.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 80}>
              <Link href={`/services#${s.slug}`} className="card card-hover group flex h-full flex-col p-6 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-heading transition-colors duration-200 group-hover:text-teal-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[17px] leading-relaxed text-ink">{s.summary}</p>
                <p className="mt-3 leading-relaxed text-graphite">{s.description}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {s.stack.map((t) => (
                    <li key={t} className="chip bg-paper-2">
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-4">
          <ul className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline shadow-card sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <li key={s.slug} className="bg-paper">
                <Link href={`/services#${s.slug}`} className="group block h-full p-5 transition-colors duration-200 hover:bg-paper-2 sm:p-6">
                  <h3 className="flex items-center justify-between gap-3 font-semibold tracking-tightish">
                    <span className="transition-colors duration-200 group-hover:text-teal-ink">{s.title}</span>
                    <span aria-hidden className="text-graphite transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                      →
                    </span>
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-graphite">{s.summary}</p>
                  <p className="mt-3 text-[13px] leading-5 text-graphite">{s.stack.join(" · ")}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
