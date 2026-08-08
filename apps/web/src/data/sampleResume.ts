import { ResumeData } from "@/types/resume";

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: "سارا احمدی",
    headline: "توسعه‌دهنده ارشد فول‌استک | Senior Full-Stack Developer",
    email: "sara.ahmadi@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    location: "تهران، ایران",
    website: "https://saraahmadi.dev",
    summary:
      "توسعه‌دهنده وب با بیش از ۶ سال سابقه در طراحی و پیاده‌سازی سامانه‌های مقیاس‌پذیر مبتنی بر React، Next.js و Node.js. علاقمند به بهبود تجربه کاربری (UX)، بهینه‌سازی کارایی اپلیکیشن و معماری پاک.",
    github: "github.com/sara-ahmadi",
    linkedin: "linkedin.com/in/sara-ahmadi",
  },
  workExperience: [
    {
      id: "exp-1",
      company: "فن‌آوران پیشرو",
      position: "توسعه‌دهنده ارشد فرانت‌اند",
      location: "تهران",
      startDate: "۱۴۰۱",
      endDate: "",
      current: true,
      summary:
        "رهبری تیم فرانت‌اند ۵ نفره در طراحی مجدد پلتفرم پردازش ابری شرکت. کاهش زمان بارگذاری اولیه صفحه تا ۴۰٪ با استفاده از Next.js App Router و Server Components.",
      highlights: [
        "پیاده‌سازی سیستم دیزاین یکپارچه و بهینه‌سازی فونت‌ها",
        "معماری مدیریت استیت با Zustand و React Query",
      ],
    },
    {
      id: "exp-2",
      company: "استارت‌آپ نوآوران دیجیتال",
      position: "توسعه‌دهنده React & Node.js",
      location: "تهران",
      startDate: "۱۳۹۸",
      endDate: "۱۴۰۱",
      current: false,
      summary:
        "طراحی APIهای RESTful با Node.js و PostgreSQL و پیاده‌سازی داشборدهای تعاملی کاربر با React.",
      highlights: [
        "افزایش جذب کاربران فعال ماهانه تا ۲۵۰,۰۰۰ نفر",
        "طراحی سرویس احراز هویت امن با JWT",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "دانشگاه صنعتی شریف",
      degree: "کارشناسی ارشد",
      fieldOfStudy: "مهندسی نرم‌افزار",
      location: "تهران",
      startDate: "۱۳۹۶",
      endDate: "۱۳۹۸",
      current: false,
      score: "۱۸.۷۵",
    },
    {
      id: "edu-2",
      institution: "دانشگاه تهران",
      degree: "کارشناسی",
      fieldOfStudy: "مهندسی کامپیوتر",
      location: "تهران",
      startDate: "۱۳۹۲",
      endDate: "۱۳۹۶",
      current: false,
    },
  ],
  skills: [
    {
      id: "skill-1",
      name: "React & Next.js",
      level: "Expert",
      keywords: ["Frontend", "TypeScript", "SSR"],
    },
    {
      id: "skill-2",
      name: "TypeScript",
      level: "Expert",
      keywords: ["Language", "Typed JS"],
    },
    {
      id: "skill-3",
      name: "Node.js & Express",
      level: "Advanced",
      keywords: ["Backend", "REST API"],
    },
    {
      id: "skill-4",
      name: "TailwindCSS & UI Systems",
      level: "Expert",
      keywords: ["Styling", "CSS"],
    },
    {
      id: "skill-5",
      name: "PostgreSQL & Redis",
      level: "Intermediate",
      keywords: ["Database", "Caching"],
    },
    {
      id: "skill-6",
      name: "Docker & Git",
      level: "Advanced",
      keywords: ["DevOps", "Version Control"],
    },
  ],
  themeSettings: {
    primaryColor: "#1A2B4C",
    fontFamily: "Vazirmatn",
    fontSize: "md",
    layoutDensity: "comfortable",
    direction: "rtl",
    templateId: "modern",
  },
};
