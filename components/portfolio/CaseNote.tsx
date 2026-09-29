import type { CaseStudy } from "@/lib/work";

/** One kind of work as a card: area tag, title, summary, tech tags. */
export default function CaseNote({ study, className = "" }: { study: CaseStudy; className?: string }) {
  return (
    <article id={study.slug} className={`card flex scroll-mt-24 flex-col p-6 sm:p-7 ${className}`}>
      <p className="chip self-start">{study.area}</p>
      <h3 className="mt-4 text-xl font-semibold leading-snug tracking-heading">{study.title}</h3>
      <p className="mt-2 text-[16px] leading-relaxed text-graphite">{study.summary}</p>
      <p className="mt-auto pt-5 text-[13px] text-graphite">{study.tags.join(" · ")}</p>
    </article>
  );
}
