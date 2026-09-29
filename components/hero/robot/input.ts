"use client";

import { useEffect, useRef, type RefObject } from "react";

export type RobotCommand = "wave" | "excited" | "calm" | "happy";

/** Mutable, per-frame input snapshot written by window listeners and read in
 *  useFrame. The canvas itself is `pointer-events: none`, so every bit of
 *  interaction is derived from window-level events. */
export type RobotInput = {
  /** Last pointer position in client (viewport) pixels. */
  x: number;
  y: number;
  hasPointer: boolean;
  /** performance.now() of the last pointer movement. */
  lastMove: number;
  /** Last pointer was a touch contact (no hover semantics). */
  touch: boolean;
  /** Pointer is currently over a link / button / form control. */
  overInteractive: boolean;
  tap: { pending: boolean; x: number; y: number };
  /** Canvas wrapper rect in client pixels, refreshed on scroll/resize. */
  rect: { left: number; top: number; width: number; height: number };
  /** 0 while the hero is at the top of the viewport → 1 once scrolled away. */
  scroll: number;
  commands: RobotCommand[];
  /** Whether this scene currently forces the page cursor to `pointer`. */
  cursorOn: boolean;
};

const INTERACTIVE =
  'a,button,input,textarea,select,label,summary,[role="button"],[role="link"],[contenteditable="true"]';

function isInteractive(target: EventTarget | null) {
  return target instanceof Element && target.closest(INTERACTIVE) !== null;
}

/** Toggle the page cursor while hovering the robot; always restorable. */
export function setRobotCursor(input: RobotInput, on: boolean) {
  if (input.cursorOn === on || typeof document === "undefined") return;
  input.cursorOn = on;
  document.documentElement.style.cursor = on ? "pointer" : "";
}

function createInput(): RobotInput {
  return {
    x: 0,
    y: 0,
    hasPointer: false,
    lastMove: -Infinity,
    touch: false,
    overInteractive: false,
    tap: { pending: false, x: 0, y: 0 },
    rect: { left: 0, top: 0, width: 1, height: 1 },
    scroll: 0,
    commands: [],
    cursorOn: false,
  };
}

const COMMANDS: readonly RobotCommand[] = ["wave", "excited", "calm", "happy"];

export function useRobotInput(wrapRef: RefObject<HTMLDivElement | null>) {
  const inputRef = useRef<RobotInput>(createInput());

  useEffect(() => {
    const input = inputRef.current;
    const wrap = wrapRef.current;

    const measure = () => {
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      input.rect.left = r.left;
      input.rect.top = r.top;
      input.rect.width = Math.max(r.width, 1);
      input.rect.height = Math.max(r.height, 1);
      const travel = Math.max(r.height * 0.85, 1);
      input.scroll = Math.min(Math.max(-r.top / travel, 0), 1);
    };

    const onMove = (e: PointerEvent) => {
      input.x = e.clientX;
      input.y = e.clientY;
      input.hasPointer = true;
      input.touch = e.pointerType === "touch";
      input.lastMove = performance.now();
      input.overInteractive = isInteractive(e.target);
    };

    const onDown = (e: PointerEvent) => {
      onMove(e);
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (input.overInteractive) return;
      input.tap.pending = true;
      input.tap.x = e.clientX;
      input.tap.y = e.clientY;
    };

    const onLeave = (e: PointerEvent) => {
      if (e.relatedTarget === null && e.pointerType !== "touch") {
        input.hasPointer = false;
        setRobotCursor(input, false);
      }
    };

    const onBlur = () => {
      input.hasPointer = false;
      setRobotCursor(input, false);
    };

    const onCommand = (e: Event) => {
      const action = (e as CustomEvent<{ action?: string }>).detail?.action;
      if (action && (COMMANDS as readonly string[]).includes(action)) {
        input.commands.push(action as RobotCommand);
        if (input.commands.length > 8) input.commands.shift();
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (wrap) ro.observe(wrap);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });
    window.addEventListener("blur", onBlur);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("gsf:robot", onCommand);

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("gsf:robot", onCommand);
      setRobotCursor(input, false);
    };
  }, [wrapRef]);

  return inputRef;
}
