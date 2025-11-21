import FadeIn from "@/components/FadeIn";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="px-6 py-28 max-w-6xl mx-auto">
      {/* Title */}
      <FadeIn>
        <h1 className="text-5xl font-bold mb-8">
          Generation Snowflake Robotics & AI
        </h1>
      </FadeIn>

      {/* Intro Paragraph */}
      <FadeIn delay={0.1}>
        <p className="text-softwhite/70 max-w-3xl mb-16 leading-relaxed">
          We are a team of young engineers building cutting-edge solutions in
          Robotics, Artificial Intelligence, IoT, Computer Vision, Web Systems,
          and Data Engineering. Our strength comes from creativity,
          adaptability, and the courage to innovate.
        </p>
      </FadeIn>

      {/* Snowflake Story Block */}
      <FadeIn delay={0.15}>
        <div className="p-10 bg-white/5 border border-ice/20 shadow-glow rounded-2xl backdrop-blur-md mb-20">
          <h2 className="text-3xl font-bold text-ice mb-4">
            Our Story: The Snowflake
          </h2>
          <p className="text-softwhite/80 leading-relaxed">
            Older generations often describe Gen Z as “snowflakes” — beautiful
            but fragile, melting easily under pressure.
            <br />
            <br />
            But we believe differently.
            <br />
            <br />
            A snowflake doesn’t melt when it’s in the right environment. When
            many snowflakes come together in the cold — they form blizzards,
            avalanches, and breathtaking landscapes.
            <br />
            <br />
            At GSF Robotics & AI, our young team is that blizzard:
            <span className="text-ice font-semibold">
              powerful, creative, fast, and unstoppable when conditions are
              right.
            </span>
          </p>
        </div>
      </FadeIn>

      {/* Vision Section */}
      <FadeIn delay={0.2}>
        <h2 className="text-4xl font-bold text-ice mb-6">Vision</h2>
      </FadeIn>

      <FadeIn delay={0.25}>
        <p className="text-softwhite/80 max-w-3xl mb-20">
          To become a leading force in modern robotics and AI innovation,
          powered by young minds who use creativity and technology to reshape
          industries and enable smarter, more efficient systems.
        </p>
      </FadeIn>

      {/* Mission Section */}
      <FadeIn delay={0.3}>
        <h2 className="text-4xl font-bold text-ice mb-6">Mission</h2>
      </FadeIn>

      <FadeIn delay={0.35}>
        <ul className="text-softwhite/80 max-w-3xl mb-20 list-disc pl-6 space-y-4">
          <li>
            Deliver high-quality AI, robotics, IoT, and software solutions.
          </li>
          <li>Empower businesses with automation and intelligent systems.</li>
          <li>
            Support innovation through fast, flexible, modern engineering.
          </li>
          <li>Create real impact using creativity and cutting-edge tech.</li>
        </ul>
      </FadeIn>

      {/* Values Section */}
      <FadeIn delay={0.4}>
        <h2 className="text-4xl font-bold text-ice mb-6">Our Values</h2>
      </FadeIn>

      <FadeIn delay={0.45}>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-6 border border-ice/20 rounded-xl bg-white/5 backdrop-blur-sm shadow-glow hover:border-ice transition">
            <h3 className="text-2xl font-semibold text-ice mb-3">Innovation</h3>
            <p className="text-softwhite/80">
              We think forward, explore new possibilities, and embrace modern
              technologies.
            </p>
          </div>

          <div className="p-6 border border-ice/20 rounded-xl bg-white/5 backdrop-blur-sm shadow-glow hover:border-ice transition">
            <h3 className="text-2xl font-semibold text-ice mb-3">
              Speed & Agility
            </h3>
            <p className="text-softwhite/80">
              Being young means we move fast — adapting and delivering solutions
              quickly.
            </p>
          </div>

          <div className="p-6 border border-ice/20 rounded-xl bg-white/5 backdrop-blur-sm shadow-glow hover:border-ice transition">
            <h3 className="text-2xl font-semibold text-ice mb-3">
              Quality Engineering
            </h3>
            <p className="text-softwhite/80">
              Clean architecture, scalability, and maintainability are at the
              core of our builds.
            </p>
          </div>

          <div className="p-6 border border-ice/20 rounded-xl bg-white/5 backdrop-blur-sm shadow-glow hover:border-ice transition">
            <h3 className="text-2xl font-semibold text-ice mb-3">
              Team of Young Minds
            </h3>
            <p className="text-softwhite/80">
              We believe in the power of young talent — passionate developers
              creating real impact.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
