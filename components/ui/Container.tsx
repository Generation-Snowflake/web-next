/** Page grid: 1200px of content with 24px gutters (16px on phones). */
export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-page px-4 sm:px-6 ${className}`}>{children}</div>;
}
