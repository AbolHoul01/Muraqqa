import React from "react";
import { ShieldCheck, FileCode2, Printer, Languages, LucideIcon } from "lucide-react";
import { LandingContent } from "@/content/landing";

interface LandingFeaturesProps {
  content: LandingContent["features"];
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  privacy: ShieldCheck,
  "open-source": FileCode2,
  "ats-export": Printer,
  "bilingual-rtl": Languages,
};

export const LandingFeatures: React.FC<LandingFeaturesProps> = ({ content }) => {
  return (
    <section id="features" className="py-16 sm:py-24 bg-white border-y border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-muraqqa-teal/15 text-muraqqa-navy border border-muraqqa-teal/30">
            {content.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-muraqqa-navy tracking-tight">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-muraqqa-slate leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mt-12 sm:mt-16">
          {content.items.map((item) => {
            const Icon = FEATURE_ICONS[item.id] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="bg-muraqqa-paper border border-gray-200 rounded-2xl p-6 sm:p-8 text-start transition-all duration-200 hover:shadow-md hover:border-muraqqa-teal/50 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-muraqqa-navy text-white flex items-center justify-center mb-5 shadow-xs">
                    <Icon className="w-6 h-6 text-muraqqa-teal" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-muraqqa-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muraqqa-slate leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
