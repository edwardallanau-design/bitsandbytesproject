"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "border-neutral-700 bg-neutral-900 text-white placeholder:text-neutral-600 focus-visible:ring-neutral-500";
const labelClass = "text-sm font-medium text-neutral-300";

export function ContactSection() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement)
        .value;

    const payload = {
      firstName:    get("firstName"),
      lastName:     get("lastName"),
      email:        get("email"),
      businessName: get("businessName"),
      message:      get("message"),
      _hp:          get("_hp"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(json.error ?? "Something went wrong.");
      }

      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (state === "success") {
    return (
      <SectionWrapper className="bg-neutral-950">
        <div className="mx-auto max-w-2xl py-12 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Message sent</h2>
          <p className="mt-4 text-lg text-neutral-400">
            Thanks for reaching out. I&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </SectionWrapper>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <SectionWrapper className="bg-neutral-950">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Contact us
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Let&apos;s talk
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Ready to take your business online? Tell us about your project and
            we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/*
           * Honeypot field — visually hidden, off-screen.
           * Humans never see or fill it. Bots that auto-fill all fields will
           * trigger it and the submission is silently dropped server-side.
           */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            <label htmlFor="_hp">Leave this blank</label>
            <input
              id="_hp"
              name="_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className={labelClass}>
                First name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                placeholder="Jane"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className={labelClass}>
                Last name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                placeholder="Smith"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="jane@example.com"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessName" className={labelClass}>
              Business name{" "}
              <span className="text-neutral-600">(optional)</span>
            </Label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="Acme Co."
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className={labelClass}>
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell us about your business and what you're looking to achieve..."
              className={inputClass}
            />
          </div>

          {state === "error" && (
            <p className="rounded-md border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-red-400">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={state === "loading"}
            className="w-full rounded-md bg-white py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {state === "loading" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
}
