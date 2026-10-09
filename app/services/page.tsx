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
        <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-12">
          <nav aria-labelledby="services-list" className="lg:col-span-4">
            <div className="card p-2 lg:sticky lg:top-24">
              <h2 id="services-list" className="px-3 pb-1 pt-2 text-[13px] font-medium text-graphite">
                {services.length} services
              </h2>
              <ol>
                {services.map((s) => (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      className="flex items-baseline justify-between gap-4 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors duration-200 hover:bg-paper-2 hover:text-cyan-700"
                    >
                      <span>{s.title}</span>
                      <span className="hidden text-[13px] font-normal text-graphite sm:inline lg:hidden xl:inline">
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
                className={`scroll-mt-24 ${i === 0 ? "" : "mt-16 border-t border-hairline pt-16"}`}
              >
                <h2 id={`${s.slug}-title`} className="text-[1.75rem] font-semibold leading-tight tracking-heading sm:text-[2rem]">
                  {s.title}
                </h2>
                <p className="mt-4 max-w-prose text-lg leading-relaxed text-graphite">{s.description}</p>

                <div className="card mt-8 grid gap-x-6 gap-y-4 p-6 sm:grid-cols-[9rem_1fr]">
                  <h3 className="text-[15px] font-semibold">What you get</h3>
                  <ul className="max-w-prose space-y-2 text-[15px] leading-relaxed">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <h3 className="border-t border-hairline pt-4 text-[15px] font-semibold sm:border-0 sm:pt-0">Usual tools</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {s.stack.map((t) => (
                      <li key={t} className="chip bg-paper-2">
                        {t}
                      </li>
                    ))}
                  </ul>
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

      <section id="billing" aria-labelledby="billing-title" className="border-t border-hairline bg-paper-2">
        <Container className="py-20 md:py-28">
          <SectionHeading
            title={<span id="billing-title">How we bill</span>}
            description="Which one fits depends on how sure you are about the scope."
          />
          <dl className="mt-12 grid gap-6 md:grid-cols-3">
            {engagementModels.map((m) => (
              <div key={m.title} className="card flex flex-col p-6 sm:p-7">
                <dt>
                  <span className="block text-xl font-semibold tracking-heading">{m.title}</span>
                  <span className="mt-1 block text-[15px] font-medium text-ink-800">{m.bestFor}</span>
                </dt>
                <dd className="mt-4 flex flex-1 flex-col">
                  <p className="mb-5 text-[16px] leading-relaxed text-graphite">{m.description}</p>
                  <ul className="mt-auto space-y-1.5 border-t border-hairline pt-4 text-[14px]">
                    {m.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5">
                        <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="process-title" className="border-t border-hairline">
        <Container className="grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <h2 id="process-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading sm:text-[2.5rem]">
              How a project runs
            </h2>
            <p className="mt-6">
              <ButtonLink href="/workflow" variant="link">
                More on how we work
              </ButtonLink>
            </p>
          </div>
          <ol className="space-y-5 text-[16px] leading-relaxed md:col-span-8 md:pt-2">
            {processSteps.map((p, i) => (
              <li key={p.title} className="flex gap-4">
                <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-cyan-50 text-[13px] font-semibold text-ink">
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold">{p.title}.</span>{" "}
                  <span className="text-graphite">{p.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-hairline bg-paper-2">
        <Container className="grid gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <h2 id="faq-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading sm:text-[2.5rem]">
              Questions clients ask
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="card divide-y divide-hairline">
            {serviceFaqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[17px] font-medium transition-colors duration-200 hover:text-cyan-700 sm:px-6 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper-2 text-graphite transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-prose px-5 pb-5 text-[16px] leading-relaxed text-graphite sm:px-6">{f.a}</p>
              </details>
            ))}
            </div>
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
        description="A few lines is enough: what the problem is, who will use the result and when you need it. We reply with questions and a rough estimate."
        primary={{ label: "Describe your project", href: "/contact?interest=project" }}
      />
    </>
  );
}
