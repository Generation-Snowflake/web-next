"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { VIEW_H, type CompanionMotion } from "@/components/robot-companion/motion";
import { companionStore } from "@/components/robot-companion/store";
import { DIM } from "./config";
import type { FrameOptions } from "./controller";
import type { RobotInput } from "./input";
import RobotModel from "./RobotModel";

/** Neutral product studio, reflections only (no HDRI download): a big soft
 *  box overhead-left, a weak fill card on the right, two thin strips behind
 *  for the rim, and a grey floor bounce. Tuned to read on light pages. */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={2.2} color="#fffaf3" position={[-3, 6, 3]} scale={[7, 4, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={0.45} color="#f2f3f5" position={[6, 1, 3]} scale={[3, 6, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={0.5} color="#ffffff" position={[4.5, 2, -5]} scale={[1.2, 8, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={0.35} color="#ffffff" position={[-4.5, 2, -5]} scale={[1.2, 8, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={0.12} color="#7d7f82" position={[0, -5, 0]} scale={[12, 12, 1]} target={[0, 0, 0]} />
    </Environment>
  );
}

/** Key light direction (from the robot toward the light). */
const KEY_DIR = new THREE.Vector3(-4, 7, 6).normalize();

type Props = {
  input: RefObject<RobotInput>;
  reducedMotion: boolean;
  motion: CompanionMotion;
};

/**
 * The one robot of the site, placed in a full-viewport transparent canvas.
 * CompanionMotion says where it is in screen pixels; this converts that to
 * world space every frame and keeps the shadow-casting key light on it.
 */
export default function RobotScene({ input, reducedMotion, motion }: Props) {
  const anchor = useRef<THREE.Group>(null);
  const yawGroup = useRef<THREE.Group>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const shadowScale = useRef(0);
  const scratch = useMemo(() => ({ v: new THREE.Vector3() }), []);
  const frame = useRef<FrameOptions>({ reducedMotion, reach: motion.reach, tip: new THREE.Vector3() });

  // Everything here only depends on the previous frame's rig state, so the
  // order relative to RobotModel's own frame callback does not matter.
  useFrame((state, delta) => {
    const a = anchor.current;
    const yg = yawGroup.current;
    if (!a || !yg) return;
    // Looser cap than the rig's 1/20 s: the press timeline should keep to
    // wall-clock time on a slow frame (the springs sub-step anyway).
    const dt = Math.min(delta, 1 / 10);
    const { width, height } = state.size;

    // Fingertip from the last frame → screen px, for the press loop.
    const f = frame.current;
    if (motion.reach.active && f.tip) {
      const v = scratch.v.copy(f.tip).project(state.camera);
      motion.setTip((v.x * 0.5 + 0.5) * width, (-v.y * 0.5 + 0.5) * height);
    }

    motion.update(dt, width, height, companionStore.stageRect, reducedMotion);
    const o = motion.out;
    const unit = VIEW_H / Math.max(height, 1);
    const s = (o.h * unit) / DIM.height;
    a.position.set((o.cx - width / 2) * unit, (height / 2 - o.cy) * unit, 0);
    a.scale.setScalar(s);
    a.rotation.set(o.tiltX, 0, o.tiltZ);
    yg.rotation.set(0, o.yaw, 0);
    f.reducedMotion = reducedMotion;

    // Key light rides along so its shadow frustum stays tight on the robot.
    const k = key.current;
    if (k) {
      k.target.position.copy(a.position);
      k.position.copy(KEY_DIR).multiplyScalar(10 * s).add(a.position);
      k.target.updateMatrixWorld();
      if (Math.abs(s - shadowScale.current) > shadowScale.current * 0.01) {
        shadowScale.current = s;
        const cam = k.shadow.camera;
        const r = 2.1 * s;
        cam.left = -r;
        cam.right = r;
        cam.top = r;
        cam.bottom = -r;
        cam.near = 4 * s;
        cam.far = 16 * s;
        cam.updateProjectionMatrix();
      }
    }
  });

  return (
    <>
      <Studio />
      <hemisphereLight args={["#ffffff", "#8c8e91", 0.35]} />
      {/* Key: soft warm white from top-left; the only shadow caster */}
      <directionalLight
        ref={key}
        intensity={2.7}
        color="#fff6ec"
        castShadow
        shadow-mapSize={[1536, 1536]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.025}
        shadow-radius={1.5}
      />
      {/* Fill: weak, neutral, camera right */}
      <directionalLight position={[6, 1.5, 5]} intensity={0.35} color="#eef0f2" />
      {/* Rim from behind, kept low: on light pages it would wash out the edge */}
      <directionalLight position={[3, 4, -7]} intensity={0.45} color="#ffffff" />

      <group ref={anchor}>
        <group ref={yawGroup}>
          <group position={[0, -DIM.centerY, 0]}>
            <RobotModel input={input} frame={frame} />
          </group>
        </group>
      </group>
    </>
  );
}
