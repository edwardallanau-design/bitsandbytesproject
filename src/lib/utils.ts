import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely, resolving conflicts.
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a price in cents to a display string.
 * Returns the priceLabel override if provided.
 */
export function formatPrice(
  price?: number,
  priceLabel?: string,
  billingPeriod?: string
): string {
  if (priceLabel) return priceLabel;
  if (price === undefined) return "Contact us";
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price / 100);
  return billingPeriod === "monthly" ? `${formatted}/mo` : formatted;
}
