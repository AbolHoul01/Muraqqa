import { create } from "zustand";
import { persist } from "zustand/middleware";
import { temporal } from "zundo";
import {
  ResumeData,
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  ThemeSettings,
} from "@/types/resume";

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    github: "",
    linkedin: "",
  },
  workExperience: [],
  education: [],
  skills: [],
  themeSettings: {
    primaryColor: "#1A2B4C",
    fontFamily: "Vazirmatn",
    fontSize: "md",
    layoutDensity: "comfortable",
    direction: "rtl",
    templateId: "modern",
  },
};

export interface ResumeStoreState {
  resume: ResumeData;

  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Work Experience Actions
  addExperience: (exp: Omit<WorkExperience, "id">) => void;
  updateExperience: (id: string, exp: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;

  // Education Actions
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;

  // Skill Actions
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (startIndex: number, endIndex: number) => void;

  // Theme & General Actions
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  setResume: (resume: ResumeData) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStoreState>()(
  temporal(
    persist(
      (set) => ({
        resume: initialResumeData,

        updatePersonalInfo: (info) =>
          set((state) => ({
            resume: {
              ...state.resume,
              personalInfo: { ...state.resume.personalInfo, ...info },
            },
          })),

        addExperience: (exp) =>
          set((state) => ({
            resume: {
              ...state.resume,
              workExperience: [
                ...state.resume.workExperience,
                { ...exp, id: crypto.randomUUID() },
              ],
            },
          })),

        updateExperience: (id, exp) =>
          set((state) => ({
            resume: {
              ...state.resume,
              workExperience: state.resume.workExperience.map((item) =>
                item.id === id ? { ...item, ...exp } : item
              ),
            },
          })),

        removeExperience: (id) =>
          set((state) => ({
            resume: {
              ...state.resume,
              workExperience: state.resume.workExperience.filter(
                (item) => item.id !== id
              ),
            },
          })),

        reorderExperience: (startIndex, endIndex) =>
          set((state) => {
            const list = [...state.resume.workExperience];
            const [removed] = list.splice(startIndex, 1);
            if (removed) {
              list.splice(endIndex, 0, removed);
            }
            return {
              resume: {
                ...state.resume,
                workExperience: list,
              },
            };
          }),

        addEducation: (edu) =>
          set((state) => ({
            resume: {
              ...state.resume,
              education: [
                ...state.resume.education,
                { ...edu, id: crypto.randomUUID() },
              ],
            },
          })),

        updateEducation: (id, edu) =>
          set((state) => ({
            resume: {
              ...state.resume,
              education: state.resume.education.map((item) =>
                item.id === id ? { ...item, ...edu } : item
              ),
            },
          })),

        removeEducation: (id) =>
          set((state) => ({
            resume: {
              ...state.resume,
              education: state.resume.education.filter(
                (item) => item.id !== id
              ),
            },
          })),

        reorderEducation: (startIndex, endIndex) =>
          set((state) => {
            const list = [...state.resume.education];
            const [removed] = list.splice(startIndex, 1);
            if (removed) {
              list.splice(endIndex, 0, removed);
            }
            return {
              resume: {
                ...state.resume,
                education: list,
              },
            };
          }),

        addSkill: (skill) =>
          set((state) => ({
            resume: {
              ...state.resume,
              skills: [
                ...state.resume.skills,
                { ...skill, id: crypto.randomUUID() },
              ],
            },
          })),

        updateSkill: (id, skill) =>
          set((state) => ({
            resume: {
              ...state.resume,
              skills: state.resume.skills.map((item) =>
                item.id === id ? { ...item, ...skill } : item
              ),
            },
          })),

        removeSkill: (id) =>
          set((state) => ({
            resume: {
              ...state.resume,
              skills: state.resume.skills.filter((item) => item.id !== id),
            },
          })),

        reorderSkills: (startIndex, endIndex) =>
          set((state) => {
            const list = [...state.resume.skills];
            const [removed] = list.splice(startIndex, 1);
            if (removed) {
              list.splice(endIndex, 0, removed);
            }
            return {
              resume: {
                ...state.resume,
                skills: list,
              },
            };
          }),

        updateThemeSettings: (settings) =>
          set((state) => ({
            resume: {
              ...state.resume,
              themeSettings: { ...state.resume.themeSettings, ...settings },
            },
          })),

        setResume: (resume) => set({ resume }),

        resetResume: () => set({ resume: initialResumeData }),
      }),
      {
        name: "muraqqa-resume-storage",
        partialize: (state) => ({ resume: state.resume }),
      }
    ),
    {
      partialize: (state) => ({ resume: state.resume }),
    }
  )
);
