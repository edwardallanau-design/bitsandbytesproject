import { PortableText as PortableTextReact } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

import { urlFor } from "@/lib/sanity/image";

/**
 * Renders Sanity Portable Text content.
 *
 * Wrapped in a div with Tailwind Typography `prose` classes for
 * automatic, readable typographic styling of blog post bodies
 * and long-form content.
 */
export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline">
      <PortableTextReact
        value={value}
        components={{
          types: {
            image: ({ value }) => {
              if (!value?.asset?._ref) return null;
              const src = urlFor(value).width(1200).auto("format").url();
              return (
                <figure className="my-8">
                  <Image
                    src={src}
                    alt={value.alt ?? ""}
                    width={1200}
                    height={675}
                    className="rounded-xl"
                  />
                  {value.caption && (
                    <figcaption className="mt-2 text-center text-sm text-neutral-500">
                      {value.caption}
                    </figcaption>
                  )}
                </figure>
              );
            },
          },
        }}
      />
    </div>
  );
}
