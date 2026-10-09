import type { Lang } from "@/lib/i18n";
import { splitQty } from "./productUi";

// "Not included: …" lines (Thai data starts them with "ไม่รวม").
const notIncluded = /^(not included|ไม่รวม)/i;

const copy = {
  en: { item: "Item", qty: "Qty" },
  th: { item: "รายการ", qty: "จำนวน" },
} satisfies Record<Lang, Record<string, string>>;

/** "In the box" as an item / qty table in a card. "Not included: …" lines become a note. */
export default function InTheBox({ items, lang = "en", className = "" }: { items: string[]; lang?: Lang; className?: string }) {
  const c = copy[lang];
  const rows = items.filter((l) => !notIncluded.test(l)).map(splitQty);
  const notes = items.filter((l) => notIncluded.test(l));
  if (rows.length === 0) return null;
  return (
    <div className={className}>
      <div className="card overflow-hidden">
      <table className="w-full text-left text-[15px]">
        <thead>
          <tr className="border-b border-hairline bg-paper-2">
            <th scope="col" className="px-4 py-2.5 text-[13px] font-medium text-graphite">
              {c.item}
            </th>
            <th scope="col" className="w-16 px-4 py-2.5 text-right text-[13px] font-medium text-graphite">
              {c.qty}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.item} className="border-b border-hairline last:border-b-0">
              <td className="px-4 py-2.5">{r.item}</td>
              <td className="px-4 py-2.5 text-right font-mono text-[14px] tabular-nums">{r.qty ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {notes.map((n) => (
        <p key={n} className="mt-3 text-[14px] text-graphite">
          {n}
        </p>
      ))}
    </div>
  );
}
