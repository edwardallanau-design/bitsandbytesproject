import { SanityImage } from "@/components/ui/SanityImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { Testimonial } from "@/types/sanity";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-neutral-200"}`}
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
    <SectionWrapper className="bg-neutral-50">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          What our clients say
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial._id}
            className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6"
          >
            {testimonial.rating && (
              <StarRating rating={testimonial.rating} />
            )}
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-neutral-700">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              {testimonial.avatar && (
                <SanityImage
                  image={testimonial.avatar}
                  width={48}
                  height={48}
                  fallbackAlt={testimonial.authorName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm font-semibold text-neutral-900">
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
