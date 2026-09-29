"use client";

import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ComponentRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { applyMotion, applyStill, applyZero, buildRig } from "./motion";

export type SceneProps = {
  src: string;
  kind: "so101" | "xlerobot";
  /** Joint motion on. */
  motion: boolean;
  /** Slow turntable when the user is not interacting. */
  autoRotate: boolean;
  /** On screen. When false nothing renders. */
  active: boolean;
  onReady: () => void;
};

const PAPER_3 = "#EEF0F3"; // tailwind paper-3

function Model({
  src,
  kind,
  motion,
  onFit,
  onReady,
}: {
  src: string;
  kind: SceneProps["kind"];
  motion: boolean;
  /** radius = horizontal half-diagonal of the model. */
  onFit: (radius: number, height: number) => void;
  onReady: () => void;
}) {
  const { scene } = useGLTF(src, "/draco/");
  const rig = useMemo(() => buildRig(scene, kind), [scene, kind]);
  const clock = useRef(0);
  const invalidate = useThree((s) => s.invalidate);

  // Fit once, in the still pose: centre on x/z, stand on y = 0.
  useLayoutEffect(() => {
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) o.castShadow = true;
    });
    // Ground = bottom of the model with every joint at zero (the base plate or
    // wheels), so a gripper dipping below the table never lifts the robot.
    scene.position.set(0, 0, 0);
    applyZero(rig);
    scene.updateMatrixWorld(true);
    const minY = new THREE.Box3().setFromObject(scene).min.y;
    applyStill(rig);
    scene.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(scene);
    const c = box.getCenter(new THREE.Vector3());
    scene.position.set(-c.x, -minY, -c.z);
    const size = new THREE.Vector3(box.max.x - box.min.x, box.max.y - minY, box.max.z - box.min.z);
    onFit(Math.hypot(size.x, size.z) / 2, size.y);
    invalidate();
    onReady();
  }, [scene, rig, onFit, onReady, invalidate]);

  useFrame((_, dt) => {
    if (!motion) return;
    clock.current += Math.min(dt, 0.1);
    applyMotion(rig, clock.current);
  });

  useEffect(() => {
    if (!motion) invalidate();
  }, [motion, invalidate]);

  return (
<primitive object={scene} />
  );
}

/**
 * Framing per robot: camera direction (three-quarter view from the front, a
 * little above), look-at height and how much of the height to fit, as
 * fractions of the model height. XLeRobot is framed on its arms and head.
 */
const VIEW: Record<SceneProps["kind"], { dir: [number, number, number]; target: number; span: number; zoom: number }> = {
  so101: { dir: [0.75, 0.55, 1], target: 0.45, span: 1.1, zoom: 1.3 },
  xlerobot: { dir: [1, 0.35, 0.75], target: 0.62, span: 0.8, zoom: 1 },
};

function Rig({
  kind,
  radius,
  height,
  autoRotate,
}: {
  kind: SceneProps["kind"];
  radius: number;
  height: number;
  autoRotate: boolean;
}) {
  const get = useThree((s) => s.get);
  const aspect = useThree((s) => s.size.width / Math.max(1, s.size.height));
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const resumeAt = useRef(0);
  const interacting = useRef(false);

  useLayoutEffect(() => {
    if (!radius) return;
    const camera = get().camera as THREE.PerspectiveCamera;
    const fov = (camera.fov * Math.PI) / 180;
    const a = Math.max(aspect, 0.6);
    const hf = Math.atan(Math.tan(fov / 2) * a);
    // Far enough that the height fits vertically and the footprint (any
    // turntable angle) fits horizontally, measured from the model's front.
    const dist = Math.max((height * VIEW[kind].span) / 2 / Math.tan(fov / 2), radius / Math.tan(hf)) * 1.12 * VIEW[kind].zoom + radius * 0.6;
    const target = new THREE.Vector3(0, height * VIEW[kind].target, 0);
    const dir = new THREE.Vector3(...VIEW[kind].dir).normalize();
    camera.position.copy(target).addScaledVector(dir, dist);
    camera.near = dist / 50;
    camera.far = dist * 20;
    camera.updateProjectionMatrix();
    const c = controls.current;
    if (c) {
      c.target.copy(target);
      c.update();
    }
  }, [kind, radius, height, aspect, get]);

  useFrame(() => {
    const c = controls.current;
    if (!c) return;
    c.autoRotate = autoRotate && !interacting.current && performance.now() > resumeAt.current;
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI * 0.12}
      maxPolarAngle={Math.PI * 0.49}
      autoRotateSpeed={0.6}
      onStart={() => {
        interacting.current = true;
      }}
      onEnd={() => {
        interacting.current = false;
        resumeAt.current = performance.now() + 2500;
      }}
    />
  );
}

/** Soft key light casting onto an invisible floor that only shows the shadow. */
function Ground({ radius, height }: { radius: number; height: number }) {
  const r = Math.max(0.2, radius, height * 0.5) * 1.6;
  return (
    <>
      <directionalLight
        position={[r * 0.5, r * 3, r * 0.4]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
        shadow-normalBias={0.002}
        shadow-radius={6}
        shadow-camera-left={-r}
        shadow-camera-right={r}
        shadow-camera-top={r}
        shadow-camera-bottom={-r}
        shadow-camera-near={0.01}
        shadow-camera-far={r * 6}
      />
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[r * 4, r * 4]} />
        <shadowMaterial transparent opacity={0.12} color="#2a2f38" />
      </mesh>
    </>
  );
}

export default function ViewerScene({ src, kind, motion, autoRotate, active, onReady }: SceneProps) {
  const [fit, setFit] = useState({ radius: 0, height: 0 });
  const onFit = useCallback(
    (radius: number, height: number) =>
      setFit((prev) => (prev.radius === radius && prev.height === height ? prev : { radius, height })),
    [],
  );
  const animating = motion || autoRotate;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      frameloop={!active ? "never" : animating ? "always" : "demand"}
      camera={{ fov: 30, position: [1, 0.6, 1] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <color attach="background" args={[PAPER_3]} />
      <hemisphereLight args={["#ffffff", "#c9ced6", 0.6]} />
      <Environment resolution={256} frames={1}>
        {/* Key: large soft box above-front. Fill: dimmer from the left. Rim: thin strip behind. */}
        <Lightformer form="rect" intensity={2.4} color="#ffffff" position={[1.5, 4, 3]} scale={[6, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.9} color="#f7f9fc" position={[-4, 1.5, 1]} scale={[4, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.2} color="#ffffff" position={[0, 2, -4]} scale={[8, 0.6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={0.5} color={PAPER_3} position={[0, -3, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Model src={src} kind={kind} motion={motion} onFit={onFit} onReady={onReady} />
        <Ground radius={fit.radius} height={fit.height} />
      </Suspense>
      <Rig kind={kind} radius={fit.radius} height={fit.height} autoRotate={autoRotate} />
    </Canvas>
  );
}
