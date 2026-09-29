// Shared, non-React state for the site-wide robot companion. The hero only
// registers an empty "stage" element here; the single fixed canvas mounted in
// the site shell reads it to know where the robot's big hero spot is.

export type StageRect = { has: boolean; left: number; top: number; width: number; height: number };

type Listener = () => void;

export const companionStore = {
  stage: null as HTMLElement | null,
  /** Last measured stage rect (viewport px). */
  stageRect: { has: false, left: 0, top: 0, width: 1, height: 1 } as StageRect,
  /** True while the WebGL scene is rendering frames (click fly-overs need it). */
  ready: false,
  listeners: new Set<Listener>(),
};

export function measureStage() {
  const r = companionStore.stageRect;
  const el = companionStore.stage;
  if (!el || !el.isConnected) {
    r.has = false;
    return;
  }
  const b = el.getBoundingClientRect();
  r.has = b.width > 0 && b.height > 0;
  r.left = b.left;
  r.top = b.top;
  r.width = Math.max(b.width, 1);
  r.height = Math.max(b.height, 1);
}

/** Called by the home hero's HeroRobotStage on mount (el) and unmount (null,
 *  with the element it registered so a newer stage is never cleared). */
export function setRobotStage(el: HTMLElement | null, prev?: HTMLElement) {
  if (el === null && companionStore.stage !== (prev ?? null)) return;
  companionStore.stage = el;
  measureStage();
  for (const fn of companionStore.listeners) fn();
}

export function onStageChange(fn: Listener) {
  companionStore.listeners.add(fn);
  return () => {
    companionStore.listeners.delete(fn);
  };
}
