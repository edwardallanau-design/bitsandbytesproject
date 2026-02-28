import type { Metadata } from "next";

import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { getAllPortfolioItems } from "@/lib/payload/queries";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects we've delivered for our clients.",
};

export default async function WorkPage() {
  const items = await getAllPortfolioItems();

  return (
    <>
      {/* Page hero */}
      <div className="bg-neutral-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-600">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Our work
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            A selection of projects we&apos;re proud of.
          </p>
        </div>
      </div>

      <PortfolioGrid items={items} showAll showHeader={false} />
    </>
  );
}
