import type { Service, ServiceDetail } from "@/types/sanity";

import { sanityClient } from "../client";

const SERVICE_CARD_FRAGMENT = `
  _id,
  title,
  "slug": slug.current,
  icon,
  shortDescription,
  features
`;

export async function getAllServices(): Promise<Service[]> {
  return sanityClient.fetch<Service[]>(
    `*[_type == "service"] | order(order asc) {
      ${SERVICE_CARD_FRAGMENT}
    }`,
    {},
    { next: { tags: ["service"] } }
  );
}

export async function getServiceBySlug(
  slug: string
): Promise<ServiceDetail | null> {
  return sanityClient.fetch<ServiceDetail | null>(
    `*[_type == "service" && slug.current == $slug][0] {
      ${SERVICE_CARD_FRAGMENT},
      description
    }`,
    { slug },
    { next: { tags: [`service:${slug}`] } }
  );
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const results = await sanityClient.fetch<Array<{ slug: string }>>(
    `*[_type == "service" && defined(slug.current)] { "slug": slug.current }`,
    {},
    { next: { tags: ["service"] } }
  );
  return results.map((r) => r.slug);
}
