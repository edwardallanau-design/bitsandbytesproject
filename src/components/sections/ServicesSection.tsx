import Link from "next/link";

import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
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
    <SectionWrapper className="bg-neutral-50">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          What we offer
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          End-to-end digital solutions tailored for small businesses.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link key={service._id} href={`/services#${service.slug}`}>
            <Card className="h-full transition-shadow duration-200 hover:shadow-lg">
              <div className="flex flex-col gap-3 p-4">
                <CardTitle>{service.title}</CardTitle>
                {service.shortDescription && (
                  <CardDescription>{service.shortDescription}</CardDescription>
                )}
                {service.features && service.features.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-neutral-600"
                      >
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
          >
            View all services →
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
