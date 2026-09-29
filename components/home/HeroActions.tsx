"use client";

import ButtonLink from "@/components/ui/Button";

type RobotAction = "wave" | "excited" | "calm";

/** Tell the hero robot to react (see components/hero/HeroRobot). */
function cueRobot(action: RobotAction) {
  window.dispatchEvent(new CustomEvent("gsf:robot", { detail: { action } }));
}

function robotCue(action: RobotAction) {
  return {
    onMouseEnter: () => cueRobot(action),
    onFocus: () => cueRobot(action),
    onMouseLeave: () => cueRobot("calm"),
    onBlur: () => cueRobot("calm"),
  };
}

export default function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
      <ButtonLink href="/contact" size="lg" tone="night" arrow {...robotCue("wave")}>
        Describe your project
      </ButtonLink>
      <ButtonLink href="/products" variant="link" className="text-[16px]" {...robotCue("excited")}>
        See the robots we sell
      </ButtonLink>
    </div>
  );
}
