import type { CompanionMotion } from "./motion";

// "Click a button → the robot goes and presses it."
//
// A capture-phase click listener on document holds back pointer clicks on
// links and buttons, lets the robot fly over and poke the element, then
// replays the click with element.click() (with interception bypassed). The
// replay goes through the element's own handlers, so Next <Link> still does
// a client-side navigation (same as router.push), a submit button still
// validates and submits its form, target=_blank / mailto: / tel: / external
// links behave natively, and handlers such as "close the mobile menu" run.

const ELIGIBLE = 'a[href],button,[role="button"],input[type="submit"]';
// Clicks that start inside these are never held back.
const FIELDS = 'input:not([type="submit"]),textarea,select,option,label,[contenteditable=""],[contenteditable="true"]';

const TEAL = "#18D9E3"; // Circuit Cyan

type Options = {
  motion: CompanionMotion;
  /** The scene is live and rendering (otherwise act immediately). */
  isReady: () => boolean;
  /** Tell the robot to react (wave / happy) via its command queue. */
  cue: (action: "wave" | "happy") => void;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function findTarget(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest<HTMLElement>(ELIGIBLE);
  if (!el) return null;
  // A click on a text field inside a clickable wrapper is about the field.
  const field = target.closest(FIELDS);
  if (field && el.contains(field)) return null;
  if (el.closest("[data-robot-skip]")) return null;
  // Disclosure toggles (mobile menu, accordions) must respond instantly.
  if (el.hasAttribute("aria-expanded") || el.hasAttribute("aria-haspopup")) return null;
  if ((el as HTMLButtonElement).disabled || el.getAttribute("aria-disabled") === "true") return null;
  if (el instanceof HTMLAnchorElement && el.hasAttribute("download")) return null;
  return el;
}

/** Brief scale-down on the element + a small teal ring at the contact point. */
function pressFeedback(el: HTMLElement, x: number, y: number) {
  el.setAttribute("data-robot-pressed", "");
  window.setTimeout(() => el.removeAttribute("data-robot-pressed"), 140);
  if (typeof el.animate === "function") {
    el.animate(
      [{ transform: "scale(1)" }, { transform: "scale(0.96)", offset: 0.3 }, { transform: "scale(0.96)", offset: 0.75 }, { transform: "scale(1)" }],
      { duration: 160, easing: "ease-out" },
    );
  }
  const ring = document.createElement("div");
  ring.setAttribute("aria-hidden", "true");
  const size = 26;
  Object.assign(ring.style, {
    position: "fixed",
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    border: `2px solid ${TEAL}`,
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: "70",
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(ring);
  if (typeof ring.animate === "function") {
    const anim = ring.animate(
      [
        { transform: "scale(0.3)", opacity: 1 },
        { transform: "scale(1.25)", opacity: 0 },
      ],
      { duration: 420, easing: "cubic-bezier(0.2, 0.7, 0.3, 1)" },
    );
    anim.onfinish = () => ring.remove();
  } else {
    window.setTimeout(() => ring.remove(), 420);
  }
}

export function installClickThrough({ motion, isReady, cue }: Options) {
  let bypass = false;
  let lastPointerType = "mouse";
  const scheduled = new Set<HTMLElement>();

  const onPointerDown = (e: PointerEvent) => {
    lastPointerType = e.pointerType || "mouse";
  };

  const replay = (el: HTMLElement) => {
    if (!el.isConnected) return;
    bypass = true;
    try {
      el.click();
    } finally {
      bypass = false;
    }
  };

  const onClick = (e: MouseEvent) => {
    if (bypass || e.defaultPrevented) return;
    // Keyboard activation (Enter/Space) and scripted clicks have detail 0.
    if (e.detail === 0 || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const el = findTarget(e.target);
    if (!el) return;

    // Already on its way to press this, or a second click queued: swallow
    // repeats so a double click never runs the action twice.
    if (scheduled.has(el) || (motion.busy && !motion.canQueue)) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return;
    }

    const pointerType = (e as PointerEvent).pointerType || lastPointerType;
    if (pointerType === "touch" || window.innerWidth < 768) {
      cue("wave");
      return;
    }
    if (prefersReducedMotion() || !isReady()) return;

    // Contact point: where the pointer was, kept inside the element.
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX, r.left + 2), r.right - 2);
    const y = Math.min(Math.max(e.clientY, r.top + 2), r.bottom - 2);

    const queued = motion.busy;
    let done = false;
    let touched = false;
    const contact = () => {
      if (touched) return;
      touched = true;
      pressFeedback(el, x, y);
    };
    const act = () => {
      if (done) return;
      done = true;
      scheduled.delete(el);
      window.clearTimeout(safety);
      replay(el);
      cue("happy");
    };
    // If frames stop (tab hidden, context lost), never swallow the click.
    const safety = window.setTimeout(() => {
      contact();
      act();
    }, queued ? 2200 : 1400);

    if (!motion.requestPress(x, y, { contact, act })) {
      window.clearTimeout(safety);
      return;
    }
    scheduled.add(el);
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  };

  document.addEventListener("pointerdown", onPointerDown, { capture: true, passive: true });
  document.addEventListener("click", onClick, { capture: true });
  return () => {
    document.removeEventListener("pointerdown", onPointerDown, { capture: true });
    document.removeEventListener("click", onClick, { capture: true });
    motion.flush();
  };
}
