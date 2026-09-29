import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import CtaBand from "@/components/ui/CtaBand";
import SectionHeading from "@/components/ui/SectionHeading";
import { engagementModels, processSteps, serviceFaqs, services } from "@/lib/services";

const description =
  "Software, AI and robotics work we build for clients in Thailand: computer vision, ROS 2, machine learning, IoT, web and mobile apps, backend and data pipelines.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | GSF Robotics & AI", description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Services" }]}
        title="What we build for clients"
        titleTh="งานที่เรารับทำ"
        description="Custom software, AI and robotics projects. You bring the problem, we write the code, wire up the hardware and stay around after launch."
      >
        <ButtonLink href="/contact?interest=project" size="lg" arrow>
          Describe your project
        </ButtonLink>
        <ButtonLink href="/products" variant="link">
          See the robots we sell
        </ButtonLink>
      </PageHeader>

      <section aria-labelledby="services-list">
        <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
          <nav aria-labelledby="services-list" className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 id="services-list" className="font-mono text-[13px] text-graphite">
                {services.length} services
              </h2>
              <ol className="mt-3 border-t border-ink">
                {services.map((s) => (
                  <li key={s.slug} className="border-b border-hairline">
                    <a
                      href={`#${s.slug}`}
                      className="flex items-baseline justify-between gap-4 py-2.5 text-[15px] transition-colors duration-150 hover:text-teal-ink"
                    >
                      <span>{s.title}</span>
                      <span className="hidden font-mono text-[12px] text-graphite sm:inline lg:hidden xl:inline">
                        {s.stack.slice(0, 2).join(", ")}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="lg:col-span-8">
            {services.map((s, i) => (
              <article
                key={s.slug}
                id={s.slug}
                aria-labelledby={`${s.slug}-title`}
                className={`scroll-mt-24 ${i === 0 ? "border-t border-ink pt-8" : "mt-14 border-t border-ink pt-8"}`}
              >
                <h2 id={`${s.slug}-title`} className="text-2xl font-medium leading-tight tracking-[-0.015em] sm:text-[1.75rem]">
                  {s.title}
                </h2>
                <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-graphite">{s.description}</p>

                <div className="mt-7 grid gap-6 sm:grid-cols-[9rem_1fr]">
                  <h3 className="text-[15px] font-medium">What you get</h3>
                  <ul className="max-w-prose space-y-1.5 text-[15px] leading-relaxed">
                    {s.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <h3 className="text-[15px] font-medium">Usual tools</h3>
                  <p className="font-mono text-[13px] leading-6 text-graphite">{s.stack.join(" · ")}</p>
                </div>

                <p className="mt-7">
                  <ButtonLink href={`/contact?service=${s.slug}`} variant="link">
                    Ask about this
                  </ButtonLink>
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="billing" aria-labelledby="billing-title" className="border-t border-ink bg-paper-2">
        <Container className="py-14 md:py-20">
          <SectionHeading
            title={<span id="billing-title">How we bill</span>}
            titleTh="รูปแบบการคิดค่าบริการ"
            description="Which one fits depends on how sure you are about the scope."
          />
          <dl className="mt-10 border-t border-ink">
            {engagementModels.map((m) => (
              <div key={m.title} className="grid gap-2 border-b border-hairline py-6 md:grid-cols-12 md:gap-8">
                <dt className="md:col-span-4">
                  <span className="block text-lg font-medium">{m.title}</span>
                  <span className="mt-1 block text-[15px] text-graphite">{m.bestFor}</span>
                </dt>
                <dd className="md:col-span-8">
                  <p className="max-w-prose text-[16px] leading-relaxed">{m.description}</p>
                  <p className="mt-2 font-mono text-[13px] text-graphite">{m.points.join(" · ")}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="process-title" className="border-t border-ink">
        <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <h2 id="process-title" className="text-[1.75rem] font-medium leading-tight tracking-[-0.015em] sm:text-4xl">
              How a project runs
            </h2>
            <p lang="th" className="mt-2 text-lg text-graphite">
              ขั้นตอนการทำงาน
            </p>
            <p className="mt-6">
              <ButtonLink href="/workflow" variant="link">
                More on how we work
              </ButtonLink>
            </p>
          </div>
          <ol className="list-decimal space-y-3 pl-5 text-[16px] leading-relaxed marker:font-mono marker:text-[13px] marker:text-graphite md:col-span-8 md:pt-2">
            {processSteps.map((p) => (
              <li key={p.title} className="pl-2">
                <span className="font-medium">{p.title}.</span>{" "}
                <span className="text-graphite">{p.description}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-ink">
        <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <h2 id="faq-title" className="text-[1.75rem] font-medium leading-tight tracking-[-0.015em] sm:text-4xl">
              Questions clients ask
            </h2>
            <p lang="th" className="mt-2 text-lg text-graphite">
              คำถามที่พบบ่อย
            </p>
          </div>
          <div className="border-t border-ink md:col-span-8">
            {serviceFaqs.map((f) => (
              <details key={f.q} className="group border-b border-hairline">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-4 text-[17px] font-medium hover:text-teal-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="font-mono text-graphite group-open:hidden">
                    +
                  </span>
                  <span aria-hidden className="hidden font-mono text-graphite group-open:inline">
                    −
                  </span>
                </summary>
                <p className="max-w-prose pb-5 text-[16px] leading-relaxed text-graphite">{f.a}</p>
              </details>
            ))}
            <p className="mt-6 text-[15px] text-graphite">
              Looking for a robot to buy rather than a project?{" "}
              <Link href="/products" className="link">
                See our products
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Tell us what you need built"
        titleTh="เล่าให้เราฟังว่าอยากสร้างอะไร"
        description="A few lines is enough: what the problem is, who will use the result and when you need it. We reply with questions and a rough estimate."
        primary={{ label: "Describe your project", href: "/contact?interest=project" }}
      />
    </>
  );
}
