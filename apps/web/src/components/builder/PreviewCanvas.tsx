"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { TemplateRegistry } from "@/templates/registry";

export const PreviewCanvas: React.FC = () => {
  const resume = useResumeStore((state) => state.resume);
  const { themeSettings } = resume;

  const ActiveTemplate =
    TemplateRegistry[themeSettings.templateId] ?? TemplateRegistry.classic;

  return (
    <div className="w-full flex justify-center py-4">
      {/* Sticky A4 outer wrapper & print canvas target */}
      <div
        id="resume-a4-canvas"
        className="print-canvas w-[210mm] min-h-[297mm] bg-muraqqa-paper shadow-2xl rounded-sm p-10 transition-all border border-gray-200/80 font-sans"
        dir={themeSettings.direction}
      >
        <ActiveTemplate data={resume} />
      </div>
    </div>
  );
};
