import type { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

export const PortfolioItems: CollectionConfig = {
  slug: "portfolio-items",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "clientName", "featured", "updatedAt"],
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag("portfolio-items");
        if (doc?.slug) revalidateTag(`portfolio-items:${doc.slug}`);
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag("portfolio-items");
        if (doc?.slug) revalidateTag(`portfolio-items:${doc.slug}`);
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL slug — used in /work/[slug]" },
    },
    {
      name: "clientName",
      type: "text",
    },
    {
      name: "year",
      type: "number",
    },
    {
      name: "shortDescription",
      type: "textarea",
    },
    {
      name: "description",
      type: "richText",
      label: "Full description (rich text)",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "liveUrl",
      type: "text",
      label: "Live URL",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Featured on home page",
    },
  ],
};
