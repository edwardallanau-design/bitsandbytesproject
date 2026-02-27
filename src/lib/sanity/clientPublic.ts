import { createClient } from "next-sanity";

/**
 * Browser-safe Sanity client — no token, no server-only guard.
 *
 * Safe to import in Client Components or pass to the embedded Sanity Studio.
 * Cannot access draft/unpublished content.
 */
export const sanityClientPublic = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
  perspective: "published",
  stega: false,
});
