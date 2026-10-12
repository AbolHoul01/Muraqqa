import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LandingContent } from "@/content/landing";

interface LandingFooterProps {
  content: LandingContent["footer"];
  brand: {
    name: string;
    taglineBadge: string;
  };
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  content,
  brand,
}) => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-start">
          {/* Brand & Mission Column */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
                aria-hidden="true"
              />
              <span className="text-xl font-bold tracking-tight text-muraqqa-navy">
                {brand.name}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-muraqqa-teal/15 text-muraqqa-navy">
                {brand.taglineBadge}
              </span>
            </div>
            <p className="text-sm text-muraqqa-slate max-w-md leading-relaxed">
              {content.description}
            </p>
            <p className="text-xs text-muraqqa-slate font-medium pt-1">
              {content.license}
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muraqqa-navy">
              {content.linksHeading}
            </h3>
            <ul className="space-y-2">
              {content.links.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muraqqa-slate hover:text-muraqqa-navy transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal rounded"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muraqqa-slate hover:text-muraqqa-navy transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal rounded"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muraqqa-slate text-start">
          <span>{content.builtWith}</span>
          <span className="opacity-80">
            © {new Date().getFullYear()} {brand.name}. MIT License.
          </span>
        </div>
      </div>
    </footer>
  );
};
