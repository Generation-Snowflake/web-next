import { team } from "@/lib/team";

/** Team as a ruled list: name and role on the left, background lines on the right. */
export default function TeamList() {
  return (
    <ul className="mt-10 border-t border-ink">
      {team.map((m) => (
        <li key={m.name} className="grid gap-3 border-b border-hairline py-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="text-xl font-medium tracking-[-0.015em]">{m.name}</p>
            {m.nameTh && (
              <p lang="th" className="text-graphite">
                {m.nameTh}
              </p>
            )}
            <p className="mt-1 text-[15px] text-graphite">{m.role}</p>
          </div>
          <ul className="space-y-1 text-[15px] leading-relaxed md:col-span-7">
            {m.background.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
