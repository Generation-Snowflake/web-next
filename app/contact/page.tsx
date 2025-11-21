import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="px-6 py-28 max-w-6xl mx-auto">
      {/* Title */}
      <FadeIn>
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
      </FadeIn>

      {/* Description */}
      <FadeIn delay={0.1}>
        <p className="text-softwhite/70 max-w-3xl mb-16">
          Get in touch with GSF Robotics & AI for project inquiries, quotes, or
          collaborations. We are ready to build the future with you.
        </p>
      </FadeIn>

      {/* Contact Info Card */}
      <FadeIn delay={0.15}>
        <div className="p-10 bg-white/5 border border-ice/20 shadow-glow rounded-2xl backdrop-blur-md">
          {/* Address */}
          <h3 className="text-2xl font-semibold text-ice mb-4">Address</h3>
          <p className="text-softwhite/80 mb-6">
            52/9 หมู่บ้านสุชาวดี หมู่ที่ 3 ซอยสุขาประชาสรรค์ 3 <br />
            ถนนติวานนท์ ตำบลบางพูด <br />
            อำเภอปากเกร็ด จ.นนทบุรี 11120
          </p>

          {/* Phone */}
          <h3 className="text-2xl font-semibold text-ice mb-4">Phone</h3>
          <p className="text-softwhite/80 mb-6">
            092-270-2597 <br />
            086-505-3533
          </p>

          {/* Email */}
          <h3 className="text-2xl font-semibold text-ice mb-4">Email</h3>
          <p className="text-softwhite/80 mb-6">admin@gsf-company.com</p>

          {/* Button */}
          <div className="mt-10 text-center">
            <Link
              href="mailto:admin@gsf-company.com"
              className="px-10 py-4 bg-ice text-black font-semibold rounded-xl hover:opacity-80 transition shadow-glow"
            >
              Send Email
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.25}>
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4 text-ice">
            Ready to start your project?
          </h2>
          <p className="text-softwhite/70 mb-8">
            Let’s build something intelligent together.
          </p>

          <Link
            href="mailto:admin@gsf-company.com"
            className="px-8 py-3 bg-ice text-black font-semibold rounded-xl hover:opacity-80 transition shadow-glow"
          >
            Contact Now
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}
