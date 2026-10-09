import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import CaseNote from "@/components/portfolio/CaseNote";
import { alternates, langFrom, type Lang, type LangParams } from "@/lib/i18n";
import { getCaseStudies } from "@/lib/work";

const copy = {
  en: {
    metaTitle: "Work",
    description:
      "The kinds of projects GSF Robotics & AI builds: web and mobile apps, computer vision, AI automation, IoT and robot software.",
    title: "Work",
    lead: "The kinds of projects we build. We keep client names and details private, but we're happy to talk them through on a call.",
    label: "Projects",
    heading: "What we work on",
    ctaTitle: "Have something like this in mind?",
    ctaDescription: "Tell us what the problem is, what you use now, and when you need it fixed.",
  },
  th: {
    metaTitle: "ผลงาน",
    description:
      "ประเภทงานที่ GSF Robotics & AI พัฒนา: เว็บและแอปมือถือ Computer Vision ระบบอัตโนมัติด้วย AI, IoT และซอฟต์แวร์หุ่นยนต์",
    title: "ผลงาน",
    lead: "ประเภทงานที่เราพัฒนา เราไม่เปิดเผยชื่อลูกค้าและรายละเอียดโปรเจกต์ แต่ยินดีเล่าให้ฟังทางโทรศัพท์",
    label: "โปรเจกต์",
    heading: "งานที่เราทำ",
    ctaTitle: "มีงานแบบนี้อยู่ในใจหรือเปล่า",
    ctaDescription: "บอกเราว่าปัญหาคืออะไร ตอนนี้ใช้อะไรอยู่ และต้องการให้แก้ได้เมื่อไร",
  },
} satisfies Record<Lang, Record<string, string>>;

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const lang = await langFrom(params);
  const c = copy[lang];
  return { title: c.metaTitle, description: c.description, alternates: alternates("/portfolio", lang) };
}

export default async function PortfolioPage({ params }: { params: LangParams }) {
  const lang = await langFrom(params);
  const c = copy[lang];
  const caseStudies = getCaseStudies(lang);
  return (
    <>
      <PageHeader lang={lang} crumbs={[{ label: c.title }]} title={c.title} description={c.lead} />

      <section aria-labelledby="projects" className="py-20 md:py-28">
        <Container>
          <SectionHeading label={c.label} title={<span id="projects">{c.heading}</span>} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {caseStudies.map((s, i) => (
              <CaseNote
                key={s.slug}
                study={s}
                className={i === caseStudies.length - 1 && caseStudies.length % 2 === 1 ? "sm:col-span-2" : ""}
              />
            ))}
          </div>
        </Container>
      </section>


      <CtaBand lang={lang} title={c.ctaTitle} description={c.ctaDescription} />
    </>
  );
}
