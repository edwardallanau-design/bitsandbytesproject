import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RichText } from "@payloadcms/richtext-lexical/react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import {
  getAllPortfolioSlugs,
  getPortfolioItemBySlug,
} from "@/lib/payload/queries";

export async function generateStaticParams() {
  const slugs = await getAllPortfolioSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.shortDescription,
  };
}

export default async function WorkItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);

  if (!item) notFound();

  return (
    <>
      {/* Project hero */}
      <div className="bg-neutral-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/work"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-white"
          >
            ← Back to Work
          </Link>

          <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            {item.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            {item.clientName && <span>{item.clientName}</span>}
            {item.year && (
              <>
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <span>{item.year}</span>
              </>
            )}
            {item.liveUrl && (
              <>
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 transition-colors hover:text-white hover:underline"
                >
                  Visit site →
                </a>
              </>
            )}
          </div>

          {item.tags && item.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-700 px-3 py-0.5 text-xs font-medium text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project content */}
      <SectionWrapper className="bg-white">
        <div className="mx-auto max-w-4xl">
          {item.coverImage?.url && (
            <div className="mb-12 overflow-hidden rounded-2xl">
              <Image
                src={item.coverImage.url}
                alt={item.coverImage.alt}
                width={1200}
                height={675}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          {item.description ? (
            <div className="prose prose-neutral max-w-none">
              <RichText data={item.description} />
            </div>
          ) : item.shortDescription ? (
            <p className="text-lg leading-relaxed text-neutral-600">
              {item.shortDescription}
            </p>
          ) : null}
        </div>
      </SectionWrapper>
    </>
  );
}
