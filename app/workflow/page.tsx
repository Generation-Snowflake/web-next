import FadeIn from "@/components/FadeIn";

const steps = [
  {
    step: "1. Requirement & Consultation",
    desc: "We work closely with clients to understand business needs, technical constraints, and project goals.",
  },
  {
    step: "2. Planning & System Architecture",
    desc: "We design scalable architecture, choose optimal technologies, and outline development roadmaps.",
  },
  {
    step: "3. UI/UX Design & Prototyping",
    desc: "We create intuitive, modern, user-friendly interfaces using best UX practices.",
  },
  {
    step: "4. Development",
    desc: "Our engineering team builds robust, secure, and scalable software following clean architecture.",
  },
  {
    step: "5. Testing & QA",
    desc: "We run multiple levels of tests including unit tests, integration tests, and performance checks.",
  },
  {
    step: "6. Deployment",
    desc: "We deploy to production using CI/CD pipelines, cloud infrastructure, and security best practices.",
  },
  {
    step: "7. Maintenance & Support",
    desc: "We provide ongoing updates, improvements, monitoring, and technical support.",
  },
];

export default function WorkflowPage() {
  return (
    <div className="px-6 py-28 max-w-6xl mx-auto">
      {/* Title */}
      <FadeIn>
        <h1 className="text-5xl font-bold mb-8">Workflow</h1>
      </FadeIn>

      {/* Description */}
      <FadeIn delay={0.1}>
        <p className="text-softwhite/70 max-w-3xl mb-16">
          Our development workflow ensures smooth communication, transparent
          process, and consistent quality across all projects — from robotics
          and AI to mobile, web, and IoT systems.
        </p>
      </FadeIn>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {steps.map((item, i) => (
          <FadeIn delay={i * 0.08} key={i}>
            <div className="p-7 bg-white/5 border border-ice/20 shadow-glow rounded-2xl backdrop-blur-md hover:border-ice transition">
              <h3 className="text-2xl font-semibold mb-3 text-ice">
                {item.step}
              </h3>
              <p className="text-softwhite/80">{item.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
