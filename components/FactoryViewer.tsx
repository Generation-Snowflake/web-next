"use client";

import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const factoryData = {
  zoneA: {
    name: "คลังสินค้า (Warehouse)",
    position: [-4, 0.75, 0] as [number, number, number],
    color: "#ff6b6b",
    info: "พื้นที่จัดเก็บวัตถุดิบและสินค้าสำเร็จรูป รองรับการโหลดสินค้า 24 ชม.",
  },
  zoneB: {
    name: "ไลน์การผลิต (Production Line)",
    position: [0, 1, 0] as [number, number, number],
    color: "#4dadf7",
    info: "สายพานการผลิตหลัก ติดตั้งหุ่นยนต์ประกอบชิ้นส่วนอัตโนมัติ 5 ตัว",
  },
  zoneC: {
    name: "ห้องควบคุม (Control Room)",
    position: [4, 0.75, 0] as [number, number, number],
    color: "#51cf66",
    info: "ศูนย์บัญชาการระบบดิจิทัล ตรวจสอบสถานะเครื่องจักรแบบ Real-time",
  },
};

type ZoneKey = keyof typeof factoryData;
type Zone = (typeof factoryData)[ZoneKey];

interface CameraTarget {
  pos: [number, number, number];
  lookAt: [number, number, number];
}

function CameraController({ target }: { target: CameraTarget }) {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(...target.pos), 0.08);
    const lookAtVec = new THREE.Vector3(...target.lookAt);
    state.camera.lookAt(lookAtVec);
    state.camera.updateProjectionMatrix();
  });
  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2.1}
    />
  );
}

function ZoneMesh({
  zoneKey,
  zone,
  isActive,
  onClick,
}: {
  zoneKey: ZoneKey;
  zone: Zone;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <mesh
      position={zone.position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={zoneKey === "zoneB" ? [2, 2, 3] : [2, 1.5, 2]} />
      <meshStandardMaterial
        color={hovered ? "#ffffff" : zone.color}
        emissive={isActive ? zone.color : "#000000"}
        emissiveIntensity={isActive ? 0.35 : 0}
      />
    </mesh>
  );
}

export default function FactoryViewer() {
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [targetCamera, setTargetCamera] = useState<CameraTarget>({
    pos: [0, 8, 12],
    lookAt: [0, 0, 0],
  });

  const handleSelectZone = (zoneKey: ZoneKey | null) => {
    if (!zoneKey) {
      setActiveZone(null);
      setTargetCamera({ pos: [0, 8, 12], lookAt: [0, 0, 0] });
      return;
    }
    const zone = factoryData[zoneKey];
    setActiveZone(zone);
    setTargetCamera({
      pos: [zone.position[0], zone.position[1] + 3, zone.position[2] + 5],
      lookAt: zone.position,
    });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-ice/20 bg-[#1a1a1a]" style={{ height: "70vh", minHeight: 480 }}>
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <gridHelper args={[20, 10, "#555555", "#444444"]} position={[0, 0.01, 0]} />

        {(Object.keys(factoryData) as ZoneKey[]).map((key) => (
          <ZoneMesh
            key={key}
            zoneKey={key}
            zone={factoryData[key]}
            isActive={activeZone?.name === factoryData[key].name}
            onClick={() => handleSelectZone(key)}
          />
        ))}

        <CameraController target={targetCamera} />
      </Canvas>

      {/* Zone menu — top left */}
      <div className="absolute left-4 top-4 w-56 rounded-xl border border-ice/20 bg-black/70 p-4 backdrop-blur-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ice/70">
          🏭 เลือกโซน
        </p>
        {[null, "zoneA", "zoneB", "zoneC"].map((key) => {
          const isOverview = key === null;
          const label = isOverview
            ? "ภาพรวมโรงงาน"
            : key === "zoneA"
            ? "โซน A: คลังสินค้า"
            : key === "zoneB"
            ? "โซน B: ไลน์การผลิต"
            : "โซน C: ห้องควบคุม";
          const active = isOverview
            ? activeZone === null
            : activeZone?.name === factoryData[key as ZoneKey].name;
          return (
            <button
              key={String(key)}
              onClick={() => handleSelectZone(key as ZoneKey | null)}
              className={`mb-2 w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                active
                  ? "bg-ice text-darkbg"
                  : "bg-white/5 text-softwhite/80 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Zone detail — bottom right */}
      {activeZone && (
        <div className="absolute bottom-4 right-4 w-72 rounded-xl border border-ice/20 bg-black/80 p-5 backdrop-blur-sm">
          <h4
            className="mb-2 border-b pb-2 text-base font-bold text-white"
            style={{ borderColor: activeZone.color }}
          >
            {activeZone.name}
          </h4>
          <p className="text-sm leading-relaxed text-softwhite/70">
            {activeZone.info}
          </p>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 rounded-lg bg-ice/90 py-2 text-sm font-semibold text-darkbg transition hover:bg-ice">
              ดูระบบภายใน
            </button>
            <button
              onClick={() => handleSelectZone(null)}
              className="rounded-lg bg-white/10 px-3 py-2 text-sm text-softwhite/70 transition hover:bg-white/20"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      {/* Hint */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-softwhite/30">
        คลิกที่โมเดลหรือเมนูเพื่อซูม · ลากเพื่อหมุนกล้อง
      </p>
    </div>
  );
}
