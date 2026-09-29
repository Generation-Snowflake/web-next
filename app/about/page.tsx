import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import TeamList from "@/components/about/TeamList";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "GSF (Generation Snowflake) is a small team of robotics engineers in Pak Kret, Nonthaburi. Who we are, what we do, and where to find us.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "About" }]}
        title="About GSF"
        description="A small engineering team in Pak Kret, Nonthaburi. We write software for other companies and sell robots for classrooms and labs."
      />

      {/* The name */}
      <section className="py-14 md:py-20">
        <Container className="grid gap-6 md:grid-cols-12">
          <h2 className="text-[1.75rem] font-medium leading-tight tracking-[-0.015em] md:col-span-4">
            Why &ldquo;Generation Snowflake&rdquo;
          </h2>
          <p className="max-w-prose text-[17px] leading-relaxed md:col-span-7 md:col-start-6">
            GSF stands for Generation Snowflake. We are a young team. One snowflake is small and no
            two are the same, but a lot of them together can cover a whole field. That is how we
            work: three of us studied robotics engineering at KMUTNB, one looks after finance and
            operations, and we get more done together than any of us would alone.
          </p>
        </Container>
      </section>

      {/* Team */}
      <section aria-labelledby="team" className="border-t border-ink py-14 md:py-20">
        <Container>
          <SectionHeading label="Team" title={<span id="team">The people you will talk to</span>} />
          <TeamList />
        </Container>
      </section>


      {/* What we do */}
      <section aria-labelledby="what" className="border-t border-ink py-14 md:py-20">
        <Container className="grid gap-10 md:grid-cols-12">
          <h2 id="what" className="text-[1.75rem] font-medium leading-tight tracking-[-0.015em] md:col-span-4">
            What we do
          </h2>
          <div className="grid gap-8 text-[17px] leading-relaxed sm:grid-cols-2 md:col-span-8">
            <div className="border-t border-hairline pt-4">
              <h3 className="font-medium">Services</h3>
              <p className="mt-2 text-graphite">
                We build software for other companies: computer vision, ROS 2 robot control, AI
                tools, IoT dashboards, web and mobile apps. You own the code at the end.{" "}
                <Link href="/services" className="link">
                  See our services
                </Link>
              </p>
            </div>
            <div className="border-t border-hairline pt-4">
              <h3 className="font-medium">Products</h3>
              <p className="mt-2 text-graphite">
                We also sell robots: Makerzoid kits for schools and kids, and the LeRobot SO-101 arm and
                XLeRobot for universities and labs. We can assemble them and teach with them.{" "}
                <Link href="/products" className="link">
                  See the products
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Where we are */}
      <section aria-labelledby="where" className="border-t border-ink py-14 md:py-20">
        <Container className="grid gap-8 md:grid-cols-12">
          <h2 id="where" className="text-[1.75rem] font-medium leading-tight tracking-[-0.015em] md:col-span-4">
            Where we are
          </h2>
          <div className="md:col-span-8">
            <p className="text-[17px]">{site.address.locality}, {site.address.country}</p>
            <address className="mt-3 not-italic leading-relaxed text-graphite">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-3 text-[15px] text-graphite">{site.hours}</p>
            <a
              href={site.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-4 inline-block"
            >
              Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Come and meet us"
        description="Call or email before you come over, so someone is in the office. Or send the form and tell us what you need."
      />
    </>
  );
}
