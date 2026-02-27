import type { SiteSettings } from "@/types/sanity";

import { sanityClient } from "../client";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0] {
      siteName,
      tagline,
      logo { asset, hotspot, crop, alt },
      socialLinks[] { platform, url },
      seo {
        metaTitle,
        metaDescription,
        ogImage { asset, hotspot, crop }
      }
    }`,
    {},
    { next: { tags: ["siteSettings"] } }
  );
}
