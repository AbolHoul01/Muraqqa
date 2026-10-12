# 📑 قراردادهای داده و تبادل اطلاعات (Data Contracts & Schemas)

> **دسته‌بندی:** پایگاه داده و تبادل داده  
> **فایل‌های مرجع:** `apps/web/src/types/resume.ts` و `apps/api/internal/domain/resume.go`

---

## 🌟 ویژگی اصلی (Main Feature): استانداردسازی ساختار داده رزومه

یکی از بزرگ‌ترین مزایای مرقع، هماهنگی ساختار داده‌های فرانت‌اند با استاندارد شناخته‌شده بین‌المللی **JSON Resume Schema** است که امکان تطابق با سایر پلتفرم‌ها و سرویس‌های پردازش خودکار رزومه را فراهم می‌سازد.

---

## 🧩 ساختار کامل مدل داده در فرانت‌اند (TypeScript Model)

```typescript
// 1. اطلاعات پایه و فردی
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

// 2. سوابق کاری
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

// 3. سوابق تحصیلی
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

// 4. مهارت‌ها
export interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert" | string;
  keywords: string[];
}

// 5. تنظیمات ظاهری
export interface ThemeSettings {
  primaryColor: string;
  fontFamily: "Inter" | "Vazirmatn" | "Roboto" | "Merriweather" | string;
  fontSize: "sm" | "md" | "lg";
  layoutDensity: "compact" | "comfortable" | "spacious";
  direction: "rtl" | "ltr";
  templateId: "modern" | "classic" | "minimal" | string;
}
```

---

## 🔒 انطباق با قرارداد رمزنگاری در بک‌اند (Go Domain Model)

```go
type EncryptedResume struct {
    ID            string    `json:"id"`
    UserID        string    `json:"user_id"`
    Title         string    `json:"title"`
    EncryptedData []byte    `json:"-"` // هیچ‌گاه در پاسخ JSON ارسال نمی‌شود
    CreatedAt     time.Time `json:"created_at"`
    UpdatedAt     time.Time `json:"updated_at"`
}

type DecryptedResumePayload struct {
    ID        string          `json:"id"`
    UserID    string          `json:"user_id"`
    Title     string          `json:"title"`
    RawJSON   json.RawMessage `json:"data"` // آبجکت یا رشته خام پارس‌شده
    CreatedAt time.Time       `json:"created_at"`
    UpdatedAt time.Time       `json:"updated_at"`
}
```

---

## 🔄 چرخه تبدیل داده (Data Flow Lifecycle)

```
[فرم‌های کاربر در فرانت]
        │
        ▼ (ایجاد ResumeData استاندارد)
[Zustand Store / LocalStorage]
        │
        ▼ (ارسال به عنوان raw_json به همراه secret_key کاربر)
[POST /api/v1/resumes]
        │
        ▼ (AES-256-GCM Encrypt با Nonce اختصاصی)
[PostgreSQL encrypted_data (BYTEA)]
```
