import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/i18n/Link";
import { Circuitry, Hexagon, Snowflake } from "@phosphor-icons/react/dist/ssr";
import BrandConcept from "@/components/home/BrandConcept";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import CtaBand from "@/components/ui/CtaBand";
import { alternates, langFrom, type LangParams } from "@/lib/i18n";
import { getSite } from "@/lib/site";

const copy = {
  en: {
    metaTitle: "About",
    metaDescription:
      "GSF (Generation Snowflake) is a small team of robotics engineers in Pak Kret, Nonthaburi. Who we are, what we do, and where to find us.",
    crumb: "About",
    title: "About GSF",
    lead: "A small engineering team in Pak Kret, Nonthaburi. We write software for other companies and sell robots for classrooms and labs.",
    nameTitle: "Why “Generation Snowflake”?",
    nameBody:
      "GSF stands for Generation Snowflake. We are a young team. One snowflake is small and no two are the same, but a lot of them together can cover a whole field. That is how we work: different skills, one team, and more done together than any of us could do alone.",
    markTitle: "Our logo",
    markBody:
      "It combines a snowflake with circuit traces around a hexagon, where engineering, technology and the systems that connect them come together.",
    keys: [
      { title: "Snowflake", text: "A precise structure that is flexible and can grow." },
      { title: "Circuit", text: "The connections between data and systems." },
      { title: "Hexagon", text: "Stability, and the structure of engineering." },
    ],
    logoAlt: "The GSF Robotics and AI logo",
    whatTitle: "What we do",
    servicesTitle: "Services",
    servicesBody:
      "We build software for other companies: computer vision, ROS 2 robot control, AI tools, IoT dashboards, web and mobile apps. You own the code at the end.",
    servicesLink: "See our services",
    productsTitle: "Products",
    productsBody:
      "We also sell robots: Makerzoid kits for schools and kids, and our Armo robot arm and ArmoGo dual-arm robot for universities and labs. We can assemble them for you and teach classes with them.",
    productsLink: "See the products",
    whereTitle: "Where we are",
    maps: "Open in Google Maps",
    newTab: " (opens in a new tab)",
    ctaTitle: "Come and meet us",
    ctaDescription:
      "Call or email before you visit so we can make sure someone is in. Or send the form and tell us what you need.",
  },
  th: {
    metaTitle: "เกี่ยวกับเรา",
    metaDescription:
      "GSF (Generation Snowflake) ทีมวิศวกรหุ่นยนต์ที่ปากเกร็ด นนทบุรี มาทำความรู้จักว่าเราเป็นใคร ทำอะไร และติดต่อเราได้อย่างไร",
    crumb: "เกี่ยวกับเรา",
    title: "เกี่ยวกับ GSF",
    lead: "ทีมวิศวกรเล็กๆ ที่ปากเกร็ด นนทบุรี เราพัฒนาซอฟต์แวร์ให้องค์กรต่างๆ และขายหุ่นยนต์สำหรับห้องเรียนและห้องแล็บ",
    nameTitle: "ทำไมถึงชื่อ “Generation Snowflake”?",
    nameBody:
      "GSF ย่อมาจาก Generation Snowflake เราเป็นทีมคนรุ่นใหม่ เกล็ดหิมะแต่ละเกล็ดเล็กนิดเดียวและไม่มีเกล็ดไหนเหมือนกัน แต่เมื่อรวมกันมากพอก็ปกคลุมได้ทั้งทุ่ง ทีมเราก็เป็นแบบนั้น แต่ละคนถนัดต่างกัน แต่ทำงานเป็นทีมเดียวกัน และทำได้มากกว่าที่ใครคนหนึ่งจะทำได้ลำพัง",
    markTitle: "โลโก้ของเรา",
    markBody:
      "เราผสานเกล็ดหิมะเข้ากับเส้นวงจรรอบรูปหกเหลี่ยม เพื่อสื่อถึงจุดที่วิศวกรรม เทคโนโลยี และระบบต่างๆ มาบรรจบกัน",
    keys: [
      { title: "เกล็ดหิมะ", text: "โครงสร้างที่แม่นยำ ยืดหยุ่น และเติบโตได้" },
      { title: "วงจร", text: "การเชื่อมต่อข้อมูลและระบบ" },
      { title: "หกเหลี่ยม", text: "ความมั่นคงและโครงสร้างทางวิศวกรรม" },
    ],
    logoAlt: "โลโก้ GSF Robotics and AI",
    whatTitle: "สิ่งที่เราทำ",
    servicesTitle: "บริการ",
    servicesBody:
      "เราพัฒนาซอฟต์แวร์ให้องค์กรต่างๆ ทั้ง Computer Vision ระบบควบคุมหุ่นยนต์บน ROS 2 เครื่องมือ AI แดชบอร์ด IoT เว็บและแอปมือถือ และส่งมอบซอร์สโค้ดให้คุณเป็นเจ้าของเมื่อจบงาน",
    servicesLink: "ดูบริการของเรา",
    productsTitle: "สินค้า",
    productsBody:
      "นอกจากนี้เรายังขายหุ่นยนต์ ทั้งชุดหุ่นยนต์ Makerzoid สำหรับโรงเรียนและเด็ก แขนกล Armo และหุ่นยนต์แขนคู่ ArmoGo สำหรับมหาวิทยาลัยและห้องแล็บ โดยเราประกอบให้และสอนการใช้งานได้ด้วย",
    productsLink: "ดูสินค้า",
    whereTitle: "ที่ตั้งของเรา",
    maps: "เปิดใน Google Maps",
    newTab: " (เปิดในแท็บใหม่)",
    ctaTitle: "แวะมาคุยกับเราได้",
    ctaDescription:
      "ก่อนแวะมา โทรหรือส่งอีเมลบอกเราก่อน จะได้มีคนรออยู่ที่สำนักงาน หรือจะกรอกแบบฟอร์มบอกเราว่าต้องการอะไรก็ได้",
  },
};

const keyIcons = [Snowflake, Circuitry, Hexagon];

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const lang = await langFrom(params);
  const c = copy[lang];
  return { title: c.metaTitle, description: c.metaDescription, alternates: alternates("/about", lang) };
}

export default async function AboutPage({ params }: { params: LangParams }) {
  const lang = await langFrom(params);
  const c = copy[lang];
  const site = getSite(lang);
  return (
    <>
      <PageHeader lang={lang} crumbs={[{ label: c.crumb }]} title={c.title} description={c.lead} />

      {/* The name */}
      <section className="py-20 md:py-28">
        <Container className="grid gap-6 md:grid-cols-12">
          <h2 className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading md:col-span-4">
            {c.nameTitle}
          </h2>
          <p className="max-w-prose text-xl leading-relaxed text-graphite md:col-span-7 md:col-start-6">{c.nameBody}</p>
        </Container>
      </section>

      {/* The mark (Brand Guidelines, Primary Logo) */}
      <section aria-labelledby="mark" className="border-t border-hairline-strong bg-paper-2 py-20 md:py-28">
        <Container className="grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 id="mark" className="text-balance text-[2rem] font-semibold leading-[1.25] tracking-heading sm:text-h1">
              {c.markTitle}
            </h2>
            <span aria-hidden className="accent-bar mt-5" />
            <p className="mt-6 max-w-prose text-[17px] leading-[1.75] text-ink-700">{c.markBody}</p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {c.keys.map((k, i) => {
                const Icon = keyIcons[i];
                return (
                  <li key={k.title}>
                    <Icon aria-hidden className="h-10 w-10 text-cyan-600" />
                    <h3 className="mt-3 text-[13px] font-bold uppercase tracking-label text-ink">{k.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-700">{k.text}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="md:col-span-5">
            <div className="corner-marks relative mx-auto aspect-square max-w-sm rounded-sm border border-hairline-strong bg-card p-10 shadow-card">
              <Image src="/logo.png" alt={c.logoAlt} width={512} height={512} className="h-full w-full object-contain" />
            </div>
          </div>
        </Container>
      </section>

      <BrandConcept lang={lang} tone="paper" />

      {/* What we do */}
      <section aria-labelledby="what" className="border-t border-hairline-strong bg-paper-2 py-20 md:py-28">
        <Container className="grid gap-10 md:grid-cols-12">
          <h2 id="what" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading md:col-span-4">
            {c.whatTitle}
          </h2>
          <div className="grid gap-6 text-[17px] leading-relaxed sm:grid-cols-2 md:col-span-8">
            <div className="card p-6 sm:p-7">
              <h3 className="text-xl font-semibold tracking-heading">{c.servicesTitle}</h3>
              <p className="mt-2 text-graphite">
                {c.servicesBody}{" "}
                <Link href="/services" className="link">
                  {c.servicesLink}
                </Link>
              </p>
            </div>
            <div className="card p-6 sm:p-7">
              <h3 className="text-xl font-semibold tracking-heading">{c.productsTitle}</h3>
              <p className="mt-2 text-graphite">
                {c.productsBody}{" "}
                <Link href="/products" className="link">
                  {c.productsLink}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Where we are */}
      <section aria-labelledby="where" className="border-t border-hairline py-20 md:py-28">
        <Container className="grid gap-8 md:grid-cols-12">
          <h2 id="where" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-heading md:col-span-4">
            {c.whereTitle}
          </h2>
          <div className="md:col-span-8">
            <p className="text-xl font-semibold tracking-tightish">
              {site.address.locality}
              {lang === "th" ? " " : ", "}
              {site.address.country}
            </p>
            <address className="mt-3 not-italic leading-relaxed text-graphite">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-3 text-[15px] text-graphite">{site.hours}</p>
            <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="link mt-4 inline-block">
              {c.maps}
              <span className="sr-only">{c.newTab}</span>
            </a>
          </div>
        </Container>
      </section>

      <CtaBand lang={lang} title={c.ctaTitle} description={c.ctaDescription} />
    </>
  );
}
