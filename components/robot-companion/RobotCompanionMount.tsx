"use client";

import dynamic from "next/dynamic";

// WebGL is client-only; nothing is drawn until the scene has loaded.
const RobotCompanion = dynamic(() => import("./RobotCompanion"), {
  ssr: false,
  loading: () => null,
});

/** Mounted once in the site shell (app/Chrome.tsx). */
export default function RobotCompanionMount() {
  return <RobotCompanion />;
}
