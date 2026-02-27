import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Navigation } from "./Navigation";

interface HeaderProps {
  siteName?: string;
}

export function Header({ siteName = "Agency" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          {siteName}
        </Link>

        {/* Desktop navigation */}
        <Navigation className="hidden md:block" />

        {/* CTA */}
        <Button asChild size="sm">
          <Link href="/contact">Get in touch</Link>
        </Button>
      </div>
    </header>
  );
}
