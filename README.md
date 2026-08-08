<div align="center">

# 🎨 Muraqqa (مرقع)

### *An Open-Source, Zero-Knowledge & Modern Resume Builder*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-v1.0.0--MVP-brightgreen.svg)]()
[![Frontend](https://img.shields.io/badge/Frontend-Next.js_16_%7C_React_19_%7C_Tailwind-blue.svg)]()
[![Backend](https://img.shields.io/badge/Backend-Golang_1.22_%7C_Clean_Arch-00ADD8.svg)]()
[![Database](https://img.shields.io/badge/Database-PostgreSQL-4169E1.svg)]()

<br />

**Muraqqa (مرقع)** is a privacy-first, zero-knowledge, open-source resume builder that allows users to create beautiful, print-ready CVs with an instant live preview.

[Features](#-key-features) • [Architecture](#-tech-stack--architecture) • [Getting Started](#-getting-started-docker) • [JSON Resume](#-data-standard) • [License](#-license)

---

</div>

## 📖 About Muraqqa
In Persian artistic heritage, a **Muraqqa (مرقع)** represents a curated album of exquisite calligraphy and miniature artworks. **Muraqqa** brings this craftsmanship to the modern web: a free, open-source platform allowing anyone to craft professional, privacy-respecting resumes effortlessly.

---

## ✨ Key Features

- 🔒 **Zero-Knowledge Architecture:** Zero telemetry, zero analytics. Resume data is persisted locally (`localStorage`) or end-to-end encrypted on the server using **AES-256-GCM**.
- ⚡ **Split-Screen Live Preview:** Instant side-by-side editing with a sticky, print-accurate A4 canvas (`210mm × 297mm`).
- 🔄 **Full Undo / Redo:** Session-level state history tracking powered by Zustand and Zundo.
- 🔀 **Drag & Drop Manipulation:** Easily reorder work experience, education, and skills using `@dnd-kit`.
- 🌐 **RTL & LTR Bidirectional Support:** First-class Persian (`dir="rtl"`) and English support using Tailwind logical properties.
- 🖨️ **Client-Side PDF Generation:** Serverless, browser-native A4 PDF export using custom `@media print` rules.
- 📂 **JSON Resume Import / Export:** Native compatibility with the JSON Resume standard for instant backup and restore.
- 🎨 **Modular Template Engine:** Extensible strategy pattern template registry with dynamic code-splitting.
- 🐳 **Docker-First Deployment:** Complete full-stack orchestration using a single `docker compose up` command.

---

## 🛠️ Tech Stack & Architecture

### **Frontend (`apps/web`)**
- **Framework:** Next.js 16 (App Router, Standalone mode), React 19
- **State Management:** Zustand, Zundo (Temporal middleware), Persist
- **Styling & UI:** Tailwind CSS v4, Logical Properties, Shadcn UI primitives, Lucide Icons
- **Drag & Drop:** `@dnd-kit/core`, `@dnd-kit/sortable`
- **Validation:** React Hook Form, Zod

### **Backend (`apps/api`)**
- **Language & Pattern:** Golang 1.22+ adhering strictly to **Clean Architecture** (`domain`, `usecase`, `repository`, `delivery`)
- **Web Framework:** Gin Gonic
- **Security & Crypto:** AES-256-GCM symmetric encryption, Bcrypt password hashing, JWT Bearer authentication
- **Database:** PostgreSQL 16 (`pgx/v5` driver with binary `BYTEA` storage for encrypted payloads)

---

## 🚀 Getting Started (Docker)

The fastest way to run Muraqqa locally is using Docker Compose:

### 1. Clone the repository
```bash
git clone [https://github.com/AbolHoul01/Muraqqa.git](https://github.com/AbolHoul01/Muraqqa.git)
cd Muraqqa

```

### 2. Start all services

```bash
docker compose up --build

```

### 3. Access the applications

* **Frontend App:** [http://localhost:3000/builder](http://localhost:3000/builder)
* **Backend API:** [http://localhost:8080/api/v1](http://localhost:8080/api/v1)
* **PostgreSQL Database:** `localhost:5432`

---

## 📄 Data Standard

Muraqqa strictly follows the **[JSON Resume](https://jsonresume.org/)** open standard for schema portability. Your data structure mirrors standard entities (`basics`, `work`, `education`, `skills`) with added customization options.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.
