import { site } from "@/lib/site";

/** Phones, email, office, hours as a ruled definition list. */
export default function ContactDetails() {
  return (
    <div>
      <h2 className="text-xl font-medium tracking-[-0.015em]">Or reach us directly</h2>
      <dl className="mt-5 divide-y divide-hairline border-y border-ink text-[15px]">
        <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
          <dt className="caption pt-0.5">Phone</dt>
          <dd className="space-y-1">
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className="block font-mono hover:text-teal-ink">
                {p.display}
              </a>
            ))}
          </dd>
        </div>
        <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
          <dt className="caption pt-0.5">Email</dt>
          <dd>
            <a href={`mailto:${site.email}`} className="break-all hover:text-teal-ink">
              {site.email}
            </a>
          </dd>
        </div>
        <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
          <dt className="caption pt-0.5">Office</dt>
          <dd>
            <address lang="th" className="not-italic leading-relaxed">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a
              href={site.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-1 inline-block text-[14px]"
            >
              Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </dd>
        </div>
        <div className="grid grid-cols-[6rem_1fr] gap-4 py-4">
          <dt className="caption pt-0.5">Hours</dt>
          <dd>{site.hours}</dd>
        </div>
        {site.social.map((s) => (
          <div key={s.href} className="grid grid-cols-[6rem_1fr] gap-4 py-4">
            <dt className="caption pt-0.5">{s.label}</dt>
            <dd>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link break-all">
                {s.href.replace(/^https?:\/\/(www\.)?/, "")}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
