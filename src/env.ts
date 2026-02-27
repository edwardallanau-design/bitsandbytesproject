import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Environment variable validation schema.
 *
 * The app will throw a loud error at startup if any required variable is
 * missing or malformed — no silent undefined errors in production.
 *
 * Usage: import { env } from "@/env"
 */
export const env = createEnv({
  server: {
    SANITY_API_READ_TOKEN: z.string().min(1),
    SANITY_REVALIDATE_SECRET: z.string().min(32),
    RESEND_API_KEY: z.string().min(1).optional(),
    CONTACT_TO_EMAIL: z.string().email().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  client: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_SANITY_API_VERSION: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a date like 2024-01-01"),
  },
  runtimeEnv: {
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION:
      process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  },
});
