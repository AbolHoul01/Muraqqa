import React from "react";
import { LandingContent } from "@/content/landing";

interface LandingHowItWorksProps {
  content: LandingContent["howItWorks"];
}

export const LandingHowItWorks: React.FC<LandingHowItWorksProps> = ({ content }) => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mt-12 sm:mt-16">
          {content.steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-start shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-black text-muraqqa-teal mb-4 font-mono select-none">
                  {step.number}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-muraqqa-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muraqqa-slate leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
