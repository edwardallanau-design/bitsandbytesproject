import Link from "next/link";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { Service } from "@/types/sanity";

interface ServicesSectionProps {
  services: Service[];
  showAll?: boolean;
}

export function ServicesSection({
  services,
  showAll = false,
}: ServicesSectionProps) {
  if (services.length === 0) return null;

  return (
    <SectionWrapper className="bg-white">
      <div className="mb-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          What we offer
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          End-to-end digital solutions
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-neutral-500">
          Tailored services to help small businesses establish, grow, and thrive
          online.
        </p>
      </div>

      <div className="grid gap-px bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Link
            key={service._id}
            href={`/services#${service.slug}`}
            className="group relative flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-neutral-50"
          >
            <span className="text-xs font-semibold tabular-nums text-neutral-300">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-neutral-900 transition-colors group-hover:text-neutral-700">
                {service.title}
              </h3>
              {service.shortDescription && (
                <p className="text-sm leading-relaxed text-neutral-500">
                  {service.shortDescription}
                </p>
              )}
              {service.features && service.features.length > 0 && (
                <ul className="mt-1 space-y-1.5">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-500"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-auto pt-2">
              <span className="text-xs font-medium text-neutral-300 transition-colors group-hover:text-neutral-600">
                Learn more →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
          >
            View all services →
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
