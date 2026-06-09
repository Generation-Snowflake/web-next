export type Product = {
  id: string;
  name: string;
  category: string;
  desc: string;
  /** Thumbnail / poster image shown on the card and for image-only products. */
  img: string;
  /** Optional GLB/GLTF model — when present the product can be shown in 3D. */
  model?: string;
  tags?: string[];
};

// NOTE: assets here are placeholders reusing what ships in /public. Swap the
// `img` / `model` paths for the real per-product files when they are ready.
export const products: Product[] = [
  {
    id: "neck-mech",
    name: "Robotic Neck Mechanism",
    category: "Robotics",
    desc: "กลไกคอหุ่นยนต์ 2 แกน เคลื่อนไหวลื่นไหล พร้อมแอนิเมชันสาธิตการทำงานจริง",
    img: "/portfolio/robot.png",
    model: "/models/neck-mech.glb",
    tags: ["3D", "Animated", "Actuator"],
  },
  {
    id: "amr-platform",
    name: "Autonomous Mobile Robot",
    category: "Robotics",
    desc: "แพลตฟอร์ม AMR สำหรับขนส่งในโรงงาน พร้อมระบบนำทางและหลบสิ่งกีดขวาง",
    img: "/portfolio/robot.png",
    model: "/models/neck-mech.glb",
    tags: ["3D", "Navigation", "ROS2"],
  },
  {
    id: "face-recognition",
    name: "AI Face Recognition",
    category: "AI Vision",
    desc: "ระบบยืนยันตัวตนด้วย Deep Learning รองรับ KYC และการจับคู่ใบหน้าแบบเรียลไทม์",
    img: "/portfolio/face.png",
    tags: ["AI", "KYC", "Realtime"],
  },
  {
    id: "cv-pipeline",
    name: "Image Processing Pipeline",
    category: "AI Vision",
    desc: "OCR, object detection และ segmentation ความเร็วสูงสำหรับงานอุตสาหกรรม",
    img: "/portfolio/cv.png",
    tags: ["AI", "OCR", "Detection"],
  },
  {
    id: "iot-monitor",
    name: "IoT Sensor Monitoring",
    category: "IoT",
    desc: "แดชบอร์ดติดตามเซนเซอร์แบบเรียลไทม์ พร้อมระบบแจ้งเตือนและ cloud pipeline",
    img: "/portfolio/iot.png",
    tags: ["IoT", "Dashboard", "Cloud"],
  },
  {
    id: "gripper-arm",
    name: "Adaptive Gripper Arm",
    category: "Robotics",
    desc: "แขนกลพร้อมกริปเปอร์ปรับแรงจับอัตโนมัติ เหมาะกับงานหยิบจับชิ้นงานหลากหลาย",
    img: "/portfolio/robot.png",
    model: "/models/neck-mech.glb",
    tags: ["3D", "Gripper", "Automation"],
  },
];

export const categories = [
  "ทั้งหมด",
  ...Array.from(new Set(products.map((p) => p.category))),
];
