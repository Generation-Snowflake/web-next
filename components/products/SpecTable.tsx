import type { Spec } from "@/lib/products";

/** Spec rows in a card: label left, mono value right, light dividers. */
export default function SpecTable({ specs, className = "" }: { specs: Spec[]; className?: string }) {
  if (specs.length === 0) return null;
  return (
    <dl className={`card divide-y divide-hairline text-[15px] ${className}`}>
      {specs.map((s) => (
        <div key={s.label} className="grid grid-cols-[minmax(7rem,2fr)_3fr] gap-4 px-4 py-3 sm:px-5">
          <dt className="text-graphite">{s.label}</dt>
          <dd className="font-mono text-[14px] leading-6 text-ink">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
