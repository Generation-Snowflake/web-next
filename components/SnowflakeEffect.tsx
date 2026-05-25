"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

type SnowflakeSeed = {
  position: [number, number, number];
  speed: number;
  rotationSpeed: number;
  scale: number;
  rotation: [number, number, number];
};

function seededValue(seed: number) {
  const value = Math.sin(seed * 999) * 10000;
  return value - Math.floor(value);
}

function createSnowflakeSeed(index: number): SnowflakeSeed {
  const x = (seededValue(index + 1) - 0.5) * 15;
  const y = seededValue(index + 2) * 10 + 5;
  const z = (seededValue(index + 3) - 0.5) * 10;
  const speed = seededValue(index + 4) * 0.02 + 0.01;
  const rotationSpeed = (seededValue(index + 5) - 0.5) * 0.02;
  const scale = seededValue(index + 6) * 0.15 + 0.05;
  const rotation: [number, number, number] = [0, 0, seededValue(index + 7) * Math.PI];

  return { position: [x, y, z], speed, rotationSpeed, scale, rotation };
}

function Snowflakes({ count = 50 }) {
  const seeds = useMemo(
    () => Array.from({ length: count }, (_, index) => createSnowflakeSeed(index)),
    [count]
  );

  return (
    <group>
      {seeds.map((seed, index) => (
        <SnowflakeItem key={index} seed={seed} index={index} />
      ))}
    </group>
  );
}

function SnowflakeItem({ seed, index }: { seed: SnowflakeSeed; index: number }) {
  const texture = useTexture("/logo-tech.png");
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y -= seed.speed;
      ref.current.rotation.z += seed.rotationSpeed;

      if (ref.current.position.y < -6) {
        ref.current.position.y = 8;
        ref.current.position.x = (seededValue(index + 20) - 0.5) * 15;
      }
    }
  });

  return (
    <mesh
      ref={ref}
      position={seed.position}
      scale={[seed.scale, seed.scale, 1]}
      rotation={seed.rotation}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.1}
        depthWrite={false}
        opacity={0.9}
        emissive="#00ffff"
        emissiveIntensity={0.8}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function SnowflakeEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 h-full w-full">
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <Snowflakes count={30} />
      </Canvas>
    </div>
  );
}
