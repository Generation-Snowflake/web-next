import FadeIn from "./FadeIn";

export default function ContactSection() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20 text-center">
      <FadeIn>
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-ice/70">
            Start with the system
          </p>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Have a complex system to build?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-xl">
            Tell us what you want to automate, connect, detect, or launch.
          </p>

          <a
            href="mailto:contact@gsf-company.com?subject=Project%20Inquiry%20for%20GSF%20Robotics%20%26%20AI"
            className="mt-9 inline-flex rounded-full bg-ice px-8 py-4 text-sm font-semibold text-darkbg shadow-glow transition duration-300 hover:-translate-y-0.5 hover:bg-ice-light"
          >
            Start the Conversation
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
