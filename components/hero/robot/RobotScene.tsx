"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo, type RefObject } from "react";
import * as THREE from "three";
import { CAMERA_FOV, CAMERA_Z, DIM } from "./config";
import type { RobotInput } from "./input";
import RobotModel from "./RobotModel";


/** Where the robot sits in the frame, recomputed on resize.
 *  ≥1024px: right part of the hero, ~3/4 of the canvas height.
 *  <1024px: centred in the top half (copy sits below it). */
function usePlacement() {
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  return useMemo(() => {
    const vh = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));
    const vw = vh * (width / Math.max(height, 1));
    if (width >= 1024) {
      let scale = (0.68 * vh) / DIM.height;
      scale = Math.min(scale, (0.44 * vw) / DIM.width);
      const x = (0.72 - 0.5) * vw;
      const y = -DIM.centerY * scale - 0.03 * vh;
      // Face the camera, then turn a touch toward the headline on the left.
      const yaw = Math.atan2(-x, CAMERA_Z) - 0.12;
      return { x, y, scale, yaw };
    }
    let scale = (0.4 * vh) / DIM.height;
    scale = Math.min(scale, (0.86 * vw) / DIM.width);
    const centreFromTop = 0.31;
    const y = vh * (0.5 - centreFromTop) - DIM.centerY * scale;
    return { x: 0, y, scale, yaw: 0 };
  }, [width, height]);
}

/** Neutral product studio, reflections only (no HDRI download): a big warm
 *  softbox overhead-left, a weak fill card on the right, two thin neutral
 *  strips behind for the rim, and a dim grey floor bounce. */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={2.4} color="#fff4e8" position={[-3, 6, 3]} scale={[7, 4, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={0.5} color="#f2f2f0" position={[6, 1, 3]} scale={[3, 6, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={0.9} color="#ffffff" position={[4.5, 2, -5]} scale={[1.2, 8, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={0.6} color="#ffffff" position={[-4.5, 2, -5]} scale={[1.2, 8, 1]} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={0.12} color="#8a8986" position={[0, -5, 0]} scale={[12, 12, 1]} target={[0, 0, 0]} />
    </Environment>
  );
}

type Props = {
  input: RefObject<RobotInput>;
  reducedMotion: boolean;
};

export default function RobotScene({ input, reducedMotion }: Props) {
  const place = usePlacement();

  return (
    <>
      <Studio />
      <hemisphereLight args={["#f3f1ec", "#2a2b2c", 0.18]} />
      {/* Key: soft warm white from top-left; the only shadow caster */}
      <directionalLight
        position={[-4, 7, 6]}
        intensity={3}
        color="#fff3e4"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.025}
        shadow-radius={1.5}
        shadow-camera-left={-4.5}
        shadow-camera-right={4.5}
        shadow-camera-top={4.5}
        shadow-camera-bottom={-4.5}
        shadow-camera-near={2}
        shadow-camera-far={22}
      />
      {/* Fill: weak, neutral, camera right */}
      <directionalLight position={[6, 1.5, 5]} intensity={0.28} color="#eef0f2" />
      {/* Rim: faint neutral from behind so the silhouette reads on #0F1011 */}
      <directionalLight position={[3, 4, -7]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-3.5, 3, -7]} intensity={0.6} color="#ffffff" />

      <group position={[place.x, place.y, 0]} scale={place.scale} rotation={[0, place.yaw, 0]}>
        <RobotModel input={input} reducedMotion={reducedMotion} />
      </group>
    </>
  );
}
