// Custom engineering services (work we build FOR a client). Products we sell
// off the shelf live in lib/products.ts — keep the two separate.
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Cloud,
  Cpu,
  Database,
  Globe,
  ScanEye,
  Smartphone,
  Wifi,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
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
    icon: ScanEye,
    summary:
      "Models that look at camera images and report what they see, from counting parts on a line to reading a Thai ID card.",
    description:
      "Vision projects usually succeed or fail on the camera setup and the dataset more than on the model. So we start there: where the camera goes, what the light looks like at noon and at night, and how many labelled images we need. Typical jobs are identity checks, defect inspection, and counting or tracking people and products. Once the model works, we make it fast enough for the hardware it will run on, whether that's a cloud GPU or a Jetson Orin mounted next to the camera.",
    deliverables: [
      "Object detection, segmentation and tracking",
      "Face matching and identity checks, with liveness detection",
      "OCR and document reading, e.g. Thai ID cards, invoices, delivery notes",
      "Deployment on NVIDIA Jetson and other edge devices, sped up with TensorRT",
    ],
    stack: ["OpenCV", "YOLO", "PyTorch", "TensorRT", "Jetson"],
  },
  {
    slug: "robotics-automation",
    title: "Robotics and ROS 2",
    icon: Cpu,
    summary:
      "ROS 2 software for arms, mobile robots and automated cells, plus the screen the operator uses.",
    description:
      "We write the ROS 2 nodes that connect a robot to its sensors and to the rest of your system. On top of that come motion planning with MoveIt, teleoperation, and data collection for imitation learning. We also build the operator screen. If the people on the floor can't run the robot without calling an engineer, the job isn't finished.",
    deliverables: [
      "ROS 2 architecture, drivers and links to your other systems",
      "Arm and mobile base control, with MoveIt for motion planning",
      "Teleoperation and imitation-learning data collection with LeRobot",
      "Simulation and bench tests before anything moves on site, plus the operator UI",
    ],
    stack: ["ROS 2", "MoveIt", "LeRobot", "Python", "C++"],
  },
  {
    slug: "ai-machine-learning",
    title: "AI and machine learning",
    icon: Brain,
    summary:
      "LLM tools and prediction models, connected to the systems your staff already use.",
    description:
      "First we check whether you need AI at all. Sometimes a rule or a SQL query does the job for less money. If a model is the right call, we prepare the data and pick or fine-tune one, then put it behind an API your other systems can call. You also get an evaluation report that shows where the model gets things wrong, and a plan for retraining when your data changes.",
    deliverables: [
      "Chat assistants that answer from your own documents (RAG), for example a policy bot on your LINE OA",
      "Forecasting, classification and anomaly detection on sales, sensor or transaction data",
      "Evaluation reports: accuracy on your data, typical failure cases, cost per request",
      "Deployment, monitoring and a retraining schedule",
    ],
    stack: ["Python", "PyTorch", "scikit-learn", "Hugging Face", "FastAPI"],
  },
  {
    slug: "iot-systems",
    title: "IoT and sensors",
    icon: Wifi,
    summary:
      "Sensors that send readings to a server, and a dashboard that tells you when something is off.",
    description:
      "Say you run a factory in Samut Prakan and want to know when a compressor starts running hot, before it stops. We would write the firmware for the sensor board (often an ESP32), send the readings through an MQTT broker into a time-series database, and put them on a dashboard with alerts to LINE or email. We also plan for the dull parts: what happens when the Wi-Fi drops, and how to update firmware on a device nobody can easily reach.",
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
      "We build in TypeScript with Next.js and PostgreSQL. It's a common stack in Thailand, so if you hire your own developers later, they can pick up the code without us. Typical jobs: a booking system that takes PromptPay, or an admin panel to replace the shared Excel file nobody dares to sort.",
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
    icon: Smartphone,
    summary: "iOS and Android apps for your customers, your field staff, or the hardware you're building.",
    description:
      "We normally write one codebase for both platforms, in React Native or Flutter. The app can keep working offline and sync when the signal comes back, which matters for staff working upcountry or in a warehouse with bad reception. If your product includes hardware, we write the Bluetooth or Wi-Fi link to it too.",
    deliverables: [
      "One app for iOS and Android",
      "Companion apps for Bluetooth LE devices",
      "Offline mode that syncs when it reconnects",
      "Release to the App Store and Google Play",
    ],
    stack: ["React Native", "Expo", "Flutter"],
  },
  {
    slug: "backend-cloud",
    title: "Backend and cloud",
    icon: Cloud,
    summary: "APIs, integrations and servers, with logs you can read when something breaks.",
    description:
      "We design how the parts of the system talk to each other and build the services. Then we set up CI/CD, containers and monitoring, so a release is a normal weekday job. We also connect to what you already run, such as an ERP, a LINE OA or a payment gateway. If your traffic doesn't need Kubernetes, we'll say so and keep it simple.",
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
    summary: "Getting data out of machines, apps and spreadsheets into one place, then into reports people open.",
    description:
      "A common situation: the numbers you need already exist, but they're split between a POS, a machine log and a folder of Excel files on someone's laptop. We move them into one database on a schedule, check them for gaps and duplicates, and build dashboards in Metabase or whatever BI tool you already use.",
    deliverables: [
      "Scheduled ETL/ELT pipelines (Airflow, dbt)",
      "Warehouse and schema design",
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
    bestFor: "For a product that keeps growing",
    description:
      "Our engineers work with your team on your roadmap, billed monthly. You can scale it up or down month to month.",
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
    description: "For anything uncertain, we build the riskiest part first so you can see it work (or not) before committing.",
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
    output: "Test notes",
  },
  {
    title: "Hand over",
    description: "Deployment, documentation and training for the people who will run it.",
    output: "Source code and docs",
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
    a: "A prototype is usually 2–6 weeks. A production web or mobile system is more often 2–6 months. After the first call we send a timeline with milestones.",
  },
  {
    q: "How do you price work?",
    a: "Prototypes and fixed-scope projects are quoted per milestone. Monthly team work is billed monthly. Quotes are itemised, so you can see where the time goes.",
  },
  {
    q: "Can you work on our existing system?",
    a: "Yes. We often extend or fix existing codebases and work alongside in-house developers, using your tools.",
  },
  {
    q: "Do you do the hardware side too?",
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
