import type { Metadata } from "next";
import CtaBand from "@/components/ui/CtaBand";
import Hero from "@/components/home/Hero";
import PriceStrip from "@/components/home/PriceStrip";
import ServicesList from "@/components/home/ServicesList";
import RobotsWeSell from "@/components/home/RobotsWeSell";
import Classes from "@/components/home/Classes";
import WorkNotes from "@/components/home/WorkNotes";
import { site } from "@/lib/site";

const title = "GSF Robotics & AI | Software house and robot supplier, Nonthaburi";
const description =
  "A small engineering team in Pak Kret, Nonthaburi. We build computer vision, ROS 2, IoT, web and mobile software for companies, and sell Makerzoid robot kits and LeRobot arms.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PriceStrip />
      <ServicesList />
      <RobotsWeSell />
      <Classes />
      <WorkNotes />
      <CtaBand
        title="Tell us what you're building"
        description="A software project, a robot for a classroom or lab, or both. Tell us what it should do and roughly when you need it, and an engineer will reply."
        primary={{ label: "Describe your project", href: "/contact" }}
      />
    </>
  );
}
