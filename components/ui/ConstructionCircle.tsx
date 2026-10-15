/**
 * The cover graphic from the Brand Guidelines: a thin construction circle
 * with square handles and tangent lines, like a vector path being drawn.
 * Purely decorative. It draws itself on load (CSS only, see .draw-on-load).
 */
export default function ConstructionCircle({ className = "" }: { className?: string }) {
  const c = "#0B8997";
  const d = (n: number) => ({ "--d": n }) as React.CSSProperties;
  return (
    <svg aria-hidden viewBox="0 0 400 400" fill="none" className={`draw-on-load pointer-events-none select-none ${className}`}>
      <circle className="trace" style={d(0)} pathLength={1} cx="200" cy="200" r="170" stroke={c} strokeOpacity="0.55" strokeWidth="1.25" transform="rotate(-90 200 200)" />
      <circle className="spin-slow" cx="200" cy="200" r="120" stroke={c} strokeOpacity="0.18" strokeWidth="1" strokeDasharray="3 6" />
      {/* tangent handles: top, left, right */}
      <path className="trace" style={d(2)} pathLength={1} d="M135 30 H265" stroke={c} strokeOpacity="0.7" strokeWidth="1.25" />
      <path className="trace" style={d(3)} pathLength={1} d="M30 135 V265" stroke={c} strokeOpacity="0.7" strokeWidth="1.25" />
      <path className="trace" style={d(3)} pathLength={1} d="M370 135 V265" stroke={c} strokeOpacity="0.7" strokeWidth="1.25" />
      {[
        [135, 30, 3],
        [265, 30, 3],
        [30, 135, 4],
        [30, 265, 4],
        [370, 135, 4],
        [370, 265, 4],
      ].map(([x, y, n]) => (
        <circle key={`${x}-${y}`} className="node" style={d(n)} cx={x} cy={y} r="3" fill={c} fillOpacity="0.8" />
      ))}
      <rect className="node" style={d(2)} x="191" y="21" width="18" height="18" fill="#071128" fillOpacity="0.85" />
      <rect className="node" style={d(3)} x="21" y="191" width="18" height="18" fill="#071128" fillOpacity="0.85" />
      <rect className="node" style={d(3)} x="361" y="191" width="18" height="18" fill="#071128" fillOpacity="0.85" />
      {/* crosshair */}
      <path className="node" style={d(5)} d="M200 185 V215 M185 200 H215" stroke={c} strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}
