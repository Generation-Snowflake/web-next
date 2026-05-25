"use client";

import FadeIn from "./FadeIn";
import {
  Brain,
  Cpu,
  Globe,
  Smartphone,
  Server,
  Database,
  ScanEye,
  Wifi,
} from "lucide-react";

const services = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    desc: "Model strategy, intelligent automation, prediction systems, and applied AI features built for product environments.",
  },
  {
    title: "Computer Vision",
    icon: ScanEye,
    desc: "Detection, recognition, inspection, and edge-ready visual intelligence using modern deep learning pipelines.",
  },
  {
    title: "Robotics & Automation",
    icon: Cpu,
    desc: "Robot control layers, autonomy concepts, operator interfaces, and automation software for physical systems.",
  },
  {
    title: "IoT Systems",
    icon: Wifi,
    desc: "Device connectivity, telemetry, sensor data flows, and real-time monitoring for connected operations.",
  },
  {
    title: "Web Platforms",
    icon: Globe,
    desc: "High-performance web applications, dashboards, admin tools, and customer-facing platforms.",
  },
  {
    title: "Mobile Applications",
    icon: Smartphone,
    desc: "Cross-platform mobile experiences for field teams, operators, customers, and connected devices.",
  },
  {
    title: "Backend & Cloud",
    icon: Server,
    desc: "APIs, system architecture, cloud services, integrations, and deployment foundations that scale.",
  },
  {
    title: "Data Engineering",
    icon: Database,
    desc: "Pipelines, storage, analytics, and operational data layers that turn system events into decisions.",
  },
];

export default function ServicesSection() {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20">
      <FadeIn>
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ice/70">
              Deep tech capabilities
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              Engineering systems where software meets machines.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-gray-400 md:text-base">
            From AI models and robot behavior to cloud platforms and mobile
            control surfaces, every layer is designed to work together.
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative min-h-[230px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-ice/60 hover:bg-white/[0.07] hover:shadow-[0_18px_70px_rgba(0,212,255,0.12)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-ice/10 transition duration-300 group-hover:scale-125 group-hover:border-ice/30" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-ice/20 bg-ice/10 text-ice transition duration-300 group-hover:bg-ice group-hover:text-darkbg">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400 transition-colors group-hover:text-gray-300">
                    {service.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
