import Link from "next/link";

import type { SiteSettings } from "@/types";

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
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white hover:text-neutral-300 transition-colors"
            >
              {settings?.siteName ?? "Agency"}
            </Link>
            {settings?.tagline && (
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
                {settings.tagline}
              </p>
            )}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
            >
              Start a project →
            </Link>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-neutral-600">
              Navigate
            </p>
            <ul className="space-y-3">
              {FOOTER_NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
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
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-neutral-600">
                Follow us
              </p>
              <ul className="space-y-3">
                {settings.socialLinks.map(({ platform, url }) => (
                  <li key={platform}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm capitalize text-neutral-400 transition-colors hover:text-white"
                    >
                      {platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-800 py-6 sm:flex-row">
          <p className="text-xs text-neutral-600">
            © {currentYear} {settings?.siteName ?? "Agency"}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-700">
            Built with Next.js & Payload
          </p>
        </div>
      </div>
    </footer>
  );
}
