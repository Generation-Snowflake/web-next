import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type { Lang } from "@/lib/i18n";
import { getClassFormats, getMazeCourse } from "@/lib/training";

const copy = {
  en: {
    label: "Classes",
    title: "We teach robotics too",
    description: "Coding and robot classes for kids, school clubs, colleges and teachers.",
    link: "Robotics classes",
  },
  th: {
    label: "คอร์สเรียน",
    title: "เราสอนหุ่นยนต์ด้วย",
    description: "คลาสเขียนโปรแกรมและหุ่นยนต์สำหรับเด็ก ชมรมในโรงเรียน วิทยาลัย และครู",
    link: "คอร์สหุ่นยนต์",
  },
} satisfies Record<Lang, Record<string, string>>;

/** Short home-page pointer to the robotics classes page. */
export default function Classes({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const mazeCourse = getMazeCourse(lang);
  const classFormats = getClassFormats(lang);
  return (
    <section aria-labelledby="classes-title" className="border-t border-hairline bg-paper-2">
      <Container className="grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading
            label={c.label}
            title={<span id="classes-title">{c.title}</span>}
            description={c.description}
          />
          <ButtonLink href="/training" variant="link" className="mt-6">
            {c.link}
          </ButtonLink>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={80}>
          <div className="card p-6 sm:p-8">
            <span className="chip-info">{mazeCourse.format}</span>
            <h3 className="mt-3 text-2xl font-semibold tracking-heading">{mazeCourse.name}</h3>
            <p className="mt-2 max-w-prose text-[17px] leading-relaxed text-graphite">{mazeCourse.summary}</p>
          </div>
          <ul className="mt-4 grid gap-6 sm:grid-cols-2">
            {classFormats.map((f) => (
              <li key={f.title} className="card p-5 sm:p-6">
                <h4 className="font-semibold tracking-tightish">{f.title}</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-graphite">{f.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
