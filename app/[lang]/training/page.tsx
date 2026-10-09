import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/Button";
import CtaBand from "@/components/ui/CtaBand";
import { alternates, langFrom, localizeHref, ogLocale, type Lang, type LangParams } from "@/lib/i18n";
import { getClassFormats, getMazeCourse } from "@/lib/training";

const copy = {
  en: {
    metaTitle: "Robotics classes",
    description:
      "Robotics and coding classes from GSF Robotics & AI: a 12-session maze robot course for kids, school clubs with Makerzoid kits, and Armo robot-learning courses for colleges.",
    crumb: "Classes",
    title: "Robotics classes",
    lead: "We teach kids and students to build and program robots. Classes are run by the same engineers who build our robot software.",
    ask: "Ask about a class",
    outline: "See the course outline",
    formatsLabel: "Formats",
    formatsTitle: "Who we teach",
    courseLabel: "Course",
    for: "For",
    length: "Length",
    platform: "Platform",
    runsOn: "Runs on",
    platformRest: ", our online robot simulator (in development)",
    price: "Price",
    priceValue: "Quoted per group. Ask us.",
    caption: "Course outline, session by session",
    no: "No.",
    topic: "Topic",
    activity: "What they do",
    outcomes: "What students come away with",
    ctaTitle: "Ask about a class for your school or group",
    ctaDescription:
      "Tell us the age range, how many students, and whether you already have kits. We'll suggest a format and send a quote.",
  },
  th: {
    metaTitle: "คอร์สเรียนหุ่นยนต์",
    description:
      "คอร์สหุ่นยนต์และเขียนโปรแกรมจาก GSF Robotics & AI: คอร์สหุ่นยนต์เขาวงกต 12 ครั้งสำหรับเด็ก ชมรมในโรงเรียนด้วยชุด Makerzoid และคอร์ส Robot Learning กับ Armo สำหรับวิทยาลัย",
    crumb: "คอร์สเรียน",
    title: "คอร์สเรียนหุ่นยนต์",
    lead: "เราสอนเด็กและนักศึกษาให้สร้างและเขียนโปรแกรมหุ่นยนต์ ผู้สอนคือวิศวกรทีมเดียวกับที่พัฒนาซอฟต์แวร์หุ่นยนต์ของเรา",
    ask: "สอบถามเรื่องคอร์ส",
    outline: "ดูโครงร่างคอร์ส",
    formatsLabel: "รูปแบบการเรียน",
    formatsTitle: "เราสอนใครบ้าง",
    courseLabel: "คอร์ส",
    for: "เหมาะกับ",
    length: "ระยะเวลา",
    platform: "แพลตฟอร์ม",
    runsOn: "เรียนบน",
    platformRest: " ระบบจำลองหุ่นยนต์ออนไลน์ของเรา (อยู่ระหว่างพัฒนา)",
    price: "ราคา",
    priceValue: "เสนอราคาตามกลุ่มผู้เรียน สอบถามได้เลย",
    caption: "โครงร่างคอร์สรายครั้ง",
    no: "ครั้งที่",
    topic: "หัวข้อ",
    activity: "กิจกรรม",
    outcomes: "สิ่งที่ผู้เรียนจะได้รับ",
    ctaTitle: "สอบถามคอร์สสำหรับโรงเรียนหรือกลุ่มของคุณ",
    ctaDescription:
      "บอกช่วงอายุ จำนวนผู้เรียน และมีชุดหุ่นยนต์อยู่แล้วหรือยัง เราจะแนะนำรูปแบบที่เหมาะสมและส่งใบเสนอราคาให้",
  },
} satisfies Record<Lang, Record<string, string>>;

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const lang = await langFrom(params);
  const c = copy[lang];
  return {
    title: c.metaTitle,
    description: c.description,
    alternates: alternates("/training", lang),
    openGraph: {
      title: `${c.metaTitle} | GSF Robotics & AI`,
      description: c.description,
      url: localizeHref("/training", lang),
      locale: ogLocale[lang],
    },
  };
}

export default async function TrainingPage({ params }: { params: LangParams }) {
  const lang = await langFrom(params);
  const c = copy[lang];
  const mazeCourse = getMazeCourse(lang);
  const classFormats = getClassFormats(lang);
  return (
    <>
      <PageHeader lang={lang} crumbs={[{ label: c.crumb }]} title={c.title} description={c.lead}>
        <ButtonLink href="/contact?interest=classes" size="lg" arrow>
          {c.ask}
        </ButtonLink>
        <ButtonLink href="#course" variant="link">
          {c.outline}
        </ButtonLink>
      </PageHeader>

      <section aria-labelledby="formats-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading label={c.formatsLabel} title={<span id="formats-title">{c.formatsTitle}</span>} />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {classFormats.map((f) => (
              <li key={f.title} className="card flex flex-col items-start p-6 sm:p-8">
                <h3 className="text-xl font-semibold tracking-heading">{f.title}</h3>
                <p className="mt-2 max-w-prose text-[17px] leading-relaxed text-graphite">{f.description}</p>
                {f.href && (
                  <ButtonLink href={f.href} variant="link" className="mt-auto pt-4">
                    {f.linkLabel}
                  </ButtonLink>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="course" aria-labelledby="course-title" className="scroll-mt-24 border-t border-hairline bg-paper-2 py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeading
              label={c.courseLabel}
              title={<span id="course-title">{mazeCourse.name}</span>}
              description={mazeCourse.summary}
            />
            <dl className="card mt-8 divide-y divide-hairline px-5 text-[15px]">
              <div className="py-3.5">
                <dt className="caption">{c.for}</dt>
                <dd className="mt-1">{mazeCourse.audience}</dd>
              </div>
              <div className="py-3.5">
                <dt className="caption">{c.length}</dt>
                <dd className="mt-1">{mazeCourse.format}</dd>
              </div>
              <div className="py-3.5">
                <dt className="caption">{c.platform}</dt>
                <dd className="mt-1">
                  {c.runsOn}{" "}
                  <Link href="/products/robopark" className="link">
                    RoboPark
                  </Link>
                  {c.platformRest}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="caption">{c.price}</dt>
                <dd className="mt-1">{c.priceValue}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-8">
            <div className="card overflow-x-auto">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">{c.caption}</caption>
              <thead>
                <tr className="border-b border-hairline bg-paper-2">
                  <th scope="col" className="caption w-12 py-2.5 pl-4 pr-2 sm:pl-5">{c.no}</th>
                  <th scope="col" className="caption py-2.5 pr-3 sm:w-44">{c.topic}</th>
                  <th scope="col" className="caption py-2.5 pr-4 sm:pr-5">{c.activity}</th>
                </tr>
              </thead>
              <tbody>
                {mazeCourse.sessions.map((s) => (
                  <tr key={s.n} className="border-b border-hairline align-top last:border-b-0">
                    <td className="py-3.5 pl-4 pr-2 text-[14px] font-semibold tabular-nums text-cyan-700 sm:pl-5">{s.n}</td>
                    <td className="py-3.5 pr-3 font-medium">{s.topic}</td>
                    <td className="py-3.5 pr-4 leading-relaxed text-graphite sm:pr-5">{s.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            <h3 className="mt-12 text-xl font-semibold tracking-heading">{c.outcomes}</h3>
            <ul className="mt-4 space-y-2 text-[17px] leading-relaxed text-graphite">
              {mazeCourse.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>


      <CtaBand
        lang={lang}
        title={c.ctaTitle}
        description={c.ctaDescription}
        primary={{ label: c.ask, href: "/contact?interest=classes" }}
      />
    </>
  );
}
