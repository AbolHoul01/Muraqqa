# RTL and Internationalization (i18n) Rules

Muraqqa is bilingual (Persian / English) with first-class RTL layout.
Follow these rules strictly when writing any UI.

---

## 1. Direction and Language Propagation

- **Landing Page Root**: Managed in `apps/web/src/components/landing/LandingShell.tsx`:
  ```tsx
  const [lang, setLang] = useState<Language>("fa"); // Default is Persian (fa / RTL)
  const isRtl = lang === "fa";

  <div
    dir={isRtl ? "rtl" : "ltr"}
    lang={lang}
    className={`min-h-screen flex flex-col bg-muraqqa-paper text-muraqqa-navy ${
      isRtl ? "font-persian" : "font-latin"
    }`}
  >
  ```
- **SSR Hydration Guard**: Never read `localStorage` during initial state setup or first render. Reading client-side storage before mount causes Next.js hydration mismatches.
- **Independent Canvas Dir**: In `ResumeShowcase.tsx` and builder preview, individual resume cards declare their own `dir={resume.dir}` and `lang={resume.lang}` so Persian and English documents render correctly side-by-side.

---

## 2. Logical Properties Enforcement

Never use physical directional utilities. Use CSS logical properties:

| Forbidden Physical Utility | Required Logical Replacement | Purpose |
| :--- | :--- | :--- |
| `ml-*`, `mr-*` | `ms-*` (margin-inline-start)<br>`me-*` (margin-inline-end) | Horizontal margin |
| `pl-*`, `pr-*` | `ps-*` (padding-inline-start)<br>`pe-*` (padding-inline-end) | Horizontal padding |
| `text-left`, `text-right` | `text-start`, `text-end` | Text alignment |
| `border-l-*`, `border-r-*` | `border-s-*`, `border-e-*` | Accented side borders |
| `left-*`, `right-*` | `start-*`, `end-*` | Absolute positioning |
| `rounded-l-*`, `rounded-r-*` | `rounded-s-*`, `rounded-e-*` | Corner rounding |

*Note*: Symmetrical properties like `px-*`, `mx-*`, and `gap-*` are direction-agnostic and fully safe.

---

## 3. Directional Icons

Icons with an inherent forward or backward direction (arrows, chevrons pointing to the next step) must invert in RTL.

Do not attempt CSS transforms or manual rotations. Conditionally choose the icon component based on `isRtl`:

```tsx
import { ArrowLeft, ArrowRight } from "lucide-react";

const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

<Link href="/builder" className="...">
  <span>{content.primaryCta}</span>
  <ArrowIcon className="w-5 h-5" aria-hidden="true" />
</Link>
```

---

## 4. Persian Digits Convention

1. **Static Content**: Enter digits directly in Persian numerals in `apps/web/src/content/landing.ts`:
   ```ts
   steps: [
     { number: "۰۱", title: "...", description: "..." },
     { number: "۰۲", title: "...", description: "..." },
     { number: "۰۳", title: "...", description: "..." },
   ]
   ```
2. **Dynamic Numbers & Pagination**: Use regex replacement to convert Latin digits to Persian digits when `isRtl`:
   ```ts
   const formatNumber = (num: number, isRtl: boolean) =>
     isRtl
       ? String(num).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])
       : String(num);
   ```

---

## 5. Content Dictionary Pattern (`content/landing.ts`)

UI components must not hardcode user-facing strings. Read them from the content dictionary:

```ts
export type Language = "fa" | "en";

export interface LandingContent {
  brand: { name: string; taglineBadge: string };
  nav: { links: NavLink[]; cta: string; langToggle: string };
  hero: { badge: string; title: string; ... };
  features: { badge: string; title: string; subtitle: string; items: FeatureItem[] };
  howItWorks: { badge: string; title: string; steps: HowItWorksStep[] };
  ctaBand: { title: string; description: string; primaryCta: string; secondaryCta: string };
  footer: { description: string; license: string; ... };
}

export const landingContent: Record<Language, LandingContent> = {
  fa: { /* Persian copy */ },
  en: { /* English copy */ },
};
```

When building a new landing section:
1. Add the section interface to `LandingContent` in `src/content/landing.ts`.
2. Provide both `fa` and `en` content entries.
3. Pass the section slice as a typed prop from `LandingShell.tsx`.
