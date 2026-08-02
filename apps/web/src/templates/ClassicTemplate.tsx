"use client";

import React from "react";
import { TemplateProps } from "./types";

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, workExperience, education, skills, themeSettings } =
    data;
  const isRtl = themeSettings.direction === "rtl";

  return (
    <div
      className="w-full text-gray-800 text-sm leading-relaxed"
      dir={themeSettings.direction}
    >
      {/* Header Section */}
      <header
        className="border-b-2 pb-5 mb-6 text-start"
        style={{ borderColor: themeSettings.primaryColor }}
      >
        <h1
          className="text-3xl font-extrabold tracking-tight mb-1"
          style={{ color: themeSettings.primaryColor }}
        >
          {personalInfo.fullName || "Your Full Name"}
        </h1>

        {personalInfo.headline && (
          <p className="text-base font-semibold text-muraqqa-slate mb-3">
            {personalInfo.headline}
          </p>
        )}

        {/* Contact details */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
        </div>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <p className="mt-4 text-xs text-gray-700 leading-relaxed">
            {personalInfo.summary}
          </p>
        )}
      </header>

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6 page-break-avoid">
          <h2
            className="text-sm font-bold border-b pb-1 mb-3 uppercase tracking-wider text-start"
            style={{
              color: themeSettings.primaryColor,
              borderColor: `${themeSettings.primaryColor}33`,
            }}
          >
            {isRtl ? "سوابق شغلی" : "Work Experience"}
          </h2>

          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="text-start page-break-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-gray-900 text-sm">
                    {exp.position || "Position"}{" "}
                    {exp.company && (
                      <span className="font-normal text-gray-600">
                        @ {exp.company}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-muraqqa-slate text-end ms-auto">
                    {exp.startDate}{" "}
                    {exp.startDate && (exp.endDate || exp.current) ? "—" : ""}{" "}
                    {exp.current ? (isRtl ? "اکنون" : "Present") : exp.endDate}
                  </span>
                </div>

                {exp.summary && (
                  <p className="text-xs text-gray-700 leading-relaxed mb-2">
                    {exp.summary}
                  </p>
                )}

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc ps-5 text-xs text-gray-700 space-y-1">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
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
            className="text-sm font-bold border-b pb-1 mb-3 uppercase tracking-wider text-start"
            style={{
              color: themeSettings.primaryColor,
              borderColor: `${themeSettings.primaryColor}33`,
            }}
          >
            {isRtl ? "تحصیلات" : "Education"}
          </h2>

          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-start page-break-avoid">
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
            className="text-sm font-bold border-b pb-1 mb-3 uppercase tracking-wider text-start"
            style={{
              color: themeSettings.primaryColor,
              borderColor: `${themeSettings.primaryColor}33`,
            }}
          >
            {isRtl ? "مهارت‌ها" : "Skills"}
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-2.5 py-1 rounded text-xs font-medium bg-gray-200/60 text-gray-800"
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
  );
};

export default ClassicTemplate;
