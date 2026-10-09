import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import CaseNote from "@/components/portfolio/CaseNote";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The kinds of projects GSF Robotics & AI builds: web and mobile apps, computer vision, AI automation, IoT and robot software.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Work" }]}
        title="Work"
        description="The kinds of projects we build. We keep client names and details private, but we're happy to talk them through on a call."
      />

      <section aria-labelledby="projects" className="py-20 md:py-28">
        <Container>
          <SectionHeading label="Projects" title={<span id="projects">What we work on</span>} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {caseStudies.map((s, i) => (
              <CaseNote
                key={s.slug}
                study={s}
                className={i === caseStudies.length - 1 && caseStudies.length % 2 === 1 ? "sm:col-span-2" : ""}
              />
            ))}
          </div>
        </Container>
      </section>


      <CtaBand
        title="Have something like this in mind?"
        description="Tell us what the problem is, what you use now, and when you need it fixed."
      />
    </>
  );
}
