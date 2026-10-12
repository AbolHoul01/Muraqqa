import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { LandingContent, GITHUB_URL } from "@/content/landing";

interface LandingCtaBandProps {
  content: LandingContent["ctaBand"];
  isRtl: boolean;
}

export const LandingCtaBand: React.FC<LandingCtaBandProps> = ({
  content,
  isRtl,
}) => {
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-16 sm:py-20 bg-muraqqa-navy text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {content.title}
        </h2>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          {content.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/builder"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-muraqqa-teal hover:opacity-90 text-muraqqa-navy font-bold text-base shadow-md transition-opacity focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>{content.primaryCta}</span>
            <ArrowIcon className="w-5 h-5" aria-hidden="true" />
          </Link>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>{content.secondaryCta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
