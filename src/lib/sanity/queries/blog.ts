import type { Post, PostDetail } from "@/types/sanity";

import { sanityClient } from "../client";

const POST_CARD_FRAGMENT = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage { asset, hotspot, crop, alt },
  categories,
  featured,
  "author": author-> { name, "avatar": avatar { asset, alt } }
`;

export async function getAllPosts(): Promise<Post[]> {
  return sanityClient.fetch<Post[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      ${POST_CARD_FRAGMENT}
    }`,
    {},
    { next: { tags: ["post"] } }
  );
}

export async function getFeaturedPosts(): Promise<Post[]> {
  return sanityClient.fetch<Post[]>(
    `*[_type == "post" && featured == true && defined(slug.current)] | order(publishedAt desc)[0..2] {
      ${POST_CARD_FRAGMENT}
    }`,
    {},
    { next: { tags: ["post"] } }
  );
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  return sanityClient.fetch<PostDetail | null>(
    `*[_type == "post" && slug.current == $slug][0] {
      ${POST_CARD_FRAGMENT},
      body
    }`,
    { slug },
    { next: { tags: [`post:${slug}`] } }
  );
}

export async function getAllPostSlugs(): Promise<string[]> {
  const results = await sanityClient.fetch<Array<{ slug: string }>>(
    `*[_type == "post" && defined(slug.current)] { "slug": slug.current }`,
    {},
    { next: { tags: ["post"] } }
  );
  return results.map((r) => r.slug);
}
