# 🚀 Muraqqa | Open-Source Resume Builder

> **A Modern, Privacy-First, Free & Open-Source CV Builder**  
> Built with ⚡ **Next.js (React)**, 🐹 **Golang**, 🐘 **PostgreSQL**, and 🐳 **Docker**.

---

## 🌟 Executive Summary & Mission
Our mission is to empower developers, designers, and professionals worldwide by providing a **completely free**, **high-performance**, and **privacy-respecting** resume builder. 

Inspired by the classical Persian artistic tradition of **Muraqqa (مرقع)** — an album binding together exquisite works of calligraphy and miniature — this project aims to gracefully showcase every professional's life story.

* 🔓 **100% Free & Open-Source** (MIT License)
* 🔒 **Zero-Knowledge Privacy** (End-to-End Encryption for user data)
* ⚡ **Blazing Fast Live Preview** powered by Zustand Atomic Selectors
* 🎨 **Modular Template Engine** for effortless community contributions
* 🐳 **Docker-First Architecture** for instant self-hosting

---

## 🎯 1. Identity & Core Objectives
* 📌 **Project Name:** **Muraqqa**
* ⚖️ **License:** **MIT License** (Complete freedom for personal and commercial usage)
* 🎯 **Mission Statement:** Deliver a modern, free, open-source resume builder with modular architecture to encourage developer contributions while ensuring absolute user privacy.

---

## 🎨 2. Frontend Architecture (Next.js & React)

### 🔹 State Management with Zustand (Atomic Selector Pattern)
To optimize performance and prevent unnecessary component re-renders during active typing:

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

// ⚡ Form Component (Isolated render, zero unnecessary layout re-renders)
export const NameInput = () => {
  const fullName = useResumeStore((state) => state.resume.personalInfo.fullName);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);

  return (
    <input
      value={fullName}
      onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
      className="border p-2 rounded w-full"
      placeholder="Full Name"
    />
  );
};

```

---

### 🔹 Modular Template API

Adding a new template requires simply creating an isolated React component accepting standardized `TemplateProps`.

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

## 🐹 3. Backend Architecture (Golang Clean Architecture)

The backend service adheres to Clean Architecture by enforcing strict isolation across Domain, UseCase, and Repository layers.

```go
// 📂 apps/api/internal/domain/resume.go
package domain

type Resume struct {
    ID            string `json:"id"`
    UserID        string `json:"user_id"`
    EncryptedData []byte `json:"-"` // E2E Encrypted Payload
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

## 🐳 4. Docker-First Configuration

Orchestrate the entire stack with a single command: `docker compose up -d`

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

## 🛠️ Technical Stack Overview

| Layer | Technology | Primary Role |
| --- | --- | --- |
| 🖥️ **Frontend** | **Next.js (App Router), TypeScript** | UI Engine, Dynamic Routing, Live Preview |
| ⚡ **State** | **Zustand** | Granular Form State & History Management |
| 🎨 **Styling** | **Tailwind CSS, Shadcn/ui** | Modern Component Styling |
| 🐹 **Backend** | **Golang (Fiber / Gin)** | High-Performance REST API & Auth |
| 🐘 **Database** | **PostgreSQL (`JSONB`)** | Document-style Encrypted Storage |
| 🐳 **DevOps** | **Docker & Docker-Compose** | Seamless Self-Hosting & Deployment |

---

## 🧩 Architectural Patterns

### 🔹 Modular Template Registry (Strategy Pattern)

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

### 🖨️ Print & PDF Styling Standard

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

## 🗺️ Execution Roadmap

```text
🏁 Phase 1: Frontend MVP & Core Engine
 ├── 📝 Define JSON Resume Schema & TypeScript Interfaces
 ├── ⚡ Implement Zustand Store with Atomic Selectors
 ├── 👁️ Build Client-Side Live Preview & Print Engine
 └── 🎨 Add Initial Standard Templates (Modern & Classic)

⚙️ Phase 2: Golang Backend & Privacy Engine
 ├── 🏗️ Implement Clean Architecture in Go
 ├── 🔑 JWT & OAuth2 Authentication Pipeline
 ├── 🔒 AES-256-GCM End-to-End Encryption Layer
 └── 🐳 Docker-Compose Environment Orchestration

🚀 Phase 3: Community Tools & Advanced Features
 ├── 🧩 Modular Template API & Contributor Guidelines
 ├── 📄 JSON Resume Import/Export System
 ├── 🎨 Custom Visual Template Builder (CMS Engine)
 └── 🌟 Official GitHub Release under MIT License

```

---

*Created with ❤️ for the Open-Source Community.*

```

