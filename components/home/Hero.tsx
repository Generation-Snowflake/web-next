import { Cursor } from "@phosphor-icons/react/dist/ssr";
import ConstructionCircle from "@/components/ui/ConstructionCircle";
import Container from "@/components/ui/Container";
import HeroActions from "./HeroActions";
import HeroRobotStage from "./HeroRobotStage";
import type { Lang } from "@/lib/i18n";

const copy = {
  en: {
    caption: "It follows your cursor.",
    label: "Software engineering · Robotics solutions",
    title: "We write the software,",
    titleAccent: "and we sell the robots it runs on.",
    lead: "For companies, we build computer vision, ROS 2 robot software, IoT systems, and the web and mobile apps that tie them together. For classrooms, we supply Makerzoid robot kits; for AI labs, our Armo robot arms and the ArmoGo dual-arm robot.",
  },
  th: {
    caption: "หุ่นยนต์มองตามเมาส์ของคุณ",
    label: "วิศวกรรมซอฟต์แวร์ · โซลูชันหุ่นยนต์",
    title: "ซอฟต์แวร์|ที่เราเขียน",
    titleAccent: "ทำงานบน|หุ่นยนต์ที่เราขาย",
    lead: "เรารับพัฒนาระบบ Computer Vision ซอฟต์แวร์หุ่นยนต์บน ROS 2 ระบบ IoT รวมถึงเว็บและแอปมือถือที่เชื่อมระบบเหล่านี้เข้าด้วยกันให้องค์กร และขายชุดหุ่นยนต์ Makerzoid สำหรับห้องเรียน รวมถึงแขนกล Armo และหุ่นยนต์แขนคู่ ArmoGo สำหรับห้องแล็บ AI",
  },
} satisfies Record<Lang, Record<string, string>>;

/** Thai has no spaces between words, so a headline can break in the middle
 *  of a phrase. "|" in the copy marks where a line may break; each phrase
 *  between the marks stays whole. */
function Phrases({ text }: { text: string }) {
  const parts = text.split("|");
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part) => (
        <span key={part} className="inline-block">
          {part}
        </span>
      ))}
    </>
  );
}

/** The CI cover motif: a cursor pointing at a Gradient C tag. */
function CursorTag({ caption, className = "" }: { caption: string; className?: string }) {
  return (
    <p className={`rise pointer-events-none flex items-start gap-1 ${className}`} style={{ "--rise": 12 } as React.CSSProperties}>
      <Cursor aria-hidden weight="fill" className="-mt-4 h-7 w-7 text-ink" />
      <span className="rounded-md bg-gradient-c-deep px-3.5 py-1.5 text-[13px] font-medium text-white shadow-card">{caption}</span>
    </p>
  );
}

/**
 * Layout contract with the site-wide robot companion (components/robot-companion),
 * which stands in HeroRobotStage's empty slot while the hero is on screen:
 *  - lg and up: the robot stands in the RIGHT half, copy sits in the left half.
 *  - below lg: the robot stands in the TOP half of the first screen, copy below it.
 */
export default function Hero({ lang }: { lang: Lang }) {
  const c = copy[lang];
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
        <CursorTag caption={c.caption} className="mb-8 lg:hidden" />

        <div className="flex flex-1 items-center pb-16 lg:pb-28 lg:pt-32">
          <div className="pointer-events-auto max-w-[36rem] lg:w-1/2 lg:max-w-none lg:pr-8 xl:pr-12">
            <p className="label rise" style={{ "--rise": 0 } as React.CSSProperties}>{c.label}</p>
            <h1
              id="hero-title"
              style={{ "--rise": 1 } as React.CSSProperties}
              className="rise mt-6 text-balance text-[2.5rem] font-bold leading-[1.12] tracking-display sm:text-5xl sm:leading-[1.12] lg:text-display xl:text-[4rem] xl:leading-[1.1]"
            >
              <Phrases text={c.title} />{" "}
              {/* Thai reads better with the accent part on its own line. */}
              <span className={`text-cyan-700 ${lang === "th" ? "block" : ""}`}>
                <Phrases text={c.titleAccent} />
              </span>
            </h1>
            <span aria-hidden className="accent-bar rise mt-7" style={{ "--rise": 3 } as React.CSSProperties} />
            <p className="rise mt-7 max-w-[34rem] text-[17px] leading-[1.75] text-ink-700" style={{ "--rise": 4 } as React.CSSProperties}>
              {c.lead}
            </p>
            <div className="rise mt-10" style={{ "--rise": 5 } as React.CSSProperties}>
              <HeroActions lang={lang} />
            </div>
          </div>
        </div>
      </Container>

      <CursorTag caption={c.caption} className="absolute bottom-10 right-[max(2rem,calc((100%-78rem)/2+2rem))] hidden lg:flex" />
    </section>
  );
}
