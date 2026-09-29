import Link from "next/link";

type Variant = "primary" | "outline" | "link" | "secondary" | "ghost";
type Size = "md" | "lg";
type Tone = "paper" | "night";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-150";

// "secondary" and "ghost" are kept as aliases so older call sites still work.
const variants: Record<Tone, Record<Variant, string>> = {
  paper: {
    primary: "bg-ink text-paper hover:bg-black",
    outline: "border border-ink text-ink hover:bg-ink hover:text-paper",
    secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
    link: "link",
    ghost: "link",
  },
  night: {
    primary: "bg-night-text text-night hover:bg-white",
    outline: "border border-night-muted text-night-text hover:border-night-text",
    secondary: "border border-night-muted text-night-text hover:border-night-text",
    link: "link",
    ghost: "link",
  },
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-[15px]",
  lg: "px-5 py-3 text-base",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** Use "night" on the dark hero/footer. */
  tone?: Tone;
  /** Trailing arrow. Use on the one primary action of a section only. */
  arrow?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

/**
 * A link that looks like a button (or an underlined text link with
 * variant="link"). Internal paths use next/link; mailto:, tel: and absolute
 * URLs render a plain anchor, and external URLs open in a new tab.
 */
export default function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  tone = "paper",
  arrow = false,
  className = "",
  ...rest
}: Props) {
  const isLink = variant === "link" || variant === "ghost";
  const cls = isLink
    ? `${variants[tone][variant]} inline-flex items-center gap-1.5 ${className}`
    : `${base} ${variants[tone][variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
          →
        </span>
      )}
    </>
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
