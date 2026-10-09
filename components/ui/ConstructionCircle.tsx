/**
 * The cover graphic from the Brand Guidelines: a thin construction circle
 * with square handles and tangent lines, like a vector path being drawn.
 * Purely decorative.
 */
export default function ConstructionCircle({ className = "" }: { className?: string }) {
  const c = "#0B8997";
  return (
    <svg aria-hidden viewBox="0 0 400 400" fill="none" className={`pointer-events-none select-none ${className}`}>
      <circle cx="200" cy="200" r="170" stroke={c} strokeOpacity="0.55" strokeWidth="1.25" />
      <circle cx="200" cy="200" r="120" stroke={c} strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 6" />
      {/* tangent handles: top, left, right */}
      <path d="M135 30 H265" stroke={c} strokeOpacity="0.7" strokeWidth="1.25" />
      <path d="M30 135 V265" stroke={c} strokeOpacity="0.7" strokeWidth="1.25" />
      <path d="M370 135 V265" stroke={c} strokeOpacity="0.7" strokeWidth="1.25" />
      {[
        [135, 30],
        [265, 30],
        [30, 135],
        [30, 265],
        [370, 135],
        [370, 265],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill={c} fillOpacity="0.8" />
      ))}
      <rect x="191" y="21" width="18" height="18" fill="#071128" fillOpacity="0.85" />
      <rect x="21" y="191" width="18" height="18" fill="#071128" fillOpacity="0.85" />
      <rect x="361" y="191" width="18" height="18" fill="#071128" fillOpacity="0.85" />
      {/* crosshair */}
      <path d="M200 185 V215 M185 200 H215" stroke={c} strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}
