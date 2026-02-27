import "server-only";

import { createClient } from "next-sanity";

import { env } from "@/env";

/**
 * Server-side Sanity client.
 *
 * This file starts with `import "server-only"` — Next.js will throw a
 * build-time error if this module is accidentally imported in a Client
 * Component or browser bundle, preventing the read token from leaking.
 *
 * Use this client for all server-side data fetching (Server Components,
 * Route Handlers, generateStaticParams, generateMetadata).
 */
export const sanityClient = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  // CDN for published content in production; bypass CDN in dev for freshness
  useCdn: env.NODE_ENV === "production",
  token: env.SANITY_API_READ_TOKEN,
  perspective: "published",
  stega: false,
});
