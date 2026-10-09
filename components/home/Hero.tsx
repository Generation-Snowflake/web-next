import { Cursor } from "@phosphor-icons/react/dist/ssr";
import ConstructionCircle from "@/components/ui/ConstructionCircle";
import Container from "@/components/ui/Container";
import HeroActions from "./HeroActions";
import HeroRobotStage from "./HeroRobotStage";

const CAPTION = "It follows your cursor.";

/** The CI cover motif: a cursor pointing at a Gradient C tag. */
function CursorTag({ className = "" }: { className?: string }) {
  return (
    <p className={`pointer-events-none flex items-start gap-1 ${className}`}>
      <Cursor aria-hidden weight="fill" className="-mt-4 h-7 w-7 text-ink" />
      <span className="rounded-md bg-gradient-c-deep px-3.5 py-1.5 text-[13px] font-medium text-white shadow-card">{CAPTION}</span>
    </p>
  );
}

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
      className="relative isolate flex flex-col overflow-hidden bg-paper text-ink lg:min-h-[88svh]"
    >
      <div
        aria-hidden
        className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_45%,black_20%,transparent_75%)]"
      />
      {/* Construction circle behind the robot (CI cover graphic). */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[50svh] min-h-[320px] lg:inset-y-0 lg:left-1/2 lg:h-auto">
        <ConstructionCircle className="absolute left-1/2 top-[54%] w-[min(88vw,26rem)] -translate-x-1/2 -translate-y-1/2 lg:top-1/2 lg:w-[min(40vw,34rem)]" />
      </div>

      <div className="absolute inset-x-0 top-0 h-[100svh] lg:bottom-0 lg:h-auto">
        <HeroRobotStage />
      </div>

      <Container className="relative flex flex-1 flex-col pointer-events-none">
        {/* Keeps the robot area clear on small screens. */}
        <div aria-hidden className="h-[50svh] min-h-[320px] lg:hidden" />
        <CursorTag className="mb-8 lg:hidden" />

        <div className="flex flex-1 items-center pb-16 lg:pb-28 lg:pt-32">
          <div className="pointer-events-auto max-w-[36rem] lg:w-1/2 lg:max-w-none lg:pr-8 xl:pr-12">
            <p className="label">Software engineering · Robotics solution</p>
            <h1
              id="hero-title"
              className="mt-6 text-balance text-[2.5rem] font-bold leading-[1.12] tracking-display sm:text-5xl sm:leading-[1.12] lg:text-display xl:text-[4rem] xl:leading-[1.1]"
            >
              We write the software,{" "}
              <span className="text-cyan-700">and we sell the robots it runs on.</span>
            </h1>
            <span aria-hidden className="accent-bar mt-7" />
            <p className="mt-7 max-w-[34rem] text-[17px] leading-[1.75] text-ink-700">
              For companies we build computer vision, ROS 2 robot software, IoT systems and the web and
              mobile apps around them. For classrooms we sell Makerzoid robot kits, and for AI labs our
              Armo robot arms and the ArmoGo dual-arm robot.
            </p>
            <div className="mt-10">
              <HeroActions />
            </div>
          </div>
        </div>
      </Container>

      <CursorTag className="absolute bottom-10 right-[max(2rem,calc((100%-78rem)/2+2rem))] hidden lg:flex" />
    </section>
  );
}
