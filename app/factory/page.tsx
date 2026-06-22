import FadeIn from "@/components/FadeIn";
import FactoryClient from "./FactoryClient";

export const metadata = {
  title: "Factory Demo — Interactive 3D Factory",
  description:
    "ระบบจัดการโรงงานจำลอง 3 มิติ — เลือกโซน ซูม และดูรายละเอียดแต่ละพื้นที่แบบ Interactive",
};

export default function FactoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-28">
      <FadeIn>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-ice/70">
          Three.js · Factory Simulation
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          3D Factory Viewer
        </h1>
        <p className="mb-10 max-w-2xl leading-relaxed text-softwhite/70">
          ระบบแสดงผลโรงงานจำลองแบบ 3 มิติ — เลือกโซนจากเมนูหรือคลิกที่โมเดลเพื่อซูมเข้าดูรายละเอียด
          พร้อม Animation กล้องแบบ Smooth Lerp
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <FactoryClient />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-ice/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-semibold text-ice">Zone Selection</h3>
            <p className="text-sm text-softwhite/70">
              เลือกโซน A–C จากเมนูหรือคลิกโมเดลโดยตรง กล้องจะซูมเข้าหาโซนนั้นแบบสมูท
            </p>
          </div>
          <div className="rounded-xl border border-ice/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-semibold text-ice">Smooth Camera</h3>
            <p className="text-sm text-softwhite/70">
              ใช้ Linear Interpolation (Lerp) ทำให้กล้องเคลื่อนที่ลื่นไหลทุกเฟรม
              ไม่กระตุกเมื่อสลับโซน
            </p>
          </div>
          <div className="rounded-xl border border-ice/20 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 text-lg font-semibold text-ice">Interactive</h3>
            <p className="text-sm text-softwhite/70">
              ลากเพื่อหมุนกล้อง ซูมด้วย scroll และรีเซ็ตกลับมุมมองกว้างได้ตลอดเวลา
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
