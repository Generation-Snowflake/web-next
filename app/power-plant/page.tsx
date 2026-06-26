import ViewerClient from "./ViewerClient";

export const metadata = {
  title: "Power Plant — Interactive 3D Sim",
  description:
    "สำรวจโรงไฟฟ้าแบบ 3 มิติเต็มจอ — คลิกจุดสำคัญเพื่อซูมเข้าไปดูแต่ละส่วนพร้อมรายละเอียด",
};

export default function PowerPlantPage() {
  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-darkbg">
      <ViewerClient />
    </div>
  );
}
