import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot
};

type FieldKey = "name" | "email" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string
  );
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't read that request. Please try again." },
      { status: 400 }
    );
  }

  // Honeypot: a real user never fills this hidden field. Silently accept bots.
  if (body.website && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  const fieldErrors: Partial<Record<FieldKey, string>> = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  if (!email) fieldErrors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email))
    fieldErrors.email = "That email doesn't look right.";
  if (message.length < 10)
    fieldErrors.message =
      "Tell us a little about the project (at least 10 characters).";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error(
      "[contact] SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO."
    );
    return NextResponse.json(
      {
        ok: false,
        error: "Email isn't set up on the server yet. Please email us directly.",
      },
      { status: 503 }
    );
  }

  const port = Number(SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: CONTACT_FROM || `GSF Robotics Website <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `${name} <${email}>`,
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
  } catch (error) {
    console.error("[contact] Failed to send message", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your message. Please try again, or email us directly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
