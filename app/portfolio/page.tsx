import FadeIn from "@/components/FadeIn";
import Image from "next/image";

const projects = [
  {
    title: "AI Face Recognition System",
    desc: "A custom deep learning model for identity verification, face matching, and KYC automation.",
    img: "/portfolio/face.png", // ← Nut ใส่รูปจริงทีหลัง
  },
  {
    title: "IoT Sensor Monitoring Platform",
    desc: "Real-time sensor tracking with alerts, dashboards, and cloud data pipelines.",
    img: "/portfolio/iot.png",
  },
  {
    title: "Autonomous Robot Control",
    desc: "Custom robotics control + path planning + sensor fusion for industrial automation.",
    img: "/portfolio/robot.png",
  },
  {
    title: "AI Image Processing Pipeline",
    desc: "OCR, object detection, segmentation, and high-speed image preprocessing solutions.",
    img: "/portfolio/cv.png",
  },
];

export default function PortfolioPage() {
  return (
    <div className="px-6 py-28 max-w-7xl mx-auto">
      {/* Title */}
      <FadeIn>
        <h1 className="text-5xl font-bold mb-6">Portfolio</h1>
      </FadeIn>

      {/* Description */}
      <FadeIn delay={0.1}>
        <p className="text-softwhite/70 max-w-3xl mb-16">
          Here are some highlighted projects built by GSF Robotics & AI —
          covering robotics, artificial intelligence, IoT, web applications, and
          advanced image processing.
        </p>
      </FadeIn>

      {/* Grid of Projects */}
      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div className="p-6 bg-white/5 border border-ice/20 rounded-2xl backdrop-blur-lg hover:border-ice shadow-glow transition cursor-pointer group">
              {/* Image */}
              <div className="w-full h-52 relative rounded-xl overflow-hidden mb-5">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-ice mb-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-softwhite/70">{project.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
