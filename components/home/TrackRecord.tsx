import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { awards, teaching, team } from "@/lib/team";

export default function TrackRecord() {
  return (
    <section aria-labelledby="team-title" className="border-t border-ink bg-paper">
      <Container className="py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              label="Team"
              labelTh="ทีมงาน"
              title={<span id="team-title">Who you&apos;ll be talking to</span>}
              titleTh="คุยกับวิศวกรที่ลงมือทำเอง"
              description="You talk directly to the engineers who write the code and build the robots."
            />
            <ButtonLink href="/about" variant="link" className="mt-6">
              About GSF
            </ButtonLink>
          </div>

          <ul className="border-t border-ink lg:col-span-8">
            {team.map((m) => (
              <li
                key={m.name}
                className="grid gap-2 border-b border-hairline py-5 sm:grid-cols-[15rem_minmax(0,1fr)] sm:gap-8"
              >
                <div>
                  <p className="text-lg font-medium">{m.name}</p>
                  <p className="caption">{m.role}</p>
                </div>
                <ul className="space-y-1 text-[15px] leading-relaxed text-graphite">
                  {m.background.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h3 className="text-xl font-medium tracking-[-0.015em]">Competition results</h3>
            <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-graphite">
              Robotics competitions entered by members of the team.
            </p>
          </div>
          <div className="lg:col-span-8">
            <table className="w-full border-t border-ink text-left text-[15px]">
              <caption className="sr-only">Competition results of team members</caption>
              <thead>
                <tr className="border-b border-hairline font-mono text-[12px] text-graphite">
                  <th scope="col" className="w-40 py-2 pr-4 font-normal sm:w-52">
                    Result
                  </th>
                  <th scope="col" className="py-2 font-normal">
                    Event
                  </th>
                </tr>
              </thead>
              <tbody>
                {awards.map((a) => (
                  <tr key={`${a.result}-${a.event}`} className="border-b border-hairline align-top">
                    <td className="py-2.5 pr-4 font-medium">{a.result}</td>
                    <td className="py-2.5">
                      {a.event}
                      {a.note && <span className="text-graphite"> {a.note}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="mt-10 font-mono text-[13px] text-graphite">
              Teaching · <span lang="th">การสอน</span>
            </h3>
            <ul className="mt-2 border-t border-hairline text-[15px]">
              {teaching.map((t) => (
                <li key={t} className="border-b border-hairline py-2.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
