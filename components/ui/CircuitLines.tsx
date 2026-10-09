/**
 * Circuit traces with nodes (Brand Guidelines, Graphic Elements 1 and 2):
 * straight runs with 45° bends ending in open or filled nodes. Decorative
 * and secondary to the content: keep it behind text at low opacity.
 */
export default function CircuitLines({
  tone = "light",
  className = "",
}: {
  /** "light" = on Primary Light, "night" = on Primary Dark. */
  tone?: "light" | "night";
  className?: string;
}) {
  const line = tone === "night" ? "#18D9E3" : "#0FA7B8";
  const dark = tone === "night" ? "#9EEBF0" : "#071128";
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 320"
      fill="none"
      preserveAspectRatio="xMaxYMid slice"
      className={`pointer-events-none select-none ${className}`}
    >
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 250 H170 L230 190 H420 L480 130 H600" stroke={line} strokeOpacity="0.55" />
        <path d="M0 278 H200 L250 228 H380 L440 168 H600" stroke={dark} strokeOpacity="0.35" />
        <path d="M60 320 L140 240" stroke={line} strokeOpacity="0.3" />
        <path d="M330 320 V290 L370 250 H520 L560 210" stroke={line} strokeOpacity="0.35" />
        <path d="M300 0 V40 L350 90 H540" stroke={dark} strokeOpacity="0.2" />
        <path d="M420 0 V22 L452 54 H600" stroke={line} strokeOpacity="0.3" />
      </g>
      <g>
        <circle cx="420" cy="190" r="5" fill={line} />
        <circle cx="230" cy="190" r="3.5" fill={dark} fillOpacity="0.5" />
        <circle cx="380" cy="228" r="5" stroke={dark} strokeOpacity="0.45" strokeWidth="1.5" />
        <circle cx="520" cy="250" r="4" fill={line} fillOpacity="0.6" />
        <circle cx="540" cy="90" r="5" stroke={line} strokeOpacity="0.6" strokeWidth="1.5" />
        <circle cx="140" cy="240" r="3.5" fill={line} fillOpacity="0.5" />
      </g>
    </svg>
  );
}
