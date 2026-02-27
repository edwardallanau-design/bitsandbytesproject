import Link from "next/link";

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
      <div className="mb-14">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Insights
        </p>
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          From the blog
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-neutral-500">
          Practical advice on digital transformation for small businesses.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:border-neutral-300 hover:shadow-md"
          >
            {post.coverImage && (
              <div className="aspect-video overflow-hidden bg-neutral-100">
                <SanityImage
                  image={post.coverImage}
                  width={600}
                  height={338}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-center justify-between">
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="text-xs text-neutral-400"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                )}
                {post.categories && post.categories.length > 0 && (
                  <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                    {post.categories[0]}
                  </span>
                )}
              </div>
              <h3 className="font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-600 line-clamp-2">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm leading-relaxed text-neutral-500 line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-auto pt-2">
                <span className="text-xs font-medium text-neutral-400 transition-colors group-hover:text-neutral-700">
                  Read article →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && (
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline"
          >
            Read all articles →
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
