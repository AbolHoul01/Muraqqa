import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { LandingContent, GITHUB_URL } from "@/content/landing";
import { ResumeShowcase } from "./ResumeShowcase";

interface LandingHeroProps {
  content: LandingContent["hero"];
  showcase: LandingContent["showcase"];
  isRtl: boolean;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  content,
  showcase,
  isRtl,
}) => {
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative py-12 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Copy Column */}
          <div className="lg:col-span-7 text-start space-y-6">
            {/* Privacy Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-muraqqa-teal/15 text-muraqqa-navy border border-muraqqa-teal/30">
              <ShieldCheck className="w-4 h-4 text-muraqqa-navy" aria-hidden="true" />
              <span>{content.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-muraqqa-navy leading-[1.2]">
              {content.title}
              <span className="block mt-2 text-muraqqa-slate font-bold text-2xl sm:text-4xl">
                {content.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muraqqa-slate leading-relaxed max-w-2xl">
              {content.subtitle}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-muraqqa-teal hover:opacity-90 text-muraqqa-navy font-bold text-base shadow-sm transition-opacity focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal"
              >
                <span>{content.primaryCta}</span>
                <ArrowIcon className="w-5 h-5" aria-hidden="true" />
              </Link>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-gray-50 text-muraqqa-navy border border-gray-300 font-semibold text-base shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal"
              >
                <svg
                  className="w-5 h-5 text-muraqqa-navy"
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

            {/* Trust note */}
            <div className="flex items-center gap-2 pt-2 text-xs text-muraqqa-slate font-medium">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muraqqa-teal/20 text-muraqqa-navy">
                <Check className="w-3 h-3" aria-hidden="true" />
              </span>
              <span>{content.note}</span>
            </div>
          </div>

          {/* Rotating Resume Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <ResumeShowcase
              dotAriaLabelTemplate={showcase.dotAriaLabel}
              isRtl={isRtl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
