import type { CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";

export const PricingPlans: CollectionConfig = {
  slug: "pricing-plans",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "isPopular", "order"],
  },
  hooks: {
    afterChange: [() => { revalidateTag("pricing-plans"); }],
    afterDelete: [() => { revalidateTag("pricing-plans"); }],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "price",
      type: "number",
      label: "Price (in cents, e.g. 4900 = $49)",
      admin: { description: "Leave empty to show a custom label or 'Contact us'" },
    },
    {
      name: "priceLabel",
      type: "text",
      label: "Price label override",
      admin: { description: "If set, displayed instead of the numeric price (e.g. 'Custom')" },
    },
    {
      name: "billingPeriod",
      type: "select",
      options: [
        { label: "Monthly", value: "monthly" },
        { label: "Annually", value: "annually" },
        { label: "One-time", value: "one-time" },
        { label: "Custom", value: "custom" },
      ],
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          label: "Feature description",
        },
        {
          name: "included",
          type: "checkbox",
          defaultValue: true,
          label: "Included in plan",
        },
      ],
    },
    {
      name: "isPopular",
      type: "checkbox",
      defaultValue: false,
      label: "Mark as most popular",
    },
    {
      name: "ctaLabel",
      type: "text",
      label: "CTA button label",
    },
    {
      name: "ctaHref",
      type: "text",
      label: "CTA button URL",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: { description: "Sort order — lower numbers appear first" },
    },
  ],
};
