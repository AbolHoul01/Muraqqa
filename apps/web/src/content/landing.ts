/**
 * GitHub URL for Muraqqa repository.
 */
export const GITHUB_URL = "https://github.com/AbolHoul01/Muraqqa";

export type Language = "fa" | "en";

export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface LandingContent {
  brand: {
    name: string;
    taglineBadge: string;
  };
  nav: {
    links: NavLink[];
    cta: string;
    langToggle: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
  };
  showcase: {
    dotAriaLabel: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    steps: HowItWorksStep[];
  };
  ctaBand: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footer: {
    description: string;
    license: string;
    linksHeading: string;
    links: NavLink[];
    builtWith: string;
  };
}

export const landingContent: Record<Language, LandingContent> = {
  fa: {
    brand: {
      name: "مرقع | Muraqqa",
      taglineBadge: "حریم خصوصی محور",
    },
    nav: {
      links: [
        { label: "ویژگی‌ها", href: "#features" },
        { label: "نحوه کارکرد", href: "#how-it-works" },
        { label: "گیت‌هاب", href: GITHUB_URL },
      ],
      cta: "ورود به رزومه‌ساز",
      langToggle: "English",
    },
    hero: {
      badge: "رزومه‌ساز مدرن، رایگان و متن‌باز",
      title: "رزومه‌ای حرفه‌ای و زیبا بسازید؛",
      titleHighlight: "با امنیت کامل و بدون خروج اطلاعات",
      subtitle:
        "مرقع یک رزومه‌ساز مدرن با تمرکز بر حفظ کامل حریم خصوصی است. تمام داده‌ها در حافظه محلی مرورگر شما ذخیره شده و هیچ اطلاعاتی به سرور ارسال نمی‌شود.",
      primaryCta: "شروع ساخت رزومه",
      secondaryCta: "مشاهده در گیت‌هاب",
      note: "بدون نیاز به ثبت‌نام یا ایمیل • ذخیره‌سازی محلی در مرورگر",
    },
    showcase: {
      dotAriaLabel: "نمایش رزومه {current} از {total}",
    },
    features: {
      badge: "چرا مرقع؟",
      title: "ابزاری ساخته‌شده برای کنترل کامل شما بر اطلاعاتتان",
      subtitle:
        "از معماری ذخیره‌سازی بدون سرور تا خروجی دقیق چاپی، همه چیز برای تجربه‌ای روان، شفاف و حرفه‌ای طراحی شده است.",
      items: [
        {
          id: "privacy",
          title: "حفظ کامل حریم خصوصی",
          description:
            "داده‌های رزومه شما منحصراً در حافظه محلی (Local Storage) مرورگرتان ذخیره می‌شوند. هیچ داده‌ای به سرور فرستاده نشده و هیچ اسکریپت ردیابی وجود ندارد.",
        },
        {
          id: "open-source",
          title: "۱۰۰٪ متن‌باز و تحت مجوز MIT",
          description:
            "هیچ پرداخت پنهان، حق اشتراک یا قابلیتی قفل‌شده وجود ندارد. سورس‌کد پروژه کاملاً شفاف و در دسترس همگان است.",
        },
        {
          id: "ats-export",
          title: "خروجی چاپی A4 استاندارد بدون واترمارک",
          description:
            "خروجی مستقیم به PDF از طریق چاپ استاندارد مرورگر بر پایه ابعاد دقیق استاندارد A4، با ساختاری تمیز و سازگار با سیستم‌های ارزیابی رزومه (ATS).",
        },
        {
          id: "bilingual-rtl",
          title: "پشتیبانی بومی از فارسی و راست‌به‌چپ",
          description:
            "تایپوگرافی اصیل با قلم وزیرمتن و هماهنگی کامل چیدمان با خواص منطقی CSS برای سوییچ فوری میان زبان‌های فارسی و انگلیسی.",
        },
      ],
    },
    howItWorks: {
      badge: "مراحل ساخت",
      title: "سه گام ساده تا رزومه نهایی",
      subtitle: "بدون فرم‌های پیچیده، بدون انتظار، و با پیش‌نمایش درجا در هر مرحله.",
      steps: [
        {
          number: "۰۱",
          title: "اطلاعات خود را وارد کنید",
          description:
            "سوابق شغلی، تحصیلی، مهارت‌ها و مشخصات تماس را در بخش‌های مرتب پر کنید و تغییرات را لحظه‌ای ببینید.",
        },
        {
          number: "۰۲",
          title: "طرح و قالب را انتخاب کنید",
          description:
            "بین قالب‌های مدرن یا کلاسیک جابه‌جا شوید، رنگ سازمانی مورد نظر را تعیین کرده و جهت نوشتاری (RTL/LTR) را انتخاب کنید.",
        },
        {
          number: "۰۳",
          title: "چاپ کنید یا فایل پشتیبان بگیرید",
          description:
            "با یک کلیک نسخه PDF استاندارد A4 بدون واترمارک دریافت کنید یا فایل داده‌های رزومه را با فرمت JSON دانلود کرده و برای بعد نگه‌دارید.",
        },
      ],
    },
    ctaBand: {
      title: "همین حالا رزومه حرفه‌ای خود را بسازید",
      description:
        "رایگان، بدون نیاز به ثبت حساب کاربری، و با حفظ کامل مالکیت اطلاعات. مستقیماً در مرورگر خود شروع کنید.",
      primaryCta: "شروع ساخت رزومه در رزومه‌ساز",
      secondaryCta: "مشاهده پروژه در گیت‌هاب",
    },
    footer: {
      description:
        "مرقع (Muraqqa) — پلتفرم رزومه‌ساز آزاد، مدرن و متمرکز بر حریم خصوصی کاربر.",
      license: "منتشر شده تحت مجوز آزاد MIT",
      linksHeading: "بخش‌ها",
      links: [
        { label: "رزومه‌ساز", href: "/builder" },
        { label: "ویژگی‌ها", href: "#features" },
        { label: "نحوه کارکرد", href: "#how-it-works" },
        { label: "گیت‌هاب", href: GITHUB_URL },
      ],
      builtWith: "توسعه داده شده برای جامعه نرم‌افزار آزاد",
    },
  },
  en: {
    brand: {
      name: "Muraqqa | مرقع",
      taglineBadge: "Privacy-First",
    },
    nav: {
      links: [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "GitHub", href: GITHUB_URL },
      ],
      cta: "Open Builder",
      langToggle: "فارسی",
    },
    hero: {
      badge: "Modern, Free & Open-Source Resume Builder",
      title: "Build a polished, professional resume",
      titleHighlight: "with strict privacy and zero tracking",
      subtitle:
        "Muraqqa is an open-source CV builder designed around your privacy. All your data stays inside your browser's local storage—no tracking, no accounts, and no server persistence.",
      primaryCta: "Create Your Resume",
      secondaryCta: "View on GitHub",
      note: "No sign-up required • Pure in-browser local storage",
    },
    showcase: {
      dotAriaLabel: "Show resume {current} of {total}",
    },
    features: {
      badge: "Why Muraqqa?",
      title: "Designed to keep you in total control of your data",
      subtitle:
        "From serverless local storage to pixel-accurate print styles, everything is built for a clear, private, and frictionless resume workflow.",
      items: [
        {
          id: "privacy",
          title: "Complete Local Privacy",
          description:
            "Your resume data is stored exclusively in your browser's Local Storage. Nothing is sent to a backend server, and no analytics or tracking scripts are loaded.",
        },
        {
          id: "open-source",
          title: "100% Free & MIT Licensed",
          description:
            "No paywalls, no locked export options, and no subscription tiers. The codebase is transparent, community-driven, and open for review.",
        },
        {
          id: "ats-export",
          title: "Standard A4 Print & ATS Friendly",
          description:
            "Export directly to clean PDF via native browser print formatted for standard A4 paper, free of third-party watermarks or formatting artifacts.",
        },
        {
          id: "bilingual-rtl",
          title: "Native RTL & Multilingual Support",
          description:
            "Full bidirectional support using CSS logical properties and dedicated Vazirmatn typography for seamless switching between Persian and English.",
        },
      ],
    },
    howItWorks: {
      badge: "Workflow",
      title: "Three simple steps to your finished resume",
      subtitle:
        "No multi-step signups, no waiting queues, and instant live preview as you type.",
      steps: [
        {
          number: "01",
          title: "Enter your information",
          description:
            "Fill in work experience, education, skills, and contact details with real-time feedback on the live canvas.",
        },
        {
          number: "02",
          title: "Choose template & styling",
          description:
            "Select between modern and classic templates, configure your brand color, and toggle your desired layout direction (RTL/LTR).",
        },
        {
          number: "03",
          title: "Print or export JSON backup",
          description:
            "Save a watermark-free A4 PDF through native browser print, or export an offline JSON file to backup and restore anytime.",
        },
      ],
    },
    ctaBand: {
      title: "Ready to create your resume?",
      description:
        "Free, private, and requiring zero account setup. Jump straight into the builder.",
      primaryCta: "Open Resume Builder",
      secondaryCta: "Explore on GitHub",
    },
    footer: {
      description:
        "Muraqqa — An open-source, privacy-first resume builder for modern professionals.",
      license: "Released under the MIT License",
      linksHeading: "Navigation",
      links: [
        { label: "Resume Builder", href: "/builder" },
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "GitHub", href: GITHUB_URL },
      ],
      builtWith: "Built for the open-source community",
    },
  },
};
