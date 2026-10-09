import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

type Variant = "primary" | "dark" | "outline" | "link" | "secondary" | "ghost";
type Size = "md" | "lg";
type Tone = "paper" | "night";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-[background-color,border-color,color,box-shadow] duration-200 ease-out";

// Primary: Primary Dark with a cyan arrow (.btn-primary in globals.css).
// White text on cyan fails contrast, so cyan buttons always get dark text.
const light: Record<Variant, string> = {
  primary: "btn-primary",
  dark: "bg-ink text-white shadow-xs hover:bg-ink-800",
  outline: "border border-hairline-strong bg-card text-ink shadow-xs hover:border-cyan-500 hover:bg-cyan-50",
  secondary: "border border-hairline-strong bg-card text-ink shadow-xs hover:border-cyan-500 hover:bg-cyan-50",
  link: "font-semibold text-ink transition-colors duration-200 hover:text-cyan-700",
  ghost: "font-semibold text-ink transition-colors duration-200 hover:text-cyan-700",
};

// On Primary Dark sections.
const night: Record<Variant, string> = {
  primary: "btn-primary-night",
  dark: "bg-white text-ink shadow-xs hover:bg-cyan-50",
  outline: "border border-white/25 text-white hover:border-cyan-500 hover:bg-white/5",
  secondary: "border border-white/25 text-white hover:border-cyan-500 hover:bg-white/5",
  link: "font-semibold text-white transition-colors duration-200 hover:text-cyan-300",
  ghost: "font-semibold text-white transition-colors duration-200 hover:text-cyan-300",
};

const variants: Record<Tone, Record<Variant, string>> = { paper: light, night };

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-[15px]",
  lg: "h-12 px-5 text-base",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** "night" on Primary Dark sections. */
  tone?: Tone;
  /** Trailing arrow on solid/outline buttons. Text links always get one. */
  arrow?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

/**
 * A link that looks like a button (or a text link with variant="link").
 * Internal paths use next/link; mailto:, tel: and absolute URLs render a
 * plain anchor, and external URLs open in a new tab.
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
        <ArrowRight
          aria-hidden
          weight="bold"
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 ${
            isLink ? (tone === "night" ? "text-cyan-500" : "text-cyan-600") : ""
          }`}
        />
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
