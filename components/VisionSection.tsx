"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ParticleNetwork from "./ParticleNetwork";
import MagneticText from "./MagneticText";

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center py-24 px-6 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-900/20 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />
      
      {/* PARTICLE NETWORK */}
      <ParticleNetwork />

      <div className="max-w-5xl mx-auto text-center z-10">
        <div ref={textRef} className="space-y-8">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight">
             <MagneticText 
              text="Engineering the Future"
              className="bg-clip-text text-transparent bg-gradient-to-r from-softwhite via-ice to-teal-400 justify-center"
            />
            <br />
            <span className="text-gray-500 text-3xl md:text-5xl font-medium mt-4 block">
              with Intelligence & Precision.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            At GSF Robotics & AI, we don't just write code; we build
            ecosystems. From autonomous robotics to scalable IoT networks and
            intelligent AI models, we deliver end-to-end solutions that drive
            innovation.
          </p>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 mt-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                Projects Delivered
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">99%</h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                Client Satisfaction
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                Support & Monitoring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
