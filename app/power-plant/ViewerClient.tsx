"use client";

import dynamic from "next/dynamic";

// WebGL / three.js only runs in the browser, so load the viewer client-side only.
const PowerPlantViewer = dynamic(() => import("@/components/PowerPlantViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-darkbg">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ice/30 border-t-ice" />
    </div>
  ),
});

export default function ViewerClient() {
  return <PowerPlantViewer />;
}
