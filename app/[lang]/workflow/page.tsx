import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import CtaBand from "@/components/ui/CtaBand";
import { alternates, langFrom, localizeHref, ogLocale, type Lang, type LangParams } from "@/lib/i18n";
import { getProcessSteps } from "@/lib/services";

const copy = {
  en: {
    metaTitle: "How we work",
    description:
      "How GSF Robotics & AI runs a client project: a first call, a prototype of the risky part, weekly demos while we build, testing, handover and support.",
    services: "Services",
    title: "How we work",
    lead: "Every project goes through the same steps. Small jobs move through them in a few weeks; bigger ones take longer, but you see working software along the way.",
    describe: "Describe your project",
    whatWeBuild: "What we build",
    steps: "Steps",
    step: "Step",
    youGet: "You get",
    commsTitle: "Staying in touch",
    comms1:
      "While we build, we show you the software working every week. It's a demo of the real thing, not a slide deck, so you can try it and tell us what's wrong while it's still cheap to change.",
    comms2:
      "You talk to the engineers doing the work, on whichever channel suits your team. If something slips or turns out harder than we thought, we tell you when we find out, along with the options.",
    ctaTitle: "Start with a call",
    ctaDescription:
      "Tell us the problem and what you already have. After the call we send a written summary and a rough estimate.",
  },
  th: {
    metaTitle: "วิธีการทำงาน",
    description:
      "ขั้นตอนการทำโปรเจกต์ของ GSF Robotics & AI: คุยกันครั้งแรก ทำต้นแบบส่วนที่เสี่ยง เดโมทุกสัปดาห์ระหว่างพัฒนา ทดสอบ ส่งมอบ และดูแลหลังส่งมอบ",
    services: "บริการ",
    title: "วิธีการทำงานของเรา",
    lead: "ทุกโปรเจกต์ผ่านขั้นตอนเดียวกัน งานเล็กใช้เวลาไม่กี่สัปดาห์ งานใหญ่ใช้เวลานานกว่า แต่คุณจะได้เห็นซอฟต์แวร์ที่ใช้งานได้ไปตลอดทาง",
    describe: "เล่ารายละเอียดโปรเจกต์",
    whatWeBuild: "สิ่งที่เราสร้าง",
    steps: "ขั้นตอน",
    step: "ขั้นตอนที่",
    youGet: "สิ่งที่คุณจะได้",
    commsTitle: "การติดต่อระหว่างทำงาน",
    comms1:
      "ระหว่างพัฒนา เราจะโชว์ซอฟต์แวร์ที่ใช้งานได้จริงให้ดูทุกสัปดาห์ เป็นเดโมของจริง ไม่ใช่สไลด์ คุณจึงลองใช้และบอกเราได้ว่าอะไรยังไม่ถูก ในช่วงที่ยังแก้ได้โดยไม่เสียค่าใช้จ่ายมาก",
    comms2:
      "คุณคุยกับวิศวกรที่ลงมือทำงานโดยตรง ผ่านช่องทางที่สะดวกสำหรับทีมของคุณ ถ้ามีอะไรล่าช้าหรือยากกว่าที่คาด เราจะบอกทันทีที่รู้ พร้อมทางเลือกต่างๆ",
    ctaTitle: "เริ่มจากคุยกันก่อน",
    ctaDescription:
      "บอกเราว่าปัญหาคืออะไรและมีอะไรอยู่แล้วบ้าง หลังคุยกันเราจะส่งสรุปเป็นลายลักษณ์อักษรและประมาณการคร่าวๆ ให้",
  },
} satisfies Record<Lang, Record<string, string>>;

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const lang = await langFrom(params);
  const c = copy[lang];
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: alternates("/workflow", lang),
    openGraph: {
      title: `${c.metaTitle} | GSF Robotics & AI`,
      description: c.description,
      url: localizeHref("/workflow", lang),
      locale: ogLocale[lang],
    },
  };
}

export default async function WorkflowPage({ params }: { params: LangParams }) {
  const lang = await langFrom(params);
  const c = copy[lang];
  const processSteps = getProcessSteps(lang);
  return (
    <>
      <PageHeader
        lang={lang}
        crumbs={[{ label: c.services, href: "/services" }, { label: c.metaTitle }]}
        title={c.title}
        description={c.lead}
      >
        <ButtonLink href="/contact?interest=project" size="lg" arrow>
          {c.describe}
        </ButtonLink>
        <ButtonLink href="/services" variant="link">
          {c.whatWeBuild}
        </ButtonLink>
      </PageHeader>

      <section aria-labelledby="steps-title">
        <Container className="py-20 md:py-28">
          <h2 id="steps-title" className="sr-only">
            {c.steps}
          </h2>
          <ol className="relative space-y-4">
            {processSteps.map((p, i) => (
              <li key={p.title} className="card grid gap-3 p-6 sm:p-7 md:grid-cols-12 md:gap-8">
                <h3 className="flex items-start gap-4 text-xl font-semibold tracking-heading md:col-span-4">
                  <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-[14px] font-semibold text-ink">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">
                    <span className="sr-only">{c.step} {i + 1}: </span>
                    {p.title}
                  </span>
                </h3>
                <p className="max-w-prose text-[16px] leading-relaxed text-graphite md:col-span-5">{p.description}</p>
                <p className="text-[14px] md:col-span-3">
                  <span className="caption block">{c.youGet}</span>
                  <span className="mt-0.5 block font-medium">{p.output}</span>
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="comms-title" className="border-t border-hairline bg-paper-2">
        <Container className="grid gap-8 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <h2 id="comms-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading sm:text-[2.5rem]">
              {c.commsTitle}
            </h2>
          </div>
          <div className="max-w-prose space-y-4 text-[17px] leading-relaxed md:col-span-8 md:pt-2">
            <p>{c.comms1}</p>
            <p className="text-graphite">{c.comms2}</p>
          </div>
        </Container>
      </section>

      <CtaBand
        lang={lang}
        title={c.ctaTitle}
        description={c.ctaDescription}
        primary={{ label: c.describe, href: "/contact?interest=project" }}
      />
    </>
  );
}
