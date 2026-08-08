"use client";

import React from "react";
import { TemplateProps } from "./types";

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperience, education, skills, themeSettings } =
    data;
  const isRtl = themeSettings.direction === "rtl";

  return (
    <div
      className="w-full text-gray-800 text-sm leading-relaxed"
      dir={themeSettings.direction}
    >
      {/* Header Block */}
      <header
        className="p-6 rounded-lg text-white mb-6 shadow-xs text-start"
        style={{ backgroundColor: themeSettings.primaryColor }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">
          {personalInfo.fullName || "Your Full Name"}
        </h1>

        {personalInfo.headline && (
          <p className="text-base font-medium opacity-90 mb-3">
            {personalInfo.headline}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs opacity-80 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6 text-start page-break-avoid">
          <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border-s-4" style={{ borderColor: themeSettings.primaryColor }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-start mb-3 text-muraqqa-slate"
          >
            {isRtl ? "سوابق شغلی" : "Work Experience"}
          </h2>

          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="text-start border-s-2 ps-4 py-1 page-break-avoid" style={{ borderColor: `${themeSettings.primaryColor}44` }}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-gray-900 text-sm">
                    {exp.position || "Position"}{" "}
                    {exp.company && (
                      <span className="font-normal text-gray-600">
                        @ {exp.company}
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-mono text-muraqqa-slate text-end ms-auto">
                    {exp.startDate}{" "}
                    {exp.startDate && (exp.endDate || exp.current) ? "—" : ""}{" "}
                    {exp.current ? (isRtl ? "اکنون" : "Present") : exp.endDate}
                  </span>
                </div>

                {exp.summary && (
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {exp.summary}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-start mb-3 text-muraqqa-slate"
          >
            {isRtl ? "تحصیلات" : "Education"}
          </h2>

          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-start border-s-2 ps-4 py-1 page-break-avoid" style={{ borderColor: `${themeSettings.primaryColor}44` }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900 text-sm">
                    {edu.degree || "Degree"}{" "}
                    {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                  </span>
                  <span className="text-xs font-mono text-muraqqa-slate text-end ms-auto">
                    {edu.endDate}
                  </span>
                </div>
                {edu.institution && (
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-start mb-3 text-muraqqa-slate"
          >
            {isRtl ? "مهارت‌ها" : "Skills"}
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: themeSettings.primaryColor }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
