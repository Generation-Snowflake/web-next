"use client";

import dynamic from "next/dynamic";

// Nothing is drawn while the WebGL scene loads: the dark hero is enough.
const HeroRobot = dynamic(() => import("@/components/hero/HeroRobot"), {
  ssr: false,
  loading: () => null,
});

/** Client-only wrapper so the WebGL robot never renders on the server. */
export default function HeroRobotStage() {
  return <HeroRobot className="h-full w-full" />;
}
