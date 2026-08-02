"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";

export const PreviewCanvas: React.FC = () => {
  const resume = useResumeStore((state) => state.resume);
  const { personalInfo, workExperience, education, skills, themeSettings } =
    resume;

  const isRtl = themeSettings.direction === "rtl";

  return (
    <div className="w-full flex justify-center py-4">
      {/* Sticky outer wrapper */}
      <div className="w-[210mm] min-h-[297mm] bg-muraqqa-paper shadow-2xl rounded-sm p-10 transition-all border border-gray-200/80 text-gray-800 text-sm font-sans"
        dir={themeSettings.direction}
      >
        {/* Header / Personal Info */}
        <header className="border-b-2 pb-6 mb-6" style={{ borderColor: themeSettings.primaryColor }}>
          <h1
            className="text-3xl font-extrabold text-start tracking-tight mb-1"
            style={{ color: themeSettings.primaryColor }}
          >
            {personalInfo.fullName || "Your Full Name"}
          </h1>

          {personalInfo.headline && (
            <p className="text-base font-semibold text-muraqqa-slate text-start mb-3">
              {personalInfo.headline}
            </p>
          )}

          {/* Contact Details Bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
            {personalInfo.email && (
              <span>{personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span>• {personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span>• {personalInfo.location}</span>
            )}
            {personalInfo.website && (
              <span>• {personalInfo.website}</span>
            )}
            {personalInfo.linkedin && (
              <span>• {personalInfo.linkedin}</span>
            )}
            {personalInfo.github && (
              <span>• {personalInfo.github}</span>
            )}
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <p className="mt-4 text-xs text-gray-700 leading-relaxed text-start">
              {personalInfo.summary}
            </p>
          )}
        </header>

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-lg font-bold text-start border-b pb-1 mb-3 uppercase tracking-wider text-xs"
              style={{ color: themeSettings.primaryColor, borderColor: `${themeSettings.primaryColor}33` }}
            >
              {isRtl ? "سوابق شغلی" : "Work Experience"}
            </h2>

            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id} className="text-start">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-bold text-gray-900 text-sm">
                      {exp.position || "Position"}{" "}
                      {exp.company && <span className="font-medium text-gray-600">@ {exp.company}</span>}
                    </span>
                    <span className="text-xs font-mono text-muraqqa-slate text-end ms-auto">
                      {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? "—" : ""}{" "}
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
          <section className="mb-6">
            <h2
              className="text-lg font-bold text-start border-b pb-1 mb-3 uppercase tracking-wider text-xs"
              style={{ color: themeSettings.primaryColor, borderColor: `${themeSettings.primaryColor}33` }}
            >
              {isRtl ? "تحصیلات" : "Education"}
            </h2>

            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-start">
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
          <section className="mb-6">
            <h2
              className="text-lg font-bold text-start border-b pb-1 mb-3 uppercase tracking-wider text-xs"
              style={{ color: themeSettings.primaryColor, borderColor: `${themeSettings.primaryColor}33` }}
            >
              {isRtl ? "مهارت‌ها" : "Skills"}
            </h2>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-200/60 text-gray-800"
                >
                  {skill.name}{" "}
                  {skill.level && (
                    <span className="text-[10px] opacity-70">({skill.level})</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
