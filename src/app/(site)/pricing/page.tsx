import type { Metadata } from "next";

import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { getAllPricingPlans, getAllTestimonials } from "@/lib/payload/queries";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for our digital transformation services.",
};

export default async function PricingPage() {
  const [plans, testimonials] = await Promise.all([
    getAllPricingPlans(),
    getAllTestimonials(),
  ]);

  return (
    <>
      {/* Page hero */}
      <div className="bg-neutral-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Pricing
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Simple, honest pricing
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            Transparent pricing. No hidden fees. No surprises.
          </p>
        </div>
      </div>

      <PricingSection plans={plans} showHeader={false} />
      {testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
    </>
  );
}
