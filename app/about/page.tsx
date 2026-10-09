import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Circuitry, Hexagon, Snowflake } from "@phosphor-icons/react/dist/ssr";
import BrandConcept from "@/components/home/BrandConcept";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import CtaBand from "@/components/ui/CtaBand";
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
      <section className="py-20 md:py-28">
        <Container className="grid gap-6 md:grid-cols-12">
          <h2 className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading md:col-span-4">
            Why &ldquo;Generation Snowflake&rdquo;
          </h2>
          <p className="max-w-prose text-xl leading-relaxed text-graphite md:col-span-7 md:col-start-6">
            GSF stands for Generation Snowflake. We are a young team. One snowflake is small and no
            two are the same, but a lot of them together can cover a whole field. That is how we
            work: different skills, one team, and more done together than any of us would alone.
          </p>
        </Container>
      </section>

      {/* The mark (Brand Guidelines, Primary Logo) */}
      <section aria-labelledby="mark" className="border-t border-hairline-strong bg-paper-2 py-20 md:py-28">
        <Container className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 id="mark" className="text-balance text-[2rem] font-semibold leading-[1.25] tracking-heading sm:text-h1">
              The mark
            </h2>
            <span aria-hidden className="accent-bar mt-5" />
            <p className="mt-6 max-w-prose text-[17px] leading-[1.75] text-ink-700">
              Our logo puts a snowflake together with circuit traces around a hexagon: engineering, technology
              and the systems that join them.
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { icon: Snowflake, title: "Snowflake", text: "A precise structure that is flexible and can grow." },
                { icon: Circuitry, title: "Circuit", text: "The connections between data and systems." },
                { icon: Hexagon, title: "Hexagon", text: "Stability, and the structure of engineering." },
              ].map((k) => (
                <li key={k.title}>
                  <k.icon aria-hidden className="h-10 w-10 text-cyan-600" />
                  <h3 className="mt-3 text-[13px] font-bold uppercase tracking-label text-ink">{k.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-700">{k.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-5">
            <div className="corner-marks relative mx-auto aspect-square max-w-sm rounded-sm border border-hairline-strong bg-card p-10 shadow-card">
              <Image src="/logo.png" alt="The GSF Robotics and AI logo" width={512} height={512} className="h-full w-full object-contain" />
            </div>
          </div>
        </Container>
      </section>

      <BrandConcept tone="paper" />


      {/* What we do */}
      <section aria-labelledby="what" className="border-t border-hairline-strong bg-paper-2 py-20 md:py-28">
        <Container className="grid gap-10 md:grid-cols-12">
          <h2 id="what" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading md:col-span-4">
            What we do
          </h2>
          <div className="grid gap-6 text-[17px] leading-relaxed sm:grid-cols-2 md:col-span-8">
            <div className="card p-6 sm:p-7">
              <h3 className="text-xl font-semibold tracking-heading">Services</h3>
              <p className="mt-2 text-graphite">
                We build software for other companies: computer vision, ROS 2 robot control, AI
                tools, IoT dashboards, web and mobile apps. You own the code at the end.{" "}
                <Link href="/services" className="link">
                  See our services
                </Link>
              </p>
            </div>
            <div className="card p-6 sm:p-7">
              <h3 className="text-xl font-semibold tracking-heading">Products</h3>
              <p className="mt-2 text-graphite">
                We also sell robots: Makerzoid kits for schools and kids, and our Armo robot arm and
                ArmoGo dual-arm robot for universities and labs. We can assemble them and teach with them.{" "}
                <Link href="/products" className="link">
                  See the products
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Where we are */}
      <section aria-labelledby="where" className="border-t border-hairline py-20 md:py-28">
        <Container className="grid gap-8 md:grid-cols-12">
          <h2 id="where" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading md:col-span-4">
            Where we are
          </h2>
          <div className="md:col-span-8">
            <p className="text-xl font-semibold tracking-tightish">{site.address.locality}, {site.address.country}</p>
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
