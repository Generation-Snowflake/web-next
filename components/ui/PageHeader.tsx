import Image from "next/image";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

/**
 * Top of every sub page, styled like a CI cover: dot grid, the snowflake
 * mark as a faint watermark, breadcrumb, Display H1, lead, actions.
 */
export default function PageHeader({
  eyebrow,
  label,
  title,
  titleTh,
  description,
  crumbs,
  children,
}: {
  /** @deprecated use crumbs/label. Shown as the last breadcrumb if no crumbs. */
  eyebrow?: string;
  label?: string;
  title: React.ReactNode;
  titleTh?: string;
  description?: React.ReactNode;
  /** Breadcrumb trail after "GSF", e.g. [{label:"Products", href:"/products"}, {label:"ArmoGo"}]. */
  crumbs?: { label: string; href?: string }[];
  /** Actions or extra content under the description. */
  children?: React.ReactNode;
}) {
  const trail = crumbs ?? (label ?? eyebrow ? [{ label: (label ?? eyebrow) as string }] : []);
  return (
    <header className="relative isolate overflow-hidden border-b border-hairline-strong pb-14 pt-28 md:pb-20 md:pt-36">
      <div
        aria-hidden
        className="dot-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <Image
        src="/logo-watermark.png"
        alt=""
        width={640}
        height={640}
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-10 -z-10 hidden w-[30rem] opacity-[0.07] md:block lg:-right-16"
      />
      <Container>
        {trail.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1.5 text-[14px] font-medium text-ink-600">
            <Link href="/" className="transition-colors duration-200 hover:text-ink">
              GSF
            </Link>
            {trail.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-x-1.5">
                <CaretRight aria-hidden weight="bold" className="h-3 w-3 text-cyan-600" />
                {c.href ? (
                  <Link href={c.href} className="transition-colors duration-200 hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <SectionHeading as="h1" title={title} titleTh={titleTh} description={description}>
          {children && <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">{children}</div>}
        </SectionHeading>
      </Container>
    </header>
  );
}
