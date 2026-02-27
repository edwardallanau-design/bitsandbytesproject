import type { Metadata } from "next";

import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { getAllPricingPlans, getAllTestimonials } from "@/lib/sanity/queries/pricing";

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
      <PricingSection plans={plans} />
      {testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
    </>
  );
}
