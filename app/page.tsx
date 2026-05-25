import ServicesSection from "@/components/Services";
import PortfolioPreview from "@/components/PortfolioPreview";
import ParallaxHero from "@/components/ParallaxHero";
import VisionSection from "@/components/VisionSection";
import ContactSection from "@/components/Contact";

export default function Home() {
  return (
    <div className="overflow-visible">
      <section
        id="home"
        className="flex min-h-screen scroll-mt-24 items-center justify-center"
      >
        <ParallaxHero />
      </section>

      <section
        id="about"
        className="flex min-h-screen scroll-mt-24 items-center overflow-hidden bg-darkbg"
      >
        <VisionSection />
      </section>

      <section id="services" className="min-h-screen scroll-mt-24">
        <ServicesSection />
      </section>

      <section id="portfolio" className="min-h-screen scroll-mt-24">
        <PortfolioPreview />
      </section>

      <section id="contact" className="min-h-screen scroll-mt-24">
        <ContactSection />
      </section>
    </div>
  );
}
