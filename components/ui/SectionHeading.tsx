type Props = {
  /** Small mono label above the title, e.g. "Services". Sentence case. */
  label?: string;
  /** Thai version of the label, shown after it. */
  labelTh?: string;
  /** @deprecated use `label` — kept so older call sites compile. */
  eyebrow?: string;
  title: React.ReactNode;
  /** Thai subtitle on its own line under the title. */
  titleTh?: string;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  tone?: "paper" | "night";
  className?: string;
  children?: React.ReactNode;
};

/** Mono label, e.g. "Services". No caps, no tracking, no decoration. */
export function Label({
  children,
  th,
  tone = "paper",
  className = "",
}: {
  children: React.ReactNode;
  th?: string;
  tone?: "paper" | "night";
  className?: string;
}) {
  return (
    <p className={`font-mono text-[13px] leading-5 ${tone === "night" ? "text-night-muted" : "text-graphite"} ${className}`}>
      {children}
      {th && <span lang="th"> · {th}</span>}
    </p>
  );
}

/** @deprecated alias of Label. */
export const Eyebrow = Label;

export default function SectionHeading({
  label,
  labelTh,
  eyebrow,
  title,
  titleTh,
  description,
  align = "left",
  as: Tag = "h2",
  tone = "paper",
  className = "",
  children,
}: Props) {
  const night = tone === "night";
  const center = align === "center";
  const lbl = label ?? eyebrow;
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {lbl && (
        <Label th={labelTh} tone={tone} className="mb-3">
          {lbl}
        </Label>
      )}
      <Tag
        className={`font-medium tracking-[-0.015em] ${night ? "text-night-text" : "text-ink"} ${
          Tag === "h1"
            ? "text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]"
            : "text-[1.75rem] leading-tight sm:text-4xl"
        }`}
      >
        {title}
      </Tag>
      {titleTh && (
        <p lang="th" className={`mt-2 text-lg leading-snug sm:text-xl ${night ? "text-night-muted" : "text-graphite"}`}>
          {titleTh}
        </p>
      )}
      {description && (
        <div className={`mt-4 max-w-prose text-[17px] leading-relaxed ${night ? "text-night-muted" : "text-graphite"} ${center ? "mx-auto" : ""}`}>
          {description}
        </div>
      )}
      {children}
    </div>
  );
}
