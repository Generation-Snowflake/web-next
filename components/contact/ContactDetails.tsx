import type { Lang } from "@/lib/i18n";
import { getSite } from "@/lib/site";

const copy = {
  en: { title: "Or reach us directly", phone: "Phone", email: "Email", office: "Office", hours: "Hours", maps: "Open in Google Maps", newTab: " (opens in a new tab)" },
  th: { title: "หรือติดต่อเราโดยตรง", phone: "โทรศัพท์", email: "อีเมล", office: "สำนักงาน", hours: "เวลาทำการ", maps: "เปิดใน Google Maps", newTab: " (เปิดในแท็บใหม่)" },
} satisfies Record<Lang, Record<string, string>>;

/** Phones, email, office, hours as a definition list in a card. */
export default function ContactDetails({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const site = getSite(lang);
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-heading">{c.title}</h2>
      <dl className="card mt-5 divide-y divide-hairline px-5 text-[15px]">
        <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-4">
          <dt className="caption pt-0.5">{c.phone}</dt>
          <dd className="space-y-1">
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className="block font-medium transition-colors duration-200 hover:text-cyan-700">
                {p.display}
              </a>
            ))}
          </dd>
        </div>
        <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-4">
          <dt className="caption pt-0.5">{c.email}</dt>
          <dd>
            <a href={`mailto:${site.email}`} className="break-all font-medium transition-colors duration-200 hover:text-cyan-700">
              {site.email}
            </a>
          </dd>
        </div>
        <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-4">
          <dt className="caption pt-0.5">{c.office}</dt>
          <dd>
            <address className="not-italic leading-relaxed">
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
              {c.maps}
              <span className="sr-only">{c.newTab}</span>
            </a>
          </dd>
        </div>
        <div className="grid grid-cols-[5.5rem_1fr] gap-4 py-4">
          <dt className="caption pt-0.5">{c.hours}</dt>
          <dd>{site.hours}</dd>
        </div>
        {site.social.map((s) => (
          <div key={s.href} className="grid grid-cols-[5.5rem_1fr] gap-4 py-4">
            <dt className="caption pt-0.5">{s.label}</dt>
            <dd>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="link break-all">
                {s.href.replace(/^https?:\/\/(www\.)?/, "")}
                <span className="sr-only">{c.newTab}</span>
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
