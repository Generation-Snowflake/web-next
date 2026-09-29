import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatTHB } from "@/lib/products";

const specRows = ["Parts", "Builds", "Motors", "Sensors", "Coding"];

/** "Video lessons (47)" → "Video lessons", so rows line up across kits. */
const extraKey = (label: string) => label.replace(/\s*\(.*\)$/, "");

/**
 * Side-by-side table of a product's models (Makerzoid kits): one column per
 * kit. Scrolls sideways on narrow screens with the row labels pinned.
 */
export default function KitComparisonTable({
  product,
  caption,
}: {
  product: Product;
  caption?: string;
}) {
  const models = product.models;
  const extraLabels: string[] = [];
  for (const m of models)
    for (const e of m.extras ?? []) if (!extraLabels.includes(extraKey(e.label))) extraLabels.push(extraKey(e.label));

  const spec = (i: number, label: string) => models[i].specs.find((s) => s.label === label)?.value ?? "—";
  const th = "sticky left-0 z-10 bg-paper px-4 py-3 text-left align-top font-medium text-graphite";
  const td = "px-4 py-3 align-top";

  return (
    <div>
      <div className="-mx-5 overflow-x-auto border-y border-hairline bg-paper sm:mx-0 sm:rounded-xl sm:border sm:shadow-card" tabIndex={0} role="region" aria-label={caption ?? `${product.name} kits compared`}>
        <table className="w-full min-w-[50rem] table-fixed border-collapse text-[15px]">
          {caption && <caption className="sr-only">{caption}</caption>}
          <colgroup>
            <col className="w-[9.5rem]" />
            {models.map((m) => (
              <col key={m.id} />
            ))}
          </colgroup>
          <thead>
            <tr className="border-b border-hairline">
              <td className="sticky left-0 z-10 bg-paper" />
              {models.map((m) => (
                <th key={m.id} scope="col" className="w-1/4 p-4 text-left align-bottom font-normal">
                  {m.image && (
                    <Link href={`/products/${product.slug}#${m.id}`} className="group relative mb-3 block aspect-[4/3] overflow-hidden rounded-lg border border-hairline bg-paper">
                      <Image src={m.image} alt="" fill sizes="16rem" className="object-contain p-[4%] mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                    </Link>
                  )}
                  <span className="block text-[17px] font-semibold leading-snug tracking-tightish">
                    <Link href={`/products/${product.slug}#${m.id}`} className="transition-colors duration-200 hover:text-teal-ink">
                      {m.name}
                    </Link>
                  </span>
                  {m.sku && <p className="mt-0.5 font-mono text-[12px] text-graphite">{m.sku}</p>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-hairline">
              <th scope="row" className={th}>
                Price
              </th>
              {models.map((m) => (
                <td key={m.id} className={`${td} font-mono text-[15px] font-medium tabular-nums text-signal`}>
                  {formatTHB(m.priceTHB) ?? "On request"}
                </td>
              ))}
            </tr>
            <tr className="border-b border-hairline">
              <th scope="row" className={th}>
                For
              </th>
              {models.map((m) => (
                <td key={m.id} className={td}>
                  {m.audience}
                </td>
              ))}
            </tr>
            {specRows.map((label) => (
              <tr key={label} className="border-b border-hairline">
                <th scope="row" className={th}>
                  {label}
                </th>
                {models.map((m, i) => (
                  <td key={m.id} className={`${td} font-mono text-[14px]`}>
                    {spec(i, label)}
                  </td>
                ))}
              </tr>
            ))}
            {extraLabels.map((label) => (
              <tr key={label} className="border-b border-hairline last:border-b-0">
                <th scope="row" className={th}>
                  {label}
                </th>
                {models.map((m) => {
                  const e = m.extras?.find((x) => extraKey(x.label) === label);
                  const extra = e && e.label !== label ? e.label.slice(label.length).trim() : "";
                  return (
                    <td key={m.id} className={`${td} font-mono text-[14px]`}>
                      {e === undefined ? (
                        <span className="text-graphite">—</span>
                      ) : e.included ? (
                        <span>
                          <span aria-hidden className="text-teal-ink">✓</span>
                          <span className="sr-only">Included</span> {extra}
                        </span>
                      ) : (
                        <span className="text-graphite">
                          <span aria-hidden>✗</span>
                          <span className="sr-only">Not included</span>
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
