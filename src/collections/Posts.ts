import type { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "publishedAt", "featured", "updatedAt"],
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag("posts");
        if (doc?.slug) revalidateTag(`posts:${doc.slug}`);
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag("posts");
        if (doc?.slug) revalidateTag(`posts:${doc.slug}`);
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
      admin: { description: "URL slug — used in /blog/[slug]" },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "categories",
      type: "array",
      fields: [
        {
          name: "category",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "body",
      type: "richText",
      label: "Body (rich text)",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Featured on home page",
    },
  ],
};
