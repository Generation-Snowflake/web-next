// app/page.tsx
import Hero from "@/components/Hero";
// import TechStack from "@/components/TechStack";
import ServicesSection from "@/components/Services";
import PortfolioPreview from "@/components/PortfolioPreview";
import ScrollSections from "@/components/ScrollSections";
import ParallaxHero from "@/components/ParallaxHero";
// import WorkflowSection from "@/components/Workflow";
// import ContactSection from "@/components/Contact";
// import HorizontalSection from "@/components/HorizontalSection";

export default function Home() {
  return (
    <>
      <div className="sections-wrapper h-screen overflow-hidden">
        <ScrollSections />

        <section className="snap-section h-screen flex items-center justify-center">
          {/* <Hero /> */}
          <ParallaxHero />
        </section>

        <section className="snap-section h-screen">
          <ServicesSection />
        </section>

        <section className="snap-section h-screen">
          <PortfolioPreview />
        </section>
      </div>
    </>
  );
}
