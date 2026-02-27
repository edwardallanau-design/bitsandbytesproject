import Link from "next/link";

import type { SiteSettings } from "@/types/sanity";

const FOOTER_NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

interface FooterProps {
  settings?: SiteSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-semibold text-neutral-900 hover:text-brand-600 transition-colors"
            >
              {settings?.siteName ?? "Agency"}
            </Link>
            {settings?.tagline && (
              <p className="mt-2 text-sm text-neutral-500">{settings.tagline}</p>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Navigation
            </p>
            <ul className="space-y-2">
              {FOOTER_NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          {settings?.socialLinks && settings.socialLinks.length > 0 && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Follow us
              </p>
              <ul className="space-y-2">
                {settings.socialLinks.map(({ platform, url }) => (
                  <li key={platform}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm capitalize text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-8 text-center text-xs text-neutral-400">
          © {currentYear} {settings?.siteName ?? "Agency"}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
