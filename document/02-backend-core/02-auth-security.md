# 🔐 احراز هویت و امنیت (Authentication & Security)

> **دسته‌بندی:** بخش بک‌اند (`apps/api`)  
> **مسیر سورس‌کد:** `apps/api/pkg/password/...`، `apps/api/pkg/jwt/...` و `apps/api/internal/delivery/http/handler/auth_handler.go`

---

## 🌟 ویژگی اصلی (Main Feature): سیستم احراز هویت مدرن با Argon2id و JWT

بک‌اند مرقع از پروتکل‌های امنیتی روزآمد برای حفاظت از حساب‌های کاربری و جلوگیری از نشت اطلاعات هویتی بهره می‌برد.

---

## 🧩 ریزویژگی‌ها (Sub Features)

### ۱. هشینگ پیشرفته پسورد با الگوریتم Argon2id
مرقع به جای استفاده از توابع قدیمی یا ضعیف‌تر مانند MD5، SHA-256 یا حتی bcrypt ساده، از الگوریتم برنده مسابقه توابع هش رمز عبور (PHC) یعنی **Argon2id** استفاده می‌کند (`apps/api/pkg/password/password.go`):
* **تولید Salt تصادفی و رمزنگارانه:** تولید ۱۶ بایت سالت تصادفی به ازای هر کاربر با `crypto/rand`.
* **پارامترهای بهینه‌شده ضدحمله GPU/ASIC:**
  * میزان حافظه مصرفی: ۶۴ مگابایت (`Memory = 64 * 1024`)
  * تعداد دورهای محاسباتی: ۳ دور (`Iterations = 3`)
  * ضریب موازی‌سازی: ۲ هسته (`Parallelism = 2`)
  * طول کلید خروجی: ۳۲ بایت (`KeyLength = 32`)
* **فرمت خروجی استاندارد PHC String:**
  `$argon2id$v=19$m=65536,t=3,p=2$<salt>$<hash>`
* **مقایسه در زمان ثابت (Constant-Time Verification):** استفاده از `subtle.ConstantTimeCompare` برای دفع کامل حملات زمان‌بندی (Timing Attacks).

### ۲. صدور و اعتبارسنجی توکن دسترسی JWT (HMAC-SHA256)
پیاده‌سازی پکیج مستقل در `apps/api/pkg/jwt/jwt.go`:
* امضای توکن‌ها با الگوریتم `HS256`.
* نگهداری شناسه کاربر (`UserID`) و ایمیل (`Email`) در کلیم‌های استاندارد JWT.
* تعیین مدت زمان انقضای پیش‌فرض: ۲۴ ساعت (`ExpiresAt: Now + 24h`).
* متد اختصاصی `VerifyToken` برای استخراج و احراز هویت توکن‌های ارسالی کلاینت.

### ۳. میان‌افزار امنیتی گارد مسیرها (`AuthMiddleware`)
در فایل `apps/api/internal/delivery/http/middleware/auth_middleware.go`:
* بررسی وجود هدر `Authorization: Bearer <token>`.
* ارسال پاسخ `401 Unauthorized` در صورت غیبت یا نامعتبر بودن توکن.
* تزریق شناسه کاربر تایید‌شده به کانتکست Gin با کلید `ContextUserIDKey` جهت دسترسی امن در هندلرهای رزومه.

---

## 📡 اندپوینت‌های احراز هویت (Auth Endpoints)

### ۱. ثبت‌نام کاربر جدید
`POST /api/v1/auth/register`

* **درخواست (Request):**
```json
{
  "email": "user@muraqqa.dev",
  "password": "StrongPassword123"
}
```
* **پاسخ موفق (Response 201 Created):**
```json
{
  "message": "user registered successfully",
  "user": {
    "id": "7b7e8d42-2b63-4f91-8ad3-9e42588f98c2",
    "email": "user@muraqqa.dev",
    "created_at": "2026-10-11T12:00:00Z"
  }
}
```

### ۲. ورود به حساب کاربری
`POST /api/v1/auth/login`

* **درخواست (Request):**
```json
{
  "email": "user@muraqqa.dev",
  "password": "StrongPassword123"
}
```
* **پاسخ موفق (Response 200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "7b7e8d42-2b63-4f91-8ad3-9e42588f98c2",
    "email": "user@muraqqa.dev",
    "created_at": "2026-10-11T12:00:00Z"
  }
}
```
