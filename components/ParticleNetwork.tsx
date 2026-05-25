"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import * as random from "maath/random/dist/maath-random.esm";

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
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-darkbg/50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
