import FadeIn from "./FadeIn";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="py-32 text-center">
      <FadeIn>
        <h2 className="text-4xl font-bold mb-6">Let’s Build Something Great</h2>
        <p className="text-softwhite/70 mb-8">
          Contact us for project estimates, consultation, or partnerships.
        </p>

        <Link
          href="/contact"
          className="px-8 py-4 bg-ice text-black rounded-xl font-semibold hover:opacity-80 transition shadow-glow"
        >
          Contact Us
        </Link>
      </FadeIn>
    </section>
  );
}
