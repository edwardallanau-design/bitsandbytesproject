import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableText } from "@/components/ui/PortableText";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getAllPostSlugs, getPostBySlug } from "@/lib/sanity/queries/blog";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      {/* Article hero */}
      <div className="bg-neutral-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-white"
          >
            ← Back to Blog
          </Link>

          {post.categories && post.categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-neutral-700 px-3 py-0.5 text-xs font-medium text-neutral-400"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex items-center gap-4 text-sm text-neutral-500">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            )}
            {post.author?.name && (
              <>
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <span>by {post.author.name}</span>
              </>
            )}
          </div>

          {post.excerpt && (
            <p className="mt-5 text-lg leading-relaxed text-neutral-400">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Article body */}
      <SectionWrapper className="bg-white">
        <div className="mx-auto max-w-3xl">
          {post.coverImage && (
            <div className="mb-12 overflow-hidden rounded-2xl">
              <SanityImage
                image={post.coverImage}
                width={1200}
                height={630}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          {post.body && post.body.length > 0 && (
            <PortableText value={post.body} />
          )}
        </div>
      </SectionWrapper>
    </>
  );
}
