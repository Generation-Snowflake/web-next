import Container from "@/components/ui/Container";
import HeroActions from "./HeroActions";
import HeroRobotStage from "./HeroRobotStage";

const CAPTION = "It follows your cursor.";

/**
 * Layout contract with components/hero/HeroRobot (it fills this section):
 *  - lg and up: the robot stands in the RIGHT half, copy sits in the left half.
 *  - below lg: the robot stands in the TOP half of the first screen, copy below it.
 */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="night relative flex flex-col overflow-hidden bg-night text-night-text lg:min-h-[85svh]"
    >
      <div className="absolute inset-x-0 top-0 h-[100svh] lg:bottom-0 lg:h-auto">
        <HeroRobotStage />
      </div>

      <Container className="relative flex flex-1 flex-col pointer-events-none">
        {/* Keeps the robot area clear on small screens. */}
        <div aria-hidden className="h-[50svh] min-h-[320px] lg:hidden" />
        <p className="caption mb-8 !text-night-muted lg:hidden">{CAPTION}</p>

        <div className="flex flex-1 items-center pb-14 lg:pb-24 lg:pt-32">
          <div className="pointer-events-auto max-w-[36rem] lg:w-1/2 lg:max-w-none lg:pr-8 xl:pr-12">
            <p className="font-mono text-[13px] leading-5 text-night-muted">
              Software house + robot supplier
            </p>
            <h1
              id="hero-title"
              className="mt-5 text-[2.375rem] font-medium leading-[1.06] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
            >
              We write the software, and we sell the robots it runs on.
            </h1>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-night-text/85">
              For companies we build computer vision, ROS 2 robot software, IoT systems and the web and
              mobile apps around them. For classrooms we sell Makerzoid robot kits, and for AI labs the
              LeRobot SO-101 arms and the XLeRobot.
            </p>
            <div className="mt-9">
              <HeroActions />
            </div>
          </div>
        </div>
      </Container>

      <p className="caption pointer-events-none absolute bottom-8 right-[max(2rem,calc((100%-80rem)/2+2rem))] hidden !text-night-muted lg:block">{CAPTION}</p>
    </section>
  );
}
