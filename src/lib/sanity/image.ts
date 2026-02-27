import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { sanityClientPublic } from "./clientPublic";

const builder = imageUrlBuilder(sanityClientPublic);

/**
 * Helper that returns a Sanity image URL builder pre-configured with the
 * public client. Use this in components to generate optimised image URLs.
 *
 * @example
 * urlFor(image).width(800).auto("format").url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
