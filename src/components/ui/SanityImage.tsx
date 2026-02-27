import Image, { type ImageProps } from "next/image";

import { urlFor } from "@/lib/sanity/image";
import type { SanityImageWithAlt } from "@/types/sanity";

interface SanityImageProps
  extends Omit<ImageProps, "src" | "alt" | "width" | "height"> {
  image: SanityImageWithAlt;
  width?: number;
  height?: number;
  /** Falls back to an empty string when no alt is provided */
  fallbackAlt?: string;
}

/**
 * Renders a Sanity image using next/image with automatic URL generation
 * via @sanity/image-url. Handles hotspot/crop automatically.
 *
 * Always prefer this component over a raw <img> tag for Sanity assets.
 */
export function SanityImage({
  image,
  width = 800,
  height = 600,
  fallbackAlt = "",
  className,
  ...props
}: SanityImageProps) {
  const src = urlFor(image).width(width).height(height).auto("format").url();

  return (
    <Image
      src={src}
      alt={image.alt ?? fallbackAlt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
}
