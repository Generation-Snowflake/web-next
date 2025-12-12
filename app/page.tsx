// app/page.tsx
import Hero from "@/components/Hero";
// import TechStack from "@/components/TechStack";
import ServicesSection from "@/components/Services";
import PortfolioPreview from "@/components/PortfolioPreview";
import ScrollSections from "@/components/ScrollSections";
import ParallaxHero from "@/components/ParallaxHero";
import VisionSection from "@/components/VisionSection";
// import WorkflowSection from "@/components/Workflow";
// import ContactSection from "@/components/Contact";
// import HorizontalSection from "@/components/HorizontalSection";

export default function Home() {
  return (
    <>
      <div className="sections-wrapper h-screen overflow-hidden">
        <ScrollSections />

        <section id="home" className="snap-section h-screen flex items-center justify-center">
          {/* <Hero /> */}
          <ParallaxHero />
        </section>

        <section id="about" className="snap-section h-screen overflow-hidden flex items-center bg-darkbg">
          <VisionSection />
        </section>

        <section id="services" className="snap-section h-screen">
          <ServicesSection />
        </section>

        <section id="portfolio" className="snap-section h-screen">
          <PortfolioPreview />
        </section>
      </div>
    </>
  );
}
