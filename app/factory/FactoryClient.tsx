"use client";

import dynamic from "next/dynamic";

const FactoryViewer = dynamic(() => import("@/components/FactoryViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[70vh] min-h-[480px] w-full items-center justify-center rounded-2xl border border-ice/20 bg-darkbg">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-ice/30 border-t-ice" />
    </div>
  ),
});

export default function FactoryClient() {
  return <FactoryViewer />;
}
