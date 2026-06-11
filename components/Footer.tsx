import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ice/20 py-12 bg-darkbg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + Text */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo-tech.png"
            alt="GSF Robotics & AI"
            width={48}
            height={48}
            className="drop-shadow-glow"
          />
          <div>
            <h3 className="text-xl font-semibold">GSF Robotics & AI</h3>
            <p className="text-softwhite/60 text-sm">
              We build AI, robotics, and IoT systems that run in production.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-6 text-softwhite/70">
          <div className="flex flex-col gap-2">
            <Link href="/services" className="transition hover:text-ice focus-visible:text-ice focus-visible:outline-none">
              Services
            </Link>
            <Link href="/portfolio" className="transition hover:text-ice focus-visible:text-ice focus-visible:outline-none">
              Portfolio
            </Link>
            <Link href="/workflow" className="transition hover:text-ice focus-visible:text-ice focus-visible:outline-none">
              Workflow
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/about" className="transition hover:text-ice focus-visible:text-ice focus-visible:outline-none">
              About
            </Link>
            <Link href="/contact" className="transition hover:text-ice focus-visible:text-ice focus-visible:outline-none">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-softwhite/50 text-sm">
        © {new Date().getFullYear()} GSF Robotics & AI — All Rights Reserved.
      </div>
    </footer>
  );
}
