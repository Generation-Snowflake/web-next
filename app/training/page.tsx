import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import { classFormats, mazeCourse } from "@/lib/training";

const description =
  "Robotics and coding classes from GSF Robotics & AI: a 12-session maze robot course for kids, school clubs with Makerzoid kits, and LeRobot workshops for colleges.";

export const metadata: Metadata = {
  title: "Robotics classes",
  description,
  alternates: { canonical: "/training" },
  openGraph: { title: "Robotics classes | GSF Robotics & AI", description, url: "/training" },
};

export default function TrainingPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Classes" }]}
        title="Robotics classes"
        description="We teach kids and students to build and program robots. Classes are run by the same engineers who build our robot software."
      >
        <ButtonLink href="/contact?interest=classes" size="lg" arrow>
          Ask about a class
        </ButtonLink>
        <ButtonLink href="#course" variant="link">
          See the course outline
        </ButtonLink>
      </PageHeader>

      <section aria-labelledby="formats-title" className="py-14 md:py-20">
        <Container>
          <SectionHeading label="Formats" title={<span id="formats-title">Who we teach</span>} />
          <ul className="mt-10 grid border-t border-ink md:grid-cols-2">
            {classFormats.map((f, i) => (
              <li
                key={f.title}
                className={`border-b border-hairline py-6 ${i % 2 === 0 ? "md:border-r md:pr-8" : "md:pl-8"}`}
              >
                <h3 className="text-xl font-medium tracking-[-0.015em]">{f.title}</h3>
                <p className="mt-2 max-w-prose text-[17px] leading-relaxed text-graphite">{f.description}</p>
                {f.href && (
                  <ButtonLink href={f.href} variant="link" className="mt-3">
                    {f.linkLabel}
                  </ButtonLink>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="course" aria-labelledby="course-title" className="scroll-mt-24 border-t border-ink bg-paper-2 py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              label="Course"
              title={<span id="course-title">{mazeCourse.name}</span>}
              description={mazeCourse.summary}
            />
            <dl className="mt-8 space-y-4 text-[15px]">
              <div className="border-t border-hairline pt-3">
                <dt className="caption">For</dt>
                <dd className="mt-1">{mazeCourse.audience}</dd>
              </div>
              <div className="border-t border-hairline pt-3">
                <dt className="caption">Length</dt>
                <dd className="mt-1">{mazeCourse.format}</dd>
              </div>
              <div className="border-t border-hairline pt-3">
                <dt className="caption">Price</dt>
                <dd className="mt-1">Quoted per group. Ask us.</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-8">
            <table className="w-full border-t border-ink text-left text-[15px]">
              <caption className="sr-only">Course outline, session by session</caption>
              <thead>
                <tr className="border-b border-hairline">
                  <th scope="col" className="caption w-10 py-2 font-normal">No.</th>
                  <th scope="col" className="caption py-2 pr-3 font-normal sm:w-44">Topic</th>
                  <th scope="col" className="caption py-2 font-normal">What they do</th>
                </tr>
              </thead>
              <tbody>
                {mazeCourse.sessions.map((s) => (
                  <tr key={s.n} className="border-b border-hairline align-top">
                    <td className="py-3 font-mono text-[13px] text-graphite">{s.n}</td>
                    <td className="py-3 pr-3 font-medium">{s.topic}</td>
                    <td className="py-3 leading-relaxed text-graphite">{s.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="mt-12 text-xl font-medium tracking-[-0.015em]">What students come away with</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[17px] leading-relaxed text-graphite">
              {mazeCourse.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>


      <CtaBand
        title="Ask about a class for your school or group"
        description="Tell us the age range, how many students, and whether you already have kits. We'll suggest a format and send a quote."
        primary={{ label: "Ask about a class", href: "/contact?interest=classes" }}
      />
    </>
  );
}
