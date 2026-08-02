/**
 * Personal Information matching JSON Resume 'basics' schema
 */
export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  github?: string;
  linkedin?: string;
}

/**
 * Work Experience entry matching JSON Resume 'work' schema
 */
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  summary: string;
  highlights: string[];
}

/**
 * Education entry matching JSON Resume 'education' schema
 */
export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  score?: string;
}

/**
 * Skill entry matching JSON Resume 'skills' schema
 */
export interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert" | string;
  keywords: string[];
}

/**
 * Customization and theme options for document layout & styling
 */
export interface ThemeSettings {
  primaryColor: string;
  fontFamily: "Inter" | "Vazirmatn" | "Roboto" | "Merriweather" | string;
  fontSize: "sm" | "md" | "lg";
  layoutDensity: "compact" | "comfortable" | "spacious";
  direction: "rtl" | "ltr";
  templateId: "modern" | "classic" | "minimal" | string;
}

/**
 * Complete root Resume Data model
 */
export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  themeSettings: ThemeSettings;
}
