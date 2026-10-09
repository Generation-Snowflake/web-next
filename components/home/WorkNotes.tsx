import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Lang } from "@/lib/i18n";
import { getCaseStudies } from "@/lib/work";

const copy = {
  en: {
    label: "Work",
    title: "What we work on",
    description: "Web and mobile apps, AI, IoT and robot software. Ask us on a call about similar projects.",
    all: "All work",
  },
  th: {
    label: "ผลงาน",
    title: "งานที่เราทำ",
    description: "เว็บและแอปมือถือ AI, IoT และซอฟต์แวร์หุ่นยนต์ โทรมาสอบถามเรื่องงานที่คล้ายกันได้เลย",
    all: "ผลงานทั้งหมด",
  },
} satisfies Record<Lang, Record<string, string>>;

export default function WorkNotes({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const caseStudies = getCaseStudies(lang);
  return (
    <section aria-labelledby="work-title" className="bg-paper">
      <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              label={c.label}
              title={<span id="work-title">{c.title}</span>}
              description={c.description}
            />
            <ButtonLink href="/portfolio" variant="link" className="mt-6">
              {c.all}
            </ButtonLink>
          </div>
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          {caseStudies.map((c, i) => (
            <Reveal
              as="li"
              key={c.slug}
              delay={(i % 2) * 80}
              className={`card flex flex-col p-6 ${i === caseStudies.length - 1 && caseStudies.length % 2 === 1 ? "sm:col-span-2" : ""}`}
            >
              <span className="chip self-start">{c.area}</span>
              <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tightish">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-graphite">{c.summary}</p>
              <p className="mt-auto pt-4 text-[13px] text-graphite">{c.tags.join(" · ")}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
