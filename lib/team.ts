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
