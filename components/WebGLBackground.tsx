"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function DistortedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float
      speed={2} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
    >
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#1a5f7a" // Teal-ish color to match existing theme
          emissive="#0d3b4f" // Slight glow
          roughness={0.2}
          metalness={0.8}
          distort={0.5} // Strength, 0 disables the effect (default=1)
          speed={2.0} // Speed (default=1)
        />
      </mesh>
    </Float>
  );
}

export default function WebGLBackground() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]} // Optimize for high DPI screens
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#00ffcc" />
        
        <DistortedSphere />
        
        {/* Environment for better reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
