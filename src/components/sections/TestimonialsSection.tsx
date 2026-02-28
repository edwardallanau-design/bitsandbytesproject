import Image from "next/image";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-neutral-300" : "text-neutral-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <SectionWrapper className="bg-neutral-950">
      <div className="mb-14 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-600">
          Client stories
        </p>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          What our clients say
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="flex flex-col rounded-xl bg-neutral-900 p-7 ring-1 ring-neutral-800"
          >
            {testimonial.rating && (
              <StarRating rating={testimonial.rating} />
            )}
            <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-neutral-300">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-neutral-800 pt-5">
              {testimonial.avatar?.url && (
                <Image
                  src={testimonial.avatar.url}
                  alt={testimonial.avatar.alt || testimonial.authorName}
                  width={48}
                  height={48}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-neutral-700"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-white">
                  {testimonial.authorName}
                </p>
                {(testimonial.role || testimonial.company) && (
                  <p className="text-xs text-neutral-500">
                    {[testimonial.role, testimonial.company]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionWrapper>
  );
}
