import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// Procedural geometry for the hero robot. Everything is generated once and
// shared; nothing here allocates per frame.

type Profile = ReadonlyArray<readonly [number, number]>;

/** Smooth a coarse [radius, y] outline with a Catmull-Rom spline. */
function smoothProfile(points: Profile, samples: number) {
  const curve = new THREE.SplineCurve(points.map(([x, y]) => new THREE.Vector2(x, y)));
  return curve.getSpacedPoints(samples).map((p) => new THREE.Vector2(Math.max(p.x, 0.0005), p.y));
}

/** Lathe with the UV seam at the back (phi = π) and optional depth squash. */
function lathe(points: Profile, samples = 56, radial = 72, zScale = 1) {
  const geo = new THREE.LatheGeometry(smoothProfile(points, samples), radial, Math.PI, Math.PI * 2);
  if (zScale !== 1) geo.scale(1, 1, zScale);
  return geo;
}

/** Elliptic ring that hugs a lathe surface (used for seams and light strips). */
function ring(radius: number, tube: number, zScale = 1, radial = 12, tubular = 96) {
  const geo = new THREE.TorusGeometry(radius, tube, radial, tubular);
  geo.rotateX(Math.PI / 2);
  if (zScale !== 1) geo.scale(1, 1, zScale);
  return geo;
}

// ---------------------------------------------------------------- head ----

export const HEAD = { rx: 0.47, ry: 0.39, n: 2.6, pinch: 0.16, zScale: 0.93 } as const;

/** Point on the helmet surface at height y and yaw phi (0 = front). `offset`
 *  pushes the point outward, proportionally from the head centre. */
function headPoint(y: number, phi: number, offset: number, out: THREE.Vector3) {
  const e = 2 / HEAD.n;
  const yy = THREE.MathUtils.clamp(y, -HEAD.ry, HEAD.ry);
  const s = Math.pow(Math.abs(yy) / HEAD.ry, 1 / e);
  const c = Math.sqrt(Math.max(1 - s * s, 0));
  const t = (yy / HEAD.ry + 1) / 2;
  const r = HEAD.rx * Math.pow(c, e) * (1 - HEAD.pinch * (1 - t) * (1 - t));
  out.set(r * Math.sin(phi), yy, r * Math.cos(phi) * HEAD.zScale);
  return out.multiplyScalar(1 + offset);
}

function headShell() {
  const pts: THREE.Vector2[] = [];
  const steps = 60;
  const v = new THREE.Vector3();
  for (let i = 0; i <= steps; i++) {
    // Cosine spacing packs more rings near the poles where curvature is high.
    const y = -HEAD.ry * Math.cos((Math.PI * i) / steps);
    headPoint(y, 0, 0, v);
    pts.push(new THREE.Vector2(Math.max(v.z / HEAD.zScale, 0.0005), v.y));
  }
  const geo = new THREE.LatheGeometry(pts, 80, Math.PI, Math.PI * 2);
  geo.scale(1, 1, HEAD.zScale);
  return geo;
}

/** Visor = a curved rounded-rectangle glass pane that follows the helmet and
 *  bulges slightly proud of it. Carries an `aFace` attribute in [-1, 1]² so the
 *  eye shader can draw in face space. */
export const VISOR = { phi: 1.0, y0: 0.0, yh: 0.2, n: 3.6, edge: 0.014, dome: 0.03 } as const;

function superEllipsePoint(theta: number, n: number, out: THREE.Vector2) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return out.set(Math.sign(c) * Math.pow(Math.abs(c), 2 / n), Math.sign(s) * Math.pow(Math.abs(s), 2 / n));
}

function visorPoint(dx: number, dy: number, lift: number, out: THREE.Vector3) {
  const norm = Math.pow(Math.pow(Math.abs(dx), VISOR.n) + Math.pow(Math.abs(dy), VISOR.n), 1 / VISOR.n);
  const offset = VISOR.edge + lift + VISOR.dome * (1 - Math.min(norm, 1) ** 2);
  return headPoint(VISOR.y0 + dy * VISOR.yh, dx * VISOR.phi, offset, out);
}

function visorGeometry() {
  const nu = 64;
  const nv = 40;
  const positions: number[] = [];
  const face: number[] = [];
  const index: number[] = [];
  const p = new THREE.Vector3();
  for (let j = 0; j <= nv; j++) {
    for (let i = 0; i <= nu; i++) {
      const u = (i / nu) * 2 - 1;
      const v = (j / nv) * 2 - 1;
      // Map concentric squares onto concentric super-ellipses.
      const m = Math.max(Math.abs(u), Math.abs(v));
      let dx = 0;
      let dy = 0;
      if (m > 1e-6) {
        const th = Math.atan2(v, u);
        const c = Math.abs(Math.cos(th));
        const s = Math.abs(Math.sin(th));
        const rse = Math.pow(Math.pow(c, VISOR.n) + Math.pow(s, VISOR.n), -1 / VISOR.n);
        dx = m * rse * Math.cos(th);
        dy = m * rse * Math.sin(th);
      }
      visorPoint(dx, dy, 0, p);
      positions.push(p.x, p.y, p.z);
      face.push(dx, dy);
    }
  }
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const a = j * (nu + 1) + i;
      const b = a + 1;
      const c = a + nu + 1;
      const d = c + 1;
      index.push(a, b, d, a, d, c);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("aFace", new THREE.Float32BufferAttribute(face, 2));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}

function visorBezel() {
  const pts: THREE.Vector3[] = [];
  const q = new THREE.Vector2();
  const n = 180;
  for (let i = 0; i < n; i++) {
    superEllipsePoint((i / n) * Math.PI * 2, VISOR.n, q);
    pts.push(visorPoint(q.x, q.y, -0.004, new THREE.Vector3()));
  }
  const curve = new THREE.CatmullRomCurve3(pts, true, "centripetal");
  return new THREE.TubeGeometry(curve, 260, 0.016, 10, true);
}

/** Split line from ear to ear over the crown of the helmet. */
function headSeam() {
  const pts: THREE.Vector3[] = [];
  const steps = 40;
  const y0 = 0.15;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i <= steps; i++) {
      const k = side < 0 ? i : steps - i;
      const y = y0 + (HEAD.ry - y0) * Math.sin(((k / steps) * Math.PI) / 2) - 0.0005;
      const v = headPoint(y, (side * Math.PI) / 2, 0.004, new THREE.Vector3());
      pts.push(v);
    }
  }
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  return new THREE.TubeGeometry(curve, 160, 0.0048, 6, false);
}

// --------------------------------------------------------------- torso ----

export const TORSO_Z = 0.72;

const TORSO_PROFILE: Profile = [
  [0.18, 1.07],
  [0.23, 1.015],
  [0.29, 1.04],
  [0.36, 1.14],
  [0.44, 1.3],
  [0.515, 1.47],
  [0.55, 1.6],
  [0.535, 1.72],
  [0.47, 1.815],
  [0.36, 1.88],
  [0.22, 1.91],
  [0.14, 1.915],
];

/** Radius of the torso shell at height y (linear lookup on the profile). */
export function torsoRadiusAt(y: number) {
  for (let i = 0; i < TORSO_PROFILE.length - 1; i++) {
    const [r0, y0] = TORSO_PROFILE[i];
    const [r1, y1] = TORSO_PROFILE[i + 1];
    if (y >= Math.min(y0, y1) && y <= Math.max(y0, y1)) {
      return r0 + ((y - y0) / (y1 - y0 || 1)) * (r1 - r0);
    }
  }
  return 0.4;
}

const POD_PROFILE: Profile = [
  [0.11, 0.12],
  [0.17, 0.16],
  [0.235, 0.25],
  [0.285, 0.38],
  [0.305, 0.5],
  [0.29, 0.6],
  [0.24, 0.69],
  [0.17, 0.74],
];

const UPPER_ARM: Profile = [
  [0.075, -0.05],
  [0.106, -0.12],
  [0.112, -0.22],
  [0.103, -0.32],
  [0.086, -0.39],
  [0.062, -0.425],
];

const FOREARM: Profile = [
  [0.06, -0.035],
  [0.092, -0.1],
  [0.109, -0.2],
  [0.104, -0.29],
  [0.087, -0.355],
  [0.064, -0.385],
];

export type RobotGeometries = ReturnType<typeof createRobotGeometries>;

export function createRobotGeometries() {
  const shoulderBall = new THREE.SphereGeometry(0.138, 40, 28);
  // Shoulder shell: a near-hemisphere with a rolled rim so it reads as a
  // thick moulded part rather than a paper-thin cap.
  const PAULDRON_R = 0.18;
  const PAULDRON_T = 1.5;
  const pauldron = new THREE.SphereGeometry(PAULDRON_R, 48, 24, 0, Math.PI * 2, 0, PAULDRON_T);
  const pauldronRim = new THREE.TorusGeometry(PAULDRON_R * Math.sin(PAULDRON_T) - 0.004, 0.013, 10, 64);
  pauldronRim.rotateX(Math.PI / 2);
  pauldronRim.translate(0, PAULDRON_R * Math.cos(PAULDRON_T), 0);

  const earPod = new THREE.CylinderGeometry(0.125, 0.13, 0.12, 48);
  earPod.rotateZ(Math.PI / 2);
  const earCap = new THREE.CylinderGeometry(0.078, 0.09, 0.02, 48);
  earCap.rotateZ(Math.PI / 2);
  const earRing = new THREE.TorusGeometry(0.098, 0.011, 12, 72);
  earRing.rotateY(Math.PI / 2);

  const palm = new RoundedBoxGeometry(0.075, 0.125, 0.13, 3, 0.03);
  const knuckles = new RoundedBoxGeometry(0.07, 0.035, 0.14, 2, 0.015);
  const finger = new THREE.CapsuleGeometry(0.02, 0.06, 6, 14);
  const thumb = new THREE.CapsuleGeometry(0.021, 0.045, 6, 14);

  const coreBezel = new THREE.CylinderGeometry(0.205, 0.215, 0.08, 6, 1);
  coreBezel.rotateX(Math.PI / 2);
  const coreFace = new THREE.CircleGeometry(0.168, 6);
  coreFace.rotateZ(Math.PI / 2);
  const burstRing = new THREE.RingGeometry(0.185, 0.2, 6);
  burstRing.rotateZ(Math.PI / 2);

  const shadow = new THREE.PlaneGeometry(1, 1);

  return {
    head: headShell(),
    visor: visorGeometry(),
    bezel: visorBezel(),
    headSeam: headSeam(),
    earPod,
    earCap,
    earRing,

    neck: new THREE.CylinderGeometry(0.115, 0.13, 0.2, 40),
    neckCollar: new THREE.CylinderGeometry(0.15, 0.15, 0.035, 40),
    neckRing: ring(0.123, 0.011, 1, 10, 64),
    torsoCollar: ring(0.17, 0.035, TORSO_Z, 16, 72),

    torso: lathe(TORSO_PROFILE, 56, 80, TORSO_Z),
    torsoSeam: ring(torsoRadiusAt(1.22) + 0.002, 0.0045, TORSO_Z, 6, 128),
    abdomen: new THREE.CylinderGeometry(0.2, 0.2, 0.42, 48),
    abdomenRib: ring(0.212, 0.026, 0.86, 12, 72),

    pod: lathe(POD_PROFILE, 44, 72, 0.92),
    podBand: ring(0.302, 0.02, 0.92, 12, 96),
    podLine: ring(0.306, 0.0055, 0.92, 6, 128),
    nozzle: new THREE.CylinderGeometry(0.125, 0.155, 0.08, 48),
    nozzleCap: (() => {
      const g = new THREE.CircleGeometry(0.125, 48);
      g.rotateX(Math.PI / 2);
      return g;
    })(),

    shoulderBall,
    pauldron,
    pauldronRim,
    upperArm: lathe(UPPER_ARM, 32, 40),
    armBand: ring(0.09, 0.015, 1, 10, 48),
    elbowBall: new THREE.SphereGeometry(0.088, 32, 20),
    forearm: lathe(FOREARM, 32, 40),
    cuffLight: ring(0.096, 0.0075, 1, 8, 48),
    wristBall: new THREE.SphereGeometry(0.055, 24, 16),
    palm,
    knuckles,
    finger,
    thumb,

    coreBezel,
    coreFace,
    burstRing,

    shadow,
  };
}

export function disposeGeometries(geo: Record<string, THREE.BufferGeometry>) {
  for (const g of Object.values(geo)) g.dispose();
}
