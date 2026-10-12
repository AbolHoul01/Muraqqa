export type ShowcaseAccent =
  | "navy"
  | "teal"
  | "indigo"
  | "amber"
  | "slate"
  | "rose"
  | "emerald";

export type ShowcaseLayout =
  | "modern-header"
  | "sidebar"
  | "classic"
  | "accent-line"
  | "minimal";

export interface ShowcaseSkill {
  name: string;
  level?: number; // 1 to 5 for skill bars
}

export interface ShowcaseExperience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export interface ShowcaseResume {
  id: string;
  lang: "en" | "fa";
  dir: "ltr" | "rtl";
  layout: ShowcaseLayout;
  accent: ShowcaseAccent;
  badge: string;
  name: string;
  role: string;
  contact: string;
  summaryHeading: string;
  summary: string;
  experienceHeading: string;
  experience: ShowcaseExperience[];
  skillsHeading: string;
  skills: ShowcaseSkill[];
}

export const SHOWCASE_RESUMES: ShowcaseResume[] = [
  {
    id: "alex-rivera-swe",
    lang: "en",
    dir: "ltr",
    layout: "modern-header",
    accent: "navy",
    badge: "Modern A4",
    name: "Alex Rivera",
    role: "Senior Frontend Engineer",
    contact: "alex.rivera@example.com • Berlin, DE",
    summaryHeading: "Summary",
    summary:
      "Specialized in scalable design systems, TypeScript architectures, and high-performance client applications.",
    experienceHeading: "Experience",
    experience: [
      {
        role: "Lead UI Engineer",
        company: "CloudPulse Systems",
        period: "2022 – Present",
        desc: "Architected component library adopted across 14 web products with strict accessibility compliance.",
      },
      {
        role: "Frontend Developer",
        company: "Apex Studio",
        period: "2019 – 2022",
        desc: "Built high-performance web dashboards with real-time data streaming and offline support.",
      },
    ],
    skillsHeading: "Skills",
    skills: [
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Design Systems" },
      { name: "Web Perf" },
    ],
  },
  {
    id: "paria-afshar-ux",
    lang: "fa",
    dir: "rtl",
    layout: "sidebar",
    accent: "indigo",
    badge: "طرح ستونی",
    name: "پریا افشار",
    role: "طراح ارشد تجربه کاربری",
    contact: "تهران • paria.afshar@example.com",
    summaryHeading: "درباره من",
    summary:
      "طراحی رابط‌های کاربری انسان‌محور و سیستم‌های دیزاین مقیاس‌پذیر برای محصولات سازمانی و فین‌تک.",
    experienceHeading: "سوابق شغلی",
    experience: [
      {
        role: "سرپرست طراحی محصول",
        company: "استودیو هورام",
        period: "۱۴۰۱ – اکنون",
        desc: "بازطراحی جامع تجربه کاربری با تمرکز بر دسترسی‌پذیری و ارتقای نرخ نگه‌داشت کاربران.",
      },
      {
        role: "طراح رابط کاربری",
        company: "سامانه باران",
        period: "۱۳۹۸ – ۱۴۰۱",
        desc: "ایجاد سیستم دیزاین چندپلتفرمی و پروتوتایپ‌های تعاملی برای بیش از ۲۰۰ هزار کاربر فعال.",
      },
    ],
    skillsHeading: "مهارت‌ها",
    skills: [
      { name: "سیستم دیزاین" },
      { name: "فیگما" },
      { name: "معماری اطلاعات" },
      { name: "تست کاربردپذیری" },
      { name: "پروتوتایپ" },
    ],
  },
  {
    id: "marcus-vance-edu",
    lang: "en",
    dir: "ltr",
    layout: "classic",
    accent: "amber",
    badge: "Classic A4",
    name: "Marcus Vance",
    role: "High School Physics Educator",
    contact: "m.vance@example.com • Chicago, IL",
    summaryHeading: "Profile",
    summary:
      "AP Physics instructor championing inquiry-driven laboratory curricula and student scientific inquiry.",
    experienceHeading: "Teaching Experience",
    experience: [
      {
        role: "Lead Physics Teacher",
        company: "Lincoln Preparatory",
        period: "2020 – Present",
        desc: "Guided 120+ students annually with a 92% pass rate in advanced placement science exams.",
      },
      {
        role: "Science Instructor",
        company: "Oakridge Academy",
        period: "2016 – 2020",
        desc: "Integrated interactive computational physics modules into secondary STEM curriculum.",
      },
    ],
    skillsHeading: "Expertise",
    skills: [
      { name: "Curriculum Design" },
      { name: "AP Physics" },
      { name: "STEM Outreach" },
      { name: "Lab Safety" },
      { name: "Python" },
    ],
  },
  {
    id: "kaveh-dadmehr-civil",
    lang: "fa",
    dir: "rtl",
    layout: "accent-line",
    accent: "slate",
    badge: "قالب فنی",
    name: "کاوه دادمهر",
    role: "مهندس ارشد محاسب سازه",
    contact: "اصفهان • kaveh.dadmehr@example.com",
    summaryHeading: "خلاصه حرفه‌ای",
    summary:
      "تحلیل و طراحی سازه‌های بتنی و فولادی بلندمرتبه با تکیه بر استانداردهای لرزه‌ای مدرن و بهینه‌سازی مصالح.",
    experienceHeading: "سوابق اجرایی",
    experience: [
      {
        role: "مدیر بخش محاسبات",
        company: "مهندسین مشاور البرز",
        period: "۱۴۰۰ – اکنون",
        desc: "مدلسازی دینامیکی و کنترل لرزه‌ای ۳ پروژه تجاری بزرگ‌مقیاس با نرم‌افزارهای تخصصی.",
      },
      {
        role: "کارشناس ارشد سازه",
        company: "گروه توسعه مانا",
        period: "۱۳۹۶ – ۱۴۰۰",
        desc: "بهینه‌سازی مصرف میلگرد و بتن در اسکلت‌های قاب خمشی با کاهش ۱۲٪ هزینه اجرایی.",
      },
    ],
    skillsHeading: "نرم‌افزارها و تخصص",
    skills: [
      { name: "ETABS" },
      { name: "SAP2000" },
      { name: "آیین‌نامه ۲۸۰۰" },
      { name: "مدلسازی BIM" },
      { name: "سازه بتنی" },
    ],
  },
  {
    id: "elena-rostova-nurse",
    lang: "en",
    dir: "ltr",
    layout: "minimal",
    accent: "rose",
    badge: "Minimalist",
    name: "Elena Rostova, RN",
    role: "Critical Care Nurse Specialist",
    contact: "e.rostova@example.com • Toronto, CA",
    summaryHeading: "Professional Summary",
    summary:
      "ICU specialist with rigorous expertise in emergency resuscitation, patient hemodynamic monitoring, and acute care.",
    experienceHeading: "Clinical Practice",
    experience: [
      {
        role: "Senior ICU Staff Nurse",
        company: "Metropolitan General",
        period: "2021 – Present",
        desc: "Directed intensive bedside interventions and interdisciplinary rounds in 24-bed ICU.",
      },
      {
        role: "Emergency Care Nurse",
        company: "Cityview Health",
        period: "2018 – 2021",
        desc: "Managed high-acuity triage and immediate life-support interventions in Level 1 Trauma.",
      },
    ],
    skillsHeading: "Clinical Competencies",
    skills: [
      { name: "Critical Care", level: 5 },
      { name: "Hemodynamic Monitoring", level: 5 },
      { name: "Rapid Triage", level: 4 },
      { name: "ACLS / BLS", level: 5 },
      { name: "EHR Systems", level: 4 },
    ],
  },
  {
    id: "niloofar-kiani-mkt",
    lang: "fa",
    dir: "rtl",
    layout: "modern-header",
    accent: "emerald",
    badge: "قالب پویا",
    name: "نیلوفر کیانی",
    role: "مدیر ارشد بازاریابی دیجیتال",
    contact: "شیراز • n.kiani@example.com",
    summaryHeading: "درباره من",
    summary:
      "تدوین استراتژی‌های رشد داده‌محور، بهینه‌سازی نرخ تبدیل و هدایت کمپین‌های چندکاناله بازاریابی دیجیتال.",
    experienceHeading: "تجربیات کاری",
    experience: [
      {
        role: "سرپرست بازاریابی رشد",
        company: "فناوری داده‌پارس",
        period: "۱۴۰۱ – اکنون",
        desc: "رشد ۱۶۰ درصدی سرنخ‌های ورودی ارگانیک با بهینه‌سازی ساختار قیف بازاریابی و اتوماسیون.",
      },
      {
        role: "مدیر بازاریابی محتوا",
        company: "آژانس دیجیتال افق",
        period: "۱۳۹۸ – ۱۴۰۱",
        desc: "هدایت تیم ۱۰ نفره تولید محتوا و رساندن ترافیک ماهانه به بیش از ۴۵۰ هزار کاربر یکتا.",
      },
    ],
    skillsHeading: "مهارت‌های کلیدی",
    skills: [
      { name: "سئو تکنیکال" },
      { name: "گوگل آنالیتیکس" },
      { name: "بازاریابی عملکردی" },
      { name: "اتوماسیون ایمیل" },
      { name: "بهینه‌سازی CRO" },
    ],
  },
];
