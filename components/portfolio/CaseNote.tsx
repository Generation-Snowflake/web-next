import type { CaseStudy } from "@/lib/work";

/** One kind of work as a ruled entry. */
export default function CaseNote({ study }: { study: CaseStudy }) {
  return (
    <article id={study.slug} className="grid scroll-mt-24 gap-2 border-b border-hairline py-6 md:grid-cols-12 md:gap-8">
      <p className="font-mono text-[13px] text-graphite md:col-span-2 md:pt-1">{study.area}</p>
      <h3 className="text-xl font-medium leading-snug tracking-[-0.015em] md:col-span-4">{study.title}</h3>
      <div className="md:col-span-6">
        <p className="text-[17px] leading-relaxed text-graphite">{study.summary}</p>
        <p className="mt-2 font-mono text-[13px] text-graphite">{study.tags.join(" · ")}</p>
      </div>
    </article>
  );
}
