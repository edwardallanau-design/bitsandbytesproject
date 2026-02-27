import type { PortfolioItem, PortfolioItemDetail } from "@/types/sanity";

import { sanityClient } from "../client";

const PORTFOLIO_CARD_FRAGMENT = `
  _id,
  title,
  "slug": slug.current,
  clientName,
  year,
  shortDescription,
  coverImage { asset, hotspot, crop, alt },
  tags,
  liveUrl,
  featured
`;

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  return sanityClient.fetch<PortfolioItem[]>(
    `*[_type == "portfolioItem"] | order(_createdAt desc) {
      ${PORTFOLIO_CARD_FRAGMENT}
    }`,
    {},
    { next: { tags: ["portfolioItem"] } }
  );
}

export async function getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
  return sanityClient.fetch<PortfolioItem[]>(
    `*[_type == "portfolioItem" && featured == true] | order(_createdAt desc) {
      ${PORTFOLIO_CARD_FRAGMENT}
    }`,
    {},
    { next: { tags: ["portfolioItem"] } }
  );
}

export async function getPortfolioItemBySlug(
  slug: string
): Promise<PortfolioItemDetail | null> {
  return sanityClient.fetch<PortfolioItemDetail | null>(
    `*[_type == "portfolioItem" && slug.current == $slug][0] {
      ${PORTFOLIO_CARD_FRAGMENT},
      description
    }`,
    { slug },
    { next: { tags: [`portfolioItem:${slug}`] } }
  );
}

export async function getAllPortfolioSlugs(): Promise<string[]> {
  const results = await sanityClient.fetch<Array<{ slug: string }>>(
    `*[_type == "portfolioItem" && defined(slug.current)] { "slug": slug.current }`,
    {},
    { next: { tags: ["portfolioItem"] } }
  );
  return results.map((r) => r.slug);
}
