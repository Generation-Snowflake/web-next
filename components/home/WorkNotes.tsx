import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { caseStudies } from "@/lib/work";

export default function WorkNotes() {
  return (
    <section aria-labelledby="work-title" className="border-t border-ink bg-paper">
      <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading
            label="Work"
            title={<span id="work-title">What we work on</span>}
            description="Web and mobile apps, AI, IoT and robot software. Ask us on a call about similar projects."
          />
          <ButtonLink href="/portfolio" variant="link" className="mt-6">
            All work
          </ButtonLink>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink">
            {caseStudies.map((c) => (
              <li
                key={c.slug}
                className="grid gap-1 border-b border-hairline py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
              >
                <p className="caption pt-0.5">{c.area}</p>
                <div>
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-graphite">{c.summary}</p>
                  <p className="mt-2 font-mono text-[12px] text-graphite">{c.tags.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
