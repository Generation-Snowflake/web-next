"use client";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  Html,
} from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/power-plant-hd.glb";

// The model is normalized to fit inside this world-space size (largest axis).
const FIT_SIZE = 10;

// The source GLB has 7 baked "wire_RRGGBB" materials whose photo textures map
// badly onto the model's UVs (washed-out / striped). We override them with a
// clean industrial steel/concrete palette for a coherent look.
const MATERIAL_COLORS: Record<string, string> = {
  wire_000000000: "#6b7785",
  wire_088144225: "#8d99a6",
  wire_227153153: "#b6c0c9",
  wire_138008110: "#525c68",
  wire_087225087: "#97a3b0",
  wire_140088225: "#7c8794",
  wire_177148027: "#abb4be",
};
const DEFAULT_COLOR = "#8a96a3";

type Hotspot = {
  id: string;
  name: string;
  tag: string;
  description: string;
  // Position of the marker, in normalized/centered world space.
  position: [number, number, number];
  // Where the camera flies to when this hotspot is selected.
  camera: [number, number, number];
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "reactor",
    name: "อาคารเตาปฏิกรณ์",
    tag: "Reactor Building",
    description:
      "หัวใจของโรงไฟฟ้า — เตาปฏิกรณ์ผลิตความร้อนเพื่อต้มน้ำเป็นไอน้ำแรงดันสูง ระบบหล่อเย็นและโครงสร้างกักเก็บความปลอดภัยถูกออกแบบให้ทนต่อแรงดันและรังสี",
    position: [0, 0.4, 0],
    camera: [0.85, 0.75, 0.85],
  },
  {
    id: "cooling",
    name: "หอหล่อเย็น",
    tag: "Cooling Tower",
    description:
      "ระบายความร้อนทิ้งออกจากวงจรไอน้ำ น้ำอุ่นจะถูกพ่นกระจายให้สัมผัสอากาศ ความร้อนระเหยออกไปก่อนน้ำหมุนเวียนกลับเข้าสู่ระบบควบแน่นอีกครั้ง",
    position: [-3.6, 0.4, -3.4],
    camera: [-4.25, 1.0, -4.05],
  },
  {
    id: "turbine",
    name: "ห้องกังหันไอน้ำ",
    tag: "Turbine Hall",
    description:
      "ไอน้ำแรงดันสูงขับกังหันให้หมุนเพลาที่ต่อกับเครื่องกำเนิดไฟฟ้า เปลี่ยนพลังงานกลเป็นพลังงานไฟฟ้า ถือเป็นจุดที่เกิดการผลิตไฟฟ้าจริง",
    position: [3.4, 0.4, 1.6],
    camera: [4.15, 0.95, 2.3],
  },
  {
    id: "control",
    name: "ห้องควบคุมกลาง",
    tag: "Control Room",
    description:
      "ศูนย์บัญชาการที่เฝ้าระวังและสั่งการทุกระบบแบบเรียลไทม์ — แรงดัน อุณหภูมิ การไหล และระบบความปลอดภัย ผ่านแผงควบคุมและระบบ SCADA",
    position: [-2.6, 0.4, 3.2],
    camera: [-3.25, 0.95, 3.85],
  },
  {
    id: "switchyard",
    name: "ลานไกไฟฟ้า",
    tag: "Switchyard",
    description:
      "ยกระดับแรงดันไฟฟ้าด้วยหม้อแปลงก่อนส่งเข้าสายส่งแรงสูง กระจายไฟฟ้าออกสู่โครงข่ายและผู้ใช้ พร้อมระบบตัดตอนเพื่อป้องกันความเสียหาย",
    position: [3.6, 0.4, -2.6],
    camera: [4.25, 1.0, -3.2],
  },
];

const OVERVIEW = {
  camera: new THREE.Vector3(9, 7, 9),
  target: new THREE.Vector3(0, 0, 0),
};

type Fit = { groundY: number; halfX: number; halfZ: number };
type Vec3 = [number, number, number];
type Points = Record<string, Vec3>;

const DEFAULT_POINTS: Points = Object.fromEntries(
  HOTSPOTS.map((h) => [h.id, h.position]),
);

function Model({
  onFit,
  onSnap,
}: {
  onFit: (fit: Fit) => void;
  onSnap: (points: Points) => void;
}) {
  const { scene } = useGLTF(MODEL_URL, "/draco/");

  // Center the model at the origin and scale it to a predictable size so the
  // hotspots line up regardless of source units. The giant ground planes are
  // already stripped from the GLB at build time.
  useLayoutEffect(() => {
    scene.scale.set(1, 1, 1);
    scene.position.set(0, 0, 0);
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = FIT_SIZE / maxDim;

    scene.scale.setScalar(s);
    scene.position.set(-center.x * s, -center.y * s, -center.z * s);
    scene.updateMatrixWorld(true);

    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((mat) => {
        const m = mat as THREE.MeshStandardMaterial;
        const key = Object.keys(MATERIAL_COLORS).find((k) => m.name?.startsWith(k));
        m.map = null;
        m.color.set(key ? MATERIAL_COLORS[key] : DEFAULT_COLOR);
        m.metalness = 0.55;
        m.roughness = 0.55;
        m.needsUpdate = true;
      });
    });

    onFit({
      groundY: (-size.y * s) / 2,
      halfX: (size.x * s) / 2,
      halfZ: (size.z * s) / 2,
    });

    // Snap each hotspot onto the actual model surface: cast a ray straight down
    // at its XZ and take the topmost hit, so markers sit on the structures.
    const raycaster = new THREE.Raycaster();
    const down = new THREE.Vector3(0, -1, 0);
    const topY = (size.y * s) / 2 + 1;
    const snapped: Points = {};
    for (const h of HOTSPOTS) {
      const [hx, , hz] = h.position;
      raycaster.set(new THREE.Vector3(hx, topY, hz), down);
      const hits = raycaster.intersectObject(scene, true);
      snapped[h.id] = hits.length
        ? [hx, hits[0].point.y + 0.04, hz]
        : h.position;
    }
    onSnap(snapped);
  }, [scene, onFit, onSnap]);

  return <primitive object={scene} />;
}

/* ------------------------------ markers / rig ----------------------------- */

function Marker({
  hotspot,
  position,
  active,
  onSelect,
}: {
  hotspot: Hotspot;
  position: Vec3;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <Html position={position} center distanceFactor={12} zIndexRange={[20, 0]}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hotspot.id);
        }}
        className="group relative flex -translate-y-1/2 items-center gap-2 whitespace-nowrap"
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          {!active && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice/60" />
          )}
          <span
            className={`relative inline-flex h-3 w-3 rounded-full border-2 transition ${
              active
                ? "border-ice bg-ice shadow-glow"
                : "border-ice bg-darkbg group-hover:bg-ice"
            }`}
          />
        </span>
        {/* Label hides while active — the anchored info card shows the name. */}
        {!active && (
          <span className="rounded-md border border-ice/20 bg-darkbg/70 px-2 py-0.5 text-[11px] font-medium text-softwhite/80 backdrop-blur-md transition group-hover:border-ice/60 group-hover:text-ice">
            {hotspot.name}
          </span>
        )}
      </button>
    </Html>
  );
}

// Detail card anchored at the object's 3D position. Uses distanceFactor so it
// scales together with the model as the camera zooms in/out.
function InfoCard({
  hotspot,
  position,
  onClose,
}: {
  hotspot: Hotspot;
  position: Vec3;
  onClose: () => void;
}) {
  const [x, y, z] = position;
  return (
    <Html
      position={[x, y + 0.22, z]}
      center
      distanceFactor={2.4}
      zIndexRange={[40, 10]}
    >
      <div className="pointer-events-auto w-44 -translate-y-1/2 rounded-lg border border-ice/30 bg-darkbg/90 p-3 shadow-glow backdrop-blur-xl">
        <button
          onClick={onClose}
          aria-label="ปิด"
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-ice/20 text-[10px] text-softwhite/60 transition hover:border-ice hover:text-ice"
        >
          ✕
        </button>
        <p className="mb-0.5 pr-5 text-[9px] uppercase tracking-[0.2em] text-ice/70">
          {hotspot.tag}
        </p>
        <h3 className="mb-1.5 text-sm font-bold leading-tight text-softwhite">
          {hotspot.name}
        </h3>
        <p className="text-[11px] leading-snug text-softwhite/70">
          {hotspot.description}
        </p>
      </div>
    </Html>
  );
}

// Smoothly flies the camera + OrbitControls target toward the active view.
function CameraRig({
  controls,
  activeId,
  points,
}: {
  controls: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>;
  activeId: string | null;
  points: Points;
}) {
  const desiredPos = useRef(OVERVIEW.camera.clone());
  const desiredTarget = useRef(OVERVIEW.target.clone());
  const animating = useRef(false);

  useEffect(() => {
    const spot = HOTSPOTS.find((h) => h.id === activeId);
    if (spot) {
      desiredPos.current.set(...spot.camera);
      desiredTarget.current.set(...(points[spot.id] ?? spot.position));
    } else {
      desiredPos.current.copy(OVERVIEW.camera);
      desiredTarget.current.copy(OVERVIEW.target);
    }
    animating.current = true;
  }, [activeId, points]);

  useFrame(({ camera }, delta) => {
    if (!animating.current) return;
    const ctrl = controls.current;
    const t = 1 - Math.pow(0.001, delta); // frame-rate independent easing

    camera.position.lerp(desiredPos.current, t);
    if (ctrl) {
      ctrl.target.lerp(desiredTarget.current, t);
      ctrl.update();
    }

    const done =
      camera.position.distanceToSquared(desiredPos.current) < 0.0004 &&
      (!ctrl || ctrl.target.distanceToSquared(desiredTarget.current) < 0.0004);
    if (done) animating.current = false;
  });

  return null;
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-softwhite/70">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ice/30 border-t-ice" />
        <span className="text-sm tracking-wide">กำลังโหลดโมเดล…</span>
      </div>
    </Html>
  );
}

function Scene({
  activeId,
  onSelect,
  points,
  onSnap,
}: {
  activeId: string | null;
  onSelect: (id: string | null) => void;
  points: Points;
  onSnap: (points: Points) => void;
}) {
  const [fit, setFit] = useState<Fit | null>(null);
  const active = HOTSPOTS.find((h) => h.id === activeId) ?? null;
  return (
    <>
      <Model onFit={setFit} onSnap={onSnap} />
      {/* Markers show only in the overview — once a hotspot is selected they
          hide, leaving just the description card. */}
      {activeId === null &&
        HOTSPOTS.map((h) => (
          <Marker
            key={h.id}
            hotspot={h}
            position={points[h.id]}
            active={false}
            onSelect={onSelect}
          />
        ))}
      {active && (
        <InfoCard
          hotspot={active}
          position={points[active.id]}
          onClose={() => onSelect(null)}
        />
      )}
      <ContactShadows
        position={[0, fit ? fit.groundY + 0.01 : -0.3, 0]}
        scale={16}
        blur={2.5}
        opacity={0.45}
        far={6}
      />
      <Environment preset="city" />
    </>
  );
}

export default function PowerPlantViewer() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [points, setPoints] = useState<Points>(DEFAULT_POINTS);
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-darkbg">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [9, 7, 9], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={["#0a0f1f"]} />
        <fog attach="fog" args={["#0a0f1f", 18, 40]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[6, 10, 6]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={40}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
        />

        <Suspense fallback={<Loader />}>
          <Scene
            activeId={activeId}
            onSelect={setActiveId}
            points={points}
            onSnap={setPoints}
          />
        </Suspense>

        <OrbitControls
          ref={controls}
          enablePan
          enableZoom
          enableDamping
          minDistance={0.25}
          maxDistance={22}
          maxPolarAngle={Math.PI / 2.05}
          makeDefault
        />
        <CameraRig controls={controls} activeId={activeId} points={points} />
      </Canvas>

      {/* Hint */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-ice/10 bg-darkbg/50 px-3 py-2 text-xs text-softwhite/60 backdrop-blur-md">
        ลากเพื่อหมุน · สครอลล์เพื่อซูม · คลิกจุดหรือเลือกจากเมนู
      </div>

      {/* Location menu */}
      <div className="pointer-events-auto absolute right-4 top-4 flex w-[210px] flex-col gap-1 rounded-xl border border-ice/15 bg-darkbg/70 p-2 backdrop-blur-md">
        <span className="px-2 py-1 text-xs uppercase tracking-wider text-softwhite/50">
          จุดสำคัญ · {HOTSPOTS.length}
        </span>
        <button
          onClick={() => setActiveId(null)}
          className={`rounded-md px-3 py-1.5 text-left text-sm transition ${
            activeId === null
              ? "bg-ice/15 text-ice"
              : "text-softwhite/70 hover:bg-white/5 hover:text-ice"
          }`}
        >
          ↺ มุมมองรวม
        </button>
        <div className="my-1 h-px bg-ice/10" />
        {HOTSPOTS.map((h) => (
          <button
            key={h.id}
            onClick={() => setActiveId(h.id)}
            className={`rounded-md px-3 py-1.5 text-left text-sm transition ${
              activeId === h.id
                ? "bg-ice/15 text-ice"
                : "text-softwhite/70 hover:bg-white/5 hover:text-ice"
            }`}
          >
            {h.name}
            <span className="block text-[10px] uppercase tracking-wider text-softwhite/40">
              {h.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

useGLTF.preload(MODEL_URL, "/draco/");
