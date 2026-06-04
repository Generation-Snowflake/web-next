"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Stage,
  Environment,
  useGLTF,
  useAnimations,
  Html,
  Grid,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/neck-mech.glb";

type ModelProps = {
  wireframe: boolean;
  playing: boolean;
  activeClip: string | null;
  onClips: (clips: string[]) => void;
};

function Model({ wireframe, playing, activeClip, onClips }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, group);

  // Report available animation clips to the parent UI (once).
  useEffect(() => {
    onClips(names);
  }, [names, onClips]);

  // Toggle wireframe across every material in the model.
  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];
        materials.forEach((m) => {
          (m as THREE.MeshStandardMaterial).wireframe = wireframe;
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene, wireframe]);

  // Play / pause the selected animation clip. Mutating the three.js action is
  // the intended API, so the immutability rule is intentionally relaxed here.
  useEffect(() => {
    const action = activeClip ? actions[activeClip] : null;
    if (!action) return;
    action.reset().fadeIn(0.3).play();
    // eslint-disable-next-line react-hooks/immutability
    action.paused = !playing;
    return () => {
      action.fadeOut(0.3);
    };
  }, [actions, activeClip, playing]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-softwhite/70">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ice/30 border-t-ice" />
        <span className="text-sm tracking-wide">Loading model…</span>
      </div>
    </Html>
  );
}

function ControlButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-4 py-2 text-sm font-medium backdrop-blur-md transition ${
        active
          ? "border-ice bg-ice/15 text-ice shadow-glow"
          : "border-ice/20 bg-white/5 text-softwhite/80 hover:border-ice/60 hover:text-ice"
      }`}
    >
      {children}
    </button>
  );
}

export default function ModelViewer() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [grid, setGrid] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [clips, setClips] = useState<string[]>([]);
  const [activeClip, setActiveClip] = useState<string | null>(null);
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  // Record the clips the model exposes; default to an idle/rest clip if present.
  const handleClips = useCallback((names: string[]) => {
    setClips(names);
    const preferred =
      names.find((n) => /idle|idel|rest/i.test(n)) ?? names[0] ?? null;
    setActiveClip((cur) => cur ?? preferred);
  }, []);

  const resetView = () => controls.current?.reset();

  return (
    <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden rounded-2xl border border-ice/20 bg-gradient-to-b from-[#0c1426] to-darkbg shadow-glow">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [4, 2, 6], fov: 45 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={["#0a0f1f"]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <Suspense fallback={<Loader />}>
          <Stage
            intensity={0.5}
            environment="city"
            adjustCamera={false}
            shadows={{ type: "contact", opacity: 0.4, blur: 2.5 }}
          >
            <Model
              wireframe={wireframe}
              playing={playing}
              activeClip={activeClip}
              onClips={handleClips}
            />
          </Stage>
          <Environment preset="city" />
        </Suspense>

        {grid && (
          <Grid
            position={[0, -0.01, 0]}
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={0.6}
            cellColor="#1a2a44"
            sectionSize={2.5}
            sectionThickness={1}
            sectionColor="#2bb3c0"
            fadeDistance={30}
            fadeStrength={1}
            infiniteGrid
          />
        )}

        <OrbitControls
          ref={controls}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          enablePan
          enableZoom
          minDistance={2}
          maxDistance={20}
          makeDefault
        />
      </Canvas>

      {/* Control panel overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-2 p-4">
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 rounded-xl border border-ice/15 bg-darkbg/60 p-2 backdrop-blur-md">
          <ControlButton active={autoRotate} onClick={() => setAutoRotate((v) => !v)}>
            {autoRotate ? "หยุดหมุน" : "หมุนอัตโนมัติ"}
          </ControlButton>
          {clips.length > 0 && (
            <ControlButton active={playing} onClick={() => setPlaying((v) => !v)}>
              {playing ? "⏸ หยุด Animation" : "▶ เล่น Animation"}
            </ControlButton>
          )}
          <ControlButton active={wireframe} onClick={() => setWireframe((v) => !v)}>
            Wireframe
          </ControlButton>
          <ControlButton active={grid} onClick={() => setGrid((v) => !v)}>
            Grid
          </ControlButton>
          <ControlButton onClick={resetView}>รีเซ็ตมุมมอง</ControlButton>
        </div>
      </div>

      {/* Animation clip selector */}
      {clips.length > 1 && (
        <div className="pointer-events-auto absolute right-4 top-4 flex max-h-[60%] w-[180px] flex-col gap-1 overflow-y-auto rounded-xl border border-ice/15 bg-darkbg/60 p-2 backdrop-blur-md">
          <span className="sticky top-0 bg-darkbg/80 px-2 py-1 text-xs uppercase tracking-wider text-softwhite/50 backdrop-blur-md">
            Animations · {clips.length}
          </span>
          {clips.map((name) => (
            <button
              key={name}
              onClick={() => setActiveClip(name)}
              className={`rounded-md px-3 py-1.5 text-left text-sm transition ${
                activeClip === name
                  ? "bg-ice/15 text-ice"
                  : "text-softwhite/70 hover:bg-white/5 hover:text-ice"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* Hint */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-ice/10 bg-darkbg/50 px-3 py-2 text-xs text-softwhite/60 backdrop-blur-md">
        ลากเพื่อหมุน · สครอลล์เพื่อซูม · คลิกขวาลากเพื่อเลื่อน
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
