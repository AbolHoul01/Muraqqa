"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import {
  SHOWCASE_RESUMES,
  ShowcaseResume,
  ShowcaseAccent,
} from "@/content/landing-showcase";

interface AccentConfig {
  headerBg: string;
  headerText: string;
  badgeBg: string;
  badgeText: string;
  roleText: string;
  contactText: string;
  accentText: string;
  borderAccent: string;
  boxBg: string;
  pillBg: string;
  pillText: string;
  pillBorder: string;
  barBg: string;
  dotActive: string;
}

// Complete, static class names for Tailwind v4 scanner safety.
// Local accent colors (indigo, amber, rose, emerald) are defined here without polluting global tokens.
const ACCENTS: Record<ShowcaseAccent, AccentConfig> = {
  navy: {
    headerBg: "bg-muraqqa-navy",
    headerText: "text-white",
    badgeBg: "bg-muraqqa-teal",
    badgeText: "text-muraqqa-navy",
    roleText: "text-muraqqa-teal",
    contactText: "text-gray-300",
    accentText: "text-muraqqa-navy",
    borderAccent: "border-muraqqa-navy",
    boxBg: "bg-muraqqa-paper",
    pillBg: "bg-muraqqa-paper",
    pillText: "text-muraqqa-navy",
    pillBorder: "border-muraqqa-navy/20",
    barBg: "bg-muraqqa-navy",
    dotActive: "bg-muraqqa-navy",
  },
  teal: {
    headerBg: "bg-teal-700",
    headerText: "text-white",
    badgeBg: "bg-teal-100",
    badgeText: "text-teal-900",
    roleText: "text-teal-200",
    contactText: "text-teal-100",
    accentText: "text-teal-700",
    borderAccent: "border-teal-700",
    boxBg: "bg-teal-50/60",
    pillBg: "bg-teal-50",
    pillText: "text-teal-800",
    pillBorder: "border-teal-200",
    barBg: "bg-teal-700",
    dotActive: "bg-teal-700",
  },
  indigo: {
    headerBg: "bg-indigo-700",
    headerText: "text-white",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-900",
    roleText: "text-indigo-200",
    contactText: "text-indigo-100",
    accentText: "text-indigo-700",
    borderAccent: "border-indigo-700",
    boxBg: "bg-indigo-50/60",
    pillBg: "bg-indigo-50",
    pillText: "text-indigo-800",
    pillBorder: "border-indigo-200",
    barBg: "bg-indigo-700",
    dotActive: "bg-indigo-700",
  },
  amber: {
    headerBg: "bg-amber-700",
    headerText: "text-white",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-900",
    roleText: "text-amber-200",
    contactText: "text-amber-100",
    accentText: "text-amber-700",
    borderAccent: "border-amber-700",
    boxBg: "bg-amber-50/60",
    pillBg: "bg-amber-50",
    pillText: "text-amber-900",
    pillBorder: "border-amber-200",
    barBg: "bg-amber-700",
    dotActive: "bg-amber-700",
  },
  slate: {
    headerBg: "bg-slate-700",
    headerText: "text-white",
    badgeBg: "bg-slate-200",
    badgeText: "text-slate-900",
    roleText: "text-slate-300",
    contactText: "text-slate-200",
    accentText: "text-slate-700",
    borderAccent: "border-slate-700",
    boxBg: "bg-slate-50",
    pillBg: "bg-slate-100",
    pillText: "text-slate-800",
    pillBorder: "border-slate-300",
    barBg: "bg-slate-700",
    dotActive: "bg-slate-700",
  },
  rose: {
    headerBg: "bg-rose-700",
    headerText: "text-white",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-900",
    roleText: "text-rose-200",
    contactText: "text-rose-100",
    accentText: "text-rose-700",
    borderAccent: "border-rose-700",
    boxBg: "bg-rose-50/60",
    pillBg: "bg-rose-50",
    pillText: "text-rose-800",
    pillBorder: "border-rose-200",
    barBg: "bg-rose-700",
    dotActive: "bg-rose-700",
  },
  emerald: {
    headerBg: "bg-emerald-700",
    headerText: "text-white",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-900",
    roleText: "text-emerald-200",
    contactText: "text-emerald-100",
    accentText: "text-emerald-700",
    borderAccent: "border-emerald-700",
    boxBg: "bg-emerald-50/60",
    pillBg: "bg-emerald-50",
    pillText: "text-emerald-800",
    pillBorder: "border-emerald-200",
    barBg: "bg-emerald-700",
    dotActive: "bg-emerald-700",
  },
};

const emptySubscribe = () => () => {};

const subscribeReducedMotion = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

const subscribeVisibility = (onStoreChange: () => void) => {
  document.addEventListener("visibilitychange", onStoreChange);
  return () => document.removeEventListener("visibilitychange", onStoreChange);
};


interface ResumeShowcaseProps {
  dotAriaLabelTemplate: string;
  isRtl: boolean;
}

export const ResumeShowcase: React.FC<ResumeShowcaseProps> = ({
  dotAriaLabelTemplate,
  isRtl,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
  const isDocumentHidden = useSyncExternalStore(
    subscribeVisibility,
    () => document.hidden,
    () => false
  );

  const isPaused =
    !isMounted || isHovered || isFocused || isDocumentHidden || reducedMotion;

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_RESUMES.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, reducedMotion]);

  const totalNum = isRtl
    ? String(SHOWCASE_RESUMES.length).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
    : String(SHOWCASE_RESUMES.length);

  return (
    <div
      className="w-full max-w-md flex flex-col items-center select-none"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setIsHovered(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setIsHovered(false);
      }}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setIsFocused(false);
        }
      }}
    >
      {/* Decorative A4 Container (reserved aspect ratio prevents layout shift) */}
      <div
        className="relative w-full aspect-[210/297] @container"
        aria-hidden="true"
      >
        {/* Subtle ghost card hinting at paper stack */}
        <div
          className="absolute inset-0 translate-y-2 scale-[0.97] rounded-2xl bg-white/70 border border-gray-200/60 shadow-md -z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Stacked resume slides */}
        {SHOWCASE_RESUMES.map((resume, idx) => {
          const isActive = idx === currentIndex;
          return (
            <ResumeSlideCard
              key={resume.id}
              resume={resume}
              isActive={isActive}
              reducedMotion={reducedMotion}
            />
          );
        })}
      </div>

      {/* Accessible pagination dots */}
      <div
        className="flex items-center justify-center gap-2 mt-4 sm:mt-5"
        role="tablist"
      >
        {SHOWCASE_RESUMES.map((resume, idx) => {
          const isActive = idx === currentIndex;
          const currentNum = isRtl
            ? String(idx + 1).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
            : String(idx + 1);
          const ariaLabel = dotAriaLabelTemplate
            .replace("{current}", currentNum)
            .replace("{total}", totalNum);
          return (
            <button
              key={resume.id}
              type="button"
              role="tab"
              onClick={() => setCurrentIndex(idx)}
              aria-label={ariaLabel}
              aria-current={isActive ? "true" : undefined}
              aria-selected={isActive}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muraqqa-navy ${
                isActive
                  ? `w-7 ${ACCENTS[resume.accent].dotActive}`
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

interface ResumeSlideCardProps {
  resume: ShowcaseResume;
  isActive: boolean;
  reducedMotion: boolean;
}

const ResumeSlideCard: React.FC<ResumeSlideCardProps> = ({
  resume,
  isActive,
  reducedMotion,
}) => {
  const accent = ACCENTS[resume.accent];
  const isPersian = resume.lang === "fa";

  return (
    <div
      dir={resume.dir}
      lang={resume.lang}
      className={`absolute inset-0 w-full h-full bg-white rounded-2xl border border-gray-200/90 shadow-xl overflow-hidden p-[4.5cqw] text-start flex flex-col justify-between ${
        reducedMotion
          ? "transition-none"
          : "transition-all duration-500 ease-out motion-reduce:transition-none"
      } ${
        isActive
          ? "opacity-100 scale-100 translate-y-0 visible z-10 pointer-events-auto"
          : "opacity-0 scale-[0.98] translate-y-2 invisible z-0 pointer-events-none"
      } ${
        isPersian
          ? "font-[family-name:var(--font-vazirmatn)]"
          : "font-[family-name:var(--font-geist-sans)]"
      }`}
    >
      {resume.layout === "sidebar" ? (
        <SidebarLayout resume={resume} accent={accent} />
      ) : resume.layout === "classic" ? (
        <ClassicLayout resume={resume} accent={accent} />
      ) : resume.layout === "accent-line" ? (
        <AccentLineLayout resume={resume} accent={accent} />
      ) : resume.layout === "minimal" ? (
        <MinimalLayout resume={resume} accent={accent} />
      ) : (
        <ModernHeaderLayout resume={resume} accent={accent} />
      )}
    </div>
  );
};

interface LayoutComponentProps {
  resume: ShowcaseResume;
  accent: AccentConfig;
}

/* 1. Modern Header Layout (ModernTemplate style: navy/emerald top hero block) */
const ModernHeaderLayout: React.FC<LayoutComponentProps> = ({
  resume,
  accent,
}) => (
  <div className="flex flex-col h-full justify-between">
    {/* Header */}
    <div>
      <div className={`${accent.headerBg} ${accent.headerText} rounded-xl p-[3.2cqw] mb-[2.5cqw] shadow-2xs`}>
        <div className="flex items-center justify-between mb-[0.8cqw]">
          <span className="font-extrabold text-[4.2cqw] tracking-tight text-white leading-tight">
            {resume.name}
          </span>
          <span className={`text-[1.9cqw] font-bold uppercase tracking-wider px-[1.5cqw] py-[0.4cqw] rounded ${accent.badgeBg} ${accent.badgeText}`}>
            {resume.badge}
          </span>
        </div>
        <div className={`text-[2.6cqw] font-semibold ${accent.roleText}`}>
          {resume.role}
        </div>
        <div className={`text-[2.1cqw] mt-[0.8cqw] truncate ${accent.contactText}`}>
          {resume.contact}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-[2.5cqw]">
        <div className="text-[2cqw] font-bold uppercase tracking-wider text-muraqqa-slate mb-[0.8cqw]">
          {resume.summaryHeading}
        </div>
        <div className={`p-[2.2cqw] rounded-lg border-s-[3px] ${accent.borderAccent} ${accent.boxBg} text-[2.2cqw] text-muraqqa-navy leading-relaxed`}>
          {resume.summary}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="text-[2cqw] font-bold uppercase tracking-wider text-muraqqa-slate mb-[1cqw]">
          {resume.experienceHeading}
        </div>
        <div className="border-s-2 border-gray-200 ps-[2.2cqw] space-y-[1.6cqw]">
          {resume.experience.map((exp) => (
            <div key={exp.company} className="space-y-[0.3cqw]">
              <div className="flex items-baseline justify-between text-[2.4cqw]">
                <span className="font-bold text-muraqqa-navy">{exp.role}</span>
                <span className="text-[2cqw] text-muraqqa-slate font-medium">
                  {exp.period}
                </span>
              </div>
              <div className="text-[2.1cqw] text-muraqqa-slate font-semibold">
                {exp.company}
              </div>
              <div className="text-[2.1cqw] text-muraqqa-navy leading-normal">
                {exp.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Skills */}
    <div>
      <div className="text-[2cqw] font-bold uppercase tracking-wider text-muraqqa-slate mb-[0.8cqw]">
        {resume.skillsHeading}
      </div>
      <div className="flex flex-wrap gap-[1cqw]">
        {resume.skills.map((skill) => (
          <span
            key={skill.name}
            className={`text-[2cqw] font-semibold px-[1.8cqw] py-[0.6cqw] rounded-md border ${accent.pillBg} ${accent.pillText} ${accent.pillBorder}`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* 2. Sidebar Column Layout (Paria Afshar - UX) */
const SidebarLayout: React.FC<LayoutComponentProps> = ({ resume, accent }) => (
  <div className="flex h-full gap-[3cqw]">
    {/* Column 1: Sidebar with accent tint */}
    <div className={`w-[36%] flex-shrink-0 rounded-xl p-[2.8cqw] flex flex-col justify-between border ${accent.boxBg} ${accent.pillBorder}`}>
      <div>
        <span className={`inline-block text-[1.8cqw] font-bold uppercase tracking-wider px-[1.2cqw] py-[0.3cqw] rounded mb-[1.2cqw] ${accent.badgeBg} ${accent.badgeText}`}>
          {resume.badge}
        </span>
        <div className={`font-extrabold text-[3.6cqw] tracking-tight leading-tight ${accent.accentText}`}>
          {resume.name}
        </div>
        <div className="text-[2.3cqw] font-semibold text-muraqqa-slate mt-[0.6cqw] leading-tight">
          {resume.role}
        </div>
        <div className="text-[1.9cqw] text-gray-500 mt-[1.2cqw] leading-snug break-words">
          {resume.contact}
        </div>
      </div>

      <div>
        <div className="text-[1.9cqw] font-bold uppercase tracking-wider text-muraqqa-slate mb-[0.8cqw]">
          {resume.skillsHeading}
        </div>
        <div className="flex flex-col gap-[0.8cqw]">
          {resume.skills.map((skill) => (
            <span
              key={skill.name}
              className={`text-[1.9cqw] font-medium px-[1.4cqw] py-[0.5cqw] rounded bg-white border border-gray-200/80 shadow-2xs ${accent.accentText}`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Column 2: Main Timeline */}
    <div className="flex-1 flex flex-col justify-between py-[0.5cqw]">
      <div>
        {/* Summary */}
        <div className="mb-[2.2cqw]">
          <div className="text-[2cqw] font-bold uppercase tracking-wider text-muraqqa-slate mb-[0.6cqw]">
            {resume.summaryHeading}
          </div>
          <div className={`p-[2cqw] rounded-lg bg-gray-50 border-s-[3px] ${accent.borderAccent} text-[2.1cqw] text-muraqqa-navy leading-relaxed`}>
            {resume.summary}
          </div>
        </div>

        {/* Experience */}
        <div>
          <div className="text-[2cqw] font-bold uppercase tracking-wider text-muraqqa-slate mb-[1cqw]">
            {resume.experienceHeading}
          </div>
          <div className="border-s-2 border-gray-200 ps-[2cqw] space-y-[1.6cqw]">
            {resume.experience.map((exp) => (
              <div key={exp.company} className="space-y-[0.3cqw]">
                <div className="flex items-baseline justify-between text-[2.3cqw]">
                  <span className="font-bold text-muraqqa-navy">{exp.role}</span>
                  <span className="text-[1.9cqw] text-muraqqa-slate font-medium">
                    {exp.period}
                  </span>
                </div>
                <div className={`text-[2.1cqw] font-semibold ${accent.accentText}`}>
                  {exp.company}
                </div>
                <div className="text-[2cqw] text-muraqqa-navy leading-normal">
                  {exp.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* 3. Classic Layout (ClassicTemplate style: Marcus Vance - Educator) */
const ClassicLayout: React.FC<LayoutComponentProps> = ({ resume, accent }) => (
  <div className="flex flex-col h-full justify-between">
    <div>
      {/* Header */}
      <div className={`pb-[2cqw] border-b-2 ${accent.borderAccent} mb-[2cqw]`}>
        <div className="flex items-center justify-between mb-[0.4cqw]">
          <span className={`font-extrabold text-[4.3cqw] tracking-tight leading-tight ${accent.accentText}`}>
            {resume.name}
          </span>
          <span className={`text-[1.9cqw] font-bold uppercase tracking-wider px-[1.5cqw] py-[0.4cqw] rounded ${accent.badgeBg} ${accent.badgeText}`}>
            {resume.badge}
          </span>
        </div>
        <div className="text-[2.6cqw] font-semibold text-muraqqa-slate">
          {resume.role}
        </div>
        <div className="text-[2.1cqw] text-gray-600 mt-[0.6cqw]">
          {resume.contact}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-[2.2cqw]">
        <div className={`text-[2cqw] font-bold uppercase tracking-wider mb-[0.6cqw] ${accent.accentText}`}>
          {resume.summaryHeading}
        </div>
        <div className={`text-[2.2cqw] text-gray-700 leading-relaxed ps-[2cqw] border-s-2 ${accent.borderAccent}`}>
          {resume.summary}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className={`text-[2cqw] font-bold uppercase tracking-wider mb-[1cqw] ${accent.accentText}`}>
          {resume.experienceHeading}
        </div>
        <div className="space-y-[1.6cqw]">
          {resume.experience.map((exp) => (
            <div key={exp.company} className="space-y-[0.3cqw]">
              <div className="flex items-baseline justify-between text-[2.4cqw]">
                <span className="font-bold text-gray-900">{exp.role}</span>
                <span className="text-[2cqw] text-muraqqa-slate font-medium">
                  {exp.period}
                </span>
              </div>
              <div className="text-[2.1cqw] font-semibold text-muraqqa-slate">
                {exp.company}
              </div>
              <div className="text-[2.1cqw] text-gray-700 leading-normal">
                {exp.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Skills */}
    <div>
      <div className={`text-[2cqw] font-bold uppercase tracking-wider mb-[0.8cqw] ${accent.accentText}`}>
        {resume.skillsHeading}
      </div>
      <div className="flex flex-wrap gap-[1cqw]">
        {resume.skills.map((skill) => (
          <span
            key={skill.name}
            className={`text-[2cqw] font-semibold px-[1.8cqw] py-[0.6cqw] rounded-md border ${accent.pillBg} ${accent.pillText} ${accent.pillBorder}`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* 4. Accent Line Technical Layout (Kaveh Dadmehr - Civil Engineer) */
const AccentLineLayout: React.FC<LayoutComponentProps> = ({
  resume,
  accent,
}) => (
  <div className="flex flex-col h-full justify-between">
    <div>
      {/* Header with strong accent start-border */}
      <div className={`border-s-4 ${accent.borderAccent} ps-[2.5cqw] mb-[2.5cqw]`}>
        <div className="flex items-center justify-between mb-[0.4cqw]">
          <span className="font-bold text-[4.1cqw] text-gray-900 tracking-tight leading-tight">
            {resume.name}
          </span>
          <span className={`text-[1.9cqw] font-bold uppercase tracking-wider px-[1.5cqw] py-[0.4cqw] rounded ${accent.badgeBg} ${accent.badgeText}`}>
            {resume.badge}
          </span>
        </div>
        <div className={`text-[2.6cqw] font-semibold ${accent.accentText}`}>
          {resume.role}
        </div>
        <div className="text-[2.1cqw] text-muraqqa-slate mt-[0.6cqw]">
          {resume.contact}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-[2.2cqw]">
        <div className="text-[2cqw] font-bold uppercase tracking-wider text-muraqqa-slate mb-[0.6cqw]">
          {resume.summaryHeading}
        </div>
        <div className="p-[2.2cqw] rounded-lg bg-gray-50 border border-gray-200 text-[2.1cqw] text-gray-800 leading-relaxed">
          {resume.summary}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="text-[2cqw] font-bold uppercase tracking-wider text-muraqqa-slate mb-[1cqw]">
          {resume.experienceHeading}
        </div>
        <div className="space-y-[1.6cqw]">
          {resume.experience.map((exp) => (
            <div key={exp.company} className="space-y-[0.3cqw]">
              <div className="flex items-baseline justify-between text-[2.4cqw]">
                <span className="font-bold text-gray-900">{exp.role}</span>
                <span className="text-[2cqw] text-muraqqa-slate font-medium">
                  {exp.period}
                </span>
              </div>
              <div className={`text-[2.1cqw] font-semibold ${accent.accentText}`}>
                {exp.company}
              </div>
              <div className="text-[2.1cqw] text-gray-700 leading-normal">
                {exp.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Skills */}
    <div>
      <div className="text-[2cqw] font-bold uppercase tracking-wider text-muraqqa-slate mb-[0.8cqw]">
        {resume.skillsHeading}
      </div>
      <div className="flex flex-wrap gap-[1cqw]">
        {resume.skills.map((skill) => (
          <span
            key={skill.name}
            className={`text-[2cqw] font-semibold px-[1.8cqw] py-[0.6cqw] rounded-md border ${accent.pillBg} ${accent.pillText} ${accent.pillBorder}`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* 5. Minimal Layout with Skill Bars (Elena Rostova - Nurse) */
const MinimalLayout: React.FC<LayoutComponentProps> = ({ resume, accent }) => (
  <div className="flex flex-col h-full justify-between">
    <div>
      {/* Header */}
      <div className="pb-[2cqw] border-b border-gray-200 mb-[2cqw]">
        <div className="flex items-center justify-between mb-[0.4cqw]">
          <span className="font-semibold text-[4.1cqw] text-gray-900 tracking-tight leading-tight">
            {resume.name}
          </span>
          <span className={`text-[1.8cqw] font-medium px-[1.5cqw] py-[0.3cqw] rounded-full ${accent.badgeBg} ${accent.badgeText}`}>
            {resume.badge}
          </span>
        </div>
        <div className={`text-[2.5cqw] font-medium ${accent.accentText}`}>
          {resume.role}
        </div>
        <div className="text-[2cqw] text-gray-500 mt-[0.6cqw]">
          {resume.contact}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-[2.2cqw]">
        <div className="text-[1.9cqw] font-medium uppercase tracking-widest text-gray-400 mb-[0.6cqw]">
          {resume.summaryHeading}
        </div>
        <div className="text-[2.2cqw] text-gray-700 leading-relaxed">
          {resume.summary}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="text-[1.9cqw] font-medium uppercase tracking-widest text-gray-400 mb-[1cqw]">
          {resume.experienceHeading}
        </div>
        <div className="space-y-[1.6cqw]">
          {resume.experience.map((exp) => (
            <div key={exp.company} className="space-y-[0.3cqw]">
              <div className="flex items-baseline justify-between text-[2.3cqw]">
                <span className="font-semibold text-gray-900">{exp.role}</span>
                <span className="text-[1.9cqw] text-gray-400">{exp.period}</span>
              </div>
              <div className="text-[2cqw] text-gray-600">{exp.company}</div>
              <div className="text-[2cqw] text-gray-700 leading-normal">
                {exp.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Skills with skill bars */}
    <div>
      <div className="text-[1.9cqw] font-medium uppercase tracking-widest text-gray-400 mb-[0.8cqw]">
        {resume.skillsHeading}
      </div>
      <div className="grid grid-cols-2 gap-x-[3cqw] gap-y-[1cqw]">
        {resume.skills.map((skill) => (
          <div key={skill.name} className="flex flex-col gap-[0.4cqw]">
            <span className="text-[1.9cqw] font-medium text-gray-700 truncate">
              {skill.name}
            </span>
            <div className="w-full h-[0.7cqw] bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${accent.barBg}`}
                style={{ width: `${((skill.level ?? 4) / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
