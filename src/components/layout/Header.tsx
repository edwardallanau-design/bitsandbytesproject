"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

interface HeaderProps {
  siteName?: string;
}

export function Header({ siteName = "Agency" }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-neutral-950 border-b border-neutral-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white hover:text-neutral-300 transition-colors"
        >
          {siteName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
          >
            Get in touch
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden rounded-md p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 pb-5 pt-3">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-neutral-800 text-white"
                          : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 pt-4 border-t border-neutral-800">
              <Link
                href="/contact"
                className="block w-full rounded-md bg-white py-2.5 text-center text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200"
                onClick={() => setMobileOpen(false)}
              >
                Get in touch
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
