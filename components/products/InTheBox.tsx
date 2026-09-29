import { splitQty } from "./productUi";

/** "In the box" as a ruled item / qty table. "Not included: …" lines become a note. */
export default function InTheBox({ items, className = "" }: { items: string[]; className?: string }) {
  const rows = items.filter((l) => !/^not included/i.test(l)).map(splitQty);
  const notes = items.filter((l) => /^not included/i.test(l));
  if (rows.length === 0) return null;
  return (
    <div className={className}>
      <table className="w-full border-t border-ink text-left text-[15px]">
        <thead>
          <tr className="border-b border-hairline">
            <th scope="col" className="py-2 font-normal text-graphite">
              Item
            </th>
            <th scope="col" className="w-16 py-2 text-right font-normal text-graphite">
              Qty
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.item} className="border-b border-hairline">
              <td className="py-2 pr-4">{r.item}</td>
              <td className="py-2 text-right font-mono text-[14px]">{r.qty ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {notes.map((n) => (
        <p key={n} className="mt-3 text-[14px] text-graphite">
          {n}
        </p>
      ))}
    </div>
  );
}
