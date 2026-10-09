// Thai text for lib/work.ts, keyed by slug. See overlay() in lib/i18n.ts.
import type { Overlay } from "@/lib/i18n";
import type { CaseStudy } from "@/lib/work";

export const caseStudiesTh: Record<string, Overlay<CaseStudy>> = {
  "web-apps": {
    title: "เว็บแอปและเครื่องมือภายในองค์กร",
    area: "เว็บ",
    summary: "พอร์ทัลลูกค้า ระบบจองและสั่งซื้อ หน้าแอดมิน และแดชบอร์ด ที่มาแทนสเปรดชีตและงานเอกสาร",
  },
  "mobile-apps": {
    title: "แอปมือถือ",
    area: "มือถือ",
    summary: "แอป iOS และ Android สำหรับลูกค้าและพนักงานภาคสนาม รวมถึงแอปที่เชื่อมต่อกับฮาร์ดแวร์ผ่าน Bluetooth",
  },
  "computer-vision": {
    title: "Computer Vision",
    area: "AI",
    summary: "ระบบกล้องที่จดจำ นับ และตรวจสอบสิ่งต่างๆ เช่น การยืนยันตัวตนและการตรวจสอบด้วยภาพ",
  },
  "ai-automation": {
    title: "AI และระบบจัดการเอกสารอัตโนมัติ",
    area: "AI",
    summary: "เครื่องมือที่อ่าน จัดหมวดหมู่ และดึงข้อมูลจากเอกสาร และผู้ช่วยที่ตอบคำถามจากข้อมูลขององค์กรเอง",
  },
  "iot-monitoring": {
    title: "IoT และระบบติดตาม",
    area: "IoT",
    summary: "เซนเซอร์ Data Pipeline และแดชบอร์ดแบบเรียลไทม์ พร้อมแจ้งเตือน สำหรับเครื่องจักรและอาคาร",
  },
  robotics: {
    title: "ซอฟต์แวร์หุ่นยนต์",
    area: "หุ่นยนต์",
    summary: "ซอฟต์แวร์ควบคุมและหน้าจอผู้ควบคุมหุ่นยนต์ พัฒนาบน ROS 2",
  },
  "3d-web": {
    title: "3D แบบโต้ตอบบนเว็บ",
    area: "เว็บ",
    summary: "โมเดล 3D ตัวแสดงสินค้า และทัวร์เสมือน ที่ทำงานบนเว็บเบราว์เซอร์",
  },
};
