"use client";

import ButtonLink from "@/components/ui/Button";
import type { Lang } from "@/lib/i18n";

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

const copy = {
  en: { primary: "Describe your project", secondary: "See the robots we sell" },
  th: { primary: "เล่ารายละเอียดโปรเจกต์", secondary: "ดูหุ่นยนต์ที่เราขาย" },
} satisfies Record<Lang, Record<string, string>>;

export default function HeroActions({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
      <ButtonLink href="/contact" size="lg" arrow {...robotCue("wave")}>
        {c.primary}
      </ButtonLink>
      <ButtonLink href="/products" variant="link" className="text-[16px]" {...robotCue("excited")}>
        {c.secondary}
      </ButtonLink>
    </div>
  );
}
