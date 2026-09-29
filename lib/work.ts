// Kinds of work shown on the home page and /portfolio. Kept deliberately
// broad: no client names or project details. Add `image` once real
// screenshots are available (files in /public/work/).

export type CaseStudy = {
  slug: string;
  title: string;
  /** Short area label, shown in mono. */
  area: string;
  summary: string;
  tags: string[];
  image?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "web-apps",
    title: "Web apps and internal tools",
    area: "Web",
    summary:
      "Customer portals, booking and order systems, admin panels and dashboards that replace spreadsheets and paperwork.",
    tags: ["Next.js", "React", "PostgreSQL"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    area: "Mobile",
    summary: "iOS and Android apps for customers and field staff, including apps that talk to hardware over Bluetooth.",
    tags: ["React Native", "Flutter"],
  },
  {
    slug: "computer-vision",
    title: "Computer vision",
    area: "AI",
    summary: "Camera systems that recognise, count and check things, such as identity checks and visual inspection.",
    tags: ["OpenCV", "PyTorch", "Jetson"],
  },
  {
    slug: "ai-automation",
    title: "AI and document automation",
    area: "AI",
    summary: "Tools that read, sort and extract data from documents, and assistants that answer from a company's own information.",
    tags: ["OCR", "LLM"],
  },
  {
    slug: "iot-monitoring",
    title: "IoT and monitoring",
    area: "IoT",
    summary: "Sensors, data pipelines and live dashboards with alerts for equipment and buildings.",
    tags: ["ESP32", "MQTT", "Dashboards"],
  },
  {
    slug: "robotics",
    title: "Robot software",
    area: "Robotics",
    summary: "Control software and operator screens for robots, built on ROS 2.",
    tags: ["ROS 2", "Python"],
  },
  {
    slug: "3d-web",
    title: "Interactive 3D on the web",
    area: "Web",
    summary: "3D models, product viewers and site tours that run in the browser.",
    tags: ["Three.js", "WebGL"],
  },
];
