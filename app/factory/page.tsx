import FadeIn from "@/components/FadeIn";
import FactoryClient from "./FactoryClient";

export const metadata = {
  title: "Factory Demo — Interactive 3D Factory",
  description:
    "An interactive 3D factory model. Pick a zone, zoom in and see the details of each area.",
};

export default function FactoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-28">
      <FadeIn>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-ice/70">
          Three.js · Factory Simulation
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          3D Factory Viewer
        </h1>
        <p className="mb-10 max-w-2xl leading-relaxed text-softwhite/70">
          A 3D factory model. Pick a zone from the menu or click the model to zoom in on it,
          with smooth camera animation.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <FactoryClient />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-ice/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-semibold text-ice">Zone Selection</h3>
            <p className="text-sm text-softwhite/70">
              Pick zone A–C from the menu or click the model. The camera glides to that zone.
            </p>
          </div>
          <div className="rounded-xl border border-ice/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-semibold text-ice">Smooth Camera</h3>
            <p className="text-sm text-softwhite/70">
              Linear interpolation (lerp) keeps the camera moving smoothly every frame,
              with no jumps when you switch zones.
            </p>
          </div>
          <div className="rounded-xl border border-ice/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-semibold text-ice">Interactive</h3>
            <p className="text-sm text-softwhite/70">
              Drag to orbit, scroll to zoom, and reset to the wide view at any time.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
