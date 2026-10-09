type Props = {
  /** Small uppercase label above the title, e.g. "Services". */
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
  /** The short Gradient C bar under the title (CI heading pattern). */
  bar?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/** Section label: uppercase, tracked, with a cyan circuit node in front. */
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
    <p className={`label ${tone === "night" ? "!text-cyan-200" : ""} ${className}`}>
      <span>
        {children}
        {th && (
          <span lang="th" className="normal-case tracking-normal">
            {" "}
            · {th}
          </span>
        )}
      </span>
    </p>
  );
}

/** @deprecated alias of Label. */
export const Eyebrow = Label;

/**
 * Heading block in the CI pattern: label, title, optional Thai subtitle, a
 * short Gradient C bar, then the description. h1 uses the Display style
 * (56/68 bold), h2 the H1 style (40/52 semibold).
 */
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
  bar = true,
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
        className={`text-balance ${night ? "text-white" : "text-ink"} ${
          Tag === "h1"
            ? "text-[2.5rem] font-bold leading-[1.15] tracking-display sm:text-5xl sm:leading-[1.15] lg:text-display"
            : "text-[2rem] font-semibold leading-[1.25] tracking-heading sm:text-h1"
        }`}
      >
        {title}
      </Tag>
      {titleTh && (
        <p lang="th" className={`mt-2 text-lg leading-snug sm:text-xl ${night ? "text-night-muted" : "text-ink-600"}`}>
          {titleTh}
        </p>
      )}
      {bar && <span aria-hidden className={`accent-bar mt-5 ${night ? "!bg-gradient-a" : ""} ${center ? "mx-auto" : ""}`} />}
      {description && (
        <div
          className={`mt-5 max-w-[40rem] text-[17px] leading-[1.75] ${night ? "text-night-muted" : "text-ink-700"} ${center ? "mx-auto" : ""}`}
        >
          {description}
        </div>
      )}
      {children}
    </div>
  );
}
