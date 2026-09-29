import type { CaseStudy } from "@/lib/work";

/** One project as a ruled entry: what it is on the left, the before/after on the right. */
export default function CaseNote({ study }: { study: CaseStudy }) {
  return (
    <article id={study.slug} className="grid scroll-mt-24 gap-6 border-b border-hairline py-8 md:grid-cols-12 md:gap-8 md:py-10">
      <div className="md:col-span-5">
        <p className="font-mono text-[13px] text-graphite">{study.sector}</p>
        <h3 className="mt-2 text-2xl font-medium leading-snug tracking-[-0.015em]">{study.title}</h3>
        <p className="mt-3 text-[17px] leading-relaxed text-graphite">{study.summary}</p>
        <p className="mt-4 font-mono text-[13px] text-graphite">{study.tags.join(" · ")}</p>
      </div>
      <dl className="grid gap-5 text-[15px] leading-relaxed sm:grid-cols-2 md:col-span-7 md:gap-8">
        <div className="border-t border-hairline pt-3">
          <dt className="font-medium">What was wrong</dt>
          <dd className="mt-1.5 text-graphite">{study.challenge}</dd>
        </div>
        <div className="border-t border-hairline pt-3">
          <dt className="font-medium">What we built</dt>
          <dd className="mt-1.5 text-graphite">{study.solution}</dd>
        </div>
      </dl>
    </article>
  );
}
