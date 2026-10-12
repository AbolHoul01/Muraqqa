# 🗄️ اسکیما و مایگریشن‌های پایگاه داده (Database Schema & Migrations)

> **دسته‌بندی:** پایگاه داده و ذخیره‌سازی (`apps/api/migrations`)  
> **موتور دیتابیس:** PostgreSQL 16  
> **فایل مرجع:** `apps/api/migrations/000001_init_schema.sql`

---

## 🌟 ویژگی اصلی (Main Feature): مدل‌سازی ذخیره‌سازی باینری و تضمین محرمانگی

پایگاه داده مرقع بر پایه کمینه‌سازی ذخیره‌سازی اطلاعات شخصی (Data Minimization) طراحی شده است. جداول به گونه‌ای ساخته شده‌اند که هویت و سوابق شغلی کاربر در قالب متن ساده در جداول جدول‌بندی نمی‌شوند، بلکه در فیلدهای باینری کدگذاری‌شده نگهداری می‌گردند.

---

## 🧩 ریزویژگی‌ها (Sub Features)

### ۱. جدول کاربران (`users`)
نگهداری اطلاعات هویتی پایه و لاگین کاربر:

```sql
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

* **کلید اصلی UUID:** استفاده از شناسه جهانی تصادفی جهت ممانعت از حدس زدن تعداد کاربران پلتفرم یا حمله Enumeration.
* **ایمیل یکتا (`UNIQUE`):** تضمین عدم امکان ثبت دو حساب با یک آدرس ایمیل.
* **هش امن پسورد:** فیلد ۲۵۵ کاراکتری برای ذخیره فرمت استاندارد هش Argon2id.

### ۲. جدول رزومه‌های رمزنگاری‌شده (`encrypted_resumes`)
نگهداری رزومه‌های محرمانه کاربران:

```sql
CREATE TABLE IF NOT EXISTS encrypted_resumes (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    encrypted_data BYTEA NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

* **نوع داده `BYTEA`:** داده باینری رزومه به صورت بایت‌های دست‌نخورده ذخیره می‌شود که شامل نانس ۱۲ بایتی و بدنه رمزشده به همراه تگ است.
* **کلید خارجی آبشاری (`ON DELETE CASCADE`):** در صورت حذف حساب کاربری، تمام رزومه‌های رمزنگاری‌شده وی به صورت اتوماتیک و بدون باقی ماندن هیچ ردپایی از دیتابیس پاک خواهند شد.
* **عنوان رزومه (`title`):** برچسبی ساده مانند «رزومه انگلیسی بک‌اند» جهت شناسایی توسط خود کاربر.

### ۳. ایندکس‌های بهینه‌سازی کارایی (Performance Indexing)
```sql
CREATE INDEX IF NOT EXISTS idx_encrypted_resumes_user_id ON encrypted_resumes(user_id);
```
* جستجوی رزومه‌های کاربر بر اساس `user_id` در مقیاس‌های بزرگ با پیچیدگی زمانی `O(log N)` انجام شده و از اسکن کامل جدول (Full Table Scan) پیشگیری می‌کند.
