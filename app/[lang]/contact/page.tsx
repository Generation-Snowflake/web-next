import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import ContactForm, { ContactFormFromParams } from "@/components/contact/ContactForm";
import ContactDetails from "@/components/contact/ContactDetails";
import { alternates, langFrom, type LangParams } from "@/lib/i18n";

const copy = {
  en: {
    metaTitle: "Contact",
    metaDescription:
      "Ask GSF Robotics & AI about a software, AI or robotics project, or get a quote for Makerzoid kits, Armo or ArmoGo. Office in Pak Kret, Nonthaburi.",
    title: "Contact",
    lead: "Tell us what you want to build or buy, and roughly when. The form opens your own email app with the message filled in. Nothing is stored on this website.",
    region: "Contact form and details",
  },
  th: {
    metaTitle: "ติดต่อเรา",
    metaDescription:
      "สอบถาม GSF Robotics & AI เรื่องงานซอฟต์แวร์ AI หรือหุ่นยนต์ หรือขอใบเสนอราคาชุดหุ่นยนต์ Makerzoid, Armo และ ArmoGo สำนักงานอยู่ที่ปากเกร็ด นนทบุรี",
    title: "ติดต่อเรา",
    lead: "บอกเราว่าอยากสร้างหรืออยากซื้ออะไร และต้องการประมาณเมื่อไร แบบฟอร์มจะเปิดแอปอีเมลของคุณพร้อมข้อความที่กรอกไว้ เว็บไซต์นี้ไม่ได้เก็บข้อมูลใดๆ ไว้",
    region: "แบบฟอร์มและช่องทางติดต่อ",
  },
};

export async function generateMetadata({ params }: { params: LangParams }): Promise<Metadata> {
  const lang = await langFrom(params);
  const c = copy[lang];
  return { title: c.metaTitle, description: c.metaDescription, alternates: alternates("/contact", lang) };
}

export default async function ContactPage({ params }: { params: LangParams }) {
  const lang = await langFrom(params);
  const c = copy[lang];
  return (
    <>
      <PageHeader lang={lang} crumbs={[{ label: c.title }]} title={c.title} description={c.lead} />

      <section aria-label={c.region} className="py-14 md:py-20">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* useSearchParams (prefill) needs a Suspense boundary; the
                fallback is the same form without prefill. */}
            <Suspense fallback={<ContactForm />}>
              <ContactFormFromParams />
            </Suspense>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-24">
              <ContactDetails lang={lang} />
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
