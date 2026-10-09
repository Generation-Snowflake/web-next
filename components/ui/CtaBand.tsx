import { Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import Container from "./Container";
import ButtonLink from "./Button";
import CircuitLines from "./CircuitLines";
import Reveal from "./Reveal";
import type { Lang } from "@/lib/i18n";
import { getSite } from "@/lib/site";

const iconCls = "h-5 w-5 text-cyan-500";

const ui = {
  en: {
    title: "Talk to the people who build it",
    description: "Call, email, or send the form. Tell us what you want to build or buy, and roughly when.",
    primary: "Send us a message",
    phone: "Phone",
    email: "Email",
    office: "Office",
    hours: "Hours",
    maps: "Open in Google Maps",
  },
  th: {
    title: "คุยกับทีมที่ลงมือทำงานจริง",
    description: "โทร อีเมล หรือส่งแบบฟอร์มมาก็ได้ บอกเราว่าอยากสร้างหรืออยากซื้ออะไร และต้องการใช้ประมาณเมื่อไร",
    primary: "ส่งข้อความถึงเรา",
    phone: "โทรศัพท์",
    email: "อีเมล",
    office: "สำนักงาน",
    hours: "เวลาทำการ",
    maps: "เปิดใน Google Maps",
  },
} satisfies Record<Lang, Record<string, string>>;

/**
 * Closing contact block on a Primary Dark / Gradient C panel with circuit
 * traces. Give each page its own title ("Ask about Armo price and lead
 * time") instead of one generic slogan.
 */
export default function CtaBand({
  lang = "en",
  title,
  description,
  primary,
}: {
  lang?: Lang;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  /** @deprecated no longer shown. */
  secondary?: { label: string; href: string };
}) {
  const t = ui[lang];
  const site = getSite(lang);
  title ??= t.title;
  description ??= t.description;
  primary ??= { label: t.primary, href: "/contact" };
  return (
    <section className="bg-paper py-16 md:py-20">
      <Container>
        <Reveal className="night relative isolate overflow-hidden rounded-xl bg-ink text-white shadow-card-hover">
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-c-deep" />
          <div aria-hidden className="dot-grid-night absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_right,transparent,black)]" />
          <CircuitLines tone="night" className="absolute inset-x-0 bottom-0 -z-10 h-48 w-full opacity-70 md:h-64" />
          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-12 md:gap-12 lg:p-14">
            <div className="md:col-span-6">
              <h2 className="text-balance text-[2rem] font-semibold leading-[1.25] tracking-heading sm:text-h1">{title}</h2>
              <span aria-hidden className="accent-bar mt-5 !bg-gradient-a" />
              <p className="mt-5 max-w-prose text-[17px] leading-[1.75] text-night-muted">{description}</p>
              <div className="mt-8">
                <ButtonLink href={primary.href} size="lg" arrow tone="night">
                  {primary.label}
                </ButtonLink>
              </div>
            </div>
            <dl className="grid content-start gap-3 text-[15px] sm:grid-cols-2 md:col-span-6">
              <div className="rounded-lg border border-white/10 bg-ink/70 p-4 backdrop-blur-sm">
                <dt className="flex items-center gap-2 text-[13px] font-medium text-night-muted">
                  <Phone aria-hidden className={iconCls} />
                  {t.phone}
                </dt>
                <dd className="mt-2 space-y-0.5">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="block font-medium transition-colors duration-200 hover:text-cyan-300">
                      {p.display}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-ink/70 p-4 backdrop-blur-sm">
                <dt className="flex items-center gap-2 text-[13px] font-medium text-night-muted">
                  <EnvelopeSimple aria-hidden className={iconCls} />
                  {t.email}
                </dt>
                <dd className="mt-2">
                  <a href={`mailto:${site.email}`} className="break-all font-medium transition-colors duration-200 hover:text-cyan-300">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-ink/70 p-4 backdrop-blur-sm">
                <dt className="flex items-center gap-2 text-[13px] font-medium text-night-muted">
                  <MapPin aria-hidden className={iconCls} />
                  {t.office}
                </dt>
                <dd className="mt-2 leading-relaxed">
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-block text-[14px]">
                    {t.maps}
                  </a>
                </dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-ink/70 p-4 backdrop-blur-sm">
                <dt className="flex items-center gap-2 text-[13px] font-medium text-night-muted">
                  <Clock aria-hidden className={iconCls} />
                  {t.hours}
                </dt>
                <dd className="mt-2">{site.hours}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
