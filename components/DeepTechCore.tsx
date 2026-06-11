"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import WebGLScene from "./WebGLScene";
import { useInView } from "./useInView";

type TargetKey = "home" | "about" | "services" | "portfolio" | "contact";

type ViewPointer = {
  x: number;
  y: number;
};

const targetAngles: Record<TargetKey, number> = {
  home: -0.2,
  about: -0.72,
  services: 0.22,
  portfolio: 0.68,
  contact: 1.02,
};

function getTargetFromHref(value: string): TargetKey {
  const cleanValue = value.replace("#", "").replace("/", "");

  if (cleanValue in targetAngles) {
    return cleanValue as TargetKey;
  }

  return "home";
}

function useNavigationTarget() {
  const [target, setTarget] = useState<TargetKey>("home");

  useEffect(() => {
    const handleTarget = (event: Event) => {
      const detail = (event as CustomEvent<{ target?: string }>).detail;
      if (detail?.target) {
        setTarget(getTargetFromHref(detail.target));
      }
    };

    const handleHash = () => {
      setTarget(getTargetFromHref(window.location.hash || "home"));
    };

    window.addEventListener("gsf:navigation-target", handleTarget);
    window.addEventListener("hashchange", handleHash);
    handleHash();

    return () => {
      window.removeEventListener("gsf:navigation-target", handleTarget);
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  return target;
}

function useViewportPointer() {
  const pointerRef = useRef<ViewPointer>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: -(event.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return pointerRef;
}

function RobotHumanoid({ target }: { target: TargetKey }) {
  const pointer = useViewportPointer();
  const robotRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);

  const scanPoints = useMemo(
    () => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 2.45)],
    []
  );

  const orbitPositions = useMemo(() => {
    const positions = new Float32Array(96);

    for (let i = 0; i < positions.length; i += 3) {
      const index = i / 3;
      const angle = (index / 32) * Math.PI * 2;
      const radius = index % 3 === 0 ? 1.85 : 1.35;

      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = Math.sin(angle * 2.1) * 0.42 + 0.2;
      positions[i + 2] = Math.sin(angle) * radius;
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const pointerX = pointer.current.x;
    const pointerY = pointer.current.y;
    const desiredYaw = targetAngles[target] + pointerX * 0.28;
    const desiredPitch = pointerY * 0.16;

    if (robotRef.current) {
      robotRef.current.rotation.y = THREE.MathUtils.lerp(
        robotRef.current.rotation.y,
        desiredYaw,
        0.055
      );
      robotRef.current.position.y = Math.sin(time * 1.15) * 0.035;
    }

    if (torsoRef.current) {
      torsoRef.current.rotation.z = THREE.MathUtils.lerp(
        torsoRef.current.rotation.z,
        pointerX * 0.045,
        0.05
      );
    }

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        pointerX * 0.32,
        0.08
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        desiredPitch,
        0.08
      );
    }

    if (armRef.current) {
      armRef.current.rotation.x = THREE.MathUtils.lerp(
        armRef.current.rotation.x,
        -0.26 + pointerY * 0.08,
        0.06
      );
      armRef.current.rotation.y = THREE.MathUtils.lerp(
        armRef.current.rotation.y,
        0.48 + pointerX * 0.14,
        0.06
      );
      armRef.current.rotation.z = THREE.MathUtils.lerp(
        armRef.current.rotation.z,
        -0.72,
        0.06
      );
    }

    if (nodesRef.current) {
      nodesRef.current.rotation.y += delta * 0.18;
      nodesRef.current.rotation.x = Math.sin(time * 0.38) * 0.08;
    }
  });

  return (
    <group position={[1.25, -0.18, 0]} scale={1.08}>
      <Float speed={1.15} floatIntensity={0.18} rotationIntensity={0.08}>
        <group ref={robotRef}>
          <group ref={torsoRef}>
            <mesh position={[0, -0.42, 0]}>
              <capsuleGeometry args={[0.34, 0.82, 8, 24]} />
              <meshStandardMaterial
                color="#0d2433"
                emissive="#00d4ff"
                emissiveIntensity={0.09}
                metalness={0.78}
                roughness={0.24}
              />
            </mesh>
            <mesh position={[0, -0.08, 0.35]}>
              <boxGeometry args={[0.48, 0.12, 0.04]} />
              <meshBasicMaterial color="#6aefff" transparent opacity={0.72} />
            </mesh>
            <mesh position={[0, -0.64, 0.36]}>
              <boxGeometry args={[0.32, 0.08, 0.04]} />
              <meshBasicMaterial color="#2dd4bf" transparent opacity={0.55} />
            </mesh>
          </group>

          <group ref={headRef} position={[0, 0.46, 0]}>
            <mesh>
              <boxGeometry args={[0.64, 0.46, 0.52]} />
              <meshStandardMaterial
                color="#102a3a"
                emissive="#00d4ff"
                emissiveIntensity={0.12}
                metalness={0.72}
                roughness={0.22}
              />
            </mesh>
            <mesh position={[-0.16, 0.04, 0.28]}>
              <boxGeometry args={[0.12, 0.055, 0.035]} />
              <meshBasicMaterial color="#6aefff" />
            </mesh>
            <mesh position={[0.16, 0.04, 0.28]}>
              <boxGeometry args={[0.12, 0.055, 0.035]} />
              <meshBasicMaterial color="#6aefff" />
            </mesh>
            <mesh position={[0, -0.14, 0.285]}>
              <boxGeometry args={[0.28, 0.028, 0.03]} />
              <meshBasicMaterial color="#2dd4bf" transparent opacity={0.75} />
            </mesh>
            <mesh position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.19, 0.008, 8, 60]} />
              <meshBasicMaterial color="#6aefff" transparent opacity={0.45} />
            </mesh>
          </group>

          <group ref={armRef} position={[0.44, -0.08, 0.02]}>
            <mesh position={[0.34, -0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
              <capsuleGeometry args={[0.065, 0.58, 8, 18]} />
              <meshStandardMaterial color="#123346" metalness={0.7} roughness={0.28} />
            </mesh>
            <mesh position={[0.68, -0.14, 0]}>
              <sphereGeometry args={[0.105, 20, 20]} />
              <meshBasicMaterial color="#6aefff" transparent opacity={0.85} />
            </mesh>
            <group position={[0.78, -0.14, 0.03]} rotation={[0.02, 0, 0]}>
              <Line points={scanPoints} color="#00d4ff" lineWidth={1.7} transparent opacity={0.78} />
              <mesh position={[0, 0, 2.5]}>
                <coneGeometry args={[0.06, 0.18, 5]} />
                <meshBasicMaterial color="#6aefff" transparent opacity={0.86} />
              </mesh>
            </group>
          </group>

          <mesh position={[0, -1.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.62, 0.016, 12, 120]} />
            <meshBasicMaterial color="#00d4ff" transparent opacity={0.28} />
          </mesh>
        </group>
      </Float>

      <group position={[0, -0.12, 0]}>
        <mesh rotation={[Math.PI / 2, 0.1, 0]}>
          <torusGeometry args={[1.44, 0.006, 12, 140]} />
          <meshBasicMaterial color="#6aefff" transparent opacity={0.24} />
        </mesh>
        <mesh rotation={[1.15, 0.4, 0.4]}>
          <torusGeometry args={[1.86, 0.005, 12, 140]} />
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.16} />
        </mesh>
        <Points ref={nodesRef} positions={orbitPositions} stride={3} frustumCulled={false}>
          <PointMaterial
            transparent
            color="#6aefff"
            size={0.026}
            sizeAttenuation
            depthWrite={false}
          />
        </Points>
      </group>
    </group>
  );
}

export default function DeepTechCore() {
  const target = useNavigationTarget();
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-10 opacity-70 sm:opacity-85 lg:opacity-100"
    >
      <WebGLScene
        fallback={
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative h-[42vh] max-h-[420px] w-[42vh] max-w-[420px]">
              <div className="absolute inset-0 rounded-full border border-ice/15" />
              <div className="absolute inset-[14%] rounded-full border border-ice/20" />
              <div className="absolute inset-[34%] rounded-full border border-ice/25" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.18),transparent_62%)]" />
              <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ice shadow-glow" />
            </div>
          </div>
        }
      >
        <Canvas
          frameloop={inView ? "always" : "never"}
          camera={{ position: [0, 0, 5.8], fov: 42 }}
          dpr={[1, 1.7]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.68} />
          <directionalLight position={[2.8, 4, 4]} intensity={1.4} color="#ffffff" />
          <pointLight position={[3, 2.2, 4]} intensity={2.2} color="#6aefff" />
          <pointLight position={[-4, -2, 3]} intensity={0.9} color="#2dd4bf" />
          <RobotHumanoid target={target} />
        </Canvas>
      </WebGLScene>
    </div>
  );
}
