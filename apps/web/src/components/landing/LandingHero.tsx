import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { LandingContent, GITHUB_URL } from "@/content/landing";

interface LandingHeroProps {
  content: LandingContent["hero"];
  preview: LandingContent["heroPreview"];
  isRtl: boolean;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  content,
  preview,
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
            <h1 className="text-3xl sm:text-5xl lg:text-5.5xl font-extrabold tracking-tight text-muraqqa-navy leading-[1.2]">
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

          {/* Illustrative Stylized A4 Resume Preview Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div
              className="w-full max-w-md bg-white border border-gray-200/90 rounded-2xl shadow-xl p-6 sm:p-7 text-start transition-all hover:shadow-2xl"
              aria-hidden="true"
            >
              {/* Header block mimicking ModernTemplate */}
              <div className="bg-muraqqa-navy text-white rounded-xl p-5 mb-5 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-lg text-white tracking-tight">
                    {preview.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-muraqqa-teal text-muraqqa-navy px-2 py-0.5 rounded">
                    A4 PDF
                  </span>
                </div>
                <div className="text-xs text-muraqqa-teal font-semibold">
                  {preview.role}
                </div>
                <div className="text-[11px] text-gray-300 mt-2 truncate">
                  {preview.contact}
                </div>
              </div>

              {/* Summary Section */}
              <div className="mb-5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muraqqa-slate mb-1.5">
                  {preview.summaryHeading}
                </div>
                <div className="bg-muraqqa-paper border-s-4 border-muraqqa-teal p-3 rounded text-[11px] text-muraqqa-navy leading-relaxed">
                  {preview.summary}
                </div>
              </div>

              {/* Work Experience Section */}
              <div className="mb-5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muraqqa-slate mb-2">
                  {preview.experienceHeading}
                </div>
                <div className="border-s-2 border-gray-200 ps-3.5 space-y-1">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-bold text-muraqqa-navy">
                      {preview.expRole}
                    </span>
                    <span className="text-[10px] text-muraqqa-slate font-medium">
                      {preview.expDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-muraqqa-slate font-semibold">
                    {preview.expCompany}
                  </div>
                  <div className="text-[11px] text-muraqqa-navy leading-relaxed pt-0.5">
                    {preview.expDesc}
                  </div>
                </div>
              </div>

              {/* Skills Pill Section */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muraqqa-slate mb-2">
                  {preview.skillsHeading}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {preview.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-semibold bg-muraqqa-paper text-muraqqa-navy border border-gray-200 px-2.5 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
