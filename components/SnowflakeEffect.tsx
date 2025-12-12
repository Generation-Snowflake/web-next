"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Instances, Instance } from "@react-three/drei";
import * as THREE from "three";

function Snowflakes({ count = 50 }) {
  const texture = useTexture("/logo-tech.png");
  // We don't actually need viewport from useTexture, but we need the texture itself.
  // Let's load texture properly within the component usage or passing it down.
  // Simplification: We'll use a plain mesh for each snowflakemapped with the texture.
  return (
    <group>
       {Array.from({ length: count }).map((_, i) => (
        <SnowflakeItem key={i} />
      ))}
    </group>
  );
}

function SnowflakeItem() {
   const texture = useTexture("/logo-tech.png");
   const ref = useRef<THREE.Mesh>(null);
   
   const [position, speed, rotationSpeed, scale] = useMemo(() => {
     const x = (Math.random() - 0.5) * 15;
     const y = Math.random() * 10 + 5;
     const z = (Math.random() - 0.5) * 10;
     const speed = Math.random() * 0.02 + 0.01;
     const rotationSpeed = (Math.random() - 0.5) * 0.02;
     const scale = Math.random() * 0.15 + 0.05; // Smaller size
     return [[x, y, z], speed, rotationSpeed, scale];
   }, []);

   useFrame(() => {
     if (ref.current) {
       ref.current.position.y -= speed;
       ref.current.rotation.z += rotationSpeed;
       
       // Reset if below view
       if (ref.current.position.y < -6) {
         ref.current.position.y = 8;
         ref.current.position.x = (Math.random() - 0.5) * 15;
       }
     }
   });

   return (
     <mesh ref={ref} position={position as any} scale={[scale, scale, 1]} rotation={[0,0, Math.random() * Math.PI]}>
       <planeGeometry args={[1, 1]} />
       <meshStandardMaterial 
        map={texture} 
        transparent 
        alphaTest={0.1} // Fix transparency edges
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
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <Snowflakes count={30} />
      </Canvas>
    </div>
  );
}
