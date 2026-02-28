import type { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order", "updatedAt"],
  },
  hooks: {
    afterChange: [() => { revalidateTag("services"); }],
    afterDelete: [() => { revalidateTag("services"); }],
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
      admin: { description: "URL-safe identifier used for anchor navigation" },
    },
    {
      name: "icon",
      type: "text",
      admin: { description: "Lucide icon name (e.g. Globe, Zap, Layers)" },
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
      name: "features",
      type: "array",
      label: "Features",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Sort order — lower numbers appear first" },
    },
  ],
};
