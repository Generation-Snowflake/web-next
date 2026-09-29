import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { awards, teaching } from "@/lib/team";

export default function TrackRecord() {
  return (
    <section aria-labelledby="record-title" className="border-t border-ink bg-paper">
      <Container className="py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              label="Track record"
              title={<span id="record-title">Competition results</span>}
              description="Robotics competitions entered by members of the team."
            />
            <ButtonLink href="/about" variant="link" className="mt-6">
              About GSF
            </ButtonLink>
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
              Teaching
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
