import type { PricingPlan, Testimonial } from "@/types/sanity";

import { sanityClient } from "../client";

export async function getAllPricingPlans(): Promise<PricingPlan[]> {
  return sanityClient.fetch<PricingPlan[]>(
    `*[_type == "pricingPlan"] | order(order asc) {
      _id,
      name,
      price,
      priceLabel,
      billingPeriod,
      features[] { text, included },
      isPopular,
      ctaLabel,
      ctaHref
    }`,
    {},
    { next: { tags: ["pricingPlan"] } }
  );
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return sanityClient.fetch<Testimonial[]>(
    `*[_type == "testimonial"] {
      _id,
      authorName,
      role,
      company,
      avatar { asset, hotspot, crop, alt },
      quote,
      rating
    }`,
    {},
    { next: { tags: ["testimonial"] } }
  );
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return sanityClient.fetch<Testimonial[]>(
    `*[_type == "testimonial" && featured == true] {
      _id,
      authorName,
      role,
      company,
      avatar { asset, hotspot, crop, alt },
      quote,
      rating
    }`,
    {},
    { next: { tags: ["testimonial"] } }
  );
}
