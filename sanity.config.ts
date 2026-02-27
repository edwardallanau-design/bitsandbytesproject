import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "@/sanity/schemas";
import { structure } from "@/sanity/lib/structure";

const SINGLETON_TYPES = new Set(["siteSettings", "homePage"]);

export default defineConfig({
  name: "default",
  title: "Agency CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],

  schema: {
    types: schemaTypes,
    // Remove singletons from the "Create new document" quick-action menu
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !SINGLETON_TYPES.has(schemaType)
      ),
  },

  document: {
    // Prevent "New" links for singleton types from creating duplicate documents
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          ({ templateId }) => !SINGLETON_TYPES.has(templateId)
        );
      }
      return prev;
    },
    // Lock singletons — disallow delete and duplicate
    actions: (prev, { schemaType }) => {
      if (SINGLETON_TYPES.has(schemaType)) {
        return prev.filter(
          ({ action }) => action !== "delete" && action !== "duplicate"
        );
      }
      return prev;
    },
  },
});
