import "server-only";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type {
  SiteSettings,
  HomePage,
  Service,
  PortfolioItem,
  Post,
  PricingPlan,
  Testimonial,
  MediaImage,
} from "@/types";

// ─── Payload client singleton ────────────────────────────────────────────────

let payloadInstance: Awaited<ReturnType<typeof getPayload>> | null = null;

async function getPayloadClient() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: configPromise });
  }
  return payloadInstance;
}

// ─── Media helpers ───────────────────────────────────────────────────────────

function toMediaImage(media: unknown): MediaImage | null {
  if (!media || typeof media !== "object") return null;
  const m = media as Record<string, unknown>;
  if (!m.url || typeof m.url !== "string") return null;
  return {
    url: m.url,
    alt: typeof m.alt === "string" ? m.alt : "",
    width: typeof m.width === "number" ? m.width : null,
    height: typeof m.height === "number" ? m.height : null,
  };
}

// ─── Globals ─────────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });
    if (!data?.siteName) return null;
    return {
      siteName: data.siteName,
      tagline: data.tagline ?? null,
      logo: toMediaImage(data.logo),
      socialLinks:
        data.socialLinks?.map((l: Record<string, unknown>) => ({
          platform: String(l.platform ?? ""),
          url: String(l.url ?? ""),
        })) ?? null,
      seo: data.seo
        ? {
            metaTitle: (data.seo as Record<string, unknown>).metaTitle as string ?? null,
            metaDescription: (data.seo as Record<string, unknown>).metaDescription as string ?? null,
            ogImage: toMediaImage((data.seo as Record<string, unknown>).ogImage),
          }
        : null,
    };
  } catch {
    return null;
  }
}

export async function getHomePage(): Promise<HomePage | null> {
  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: "home-page",
      depth: 1,
    });
    if (!data?.heroHeadline) return null;
    const cta = data.heroCTA as Record<string, unknown> | null | undefined;
    return {
      heroHeadline: data.heroHeadline,
      heroSubheadline: data.heroSubheadline ?? null,
      heroCTA: cta ? { label: cta.label as string ?? null, href: cta.href as string ?? null } : null,
      heroImage: toMediaImage(data.heroImage),
      heroVariant: (data.heroVariant as HomePage["heroVariant"]) ?? "centered",
      showServicesSection: data.showServicesSection ?? true,
      showFeaturedWork: data.showFeaturedWork ?? true,
      showTestimonials: data.showTestimonials ?? true,
    };
  } catch {
    return null;
  }
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function getAllServices(): Promise<Service[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "services",
      sort: "order",
      limit: 100,
    });
    return docs.map((doc) => ({
      id: String(doc.id),
      title: doc.title,
      slug: doc.slug ?? "",
      icon: doc.icon ?? null,
      shortDescription: doc.shortDescription ?? null,
      features:
        (doc.features as Array<{ feature?: string | null }> | null)
          ?.map((f) => f.feature ?? "")
          .filter(Boolean) ?? [],
    }));
  } catch {
    return [];
  }
}

export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "services",
      limit: 1000,
    });
    return docs.map((d) => d.slug ?? "").filter(Boolean);
  } catch {
    return [];
  }
}

// ─── Portfolio ───────────────────────────────────────────────────────────────

function toPortfolioItem(doc: Record<string, unknown>): PortfolioItem {
  return {
    id: String(doc.id),
    title: doc.title as string,
    slug: doc.slug as string ?? "",
    clientName: doc.clientName as string ?? null,
    year: doc.year as number ?? null,
    shortDescription: doc.shortDescription as string ?? null,
    coverImage: toMediaImage(doc.coverImage),
    tags:
      (doc.tags as Array<{ tag?: string | null }> | null)
        ?.map((t) => t.tag ?? "")
        .filter(Boolean) ?? [],
    liveUrl: doc.liveUrl as string ?? null,
    featured: doc.featured as boolean ?? null,
    description: doc.description ?? null,
  };
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "portfolio-items",
      sort: "-createdAt",
      limit: 100,
      depth: 1,
    });
    return docs.map((d) => toPortfolioItem(d as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "portfolio-items",
      where: { featured: { equals: true } },
      sort: "-createdAt",
      limit: 6,
      depth: 1,
    });
    return docs.map((d) => toPortfolioItem(d as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getPortfolioItemBySlug(
  slug: string
): Promise<PortfolioItem | null> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "portfolio-items",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    if (!docs[0]) return null;
    return toPortfolioItem(docs[0] as unknown as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getAllPortfolioSlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "portfolio-items",
      limit: 1000,
    });
    return docs.map((d) => (d.slug ?? "") as string).filter(Boolean);
  } catch {
    return [];
  }
}

// ─── Blog posts ───────────────────────────────────────────────────────────────

function toPost(doc: Record<string, unknown>): Post {
  const authorDoc = doc.author as Record<string, unknown> | null | undefined;
  return {
    id: String(doc.id),
    title: doc.title as string,
    slug: doc.slug as string ?? "",
    coverImage: toMediaImage(doc.coverImage),
    publishedAt: doc.publishedAt as string ?? null,
    excerpt: doc.excerpt as string ?? null,
    categories:
      (doc.categories as Array<{ category?: string | null }> | null)
        ?.map((c) => c.category ?? "")
        .filter(Boolean) ?? [],
    featured: doc.featured as boolean ?? null,
    body: doc.body ?? null,
    author: authorDoc?.name
      ? {
          name: authorDoc.name as string,
          avatar: toMediaImage(authorDoc.avatar),
        }
      : null,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      sort: "-publishedAt",
      limit: 100,
      depth: 2,
    });
    return docs.map((d) => toPost(d as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { featured: { equals: true } },
      sort: "-publishedAt",
      limit: 3,
      depth: 2,
    });
    return docs.map((d) => toPost(d as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    if (!docs[0]) return null;
    return toPost(docs[0] as unknown as Record<string, unknown>);
  } catch {
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      limit: 1000,
    });
    return docs.map((d) => (d.slug ?? "") as string).filter(Boolean);
  } catch {
    return [];
  }
}

// ─── Pricing plans ───────────────────────────────────────────────────────────

export async function getAllPricingPlans(): Promise<PricingPlan[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "pricing-plans",
      sort: "order",
      limit: 100,
    });
    return docs.map((doc) => ({
      id: String(doc.id),
      name: doc.name,
      price: doc.price ?? null,
      priceLabel: doc.priceLabel ?? null,
      billingPeriod: doc.billingPeriod ?? null,
      features:
        (doc.features as Array<{ text?: string | null; included?: boolean | null }> | null)
          ?.map((f) => ({
            text: f.text ?? "",
            included: f.included ?? true,
          })) ?? [],
      isPopular: doc.isPopular ?? null,
      ctaLabel: doc.ctaLabel ?? null,
      ctaHref: doc.ctaHref ?? null,
    }));
  } catch {
    return [];
  }
}

// ─── Testimonials ────────────────────────────────────────────────────────────

function toTestimonial(doc: Record<string, unknown>): Testimonial {
  return {
    id: String(doc.id),
    authorName: doc.authorName as string,
    role: doc.role as string ?? null,
    company: doc.company as string ?? null,
    avatar: toMediaImage(doc.avatar),
    quote: doc.quote as string,
    rating: doc.rating as number ?? null,
    featured: doc.featured as boolean ?? null,
  };
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "testimonials",
      limit: 100,
      depth: 1,
    });
    return docs.map((d) => toTestimonial(d as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "testimonials",
      where: { featured: { equals: true } },
      limit: 6,
      depth: 1,
    });
    return docs.map((d) => toTestimonial(d as unknown as Record<string, unknown>));
  } catch {
    return [];
  }
}
