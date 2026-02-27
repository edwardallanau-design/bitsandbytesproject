import type { Metadata } from "next";

import { BlogGrid } from "@/components/sections/BlogGrid";
import { getAllPosts } from "@/lib/sanity/queries/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights and practical advice on digital transformation for small businesses.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      {/* Page hero */}
      <div className="bg-neutral-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Insights
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            Practical insights on digital transformation.
          </p>
        </div>
      </div>

      <BlogGrid posts={posts} showAll showHeader={false} />
    </>
  );
}
