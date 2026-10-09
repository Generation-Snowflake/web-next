import { Crosshair, GlobeHemisphereEast, Lightbulb, UsersThree } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Container from "@/components/ui/Container";
import CircuitLines from "@/components/ui/CircuitLines";
import Reveal from "@/components/ui/Reveal";
import { Label } from "@/components/ui/SectionHeading";

// Brand Guidelines, Brand Concept: the four values behind the tagline.
const pillars: { title: string; th: string; description: string; icon: Icon }[] = [
  {
    title: "Engineering precision",
    th: "ความแม่นยำเชิงวิศวกรรม",
    description: "We measure, calibrate and test on our own bench before anything is handed over.",
    icon: Crosshair,
  },
  {
    title: "Practical intelligence",
    th: "ความชาญฉลาดที่นำไปใช้ได้จริง",
    description: "AI chosen for the job, the camera and the data you have, not for the demo.",
    icon: Lightbulb,
  },
  {
    title: "Human usability",
    th: "ออกแบบเพื่อให้คนใช้งานได้จริง",
    description: "Screens and robots that operators, teachers and students can run without calling an engineer.",
    icon: UsersThree,
  },
  {
    title: "Real-world impact",
    th: "สร้างผลลัพธ์ในโลกการทำงานจริง",
    description: "The work is finished when it runs in your building, on your data, with your people.",
    icon: GlobeHemisphereEast,
  },
];

/** "Technology that works in the real world." plus the four brand pillars. */
export default function BrandConcept({ tone = "paper-2" }: { tone?: "paper" | "paper-2" }) {
  return (
    <section
      aria-labelledby="concept-title"
      className={`relative isolate overflow-hidden border-t border-hairline-strong ${tone === "paper-2" ? "bg-paper-2" : "bg-paper"}`}
    >
      <CircuitLines className="absolute -right-24 top-0 -z-10 hidden h-64 w-[40rem] opacity-60 lg:block" />
      <Container className="py-20 md:py-28">
        <Reveal className="max-w-3xl">
          <Label th="แนวคิดหลัก">Brand concept</Label>
          <h2 id="concept-title" className="mt-4 text-balance text-[2rem] font-bold leading-[1.2] tracking-heading sm:text-h1 lg:text-[3rem] lg:leading-[1.15]">
            Technology that works <span className="block text-cyan-700">in the real world.</span>
          </h2>
          <span aria-hidden className="accent-bar mt-6" />
          <p className="mt-6 max-w-[40rem] text-[17px] leading-[1.75] text-ink-700">
            Good technology should not stop at an idea or an experiment. It has to connect to real work, be
            usable by real people, and leave a result you can point to.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 60} className="card relative p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-200 bg-cyan-50">
                <p.icon aria-hidden weight="regular" className="h-7 w-7 text-ink" />
              </span>
              <h3 className="mt-6 text-[15px] font-bold uppercase leading-5 tracking-[0.04em] text-ink">{p.title}</h3>
              <p lang="th" className="mt-1 text-[14px] text-ink-600">
                {p.th}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{p.description}</p>
              <span aria-hidden className="absolute right-5 top-5 font-mono text-[12px] text-ink-500">
                0{i + 1}
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
