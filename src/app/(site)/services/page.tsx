import type { Metadata } from "next";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getAllServices } from "@/lib/payload/queries";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the digital transformation services we offer for small businesses.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      {/* Page hero */}
      <div className="bg-neutral-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            What we offer
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            Everything you need to establish and grow your business online.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <SectionWrapper className="bg-white">
        {services.length === 0 ? (
          <p className="text-neutral-500">
            No services found. Add some in the Payload admin.
          </p>
        ) : (
          <div className="grid gap-px bg-neutral-200 lg:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.slug}
                className="flex flex-col gap-4 bg-white p-10 scroll-mt-20"
              >
                <span className="text-xs font-semibold tabular-nums text-neutral-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-semibold text-neutral-900">
                  {service.title}
                </h2>
                {service.shortDescription && (
                  <p className="text-neutral-500">{service.shortDescription}</p>
                )}
                {service.features && service.features.length > 0 && (
                  <ul className="mt-2 space-y-2">
                    {service.features.map((feature, i) => (
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
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
