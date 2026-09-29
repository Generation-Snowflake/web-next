import {
  ARM_KEYS,
  BOOT_DURATION,
  POSE_CHEER,
  POSE_EXCITED,
  POSE_IDLE,
  POSE_SPIN,
  POSE_WAVE,
  type ArmPose,
} from "./config";
import type { RobotCommand } from "./input";

// Behaviour layer: turns input (pointer look direction, hover, taps, hero CTA
// events) into animation targets. Pure TypeScript, no three.js objects, so it
// is easy to reason about; RobotModel applies the output to the rig.

type Action = "none" | "wave" | "cheer" | "spin";

export type BrainInput = {
  dt: number;
  reducedMotion: boolean;
  /** Pointer is present and recently moved. */
  pointerActive: boolean;
  /** Look direction toward the pointer / the camera, robot-local radians. */
  pointerYaw: number;
  pointerPitch: number;
  cameraYaw: number;
  cameraPitch: number;
  /** 0 far → 1 when the cursor is right next to the robot. */
  proximity: number;
  hover: boolean;
  poke: boolean;
  scroll: number;
  commands: RobotCommand[];
};

export type BrainOutput = {
  lookYaw: number;
  lookPitch: number;
  /** Seconds-ish smoothing for the head; faster when chasing the pointer. */
  lookSmooth: number;
  engaged: number;
  happy: number;
  open: number;
  eyePower: number;
  eyeScale: number;
  headBootPitch: number;
  armL: ArmPose;
  armR: ArmPose;
  oscL: ArmPose;
  oscR: ArmPose;
  floatY: number;
  spinY: number;
  swayZ: number;
  lean: number;
  core: number;
  ear: number;
  earExcited: number;
  lights: number;
  burst: number;
};

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};
const easeOutCubic = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

const zero = (): ArmPose => ({ sx: 0, sy: 0, sz: 0, ex: 0, ez: 0, wx: 0, wy: 0, wz: 0 });

export class RobotBrain {
  private t = 0;
  private booted = false;

  private blinkNext = 2.2;
  private blinkT = -1;
  private blinkDouble = false;

  private autoNext = 0;
  private autoYaw = 0;
  private autoPitch = 0;
  private autoCamera = true;

  private action: Action = "none";
  private actionT = 0;
  private actionDur = 0;
  private lastWaveEnd = -10;
  private hovering = false;
  private happyUntil = -1;
  private excitedUntil = -1;
  private pokeReady = 0;
  private pokeCount = 0;
  private hopT = -1;
  private hopQueue = 0;
  private burstT = -1;
  private flash = 0;

  readonly out: BrainOutput = {
    lookYaw: 0,
    lookPitch: 0,
    lookSmooth: 0.3,
    engaged: 0,
    happy: 0,
    open: 1,
    eyePower: 0,
    eyeScale: 1,
    headBootPitch: 0,
    armL: { ...POSE_IDLE },
    armR: { ...POSE_IDLE },
    oscL: zero(),
    oscR: zero(),
    floatY: 0,
    spinY: 0,
    swayZ: 0,
    lean: 0,
    core: 0,
    ear: 0,
    earExcited: 0,
    lights: 0,
    burst: -1,
  };

  private start(action: Action, dur: number) {
    this.action = action;
    this.actionT = 0;
    this.actionDur = dur;
  }

  private hop(extra = 0) {
    if (this.hopT < 0) this.hopT = 0;
    this.hopQueue = Math.max(this.hopQueue, extra);
  }

  private handle(cmd: RobotCommand, reduced: boolean) {
    const t = this.t;
    if (cmd === "wave") {
      this.happyUntil = Math.max(this.happyUntil, t + 2.4);
      if (!reduced && (this.action === "none" || this.action === "wave")) this.start("wave", 2.4);
    } else if (cmd === "excited") {
      const wasExcited = t < this.excitedUntil;
      // Held until "calm"; the timeout is only a safety net.
      this.excitedUntil = t + 12;
      if (!reduced && !wasExcited) this.hop(1);
    } else if (cmd === "happy") {
      // Small "done!" after pressing something for the visitor.
      this.happyUntil = Math.max(this.happyUntil, t + 1.6);
      this.flash = Math.max(this.flash, 0.6);
      if (!reduced) this.hop();
    } else {
      this.excitedUntil = -1;
      this.happyUntil = Math.min(this.happyUntil, t + 0.25);
      // Let a wave wind down over ~0.5s instead of snapping back.
      if (this.action === "wave") this.actionDur = Math.min(this.actionDur, this.actionT + 0.5);
    }
  }

  private onPoke(reduced: boolean) {
    const t = this.t;
    if (t < this.pokeReady) return;
    this.pokeReady = t + 1.5;
    this.pokeCount += 1;
    this.flash = 1;
    this.happyUntil = t + 2.2;
    if (reduced) return;
    this.burstT = 0;
    if (this.pokeCount % 2 === 1) {
      this.start("spin", 1.05);
      this.hop();
    } else {
      this.start("cheer", 1.9);
      this.hop(1);
    }
  }

  update(i: BrainInput): BrainOutput {
    const o = this.out;
    const reduced = i.reducedMotion;
    const dt = i.dt;
    if (!this.booted) {
      this.booted = true;
      if (reduced) this.t = BOOT_DURATION;
    }
    this.t += dt;
    const t = this.t;

    for (const cmd of i.commands) this.handle(cmd, reduced);
    i.commands.length = 0;

    // ---- boot sequence --------------------------------------------------
    const bt = this.t;
    const rise = easeOutCubic(bt / 1.2);
    let eyesOn = 1;
    if (bt < 0.55) eyesOn = 0;
    else if (bt < 1.1) eyesOn = Math.sin(bt * 71) * Math.sin(bt * 23) > -0.1 ? smoothstep(0.55, 1.0, bt) : 0.08;
    o.core = smoothstep(0.2, 0.8, bt) * (1 + 0.14 * Math.sin(t * 2.3)) + this.flash * 2.2;
    o.lights = smoothstep(0.75, 1.2, bt);
    o.headBootPitch = reduced ? 0 : (1 - smoothstep(0.65, 1.35, bt)) * 0.42;

    // ---- actions / timers ------------------------------------------------
    if (i.poke) this.onPoke(reduced);

    if (i.hover && !this.hovering) {
      this.happyUntil = Math.max(this.happyUntil, t + 0.6);
      if (!reduced && this.action === "none" && t - this.lastWaveEnd > 2.2 && bt > BOOT_DURATION) {
        this.start("wave", 2.3);
      }
    }
    this.hovering = i.hover;

    if (this.action !== "none") {
      this.actionT += dt;
      if (this.actionT >= this.actionDur) {
        if (this.action === "wave") this.lastWaveEnd = t;
        this.action = "none";
      }
    }
    this.flash = Math.max(0, this.flash - dt * 2.2);

    const excited = t < this.excitedUntil;
    const acting = this.action !== "none";
    const happyTarget = i.hover || excited || acting || t < this.happyUntil ? 1 : 0;
    o.happy = happyTarget;

    // ---- look target -----------------------------------------------------
    if (i.pointerActive) {
      o.lookYaw = i.pointerYaw;
      o.lookPitch = i.pointerPitch;
      o.lookSmooth = 0.2;
      this.autoNext = t + 0.8;
      this.autoCamera = true;
    } else {
      if (t > this.autoNext) {
        this.autoCamera = Math.random() < 0.35;
        this.autoYaw = rand(-0.75, 0.75);
        this.autoPitch = rand(-0.2, 0.22);
        this.autoNext = t + rand(1.3, 3.2);
      }
      o.lookYaw = this.autoCamera ? i.cameraYaw : this.autoYaw;
      o.lookPitch = this.autoCamera ? i.cameraPitch : this.autoPitch;
      o.lookSmooth = 0.42;
    }
    o.lookPitch -= i.scroll * 0.55;

    const engagedTarget = i.hover ? 1 : i.pointerActive ? i.proximity : 0;
    o.engaged = engagedTarget;
    o.lean = reduced ? 0 : engagedTarget * 0.07 + (excited ? 0.03 : 0);

    // ---- blink -----------------------------------------------------------
    let open = 1;
    if (this.blinkT < 0 && t > this.blinkNext) this.blinkT = 0;
    if (this.blinkT >= 0) {
      this.blinkT += dt;
      const d = 0.17;
      open = 1 - Math.sin(Math.PI * Math.min(this.blinkT / d, 1));
      if (this.blinkT >= d) {
        this.blinkT = -1;
        if (this.blinkDouble) {
          this.blinkDouble = false;
          this.blinkNext = t + 0.09;
        } else {
          this.blinkNext = t + rand(2.4, 6);
          this.blinkDouble = Math.random() < 0.22;
        }
      }
    }
    o.open = open;
    o.eyePower = eyesOn * (1 + 0.45 * engagedTarget + 0.2 * happyTarget + this.flash * 0.6);
    o.eyeScale = 1 + 0.13 * engagedTarget + 0.12 * this.flash;

    // ---- body motion -----------------------------------------------------
    let hopY = 0;
    if (this.hopT >= 0) {
      this.hopT += dt;
      const dur = 0.52;
      const p = Math.min(this.hopT / dur, 1);
      hopY = Math.sin(Math.PI * p) * 0.24;
      if (p >= 1) {
        if (this.hopQueue > 0) {
          this.hopQueue -= 1;
          this.hopT = 0;
        } else this.hopT = -1;
      }
    }
    const bob = Math.sin(t * 1.35) * 0.045;
    const bounce = excited ? Math.abs(Math.sin(t * 6.2)) * 0.04 : 0;
    // Boot: lifts off from resting on the floor (pod bottom touches it at -0.27).
    o.floatY = reduced ? 0 : -(1 - rise) * 0.27 + bob + hopY + bounce;
    o.swayZ = reduced ? 0 : Math.sin(t * 0.8) * 0.018;
    o.spinY =
      this.action === "spin" && !reduced ? easeInOutCubic(Math.min(this.actionT / this.actionDur, 1)) * Math.PI * 2 : 0;
    o.ear = o.lights * (1 + 0.6 * engagedTarget + (excited ? 0.8 * (0.5 + 0.5 * Math.sin(t * 11)) : 0.12 * Math.sin(t * 2.1)));
    o.earExcited = excited ? 0.5 + 0.5 * Math.sin(t * 5.5) : 0;

    if (this.burstT >= 0) {
      this.burstT += dt;
      if (this.burstT > 0.9) this.burstT = -1;
    }
    o.burst = this.burstT < 0 ? -1 : this.burstT / 0.9;

    // ---- arms --------------------------------------------------------------
    let baseL: ArmPose = POSE_IDLE;
    let baseR: ArmPose = POSE_IDLE;
    const oscL = o.oscL;
    const oscR = o.oscR;
    for (const k of ARM_KEYS) {
      oscL[k] = 0;
      oscR[k] = 0;
    }
    // Idle breathing.
    const breathe = Math.sin(t * 1.35) * 0.018;
    oscL.sz = breathe;
    oscR.sz = breathe;

    if (!reduced) {
      if (this.action === "wave") {
        baseR = POSE_WAVE;
        const env = smoothstep(0.15, 0.45, this.actionT) * (1 - smoothstep(this.actionDur - 0.45, this.actionDur - 0.1, this.actionT));
        const w = t * 9.5;
        oscR.ez = Math.sin(w) * 0.38 * env;
        oscR.sz += Math.sin(w + 0.7) * 0.06 * env;
        oscR.wz = Math.sin(w - 0.9) * 0.28 * env;
      } else if (this.action === "cheer") {
        baseL = POSE_CHEER;
        baseR = POSE_CHEER;
        const env = smoothstep(0.1, 0.35, this.actionT) * (1 - smoothstep(this.actionDur - 0.4, this.actionDur, this.actionT));
        const w = t * 8.5;
        oscL.sz += Math.sin(w) * 0.16 * env;
        oscR.sz += Math.sin(w + Math.PI) * 0.16 * env;
        oscL.ez = Math.sin(w + 1) * 0.28 * env;
        oscR.ez = Math.sin(w + 1 + Math.PI) * 0.28 * env;
      } else if (this.action === "spin") {
        baseL = POSE_SPIN;
        baseR = POSE_SPIN;
      } else if (excited) {
        baseL = POSE_EXCITED;
        baseR = POSE_EXCITED;
        const w = t * 7;
        oscL.ex = Math.sin(w) * 0.16;
        oscR.ex = Math.sin(w + Math.PI) * 0.16;
      } else if (engagedTarget > 0.6) {
        // Curious: bring the hands forward a touch.
        oscL.ex = -0.12 * engagedTarget;
        oscR.ex = -0.12 * engagedTarget;
      }
    }
    o.armL = baseL;
    o.armR = baseR;
    return o;
  }
}
