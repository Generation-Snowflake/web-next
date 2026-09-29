import { ARM_KEYS, CAMERA_FOV, CAMERA_Z, DIM, type ArmPose } from "@/components/hero/robot/config";
import type { StageRect } from "./store";

// Where the companion robot is on screen, frame by frame. Everything here is
// in viewport pixels: (cx, cy) is the centre of the robot's bounding box
// (floor shadow → head top) and h is that box's height. RobotScene converts
// it to world space. Pure TypeScript, no three.js objects, no allocations in
// update().

/** World height visible at z = 0 (where the robot stands). */
export const VIEW_H = 2 * CAMERA_Z * Math.tan(((CAMERA_FOV / 2) * Math.PI) / 180);

const clamp = (x: number, a: number, b: number) => Math.min(Math.max(x, a), b);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
/** Exponential approach, frame-rate independent. */
const approach = (from: number, to: number, rate: number, dt: number) => from + (to - from) * (1 - Math.exp(-rate * dt));

type Spring = { p: number; v: number };

/** Damped spring step (semi-implicit Euler, sub-stepped for stability). */
function stepSpring(s: Spring, target: number, k: number, zeta: number, dt: number) {
  const c = 2 * zeta * Math.sqrt(k);
  const n = Math.ceil(dt / (1 / 120));
  const h = dt / n;
  for (let i = 0; i < n; i++) {
    s.v += (k * (target - s.p) - c * s.v) * h;
    s.p += s.v * h;
  }
}

export type Placement = { cx: number; cy: number; h: number; yaw: number };

export type Reach = { active: boolean; side: 1 | -1; pose: ArmPose };

export type PressCallbacks = {
  /** The finger touches the element: play the press feedback. */
  contact: () => void;
  /** Run the element's original action. */
  act: () => void;
};

type Press = {
  t: number;
  x: number;
  y: number;
  side: 1 | -1;
  theta: number;
  fly: number;
  from: Placement;
  approach: Placement;
  touch: Placement;
  arc: number;
  corrX: number;
  corrY: number;
  contacted: boolean;
  acted: boolean;
  cb: PressCallbacks;
};

// Timeline after the fly-over (seconds).
const POKE = 0.12;
const CONTACT_AT = 0.09;
const ACT_AT = 0.17;
const RELEASE_AT = 0.22;

/** Shoulder → fingertip length with the arm straight (robot units). */
const ARM_REACH = 1.2;

const placement = (): Placement => ({ cx: 0, cy: 0, h: 1, yaw: 0 });

export class CompanionMotion {
  readonly out = {
    cx: 0,
    cy: 0,
    h: 1,
    yaw: 0,
    tiltX: 0,
    tiltZ: 0,
  };
  readonly reach: Reach = {
    active: false,
    side: 1,
    pose: { sx: 0, sy: 0, sz: 0, ex: 0, ez: 0, wx: 0, wy: 0, wz: 0 },
  };
  /** Fingertip of the reaching arm in viewport px, written by the scene. */
  readonly tip = { x: 0, y: 0, valid: false };
  /** 0 = standing in the hero, 1 = docked in the corner. */
  dockWeight = 1;

  private sx: Spring = { p: 0, v: 0 };
  private sy: Spring = { p: 0, v: 0 };
  private sh: Spring = { p: 1, v: 0 };
  private yaw = 0;
  private started = false;
  private scrollKick = 0;
  private w = 1;
  private h = 1;
  private press: Press | null = null;
  private queued: { x: number; y: number; cb: PressCallbacks } | null = null;

  private rest = placement();
  private hero = placement();
  private dock = placement();

  get busy() {
    return this.press !== null;
  }

  /** One click may wait behind the current press; more are dropped. */
  get canQueue() {
    return this.queued === null;
  }

  setTip(x: number, y: number) {
    this.tip.x = x;
    this.tip.y = y;
    this.tip.valid = Number.isFinite(x) && Number.isFinite(y);
  }

  /** Page scrolled by dy px (positive = down). */
  kick(dy: number) {
    this.scrollKick += dy;
  }

  /** Pixels per world unit at z = 0 for a viewport of height H. */
  private pxPerUnit() {
    return this.h / VIEW_H;
  }

  /** Yaw that makes the robot face the camera from screen x. */
  private facingYaw(cx: number) {
    const x = (cx - this.w / 2) / this.pxPerUnit();
    return Math.atan2(-x, CAMERA_Z);
  }

  private computeRest(stage: StageRect) {
    const { w: W, h: H } = this;
    const d = this.dock;
    d.h = W >= 1024 ? 172 : W >= 768 ? 150 : 104;
    const margin = W >= 768 ? 26 : 12;
    d.cx = W - margin - d.h * 0.36;
    d.cy = H - margin - d.h * 0.5;
    d.yaw = this.facingYaw(d.cx) - 0.2;

    let weight = 1;
    if (stage.has) {
      const hero = this.hero;
      const { left, top, width, height } = stage;
      if (W >= 1024) {
        hero.h = Math.min(0.68 * height, (0.44 * width * DIM.height) / DIM.width);
        hero.cx = left + 0.72 * width;
        hero.cy = top + 0.53 * height;
        hero.yaw = this.facingYaw(hero.cx) - 0.12;
      } else {
        hero.h = Math.min(0.4 * height, (0.86 * width * DIM.height) / DIM.width);
        hero.cx = left + 0.5 * width;
        hero.cy = top + 0.31 * height;
        hero.yaw = 0;
      }
      const progress = -top / height;
      weight = W >= 1024 ? smoothstep(0.1, 0.6, progress) : smoothstep(0.15, 0.55, progress);
    }
    const r = this.rest;
    if (weight <= 0) Object.assign(r, this.hero);
    else if (weight >= 1) Object.assign(r, d);
    else {
      const hh = this.hero;
      r.cx = lerp(hh.cx, d.cx, weight);
      r.cy = lerp(hh.cy, d.cy, weight);
      r.h = lerp(hh.h, d.h, weight);
      r.yaw = lerp(hh.yaw, d.yaw, weight);
    }
    this.dockWeight = weight;
  }

  /**
   * Ask the robot to fly to (x, y) and press there. Returns false when it
   * can't (not started yet, or a press is running with one already queued).
   */
  requestPress(x: number, y: number, cb: PressCallbacks) {
    if (!this.started) return false;
    if (this.press) {
      if (this.queued) return false;
      this.queued = { x, y, cb };
      return true;
    }
    this.beginPress(x, y, cb);
    return true;
  }

  private beginPress(x: number, y: number, cb: PressCallbacks) {
    const { w: W, h: H, out } = this;
    const from: Placement = { cx: out.cx, cy: out.cy, h: out.h, yaw: out.yaw };
    const h = W >= 1024 ? 180 : 160;
    const k = h / DIM.height;
    // Arm angle from "down along the side" (0) to "straight up" (π): high up
    // targets get a raised arm so the body sits below them; low ones a lowered
    // arm so the body stays on screen.
    const theta = lerp(2.2, 0.85, clamp(y / H, 0, 1));
    const reachX = (DIM.shoulderX + ARM_REACH * Math.sin(theta)) * k;
    const tipY = (DIM.shoulderY - ARM_REACH * Math.cos(theta) - DIM.centerY) * k;
    const bodyHalf = h * 0.26;
    // Stand on the side the robot is already on, unless there is no room.
    let side: 1 | -1 = from.cx <= x ? 1 : -1;
    if (side === 1 && x - reachX - bodyHalf < 4) side = -1;
    else if (side === -1 && x + reachX + bodyHalf > W - 4) side = 1;

    const touch: Placement = { cx: x - side * reachX, cy: y + tipY, h, yaw: 0 };
    touch.yaw = this.facingYaw(touch.cx) * 0.6;
    const back = h * 0.09;
    const approachP: Placement = { cx: touch.cx - side * back, cy: touch.cy + back * 0.35, h, yaw: touch.yaw };
    const dist = Math.hypot(approachP.cx - from.cx, approachP.cy - from.cy) + Math.abs(from.h - h) * 0.6;
    const fly = clamp(0.1 + dist / 2600, 0.12, 0.38);

    this.press = {
      t: 0,
      x,
      y,
      side,
      theta,
      fly,
      from,
      approach: approachP,
      touch,
      arc: Math.min(70, dist * 0.12),
      corrX: 0,
      corrY: 0,
      contacted: false,
      acted: false,
      cb,
    };
    this.reach.side = side;
    this.tip.valid = false;
  }

  private setPose(sx: number, sz: number, ex: number, ez: number, wz: number) {
    const p = this.reach.pose;
    p.sx = sx;
    p.sy = 0;
    p.sz = sz;
    p.ex = ex;
    p.ez = ez;
    p.wx = 0;
    p.wy = 0;
    p.wz = wz;
  }

  /** Force-run the pending press callbacks (frames stopped, unmount…). */
  flush() {
    const p = this.press;
    if (p) {
      if (!p.contacted) p.cb.contact();
      if (!p.acted) p.cb.act();
    }
    this.press = null;
    this.reach.active = false;
    const q = this.queued;
    this.queued = null;
    if (q) {
      q.cb.contact();
      q.cb.act();
    }
  }

  private updatePress(p: Press, dt: number) {
    const out = this.out;
    p.t += dt;
    const t = p.t;
    this.reach.active = true;

    if (t < p.fly) {
      const u = t / p.fly;
      const e = easeInOutCubic(u);
      out.cx = lerp(p.from.cx, p.approach.cx, e);
      out.cy = lerp(p.from.cy, p.approach.cy, e) - Math.sin(Math.PI * e) * p.arc;
      out.h = lerp(p.from.h, p.approach.h, e);
      out.yaw = lerp(p.from.yaw, p.approach.yaw, e);
      // Bank into the direction of travel.
      const vx = (p.approach.cx - p.from.cx) / p.fly;
      const bank = Math.sin(Math.PI * u);
      out.tiltZ = clamp(-vx * 0.00022, -0.3, 0.3) * bank;
      out.tiltX = 0.12 * bank;
      // Cock the arm on the way: elbow bent, forearm toward the camera.
      const cock = smoothstep(0.25, 0.85, u);
      this.setPose(-0.25 * cock, lerp(0.3, p.theta, cock), -1.3 * cock, 0, 0);
      return;
    }

    const tp = t - p.fly;
    const e = easeOutCubic(Math.min(tp / POKE, 1));
    // Close the loop on the real fingertip: nudge the body so the tip lands
    // on the target whatever the damped joints and head-look did.
    if (this.tip.valid && tp > POKE * 0.4) {
      const g = 1 - Math.exp(-28 * dt);
      p.corrX = clamp(p.corrX + (p.x - this.tip.x) * g, -p.touch.h * 0.3, p.touch.h * 0.3);
      p.corrY = clamp(p.corrY + (p.y - this.tip.y) * g, -p.touch.h * 0.3, p.touch.h * 0.3);
    }
    out.cx = lerp(p.approach.cx, p.touch.cx, e) + p.corrX;
    out.cy = lerp(p.approach.cy, p.touch.cy, e) + p.corrY;
    out.h = p.touch.h;
    out.yaw = p.touch.yaw;
    out.tiltZ = approach(out.tiltZ, 0, 20, dt);
    out.tiltX = approach(out.tiltX, 0, 20, dt);
    this.setPose(lerp(-0.25, -0.08, e), p.theta, lerp(-1.3, -0.04, e), 0, -0.12);

    if (!p.contacted && tp >= CONTACT_AT) {
      p.contacted = true;
      p.cb.contact();
    }
    if (!p.acted && tp >= ACT_AT) {
      p.acted = true;
      p.cb.act();
    }
    if (tp >= RELEASE_AT) {
      this.press = null;
      this.reach.active = false;
      // Hand over to the rest spring from where the press left off, with a
      // little push back so the return has some life.
      this.sx.p = out.cx;
      this.sy.p = out.cy;
      this.sh.p = out.h;
      this.sx.v = -p.side * 180;
      this.sy.v = -120;
      this.sh.v = 0;
      this.yaw = out.yaw;
      const q = this.queued;
      this.queued = null;
      if (q) this.beginPress(q.x, q.y, q.cb);
    }
  }

  update(dt: number, W: number, H: number, stage: StageRect, reduced: boolean) {
    this.w = Math.max(W, 1);
    this.h = Math.max(H, 1);
    this.computeRest(stage);
    const r = this.rest;
    const out = this.out;

    if (!this.started) {
      this.started = true;
      this.sx.p = r.cx;
      this.sy.p = r.cy;
      this.sh.p = r.h;
      this.yaw = r.yaw;
    }

    if (this.press) {
      this.updatePress(this.press, dt);
      this.scrollKick = 0;
      return;
    }
    this.reach.active = false;

    if (reduced) {
      this.sx.p = r.cx;
      this.sy.p = r.cy;
      this.sh.p = r.h;
      this.sx.v = this.sy.v = this.sh.v = 0;
      this.yaw = r.yaw;
      this.scrollKick = 0;
    } else {
      // While docked, a scroll first carries the robot with the page a little,
      // then the spring pulls it back past its spot and it settles.
      if (this.scrollKick !== 0 && this.dockWeight > 0.5) {
        const off = clamp(this.sy.p - this.scrollKick * 0.28 - r.cy, -H * 0.12, H * 0.12);
        this.sy.p = r.cy + off;
      }
      this.scrollKick = 0;
      stepSpring(this.sx, r.cx, 70, 0.78, dt);
      stepSpring(this.sy, r.cy, 70, 0.5, dt);
      stepSpring(this.sh, r.h, 60, 0.9, dt);
      this.yaw = approach(this.yaw, r.yaw, 6, dt);
    }

    out.cx = this.sx.p;
    out.cy = this.sy.p;
    out.h = Math.max(this.sh.p, 24);
    out.yaw = this.yaw;
    // Lean into the motion: forward when dropping, back when rising, banked
    // sideways when moving across.
    const tiltX = reduced ? 0 : clamp(this.sy.v * 0.0011, -0.3, 0.3);
    const tiltZ = reduced ? 0 : clamp(-this.sx.v * 0.0008, -0.28, 0.28);
    out.tiltX = approach(out.tiltX, tiltX, 12, dt);
    out.tiltZ = approach(out.tiltZ, tiltZ, 12, dt);
  }
}

/** Blend `pose` toward `target` by weight into `out` (no allocation). */
export function blendPose(out: ArmPose, base: ArmPose, target: ArmPose, weight: number) {
  for (const k of ARM_KEYS) out[k] = base[k] + (target[k] - base[k]) * weight;
  return out;
}
