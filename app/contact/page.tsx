import { Suspense } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import ContactForm, { ContactFormFromParams } from "@/components/contact/ContactForm";
import ContactDetails from "@/components/contact/ContactDetails";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ask GSF Robotics & AI about a software, AI or robotics project, or get a quote for Makerzoid kits, the SO-101 arm or XLeRobot. Office in Pak Kret, Nonthaburi.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        title="Contact"
        description="Tell us what you want to build or buy, and roughly when. The form opens your own email app with the message filled in. Nothing is stored on this website."
      />

      <section aria-label="Contact form and details" className="py-14 md:py-20">
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
              <ContactDetails />
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
