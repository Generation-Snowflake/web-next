"use client";

import Link from "next/link";
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
  ArrowRight,
} from "lucide-react";

// Lead capabilities: the physical-AI core a robotics company is hired for.
// Given prominence so a buyer sees the differentiator first.
const leadServices = [
  {
    title: "Robotics & Automation",
    icon: Cpu,
    desc: "Robot control layers, autonomy concepts, operator interfaces, and automation software for physical systems.",
  },
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
];

// Supporting capabilities: the delivery layers around the core. Compact tier.
const supportingServices = [
  { title: "IoT Systems", icon: Wifi, tag: "Connectivity & telemetry" },
  { title: "Data Engineering", icon: Database, tag: "Pipelines & analytics" },
  { title: "Web Platforms", icon: Globe, tag: "Apps & dashboards" },
  { title: "Mobile Applications", icon: Smartphone, tag: "Cross-platform apps" },
  { title: "Backend & Cloud", icon: Server, tag: "APIs & infrastructure" },
];

export default function ServicesSection() {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
      <FadeIn>
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ice/70">
              Deep tech capabilities
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-bold tracking-tight text-white md:text-6xl">
              Engineering systems where software meets machines.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-gray-300 md:text-base">
            From AI models and robot behavior to cloud platforms and mobile
            control surfaces, every layer is designed to work together.
          </p>
        </div>
      </FadeIn>

      {/* Lead tier: three differentiators, full weight */}
      <FadeIn>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leadServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative min-h-[260px] overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-ice/60 hover:bg-white/[0.07] hover:shadow-[0_18px_70px_rgba(0,212,255,0.12)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-ice/10 transition duration-300 group-hover:scale-125 group-hover:border-ice/30" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-ice/20 bg-ice/10 text-ice transition duration-300 group-hover:bg-ice group-hover:text-darkbg">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">
                    {service.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>

      {/* Supporting tier: five delivery layers, compact */}
      <FadeIn>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {supportingServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4 transition duration-300 hover:border-ice/40 hover:bg-white/[0.05]"
              >
                <span className="mt-0.5 text-ice">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-xs text-gray-400">
                    {service.tag}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </FadeIn>

      {/* Bridge to the full routed page (also gives the section a next step) */}
      <FadeIn>
        <div className="mt-10">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ice transition-colors hover:text-ice-light focus-visible:underline focus-visible:outline-none"
          >
            View all services
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
