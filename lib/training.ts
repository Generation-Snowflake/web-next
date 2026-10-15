// Robotics classes. Course content comes from GSF's own course outline;
// prices are quoted per group, so none are listed here.

import { overlay, type Lang } from "@/lib/i18n";
import { classFormatsTh, mazeCourseTh } from "@/lib/th/training";
export type CourseSession = { n: number; topic: string; activity: string };

export const mazeCourse = {
  name: "Maze robot course",
  audience: "Primary and lower-secondary students. No experience needed.",
  format: "12 sessions × 1.5 hours (18 hours in total), flexible schedule",
  summary:
    "Kids program a robot to escape a maze. They write drag-and-drop block code in the browser and see a 3D robot run it straight away, so every lesson ends with something that works (or a bug to find).",
  sessions: [
    { n: 1, topic: "Introduction", activity: "Getting to know the block-coding editor, with drag-and-drop exercises." },
    { n: 2, topic: "Code blocks I", activity: "Why the order of commands matters. Driving the robot with move and turn blocks." },
    { n: 3, topic: "Code blocks II", activity: "Loops (repeat and repeat-until), to do the same job without copying code." },
    { n: 4, topic: "Robot basics", activity: "Combining robot blocks with the other blocks to move the robot in the simulator." },
    { n: 5, topic: "First maze", activity: "Using logic and robot blocks to get through a simple maze." },
    { n: 6, topic: "IMU I", activity: "Using the robot's motion sensor to turn accurately." },
    { n: 7, topic: "IMU II", activity: "Clearing the stage with no walls, using the motion sensor." },
    { n: 8, topic: "Colour sensor I", activity: "How colour detection works, and programs that react to colour." },
    { n: 9, topic: "Colour sensor II", activity: "Solving the colour maze." },
    { n: 10, topic: "Maze algorithms", activity: "Maze-solving strategies, tested on harder mazes." },
    { n: 11, topic: "Maze competition", activity: "A team challenge on advanced mazes." },
    { n: 12, topic: "Maze competition", activity: "Final round and a look back at what everyone built." },
  ] satisfies CourseSession[],
  outcomes: [
    "Programming basics: sequences, conditions, loops, functions and data types",
    "Breaking a problem into steps, then testing and debugging",
    "What sensors and microcontrollers do and how a robot uses them",
    "Maths and logic, practised on a goal kids care about",
  ],
};

export type ClassFormat = { title: string; description: string; href?: string; linkLabel?: string };

export const classFormats: ClassFormat[] = [
  {
    title: "Private lessons and small groups",
    description: "One child or a small group, learning at their own pace. A good first step into coding and robots.",
  },
  {
    title: "School clubs and classes",
    description: "The maze robot course or hands-on Makerzoid sessions, run as part of a class or as an after-school robotics club.",
    href: "/products/makerzoid",
    linkLabel: "Makerzoid kits",
  },
  {
    title: "Colleges and universities",
    description: "Robot fundamentals for vocational and university students, and hands-on courses on robot learning with Armo and ArmoGo.",
    href: "/products/armo",
    linkLabel: "Armo robot arm",
  },
  {
    title: "Teacher workshops",
    description: "Training for teachers who will run the kits themselves, so the robots stay in use after we leave.",
  },
];

/** Course and class formats in a language (Thai from lib/th/training.ts). */
export function getMazeCourse(lang: Lang): typeof mazeCourse {
  return lang === "th" ? overlay(mazeCourse, mazeCourseTh) : mazeCourse;
}
export function getClassFormats(lang: Lang): ClassFormat[] {
  return lang === "th" ? overlay(classFormats, classFormatsTh) : classFormats;
}
