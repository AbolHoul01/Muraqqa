# 📊 ماتریس ویژگی‌ها و وضعیت پیاده‌سازی (Feature Status Matrix)

این جدول دیدی پرنده‌ای (Bird's-eye view) از تمام امکانات پروژه مرقع را با تفکیک **ویژگی‌های اصلی (Main Features)** و **ریزویژگی‌ها (Sub Features)** و وضعیت عملیاتی آن‌ها در سورس‌کد فعلی ارائه می‌دهد.

---

## 🧭 راهنمای وضعیت‌ها (Status Key)
- 🟢 **پیاده‌سازی کامل (Fully Implemented):** ویژگی در سورس‌کد موجود و کاملاً فعال است.
- 🟡 **آماده در بک‌اند (Backend Ready):** در API توسعه یافته و تست شده اما هنوز در اینترفیس فرانت‌اند کال نمی‌شود.
- 🔵 **محدود به کلاینت (Client-Only):** در فرانت‌اند فعال است و ذخیره آن فقط در حافظه مرورگر انجام می‌گیرد.
- ⏳ **برنامه‌ریزی‌شده (Planned):** در نقشه راه آتی قرار دارد و هنوز کدی برای آن نوشته نشده است.

---

## 📋 جدول جامع فیچرها

| شناسه | ویژگی اصلی (Main Feature) | ریزویژگی (Sub Feature) | وضعیت کنونی | پشته / فایل مرجع |
| :--- | :--- | :--- | :---: | :--- |
| **FE-01** | **موتور استیت و بوم رزومه‌ساز** | مدیریت متمرکز استیت با Zustand | 🟢 پیاده‌شده | `apps/web/src/store/useResumeStore.ts` |
| FE-01.1 | | ماندگاری داده‌ها در LocalStorage مرورگر | 🟢 پیاده‌شده | `apps/web/src/store/useResumeStore.ts` |
| FE-01.2 | | سیستم بازگردانی و تکرار تغییرات (Undo / Redo) | 🟢 پیاده‌شده | `zundo` در `useResumeStore.ts` & `Header.tsx` |
| FE-01.3 | | بازنشانی سریع داده‌ها به مقدار اولیه (Reset All) | 🟢 پیاده‌شده | `Header.tsx` |
| FE-01.4 | | بوم پیش‌نمایش در ابعاد دقیق A4 استاندارد (`210x297mm`) | 🟢 پیاده‌شده | `apps/web/src/components/builder/PreviewCanvas.tsx` |
| **FE-02** | **فرم‌های داینامیک محتوا** | ثبت اطلاعات فردی و تماس جامع (Personal Info) | 🟢 پیاده‌شده | `apps/web/src/components/builder/FormPanel.tsx` |
| FE-02.1 | | سوابق کاری نامحدود به همراه خلاصه و دستاوردها | 🟢 پیاده‌شده | `apps/web/src/components/builder/FormPanel.tsx` |
| FE-02.2 | | ثبت سوابق تحصیلی و دانشگاهی (Education) | 🟢 پیاده‌شده | `apps/web/src/components/builder/FormPanel.tsx` |
| FE-02.3 | | دسته‌بندی مهارت‌ها با برچسب و سطح تسلط (Skills) | 🟢 پیاده‌شده | `apps/web/src/components/builder/FormPanel.tsx` |
| FE-02.4 | | مرتب‌سازی ترتیبی کارت‌ها با کشیدن و رها کردن (Dnd) | 🟢 پیاده‌شده | `@dnd-kit` در `SortableCard.tsx` |
| FE-02.5 | | کنترل خطا و فرم‌های آکاردئونی واکنش‌گرا | 🟢 پیاده‌شده | `apps/web/src/components/builder/FormPanel.tsx` |
| **FE-03** | **شخصی‌سازی و زیبایی‌شناسی** | پالت رنگ سازمانی با پیش‌تنظیم‌ها و انتخاب رنگ آزاد | 🟢 پیاده‌شده | `FormPanel.tsx` (Customization section) |
| FE-03.1 | | تغییر تایپوگرافی (Vazirmatn, Inter, Roboto, Merriweather) | 🟢 پیاده‌شده | `apps/web/src/types/resume.ts` |
| FE-03.2 | | تنظیم اندازه قلم متون (Small, Medium, Large) | 🟢 پیاده‌شده | `apps/web/src/types/resume.ts` |
| FE-03.3 | | کنترل تراکم و فشردگی چیدمان (Compact, Comfortable, Spacious) | 🟢 پیاده‌شده | `apps/web/src/types/resume.ts` |
| FE-03.4 | | پشتیبانی و سوییچ دوطرفه راست‌به‌چپ (RTL) و چپ‌به‌راست (LTR) | 🟢 پیاده‌شده | `Header.tsx` & `page.tsx` (`dir="rtl/ltr"`) |
| **FE-04** | **سیستم قالب‌های ماژولار** | قالب مدرن با هدر تمایزیافته (`ModernTemplate`) | 🟢 پیاده‌شده | `apps/web/src/templates/ModernTemplate.tsx` |
| FE-04.1 | | قالب رسمی و کلاسیک با استایل مینیمال (`ClassicTemplate`) | 🟢 پیاده‌شده | `apps/web/src/templates/ClassicTemplate.tsx` |
| FE-04.2 | | ریجیستری قالب‌ها با بارگذاری تنبل (Dynamic Registry) | 🟢 پیاده‌شده | `apps/web/src/templates/registry.ts` |
| FE-04.3 | | جلوگیری از شکست ناخواسته عناصر در چاپ (`page-break-avoid`) | 🟢 پیاده‌شده | `apps/web/src/app/globals.css` |
| **FE-05** | **ورودی، خروجی و پرینت** | برون‌ریزی فایل داده با استاندارد JSON | 🟢 پیاده‌شده | `apps/web/src/components/builder/Header.tsx` |
| FE-05.1 | | درون‌ریزی فایل JSON با اعتبارسنجی ساختار | 🟢 پیاده‌شده | `apps/web/src/components/builder/Header.tsx` |
| FE-05.2 | | خروجی استاندارد چاپی PDF با استایل اختصاصی `@media print` | 🟢 پیاده‌شده | `apps/web/src/app/globals.css` |
| **BE-01** | **هسته معماری بک‌اند** | ساختار Clean Architecture در زبان Go | 🟢 پیاده‌شده | `apps/api/internal/...` |
| BE-01.1 | | روتر سریع Gin با هندلرهای مجزا و ریکاوری سراسری | 🟢 پیاده‌شده | `apps/api/internal/delivery/http/router.go` |
| BE-01.2 | | میدلور CORS کامل برای سازگاری با درخواست‌های وب | 🟢 پیاده‌شده | `apps/api/internal/delivery/http/router.go` |
| BE-01.3 | | مدیریت کانکشن دیتابیس با درایور سطح بالای `pgx/v5` | 🟢 پیاده‌شده | `apps/api/cmd/api/main.go` |
| BE-01.4 | | اندپوینت پایش وضعیت سیستم (`GET /health`) | 🟢 پیاده‌شده | `apps/api/internal/delivery/http/router.go` |
| **BE-02** | **امنیت و احراز هویت** | ثبت‌نام کاربر با ایمیل و اعتبارسنجی رمز عبور | 🟡 آماده بک‌اند | `apps/api/internal/usecase/auth_uc.go` |
| BE-02.1 | | هشینگ کلمه عبور با الگوریتم قدرتمند Argon2id | 🟢 پیاده‌شده | `apps/api/pkg/password/password.go` |
| BE-02.2 | | صدور توکن دسترسی JWT با امضای محرمانه (HMAC-256) | 🟢 پیاده‌شده | `apps/api/pkg/jwt/jwt.go` |
| BE-02.3 | | ورود امن و صدور نشست ورود (`POST /api/v1/auth/login`) | 🟡 آماده بک‌اند | `apps/api/internal/delivery/http/handler/auth_handler.go` |
| BE-02.4 | | میدلور محافظت از مسیرهای خصوصی با توکن Bearer | 🟢 پیاده‌شده | `apps/api/internal/delivery/http/middleware/auth_middleware.go` |
| **BE-03** | **رمزنگاری صفر-آگاهی (ZK)** | پیاده‌سازی الگوریتم متقارن AES-256-GCM استاندارد AEAD | 🟢 پیاده‌شده | `apps/api/internal/usecase/crypto.go` |
| BE-03.1 | | تولید بردار تصادفی غیرتکراری (Nonce ۱۲ بایتی) در هر ذخیره | 🟢 پیاده‌شده | `apps/api/internal/usecase/crypto.go` |
| BE-03.2 | | تایید یکپارچگی داده و برچسب اصالت ۱۶ بایتی (Tag) | 🟢 پیاده‌شده | `apps/api/internal/usecase/crypto.go` |
| BE-03.3 | | پذیرش کلید اختصاصی ۳۲ بایتی در فرمت‌های Raw, Hex, Base64 | 🟢 پیاده‌شده | `apps/api/internal/delivery/http/handler/resume_handler.go` |
| BE-03.4 | | جلوگیری قطعی از ذخیره یا لاگ متن خام رزومه در سرور | 🟢 پیاده‌شده | `apps/api/internal/usecase/resume_uc.go` |
| **BE-04** | **مدیریت رزومه‌ها در سرور** | ذخیره رزومه رمزنگاری‌شده کاربر (`POST /api/v1/resumes`) | 🟡 آماده بک‌اند | `apps/api/internal/delivery/http/handler/resume_handler.go` |
| BE-04.1 | | فهرست‌بندی متادیتای رزومه‌ها بدون دسترسی به متن (`GET /api/v1/resumes`) | 🟡 آماده بک‌اند | `apps/api/internal/delivery/http/handler/resume_handler.go` |
| BE-04.2 | | بازیابی و رمزگشایی در لحظه با کلید ارسالی کاربر (`GET /api/v1/resumes/:id`) | 🟡 آماده بک‌اند | `apps/api/internal/delivery/http/handler/resume_handler.go` |
| **DB-01** | **پایگاه داده و اسکیما** | جدول کاربران با شناسه UUID و ایندکس یکتا | 🟢 پیاده‌شده | `apps/api/migrations/000001_init_schema.sql` |
| DB-01.1 | | جدول رزومه‌های رمزنگاری‌شده با فیلد `BYTEA` | 🟢 پیاده‌شده | `apps/api/migrations/000001_init_schema.sql` |
| DB-01.2 | | پیوند کلید خارجی با ویژگی حذف آبشاری (`ON DELETE CASCADE`) | 🟢 پیاده‌شده | `apps/api/migrations/000001_init_schema.sql` |
| DB-01.3 | | ایندکس عملکردی کوئری روی `user_id` | 🟢 پیاده‌شده | `apps/api/migrations/000001_init_schema.sql` |
| **INF-01**| **زیرساخت داکر و کانتینرها** | کانتینر دیتابیس PostgreSQL 16 Alpine با والیوم مستقل | 🟢 پیاده‌شده | `docker-compose.yml` |
| INF-01.1| | کانتینر Go API با فرآیند بیلد بهینه | 🟢 پیاده‌شده | `apps/api/Dockerfile` |
| INF-01.2| | کانتینر Web Frontend مبتنی بر Next.js | 🟢 پیاده‌شده | `apps/web/Dockerfile` |
| INF-01.3| | اتصال شبکه‌ای بین کانتینرها و ترتیب اجرای وابسته | 🟢 پیاده‌شده | `docker-compose.yml` |
| **INT-01**| **یکپارچگی فرانت و بک‌اند** | اتصال فرم‌های کلاینت به اندپوینت‌های Auth و Resumes | ⏳ نیازمند پیاده‌سازی | نیازمند کلاینت API در `apps/web` |
| INT-01.1| | تولید و نگهداری کلید ۳۲ بایتی در کلاینت (Web Crypto API) | ⏳ نیازمند پیاده‌سازی | کلاینت‌ساید کریپتو |
| **UI-01** | **صفحه فرود (Landing Page)** | طراحی معرفی، ویژگی‌ها و دکمه شروع ساخت رزومه | ⏳ نیازمند پیاده‌سازی | فعلا صفحه پیش‌فرض است (`apps/web/src/app/page.tsx`) |
