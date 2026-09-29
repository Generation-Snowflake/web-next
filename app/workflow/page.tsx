import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import CtaBand from "@/components/ui/CtaBand";
import { processSteps } from "@/lib/services";

const description =
  "How GSF Robotics & AI runs a client project: a first call, a prototype of the risky part, weekly demos while we build, testing, handover and support.";

export const metadata: Metadata = {
  title: "How we work",
  description,
  alternates: { canonical: "/workflow" },
  openGraph: { title: "How we work | GSF Robotics & AI", description, url: "/workflow" },
};

export default function WorkflowPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Services", href: "/services" }, { label: "How we work" }]}
        title="How we work"
        description="Every project goes through the same steps. Small jobs move through them in a few weeks; bigger ones take longer, but you see working software along the way."
      >
        <ButtonLink href="/contact?interest=project" size="lg" arrow>
          Describe your project
        </ButtonLink>
        <ButtonLink href="/services" variant="link">
          What we build
        </ButtonLink>
      </PageHeader>

      <section aria-labelledby="steps-title">
        <Container className="py-14 md:py-20">
          <h2 id="steps-title" className="sr-only">
            Steps
          </h2>
          <ol className="border-t border-ink">
            {processSteps.map((p, i) => (
              <li key={p.title} className="grid gap-2 border-b border-hairline py-6 md:grid-cols-12 md:gap-8">
                <h3 className="text-xl font-medium tracking-[-0.015em] md:col-span-3">
                  <span className="mr-3 font-mono text-[13px] font-normal text-graphite">Step {i + 1}</span>
                  <br className="hidden md:block" />
                  {p.title}
                </h3>
                <p className="max-w-prose text-[16px] leading-relaxed md:col-span-6">{p.description}</p>
                <p className="text-[14px] md:col-span-3">
                  <span className="block text-graphite">You get</span>
                  <span className="font-mono text-[13px]">{p.output}</span>
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="comms-title" className="border-t border-ink bg-paper-2">
        <Container className="grid gap-8 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <h2 id="comms-title" className="text-[1.75rem] font-medium leading-tight tracking-[-0.015em] sm:text-4xl">
              Staying in touch
            </h2>
          </div>
          <div className="max-w-prose space-y-4 text-[17px] leading-relaxed md:col-span-8 md:pt-2">
            <p>
              While we build, we show you the software working every week. It&apos;s a demo of the real
              thing, not a slide deck, so you can try it and tell us what&apos;s wrong while it&apos;s still cheap
              to change.
            </p>
            <p className="text-graphite">
              You talk to the engineers doing the work, on whichever channel suits your team. If something
              slips or turns out harder than we thought, we tell you when we find out, along with the options.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Start with a call"
        description="Tell us the problem and what you already have. After the call we send a written summary and a rough estimate."
        primary={{ label: "Describe your project", href: "/contact?interest=project" }}
      />
    </>
  );
}
