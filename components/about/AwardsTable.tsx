import { awards } from "@/lib/team";

/** Competition results as a plain ruled table. */
export default function AwardsTable() {
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-y border-ink">
            <th scope="col" className="py-2.5 pr-4 font-mono text-[13px] font-normal text-graphite">
              Result
            </th>
            <th scope="col" className="py-2.5 pr-4 font-mono text-[13px] font-normal text-graphite">
              Event
            </th>
            <th scope="col" className="py-2.5 font-mono text-[13px] font-normal text-graphite">
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          {awards.map((a) => (
            <tr key={`${a.result}-${a.event}`} className="border-b border-hairline align-top">
              <td className="whitespace-nowrap py-3 pr-4 font-medium">{a.result}</td>
              <td className="py-3 pr-4">{a.event}</td>
              <td className="py-3 text-graphite">{a.note ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
