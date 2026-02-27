import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Extra padding variant — defaults to "default" */
  size?: "sm" | "default" | "lg";
  as?: React.ElementType;
}

/**
 * Consistent max-width container and vertical padding for all page sections.
 * Use this as the outermost wrapper in every section component.
 */
export function SectionWrapper({
  children,
  className,
  size = "default",
  as: Component = "section",
}: SectionWrapperProps) {
  return (
    <Component
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8",
        {
          "py-12": size === "sm",
          "py-16 md:py-24": size === "default",
          "py-24 md:py-32": size === "lg",
        },
        className
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </Component>
  );
}
