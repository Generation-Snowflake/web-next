// People and track record, from GSF's own company deck. Keep this factual:
// only add entries that can be backed up.

export type TeamMember = {
  name: string;
  nameTh?: string;
  role: string;
  background: string[];
  photo?: string;
};

export const team: TeamMember[] = [
  {
    name: "Tanawit Sinsukudomchai",
    role: "Robotics & AI",
    background: [
      "B.Eng. Robotics Engineering, KMUTNB",
      "Robotics software lead at a startup",
      "8 years in robotics engineering, 1 year as an AI engineer",
    ],
  },
  {
    name: "Ektanat Pupat",
    role: "Automation & software",
    background: [
      "B.Eng. Robotics Engineering, KMUTNB",
      "2 years in automation, 3 years as a programmer",
    ],
  },
  {
    name: "Teeratat Peromtukorn",
    role: "Automation & software",
    background: [
      "B.Eng. Robotics Engineering, KMUTNB",
      "2 years in automation, 3 years as a programmer",
    ],
  },
  {
    name: "Eakanut Peromtukorn",
    role: "Finance & operations",
    background: [
      "Winner, Financial Professional @ Financial Institution Camp 2023 (SET)",
      "New Breed Capital Market Financial Professional 2023",
      "Data analyst; internship at Bualuang Securities",
    ],
  },
];

export type Award = { result: string; event: string; note?: string };

/** Competition results of team members (robotics), newest context first. */
export const awards: Award[] = [
  { result: "1st place", event: "RoboCup Rescue Canada", note: "+ Best in Class Mobility" },
  { result: "2nd place", event: "RoboCup Rescue Australia", note: "+ Best in Class Mobility" },
  { result: "2nd place", event: "World Robot Games" },
  { result: "2nd place", event: "Yamo RoboCup" },
  { result: "Rising Star Award", event: "HACKa'Thailand 2023 Roadshow" },
  { result: "Round of 16", event: "TPA Robot Contest Thailand Championship" },
  { result: "Round of 16", event: "World Robot Olympiad" },
];

export const teaching: string[] = [
  "Taught robot fundamentals to 20+ vocational students",
  "Private and small-group robotics classes",
  "Advisor to a primary-school robotics club",
];
