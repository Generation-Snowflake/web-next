import type { Metadata } from "next";
import CtaBand from "@/components/ui/CtaBand";
import Hero from "@/components/home/Hero";
import PriceStrip from "@/components/home/PriceStrip";
import ServicesList from "@/components/home/ServicesList";
import BrandConcept from "@/components/home/BrandConcept";
import RobotsWeSell from "@/components/home/RobotsWeSell";
import Classes from "@/components/home/Classes";
import WorkNotes from "@/components/home/WorkNotes";
import { alternates, langFrom, localizeHref, ogLocale, type LangParams } from "@/lib/i18n";
import { site } from "@/lib/site";

const copy = {
  en: {
    title: "GSF Robotics & AI | Software house and robot supplier, Nonthaburi",
    description:
      "A small engineering team in Pak Kret, Nonthaburi. We build computer vision, ROS 2, IoT, web and mobile software for companies, and sell Makerzoid robot kits and our Armo and ArmoGo robots.",
    ctaTitle: "Tell us what you're building",
    ctaDescription:
      "A software project, a robot for a classroom or lab, or both. Tell us what it should do and roughly when you need it, and an engineer will reply.",
    ctaLabel: "Describe your project",
  },
  th: {
    title: "GSF Robotics & AI | รับพัฒนาซอฟต์แวร์และจำหน่ายหุ่นยนต์ นนทบุรี",
    description:
      "ทีมวิศวกรขนาดเล็กที่ปากเกร็ด นนทบุรี รับพัฒนา Computer Vision, ROS 2, IoT, เว็บและแอปมือถือให้องค์กร และจำหน่ายชุดหุ่นยนต์ Makerzoid กับหุ่นยนต์ Armo และ ArmoGo",
    ctaTitle: "เล่าให้เราฟังว่ากำลังจะสร้างอะไร",
    ctaDescription:
      "จะเป็นงานซอฟต์แวร์ หุ่นยนต์สำหรับห้องเรียนหรือห้องแล็บ หรือทั้งสองอย่างก็ได้ บอกเราว่าต้องการให้ทำอะไรและต้องการใช้ประมาณเมื่อไร แล้ววิศวกรของเราจะติดต่อกลับ",
    ctaLabel: "เล่ารายละเอียดโปรเจกต์",
  },
};

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const lang = await langFrom(params);
  const { title, description } = copy[lang];
  return {
    title: { absolute: title },
    description,
    alternates: alternates("/", lang),
    openGraph: {
      title,
      description,
      url: new URL(localizeHref("/", lang), site.url).toString(),
      siteName: site.name,
      type: "website",
      locale: ogLocale[lang],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function HomePage({ params }: { params: LangParams }) {
  const lang = await langFrom(params);
  const c = copy[lang];
  return (
    <>
      <Hero lang={lang} />
      <PriceStrip lang={lang} />
      <BrandConcept lang={lang} tone="paper" />
      <ServicesList lang={lang} />
      <RobotsWeSell lang={lang} />
      <Classes lang={lang} />
      <WorkNotes lang={lang} />
      <CtaBand
        lang={lang}
        title={c.ctaTitle}
        description={c.ctaDescription}
        primary={{ label: c.ctaLabel, href: "/contact" }}
      />
    </>
  );
}
