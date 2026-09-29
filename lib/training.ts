// Robotics classes. Course content comes from GSF's own course outline;
// prices are quoted per group, so none are listed here.

export type CourseSession = { n: number; topic: string; activity: string };

export const mazeCourse = {
  name: "Maze robot course",
  audience: "Primary and lower-secondary students, beginners welcome",
  format: "12 sessions × 1.5 hours (18 hours). Hours can be adjusted.",
  summary:
    "Kids program a robot to escape a maze. They write drag-and-drop block code in the browser and see a 3D robot run it straight away, so every lesson ends with something that works (or a bug to find).",
  sessions: [
    { n: 1, topic: "Introduction", activity: "Get to know the block coding editor. Drag-and-drop exercises." },
    { n: 2, topic: "Code blocks I", activity: "Why order matters. Move and turn blocks to drive the robot." },
    { n: 3, topic: "Code blocks II", activity: "Loops: repeat and repeat-until, to do the same job without copying code." },
    { n: 4, topic: "Robot basics", activity: "Robot blocks mixed with the other blocks to move the robot in the simulator." },
    { n: 5, topic: "First maze", activity: "Logic plus robot blocks to get through a simple maze." },
    { n: 6, topic: "IMU I", activity: "Using the robot's motion sensor to turn accurately." },
    { n: 7, topic: "IMU II", activity: "Getting through the no-wall stage with the motion sensor." },
    { n: 8, topic: "Colour sensor I", activity: "How colour detection works. Programs that react to colours." },
    { n: 9, topic: "Colour sensor II", activity: "Solving the colour maze." },
    { n: 10, topic: "Maze algorithms", activity: "Maze-solving strategies, tried on harder mazes." },
    { n: 11, topic: "Maze competition", activity: "Advanced mazes, in teams." },
    { n: 12, topic: "Maze competition", activity: "Final round and a look back at what everyone built." },
  ] satisfies CourseSession[],
  outcomes: [
    "Programming basics: sequences, conditions, loops, functions, data types",
    "Breaking a problem into steps, then testing and debugging",
    "What sensors and microcontrollers do and how a robot uses them",
    "Maths and logic, practised on a goal kids care about",
  ],
};

export type ClassFormat = { title: string; description: string; href?: string; linkLabel?: string };

export const classFormats: ClassFormat[] = [
  {
    title: "Private and small groups",
    description: "One child or a small group, at a pace that suits them. Good for a first taste of coding and robots.",
  },
  {
    title: "School clubs and classes",
    description: "The maze robot course, or a hands-on club with Makerzoid kits, run for a class or an after-school robotics club.",
    href: "/products/makerzoid",
    linkLabel: "Makerzoid kits",
  },
  {
    title: "Colleges and universities",
    description: "Robot fundamentals for vocational and university students, and workshops on robot learning with LeRobot SO-101 arms.",
    href: "/products/lerobot",
    linkLabel: "SO-101 arms",
  },
  {
    title: "Teacher workshops",
    description: "Sessions for teachers who will run the kits themselves, so the robots keep being used after we leave.",
  },
];
