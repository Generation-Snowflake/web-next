import { splitQty } from "./productUi";

/** "In the box" as an item / qty table in a card. "Not included: …" lines become a note. */
export default function InTheBox({ items, className = "" }: { items: string[]; className?: string }) {
  const rows = items.filter((l) => !/^not included/i.test(l)).map(splitQty);
  const notes = items.filter((l) => /^not included/i.test(l));
  if (rows.length === 0) return null;
  return (
    <div className={className}>
      <div className="card overflow-hidden">
      <table className="w-full text-left text-[15px]">
        <thead>
          <tr className="border-b border-hairline bg-paper-2">
            <th scope="col" className="px-4 py-2.5 text-[13px] font-medium text-graphite">
              Item
            </th>
            <th scope="col" className="w-16 px-4 py-2.5 text-right text-[13px] font-medium text-graphite">
              Qty
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
