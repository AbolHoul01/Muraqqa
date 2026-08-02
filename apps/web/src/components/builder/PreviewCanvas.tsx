"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { getTemplate } from "@/templates/registry";

export const PreviewCanvas: React.FC = () => {
  const resume = useResumeStore((state) => state.resume);
  const { themeSettings } = resume;

  const TemplateComponent = getTemplate(themeSettings.templateId);

  return (
    <div className="w-full flex justify-center py-4">
      {/* Sticky A4 outer wrapper & print canvas target */}
      <div
        id="resume-a4-canvas"
        className="print-canvas w-[210mm] min-h-[297mm] bg-muraqqa-paper shadow-2xl rounded-sm p-10 transition-all border border-gray-200/80 font-sans"
        dir={themeSettings.direction}
      >
        <TemplateComponent data={resume} />
      </div>
    </div>
  );
};
