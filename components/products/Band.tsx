import Container from "@/components/ui/Container";
import { Label } from "@/components/ui/SectionHeading";

/**
 * A ruled datasheet section: ink rule on top, heading in a narrow left
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
    <section id={id} className={`scroll-mt-24 border-t border-ink ${tone === "paper-2" ? "bg-paper-2" : ""} ${className}`}>
      <Container className={`py-12 md:py-16 ${wide ? "" : "grid gap-8 md:grid-cols-12 md:gap-10"}`}>
        <div className={wide ? "mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-3" : "md:col-span-4"}>
          <div>
            {label && (
              <Label th={labelTh} className="mb-2">
                {label}
              </Label>
            )}
            <h2 className="text-[1.6rem] font-medium leading-tight tracking-[-0.015em] sm:text-[2rem]">{title}</h2>
          </div>
          {aside && <div className={wide ? "max-w-prose text-[15px] text-graphite" : "mt-4 text-[15px] leading-relaxed text-graphite"}>{aside}</div>}
        </div>
        <div className={wide ? "" : "md:col-span-8"}>{children}</div>
      </Container>
    </section>
  );
}
