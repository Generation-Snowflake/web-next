import FadeIn from "./FadeIn";

const stacks = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Next.js",
  "React",
  "Flutter",
  "Raspberry Pi",
  "IoT",
  "Robotics",
  "Docker",
  "AWS",
  "Data Engineering",
];

export default function TechStack() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="text-4xl font-bold text-center mb-12">Tech Stack</h2>
      </FadeIn>

      <FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {stacks.map((item, i) => (
            <div
              key={i}
              className="py-4 px-6 border border-ice/20 rounded-xl bg-white/5 backdrop-blur-sm hover:border-ice transition shadow-glow"
            >
              {item}
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
