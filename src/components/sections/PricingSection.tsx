import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { PricingPlan } from "@/types/sanity";

interface PricingSectionProps {
  plans: PricingPlan[];
}

export function PricingSection({ plans }: PricingSectionProps) {
  if (plans.length === 0) return null;

  return (
    <SectionWrapper>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
          Pricing
        </h2>
        <p className="mt-4 text-lg text-neutral-600">
          Transparent pricing. No surprises.
        </p>
      </div>

      <div
        className={cn(
          "mx-auto grid gap-8",
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
              "relative flex flex-col rounded-2xl border p-8",
              plan.isPopular
                ? "border-brand-500 bg-brand-500 text-white shadow-xl shadow-brand-500/20"
                : "border-neutral-200 bg-white"
            )}
          >
            {plan.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-brand-600 shadow">
                Most popular
              </span>
            )}

            <div className="mb-6">
              <h3
                className={cn(
                  "text-lg font-semibold",
                  plan.isPopular ? "text-white" : "text-neutral-900"
                )}
              >
                {plan.name}
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-4xl font-bold",
                    plan.isPopular ? "text-white" : "text-neutral-900"
                  )}
                >
                  {formatPrice(plan.price, plan.priceLabel, plan.billingPeriod)}
                </span>
                {plan.billingPeriod && !plan.priceLabel && (
                  <span
                    className={cn(
                      "text-sm",
                      plan.isPopular ? "text-brand-100" : "text-neutral-500"
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
                        "mt-0.5 text-base leading-none",
                        feature.included
                          ? plan.isPopular
                            ? "text-white"
                            : "text-brand-500"
                          : plan.isPopular
                            ? "text-brand-300"
                            : "text-neutral-300"
                      )}
                    >
                      {feature.included ? "✓" : "✗"}
                    </span>
                    <span
                      className={cn(
                        feature.included
                          ? plan.isPopular
                            ? "text-white"
                            : "text-neutral-700"
                          : plan.isPopular
                            ? "text-brand-200 line-through"
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
              <Button
                asChild
                variant={plan.isPopular ? "secondary" : "default"}
                className="mt-auto w-full"
              >
                <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
              </Button>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
