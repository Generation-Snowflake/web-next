"use client";

import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CaretDown, WarningCircle } from "@phosphor-icons/react";
import { useLang } from "@/components/i18n/LangProvider";
import type { Lang } from "@/lib/i18n";
import { getSite, mailto } from "@/lib/site";
import { getServices } from "@/lib/services";
import { getAllModels, getProducts } from "@/lib/products";

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

type Interest = "project" | "product" | "classes" | "partnership" | "other";
type Budget = "lt250k" | "250k-750k" | "750k-2m" | "gt2m";
type Timeline = "asap" | "1m" | "1-3m" | "3-6m" | "exploring";

const BUDGETS: Budget[] = ["lt250k", "250k-750k", "750k-2m", "gt2m"];
const TIMELINES: Timeline[] = ["asap", "1m", "1-3m", "3-6m", "exploring"];

const copy = {
  en: {
    interests: {
      project: { label: "A custom project", hint: "Software, AI or robotics built for you" },
      product: { label: "Buying a product", hint: "Robots and kits: quotes, school and bulk orders" },
      classes: { label: "Robotics classes", hint: "Courses for kids, school clubs, colleges and teachers" },
      partnership: { label: "Partnership", hint: "Resellers, research and joint projects" },
      other: { label: "Something else", hint: "Anything you want to ask" },
    } satisfies Record<Interest, { label: string; hint: string }>,
    budgets: {
      lt250k: "Under ฿250,000",
      "250k-750k": "฿250,000 – ฿750,000",
      "750k-2m": "฿750,000 – ฿2,000,000",
      gt2m: "Over ฿2,000,000",
    } satisfies Record<Budget, string>,
    timelines: {
      asap: "As soon as possible",
      "1m": "Within 1 month",
      "1-3m": "1–3 months",
      "3-6m": "3–6 months",
      exploring: "Just exploring",
    } satisfies Record<Timeline, string>,
    errors: {
      name: "Please enter your name.",
      emailMissing: "Please enter your email address.",
      emailBad: "That email address doesn’t look right. Please check it.",
      phone: "Use digits, spaces, + or - only (e.g. 081 234 5678).",
      interest: "Please choose what you’re interested in.",
      quantity: "Enter a whole number, 1 or more.",
      messageShort: "Please add a little more detail (at least 15 characters).",
      messageMissing: "Please tell us a little about what you need.",
      summary: (n: number) => (n === 1 ? "Please correct 1 field before sending." : `Please correct ${n} fields before sending.`),
    },
    mail: {
      modelNotDecided: "(model not decided)",
      enquiry: "Enquiry",
      website: "Website enquiry",
      product: "Product enquiry",
      productFallback: "Robots & kits",
      project: "Project enquiry",
      projectFallback: "Custom project",
      classes: "Class enquiry",
      partnership: "Partnership enquiry",
      type: "Enquiry type",
      productLabel: "Product",
      notSure: "Not sure yet, please advise",
      quantity: "Quantity",
      neededBy: "Needed by",
      service: "Service",
      budget: "Budget range",
      timeline: "Timeline",
      name: "Name",
      email: "Email",
      company: "Company",
      phone: "Phone",
      hello: "Hello GSF team,",
      sentFrom: (host: string) => `Sent from the contact form on ${host}`,
    },
    optional: "(optional)",
    success: {
      title: "Now press Send in your email app",
      body1: "Your email app should have opened with the message addressed to",
      body2: "Check it and press Send.",
      fallback: "Nothing opened? Copy the message below and send it from any email account, or call us on",
      openAgain: "Open email app again",
      copyMessage: "Copy message",
      messageCopied: "Message copied",
      copyAddress: "Copy email address",
      addressCopied: "Address copied",
      liveMessage: "Message copied to clipboard.",
      liveAddress: "Email address copied to clipboard.",
      yourMessage: "Your message",
      to: "To:",
      subject: "Subject:",
      edit: "Edit your message",
    },
    form: {
      title: "Send us a message",
      required: "* required",
      name: "Your name",
      email: "Email",
      company: "Company or school",
      phone: "Phone",
      about: "What is it about?",
      whichProduct: "Which product?",
      notSureProduct: "Not sure yet, please advise",
      helpChoose: "help me choose a model",
      quantity: "Quantity",
      quantityPlaceholder: "e.g. 10",
      whenNeed: "When do you need it?",
      select: "Select…",
      whichService: "Which service fits best?",
      notSureService: "Not sure yet, help me scope it",
      budget: "Budget range",
      notSure: "Not sure yet",
      whenStart: "When would you like to start?",
      messageProduct: "What will you use it for?",
      messageProject: "Tell us about the project",
      message: "Your message",
      placeholderProduct: "e.g. a robotics club for 30 students, a research lab, where to deliver",
      placeholder: "What you want to build, what you have now, and any deadline",
      note: "Sending opens your own email app with this message ready to go. Nothing is stored on this website.",
      send: "Send via email",
    },
  },
  th: {
    interests: {
      project: { label: "งานพัฒนาตามความต้องการ", hint: "ซอฟต์แวร์ AI หรือระบบหุ่นยนต์ที่สร้างเฉพาะให้คุณ" },
      product: { label: "สั่งซื้อสินค้า", hint: "หุ่นยนต์และชุดหุ่นยนต์ ขอใบเสนอราคา สั่งซื้อสำหรับโรงเรียนหรือจำนวนมาก" },
      classes: { label: "คอร์สเรียนหุ่นยนต์", hint: "คอร์สสำหรับเด็ก ชมรมในโรงเรียน วิทยาลัย และครู" },
      partnership: { label: "ความร่วมมือ", hint: "ตัวแทนจำหน่าย งานวิจัย และโปรเจกต์ร่วม" },
      other: { label: "เรื่องอื่นๆ", hint: "สอบถามได้ทุกเรื่อง" },
    } satisfies Record<Interest, { label: string; hint: string }>,
    budgets: {
      lt250k: "ต่ำกว่า ฿250,000",
      "250k-750k": "฿250,000 – ฿750,000",
      "750k-2m": "฿750,000 – ฿2,000,000",
      gt2m: "มากกว่า ฿2,000,000",
    } satisfies Record<Budget, string>,
    timelines: {
      asap: "เร็วที่สุดเท่าที่ทำได้",
      "1m": "ภายใน 1 เดือน",
      "1-3m": "1–3 เดือน",
      "3-6m": "3–6 เดือน",
      exploring: "ยังอยู่ระหว่างศึกษาข้อมูล",
    } satisfies Record<Timeline, string>,
    errors: {
      name: "กรุณากรอกชื่อ",
      emailMissing: "กรุณากรอกอีเมล",
      emailBad: "รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง",
      phone: "ใช้ได้เฉพาะตัวเลข เว้นวรรค + หรือ - (เช่น 081 234 5678)",
      interest: "กรุณาเลือกเรื่องที่ต้องการติดต่อ",
      quantity: "กรอกเป็นจำนวนเต็มตั้งแต่ 1 ขึ้นไป",
      messageShort: "กรุณาเพิ่มรายละเอียดอีกเล็กน้อย (อย่างน้อย 15 ตัวอักษร)",
      messageMissing: "กรุณาเล่าให้เราทราบสั้นๆ ว่าต้องการอะไร",
      summary: (n: number) => `กรุณาแก้ไขข้อมูล ${n} ช่องก่อนส่ง`,
    },
    mail: {
      modelNotDecided: "(ยังไม่ได้เลือกรุ่น)",
      enquiry: "สอบถามข้อมูล",
      website: "ติดต่อจากเว็บไซต์",
      product: "สอบถามสินค้า",
      productFallback: "หุ่นยนต์และชุดหุ่นยนต์",
      project: "สอบถามงานพัฒนา",
      projectFallback: "งานพัฒนาตามความต้องการ",
      classes: "สอบถามคอร์สเรียน",
      partnership: "สอบถามความร่วมมือ",
      type: "เรื่องที่ติดต่อ",
      productLabel: "สินค้า",
      notSure: "ยังไม่แน่ใจ ขอคำแนะนำ",
      quantity: "จำนวน",
      neededBy: "ต้องการใช้",
      service: "บริการ",
      budget: "งบประมาณ",
      timeline: "ระยะเวลา",
      name: "ชื่อ",
      email: "อีเมล",
      company: "บริษัท/สถานศึกษา",
      phone: "โทรศัพท์",
      hello: "สวัสดีทีม GSF",
      sentFrom: (host: string) => `ส่งจากแบบฟอร์มติดต่อบน ${host}`,
    },
    optional: "(ไม่บังคับ)",
    success: {
      title: "กดส่งในแอปอีเมลของคุณได้เลย",
      body1: "แอปอีเมลของคุณน่าจะเปิดขึ้นพร้อมข้อความที่ส่งถึง",
      body2: "ตรวจสอบข้อความแล้วกดส่ง",
      fallback: "ถ้าไม่มีอะไรเปิดขึ้นมา คัดลอกข้อความด้านล่างไปส่งจากอีเมลใดก็ได้ หรือโทรหาเราที่",
      openAgain: "เปิดแอปอีเมลอีกครั้ง",
      copyMessage: "คัดลอกข้อความ",
      messageCopied: "คัดลอกข้อความแล้ว",
      copyAddress: "คัดลอกที่อยู่อีเมล",
      addressCopied: "คัดลอกที่อยู่แล้ว",
      liveMessage: "คัดลอกข้อความไปยังคลิปบอร์ดแล้ว",
      liveAddress: "คัดลอกที่อยู่อีเมลไปยังคลิปบอร์ดแล้ว",
      yourMessage: "ข้อความของคุณ",
      to: "ถึง:",
      subject: "เรื่อง:",
      edit: "แก้ไขข้อความ",
    },
    form: {
      title: "ส่งข้อความถึงเรา",
      required: "* จำเป็นต้องกรอก",
      name: "ชื่อของคุณ",
      email: "อีเมล",
      company: "บริษัทหรือสถานศึกษา",
      phone: "โทรศัพท์",
      about: "ต้องการติดต่อเรื่องอะไร",
      whichProduct: "สนใจสินค้าตัวไหน",
      notSureProduct: "ยังไม่แน่ใจ ขอคำแนะนำ",
      helpChoose: "ช่วยแนะนำรุ่นให้หน่อย",
      quantity: "จำนวน",
      quantityPlaceholder: "เช่น 10",
      whenNeed: "ต้องการใช้เมื่อไร",
      select: "เลือก…",
      whichService: "บริการไหนตรงกับงานของคุณที่สุด",
      notSureService: "ยังไม่แน่ใจ ช่วยกำหนดขอบเขตงานให้หน่อย",
      budget: "งบประมาณ",
      notSure: "ยังไม่แน่ใจ",
      whenStart: "อยากเริ่มงานเมื่อไร",
      messageProduct: "จะนำไปใช้ทำอะไร",
      messageProject: "เล่ารายละเอียดโปรเจกต์",
      message: "ข้อความของคุณ",
      placeholderProduct: "เช่น ชมรมหุ่นยนต์สำหรับนักเรียน 30 คน ห้องแล็บวิจัย หรือสถานที่จัดส่ง",
      placeholder: "อยากสร้างอะไร ตอนนี้มีอะไรอยู่แล้ว และมีกำหนดเวลาไหม",
      note: "เมื่อกดส่ง แอปอีเมลของคุณจะเปิดขึ้นพร้อมข้อความนี้ เว็บไซต์นี้ไม่ได้เก็บข้อมูลใดๆ ไว้",
      send: "ส่งทางอีเมล",
    },
  },
};

type Copy = (typeof copy)["en"];

const INTEREST_KEYS: Interest[] = ["project", "product", "classes", "partnership", "other"];

/** Value used for "this product, but I haven't picked a model yet". */
const productLevel = (slug: string) => `product:${slug}`;

function productLabel(value: string, lang: Lang) {
  if (!value) return "";
  if (value.startsWith("product:")) {
    const p = getProducts(lang).find((x) => x.slug === value.slice("product:".length));
    return p ? `${p.name} ${copy[lang].mail.modelNotDecided}` : "";
  }
  const m = getAllModels(lang).find((x) => x.id === value);
  return m ? m.name : "";
}

function serviceLabel(slug: string, lang: Lang) {
  return getServices(lang).find((s) => s.slug === slug)?.title ?? "";
}

/* ------------------------------------------------------------------ */
/* Values, prefill and validation                                      */
/* ------------------------------------------------------------------ */

type Values = {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: Interest | "";
  product: string;
  quantity: string;
  service: string;
  budget: Budget | "";
  timeline: Timeline | "";
  message: string;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = {
  name: "",
  email: "",
  company: "",
  phone: "",
  interest: "",
  product: "",
  quantity: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

/** Map ?product= / ?service= / ?interest= to initial form values. Ids and
 *  slugs are the same in both languages. */
function prefillFrom(params: URLSearchParams): Partial<Values> {
  const productParam = params.get("product");
  if (productParam) {
    const model = getAllModels("en").find((m) => m.id === productParam);
    if (model) return { interest: "product", product: model.id };
    const product = getProducts("en").find((p) => p.slug === productParam);
    if (product) {
      return {
        interest: "product",
        product: product.models.length === 1 ? product.models[0].id : productLevel(product.slug),
      };
    }
  }

  const serviceParam = params.get("service");
  if (serviceParam && getServices("en").some((s) => s.slug === serviceParam)) {
    return { interest: "project", service: serviceParam };
  }

  const interest = params.get("interest");
  if (interest && (INTEREST_KEYS as string[]).includes(interest)) {
    return { interest: interest as Interest };
  }
  return {};
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{6,20}$/;

function validate(v: Values, t: Copy["errors"]): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = t.name;
  if (!v.email.trim()) e.email = t.emailMissing;
  else if (!EMAIL_RE.test(v.email.trim())) e.email = t.emailBad;
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = t.phone;
  if (!v.interest) e.interest = t.interest;
  if (v.interest === "product" && v.quantity.trim()) {
    const q = Number(v.quantity);
    if (!Number.isInteger(q) || q < 1) e.quantity = t.quantity;
  }
  if (v.message.trim().length < 15) e.message = v.message.trim() ? t.messageShort : t.messageMissing;
  return e;
}

/** Field order, used to focus the first invalid field on submit. */
const ORDER: Field[] = ["name", "email", "company", "phone", "interest", "product", "quantity", "service", "message"];

/* ------------------------------------------------------------------ */
/* Email composition                                                   */
/* ------------------------------------------------------------------ */

function compose(v: Values, lang: Lang) {
  const c = copy[lang];
  const t = c.mail;
  const site = getSite(lang);
  const who = v.company.trim() ? `${v.name.trim()}, ${v.company.trim()}` : v.name.trim();
  const interest = v.interest ? c.interests[v.interest].label : t.enquiry;

  let subject = `${t.website}: ${who}`;
  const details: [string, string][] = [[t.type, interest]];

  if (v.interest === "product") {
    const p = productLabel(v.product, lang);
    subject = `${t.product}: ${p || t.productFallback} (${who})`;
    details.push([t.productLabel, p || t.notSure]);
    if (v.quantity.trim()) details.push([t.quantity, v.quantity.trim()]);
    if (v.timeline) details.push([t.neededBy, c.timelines[v.timeline]]);
  } else if (v.interest === "project") {
    const s = serviceLabel(v.service, lang);
    subject = `${t.project}: ${s || t.projectFallback} (${who})`;
    details.push([t.service, s || t.notSure]);
    if (v.budget) details.push([t.budget, c.budgets[v.budget]]);
    if (v.timeline) details.push([t.timeline, c.timelines[v.timeline]]);
  } else if (v.interest === "classes") {
    subject = `${t.classes}: ${who}`;
  } else if (v.interest === "partnership") {
    subject = `${t.partnership}: ${who}`;
  }

  const contact: [string, string][] = [
    [t.name, v.name.trim()],
    [t.email, v.email.trim()],
  ];
  if (v.company.trim()) contact.push([t.company, v.company.trim()]);
  if (v.phone.trim()) contact.push([t.phone, v.phone.trim()]);

  const lines = [
    t.hello,
    "",
    v.message.trim(),
    "",
    "---",
    ...details.map(([k, val]) => `${k}: ${val}`),
    "",
    ...contact.map(([k, val]) => `${k}: ${val}`),
    "---",
    t.sentFrom(new URL(site.url).host),
  ];

  return { subject, lines };
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers without the async clipboard API (or no permission).
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

/* ------------------------------------------------------------------ */
/* UI building blocks                                                  */
/* ------------------------------------------------------------------ */

const control =
  "block w-full rounded-lg border bg-card px-3.5 py-2.5 text-base text-ink shadow-xs placeholder:text-graphite/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4 focus:ring-teal/15";
const controlState = (invalid: boolean) =>
  invalid ? "border-error focus:border-error" : "border-hairline-strong hover:border-ink-500 focus:border-cyan-600";

function Label({ htmlFor, children, required, optional }: { htmlFor: string; children: React.ReactNode; required?: boolean; optional?: boolean }) {
  const lang = useLang();
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline gap-1 text-[15px] font-medium text-ink">
      {children}
      {required && <span aria-hidden className="text-graphite">*</span>}
      {optional && <span className="ml-1 text-[13px] font-normal text-graphite">{copy[lang].optional}</span>}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[14px] font-medium text-ink">
      <WarningCircle aria-hidden weight="fill" className="mt-0.5 h-4 w-4 shrink-0 text-error" />
      {children}
    </p>
  );
}

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <CaretDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite" />
    </div>
  );
}

const smallBtn =
  "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-[15px] font-medium transition-colors duration-200";

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

export default function ContactForm({ initial }: { initial?: Partial<Values> }) {
  const lang = useLang();
  const c = copy[lang];
  const site = getSite(lang);
  const products = getProducts(lang);
  const allModels = getAllModels(lang);
  const services = getServices(lang);
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;

  const [values, setValues] = useState<Values>({ ...EMPTY, ...initial });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState<{ subject: string; lines: string[] } | null>(null);
  const [copied, setCopied] = useState<"message" | "address" | null>(null);
  const [summary, setSummary] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const errors = validate(values, c.errors);
  const show = (f: Field) => (submitted || touched[f] ? errors[f] : undefined);

  const set = <K extends Field>(key: K, value: Values[K]) => setValues((v) => ({ ...v, [key]: value }));
  const blur = (f: Field) => () => setTouched((t) => ({ ...t, [f]: true }));

  // Shared props for text-like controls.
  const bind = (f: Field) => {
    const err = show(f);
    return {
      id: id(f),
      name: f,
      value: values[f],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        set(f, e.target.value as Values[typeof f]),
      onBlur: blur(f),
      "aria-invalid": err ? true : undefined,
      "aria-describedby": err ? id(`${f}-error`) : undefined,
      className: `${control} ${controlState(!!err)}`,
    };
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values, c.errors);
    const invalid = ORDER.filter((f) => errs[f]);
    if (invalid.length > 0) {
      setSummary(c.errors.summary(invalid.length));
      const first = invalid[0];
      const el =
        first === "interest"
          ? formRef.current?.querySelector<HTMLInputElement>('input[name="interest"]')
          : document.getElementById(id(first));
      el?.focus();
      return;
    }

    setSummary("");
    const mail = compose(values, lang);
    setSent(mail);
    // No backend: hand the message to the visitor's email app.
    window.location.href = mailto(mail.subject, mail.lines.join("\r\n"));
    requestAnimationFrame(() => successRef.current?.focus());
  }

  async function onCopy(kind: "message" | "address") {
    if (!sent) return;
    const text =
      kind === "address"
        ? site.email
        : [`To: ${site.email}`, `Subject: ${sent.subject}`, "", ...sent.lines].join("\n");
    if (await copyText(text)) {
      setCopied(kind);
      window.setTimeout(() => setCopied((c) => (c === kind ? null : c)), 2500);
    }
  }

  /* ----------------------------- Success ---------------------------- */
  if (sent) {
    const href = mailto(sent.subject, sent.lines.join("\r\n"));
    return (
      <div className="card p-5 sm:p-8">
        <h2
          ref={successRef}
          tabIndex={-1}
          className="text-2xl font-semibold tracking-heading focus:outline-none sm:text-3xl"
        >
          {c.success.title}
        </h2>
        <p className="mt-4 max-w-prose text-[17px] leading-relaxed">
          {c.success.body1} <span className="whitespace-nowrap font-medium">{site.email}</span>
          {lang === "th" ? " " : ". "}
          {c.success.body2}
        </p>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-graphite">
          {c.success.fallback}{" "}
          <a href={site.phones[0].href} className="link">
            {site.phones[0].display}
          </a>
          .
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={href} className={`${smallBtn} btn-primary`}>
            {c.success.openAgain}
          </a>
          <button
            type="button"
            onClick={() => onCopy("message")}
            className={`${smallBtn} border border-hairline-strong bg-card text-ink shadow-xs hover:bg-cyan-50`}
          >
            {copied === "message" ? c.success.messageCopied : c.success.copyMessage}
          </button>
          <button
            type="button"
            onClick={() => onCopy("address")}
            className={`${smallBtn} border border-hairline-strong bg-card text-ink shadow-xs hover:bg-cyan-50`}
          >
            {copied === "address" ? c.success.addressCopied : c.success.copyAddress}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied === "message" ? c.success.liveMessage : copied === "address" ? c.success.liveAddress : ""}
        </p>

        <figure className="mt-8">
          <figcaption className="caption mb-2">{c.success.yourMessage}</figcaption>
          <div className="max-h-72 overflow-auto rounded-lg border border-hairline bg-paper-2 p-4 text-[14px] leading-6">
            <p className="text-graphite">
              {c.success.to} <span className="text-ink">{site.email}</span>
            </p>
            <p className="text-graphite">
              {c.success.subject} <span className="text-ink">{sent.subject}</span>
            </p>
            <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-[13px]">{sent.lines.join("\n")}</pre>
          </div>
        </figure>

        <button type="button" onClick={() => setSent(null)} className="link mt-6 text-[15px]">
          {c.success.edit}
        </button>
      </div>
    );
  }

  /* ------------------------------ Form ------------------------------ */
  const interestErr = show("interest");

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby={id("title")} className="card p-5 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={id("title")} className="text-2xl font-semibold tracking-heading sm:text-[1.75rem]">
          {c.form.title}
        </h2>
        <p className="text-[13px] text-graphite">{c.form.required}</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("name")} required>{c.form.name}</Label>
          <input {...bind("name")} type="text" autoComplete="name" required />
          <ErrorText id={id("name-error")}>{show("name")}</ErrorText>
        </div>
        <div>
          <Label htmlFor={id("email")} required>{c.form.email}</Label>
          <input {...bind("email")} type="email" autoComplete="email" inputMode="email" required />
          <ErrorText id={id("email-error")}>{show("email")}</ErrorText>
        </div>
        <div>
          <Label htmlFor={id("company")} optional>{c.form.company}</Label>
          <input {...bind("company")} type="text" autoComplete="organization" />
        </div>
        <div>
          <Label htmlFor={id("phone")} optional>{c.form.phone}</Label>
          <input {...bind("phone")} type="tel" autoComplete="tel" inputMode="tel" />
          <ErrorText id={id("phone-error")}>{show("phone")}</ErrorText>
        </div>
      </div>

      <fieldset className="mt-8" aria-describedby={interestErr ? id("interest-error") : undefined}>
        <legend className="mb-2 flex items-baseline gap-1 text-[15px] font-medium">
          {c.form.about} <span aria-hidden className="text-graphite">*</span>
        </legend>
        <div className="grid gap-2">
          {INTEREST_KEYS.map((value) => {
            const { label, hint } = c.interests[value];
            const checked = values.interest === value;
            return (
              <label
                key={value}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-[background-color,border-color] duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal-ink ${
                  checked
                    ? "border-cyan-500 bg-cyan-50 ring-1 ring-cyan-500"
                    : interestErr
                      ? "border-error hover:bg-paper-2"
                      : "border-hairline-strong hover:bg-paper-2"
                }`}
              >
                <input
                  type="radio"
                  name="interest"
                  value={value}
                  checked={checked}
                  onChange={() => {
                    set("interest", value);
                    setTouched((t) => ({ ...t, interest: true }));
                  }}
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-cyan-600 focus:outline-none"
                />
                <span className="min-w-0">
                  <span className="block text-[15px] font-medium">{label}</span>
                  <span className="block text-[14px] text-graphite">{hint}</span>
                </span>
              </label>
            );
          })}
        </div>
        <ErrorText id={id("interest-error")}>{interestErr}</ErrorText>
      </fieldset>

      {values.interest === "product" && (
        <div className="mt-6 grid gap-5 rounded-xl border border-hairline bg-paper-2 p-4 sm:grid-cols-6 sm:p-5">
          <div className="sm:col-span-6">
            <Label htmlFor={id("product")}>{c.form.whichProduct}</Label>
            <SelectShell>
              <select {...bind("product")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">{c.form.notSureProduct}</option>
                {products.map((p) => (
                  <optgroup key={p.slug} label={p.name}>
                    {allModels
                      .filter((m) => m.productSlug === p.slug)
                      .map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    {p.models.length > 1 && (
                      <option value={productLevel(p.slug)}>{p.name}: {c.form.helpChoose}</option>
                    )}
                  </optgroup>
                ))}
              </select>
            </SelectShell>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor={id("quantity")} optional>{c.form.quantity}</Label>
            <input {...bind("quantity")} type="number" min={1} step={1} inputMode="numeric" placeholder={c.form.quantityPlaceholder} />
            <ErrorText id={id("quantity-error")}>{show("quantity")}</ErrorText>
          </div>
          <div className="sm:col-span-4">
            <Label htmlFor={id("timeline")} optional>{c.form.whenNeed}</Label>
            <SelectShell>
              <select {...bind("timeline")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">{c.form.select}</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {c.timelines[t]}
                  </option>
                ))}
              </select>
            </SelectShell>
          </div>
        </div>
      )}

      {values.interest === "project" && (
        <div className="mt-6 grid gap-5 rounded-xl border border-hairline bg-paper-2 p-4 sm:grid-cols-2 sm:p-5">
          <div className="sm:col-span-2">
            <Label htmlFor={id("service")}>{c.form.whichService}</Label>
            <SelectShell>
              <select {...bind("service")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">{c.form.notSureService}</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </SelectShell>
          </div>
          <div>
            <Label htmlFor={id("budget")} optional>{c.form.budget}</Label>
            <SelectShell>
              <select {...bind("budget")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">{c.form.notSure}</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {c.budgets[b]}
                  </option>
                ))}
              </select>
            </SelectShell>
          </div>
          <div>
            <Label htmlFor={id("timeline")} optional>{c.form.whenStart}</Label>
            <SelectShell>
              <select {...bind("timeline")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">{c.form.select}</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {c.timelines[t]}
                  </option>
                ))}
              </select>
            </SelectShell>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Label htmlFor={id("message")} required>
          {values.interest === "product"
            ? c.form.messageProduct
            : values.interest === "project"
              ? c.form.messageProject
              : c.form.message}
        </Label>
        <textarea
          {...bind("message")}
          rows={6}
          required
          placeholder={
            values.interest === "product"
              ? c.form.placeholderProduct
              : c.form.placeholder
          }
          className={`${control} ${controlState(!!show("message"))} min-h-[150px] resize-y`}
        />
        <ErrorText id={id("message-error")}>{show("message")}</ErrorText>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[14px] leading-relaxed text-graphite">
          {c.form.note}
        </p>
        <button type="submit" className={`${smallBtn} group h-12 shrink-0 gap-2 btn-primary px-5 text-base`}>
          {c.form.send}
          <ArrowRight aria-hidden weight="bold" className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </button>
      </div>
      <p role="alert" className={summary ? "mt-4 flex items-start gap-2 rounded-lg border border-error/40 bg-error/5 px-3 py-2 text-[15px] font-medium text-ink" : "sr-only"}>
        {summary}
      </p>
    </form>
  );
}

/** Reads ?product= / ?service= / ?interest= and prefills the form. Wrap in <Suspense>. */
export function ContactFormFromParams() {
  const params = useSearchParams();
  const initial = prefillFrom(new URLSearchParams(params.toString()));
  // Remount when the query changes so the new prefill applies.
  return <ContactForm key={params.toString()} initial={initial} />;
}
