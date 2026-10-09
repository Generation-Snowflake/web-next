/**
 * Drawn preview of Taktic's board, in brand colours (Taktic has no product
 * photos yet). Task names are examples, not customer data. `compact` drops
 * the text for small thumbnails.
 */
const columns: { title: string; cards: { key: string; title: string; priority: "Low" | "Medium" | "High" | "Urgent"; who: string }[] }[] = [
  {
    title: "To do",
    cards: [
      { key: "LAB-14", title: "Order spare STS3215 servos", priority: "Medium", who: "PK" },
      { key: "LAB-17", title: "Write calibration checklist", priority: "Low", who: "NT" },
    ],
  },
  {
    title: "In progress",
    cards: [
      { key: "LAB-12", title: "Record 50 pick-and-place demos", priority: "High", who: "TP" },
      { key: "LAB-15", title: "Wrist camera mount v2", priority: "Medium", who: "PK" },
    ],
  },
  {
    title: "In review",
    cards: [{ key: "LAB-11", title: "Train ACT policy, first run", priority: "Urgent", who: "NT" }],
  },
  {
    title: "Done",
    cards: [
      { key: "LAB-9", title: "Assemble follower arm", priority: "Medium", who: "TP" },
      { key: "LAB-10", title: "Leader arm calibration", priority: "Low", who: "TP" },
    ],
  },
];

const priorityDot: Record<string, string> = {
  Low: "bg-mist-300",
  Medium: "bg-cyan-300",
  High: "bg-warning",
  Urgent: "bg-error",
};

export default function TakticPreview({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  if (compact) {
    return (
      <div aria-hidden className={`flex h-full w-full gap-1.5 bg-ink p-2.5 ${className}`}>
        {[3, 2, 1, 2].map((n, i) => (
          <div key={i} className="flex flex-1 flex-col gap-1.5 rounded-sm bg-white/5 p-1">
            <span className={`h-1 w-2/3 rounded-full ${i === 1 ? "bg-cyan-500" : "bg-white/30"}`} />
            {Array.from({ length: n }).map((_, j) => (
              <span key={j} className="h-5 rounded-sm bg-white/90" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label="Illustration of the Taktic board: four columns, To do, In progress, In review and Done, with example task cards"
      className={`flex h-full w-full overflow-hidden bg-paper text-left ${className}`}
    >
      {/* Sidebar */}
      <div aria-hidden className="hidden w-[22%] shrink-0 flex-col gap-3 bg-ink p-3 sm:flex">
        <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-white">
          <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-a" />
          Taktic
        </p>
        {["My Work", "Projects", "Search", "Dashboard"].map((l, i) => (
          <span key={l} className={`rounded px-2 py-1 text-[10px] ${i === 1 ? "bg-white/10 text-white" : "text-night-muted"}`}>
            {l}
          </span>
        ))}
        <span className="mt-auto rounded border border-cyan-500/40 px-2 py-1 text-[9px] text-cyan-200">MCP connected</span>
      </div>

      {/* Board */}
      <div aria-hidden className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-ink">Armo lab setup</p>
            <p className="text-[9.5px] text-ink-500">LAB · Sprint 3</p>
          </div>
          <div className="flex shrink-0 gap-1">
            {["Board", "Backlog", "Timeline"].map((t, i) => (
              <span
                key={t}
                className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${i === 0 ? "bg-ink text-white" : "text-ink-600"}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        {/* progress strip */}
        <div className="mt-2.5 flex items-center gap-2">
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist-200">
            <span className="block h-full w-[43%] rounded-full bg-gradient-a" />
          </span>
          <span className="text-[9px] font-medium text-ink-600">3 of 7 done</span>
        </div>
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
          {columns.map((c, ci) => (
            <div key={c.title} className={`flex min-w-0 flex-col gap-1.5 rounded-md bg-mist-100 p-1.5 ${ci > 1 ? "hidden sm:flex" : ""}`}>
              <p className="flex items-center justify-between px-0.5 text-[9.5px] font-semibold text-ink-700">
                {c.title}
                <span className="text-ink-500">{c.cards.length}</span>
              </p>
              {c.cards.map((t, ti) => (
                <div
                  key={t.key}
                  className={`rounded border bg-card p-1.5 shadow-xs ${ci === 1 && ti === 0 ? "-rotate-2 border-cyan-500 shadow-card-hover" : "border-hairline"}`}
                >
                  <p className="font-mono text-[8.5px] text-ink-500">{t.key}</p>
                  <p className="mt-0.5 text-[10px] font-medium leading-tight text-ink">{t.title}</p>
                  <p className="mt-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[8.5px] text-ink-600">
                      <span className={`h-1.5 w-1.5 rounded-full ${priorityDot[t.priority]}`} />
                      {t.priority}
                    </span>
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ink text-[6.5px] font-semibold text-white">
                      {t.who}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
