import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  // Singleton enforcement is handled in sanity.config.ts via document.actions
  // and document.newDocumentOptions — no __experimental_actions needed.
  fields: [
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroCTA",
      title: "Hero CTA Button",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string", title: "Button Label" }),
        defineField({
          name: "href",
          type: "string",
          title: "Button URL",
          description: "e.g. /contact or /services",
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "heroVariant",
      title: "Hero Layout Variant",
      type: "string",
      options: {
        list: [
          { title: "Centered", value: "centered" },
          { title: "Split — Image Right", value: "split-right" },
          { title: "Split — Image Left", value: "split-left" },
        ],
        layout: "radio",
      },
      initialValue: "centered",
    }),
    defineField({
      name: "showServicesSection",
      title: "Show Services Section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showFeaturedWork",
      title: "Show Featured Work Section",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showTestimonials",
      title: "Show Testimonials Section",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
