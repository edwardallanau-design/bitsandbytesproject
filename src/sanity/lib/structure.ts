import type { StructureBuilder } from "sanity/structure";

/**
 * Custom Studio sidebar structure.
 *
 * Singletons (Site Settings, Home Page) are pinned at the top and link
 * directly to their document — no list view, no way to create duplicates.
 * All other document types appear as standard lists below.
 */
export function structure(S: StructureBuilder) {
  return S.list()
    .title("Content")
    .items([
      // Singletons — click straight into the document
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("homePage").documentId("homePage")),

      S.divider(),

      // Regular document types — auto-generated list views
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("portfolioItem").title("Portfolio"),
      S.documentTypeListItem("post").title("Blog Posts"),
      S.documentTypeListItem("pricingPlan").title("Pricing Plans"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("author").title("Authors"),
    ]);
}
