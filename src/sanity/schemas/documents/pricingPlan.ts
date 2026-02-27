import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricingPlan",
  title: "Pricing Plan",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Plan Name",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price (in cents)",
      description: "e.g. 9900 = $99.00. Leave empty if using a price label.",
    }),
    defineField({
      name: "priceLabel",
      title: "Price Label Override",
      type: "string",
      description:
        'e.g. "Custom" or "Starting at $2,000". Overrides numeric price if set.',
    }),
    defineField({
      name: "billingPeriod",
      title: "Billing Period",
      type: "string",
      options: {
        list: [
          { title: "Monthly", value: "monthly" },
          { title: "Annually", value: "annually" },
          { title: "One-time", value: "one-time" },
          { title: "Custom", value: "custom" },
        ],
      },
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "text",
              type: "string",
              title: "Feature",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "included",
              type: "boolean",
              title: "Included",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "text", included: "included" },
            prepare({ title, included }) {
              return { title: `${included ? "✓" : "✗"} ${title}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "isPopular",
      title: "Mark as Popular",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button URL",
      type: "string",
      description: "e.g. /contact",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
