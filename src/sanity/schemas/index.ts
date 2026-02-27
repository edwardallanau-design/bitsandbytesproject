import author from "./documents/author";
import portfolioItem from "./documents/portfolioItem";
import post from "./documents/post";
import pricingPlan from "./documents/pricingPlan";
import service from "./documents/service";
import testimonial from "./documents/testimonial";
import homePage from "./singletons/homePage";
import siteSettings from "./singletons/siteSettings";

export const schemaTypes = [
  // Singletons — appear at the top of the Studio sidebar
  siteSettings,
  homePage,
  // Documents
  service,
  portfolioItem,
  post,
  pricingPlan,
  testimonial,
  author,
];
