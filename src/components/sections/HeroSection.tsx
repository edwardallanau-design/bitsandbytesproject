import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
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
    <SectionWrapper size="lg" as="div" className="bg-white">
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
            isSplit ? "lg:w-1/2" : "max-w-3xl"
          )}
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            {heroHeadline}
          </h1>

          {heroSubheadline && (
            <p className="text-lg text-neutral-600 sm:text-xl">
              {heroSubheadline}
            </p>
          )}

          {heroCTA?.href && heroCTA.label && (
            <div>
              <Button asChild size="lg">
                <Link href={heroCTA.href}>{heroCTA.label}</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Image */}
        {heroImage && isSplit && (
          <div
            className={cn(
              "lg:w-1/2",
              heroVariant === "split-left" ? "lg:order-first" : ""
            )}
          >
            <SanityImage
              image={heroImage}
              width={720}
              height={540}
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        )}

        {heroImage && !isSplit && (
          <div className="w-full max-w-3xl">
            <SanityImage
              image={heroImage}
              width={1200}
              height={600}
              className="rounded-2xl object-cover"
              priority
            />
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
