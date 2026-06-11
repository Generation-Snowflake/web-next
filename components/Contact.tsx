"use client";

import { useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { Check, Loader2 } from "lucide-react";

type FieldKey = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldKey, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "hello@gsf-robotics.com";

const EMPTY = { name: "", email: "", message: "", website: "" };

export default function ContactSection() {
  const uid = useId();
  const [values, setValues] = useState({ ...EMPTY });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const fieldId = (key: FieldKey) => `${uid}-${key}`;
  const errorId = (key: FieldKey) => `${uid}-${key}-error`;

  function validate(v: typeof values): FieldErrors {
    const next: FieldErrors = {};
    if (!v.name.trim()) next.name = "Please enter your name.";
    if (!v.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(v.email.trim()))
      next.email = "That email doesn't look right.";
    if (v.message.trim().length < 10)
      next.message =
        "Tell us a little about the project (at least 10 characters).";
    return next;
  }

  function update(key: keyof typeof values) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [key]: value }));
      if (key in errors && errors[key as FieldKey]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0] as FieldKey;
      document.getElementById(fieldId(first))?.focus();
      return;
    }

    setStatus("submitting");
    setFormError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (res.status === 422 && data.fieldErrors) {
        setErrors(data.fieldErrors as FieldErrors);
        setStatus("idle");
        const first = Object.keys(data.fieldErrors)[0] as FieldKey;
        document.getElementById(fieldId(first))?.focus();
        return;
      }
      setFormError(
        data.error || "Something went wrong on our end. Please try again."
      );
      setStatus("error");
    } catch {
      setFormError(
        "Network error. Please try again, or email us directly."
      );
      setStatus("error");
    }
  }

  function reset() {
    setValues({ ...EMPTY });
    setErrors({});
    setFormError(null);
    setStatus("idle");
  }

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
      <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Narrative + reassurance */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Have a complex system to build?
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-gray-300">
            Tell us what you want to automate, connect, detect, or launch. An
            engineer reads every message, not a sales rep.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-sm text-gray-400">Response time</dt>
              <dd className="mt-1 text-base font-medium text-white">
                Within one business day
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-400">Prefer email?</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-base font-medium text-ice underline-offset-4 transition-colors hover:text-ice-light hover:underline focus-visible:underline focus-visible:outline-none"
                >
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Form card / success */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8">
          {status === "success" ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="flex min-h-[380px] flex-col items-center justify-center text-center focus:outline-none"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ice/10 text-ice shadow-glow-sm">
                <Check size={28} aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-white">
                Message sent
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-gray-300">
                Thanks, {values.name.trim().split(" ")[0] || "there"}. We&apos;ll
                get back to you within one business day.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-8 text-sm font-medium text-ice transition-colors hover:text-ice-light focus-visible:underline focus-visible:outline-none"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot: hidden from users and assistive tech, catches bots. */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
              >
                <label>
                  Leave this empty
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={update("website")}
                  />
                </label>
              </div>

              <Field
                id={fieldId("name")}
                label="Name"
                error={errors.name}
                errorId={errorId("name")}
              >
                <input
                  id={fieldId("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={update("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? errorId("name") : undefined}
                  className={inputClass(Boolean(errors.name))}
                />
              </Field>

              <Field
                id={fieldId("email")}
                label="Work email"
                error={errors.email}
                errorId={errorId("email")}
              >
                <input
                  id={fieldId("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? errorId("email") : undefined}
                  className={inputClass(Boolean(errors.email))}
                />
              </Field>

              <Field
                id={fieldId("message")}
                label="What do you want to build?"
                error={errors.message}
                errorId={errorId("message")}
              >
                <textarea
                  id={fieldId("message")}
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={update("message")}
                  placeholder="A robot control layer, a vision pipeline, a connected device platform…"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? errorId("message") : undefined
                  }
                  className={`${inputClass(Boolean(errors.message))} resize-y`}
                />
              </Field>

              {formError && (
                <p
                  role="alert"
                  className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger-text"
                >
                  {formError}{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium underline underline-offset-4"
                  >
                    Email us instead
                  </a>
                  .
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ice px-8 py-3.5 text-sm font-semibold text-darkbg shadow-glow transition duration-300 hover:bg-ice-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-light focus-visible:ring-offset-2 focus-visible:ring-offset-darkbg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  "Request a demo"
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                We reply within one business day.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-white/[0.03] px-4 py-3 text-sm text-white",
    "placeholder:text-gray-400 transition-colors focus:outline-none",
    hasError
      ? "border-danger/60 focus-visible:border-danger focus-visible:ring-2 focus-visible:ring-danger/30"
      : "border-white/10 focus-visible:border-ice focus-visible:ring-2 focus-visible:ring-ice/40",
  ].join(" ");
}

function Field({
  id,
  label,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-300"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-danger-text">
          {error}
        </p>
      )}
    </div>
  );
}
