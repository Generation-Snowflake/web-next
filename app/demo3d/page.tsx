import FadeIn from "@/components/FadeIn";
import ViewerClient from "./ViewerClient";

export const metadata = {
  title: "3D Demo — Neck Mech Preview",
  description:
    "Interactive Three.js demo: preview and animate a robotic neck mechanism model in real time.",
};

export default function Demo3DPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-28">
      <FadeIn>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-ice/70">
          Three.js · WebGL Demo
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          3D Model Preview
        </h1>
        <p className="mb-10 max-w-2xl leading-relaxed text-softwhite/70">
          A real-time 3D model viewer built with Three.js. Drag to rotate, zoom,
          play animations and switch display modes.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <ViewerClient />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-ice/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-semibold text-ice">Real-time</h3>
            <p className="text-sm text-softwhite/70">
              Rendered with WebGL through react-three-fiber, with shadows, lights
              and environment lighting.
            </p>
          </div>
          <div className="rounded-xl border border-ice/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-semibold text-ice">Interactive</h3>
            <p className="text-sm text-softwhite/70">
              OrbitControls camera: rotate, zoom, pan
              and reset the view freely.
            </p>
          </div>
          <div className="rounded-xl border border-ice/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-semibold text-ice">Animated</h3>
            <p className="text-sm text-softwhite/70">
              Plays the animations embedded in the GLB file, with clip switching
              and a wireframe mode.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
