import type { GlobalConfig } from "payload";
import { revalidateTag } from "next/cache";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  hooks: {
    afterChange: [() => { revalidateTag("home-page"); }],
  },
  fields: [
    {
      name: "heroHeadline",
      type: "text",
      required: true,
      label: "Hero headline",
    },
    {
      name: "heroSubheadline",
      type: "textarea",
      label: "Hero subheadline",
    },
    {
      name: "heroCTA",
      type: "group",
      label: "Hero CTA button",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Button label",
        },
        {
          name: "href",
          type: "text",
          label: "Button URL",
        },
      ],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Hero image",
    },
    {
      name: "heroVariant",
      type: "radio",
      label: "Hero layout variant",
      options: [
        { label: "Centered (text + image stacked)", value: "centered" },
        { label: "Split — image on the right", value: "split-right" },
        { label: "Split — image on the left", value: "split-left" },
      ],
      defaultValue: "centered",
    },
    {
      name: "showServicesSection",
      type: "checkbox",
      defaultValue: true,
      label: "Show Services section",
    },
    {
      name: "showFeaturedWork",
      type: "checkbox",
      defaultValue: true,
      label: "Show Featured Work section",
    },
    {
      name: "showTestimonials",
      type: "checkbox",
      defaultValue: true,
      label: "Show Testimonials section",
    },
  ],
};
