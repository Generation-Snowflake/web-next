import type { Metadata } from "next";
import Link from "next/link";
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

      <section aria-labelledby="formats-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading label="Formats" title={<span id="formats-title">Who we teach</span>} />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {classFormats.map((f) => (
              <li key={f.title} className="card flex flex-col items-start p-6 sm:p-8">
                <h3 className="text-xl font-semibold tracking-heading">{f.title}</h3>
                <p className="mt-2 max-w-prose text-[17px] leading-relaxed text-graphite">{f.description}</p>
                {f.href && (
                  <ButtonLink href={f.href} variant="link" className="mt-auto pt-4">
                    {f.linkLabel}
                  </ButtonLink>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="course" aria-labelledby="course-title" className="scroll-mt-24 border-t border-hairline bg-paper-2 py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              label="Course"
              title={<span id="course-title">{mazeCourse.name}</span>}
              description={mazeCourse.summary}
            />
            <dl className="card mt-8 divide-y divide-hairline px-5 text-[15px]">
              <div className="py-3.5">
                <dt className="caption">For</dt>
                <dd className="mt-1">{mazeCourse.audience}</dd>
              </div>
              <div className="py-3.5">
                <dt className="caption">Length</dt>
                <dd className="mt-1">{mazeCourse.format}</dd>
              </div>
              <div className="py-3.5">
                <dt className="caption">Platform</dt>
                <dd className="mt-1">
                  Runs on{" "}
                  <Link href="/products/robopark" className="link">
                    RoboPark
                  </Link>
                  , our online robot simulator (in development)
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="caption">Price</dt>
                <dd className="mt-1">Quoted per group. Ask us.</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-8">
            <div className="card overflow-x-auto">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">Course outline, session by session</caption>
              <thead>
                <tr className="border-b border-hairline bg-paper-2">
                  <th scope="col" className="caption w-12 py-2.5 pl-4 pr-2 sm:pl-5">No.</th>
                  <th scope="col" className="caption py-2.5 pr-3 sm:w-44">Topic</th>
                  <th scope="col" className="caption py-2.5 pr-4 sm:pr-5">What they do</th>
                </tr>
              </thead>
              <tbody>
                {mazeCourse.sessions.map((s) => (
                  <tr key={s.n} className="border-b border-hairline align-top last:border-b-0">
                    <td className="py-3.5 pl-4 pr-2 text-[14px] font-semibold tabular-nums text-teal-ink sm:pl-5">{s.n}</td>
                    <td className="py-3.5 pr-3 font-medium">{s.topic}</td>
                    <td className="py-3.5 pr-4 leading-relaxed text-graphite sm:pr-5">{s.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            <h3 className="mt-12 text-xl font-semibold tracking-heading">What students come away with</h3>
            <ul className="mt-4 space-y-2 text-[17px] leading-relaxed text-graphite">
              {mazeCourse.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                  {o}
                </li>
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
