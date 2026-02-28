import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Authors } from "./src/collections/Authors";
import { Services } from "./src/collections/Services";
import { PortfolioItems } from "./src/collections/PortfolioItems";
import { Posts } from "./src/collections/Posts";
import { PricingPlans } from "./src/collections/PricingPlans";
import { Testimonials } from "./src/collections/Testimonials";

import { SiteSettings } from "./src/globals/SiteSettings";
import { HomePage } from "./src/globals/HomePage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Media,
    Authors,
    Services,
    PortfolioItems,
    Posts,
    PricingPlans,
    Testimonials,
  ],
  globals: [SiteSettings, HomePage],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: process.env.NODE_ENV === "production",
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? "",
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "src/payload-types.ts"),
  },
  secret: process.env.PAYLOAD_SECRET ?? "",
  upload: {
    limits: {
      fileSize: 5_000_000, // 5 MB
    },
  },
});
