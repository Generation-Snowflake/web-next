"use client";

import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { mailto, site } from "@/lib/site";
import { services } from "@/lib/services";
import { products, allModels } from "@/lib/products";

/* ------------------------------------------------------------------ */
/* Options                                                             */
/* ------------------------------------------------------------------ */

type Interest = "project" | "product" | "partnership" | "other";

const INTERESTS: { value: Interest; label: string; hint: string }[] = [
  { value: "project", label: "A custom project", hint: "Software, AI or robotics built for you" },
  { value: "product", label: "Buying a product", hint: "Robots and kits: quotes, school and bulk orders" },
  { value: "partnership", label: "Partnership", hint: "Resellers, research and joint projects" },
  { value: "other", label: "Something else", hint: "Anything you want to ask" },
];

const BUDGETS = [
  "Under ฿250,000",
  "฿250,000 – ฿750,000",
  "฿750,000 – ฿2,000,000",
  "Over ฿2,000,000",
];

const TIMELINES = ["As soon as possible", "Within 1 month", "1–3 months", "3–6 months", "Just exploring"];

/** Value used for "this product, but I haven't picked a model yet". */
const productLevel = (slug: string) => `product:${slug}`;

function productLabel(value: string) {
  if (!value) return "";
  if (value.startsWith("product:")) {
    const p = products.find((x) => x.slug === value.slice("product:".length));
    return p ? `${p.name} (model not decided)` : "";
  }
  const m = allModels.find((x) => x.id === value);
  return m ? m.name : "";
}

function serviceLabel(slug: string) {
  return services.find((s) => s.slug === slug)?.title ?? "";
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
  budget: string;
  timeline: string;
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

/** Map ?product= / ?service= / ?interest= to initial form values. */
function prefillFrom(params: URLSearchParams): Partial<Values> {
  const productParam = params.get("product");
  if (productParam) {
    const model = allModels.find((m) => m.id === productParam);
    if (model) return { interest: "product", product: model.id };
    const product = products.find((p) => p.slug === productParam);
    if (product) {
      return {
        interest: "product",
        product: product.models.length === 1 ? product.models[0].id : productLevel(product.slug),
      };
    }
  }

  const serviceParam = params.get("service");
  if (serviceParam && services.some((s) => s.slug === serviceParam)) {
    return { interest: "project", service: serviceParam };
  }

  const interest = params.get("interest");
  if (interest && INTERESTS.some((i) => i.value === interest)) {
    return { interest: interest as Interest };
  }
  return {};
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{6,20}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email address doesn’t look right. Please check it.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim()))
    e.phone = "Use digits, spaces, + or - only (e.g. 081 234 5678).";
  if (!v.interest) e.interest = "Please choose what you’re interested in.";
  if (v.interest === "product" && v.quantity.trim()) {
    const q = Number(v.quantity);
    if (!Number.isInteger(q) || q < 1) e.quantity = "Enter a whole number, 1 or more.";
  }
  if (v.message.trim().length < 15)
    e.message = v.message.trim()
      ? "Please add a little more detail (at least 15 characters)."
      : "Please tell us a little about what you need.";
  return e;
}

/** Field order, used to focus the first invalid field on submit. */
const ORDER: Field[] = ["name", "email", "company", "phone", "interest", "product", "quantity", "service", "message"];

/* ------------------------------------------------------------------ */
/* Email composition                                                   */
/* ------------------------------------------------------------------ */

function compose(v: Values) {
  const who = v.company.trim() ? `${v.name.trim()}, ${v.company.trim()}` : v.name.trim();
  const interest = INTERESTS.find((i) => i.value === v.interest)?.label ?? "Enquiry";

  let subject = `Website enquiry: ${who}`;
  const details: [string, string][] = [["Enquiry type", interest]];

  if (v.interest === "product") {
    const p = productLabel(v.product);
    subject = `Product enquiry: ${p || "Robots & kits"} (${who})`;
    details.push(["Product", p || "Not sure yet, please advise"]);
    if (v.quantity.trim()) details.push(["Quantity", v.quantity.trim()]);
    if (v.timeline) details.push(["Needed by", v.timeline]);
  } else if (v.interest === "project") {
    const s = serviceLabel(v.service);
    subject = `Project enquiry: ${s || "Custom project"} (${who})`;
    details.push(["Service", s || "Not sure yet, please advise"]);
    if (v.budget) details.push(["Budget range", v.budget]);
    if (v.timeline) details.push(["Timeline", v.timeline]);
  } else if (v.interest === "partnership") {
    subject = `Partnership enquiry: ${who}`;
  }

  const contact: [string, string][] = [
    ["Name", v.name.trim()],
    ["Email", v.email.trim()],
  ];
  if (v.company.trim()) contact.push(["Company", v.company.trim()]);
  if (v.phone.trim()) contact.push(["Phone", v.phone.trim()]);

  const lines = [
    "Hello GSF team,",
    "",
    v.message.trim(),
    "",
    "---",
    ...details.map(([k, val]) => `${k}: ${val}`),
    "",
    ...contact.map(([k, val]) => `${k}: ${val}`),
    "---",
    `Sent from the contact form on ${new URL(site.url).host}`,
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
  "block w-full rounded-sm border bg-paper px-3.5 py-2.5 text-base text-ink placeholder:text-graphite/70 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-ink/30";
const controlState = (invalid: boolean) =>
  invalid ? "border-signal focus:border-signal" : "border-ink/70 hover:border-ink focus:border-teal-ink";

function Label({ htmlFor, children, required, optional }: { htmlFor: string; children: React.ReactNode; required?: boolean; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline gap-1 text-[15px] font-medium text-ink">
      {children}
      {required && <span aria-hidden className="text-graphite">*</span>}
      {optional && <span className="ml-1 text-[13px] font-normal text-graphite">(optional)</span>}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-[14px] text-signal">
      {children}
    </p>
  );
}

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite" />
    </div>
  );
}

const smallBtn =
  "inline-flex items-center justify-center rounded-sm px-4 py-2.5 text-[15px] font-medium transition-colors duration-150";

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

export default function ContactForm({ initial }: { initial?: Partial<Values> }) {
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

  const errors = validate(values);
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
    const errs = validate(values);
    const invalid = ORDER.filter((f) => errs[f]);
    if (invalid.length > 0) {
      setSummary(
        invalid.length === 1
          ? "Please correct 1 field before sending."
          : `Please correct ${invalid.length} fields before sending.`,
      );
      const first = invalid[0];
      const el =
        first === "interest"
          ? formRef.current?.querySelector<HTMLInputElement>('input[name="interest"]')
          : document.getElementById(id(first));
      el?.focus();
      return;
    }

    setSummary("");
    const mail = compose(values);
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
      <div className="border-t border-ink pt-6">
        <h2
          ref={successRef}
          tabIndex={-1}
          className="text-2xl font-medium tracking-[-0.015em] focus:outline-none sm:text-3xl"
        >
          Now press Send in your email app
        </h2>
        <p className="mt-4 max-w-prose text-[17px] leading-relaxed">
          Your email app should have opened with the message addressed to{" "}
          <span className="whitespace-nowrap font-medium">{site.email}</span>. Check it and press Send.
        </p>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-graphite">
          Nothing opened? Copy the message below and send it from any email account, or call us on{" "}
          <a href={site.phones[0].href} className="link font-mono">
            {site.phones[0].display}
          </a>
          .
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={href} className={`${smallBtn} bg-ink text-paper hover:bg-black`}>
            Open email app again
          </a>
          <button
            type="button"
            onClick={() => onCopy("message")}
            className={`${smallBtn} border border-ink text-ink hover:bg-ink hover:text-paper`}
          >
            {copied === "message" ? "Message copied" : "Copy message"}
          </button>
          <button
            type="button"
            onClick={() => onCopy("address")}
            className={`${smallBtn} border border-ink text-ink hover:bg-ink hover:text-paper`}
          >
            {copied === "address" ? "Address copied" : "Copy email address"}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied === "message" ? "Message copied to clipboard." : copied === "address" ? "Email address copied to clipboard." : ""}
        </p>

        <figure className="mt-8">
          <figcaption className="caption mb-2">Your message</figcaption>
          <div className="max-h-72 overflow-auto border border-hairline bg-paper-2 p-4 text-[14px] leading-6">
            <p className="text-graphite">
              To: <span className="text-ink">{site.email}</span>
            </p>
            <p className="text-graphite">
              Subject: <span className="text-ink">{sent.subject}</span>
            </p>
            <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-[13px]">{sent.lines.join("\n")}</pre>
          </div>
        </figure>

        <button type="button" onClick={() => setSent(null)} className="link mt-6 text-[15px]">
          Edit your message
        </button>
      </div>
    );
  }

  /* ------------------------------ Form ------------------------------ */
  const interestErr = show("interest");

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby={id("title")} className="border-t border-ink pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id={id("title")} className="text-2xl font-medium tracking-[-0.015em]">
          Send us a message
        </h2>
        <p className="text-[13px] text-graphite">* required</p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("name")} required>Your name</Label>
          <input {...bind("name")} type="text" autoComplete="name" required />
          <ErrorText id={id("name-error")}>{show("name")}</ErrorText>
        </div>
        <div>
          <Label htmlFor={id("email")} required>Email</Label>
          <input {...bind("email")} type="email" autoComplete="email" inputMode="email" required />
          <ErrorText id={id("email-error")}>{show("email")}</ErrorText>
        </div>
        <div>
          <Label htmlFor={id("company")} optional>Company or school</Label>
          <input {...bind("company")} type="text" autoComplete="organization" />
        </div>
        <div>
          <Label htmlFor={id("phone")} optional>Phone</Label>
          <input {...bind("phone")} type="tel" autoComplete="tel" inputMode="tel" />
          <ErrorText id={id("phone-error")}>{show("phone")}</ErrorText>
        </div>
      </div>

      <fieldset className="mt-8" aria-describedby={interestErr ? id("interest-error") : undefined}>
        <legend className="mb-2 flex items-baseline gap-1 text-[15px] font-medium">
          What is it about? <span aria-hidden className="text-graphite">*</span>
        </legend>
        <div
          className={`divide-y rounded-sm border ${
            interestErr ? "divide-hairline border-signal" : "divide-hairline border-ink/70"
          }`}
        >
          {INTERESTS.map(({ value, label, hint }) => {
            const checked = values.interest === value;
            return (
              <label
                key={value}
                className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors duration-150 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal-ink ${
                  checked ? "bg-paper-2" : "hover:bg-paper-2/60"
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
                  className="mt-1 h-4 w-4 shrink-0 accent-teal-ink focus:outline-none"
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
        <div className="mt-6 grid gap-5 border-l-2 border-ink pl-4 sm:grid-cols-6 sm:pl-5">
          <div className="sm:col-span-6">
            <Label htmlFor={id("product")}>Which product?</Label>
            <SelectShell>
              <select {...bind("product")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">Not sure yet, please advise</option>
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
                      <option value={productLevel(p.slug)}>{p.name}: help me choose a model</option>
                    )}
                  </optgroup>
                ))}
              </select>
            </SelectShell>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor={id("quantity")} optional>Quantity</Label>
            <input {...bind("quantity")} type="number" min={1} step={1} inputMode="numeric" placeholder="e.g. 10" />
            <ErrorText id={id("quantity-error")}>{show("quantity")}</ErrorText>
          </div>
          <div className="sm:col-span-4">
            <Label htmlFor={id("timeline")} optional>When do you need it?</Label>
            <SelectShell>
              <select {...bind("timeline")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">Select…</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </SelectShell>
          </div>
        </div>
      )}

      {values.interest === "project" && (
        <div className="mt-6 grid gap-5 border-l-2 border-ink pl-4 sm:grid-cols-2 sm:pl-5">
          <div className="sm:col-span-2">
            <Label htmlFor={id("service")}>Which service fits best?</Label>
            <SelectShell>
              <select {...bind("service")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">Not sure yet, help me scope it</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </SelectShell>
          </div>
          <div>
            <Label htmlFor={id("budget")} optional>Budget range</Label>
            <SelectShell>
              <select {...bind("budget")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">Not sure yet</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </SelectShell>
          </div>
          <div>
            <Label htmlFor={id("timeline")} optional>When would you like to start?</Label>
            <SelectShell>
              <select {...bind("timeline")} className={`${control} ${controlState(false)} appearance-none pr-10`}>
                <option value="">Select…</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
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
            ? "What will you use it for?"
            : values.interest === "project"
              ? "Tell us about the project"
              : "Your message"}
        </Label>
        <textarea
          {...bind("message")}
          rows={6}
          required
          placeholder={
            values.interest === "product"
              ? "e.g. a robotics club for 30 students, a research lab, where to deliver"
              : "What you want to build, what you have now, and any deadline"
          }
          className={`${control} ${controlState(!!show("message"))} min-h-[150px] resize-y`}
        />
        <ErrorText id={id("message-error")}>{show("message")}</ErrorText>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[14px] leading-relaxed text-graphite">
          Sending opens your own email app with this message ready to go. Nothing is stored on this website.
        </p>
        <button type="submit" className={`${smallBtn} group shrink-0 gap-2 bg-ink px-5 py-3 text-base text-paper hover:bg-black`}>
          Send via email
          <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
      <p role="alert" className={summary ? "mt-4 text-[15px] text-signal" : "sr-only"}>
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
