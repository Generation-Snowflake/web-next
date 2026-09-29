import Container from "@/components/ui/Container";
import { Label } from "@/components/ui/SectionHeading";

/**
 * A product-page section: hairline on top, heading in a narrow left
 * column, content on the right. `wide` puts the content under the heading
 * at full width instead (tables, 3D viewer).
 */
export default function Band({
  id,
  label,
  labelTh,
  title,
  aside,
  wide = false,
  tone = "paper",
  className = "",
  children,
}: {
  id?: string;
  label?: string;
  labelTh?: string;
  title: React.ReactNode;
  /** Extra content under the heading (left column). */
  aside?: React.ReactNode;
  wide?: boolean;
  tone?: "paper" | "paper-2";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-hairline ${tone === "paper-2" ? "bg-paper-2" : ""} ${className}`}>
      <Container className={`py-16 md:py-24 ${wide ? "" : "grid gap-8 md:grid-cols-12 md:gap-12"}`}>
        <div className={wide ? "mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-3" : "md:col-span-4"}>
          <div>
            {label && label !== title && (
              <Label th={labelTh} className="mb-3">
                {label}
              </Label>
            )}
            <h2 className="text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-heading sm:text-[2.25rem]">{title}</h2>
          </div>
          {aside && <div className={wide ? "max-w-prose text-[16px] leading-relaxed text-graphite" : "mt-4 text-[16px] leading-relaxed text-graphite"}>{aside}</div>}
        </div>
        <div className={wide ? "" : "md:col-span-8"}>{children}</div>
      </Container>
    </section>
  );
}
