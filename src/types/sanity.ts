import type { PortableTextBlock } from "@portabletext/types";

// ─── Shared primitives ──────────────────────────────────────────────────────

export interface SanityImageWithAlt {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

// ─── Singletons ─────────────────────────────────────────────────────────────

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  logo?: SanityImageWithAlt;
  socialLinks?: Array<{ platform: string; url: string }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImageWithAlt;
  };
}

export interface HomePage {
  heroHeadline: string;
  heroSubheadline?: string;
  heroCTA?: { label: string; href: string };
  heroImage?: SanityImageWithAlt;
  heroVariant?: "centered" | "split-right" | "split-left";
  showServicesSection?: boolean;
  showFeaturedWork?: boolean;
  showTestimonials?: boolean;
}

// ─── Documents ──────────────────────────────────────────────────────────────

export interface Service {
  _id: string;
  title: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  features?: string[];
}

export interface ServiceDetail extends Service {
  description?: PortableTextBlock[];
}

export interface PortfolioItem {
  _id: string;
  title: string;
  slug: string;
  clientName?: string;
  year?: number;
  shortDescription?: string;
  coverImage?: SanityImageWithAlt;
  tags?: string[];
  liveUrl?: string;
  featured?: boolean;
}

export interface PortfolioItemDetail extends PortfolioItem {
  description?: PortableTextBlock[];
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImageWithAlt;
  categories?: string[];
  featured?: boolean;
  author?: { name: string; avatar?: SanityImageWithAlt };
}

export interface PostDetail extends Post {
  body?: PortableTextBlock[];
}

export interface PricingPlan {
  _id: string;
  name: string;
  price?: number;
  priceLabel?: string;
  billingPeriod?: string;
  features?: Array<{ text: string; included: boolean }>;
  isPopular?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface Testimonial {
  _id: string;
  authorName: string;
  role?: string;
  company?: string;
  avatar?: SanityImageWithAlt;
  quote: string;
  rating?: number;
}
