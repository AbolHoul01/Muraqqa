"use client";

import React, { useState } from "react";
import { Language, landingContent } from "@/content/landing";
import { LandingNavbar } from "./LandingNavbar";
import { LandingHero } from "./LandingHero";
import { LandingFeatures } from "./LandingFeatures";
import { LandingHowItWorks } from "./LandingHowItWorks";
import { LandingCtaBand } from "./LandingCtaBand";
import { LandingFooter } from "./LandingFooter";

export const LandingShell: React.FC = () => {
  // Default language is Persian (fa / RTL). Avoid reading localStorage on first render to prevent hydration mismatch.
  const [lang, setLang] = useState<Language>("fa");

  const content = landingContent[lang];
  const isRtl = lang === "fa";


  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      lang={lang}
      className={`min-h-screen flex flex-col bg-muraqqa-paper text-muraqqa-navy selection:bg-muraqqa-teal selection:text-muraqqa-navy ${
        isRtl ? "font-persian" : "font-latin"
      }`}
    >
      <LandingNavbar
        brand={content.brand}
        nav={content.nav}
        currentLang={lang}
        onToggleLang={() => setLang((prev) => (prev === "fa" ? "en" : "fa"))}
      />
      <main className="flex-1">
        <LandingHero
          content={content.hero}
          showcase={content.showcase}
          isRtl={isRtl}
        />
        <LandingFeatures content={content.features} />
        <LandingHowItWorks content={content.howItWorks} />
        <LandingCtaBand content={content.ctaBand} isRtl={isRtl} />
      </main>
      <LandingFooter content={content.footer} brand={content.brand} />
    </div>
  );
};
