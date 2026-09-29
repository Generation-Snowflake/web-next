import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageFrame from "@/components/ui/ImageFrame";
import ButtonLink from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import CaseNote from "@/components/portfolio/CaseNote";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The kinds of projects GSF Robotics & AI builds: web and mobile apps, computer vision, AI automation, IoT and robot software.",
  alternates: { canonical: "/portfolio" },
};

const demos = [
  {
    href: "/power-plant",
    image: "/work/power-plant.webp",
    title: "Power plant site tour",
    caption: "FIG. 1 — /power-plant, running in the browser",
    body: "A whole power plant you can orbit and zoom around. Pick a building from the list and the camera flies to it and opens a card about it. It opens full screen and works best on a laptop or desktop.",
    stack: ["Three.js", "React Three Fiber", "Draco glTF"],
    cta: "Open the tour",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Work" }]}
        title="Work"
        description="The kinds of projects we build. We keep client names and details private, but we're happy to talk them through on a call."
      />

      <section aria-labelledby="projects" className="py-14 md:py-20">
        <Container>
          <SectionHeading label="Projects" title={<span id="projects">What we work on</span>} />
          <div className="mt-10 border-t border-ink">
            {caseStudies.map((s) => (
              <CaseNote key={s.slug} study={s} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="demos" className="border-t border-ink bg-paper-2 py-14 md:py-20">
        <Container>
          <SectionHeading
            label="Demos"
            title={<span id="demos">A demo you can open</span>}
            description="A 3D scene we built with Three.js. It runs in a normal browser, nothing to install."
          />
          <div className="mt-10 max-w-3xl">
            {demos.map((d) => (
              <article key={d.href}>
                <ImageFrame
                  src={d.image}
                  alt={`Screenshot of the ${d.title.toLowerCase()}`}
                  caption={d.caption}
                  className="aspect-[16/10] border border-ink"
                  sizes="(min-width: 768px) 48rem, 100vw"
                />
                <h3 className="mt-6 text-2xl font-medium tracking-[-0.015em]">{d.title}</h3>
                <p className="mt-2 max-w-prose text-[17px] leading-relaxed text-graphite">{d.body}</p>
                <p className="mt-3 font-mono text-[13px] text-graphite">{d.stack.join(" · ")}</p>
                <div className="mt-5">
                  <ButtonLink href={d.href} arrow>
                    {d.cta}
                  </ButtonLink>
                </div>
              </article>
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
