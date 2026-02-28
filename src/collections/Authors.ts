import type { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "createdAt"],
  },
  hooks: {
    afterChange: [() => { revalidateTag("authors"); }],
    afterDelete: [() => { revalidateTag("authors"); }],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: { description: "URL-safe identifier (auto-fill from name)" },
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
  ],
};
