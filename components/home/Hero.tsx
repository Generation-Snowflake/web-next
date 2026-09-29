import Container from "@/components/ui/Container";
import HeroActions from "./HeroActions";
import HeroRobotStage from "./HeroRobotStage";

const CAPTION = "It follows your cursor.";

/**
 * Layout contract with the site-wide robot companion (components/robot-companion),
 * which stands in HeroRobotStage's empty slot while the hero is on screen:
 *  - lg and up: the robot stands in the RIGHT half, copy sits in the left half.
 *  - below lg: the robot stands in the TOP half of the first screen, copy below it.
 */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex flex-col overflow-hidden bg-paper text-ink lg:min-h-[88svh]"
    >
      <div className="absolute inset-x-0 top-0 h-[100svh] lg:bottom-0 lg:h-auto">
        <HeroRobotStage />
      </div>

      <Container className="relative flex flex-1 flex-col pointer-events-none">
        {/* Keeps the robot area clear on small screens. */}
        <div aria-hidden className="h-[50svh] min-h-[320px] lg:hidden" />
        <p className="caption mb-8 lg:hidden">{CAPTION}</p>

        <div className="flex flex-1 items-center pb-16 lg:pb-28 lg:pt-32">
          <div className="pointer-events-auto max-w-[36rem] lg:w-1/2 lg:max-w-none lg:pr-8 xl:pr-12">
            <p className="chip gap-2 py-1 pl-2.5 pr-3 shadow-xs">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
              Software house + robot supplier
            </p>
            <h1
              id="hero-title"
              className="mt-6 text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-display sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]"
            >
              We write the software, and we sell the robots it runs on.
            </h1>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-graphite">
              For companies we build computer vision, ROS 2 robot software, IoT systems and the web and
              mobile apps around them. For classrooms we sell Makerzoid robot kits, and for AI labs the
              LeRobot SO-101 arms and the XLeRobot.
            </p>
            <div className="mt-10">
              <HeroActions />
            </div>
          </div>
        </div>
      </Container>

      <p className="caption pointer-events-none absolute bottom-8 right-[max(2rem,calc((100%-80rem)/2+2rem))] hidden lg:block">{CAPTION}</p>
    </section>
  );
}
