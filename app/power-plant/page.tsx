import ViewerClient from "./ViewerClient";

export const metadata = {
  title: "Power Plant — Interactive 3D Sim",
  description:
    "Explore the power plant in full-screen 3D — click hotspots to zoom into each section and see the details.",
};

export default function PowerPlantPage() {
  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-darkbg">
      <ViewerClient />
    </div>
  );
}
