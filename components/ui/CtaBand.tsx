import Container from "./Container";
import ButtonLink from "./Button";
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
    <section className="border-t border-ink bg-paper-2">
      <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-6">
          <h2 className="text-[1.75rem] font-medium leading-tight tracking-[-0.015em] sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-graphite">{description}</p>
          <div className="mt-7">
            <ButtonLink href={primary.href} size="lg" arrow>
              {primary.label}
            </ButtonLink>
          </div>
        </div>
        <dl className="grid gap-x-8 gap-y-5 text-[15px] sm:grid-cols-2 md:col-span-6 md:pt-2">
          <div className="border-t border-hairline pt-3">
            <dt className="caption">Phone</dt>
            <dd className="mt-1 space-y-0.5">
              {site.phones.map((p) => (
                <a key={p.href} href={p.href} className="block hover:text-teal-ink">
                  {p.display}
                </a>
              ))}
            </dd>
          </div>
          <div className="border-t border-hairline pt-3">
            <dt className="caption">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${site.email}`} className="break-all hover:text-teal-ink">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="border-t border-hairline pt-3">
            <dt className="caption">Office</dt>
            <dd className="mt-1 leading-relaxed">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="link mt-1 inline-block text-[14px]">
                Open in Google Maps
              </a>
            </dd>
          </div>
          <div className="border-t border-hairline pt-3">
            <dt className="caption">Hours</dt>
            <dd className="mt-1">{site.hours}</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
