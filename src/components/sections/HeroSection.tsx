import Link from "next/link";

import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";
import type { HomePage } from "@/types/sanity";

interface HeroSectionProps {
  data: HomePage;
}

export function HeroSection({ data }: HeroSectionProps) {
  const {
    heroHeadline,
    heroSubheadline,
    heroCTA,
    heroImage,
    heroVariant = "centered",
  } = data;

  const isSplit =
    heroVariant === "split-right" || heroVariant === "split-left";

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-950"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(22% 0 0), transparent)",
      }}
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(100% 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(100% 0 0) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className={cn(
          "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          isSplit ? "py-20 md:py-28" : "py-24 md:py-36"
        )}
      >
        <div
          className={cn(
            "flex gap-12",
            isSplit
              ? "flex-col items-center lg:flex-row"
              : "flex-col items-center text-center"
          )}
        >
          {/* Text content */}
          <div
            className={cn(
              "flex flex-col gap-6",
              isSplit ? "lg:w-1/2" : "max-w-4xl"
            )}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 self-start sm:self-auto sm:justify-center">
              <span className="h-px w-8 bg-neutral-600" />
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Digital Agency
              </span>
              <span className="h-px w-8 bg-neutral-600" />
            </div>

            <h1
              className={cn(
                "font-bold leading-[1.08] tracking-tight text-white",
                "text-4xl sm:text-5xl lg:text-7xl"
              )}
            >
              {heroHeadline}
            </h1>

            {heroSubheadline && (
              <p className="text-lg leading-relaxed text-neutral-400 sm:text-xl">
                {heroSubheadline}
              </p>
            )}

            {heroCTA?.href && heroCTA.label && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={heroCTA.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
                >
                  {heroCTA.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
                >
                  View our work
                </Link>
              </div>
            )}
          </div>

          {/* Image — split variants */}
          {heroImage && isSplit && (
            <div
              className={cn(
                "lg:w-1/2",
                heroVariant === "split-left" ? "lg:order-first" : ""
              )}
            >
              <div className="overflow-hidden rounded-2xl ring-1 ring-neutral-800">
                <SanityImage
                  image={heroImage}
                  width={720}
                  height={540}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Image — centered variant */}
          {heroImage && !isSplit && (
            <div className="w-full max-w-4xl">
              <div className="overflow-hidden rounded-2xl ring-1 ring-neutral-800">
                <SanityImage
                  image={heroImage}
                  width={1200}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
