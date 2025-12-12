"use client";

import FadeIn from "./FadeIn";
import {
  Brain,
  Cpu,
  Globe,
  Smartphone,
  Server,
  Database,
  ScanEye,
  Wifi,
} from "lucide-react";

const services = [
  {
    title: "Robotics Development",
    icon: <Cpu size={32} />,
    desc: "Custom robotic solutions with ROS2, SLAM, and autonomous navigation for industrial and commercial use.",
  },
  {
    title: "AI & Machine Learning",
    icon: <Brain size={32} />,
    desc: "State-of-the-art models for predictive analytics, NLP, and intelligent decision-making systems.",
  },
  {
    title: "Computer Vision",
    icon: <ScanEye size={32} />,
    desc: "Object detection, face recognition, and quality inspection using advanced deep learning (YOLO/PyTorch).",
  },
  {
    title: "IoT Systems",
    icon: <Wifi size={32} />,
    desc: "End-to-end IoT solutions from firmware (ESP32/STM32) to cloud dashboards and real-time monitoring.",
  },
  {
    title: "Web Platforms",
    icon: <Globe size={32} />,
    desc: "High-performance web applications using Next.js, React, and modern scalable architectures.",
  },
  {
    title: "Mobile Apps",
    icon: <Smartphone size={32} />,
    desc: "Cross-platform mobile experiences with Flutter or native iOS/Android development.",
  },
  {
    title: "Backend & API",
    icon: <Server size={32} />,
    desc: "Robust microservices and RESTful/GraphQL APIs built with NestJS, Go, or Python.",
  },
  {
    title: "Data Engineering",
    icon: <Database size={32} />,
    desc: "Data pipelines, warehousing, and visualization to turn raw data into actionable insights.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <FadeIn>
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Our Services
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            End-to-End Technology Solutions
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-900/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 mb-6 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 group-hover:text-white group-hover:bg-teal-500 transition-colors duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
