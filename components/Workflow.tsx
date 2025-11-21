import FadeIn from "./FadeIn";

const steps = [
  "1. Requirement & Consultation",
  "2. Planning & System Design",
  "3. UI/UX Prototyping",
  "4. Development",
  "5. Testing & QA",
  "6. Deployment",
  "7. Maintenance & Support",
];

export default function WorkflowSection() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="text-4xl font-bold text-center mb-12">Workflow</h2>
      </FadeIn>

      <FadeIn>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-5 border border-ice/20 bg-white/5 rounded-xl backdrop-blur-sm hover:border-ice transition"
            >
              {step}
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
