import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // LeRobot SO-101 and XLeRobot were renamed Armo and ArmoGo (Oct 2026).
  async redirects() {
    return [
      { source: "/products/lerobot", destination: "/products/armo", permanent: true },
      { source: "/products/xlerobot", destination: "/products/armogo", permanent: true },
    ];
  },
};

export default nextConfig;
