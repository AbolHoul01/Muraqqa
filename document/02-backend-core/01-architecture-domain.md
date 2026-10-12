# 🏛️ معماری تمیز و لایه‌بندی بک‌اند (Clean Architecture & Domain)

> **دسته‌بندی:** بخش بک‌اند (`apps/api`)  
> **مسیر سورس‌کد:** `apps/api/internal/...` و `apps/api/cmd/api/main.go`

---

## 🌟 ویژگی اصلی (Main Feature): پیاده‌سازی معماری تمیز (Clean Architecture) در Go

هسته بک‌اند مرقع به منظور حفظ کیفیت نرم‌افزار، امکان تست‌پذیری مستقل، جداسازی وابستگی‌های دیتابیس از منطق تجاری و قابلیت نگهداری بلندمدت بر پایه الگوی **Clean Architecture** طراحی شده است.

---

## 📐 ساختار لایه‌های نرم‌افزاری

```
┌────────────────────────────────────────────────────────┐
│                   لایه ارائه (Delivery / HTTP)         │
│             Gin Handlers, Router, Middleware           │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  لایه منطق تجاری (Use Cases)           │
│              AuthUseCase, ResumeUseCase, Crypto        │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    لایه دامنه (Domain)                 │
│         Entities, Business Interfaces, Domain Errors   │
└───────────────────────────▲────────────────────────────┘
                            │
┌───────────────────────────┴────────────────────────────┐
│                 لایه داده و مخزن (Repository)          │
│               PostgreSQL Implementation (pgx/v5)       │
└────────────────────────────────────────────────────────┘
```

---

## 🧩 ریزویژگی‌ها (Sub Features)

### ۱. لایه دامنه (Domain Entities & Contracts)
در پوشه `apps/api/internal/domain`:
* **موجودیت کاربر (`User`):** نگهداری `ID` (از نوع UUID)، `Email`، `PasswordHash`، `CreatedAt` و `UpdatedAt`.
* **موجودیت رزومه رمزنگاری‌شده (`EncryptedResume`):** نگهداری شناسه، `UserID`، عنوان رزومه (`Title`) و فیلد حساس باینری داده رمزنگاری‌شده (`EncryptedData []byte`).
* **اینترفیس‌های قرارداد:** تعاریف مستقل `UserRepository`، `ResumeRepository`، `AuthUseCase` و `ResumeUseCase`.
* **خطاهای استاندارد دامین (Domain Sentinel Errors):**
  * `ErrEmailAlreadyExists`
  * `ErrInvalidCredentials`
  * `ErrInvalidUserData`
  * `ErrResumeNotFound`
  * `ErrInvalidEncryptionKey`
  * `ErrDecryptionFailed`
  * `ErrUnauthorizedAccess`

### ۲. لایه منطق تجاری (Use Cases)
در پوشه `apps/api/internal/usecase`:
* **`AuthUseCase`:** قوانین اعتبارسنجی ورودی، بررسی عدم تکراری بودن ایمیل، ارتباط با سرویس هشینگ پسورد و تولید توکن معتبر.
* **`ResumeUseCase`:** هماهنگی میان متدهای ذخیره/بازیابی، رمزنگاری اطلاعات کلاینت قبل از ارسال به ریپازیتوری و رمزگشایی در هنگام فراخوانی.

### ۳. لایه مخزن داده (PostgreSQL Repository)
در پوشه `apps/api/internal/repository/postgres`:
* تعامل با پایگاه داده از طریق درایور مدرن و پرفورمنس‌بالای `jackc/pgx/v5/stdlib`.
* استفاده از تراکنش‌ها و کوئری‌های پارامتریک برای جلوگیری قطعی از حملات تزریق SQL (SQL Injection).

### ۴. لایه وب و مسیریابی (HTTP Delivery & Gin)
در پوشه `apps/api/internal/delivery/http`:
* **روتر مرکزی (`router.go`):** سازماندهی گروه‌های روت عمومی (`/api/v1/auth`) و خصوصی (`/api/v1/resumes`).
* **میدلور CORS باز:** تنظیم هدرهای مجاز برای ایجاد ارتباط آسان میان سرور محلی فرانت و بک‌اند، شامل پذیرش هدر اختصاصی `X-Secret-Key`.
* **کنترلرها (Handlers):** بایند کردن امن درخواست‌های JSON و تبدیل خطاهای دامین به کدهای استاندارد وضعیت HTTP (نظیر 400, 401, 403, 404, 409, 422).
* **خاتمه امن سرویس (Graceful Shutdown):** در `cmd/api/main.go` با مانیتور سیگنال‌های `SIGINT` و `SIGTERM`، اتصالات جاری قبل از خروج برنامه به آرامی بسته می‌شوند.
