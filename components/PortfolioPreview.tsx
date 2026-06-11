import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";

const projects = [
  {
    title: "Vision-Based Identity System",
    desc: "Computer vision workflow for identity verification, face matching, and secure operator review.",
    tags: ["Computer Vision", "Edge AI", "Secure Workflow"],
  },
  {
    title: "IoT Monitoring Platform",
    desc: "Realtime sensor telemetry, device status, alerts, and operational dashboards for connected environments.",
    tags: ["IoT", "Realtime Dashboard", "Cloud"],
  },
  {
    title: "Robotics Control Interface",
    desc: "Operator-facing software for robot state, control commands, mission visibility, and automation feedback.",
    tags: ["Robot UI", "Automation", "Control Layer"],
  },
  {
    title: "AI-Assisted Business Workflow",
    desc: "Applied AI tools that help teams classify information, reduce manual work, and move faster with confidence.",
    tags: ["AI Workflow", "Web Platform", "Backend"],
  },
];

export default function PortfolioPreview() {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20">
      <FadeIn>
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ice/70">
            Selected systems
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Work shaped around complex technical problems.
          </h2>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-xl border border-ice/15 bg-white/[0.035] p-6 backdrop-blur-md transition duration-300 hover:border-ice/60 hover:bg-white/[0.065]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(0,212,255,0.08)_45%,transparent_70%)] opacity-0 transition duration-500 group-hover:translate-x-8 group-hover:opacity-100" />
              <div className="relative z-10 flex min-h-[210px] flex-col justify-between gap-8">
                <div>
                  <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="font-mono text-xs text-ice/80">
                      0{index + 1}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-ice shadow-glow-sm" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">
                    {project.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-10">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ice transition-colors hover:text-ice-light focus-visible:underline focus-visible:outline-none"
          >
            View all work
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
