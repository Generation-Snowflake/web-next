import FadeIn from "./FadeIn";

export default function PortfolioPreview() {
  return (
    <section className="py-28 px-6 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Projects
        </h2>
      </FadeIn>

      <FadeIn>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white/5 border border-ice/20 rounded-xl backdrop-blur-md hover:border-ice transition">
            <h3 className="text-xl font-semibold mb-3">
              AI Face / ID Detection
            </h3>
            <p className="text-softwhite/70">
              Custom computer vision model for identity verification.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-ice/20 rounded-xl backdrop-blur-md hover:border-ice transition">
            <h3 className="text-xl font-semibold mb-3">
              IoT Monitoring System
            </h3>
            <p className="text-softwhite/70">
              Real-time sensor monitoring & cloud dashboard.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
