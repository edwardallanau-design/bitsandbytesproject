import type { Metadata } from "next";

import { PortableText } from "@/components/ui/PortableText";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getAllServices } from "@/lib/sanity/queries/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the digital transformation services we offer for small businesses.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <SectionWrapper>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
          Services
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Everything you need to establish and grow your business online.
        </p>
      </div>

      {services.length === 0 ? (
        <p className="text-neutral-500">No services found. Add some in the Sanity Studio.</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <div
              key={service._id}
              id={service.slug}
              className="rounded-xl border border-neutral-200 bg-white p-8 scroll-mt-24"
            >
              <h2 className="text-xl font-semibold text-neutral-900">
                {service.title}
              </h2>
              {service.shortDescription && (
                <p className="mt-2 text-neutral-600">{service.shortDescription}</p>
              )}
              {service.features && service.features.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
