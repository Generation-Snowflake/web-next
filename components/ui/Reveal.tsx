// Scroll reveals were removed from the design (static text should just be
// there). This stays as a plain wrapper so existing imports keep working.
export default function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  return <Tag className={className}>{children}</Tag>;
}
