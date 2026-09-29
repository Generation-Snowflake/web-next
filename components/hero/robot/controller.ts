import type { RootState } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";
import { RobotBrain } from "./brain";
import { ARM_KEYS, DIM, HEAD_CENTER_Y, POSE_IDLE, type ArmPose } from "./config";
import { setRobotCursor, type RobotInput } from "./input";
import { LED, type RobotMaterials } from "./materials";

// Per-frame driver for the robot rig: reads window input, asks the brain for
// targets, then damps and applies them to the scene graph. Kept outside React
// on purpose — it mutates three.js objects imperatively every frame.

/** Names given to rig nodes in RobotModel's JSX. */
export const NODE = {
  float: "rig-float",
  torso: "rig-torso",
  neck: "rig-neck",
  head: "rig-head",
  burst: "rig-burst",
  shadow: "rig-shadow",
  shoulderL: "rig-shoulder-l",
  elbowL: "rig-elbow-l",
  wristL: "rig-wrist-l",
  shoulderR: "rig-shoulder-r",
  elbowR: "rig-elbow-r",
  wristR: "rig-wrist-r",
} as const;

type Nodes = Record<keyof typeof NODE, THREE.Object3D>;
type Arm = { shoulder: THREE.Object3D; elbow: THREE.Object3D; wrist: THREE.Object3D };
type Rig = Nodes & { armL: Arm; armR: Arm };

const clamp = THREE.MathUtils.clamp;
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export type FrameOptions = { reducedMotion: boolean };

export class RobotController {
  private brain = new RobotBrain();
  private rig: Rig | null = null;

  private raycaster = new THREE.Raycaster();
  private ndc = new THREE.Vector2();
  private inv = new THREE.Matrix4();
  private localRay = new THREE.Ray();
  private sphere = new THREE.Sphere();
  private v = new THREE.Vector3();
  private w = new THREE.Vector3();
  private top = new THREE.Vector3();
  private bottom = new THREE.Vector3();
  private poseL: ArmPose = { ...POSE_IDLE };
  private poseR: ArmPose = { ...POSE_IDLE };

  private live = {
    headYaw: 0,
    headPitch: 0,
    torsoYaw: 0,
    torsoPitch: 0,
    engaged: 0,
    happy: 0,
    eyeScale: 1,
    gazeX: 0,
    gazeY: 0,
    floatY: 0,
    lean: 0,
  };

  constructor(private mat: RobotMaterials) {}

  /** Look up the named rig nodes once (RobotModel mounts them together). */
  private resolve(root: THREE.Object3D): Rig | null {
    const found = {} as Partial<Nodes>;
    for (const key of Object.keys(NODE) as (keyof typeof NODE)[]) {
      const obj = root.getObjectByName(NODE[key]);
      if (!obj) return null;
      found[key] = obj;
    }
    const n = found as Nodes;
    return {
      ...n,
      armL: { shoulder: n.shoulderL, elbow: n.elbowL, wrist: n.wristL },
      armR: { shoulder: n.shoulderR, elbow: n.elbowR, wrist: n.wristR },
    };
  }

  private hitRobot(headY: number) {
    const { localRay, sphere, live } = this;
    localRay.copy(this.raycaster.ray).applyMatrix4(this.inv);
    sphere.set(sphere.center.set(0, headY, 0), 0.5);
    if (localRay.intersectsSphere(sphere)) return true;
    sphere.set(sphere.center.set(0, 1.42 + live.floatY, 0), 0.62);
    if (localRay.intersectsSphere(sphere)) return true;
    sphere.set(sphere.center.set(0, 0.45 + live.floatY, 0), 0.38);
    return localRay.intersectsSphere(sphere);
  }

  private toNdc(input: RobotInput, x: number, y: number) {
    const r = input.rect;
    return this.ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
  }

  private applyArm(arm: Arm, pose: ArmPose, target: ArmPose, osc: ArmPose, dt: number) {
    for (const key of ARM_KEYS) easing.damp(pose, key, target[key], 0.17, dt);
    arm.shoulder.rotation.set(pose.sx + osc.sx, pose.sy + osc.sy, pose.sz + osc.sz);
    arm.elbow.rotation.set(pose.ex + osc.ex, 0, pose.ez + osc.ez);
    arm.wrist.rotation.set(pose.wx + osc.wx, pose.wy + osc.wy, pose.wz + osc.wz);
  }

  update(root: THREE.Object3D, state: RootState, delta: number, input: RobotInput, opts: FrameOptions) {
    if (!this.rig) this.rig = this.resolve(root);
    const n = this.rig;
    if (!n) return;

    const dt = Math.min(delta, 1 / 20);
    const { camera, size } = state;
    const { raycaster, inv, v, w, live, mat } = this;
    const now = performance.now();

    root.updateWorldMatrix(true, false);
    inv.copy(root.matrixWorld).invert();
    const headY = HEAD_CENTER_Y + live.floatY;

    // ---- pointer → look direction, hover, proximity ----------------------
    const pointerActive = input.hasPointer && now - input.lastMove < (input.touch ? 2500 : 5000);
    let pointerYaw = 0;
    let pointerPitch = 0;
    let hover = false;
    let proximity = 0;
    if (input.hasPointer) {
      const ndc = this.toNdc(input, input.x, input.y);
      raycaster.setFromCamera(ndc, camera);
      const ray = raycaster.ray;
      // Aim at a plane a little in front of the face, so a cursor over the
      // headline on the left really makes the robot look left.
      v.set(0, headY, 0).applyMatrix4(root.matrixWorld);
      const planeZ = v.z + 4.5;
      const t = Math.abs(ray.direction.z) > 1e-4 ? (planeZ - ray.origin.z) / ray.direction.z : 0;
      w.copy(ray.direction).multiplyScalar(t).add(ray.origin).applyMatrix4(inv);
      const ly = w.y - headY;
      pointerYaw = Math.atan2(w.x, w.z);
      pointerPitch = Math.atan2(ly, Math.hypot(w.x, w.z));

      if (!input.touch) hover = this.hitRobot(headY);

      // Cursor ↔ head distance in pixels, relative to the robot's height.
      v.project(camera);
      this.top.set(0, DIM.topY, 0).applyMatrix4(root.matrixWorld).project(camera);
      this.bottom.set(0, DIM.floorY, 0).applyMatrix4(root.matrixWorld).project(camera);
      const robotPx = Math.max(((this.top.y - this.bottom.y) * size.height) / 2, 1);
      const px = Math.hypot(((ndc.x - v.x) * size.width) / 2, ((ndc.y - v.y) * size.height) / 2);
      proximity = 1 - smoothstep(0.3, 0.85, px / robotPx);
    }

    let poke = false;
    if (input.tap.pending) {
      input.tap.pending = false;
      raycaster.setFromCamera(this.toNdc(input, input.tap.x, input.tap.y), camera);
      poke = this.hitRobot(headY);
    }
    setRobotCursor(input, hover && !input.overInteractive && !input.touch);

    w.copy(camera.position).applyMatrix4(inv);
    const cameraYaw = Math.atan2(w.x, w.z);
    const cameraPitch = Math.atan2(w.y - headY, Math.hypot(w.x, w.z));

    const o = this.brain.update({
      dt,
      reducedMotion: opts.reducedMotion,
      pointerActive,
      pointerYaw,
      pointerPitch,
      cameraYaw,
      cameraPitch,
      proximity,
      hover,
      poke,
      scroll: input.scroll,
      commands: input.commands,
    });

    // ---- smoothing + look distribution (torso → head → eyes) -------------
    easing.damp(live, "engaged", o.engaged, 0.22, dt);
    easing.damp(live, "happy", o.happy, 0.11, dt);
    easing.damp(live, "eyeScale", o.eyeScale, 0.12, dt);
    easing.damp(live, "lean", o.lean, 0.35, dt);

    const yaw = clamp(o.lookYaw, -1.35, 1.35);
    const pitch = clamp(o.lookPitch, -0.8, 0.7);
    const torsoYawT = clamp(yaw * 0.3, -0.36, 0.36);
    const headYawT = clamp(yaw - torsoYawT, -0.85, 0.85);
    const headPitchT = clamp(pitch * 0.85, -0.42, 0.36);
    const slow = opts.reducedMotion ? 1.6 : 1;
    easing.damp(live, "torsoYaw", torsoYawT, 0.55 * slow, dt);
    easing.damp(live, "torsoPitch", clamp(pitch * 0.12, -0.08, 0.06), 0.6 * slow, dt);
    easing.damp(live, "headYaw", headYawT, o.lookSmooth * slow, dt);
    easing.damp(live, "headPitch", headPitchT, o.lookSmooth * slow, dt);
    // Eyes lead: they aim at whatever the head has not caught up with yet.
    const gx = clamp((yaw - live.torsoYaw - live.headYaw) * 0.16 + yaw * 0.035, -0.075, 0.075);
    const gy = clamp((pitch - live.headPitch) * 0.14 + pitch * 0.03, -0.05, 0.05);
    easing.damp(live, "gazeX", gx, 0.06, dt);
    easing.damp(live, "gazeY", gy, 0.06, dt);
    live.floatY = o.floatY;

    n.float.position.y = o.floatY;
    n.float.rotation.set(0, o.spinY, o.swayZ);
    n.torso.rotation.set(live.torsoPitch + live.lean, live.torsoYaw, -live.torsoYaw * 0.1);
    n.neck.rotation.set(0, live.headYaw * 0.3, 0);
    n.head.rotation.set(
      -live.headPitch + o.headBootPitch,
      live.headYaw * 0.7,
      -live.headYaw * 0.12 + live.engaged * 0.05,
    );

    this.applyArm(n.armL, this.poseL, o.armL, o.oscL, dt);
    this.applyArm(n.armR, this.poseR, o.armR, o.oscR, dt);

    // ---- face + lights ------------------------------------------------------
    const vu = mat.visorUniforms;
    vu.uOpen.value = o.open;
    vu.uHappy.value = live.happy;
    vu.uEyePower.value = o.eyePower;
    vu.uEyeScale.value = live.eyeScale;
    vu.uGaze.value.set(live.gazeX, live.gazeY);

    mat.ear.emissive.copy(LED.ear).lerp(LED.earExcited, o.earExcited).multiplyScalar(o.ear);
    mat.core.uniforms.uPower.value = Math.min(o.core, 1.8);

    // Contact shadow: tighter and darker as the base nears the floor.
    const gap = Math.max(0.27 + o.floatY, 0);
    const spread = 1.15 + gap * 1.2;
    n.shadow.scale.set(spread, spread * 0.2, 1);
    mat.shadow.uniforms.uOpacity.value = clamp(0.95 - gap * 0.6, 0.4, 0.95);
    n.burst.visible = o.burst >= 0;
    if (o.burst >= 0) {
      n.burst.scale.setScalar(1 + o.burst * 1.6);
      mat.burst.opacity = 0.7 * Math.pow(1 - o.burst, 2);
    }
  }
}
