import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/Button";
import { classFormats, mazeCourse } from "@/lib/training";

/** Short home-page pointer to the robotics classes page. */
export default function Classes() {
  return (
    <section aria-labelledby="classes-title" className="border-t border-ink bg-paper">
      <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading
            label="Classes"
            title={<span id="classes-title">We teach robotics too</span>}
            description="Coding and robot classes for kids, school clubs, colleges and teachers."
          />
          <ButtonLink href="/training" variant="link" className="mt-6">
            Robotics classes
          </ButtonLink>
        </div>
        <div className="lg:col-span-8">
          <div className="border-t border-ink py-5">
            <p className="caption">{mazeCourse.format}</p>
            <h3 className="mt-1 text-xl font-medium tracking-[-0.015em]">{mazeCourse.name}</h3>
            <p className="mt-2 max-w-prose text-[17px] leading-relaxed text-graphite">{mazeCourse.summary}</p>
          </div>
          <ul className="grid border-t border-hairline sm:grid-cols-2">
            {classFormats.map((f, i) => (
              <li key={f.title} className={`border-b border-hairline py-4 ${i % 2 === 0 ? "sm:pr-6" : "sm:pl-6"}`}>
                <h4 className="font-medium">{f.title}</h4>
                <p className="mt-1 text-[15px] leading-relaxed text-graphite">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
