import Link from "next/link";

type Variant = "primary" | "outline" | "link" | "secondary" | "ghost";
type Size = "md" | "lg";
type Tone = "paper" | "night";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[background-color,border-color,color,box-shadow] duration-200 ease-out";

const light: Record<Variant, string> = {
  primary: "bg-ink text-white shadow-xs hover:bg-[#26282C]",
  outline: "border border-hairline-strong bg-paper text-ink shadow-xs hover:border-graphite/40 hover:bg-paper-2",
  secondary: "border border-hairline-strong bg-paper text-ink shadow-xs hover:border-graphite/40 hover:bg-paper-2",
  link: "text-teal-ink font-medium transition-colors duration-200 hover:text-ink",
  ghost: "text-teal-ink font-medium transition-colors duration-200 hover:text-ink",
};

// "secondary" and "ghost" are aliases so older call sites still work. The
// site has no dark surfaces any more, so tone="night" renders the light
// variants (kept so existing call sites compile).
const variants: Record<Tone, Record<Variant, string>> = {
  paper: light,
  night: light,
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-[15px]",
  lg: "h-12 px-5 text-base",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** @deprecated no dark surfaces remain; "night" renders like "paper". */
  tone?: Tone;
  /** Trailing arrow on solid/outline buttons. Text links always get one. */
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
    ? `group ${variants[tone][variant]} inline-flex items-center gap-1.5 ${className}`
    : `${base} ${variants[tone][variant]} ${sizes[size]} ${className}`;
  const showArrow = arrow || isLink;
  const content = (
    <>
      {children}
      {showArrow && (
        <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
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
