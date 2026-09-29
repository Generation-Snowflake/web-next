import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import ImageFrame from "@/components/ui/ImageFrame";
import { caseStudies } from "@/lib/work";

const demos = [
  {
    href: "/power-plant",
    image: "/work/power-plant.webp",
    title: "Power plant tour",
    tech: "Three.js · WebGL",
    description:
      "A 3D power plant in the browser. Click one of the 5 hotspots, from the reactor building to the switchyard, and the camera flies there and explains that part.",
  },
  {
    href: "/factory",
    image: "/work/factory.webp",
    title: "Factory viewer",
    tech: "Three.js · WebGL",
    description: "A 3D factory model you can orbit and zoom. Pick a zone to see its details.",
  },
];

export default function WorkNotes() {
  return (
    <section aria-labelledby="work-title" className="border-t border-ink bg-paper">
      <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading
            label="Work"
            labelTh="ผลงาน"
            title={<span id="work-title">Recent work</span>}
            titleTh="งานที่ผ่านมา"
            description="Client names are left out. Ask us on a call and we can walk you through the details."
          />
          <ButtonLink href="/portfolio" variant="link" className="mt-6">
            All work
          </ButtonLink>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-ink">
            {caseStudies.map((c) => (
              <li
                key={c.slug}
                className="grid gap-1 border-b border-hairline py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
              >
                <p className="caption pt-0.5">{c.sector}</p>
                <div>
                  <h3 className="font-medium">{c.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-graphite">{c.summary}</p>
                  <p className="mt-2 font-mono text-[12px] text-graphite">{c.tags.join(" · ")}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-mono text-[13px] text-graphite">
            Live demos, open them in your browser · <span lang="th">เดโมที่เปิดดูได้</span>
          </h3>
          <ul className="mt-2 grid border-t border-ink sm:grid-cols-2">
            {demos.map((d, i) => (
              <li
                key={d.href}
                className={`border-b border-hairline py-5 ${i === 0 ? "sm:border-r sm:pr-6" : "sm:pl-6"}`}
              >
                <ImageFrame
                  src={d.image}
                  alt={`Screenshot of the ${d.title.toLowerCase()}`}
                  className="mb-4 aspect-[16/10]"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
                <p className="caption">{d.tech}</p>
                <h4 className="mt-1 text-lg font-medium">{d.title}</h4>
                <p className="mt-1 text-[15px] leading-relaxed text-graphite">{d.description}</p>
                <ButtonLink href={d.href} variant="link" className="mt-3">
                  Open {d.title.toLowerCase()}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
