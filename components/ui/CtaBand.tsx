import Container from "./Container";
import ButtonLink from "./Button";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

/**
 * Closing contact block. Give each page its own title ("Ask about SO-101
 * price and lead time") instead of one generic slogan.
 */
export default function CtaBand({
  title = "Talk to the people who build it",
  description = "Call, email, or send the form. Tell us what you want to build or buy, and roughly when.",
  primary = { label: "Send us a message", href: "/contact" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  /** @deprecated no longer shown. */
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-paper py-16 md:py-20">
      <Container>
        <Reveal className="grid gap-10 rounded-xl border border-hairline bg-paper-2 p-6 sm:p-10 md:grid-cols-12 md:gap-12 lg:p-14">
          <div className="md:col-span-6">
            <h2 className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading sm:text-[2.5rem]">{title}</h2>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-graphite">{description}</p>
            <div className="mt-8">
              <ButtonLink href={primary.href} size="lg" arrow>
                {primary.label}
              </ButtonLink>
            </div>
          </div>
          <dl className="grid content-start gap-3 text-[15px] sm:grid-cols-2 md:col-span-6">
            <div className="rounded-lg border border-hairline bg-paper p-4">
              <dt className="caption">Phone</dt>
              <dd className="mt-1 space-y-0.5">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block font-medium transition-colors duration-200 hover:text-teal-ink">
                    {p.display}
                  </a>
                ))}
              </dd>
            </div>
            <div className="rounded-lg border border-hairline bg-paper p-4">
              <dt className="caption">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="break-all font-medium transition-colors duration-200 hover:text-teal-ink">
                  {site.email}
                </a>
              </dd>
            </div>
            <div className="rounded-lg border border-hairline bg-paper p-4">
              <dt className="caption">Office</dt>
              <dd className="mt-1 leading-relaxed">
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-block text-[14px]">
                  Open in Google Maps
                </a>
              </dd>
            </div>
            <div className="rounded-lg border border-hairline bg-paper p-4">
              <dt className="caption">Hours</dt>
              <dd className="mt-1">{site.hours}</dd>
            </div>
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
