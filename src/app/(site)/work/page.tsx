import type { Metadata } from "next";

import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { getAllPortfolioItems } from "@/lib/sanity/queries/portfolio";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects we've delivered for our clients.",
};

export default async function WorkPage() {
  const items = await getAllPortfolioItems();

  return (
    <>
      <SectionWrapper size="sm" as="div">
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
          Our work
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          A selection of projects we&apos;re proud of.
        </p>
      </SectionWrapper>

      <PortfolioGrid items={items} showAll />
    </>
  );
}
