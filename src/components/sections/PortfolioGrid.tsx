import Link from "next/link";

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
    <SectionWrapper className="bg-neutral-950">
      <div className="mb-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-600">
          Selected work
        </p>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Our work
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-neutral-400">
          Projects that made a real difference for our clients.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item._id}
            href={`/work/${item.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-neutral-800 transition-all hover:ring-neutral-600"
          >
            {item.coverImage && (
              <div className="aspect-video overflow-hidden">
                <SanityImage
                  image={item.coverImage}
                  width={600}
                  height={338}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div>
                <h3 className="font-semibold text-white transition-colors group-hover:text-neutral-300">
                  {item.title}
                </h3>
                {item.clientName && (
                  <p className="mt-0.5 text-sm text-neutral-500">
                    {item.clientName}
                  </p>
                )}
              </div>
              {item.shortDescription && (
                <p className="text-sm leading-relaxed text-neutral-400 line-clamp-2">
                  {item.shortDescription}
                </p>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-700 px-2.5 py-0.5 text-xs text-neutral-400"
                    >
                      {tag}
                    </span>
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
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-400 underline-offset-4 hover:text-white hover:underline"
          >
            View all projects →
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
