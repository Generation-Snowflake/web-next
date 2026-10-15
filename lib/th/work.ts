// Thai text for lib/work.ts, keyed by slug. See overlay() in lib/i18n.ts.
import type { Overlay } from "@/lib/i18n";
import type { CaseStudy } from "@/lib/work";

export const caseStudiesTh: Record<string, Overlay<CaseStudy>> = {
  "web-apps": {
    title: "เว็บแอปและเครื่องมือภายในองค์กร",
    area: "เว็บ",
    summary: "ระบบสำหรับลูกค้า ระบบจองและสั่งซื้อ ระบบหลังบ้าน และแดชบอร์ด ที่มาแทนการทำงานบนสเปรดชีตและกระดาษ",
  },
  "mobile-apps": {
    title: "แอปมือถือ",
    area: "มือถือ",
    summary: "แอป iOS และ Android สำหรับลูกค้าและพนักงานภาคสนาม รวมถึงแอปที่เชื่อมต่อกับฮาร์ดแวร์ผ่าน Bluetooth",
  },
  "computer-vision": {
    title: "Computer Vision",
    area: "AI",
    summary: "ระบบกล้องที่จดจำ นับ และตรวจสอบได้อัตโนมัติ ใช้ทั้งยืนยันตัวตนและตรวจคุณภาพชิ้นงาน",
  },
  "ai-automation": {
    title: "AI และระบบจัดการเอกสารอัตโนมัติ",
    area: "AI",
    summary: "เครื่องมืออ่าน จัดหมวดหมู่ และดึงข้อมูลจากเอกสาร รวมถึงผู้ช่วย AI ที่ตอบคำถามจากข้อมูลขององค์กรเอง",
  },
  "iot-monitoring": {
    title: "IoT และระบบมอนิเตอร์",
    area: "IoT",
    summary: "เซนเซอร์ Data Pipeline และแดชบอร์ดแบบเรียลไทม์ที่แจ้งเตือนได้ สำหรับดูแลเครื่องจักรและอาคาร",
  },
  robotics: {
    title: "ซอฟต์แวร์หุ่นยนต์",
    area: "หุ่นยนต์",
    summary: "ซอฟต์แวร์ควบคุมหุ่นยนต์และหน้าจอสำหรับผู้ควบคุม พัฒนาบน ROS 2",
  },
  "3d-web": {
    title: "3D แบบอินเทอร์แอกทีฟบนเว็บ",
    area: "เว็บ",
    summary: "โมเดล 3D หน้าแสดงสินค้าแบบหมุนดูได้ และทัวร์เสมือนจริง ที่เปิดดูได้บนเว็บเบราว์เซอร์",
  },
};
