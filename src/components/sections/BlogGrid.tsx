import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { Post } from "@/types/sanity";

interface BlogGridProps {
  posts: Post[];
  showAll?: boolean;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export function BlogGrid({ posts, showAll = false }: BlogGridProps) {
  if (posts.length === 0) return null;

  return (
    <SectionWrapper className="bg-neutral-50">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Insights
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Practical advice on digital transformation for small businesses.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
          >
            {post.coverImage && (
              <div className="aspect-video overflow-hidden">
                <SanityImage
                  image={post.coverImage}
                  width={600}
                  height={338}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-5">
              {post.publishedAt && (
                <time
                  dateTime={post.publishedAt}
                  className="text-xs text-neutral-400"
                >
                  {formatDate(post.publishedAt)}
                </time>
              )}
              <h3 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-neutral-600 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              {post.categories && post.categories.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {post.categories.map((cat) => (
                    <Badge key={cat} variant="brand">
                      {cat}
                    </Badge>
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
            href="/blog"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
          >
            Read all articles →
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
