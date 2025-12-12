import FadeIn from "./FadeIn";

const services = [
  "Robotics Development (รับทำหุ่นยนต์)",
  "AI & Machine Learning (ปัญญาประดิษฐ์)",
  "Computer Vision / Image Processing",
  "IoT System Integration (ระบบ IoT)",
  "Web Development (รับทำเว็บไซต์ Next.js)",
  "Mobile Development (รับทำแอป Flutter / iOS)",
  "Backend APIs (NestJS / Node.js / Python)",
  "Data Engineering & Data Science",
];

export default function ServicesSection() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="text-4xl font-bold text-center mb-12">
          บริการของเรา (Our Services)
        </h2>
      </FadeIn>

      <FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="p-6 border border-ice/20 rounded-xl bg-white/5 backdrop-blur-sm hover:border-ice transition group"
            >
              <span className="group-hover:text-ice transition-colors duration-300">
                {service}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
