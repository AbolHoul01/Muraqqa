import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "نام و نام خانوادگی الزامی است"),
  headline: z.string().optional(),
  email: z.string().email("ایمیل وارد شده معتبر نیست").or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  summary: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
});

export const workExperienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "نام شرکت الزامی است"),
  position: z.string().min(1, "عنوان شغلی الزامی است"),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  summary: z.string().optional(),
  highlights: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "نام موسسه/دانشگاه الزامی است"),
  degree: z.string().min(1, "مقطع تحصیلی الزامی است"),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  score: z.string().optional(),
});

export const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "نام مهارت الزامی است"),
  level: z.string().optional(),
  keywords: z.array(z.string()).default([]),
});

export const themeSettingsSchema = z.object({
  primaryColor: z.string(),
  fontFamily: z.enum(["Vazirmatn", "Sahel", "Inter", "Roboto"]).or(z.string()),
  fontSize: z.enum(["sm", "md", "lg"]),
  layoutDensity: z.enum(["compact", "comfortable", "spacious"]),
  direction: z.enum(["rtl", "ltr"]),
  templateId: z.string(),
});

export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  workExperience: z.array(workExperienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  themeSettings: themeSettingsSchema,
});

export type ResumeValidationError = z.ZodFormattedError<
  z.infer<typeof resumeDataSchema>
>;
