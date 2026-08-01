# 🚀 مرقع (Muraqqa) | رزومه‌ساز متن‌باز

> **یک رزومه‌ساز مدرن، رایگان، متن‌باز و با محوریت حفظ حریم خصوصی**  
> توسعه‌یافته با ⚡ **Next.js (React)**، 🐹 **Golang**، 🐘 **PostgreSQL** و 🐳 **Docker**.

---

## 🌟 خلاصه اجرایی و مأموریت
مأموریت این پروژه توانمندسازی برنامه‌نویسان، طراحان و متخصصان سراسر جهان از طریق ارائه یک رزومه‌ساز **کاملاً رایگان**، **پر‌سرعت** و **احترام‌گذار به حریم خصوصی** است.

با الهام از سنت هنری اصیل ایرانی **مرقع** — آلبومی نفیس که قطعات خوش‌نویسی و نگارگری را در کنار هم گردآوری می‌کرد — این پروژه قصد دارد داستان زندگی شغلی هر فرد را به شکلی زیبا و شایسته به تصویر بکشد.

* 🔓 **۱۰۰٪ رایگان و متن‌باز** (تحت لایسنس MIT)
* 🔒 **حریم خصوصی صفر-آگاهی** (رمزنگاری End-to-End داده‌های کاربر)
* ⚡ **پیش‌نمایش زنده و فوق‌العاده سریع** با استفاده از Atomic Selectors در Zustand
* 🎨 **موتور قالب‌های ماژولار** برای مشارکت آسان جامعه توسعه‌دهندگان
* 🐳 **معماری داکر-فرست** جهت راه‌اندازی سریع و شخصی (Self-Hosting)

---

## 🎯 ۱. هویت و اهداف اصلی
* 📌 **نام پروژه:** **مرقع (Muraqqa)**
* ⚖️ **لایسنس:** **MIT License** (آزادی کامل برای استفاده شخصی و تجاری)
* 🎯 **بیانیه مأموریت:** ارائه یک رزومه‌ساز مدرن و رایگان با معماری ماژولار جهت تسهیل مشارکت برنامه‌نویسان و تضمین حریم خصوصی کامل کاربران.

---

## 🎨 ۲. معماری فرانت‌اند (Next.js & React)

### 🔹 مدیریت State با Zustand (الگوی Atomic Selector)
جهت بهینه‌سازی پرفورمنس و جلوگیری از Re-renderهای اضافه در کامپوننت‌ها هنگام تایپ کاربر:

```typescript
// 📂 apps/web/src/store/useResumeStore.ts
import { create } from 'zustand';
import { ResumeData } from '@/types/resume';

interface ResumeState {
  resume: ResumeData;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: {
    personalInfo: { fullName: '', email: '', phone: '' },
    workExperience: [],
    skills: []
  },
  updatePersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info }
      }
    }))
}));

// ⚡ کامپوننت فرم (رندر کاملاً ایزوله، بدون Re-render کل صفحه)
export const NameInput = () => {
  const fullName = useResumeStore((state) => state.resume.personalInfo.fullName);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);

  return (
    <input
      value={fullName}
      onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
      className="border p-2 rounded w-full"
      placeholder="نام و نام خانوادگی"
    />
  );
};

```

---

### 🔹 معماری ماژولار قالب‌ها (Modular Template API)

افزودن یک قالب جدید تنها نیازمند ساخت یک کامپوننت React ایزوله است که `TemplateProps` استاندارد را دریافت می‌کند.

```typescript
// 📂 apps/web/src/templates/types.ts
import { ResumeData } from '@/types/resume';

export interface TemplateProps {
  data: ResumeData;
  colorScheme: { primary: string; text: string };
}

// 📂 apps/web/src/templates/ModernTemplate.tsx
import React from 'react';
import { TemplateProps } from './types';

export const ModernTemplate: React.FC<TemplateProps> = ({ data, colorScheme }) => {
  return (
    <div className="p-8 w-[210mm] min-h-[297mm] bg-white text-gray-800 shadow-lg">
      <h1 style={{ color: colorScheme.primary }} className="text-3xl font-bold">
        {data.personalInfo.fullName}
      </h1>
      <p className="text-sm text-gray-600">{data.personalInfo.email}</p>
    </div>
  );
};

```

---

## 🐹 ۳. معماری بک‌اند (Golang Clean Architecture)

سرویس بک‌اند بر پایه Clean Architecture و تفکیک کامل لایه‌های Domain، UseCase و Repository پیاده‌سازی می‌شود.

```go
// 📂 apps/api/internal/domain/resume.go
package domain

type Resume struct {
    ID            string `json:"id"`
    UserID        string `json:"user_id"`
    EncryptedData []byte `json:"-"` // داده‌های رمزنگاری شده E2E
}

type ResumeUseCase interface {
    SaveResume(userID string, rawJSON []byte, secretKey string) error
}

// 📂 apps/api/internal/usecase/resume_uc.go
package usecase

import (
    "crypto/aes"
    "crypto/cipher"
    "crypto/rand"
    "io"
)

type resumeService struct{}

func (s *resumeService) EncryptData(data []byte, key []byte) ([]byte, error) {
    block, err := aes.NewCipher(key)
    if err != nil { return nil, err }
    gcm, err := cipher.NewGCM(block)
    if err != nil { return nil, err }
    nonce := make([]byte, gcm.NonceSize())
    if _, err = io.ReadFull(rand.Reader, nonce); err != nil { return nil, err }
    return gcm.Seal(nonce, nonce, data, nil), nil
}

```

---

## 🐳 ۴. پیکربندی داکر (Docker-First)

اجرای کل استک پروژه تنها با یک دستور ساده: `docker compose up -d`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: muraqqa_postgres
    environment:
      POSTGRES_DB: muraqqa_db
      POSTGRES_USER: muraqqa_admin
      POSTGRES_PASSWORD: secretpassword
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: muraqqa_api
    ports:
      - "8080:8080"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: muraqqa_admin
      DB_PASSWORD: secretpassword
      DB_NAME: muraqqa_db
    depends_on:
      - postgres

  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    container_name: muraqqa_web
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8080
    depends_on:
      - api

volumes:
  postgres_data:

```

---

## 🛠️ نگاه کلی به استک فنی

| لایه | تکنولوژی | نقش اصلی |
| --- | --- | --- |
| 🖥️ **فرانت‌اند** | **Next.js (App Router), TypeScript** | موتور UI، مسیریابی پویا و پیش‌نمایش زنده |
| ⚡ **مدیریت State** | **Zustand** | مدیریت State فرم‌ها و تاریخچه تغییرات |
| 🎨 **استایل‌دهی** | **Tailwind CSS, Shadcn/ui** | طراحی کامپوننت‌های مدرن و زیبا |
| 🐹 **بک‌اند** | **Golang (Fiber / Gin)** | APIهای RESTful با پرفورمنس بالا و احراز هویت |
| 🐘 **دیتابیس** | **PostgreSQL (`JSONB`)** | ذخیره‌سازی رمزنگاری‌شده داده‌ها به سبک اسنادی |
| 🐳 **زیرساخت** | **Docker & Docker-Compose** | دپلوی سریع و امکان Self-Host شخصی |

---

## 🧩 الگوهای معماری

### 🔹 ثبت ماژولار قالب‌ها (الگوی Strategy)

```typescript
// 📂 apps/web/src/templates/registry.ts
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { TemplateProps } from './types';

export const TemplateRegistry: Record<string, ComponentType<TemplateProps>> = {
  modern: dynamic(() => import('./ModernTemplate')),
  classic: dynamic(() => import('./ClassicTemplate')),
  minimal: dynamic(() => import('./MinimalTemplate')),
};

export const getTemplate = (id: string): ComponentType<TemplateProps> => {
  return TemplateRegistry[id] || TemplateRegistry['modern'];
};

```

---

### 🖨️ استاندارد استایل‌دهی چاپ و خروجی PDF

```css
/* 📂 apps/web/src/styles/print.css */
@media print {
  body {
    background: none;
    padding: 0;
    margin: 0;
  }
  .no-print {
    display: none !important;
  }
  .print-page {
    width: 210mm;
    min-height: 297mm;
    box-shadow: none !important;
    margin: 0 !important;
    page-break-after: always;
  }
}

```

---

## 🗺️ نقشه راه اجرا (Roadmap)

```text
🏁 فاز ۱: ساخت هسته اصلی و MVP فرانت‌اند
 ├── 📝 تعریف JSON Resume Schema و Interfaceهای TypeScript
 ├── ⚡ پیاده‌سازی Zustand Store با Atomic Selectors
 ├── 👁️ ساخت سیستم پیش‌نمایش زنده سمت کلاینت و موتور چاپ
 └── 🎨 افزودن قالب‌های اولیه (مدرن و کلاسیک)

⚙️ فاز ۲: بک‌اند Go و سیستم حفظ حریم خصوصی
 ├── 🏗️ پیاده‌سازی Clean Architecture در گو (Go)
 ├── 🔑 خط‌لوله احراز هویت با JWT و OAuth2
 ├── 🔒 لایه رمزنگاری AES-256-GCM داده‌ها
 └── 🐳 کانفیگ محیط اجرای داکر (Docker-Compose)

🚀 فاز ۳: ابزارهای جامعه اوپن‌سورس و فیچرهای پیشرفته
 ├── 🧩 ارائه Modular Template API و راهنمای مشارکت
 ├── 📄 سیستم Import/Export استاندارد JSON Resume
 ├── 🎨 موتور قالب‌ساز سفارشی visual (CMS)
 └── 🌟 انتشار رسمی در گیت‌هاب تحت لایسنس MIT

```

---

*ساخته‌شده با ❤️ برای جامعه متن‌باز.*

```
