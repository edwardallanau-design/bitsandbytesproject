/**
 * Application view types — decoupled from Payload internals.
 * Query functions map Payload documents to these types before passing to components.
 */

export interface MediaImage {
  url: string;
  alt: string;
  width?: number | null;
  height?: number | null;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string | null;
  logo?: MediaImage | null;
  socialLinks?: Array<{ platform: string; url: string }> | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: MediaImage | null;
  } | null;
}

export interface HomePage {
  heroHeadline: string;
  heroSubheadline?: string | null;
  heroCTA?: { label?: string | null; href?: string | null } | null;
  heroImage?: MediaImage | null;
  heroVariant?: "centered" | "split-right" | "split-left" | null;
  showServicesSection?: boolean | null;
  showFeaturedWork?: boolean | null;
  showTestimonials?: boolean | null;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon?: string | null;
  shortDescription?: string | null;
  features?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  clientName?: string | null;
  year?: number | null;
  shortDescription?: string | null;
  coverImage?: MediaImage | null;
  tags?: string[];
  liveUrl?: string | null;
  featured?: boolean | null;
  description?: unknown; // Lexical JSON — rendered by RichText component
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage?: MediaImage | null;
  publishedAt?: string | null;
  excerpt?: string | null;
  categories?: string[];
  featured?: boolean | null;
  body?: unknown; // Lexical JSON — rendered by RichText component
  author?: {
    name: string;
    avatar?: MediaImage | null;
  } | null;
}

export interface PricingPlan {
  id: string;
  name: string;
  price?: number | null;
  priceLabel?: string | null;
  billingPeriod?: string | null;
  features?: Array<{ text: string; included: boolean }>;
  isPopular?: boolean | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role?: string | null;
  company?: string | null;
  avatar?: MediaImage | null;
  quote: string;
  rating?: number | null;
  featured?: boolean | null;
}
