import * as THREE from "three";
import { COLORS } from "./config";
import { VISOR } from "./geometry";

// Materials for the hero robot: a product-photo look on a dark stage.
// Satin off-white shells, graphite joints, a dark glass visor. Teal is the
// only colour and only on small LEDs (eyes, chest emblem, ear rings).
//
// No post-processing on purpose: a bloom pass on this transparent canvas is
// fragile on real GPUs (grazing highlights can overflow half-float buffers to
// Inf/NaN, which the blur spreads into a black-out). LEDs are plain emissive.

const linear = (hex: string) => new THREE.Color(hex);

/** Uniforms driving the face screen drawn onto the visor. */
export type VisorUniforms = {
  uFaceSize: THREE.IUniform<THREE.Vector2>;
  uEyeColor: THREE.IUniform<THREE.Color>;
  uEyePower: THREE.IUniform<number>;
  uOpen: THREE.IUniform<number>;
  uHappy: THREE.IUniform<number>;
  uEyeScale: THREE.IUniform<number>;
  uGaze: THREE.IUniform<THREE.Vector2>;
  uHalo: THREE.IUniform<number>;
};

const VISOR_PARS = /* glsl */ `
varying vec2 vFace;
uniform vec2 uFaceSize;
uniform vec3 uEyeColor;
uniform float uEyePower;
uniform float uOpen;
uniform float uHappy;
uniform float uEyeScale;
uniform vec2 uGaze;
uniform float uHalo;

float gsfRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
// Arc of radius ra and half-thickness rb, opening downward ("^" smile eye).
float gsfArc(vec2 p, float ap, float ra, float rb) {
  vec2 sc = vec2(sin(ap), cos(ap));
  p.x = abs(p.x);
  return ((sc.y * p.x > sc.x * p.y) ? length(p - sc * ra) : abs(length(p) - ra)) - rb;
}
float gsfEye(vec2 p, float side) {
  vec2 c = vec2(side * 0.165, 0.008) + uGaze;
  // The eye on the side we look toward grows a touch: reads as a turn.
  float s = uEyeScale * (1.0 + side * uGaze.x * 1.8);
  vec2 q = (p - c) / s;
  float h = max(0.086 * uOpen, 0.007);
  float dOpen = gsfRoundBox(q, vec2(0.07, h), min(0.052, h));
  float dHappy = gsfArc(q - vec2(0.0, -0.04), 1.02, 0.078, 0.019);
  return mix(dOpen, dHappy, uHappy) * s;
}
`;

const VISOR_MAIN = /* glsl */ `
{
  vec2 fp = vFace * uFaceSize;
  float d = min(gsfEye(fp, -1.0), gsfEye(fp, 1.0));
  float aa = max(fwidth(d), 1e-4);
  float core = 1.0 - smoothstep(-aa, aa, d);
  float hot = 1.0 - smoothstep(-0.05, -0.012, d);
  // Tight falloff only: LED light diffusing a hair into the glass, no halo.
  float halo = exp(-max(d, 0.0) * 70.0) * 0.18;
  vec3 eye = mix(uEyeColor, uEyeColor * 1.25 + 0.04, hot * 0.5);
  totalEmissiveRadiance += (eye * core + uEyeColor * halo * uHalo) * uEyePower;
}
`;

function createVisorMaterial(uniforms: VisorUniforms) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: COLORS.visor,
    roughness: 0.2,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 0.9,
  });
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nattribute vec2 aFace;\nvarying vec2 vFace;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvFace = aFace;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", `#include <common>\n${VISOR_PARS}`)
      .replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>\n${VISOR_MAIN}`);
  };
  mat.customProgramCacheKey = () => "gsf-robot-visor-2";
  return mat;
}

// Chest core: hexagon + six-armed "circuit snowflake" (nod to the GSF logo).
const CORE_VERT = /* glsl */ `
varying vec2 vP;
uniform float uRadius;
void main() {
  vP = position.xy / uRadius;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const CORE_FRAG = /* glsl */ `
varying vec2 vP;
uniform vec3 uA;
uniform vec3 uB;
uniform float uPower;
float seg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}
float hexD(vec2 p, float apothem) {
  p = abs(p);
  return max(p.x, dot(p, vec2(0.5, 0.8660254))) - apothem;
}
void main() {
  vec2 p = vP;
  float r = length(p);
  float sector = 6.2831853 / 6.0;
  // Guard atan(0, 0), which is undefined (NaN on some GPUs) at the exact centre.
  float ang = r > 1e-4 ? atan(p.y, p.x) - 0.5235988 : 0.0;
  float a = mod(ang + sector * 0.5, sector) - sector * 0.5;
  vec2 q = r * vec2(cos(a), abs(sin(a)));
  float arm = seg(q, vec2(0.33, 0.0), vec2(0.72, 0.0));
  float node = abs(length(q - vec2(0.8, 0.0)) - 0.06);
  vec2 dir = vec2(0.5, 0.8660254);
  float br = min(seg(q, vec2(0.47, 0.0), vec2(0.47, 0.0) + 0.17 * dir),
                 seg(q, vec2(0.6, 0.0), vec2(0.6, 0.0) + 0.11 * dir));
  float hex = abs(hexD(p, 0.22)) - 0.028;
  float w = 0.028;
  float dA = min(min(arm, node) - w, hex);
  float dB = br - w * 0.85;
  float d = min(dA, dB);
  float aa = max(fwidth(d), 1e-4) * 1.2;
  float mA = 1.0 - smoothstep(-aa, aa, dA);
  float mB = 1.0 - smoothstep(-aa, aa, dB);
  float glow = exp(-max(d, 0.0) * 60.0) * 0.12;
  vec3 base = vec3(0.012, 0.013, 0.014);
  vec3 col = base + (uA * (mA + glow) + uB * mB) * uPower;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

const SHADOW_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Soft contact shadow: a blurred blob on the implied floor. Normal alpha
// blending, so on the transparent canvas it darkens whatever is behind it.
const SHADOW_FRAG = /* glsl */ `
varying vec2 vUv;
uniform float uOpacity;
uniform float uSoft;
void main() {
  float r = length(vUv * 2.0 - 1.0);
  float core = 1.0 - smoothstep(0.0, uSoft, r);
  float umbra = 1.0 - smoothstep(0.0, uSoft * 0.45, r);
  float a = clamp((core * 0.75 + umbra * 0.35) * uOpacity, 0.0, 1.0);
  gl_FragColor = vec4(0.0, 0.0, 0.0, a);
}
`;

/** LED colours at rest; the controller rescales them per frame. */
export const LED = {
  ear: linear(COLORS.teal).multiplyScalar(1.1),
  earExcited: linear(COLORS.teal).multiplyScalar(1.6),
};

export type RobotMaterials = ReturnType<typeof createRobotMaterials>;

export function createRobotMaterials() {
  const visorUniforms: VisorUniforms = {
    uFaceSize: { value: new THREE.Vector2(0.47 * VISOR.phi, VISOR.yh) },
    uEyeColor: { value: linear(COLORS.teal).multiplyScalar(0.95) },
    uEyePower: { value: 0 },
    uOpen: { value: 1 },
    uHappy: { value: 0 },
    uEyeScale: { value: 1 },
    uGaze: { value: new THREE.Vector2() },
    uHalo: { value: 1 },
  };

  const shell = new THREE.MeshPhysicalMaterial({
    color: COLORS.shell,
    roughness: 0.46,
    metalness: 0,
    clearcoat: 0.18,
    clearcoatRoughness: 0.35,
    envMapIntensity: 0.85,
  });
  const shellShade = new THREE.MeshPhysicalMaterial({
    color: COLORS.shellShade,
    roughness: 0.5,
    metalness: 0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.4,
    envMapIntensity: 0.8,
  });
  const graphite = new THREE.MeshStandardMaterial({
    color: COLORS.graphite,
    roughness: 0.42,
    metalness: 0.35,
    envMapIntensity: 1,
  });
  const graphiteDeep = new THREE.MeshStandardMaterial({
    color: COLORS.graphiteDeep,
    roughness: 0.55,
    metalness: 0.2,
    envMapIntensity: 0.8,
  });
  const bezel = new THREE.MeshStandardMaterial({
    color: "#1b1d1f",
    roughness: 0.35,
    metalness: 0.4,
    envMapIntensity: 0.9,
  });
  const seam = new THREE.MeshStandardMaterial({ color: COLORS.seam, roughness: 0.6, metalness: 0 });

  const core = new THREE.ShaderMaterial({
    vertexShader: CORE_VERT,
    fragmentShader: CORE_FRAG,
    uniforms: {
      uRadius: { value: 0.168 },
      uA: { value: linear(COLORS.teal).multiplyScalar(0.9) },
      uB: { value: linear(COLORS.teal).multiplyScalar(0.6) },
      uPower: { value: 0 },
    },
    toneMapped: false,
  });

  // Click acknowledgement: a thin teal outline that ripples off the emblem.
  const burst = new THREE.MeshBasicMaterial({
    color: linear(COLORS.teal),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    toneMapped: false,
    side: THREE.DoubleSide,
  });

  const ear = new THREE.MeshStandardMaterial({
    color: "#000000",
    roughness: 0.4,
    emissive: LED.ear.clone(),
    emissiveIntensity: 1,
  });

  const shadow = new THREE.ShaderMaterial({
    vertexShader: SHADOW_VERT,
    fragmentShader: SHADOW_FRAG,
    uniforms: { uOpacity: { value: 0 }, uSoft: { value: 1 } },
    transparent: true,
    depthWrite: false,
  });

  return {
    visorUniforms,
    shell,
    shellShade,
    graphite,
    graphiteDeep,
    bezel,
    seam,
    visor: createVisorMaterial(visorUniforms),
    core,
    burst,
    ear,
    shadow,
  };
}

export function disposeMaterials(mats: Record<string, unknown>) {
  for (const m of Object.values(mats)) {
    if (m instanceof THREE.Material) m.dispose();
  }
}
