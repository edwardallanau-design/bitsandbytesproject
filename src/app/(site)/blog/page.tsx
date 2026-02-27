import type { Metadata } from "next";

import { BlogGrid } from "@/components/sections/BlogGrid";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
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
      <SectionWrapper size="sm" as="div">
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Practical insights on digital transformation.
        </p>
      </SectionWrapper>

      <BlogGrid posts={posts} showAll />
    </>
  );
}
