import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role / Title",
    }),
    defineField({
      name: "company",
      type: "string",
      title: "Company",
    }),
    defineField({
      name: "avatar",
      type: "image",
      title: "Avatar",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "quote",
      type: "text",
      title: "Quote",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rating",
      type: "number",
      title: "Rating (1–5)",
      validation: (r) => r.min(1).max(5),
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
