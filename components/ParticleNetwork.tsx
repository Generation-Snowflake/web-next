"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import * as random from "maath/random/dist/maath-random.esm";
import WebGLScene from "./WebGLScene";
import { useInView } from "./useInView";

type ParticleFieldProps = {
  radius?: number;
};

function ParticleField({ radius = 1.5 }: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(5001), { radius }),
    [radius]
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2dd4bf"
          size={0.003}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ParticleNetwork() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="absolute inset-0 -z-10 h-full w-full bg-darkbg/50">
      <WebGLScene
        fallback={
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.10),transparent_55%)]"
          />
        }
      >
        <Canvas frameloop={inView ? "always" : "never"} camera={{ position: [0, 0, 1] }}>
          <ParticleField />
        </Canvas>
      </WebGLScene>
    </div>
  );
}
