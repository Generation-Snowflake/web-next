import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "@/components/i18n/Link";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Lang } from "@/lib/i18n";
import { getServices } from "@/lib/services";

const copy = {
  en: {
    label: "Services",
    title: "What we build",
    description: "Custom software for companies, often with a camera, a sensor or a robot on the other end.",
    all: "All services",
  },
  th: {
    label: "บริการ",
    title: "สิ่งที่เราสร้าง",
    description: "ซอฟต์แวร์ที่พัฒนาเฉพาะให้แต่ละองค์กร ซึ่งหลายงานต้องทำงานร่วมกับกล้อง เซนเซอร์ หรือหุ่นยนต์",
    all: "บริการทั้งหมด",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function ServicesList({ lang }: { lang: Lang }) {
  const c = copy[lang];
  // The two things we get asked for most get their full description; the rest are one line each.
  const [lead, second, ...rest] = getServices(lang);
  const featured = [lead, second];
  return (
    <section aria-labelledby="services-title" className="border-t border-hairline bg-paper-2">
      <Container className="py-20 md:py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label={c.label}
            title={<span id="services-title">{c.title}</span>}
            description={c.description}
          />
          <ButtonLink href="/services" variant="link">
            {c.all}
          </ButtonLink>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 80}>
              <Link href={`/services#${s.slug}`} className="card card-hover group flex h-full flex-col p-6 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-heading transition-colors duration-200 group-hover:text-cyan-700">
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

        <Reveal className="mt-6">
          <ul className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline shadow-card sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((s) => (
              <li key={s.slug} className="bg-card">
                <Link href={`/services#${s.slug}`} className="group block h-full p-5 transition-colors duration-200 hover:bg-cyan-50/60 sm:p-6">
                  <h3 className="flex items-center justify-between gap-3 font-semibold tracking-tightish">
                    <span className="transition-colors duration-200 group-hover:text-cyan-700">{s.title}</span>
                    <ArrowRight aria-hidden weight="bold" className="h-4 w-4 shrink-0 text-cyan-600 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
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
