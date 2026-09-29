"use client";

import { Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import type * as THREE from "three";
import { DIM } from "./config";
import { NODE, RobotController } from "./controller";
import { HEAD, TORSO_Z, createRobotGeometries, disposeGeometries, torsoRadiusAt, type RobotGeometries } from "./geometry";
import type { RobotInput } from "./input";
import { createRobotMaterials, disposeMaterials, type RobotMaterials } from "./materials";

// Scene graph of the robot. Pure markup: every animated node carries a name
// from NODE and RobotController drives it each frame.

type Kit = { geo: RobotGeometries; mat: RobotMaterials };

const CHEST_Y = 1.45;
const CHEST_Z = torsoRadiusAt(CHEST_Y) * TORSO_Z;
const FINGERS = [-0.043, 0, 0.043];

function Hand({ geo, mat }: Kit) {
  // Authored for the left hand: palm faces the body (-x), thumb forward (+z).
  return (
    <group scale={1.22}>
      <mesh geometry={geo.wristBall} material={mat.graphite} />
      <mesh geometry={geo.palm} material={mat.shell} position={[0, -0.085, 0]} />
      <mesh geometry={geo.knuckles} material={mat.graphite} position={[0.004, -0.15, 0]} />
      {FINGERS.map((z, i) => (
        <mesh
          key={z}
          geometry={geo.finger}
          material={mat.shell}
          position={[-0.008 - i * 0.002, -0.2 + Math.abs(z) * 0.35, z]}
          rotation={[z * 1.4, 0, -0.22]}
        />
      ))}
      <mesh geometry={geo.thumb} material={mat.shell} position={[-0.022, -0.085, 0.072]} rotation={[-0.95, 0, -0.25]} />
    </group>
  );
}

/** Left arm (+x); the right arm is the same rig mirrored on x. */
function Arm({ side, geo, mat }: Kit & { side: 1 | -1 }) {
  const s = side === 1 ? "L" : "R";
  return (
    <group position={[DIM.shoulderX * side, DIM.shoulderY, 0]} scale={[side, 1, 1]}>
      <group name={NODE[`shoulder${s}`]}>
        <mesh geometry={geo.shoulderBall} material={mat.graphite} />
        <group position={[0.01, 0.012, 0]} rotation={[0, 0, -0.5]}>
          <mesh geometry={geo.pauldron} material={mat.shell} />
          <mesh geometry={geo.pauldronRim} material={mat.shell} />
        </group>
        <mesh geometry={geo.upperArm} material={mat.shell} />
        <mesh geometry={geo.armBand} material={mat.graphite} position={[0, -0.405, 0]} />
        <group name={NODE[`elbow${s}`]} position={[0, -DIM.elbowDrop, 0]}>
          <mesh geometry={geo.elbowBall} material={mat.graphite} />
          <mesh geometry={geo.forearm} material={mat.shell} />
          <mesh geometry={geo.cuffLight} material={mat.graphite} position={[0, -0.335, 0]} />
          <group name={NODE[`wrist${s}`]} position={[0, -DIM.wristDrop, 0]}>
            <Hand geo={geo} mat={mat} />
          </group>
        </group>
      </group>
    </group>
  );
}

function Head({ geo, mat }: Kit) {
  return (
    <group position={[0, DIM.headLift, 0]}>
      <mesh geometry={geo.head} material={mat.shell} />
      <mesh geometry={geo.visor} material={mat.visor} />
      <mesh geometry={geo.bezel} material={mat.bezel} />
      <mesh geometry={geo.headSeam} material={mat.seam} />
      {[1, -1].map((s) => (
        <group key={s} position={[s * (HEAD.rx - 0.03), 0, 0]} scale={[s, 1, 1]}>
          <mesh geometry={geo.earPod} material={mat.graphite} />
          <mesh geometry={geo.earCap} material={mat.shellShade} position={[0.064, 0, 0]} />
          <mesh geometry={geo.earRing} material={mat.ear} position={[0.062, 0, 0]} />
        </group>
      ))}
    </group>
  );
}

function HoverBase({ geo, mat }: Kit) {
  return (
    <group>
      <mesh geometry={geo.pod} material={mat.shell} />
      <mesh geometry={geo.podBand} material={mat.graphite} position={[0, 0.5, 0]} />
      <mesh geometry={geo.podLine} material={mat.seam} position={[0, 0.5, 0]} />
      <mesh geometry={geo.nozzle} material={mat.graphite} position={[0, 0.11, 0]} />
      <mesh geometry={geo.nozzleCap} material={mat.graphiteDeep} position={[0, 0.071, 0]} />
    </group>
  );
}

function Torso({ geo, mat }: Kit) {
  return (
    <>
      <mesh geometry={geo.abdomen} material={mat.graphiteDeep} position={[0, 0.9, 0]} scale={[1, 1, 0.86]} />
      {[0.8, 0.885, 0.97].map((y) => (
        <mesh key={y} geometry={geo.abdomenRib} material={mat.graphite} position={[0, y, 0]} />
      ))}
      <mesh geometry={geo.torso} material={mat.shell} />
      <mesh geometry={geo.torsoSeam} material={mat.seam} position={[0, 1.22, 0]} />
      <mesh geometry={geo.torsoCollar} material={mat.graphite} position={[0, 1.9, 0]} />

      {/* Chest core: hexagonal "circuit snowflake" emblem */}
      <group position={[0, CHEST_Y, CHEST_Z + 0.004]} rotation={[0.16, 0, 0]}>
        <mesh geometry={geo.coreBezel} material={mat.bezel} />
        <mesh geometry={geo.coreFace} material={mat.core} position={[0, 0, 0.041]} />
        <Billboard position={[0, 0, 0.06]}>
          <mesh name={NODE.burst} geometry={geo.burstRing} material={mat.burst} visible={false} renderOrder={5} />
        </Billboard>
      </group>
    </>
  );
}

type Props = {
  input: RefObject<RobotInput>;
  reducedMotion: boolean;
};

export default function RobotModel({ input, reducedMotion }: Props) {
  const geo = useMemo(() => createRobotGeometries(), []);
  const mat = useMemo(() => createRobotMaterials(), []);
  const controller = useMemo(() => new RobotController(mat), [mat]);
  const rootRef = useRef<THREE.Group>(null);

  useEffect(
    () => () => {
      disposeGeometries(geo);
      disposeMaterials(mat);
    },
    [geo, mat],
  );

  // Self-shadowing from the key light (head on shoulders, arms on torso) is
  // most of what makes it read as a photographed object. The floor shadow is
  // the blob, so it and the click ripple stay out of the shadow map.
  useEffect(() => {
    rootRef.current?.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh || mesh.material === mat.shadow || mesh.material === mat.burst) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [mat]);

  useFrame((state, delta) => {
    if (rootRef.current) controller.update(rootRef.current, state, delta, input.current, { reducedMotion });
  });

  const headPivot = DIM.headPivotY - DIM.neckY;

  return (
    <group ref={rootRef}>
      {/* Implied floor: soft contact shadow under the hover base. A flattened
          camera-facing blob, so it still reads when the robot sits above the
          horizon (phones), where a real floor plane would be seen edge-on. */}
      <Billboard position={[0, DIM.floorY, 0]}>
        <mesh name={NODE.shadow} geometry={geo.shadow} material={mat.shadow} renderOrder={1} />
      </Billboard>

      <group name={NODE.float}>
        <HoverBase geo={geo} mat={mat} />

        {/* Upper body turns and leans from the waist */}
        <group name={NODE.torso} position={[0, DIM.waistY, 0]} rotation-order="YXZ">
          <group position={[0, -DIM.waistY, 0]}>
            <Torso geo={geo} mat={mat} />
            <Arm side={1} geo={geo} mat={mat} />
            <Arm side={-1} geo={geo} mat={mat} />

            <group name={NODE.neck} position={[0, DIM.neckY, 0]}>
              <mesh geometry={geo.neck} material={mat.graphite} position={[0, 0.07, 0]} />
              <mesh geometry={geo.neckCollar} material={mat.graphite} position={[0, 0.025, 0]} />
              <mesh geometry={geo.neckRing} material={mat.graphiteDeep} position={[0, 0.085, 0]} />
              <group name={NODE.head} position={[0, headPivot, 0]} rotation-order="YXZ">
                <Head geo={geo} mat={mat} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
