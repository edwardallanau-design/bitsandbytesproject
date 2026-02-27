import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
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
    <SectionWrapper>
      <div className="mb-4">
        <Link
          href="/blog"
          className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>

      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {post.categories.map((cat) => (
                <Badge key={cat} variant="brand">
                  {cat}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            )}
            {post.author?.name && <span>by {post.author.name}</span>}
          </div>

          {post.excerpt && (
            <p className="mt-4 text-lg text-neutral-600">{post.excerpt}</p>
          )}
        </header>

        {post.coverImage && (
          <div className="mb-10 overflow-hidden rounded-2xl">
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
  );
}
