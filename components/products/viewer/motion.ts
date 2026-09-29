import * as THREE from "three";

/**
 * Procedural joint motion for the product 3D viewers. Joints are glTF nodes
 * whose extras carry the rotation axis and limits (see the GLB build notes in
 * public/products/lerobot/so101-ATTRIBUTION.txt). Poses are keyframes in
 * radians, eased and looped; every angle is clamped to the joint's limits.
 */

export type Joint = {
  node: THREE.Object3D;
  axis: THREE.Vector3;
  rest: THREE.Quaternion;
  min: number;
  max: number;
};

type Pose = Record<string, number>;
type Keyframe = { t: number; pose: Pose };
export type Rig = { joints: Map<string, Joint[]>; keyframes: Keyframe[]; period: number; still: Pose };

const tmp = new THREE.Quaternion();

function readJoint(node: THREE.Object3D): Joint | null {
  const u = node.userData as {
    axis?: number[];
    limits?: [number, number];
    min?: number;
    max?: number;
  };
  if (!Array.isArray(u.axis) || u.axis.length !== 3) return null;
  const min = u.limits?.[0] ?? u.min ?? -Math.PI;
  const max = u.limits?.[1] ?? u.max ?? Math.PI;
  return {
    node,
    axis: new THREE.Vector3(...(u.axis as [number, number, number])).normalize(),
    rest: node.quaternion.clone(),
    min,
    max,
  };
}

/**
 * SO-101 (single arm, or leader + follower pair where both copy the same
 * pose). A slow pick-and-place: reach down on the right, close the gripper,
 * lift, swing left, open, return.
 */
const SO101: { names: string[]; keyframes: Keyframe[]; period: number; still: Pose } = {
  names: ["shoulder_pan", "shoulder_lift", "elbow_flex", "wrist_flex", "wrist_roll", "gripper"],
  period: 11,
  // Reduced motion / poster: reaching forward, gripper open.
  still: { shoulder_pan: 0, shoulder_lift: 0.1, elbow_flex: 0.5, wrist_flex: -0.97, wrist_roll: 0, gripper: 0.9 },
  // Angles: shoulder_lift + tips the upper arm forward, elbow_flex + lowers
  // the forearm, wrist_flex + raises the gripper. Front of the arm is +x.
  keyframes: [
    { t: 0.0, pose: { shoulder_pan: 0, shoulder_lift: -0.9, elbow_flex: 1.5, wrist_flex: -0.5, wrist_roll: 0, gripper: 0.1 } },
    { t: 0.14, pose: { shoulder_pan: 0.6, shoulder_lift: 0.1, elbow_flex: 0.5, wrist_flex: -0.97, wrist_roll: 0, gripper: 1.0 } },
    { t: 0.26, pose: { shoulder_pan: 0.6, shoulder_lift: 0.45, elbow_flex: 0.5, wrist_flex: -0.62, wrist_roll: 0, gripper: 1.0 } },
    { t: 0.34, pose: { shoulder_pan: 0.6, shoulder_lift: 0.45, elbow_flex: 0.5, wrist_flex: -0.62, wrist_roll: 0, gripper: 0.05 } },
    { t: 0.46, pose: { shoulder_pan: 0.2, shoulder_lift: -0.2, elbow_flex: 0.8, wrist_flex: -0.97, wrist_roll: 0.5, gripper: 0.05 } },
    { t: 0.6, pose: { shoulder_pan: -0.6, shoulder_lift: 0.45, elbow_flex: 0.5, wrist_flex: -0.62, wrist_roll: 0.5, gripper: 0.05 } },
    { t: 0.68, pose: { shoulder_pan: -0.6, shoulder_lift: 0.45, elbow_flex: 0.5, wrist_flex: -0.62, wrist_roll: 0.5, gripper: 1.0 } },
    { t: 0.8, pose: { shoulder_pan: -0.3, shoulder_lift: -0.3, elbow_flex: 1.0, wrist_flex: -0.9, wrist_roll: 0, gripper: 0.5 } },
    { t: 1.0, pose: { shoulder_pan: 0, shoulder_lift: -0.9, elbow_flex: 1.5, wrist_flex: -0.5, wrist_roll: 0, gripper: 0.1 } },
  ],
};

/** XLeRobot: both arms make a small reach in turn while the head looks at them. */
const XLE: { names: string[]; keyframes: Keyframe[]; period: number; still: Pose } = {
  names: [
    "L_joint_shoulder_pan", "L_joint_shoulder_lift", "L_joint_elbow_flex", "L_joint_wrist_flex", "L_joint_gripper",
    "R_joint_shoulder_pan", "R_joint_shoulder_lift", "R_joint_elbow_flex", "R_joint_wrist_flex", "R_joint_gripper",
    "head_pan", "head_tilt",
  ],
  period: 12,
  still: {},
  keyframes: (() => {
    const rest = { pan: 0, lift: 0.6, elbow: 0.8, wrist: 0.3, grip: 0.2 };
    const reach = { pan: 0.25, lift: 1.6, elbow: 2.0, wrist: 0.1, grip: 0.9 };
    const arm = (side: "L" | "R", a: typeof rest, panSign: number): Pose => ({
      [`${side}_joint_shoulder_pan`]: a.pan * panSign,
      [`${side}_joint_shoulder_lift`]: a.lift,
      [`${side}_joint_elbow_flex`]: a.elbow,
      [`${side}_joint_wrist_flex`]: a.wrist,
      [`${side}_joint_gripper`]: a.grip,
    });
    const head = (pan: number, tilt: number): Pose => ({ head_pan: pan, head_tilt: tilt });
    return [
      { t: 0.0, pose: { ...arm("L", rest, 1), ...arm("R", rest, -1), ...head(0, 0.15) } },
      { t: 0.2, pose: { ...arm("L", reach, 1), ...arm("R", rest, -1), ...head(0.35, 0.3) } },
      { t: 0.32, pose: { ...arm("L", { ...reach, grip: 0.1 }, 1), ...arm("R", rest, -1), ...head(0.35, 0.3) } },
      { t: 0.48, pose: { ...arm("L", rest, 1), ...arm("R", rest, -1), ...head(0, 0.15) } },
      { t: 0.68, pose: { ...arm("L", rest, 1), ...arm("R", reach, -1), ...head(-0.35, 0.3) } },
      { t: 0.8, pose: { ...arm("L", rest, 1), ...arm("R", { ...reach, grip: 0.1 }, -1), ...head(-0.35, 0.3) } },
      { t: 1.0, pose: { ...arm("L", rest, 1), ...arm("R", rest, -1), ...head(0, 0.15) } },
    ];
  })(),
};

export function buildRig(root: THREE.Object3D, kind: "so101" | "xlerobot"): Rig {
  const def = kind === "so101" ? SO101 : XLE;
  const joints = new Map<string, Joint[]>();
  root.traverse((node) => {
    // SO-101 nodes are "joint_<name>" or "<leader|follower>_joint_<name>";
    // XLeRobot nodes use the exact names in XLE.names.
    const key =
      kind === "so101"
        ? def.names.find((n) => node.name === `joint_${n}` || node.name.endsWith(`_joint_${n}`))
        : def.names.find((n) => node.name === n);
    if (!key) return;
    const j = readJoint(node);
    if (!j) return;
    const list = joints.get(key) ?? [];
    list.push(j);
    joints.set(key, list);
  });
  return {
    joints,
    keyframes: def.keyframes,
    period: def.period,
    still: { ...def.keyframes[0].pose, ...def.still },
  };
}

const ease = (x: number) => x * x * (3 - 2 * x);

/** Pose at loop phase p ∈ [0, 1). */
function sample(keyframes: Keyframe[], p: number): Pose {
  let i = 0;
  while (i < keyframes.length - 2 && keyframes[i + 1].t <= p) i++;
  const a = keyframes[i];
  const b = keyframes[i + 1];
  const f = ease(Math.min(1, Math.max(0, (p - a.t) / (b.t - a.t || 1))));
  const out: Pose = {};
  for (const k of Object.keys(a.pose)) out[k] = a.pose[k] + ((b.pose[k] ?? a.pose[k]) - a.pose[k]) * f;
  return out;
}

export function applyPose(rig: Rig, pose: Pose) {
  for (const [name, list] of rig.joints) {
    const v = pose[name];
    if (v === undefined) continue;
    for (const j of list) {
      const a = Math.min(j.max, Math.max(j.min, v));
      tmp.setFromAxisAngle(j.axis, a);
      j.node.quaternion.copy(j.rest).multiply(tmp);
    }
  }
}

/** Apply the looping motion at time `t` seconds. */
export function applyMotion(rig: Rig, t: number) {
  const p = (((t / rig.period) % 1) + 1) % 1;
  applyPose(rig, sample(rig.keyframes, p));
}

/** A still pose for reduced motion and for the first frame. */
export function applyStill(rig: Rig) {
  applyPose(rig, rig.still);
}

/** Every joint at 0 rad (the model's rest pose as built). */
export function applyZero(rig: Rig) {
  for (const list of rig.joints.values()) for (const j of list) j.node.quaternion.copy(j.rest);
}
