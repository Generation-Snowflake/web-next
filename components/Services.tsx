import FadeIn from "./FadeIn";

const services = [
  "Robotics Development",
  "AI & Machine Learning",
  "Computer Vision / Image Processing",
  "IoT System Integration",
  "Web Development (Next.js)",
  "Mobile Development (Flutter / iOS)",
  "Backend APIs (NestJS / Node.js / Python)",
  "Data Engineering & Data Science",
];

export default function ServicesSection() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      </FadeIn>

      <FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 border border-ice/20 rounded-xl bg-white/5 backdrop-blur-sm hover:border-ice transition"
            >
              {service}
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
