import type { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "company", "rating", "featured"],
  },
  hooks: {
    afterChange: [() => { revalidateTag("testimonials"); }],
    afterDelete: [() => { revalidateTag("testimonials"); }],
  },
  fields: [
    {
      name: "authorName",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
    },
    {
      name: "company",
      type: "text",
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      label: "Rating (1–5)",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Featured on home page",
    },
  ],
};
