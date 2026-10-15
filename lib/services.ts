// Custom engineering services (work we build FOR a client). Products we sell
// off the shelf live in lib/products.ts — keep the two separate.
// Icons: Phosphor (Brand Guidelines, Iconography).
import { overlay, type Lang } from "@/lib/i18n";
import { engagementModelsTh, processStepsTh, serviceFaqsTh, servicesTh } from "@/lib/th/services";
import type { Icon } from "@phosphor-icons/react";
import {
  Brain,
  Cloud,
  Cpu,
  Database,
  DeviceMobile,
  Globe,
  Scan,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";

export type Service = {
  slug: string;
  title: string;
  icon: Icon;
  /** One line for cards. */
  summary: string;
  /** Longer paragraph for the services page. */
  description: string;
  deliverables: string[];
  stack: string[];
};

export const services: Service[] = [
  {
    slug: "computer-vision",
    title: "Computer vision",
    icon: Scan,
    summary:
      "Models that read camera images and report what they find, from counting parts on a production line to reading a Thai ID card.",
    description:
      "A vision project depends more on the camera setup and the dataset than on the model. So we start there: where the camera goes, how the light changes between noon and night, and how many labelled images we need. Typical jobs are identity checks, defect inspection, and counting or tracking people and products. Once the model is accurate enough, we tune it to run fast on the hardware it will use, whether that's a cloud GPU or a Jetson Orin mounted next to the camera.",
    deliverables: [
      "Object detection, segmentation and tracking",
      "Face matching and identity checks, with liveness detection",
      "OCR and document reading, such as Thai ID cards, invoices and delivery notes",
      "Deployment on NVIDIA Jetson and other edge devices, optimised with TensorRT",
    ],
    stack: ["OpenCV", "YOLO", "PyTorch", "TensorRT", "Jetson"],
  },
  {
    slug: "robotics-automation",
    title: "Robotics and ROS 2",
    icon: Cpu,
    summary:
      "ROS 2 software for robot arms, mobile robots and automated cells, plus the screen operators use to run them.",
    description:
      "We write the ROS 2 nodes that connect a robot to its sensors and to the rest of your system, then add motion planning with MoveIt, teleoperation, and data collection for imitation learning. We also build the operator screen: if the people on the floor can't run the robot without calling an engineer, the job isn't finished.",
    deliverables: [
      "ROS 2 architecture, drivers and integration with your other systems",
      "Arm and mobile base control, with MoveIt for motion planning",
      "Teleoperation and imitation-learning data collection with LeRobot",
      "Simulation and bench tests before anything moves on site, and the operator screen",
    ],
    stack: ["ROS 2", "MoveIt", "LeRobot", "Python", "C++"],
  },
  {
    slug: "ai-machine-learning",
    title: "AI and machine learning",
    icon: Brain,
    summary:
      "Prediction models and AI assistants built on large language models (LLMs), connected to the systems your staff already use.",
    description:
      "First we check whether you need AI at all. Sometimes a simple rule or a database query does the job for less money. If a model is the right choice, we prepare the data, pick or fine-tune a model, and put it behind an API your other systems can call. You also get an evaluation report that shows where the model gets things wrong, and a plan for retraining it when your data changes.",
    deliverables: [
      "Chat assistants that answer from your own documents (RAG), for example a company-policy bot on your LINE OA",
      "Forecasting, classification and anomaly detection on sales, sensor or transaction data",
      "Evaluation reports covering accuracy on your data, common failure cases and cost per request",
      "Deployment, monitoring and a retraining schedule",
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "Hugging Face", "FastAPI"],
  },
  {
    slug: "iot-systems",
    title: "IoT and sensors",
    icon: WifiHigh,
    summary:
      "Sensors that send readings to a server, and a dashboard that alerts you when something looks wrong.",
    description:
      "Take a factory that wants to know when a compressor starts running hot, before it breaks down. We write the firmware for the sensor board (often an ESP32), send the readings through an MQTT broker into a time-series database, and show them on a dashboard with alerts by LINE or email. We also plan for the problems that tend to get overlooked: what happens when the Wi-Fi drops, and how to update firmware on a device that is hard to reach.",
    deliverables: [
      "Device firmware and sensor wiring (ESP32 and similar boards)",
      "MQTT or HTTP telemetry into a time-series database",
      "Live dashboards, with alerts by LINE or email",
      "Remote configuration and over-the-air (OTA) firmware updates",
    ],
    stack: ["ESP32", "MQTT", "Node.js", "InfluxDB", "Grafana"],
  },
  {
    slug: "web-platforms",
    title: "Web apps",
    icon: Globe,
    summary: "Web apps and internal tools, designed around the people who'll use them every day.",
    description:
      "We build in TypeScript with Next.js and PostgreSQL. It's a common stack in Thailand, so if you hire your own developers later, they can take over the code without us. Typical projects include a booking system that accepts PromptPay, or an admin panel that replaces the Excel file the whole team shares.",
    deliverables: [
      "Web apps, customer portals and admin dashboards",
      "UX/UI design in Thai and English",
      "Login, user roles and payments",
      "Page speed, SEO and accessibility",
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL"],
  },
  {
    slug: "mobile-applications",
    title: "Mobile apps",
    icon: DeviceMobile,
    summary: "iOS and Android apps for your customers, your field staff, or the hardware you're building.",
    description:
      "We normally write one codebase for both platforms, in React Native or Flutter. The app keeps working offline and syncs when the signal comes back, which matters for staff out in the provinces or in a warehouse with poor reception. If your product includes hardware, we also build the Bluetooth or Wi-Fi connection to it.",
    deliverables: [
      "One app for iOS and Android",
      "Companion apps for Bluetooth LE devices",
      "Offline mode that syncs when it reconnects",
      "Publishing on the App Store and Google Play",
    ],
    stack: ["React Native", "Expo", "Flutter"],
  },
  {
    slug: "backend-cloud",
    title: "Backend and cloud",
    icon: Cloud,
    summary: "APIs, integrations and servers, with logs you can read when something breaks.",
    description:
      "We design how the parts of the system talk to each other and build the services. Then we set up CI/CD, containers and monitoring, so releasing a new version is routine rather than a weekend event. We also connect to what you already run, such as an ERP, a LINE OA or a payment gateway. If your traffic doesn't need Kubernetes, we'll say so and keep it simple.",
    deliverables: [
      "REST and GraphQL APIs, and integrations with ERP, LINE OA or payment gateways",
      "System architecture and code review",
      "CI/CD, containers and infrastructure as code",
      "Logging, monitoring and keeping the cloud bill under control",
    ],
    stack: ["Node.js", "FastAPI", "Docker", "AWS", "GCP"],
  },
  {
    slug: "data-engineering",
    title: "Data pipelines and reports",
    icon: Database,
    summary: "Getting data out of machines, apps and spreadsheets into one place, then into reports people actually use.",
    description:
      "Often the numbers you need already exist, but they're split between a POS, a machine log and a folder of Excel files on someone's laptop. We move them into one database on a schedule, check them for gaps and duplicates, and build dashboards in Metabase or the BI tool you already use.",
    deliverables: [
      "Scheduled ETL/ELT pipelines (Airflow, dbt)",
      "Data warehouse and schema design",
      "Dashboards and KPI reports",
      "Data checks for missing rows, duplicates and totals that don't match",
    ],
    stack: ["PostgreSQL", "BigQuery", "Airflow", "dbt", "Metabase"],
  },
];

export type EngagementModel = {
  title: string;
  bestFor: string;
  description: string;
  points: string[];
};

export const engagementModels: EngagementModel[] = [
  {
    title: "Prototype first",
    bestFor: "When you're not sure it will work",
    description:
      "A short, fixed-price build of the riskiest part. You get a working demo and a written report, and you can stop there if the answer is no.",
    points: ["Usually 2–6 weeks", "Fixed price"],
  },
  {
    title: "Fixed scope",
    bestFor: "When the requirements are clear",
    description:
      "We agree the scope, milestones and price up front, and you pay per milestone.",
    points: ["Paid per milestone", "A demo every week"],
  },
  {
    title: "Monthly team",
    bestFor: "When the product keeps growing",
    description:
      "Our engineers join your team and work through your roadmap. It's billed monthly, and you can make the team bigger or smaller from one month to the next.",
    points: ["Billed monthly"],
  },
];

export type ProcessStep = { title: string; description: string; output: string };

export const processSteps: ProcessStep[] = [
  {
    title: "Call",
    description: "You tell us the problem. We ask a lot of questions and look at what you already have.",
    output: "A written summary and a rough estimate",
  },
  {
    title: "Prototype",
    description: "For anything uncertain, we build the riskiest part first, so you can see whether it works before you commit to the full build.",
    output: "A working demo",
  },
  {
    title: "Build",
    description: "Short iterations with a demo every week. You can change direction early instead of at the end.",
    output: "Working software, every week",
  },
  {
    title: "Test",
    description: "Automated tests and QA. For hardware, bench tests in our office and then trials on site.",
    output: "Test results",
  },
  {
    title: "Hand over",
    description: "Deployment, documentation and training for the people who will run it.",
    output: "Source code and documentation",
  },
  {
    title: "Support",
    description: "Fixes and changes after launch, under a support plan that fits the system.",
    output: "A support agreement",
  },
];

export type Faq = { q: string; a: string };

export const serviceFaqs: Faq[] = [
  {
    q: "How long does a project take?",
    a: "A prototype usually takes 2–6 weeks. A production web or mobile system typically takes 2–6 months. After the first call, we send a timeline with milestones.",
  },
  {
    q: "How do you price work?",
    a: "Prototypes and fixed-scope projects are quoted per milestone, and a monthly team is billed each month. Quotes are itemised, so you can see where the time goes.",
  },
  {
    q: "Can you work on our existing system?",
    a: "Yes. We often extend or fix existing codebases and work alongside in-house developers, using your tools.",
  },
  {
    q: "Do you handle the hardware too?",
    a: "Yes. Robotics, IoT and vision projects involve cameras, sensors, controllers and robots. We can source them, wire them up and test them on site.",
  },
];

/** Technologies shown in the stack strip on the home page. */
export const techStack: string[] = [
  "Python",
  "PyTorch",
  "ROS 2",
  "LeRobot",
  "OpenCV",
  "TypeScript",
  "Next.js",
  "React Native",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "MQTT",
  "NVIDIA Jetson",
  "AWS",
];

/** Services and their supporting lists in a language (Thai from lib/th/services.ts). */
export function getServices(lang: Lang): Service[] {
  return lang === "th" ? services.map((s) => overlay(s, servicesTh[s.slug])) : services;
}
export function getEngagementModels(lang: Lang): EngagementModel[] {
  return lang === "th" ? overlay(engagementModels, engagementModelsTh) : engagementModels;
}
export function getProcessSteps(lang: Lang): ProcessStep[] {
  return lang === "th" ? overlay(processSteps, processStepsTh) : processSteps;
}
export function getServiceFaqs(lang: Lang): Faq[] {
  return lang === "th" ? overlay(serviceFaqs, serviceFaqsTh) : serviceFaqs;
}
