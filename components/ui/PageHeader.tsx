import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

/** Top of every sub page: breadcrumb, big H1, lead paragraph, actions. */
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
  /** Breadcrumb trail after "GSF", e.g. [{label:"Products", href:"/products"}, {label:"XLeRobot"}]. */
  crumbs?: { label: string; href?: string }[];
  /** Actions or extra content under the description. */
  children?: React.ReactNode;
}) {
  const trail = crumbs ?? (label ?? eyebrow ? [{ label: (label ?? eyebrow) as string }] : []);
  return (
    <header className="border-b border-hairline pb-14 pt-28 md:pb-20 md:pt-36">
      <Container>
        {trail.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 text-[14px] font-medium text-graphite">
            <Link href="/" className="transition-colors duration-200 hover:text-ink">
              GSF
            </Link>
            {trail.map((c) => (
              <span key={c.label}>
                <span aria-hidden className="px-2 text-hairline-strong">
                  /
                </span>
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
