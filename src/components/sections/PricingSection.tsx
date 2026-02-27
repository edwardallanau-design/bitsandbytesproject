import Link from "next/link";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { PricingPlan } from "@/types/sanity";

interface PricingSectionProps {
  plans: PricingPlan[];
  showHeader?: boolean;
}

export function PricingSection({ plans, showHeader = true }: PricingSectionProps) {
  if (plans.length === 0) return null;

  return (
    <SectionWrapper className="bg-white">
      {showHeader && (
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Transparent pricing
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-neutral-500">
            No hidden fees. Pick the plan that fits your business.
          </p>
        </div>
      )}

      <div
        className={cn(
          "mx-auto grid gap-6",
          plans.length === 1
            ? "max-w-sm"
            : plans.length === 2
              ? "max-w-2xl grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={cn(
              "relative flex flex-col rounded-2xl p-8",
              plan.isPopular
                ? "bg-neutral-950 text-white ring-1 ring-neutral-700 shadow-2xl"
                : "border border-neutral-200 bg-white"
            )}
          >
            {plan.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-neutral-900 shadow-sm ring-1 ring-neutral-200">
                Most popular
              </span>
            )}

            <div className="mb-8">
              <h3
                className={cn(
                  "text-sm font-semibold uppercase tracking-widest",
                  plan.isPopular ? "text-neutral-400" : "text-neutral-500"
                )}
              >
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-4xl font-bold tracking-tight",
                    plan.isPopular ? "text-white" : "text-neutral-900"
                  )}
                >
                  {formatPrice(plan.price, plan.priceLabel, plan.billingPeriod)}
                </span>
                {plan.billingPeriod && !plan.priceLabel && (
                  <span
                    className={cn(
                      "text-sm",
                      plan.isPopular ? "text-neutral-500" : "text-neutral-400"
                    )}
                  >
                    /{plan.billingPeriod}
                  </span>
                )}
              </div>
            </div>

            {plan.features && plan.features.length > 0 && (
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 shrink-0 text-base leading-none",
                        feature.included
                          ? plan.isPopular
                            ? "text-neutral-300"
                            : "text-neutral-700"
                          : "text-neutral-600"
                      )}
                    >
                      {feature.included ? "✓" : "✗"}
                    </span>
                    <span
                      className={cn(
                        feature.included
                          ? plan.isPopular
                            ? "text-neutral-200"
                            : "text-neutral-700"
                          : plan.isPopular
                            ? "text-neutral-600 line-through"
                            : "text-neutral-400 line-through"
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {plan.ctaHref && plan.ctaLabel && (
              <Link
                href={plan.ctaHref}
                className={cn(
                  "mt-auto block w-full rounded-md py-2.5 text-center text-sm font-semibold transition-colors",
                  plan.isPopular
                    ? "bg-white text-neutral-950 hover:bg-neutral-200"
                    : "border border-neutral-300 text-neutral-700 hover:border-neutral-500 hover:text-neutral-900"
                )}
              >
                {plan.ctaLabel}
              </Link>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
