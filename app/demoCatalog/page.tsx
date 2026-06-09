import FadeIn from "@/components/FadeIn";
import CatalogClient from "./CatalogClient";

export const metadata = {
  title: "Demo Catalog — เลือกสินค้าไปเดโม่ลูกค้า",
  description:
    "แคตตาล็อกสินค้าแบบโต้ตอบ — เลือกสินค้าได้หลายรายการ ทั้งแบบรูปภาพและโมเดล 3 มิติ เพื่อนำไปนำเสนอสาธิตให้ลูกค้า",
};

export default function DemoCatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-28">
      <FadeIn>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-ice/70">
          Demo Catalog
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          แคตตาล็อกสินค้า
        </h1>
        <p className="mb-12 max-w-2xl leading-relaxed text-softwhite/70">
          เลือกสินค้าที่ต้องการได้หลายรายการ — มีทั้งแบบรูปภาพและไฟล์ 3 มิติ
          ที่หมุนดูได้รอบทิศ จากนั้นกด “เริ่มเดโม่” เพื่อเข้าสู่โหมดนำเสนอ
          แบบเต็มจอสำหรับสาธิตให้ลูกค้า
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <CatalogClient />
      </FadeIn>
    </div>
  );
}
