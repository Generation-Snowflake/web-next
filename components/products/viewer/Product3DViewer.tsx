"use client";

import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { Model3D } from "@/lib/products";

// three.js only loads once the viewer scrolls into view.
const ViewerScene = dynamic(() => import("./ViewerScene"), { ssr: false });

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

type Status = "idle" | "loading" | "ready" | "error" | "unsupported";

/**
 * Interactive 3D model on a paper-grey studio backdrop. Shows the poster
 * until the model has loaded (and keeps it if loading fails or WebGL is
 * missing). Rendering stops while the figure is off screen.
 */
export default function Product3DViewer({
  model,
  figure = 1,
  className = "aspect-[4/3] md:aspect-[16/9]",
}: {
  model: Model3D;
  /** FIG. number in the caption. */
  figure?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setStatus((s) => (s === "idle" ? (hasWebGL() ? "loading" : "unsupported") : s));
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onReady = useCallback(() => setStatus((s) => (s === "loading" ? "ready" : s)), []);
  const onError = useCallback(() => setStatus("error"), []);

  const showScene = status === "loading" || status === "ready";
  const motion = !reduced && !paused;

  return (
    <figure>
      <div ref={ref} className={`relative overflow-hidden bg-paper-3 ${className}`}>
        <div role="img" aria-label={model.label} className="absolute inset-0">
        {status !== "ready" && (
          <Image
            src={model.poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 80rem, 100vw"
            className="object-contain"
          />
        )}
        {showScene && (
          <div className={`absolute inset-0 ${status === "ready" ? "" : "opacity-0"}`}>
            <SceneBoundary onError={onError}>
              <ViewerScene
                src={model.src}
                kind={model.kind}
                motion={motion}
                autoRotate={motion}
                active={visible}
                onReady={onReady}
              />
            </SceneBoundary>
          </div>
        )}
        </div>
        {status === "loading" && (
          <p className="absolute left-3 top-3 bg-paper-3 px-1.5 font-mono text-[12px] text-graphite">Loading 3D model…</p>
        )}
        {status === "ready" && !reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="absolute bottom-3 right-3 rounded-sm border border-ink bg-paper px-3 py-1.5 font-mono text-[12px] text-ink transition-colors duration-150 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-ink"
          >
            {paused ? "Play motion" : "Pause motion"}
          </button>
        )}
      </div>
      <figcaption className="caption mt-2">
        FIG. {figure} —{" "}
        {status === "ready"
          ? `${model.label}. Drag to rotate`
          : status === "error"
            ? "the 3D model could not load, showing a still render"
            : status === "unsupported"
              ? "still render (3D needs WebGL)"
              : `${model.label}. Drag to rotate`}
      </figcaption>
    </figure>
  );
}
