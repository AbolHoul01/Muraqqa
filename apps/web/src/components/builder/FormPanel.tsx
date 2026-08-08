"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { SortableCard } from "./SortableCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Palette,
  ChevronDown,
  Plus,
  Trash2,
} from "lucide-react";

type AccordionSection =
  | "personal"
  | "experience"
  | "education"
  | "skills"
  | "customization";

export const FormPanel: React.FC = () => {
  const [openSection, setOpenSection] = useState<AccordionSection>("personal");

  const resume = useResumeStore((state) => state.resume);
  const updatePersonalInfo = useResumeStore(
    (state) => state.updatePersonalInfo
  );
  const addExperience = useResumeStore((state) => state.addExperience);
  const updateExperience = useResumeStore((state) => state.updateExperience);
  const removeExperience = useResumeStore((state) => state.removeExperience);
  const reorderExperience = useResumeStore((state) => state.reorderExperience);

  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);
  const reorderEducation = useResumeStore((state) => state.reorderEducation);

  const addSkill = useResumeStore((state) => state.addSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);
  const reorderSkills = useResumeStore((state) => state.reorderSkills);

  const updateThemeSettings = useResumeStore(
    (state) => state.updateThemeSettings
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleSection = (section: AccordionSection) => {
    setOpenSection((prev) => (prev === section ? section : section));
  };

  const handleDragEndExp = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resume.workExperience.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = resume.workExperience.findIndex(
        (item) => item.id === over.id
      );
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderExperience(oldIndex, newIndex);
      }
    }
  };

  const handleDragEndEdu = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resume.education.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = resume.education.findIndex(
        (item) => item.id === over.id
      );
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderEducation(oldIndex, newIndex);
      }
    }
  };

  const handleDragEndSkill = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resume.skills.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = resume.skills.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderSkills(oldIndex, newIndex);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Personal Information */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("personal")}
          className="w-full px-5 py-4 flex items-center justify-between bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-start font-semibold text-muraqqa-navy"
          aria-expanded={openSection === "personal"}
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-muraqqa-teal" />
            <span>Personal Information</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muraqqa-slate transition-transform duration-200 ${
              openSection === "personal" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "personal" && (
          <div className="p-5 space-y-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.fullName}
                  onChange={(e) =>
                    updatePersonalInfo({ fullName: e.target.value })
                  }
                  placeholder="e.g. Ali Rezaei"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Headline / Title
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.headline}
                  onChange={(e) =>
                    updatePersonalInfo({ headline: e.target.value })
                  }
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={(e) =>
                    updatePersonalInfo({ email: e.target.value })
                  }
                  placeholder="ali@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={resume.personalInfo.phone}
                  onChange={(e) =>
                    updatePersonalInfo({ phone: e.target.value })
                  }
                  placeholder="+98 912 000 0000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.location}
                  onChange={(e) =>
                    updatePersonalInfo({ location: e.target.value })
                  }
                  placeholder="Tehran, Iran"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Website / Portfolio
                </label>
                <input
                  type="url"
                  value={resume.personalInfo.website}
                  onChange={(e) =>
                    updatePersonalInfo({ website: e.target.value })
                  }
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  GitHub
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.github || ""}
                  onChange={(e) =>
                    updatePersonalInfo({ github: e.target.value })
                  }
                  placeholder="github.com/username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={resume.personalInfo.linkedin || ""}
                  onChange={(e) =>
                    updatePersonalInfo({ linkedin: e.target.value })
                  }
                  placeholder="linkedin.com/in/username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                Professional Summary
              </label>
              <textarea
                rows={3}
                value={resume.personalInfo.summary}
                onChange={(e) =>
                  updatePersonalInfo({ summary: e.target.value })
                }
                placeholder="Brief summary of your expertise and achievements..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm resize-y"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Work Experience */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("experience")}
          className="w-full px-5 py-4 flex items-center justify-between bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-start font-semibold text-muraqqa-navy"
          aria-expanded={openSection === "experience"}
        >
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-muraqqa-teal" />
            <span>Work Experience ({resume.workExperience.length})</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muraqqa-slate transition-transform duration-200 ${
              openSection === "experience" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "experience" && (
          <div className="p-5 space-y-4 border-t border-gray-100">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndExp}
            >
              <SortableContext
                items={resume.workExperience.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {resume.workExperience.map((exp) => (
                  <SortableCard key={exp.id} id={exp.id}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="font-semibold text-muraqqa-navy text-sm">
                          {exp.position || "New Position"}{" "}
                          {exp.company && `at ${exp.company}`}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete Experience"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(exp.id, { company: e.target.value })
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Position / Title"
                          value={exp.position}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              position: e.target.value,
                            })
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Start Date (e.g. 2021)"
                          value={exp.startDate}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              startDate: e.target.value,
                            })
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          placeholder="End Date (or Present)"
                          value={exp.endDate}
                          disabled={exp.current}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              endDate: e.target.value,
                            })
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`current-exp-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) =>
                            updateExperience(exp.id, {
                              current: e.target.checked,
                              endDate: e.target.checked ? "Present" : "",
                            })
                          }
                          className="rounded text-muraqqa-teal focus:ring-muraqqa-teal"
                        />
                        <label
                          htmlFor={`current-exp-${exp.id}`}
                          className="text-xs text-muraqqa-slate"
                        >
                          I currently work here
                        </label>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Key responsibilities & accomplishments..."
                        value={exp.summary}
                        onChange={(e) =>
                          updateExperience(exp.id, { summary: e.target.value })
                        }
                        className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm resize-y"
                      />
                    </div>
                  </SortableCard>
                ))}
              </SortableContext>
            </DndContext>

            <button
              type="button"
              onClick={() =>
                addExperience({
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  summary: "",
                  highlights: [],
                })
              }
              className="w-full py-2.5 px-4 border-2 border-dashed border-muraqqa-teal/40 text-muraqqa-teal hover:bg-muraqqa-teal/5 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Work Experience</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Education */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("education")}
          className="w-full px-5 py-4 flex items-center justify-between bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-start font-semibold text-muraqqa-navy"
          aria-expanded={openSection === "education"}
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-muraqqa-teal" />
            <span>Education ({resume.education.length})</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muraqqa-slate transition-transform duration-200 ${
              openSection === "education" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "education" && (
          <div className="p-5 space-y-4 border-t border-gray-100">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndEdu}
            >
              <SortableContext
                items={resume.education.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {resume.education.map((edu) => (
                  <SortableCard key={edu.id} id={edu.id}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="font-semibold text-muraqqa-navy text-sm">
                          {edu.degree || "Degree"} {edu.institution && `at ${edu.institution}`}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete Education"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Institution / University"
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(edu.id, {
                              institution: e.target.value,
                            })
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Degree (e.g. B.Sc.)"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(edu.id, {
                              degree: e.target.value,
                            })
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Field of Study (e.g. Computer Science)"
                          value={edu.fieldOfStudy}
                          onChange={(e) =>
                            updateEducation(edu.id, {
                              fieldOfStudy: e.target.value,
                            })
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Graduation / End Date"
                          value={edu.endDate}
                          onChange={(e) =>
                            updateEducation(edu.id, {
                              endDate: e.target.value,
                            })
                          }
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </SortableCard>
                ))}
              </SortableContext>
            </DndContext>

            <button
              type="button"
              onClick={() =>
                addEducation({
                  institution: "",
                  degree: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                })
              }
              className="w-full py-2.5 px-4 border-2 border-dashed border-muraqqa-teal/40 text-muraqqa-teal hover:bg-muraqqa-teal/5 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Education</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. Skills */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("skills")}
          className="w-full px-5 py-4 flex items-center justify-between bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-start font-semibold text-muraqqa-navy"
          aria-expanded={openSection === "skills"}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-muraqqa-teal" />
            <span>Skills ({resume.skills.length})</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muraqqa-slate transition-transform duration-200 ${
              openSection === "skills" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "skills" && (
          <div className="p-5 space-y-4 border-t border-gray-100">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEndSkill}
            >
              <SortableContext
                items={resume.skills.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {resume.skills.map((skill) => (
                  <SortableCard key={skill.id} id={skill.id}>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Skill Name (e.g. React.js)"
                        value={skill.name}
                        onChange={(e) =>
                          updateSkill(skill.id, { name: e.target.value })
                        }
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                      />
                      <select
                        value={skill.level || "Intermediate"}
                        onChange={(e) =>
                          updateSkill(skill.id, { level: e.target.value })
                        }
                        className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </SortableCard>
                ))}
              </SortableContext>
            </DndContext>

            <button
              type="button"
              onClick={() =>
                addSkill({
                  name: "",
                  level: "Intermediate",
                  keywords: [],
                })
              }
              className="w-full py-2.5 px-4 border-2 border-dashed border-muraqqa-teal/40 text-muraqqa-teal hover:bg-muraqqa-teal/5 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Customization & Theme Settings */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection("customization")}
          className="w-full px-5 py-4 flex items-center justify-between bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-start font-semibold text-muraqqa-navy"
          aria-expanded={openSection === "customization"}
        >
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-muraqqa-teal" />
            <span>Theme & Document Customization</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muraqqa-slate transition-transform duration-200 ${
              openSection === "customization" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openSection === "customization" && (
          <div className="p-5 space-y-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Template Design
                </label>
                <select
                  value={resume.themeSettings.templateId}
                  onChange={(e) =>
                    updateThemeSettings({ templateId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm bg-white"
                >
                  <option value="classic">Classic Muraqqa</option>
                  <option value="modern">Modern Minimalist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Font Family
                </label>
                <select
                  value={resume.themeSettings.fontFamily}
                  onChange={(e) =>
                    updateThemeSettings({ fontFamily: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm bg-white"
                >
                  <option value="Vazirmatn">Vazirmatn (وزیرمتن - استاندارد)</option>
                  <option value="Sahel">Sahel (ساحل)</option>
                  <option value="Inter">Inter (اینتر - Latin)</option>
                  <option value="Roboto">Roboto (روبوتو - Latin)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Layout Density
                </label>
                <select
                  value={resume.themeSettings.layoutDensity}
                  onChange={(e) =>
                    updateThemeSettings({
                      layoutDensity: e.target.value as
                        | "compact"
                        | "comfortable"
                        | "spacious",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm bg-white"
                >
                  <option value="compact">Compact</option>
                  <option value="comfortable">Comfortable</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Primary Accent Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={resume.themeSettings.primaryColor}
                    onChange={(e) =>
                      updateThemeSettings({ primaryColor: e.target.value })
                    }
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={resume.themeSettings.primaryColor}
                    onChange={(e) =>
                      updateThemeSettings({ primaryColor: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muraqqa-slate mb-1">
                  Document Direction
                </label>
                <select
                  value={resume.themeSettings.direction}
                  onChange={(e) =>
                    updateThemeSettings({
                      direction: e.target.value as "rtl" | "ltr",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-muraqqa-teal focus:outline-hidden text-sm bg-white"
                >
                  <option value="rtl">RTL (Right to Left / Persian)</option>
                  <option value="ltr">LTR (Left to Right / English)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
