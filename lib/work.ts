// Selected projects shown on the home page and /portfolio. Client names are
// intentionally omitted; add `image` once real screenshots are available
// (files in /public/work/).

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  challenge: string;
  solution: string;
  tags: string[];
  image?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "vision-identity",
    title: "Face matching for identity checks",
    sector: "KYC and security",
    summary:
      "Checks that the face on camera matches the one on record, and sends unclear cases to a person.",
    challenge:
      "Operators were checking identities by eye. It was slow, and two operators could look at the same case and decide differently.",
    solution:
      "A deep-learning model compares the two faces and runs a liveness check, so a photo held up to the camera won't pass. Anything the model isn't sure about goes to a review screen, where an operator makes the call.",
    tags: ["Computer Vision", "Deep Learning", "Web Console"],
  },
  {
    slug: "iot-monitoring",
    title: "Sensor monitoring for connected equipment",
    sector: "Industrial IoT",
    summary:
      "Live readings, device health and alerts, in one place.",
    challenge:
      "Each device kept its own data, and nobody got a warning before something failed.",
    solution:
      "Devices publish to an MQTT broker. The readings go into time-series storage and onto live dashboards, with alerts when a value crosses a limit or starts drifting.",
    tags: ["IoT", "MQTT", "Real-time Dashboard"],
  },
  {
    slug: "robot-control",
    title: "Control software for robot operators",
    sector: "Automation",
    summary:
      "One screen to see each robot's status, give it a mission and send commands.",
    challenge:
      "People on the floor needed to watch and command the robots safely, without learning ROS.",
    solution:
      "A control layer connected over ROS 2, with mission planning, live status and role-based access, so an operator and an engineer see different controls.",
    tags: ["ROS 2", "Robot UI", "Automation"],
  },
  {
    slug: "ai-workflow",
    title: "Document sorting with OCR and an LLM",
    sector: "Back office",
    summary:
      "Reads incoming documents, sorts them, and pulls out the data staff used to type in by hand.",
    challenge:
      "Staff spent hours every day reading, sorting and re-typing incoming documents.",
    solution:
      "OCR turns each scan into text. An LLM decides what kind of document it is and extracts the fields. A person checks the result before it goes into the existing system.",
    tags: ["LLM", "OCR", "Workflow Automation"],
  },
];
