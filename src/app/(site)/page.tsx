import type { Metadata } from "next";

import { BlogGrid } from "@/components/sections/BlogGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import {
  getHomePage,
  getFeaturedPosts,
  getFeaturedPortfolioItems,
  getAllServices,
  getFeaturedTestimonials,
} from "@/lib/payload/queries";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const [homePage, services, portfolioItems, posts, testimonials] =
    await Promise.all([
      getHomePage(),
      getAllServices(),
      getFeaturedPortfolioItems(),
      getFeaturedPosts(),
      getFeaturedTestimonials(),
    ]);

  if (!homePage) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-neutral-500">
        <p>Set up your home page in the Payload admin.</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection data={homePage} />

      {homePage.showServicesSection && <ServicesSection services={services} />}

      {homePage.showFeaturedWork && portfolioItems.length > 0 && (
        <PortfolioGrid items={portfolioItems} />
      )}

      {posts.length > 0 && <BlogGrid posts={posts} />}

      {homePage.showTestimonials && testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
    </>
  );
}
