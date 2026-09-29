type Props = {
  /** Small teal label above the title, e.g. "Services". Sentence case. */
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

/** Small teal-ink label above a heading, e.g. "Services". Sentence case, no caps. */
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
    <p className={`text-[14px] font-medium leading-5 ${tone === "night" ? "text-teal" : "text-teal-ink"} ${className}`}>
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
        <Label th={labelTh} tone={tone} className="mb-4">
          {lbl}
        </Label>
      )}
      <Tag
        className={`text-balance font-semibold ${night ? "text-night-text" : "text-ink"} ${
          Tag === "h1"
            ? "text-[2.5rem] leading-[1.05] tracking-display sm:text-[3.25rem] lg:text-[4rem]"
            : "text-[2rem] leading-[1.1] tracking-heading sm:text-[2.5rem] lg:text-[2.75rem]"
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
        <div className={`mt-5 max-w-[42rem] text-lg leading-relaxed ${night ? "text-night-muted" : "text-graphite"} ${center ? "mx-auto" : ""}`}>
          {description}
        </div>
      )}
      {children}
    </div>
  );
}
