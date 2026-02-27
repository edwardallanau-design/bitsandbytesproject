import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/Badge";
import { PortableText } from "@/components/ui/PortableText";
import { SanityImage } from "@/components/ui/SanityImage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import {
  getAllPortfolioSlugs,
  getPortfolioItemBySlug,
} from "@/lib/sanity/queries/portfolio";

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
    <SectionWrapper>
      <div className="mb-4">
        <Link
          href="/work"
          className="text-sm text-brand-600 hover:text-brand-700 hover:underline"
        >
          ← Back to Work
        </Link>
      </div>

      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900">{item.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            {item.clientName && <span>{item.clientName}</span>}
            {item.year && <span>{item.year}</span>}
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                Visit site →
              </a>
            )}
          </div>
          {item.tags && item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}
        </header>

        {item.coverImage && (
          <div className="mb-8 overflow-hidden rounded-2xl">
            <SanityImage
              image={item.coverImage}
              width={1200}
              height={675}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        {item.description && item.description.length > 0 ? (
          <PortableText value={item.description} />
        ) : item.shortDescription ? (
          <p className="text-lg text-neutral-700">{item.shortDescription}</p>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
