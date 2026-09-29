import type { Spec } from "@/lib/products";

/** Datasheet rows: label left, mono value right, hairline between rows. */
export default function SpecTable({ specs, className = "" }: { specs: Spec[]; className?: string }) {
  if (specs.length === 0) return null;
  return (
    <dl className={`border-t border-ink text-[15px] ${className}`}>
      {specs.map((s) => (
        <div key={s.label} className="grid grid-cols-[minmax(7rem,2fr)_3fr] gap-4 border-b border-hairline py-2.5">
          <dt className="text-graphite">{s.label}</dt>
          <dd className="font-mono text-[14px] leading-6 text-ink">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
