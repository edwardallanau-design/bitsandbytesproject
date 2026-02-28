import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
  },
  upload: {
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300 },
      { name: "card", width: 768, height: 512 },
      { name: "hero", width: 1440, height: undefined },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt text",
    },
  ],
};
