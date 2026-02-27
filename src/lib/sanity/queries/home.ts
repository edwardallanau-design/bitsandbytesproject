import type { HomePage } from "@/types/sanity";

import { sanityClient } from "../client";

export async function getHomePage(): Promise<HomePage | null> {
  return sanityClient.fetch<HomePage | null>(
    `*[_type == "homePage"][0] {
      heroHeadline,
      heroSubheadline,
      heroCTA { label, href },
      heroImage { asset, hotspot, crop, alt },
      heroVariant,
      showServicesSection,
      showFeaturedWork,
      showTestimonials
    }`,
    {},
    { next: { tags: ["homePage"] } }
  );
}
