import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { PortfolioItem } from "@/types/sanity";

interface PortfolioGridProps {
  items: PortfolioItem[];
  showAll?: boolean;
}

export function PortfolioGrid({ items, showAll = false }: PortfolioGridProps) {
  if (items.length === 0) return null;

  return (
    <SectionWrapper>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Our work
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Projects that made a difference for our clients.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item._id}
            href={`/work/${item.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
          >
            {item.coverImage && (
              <div className="aspect-video overflow-hidden">
                <SanityImage
                  image={item.coverImage}
                  width={600}
                  height={338}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors">
                  {item.title}
                </h3>
                {item.clientName && (
                  <p className="text-sm text-neutral-500">{item.clientName}</p>
                )}
              </div>
              {item.shortDescription && (
                <p className="text-sm text-neutral-600 line-clamp-2">
                  {item.shortDescription}
                </p>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
          >
            View all projects →
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
