// Shared constants for the hero robot scene. Units are "robot units": the
// robot is modelled at roughly 3 units tall (floor to head top) and the
// scene scales it to fit the canvas (see RobotScene → usePlacement).

export const CAMERA_Z = 12;
export const CAMERA_FOV = 28;

/** Key heights / offsets of the robot rig (robot units, y up, +z = facing). */
export const DIM = {
  /** Implied studio floor the robot hovers over (contact shadow sits here). */
  floorY: -0.2,
  topY: 2.74,
  /** Vertical centre of the robot's bounding box (floor → head top). */
  centerY: 1.27,
  /** Bounding height used to fit the robot into the canvas. */
  height: 2.94,
  /** Width budget incl. a raised waving arm. */
  width: 2.3,
  waistY: 0.98,
  neckY: 1.86,
  headPivotY: 1.97,
  /** Head centre above the head pivot. */
  headLift: 0.37,
  shoulderX: 0.6,
  shoulderY: 1.67,
  elbowDrop: 0.48,
  wristDrop: 0.42,
} as const;

export const HEAD_CENTER_Y = DIM.headPivotY + DIM.headLift;

/** Product palette (sRGB hex; three converts to linear), cooled toward the
 *  brand palette. Teal is the only colour and is reserved for the small LEDs (eyes, chest emblem, ear rings). */
export const COLORS = {
  teal: "#18d9e3", // Circuit Cyan (Brand Guidelines)
  shell: "#e1e6ea", // cool white, toward Mist
  shellShade: "#b5bcc5",
  graphite: "#384152", // Ink 800
  graphiteDeep: "#1a2336",
  seam: "#8a929e",
  visor: "#071128", // Primary Dark
} as const;

/** Arm joint angles (radians), authored for the robot's LEFT arm (+x side).
 *  The right arm is a mirrored copy, so positive `sz` always means "raise
 *  the arm outward" on either side. */
export type ArmPose = {
  sx: number;
  sy: number;
  sz: number;
  ex: number;
  ez: number;
  wx: number;
  wy: number;
  wz: number;
};

export const ARM_KEYS = ["sx", "sy", "sz", "ex", "ez", "wx", "wy", "wz"] as const;

export const POSE_IDLE: ArmPose = { sx: 0.06, sy: 0, sz: 0.13, ex: -0.32, ez: 0.03, wx: 0, wy: 0.15, wz: 0 };
export const POSE_WAVE: ArmPose = { sx: -0.22, sy: 0, sz: 1.18, ex: -0.28, ez: 1.72, wx: 0, wy: 1.45, wz: 0 };
export const POSE_CHEER: ArmPose = { sx: -0.12, sy: 0, sz: 2.4, ex: -0.1, ez: 0.4, wx: 0, wy: 1.45, wz: 0 };
export const POSE_EXCITED: ArmPose = { sx: -0.32, sy: 0, sz: 0.34, ex: -1.45, ez: 0.18, wx: 0, wy: 0.5, wz: 0 };
export const POSE_SPIN: ArmPose = { sx: 0, sy: 0, sz: 0.85, ex: -0.25, ez: 0.25, wx: 0, wy: 0.4, wz: 0 };

export const ZERO_POSE: ArmPose = { sx: 0, sy: 0, sz: 0, ex: 0, ez: 0, wx: 0, wy: 0, wz: 0 };

export const BOOT_DURATION = 1.5;
