import CatalogClient from "./CatalogClient";

export const metadata = {
  title: "Demo Catalog — Product Showcase",
  description:
    "แคตตาล็อกสินค้าแบบโต้ตอบ — เลือกสินค้าได้หลายรายการ ทั้งแบบรูปภาพและโมเดล 3 มิติ เพื่อนำไปนำเสนอสาธิตให้ลูกค้า",
  robots: { index: false, follow: false },
};

// Standalone mini-site: rendered as a bare route (see app/Chrome.tsx), so the
// main-site Navbar/Footer/Preloader are intentionally absent. Everything the
// catalog needs lives inside CatalogClient.
export default function DemoCatalogPage() {
  return <CatalogClient />;
}
