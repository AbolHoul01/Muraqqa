import React from "react";
import Link from "next/link";
import { Languages } from "lucide-react";
import { NavLink, Language } from "@/content/landing";

interface LandingNavbarProps {
  brand: {
    name: string;
    taglineBadge: string;
  };
  nav: {
    links: NavLink[];
    cta: string;
    langToggle: string;
  };
  currentLang: Language;
  onToggleLang: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  brand,
  nav,
  currentLang,
  onToggleLang,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-muraqqa-navy hover:opacity-90 transition-opacity focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal rounded-md"
          >
            {brand.name}
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-muraqqa-teal/15 text-muraqqa-navy">
            {brand.taglineBadge}
          </span>
        </div>

        {/* Nav Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6"
        >
          {nav.links.map((link) => {
            const isExternal = link.href.startsWith("http");
            return (
              <a
                key={link.href}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-muraqqa-slate hover:text-muraqqa-navy transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal rounded px-1.5 py-1"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions: Lang switch & CTA */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleLang}
            title={currentLang === "fa" ? "Switch to English" : "تغییر زبان به فارسی"}
            aria-label={currentLang === "fa" ? "Switch to English" : "تغییر زبان به فارسی"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-muraqqa-navy transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{nav.langToggle}</span>
          </button>

          <Link
            href="/builder"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-muraqqa-teal hover:opacity-90 text-muraqqa-navy text-xs sm:text-sm font-bold shadow-xs transition-opacity focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal"
          >
            {nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
};
