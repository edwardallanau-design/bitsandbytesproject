import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton enforcement is handled in sanity.config.ts via document.actions
  // and document.newDocumentOptions — no __experimental_actions needed.
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: [
                  { title: "Twitter / X", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Facebook", value: "facebook" },
                ],
              },
            }),
            defineField({ name: "url", type: "url", title: "URL" }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Defaults",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          type: "string",
          title: "Default Meta Title",
        }),
        defineField({
          name: "metaDescription",
          type: "text",
          title: "Default Meta Description",
          rows: 3,
        }),
        defineField({
          name: "ogImage",
          type: "image",
          title: "Default OG Image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
});
