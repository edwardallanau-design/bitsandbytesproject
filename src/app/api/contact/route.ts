import { Resend } from "resend";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { env } from "@/env";

// ---------------------------------------------------------------------------
// In-memory rate limiter
// Tracks submission timestamps per IP. Cleared on cold start — good enough
// for a contact form on a small site. Not shared across serverless instances.
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const prev = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (prev.length >= MAX_ATTEMPTS) return false;
  rateLimitMap.set(ip, [...prev, now]);
  return true;
}

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------
const schema = z.object({
  firstName:    z.string().min(1).max(100),
  lastName:     z.string().min(1).max(100),
  email:        z.string().email().max(254),
  businessName: z.string().max(200).optional(),
  message:      z.string().min(10).max(5000),
  /** Honeypot — must be empty. Bots tend to fill every visible/hidden field. */
  _hp:          z.string().max(0).optional(),
});

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  // Get best-effort IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check your details and try again." },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, businessName, message, _hp } =
    parsed.data;

  // Honeypot triggered — silently succeed so bots think they won
  if (_hp) {
    return NextResponse.json({ ok: true });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL } = env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      // Use your own verified domain in production:
      // e.g. "Contact Form <hello@yourdomain.com>"
      from:    "Contact Form <onboarding@resend.dev>",
      to:      CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${firstName} ${lastName}`,
      text: [
        `Name:    ${firstName} ${lastName}`,
        `Email:   ${email}`,
        businessName ? `Business: ${businessName}` : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 500 }
    );
  }
}
