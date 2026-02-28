import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  hooks: {
    afterChange: [() => { revalidateTag("site-settings"); }],
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      label: "Site name",
    },
    {
      name: "tagline",
      type: "text",
      label: "Tagline",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo image",
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Social links",
      fields: [
        {
          name: "platform",
          type: "text",
          required: true,
          label: "Platform (e.g. Twitter, LinkedIn)",
        },
        {
          name: "url",
          type: "text",
          required: true,
          label: "URL",
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      label: "SEO defaults",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          label: "Default meta title",
        },
        {
          name: "metaDescription",
          type: "textarea",
          label: "Default meta description",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
          label: "Default OG image",
        },
      ],
    },
  ],
};
