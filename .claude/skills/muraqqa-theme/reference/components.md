# Muraqqa Component Patterns & Class Recipes

Exact, verified Tailwind class strings from `apps/web/src/components/`.

---

## 1. Buttons

### Primary Action (Brand Teal)
Primary CTA button across light surfaces. Note: label text is strictly `text-muraqqa-navy` (never white).

- **Navbar compact CTA**:
  ```tsx
  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-muraqqa-teal hover:opacity-90 text-muraqqa-navy text-xs sm:text-sm font-bold shadow-xs transition-opacity focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal"
  ```
- **Hero prominent CTA**:
  ```tsx
  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-muraqqa-teal hover:opacity-90 text-muraqqa-navy font-bold text-base shadow-sm transition-opacity focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal"
  ```
- **Dark band prominent CTA (on Navy background)**:
  ```tsx
  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-muraqqa-teal hover:opacity-90 text-muraqqa-navy font-bold text-base shadow-md transition-opacity focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
  ```

### Secondary / Outline / Ghost Button
- **Hero secondary (White surface with border)**:
  ```tsx
  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-gray-50 text-muraqqa-navy border border-gray-300 font-semibold text-base shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal"
  ```
- **CTA band secondary (Glass on Navy)**:
  ```tsx
  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
  ```
- **Language switcher trigger**:
  ```tsx
  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-muraqqa-navy transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal cursor-pointer"
  ```
- **Dashed container action (Builder Add Item)**:
  ```tsx
  className="w-full py-2.5 px-4 border-2 border-dashed border-muraqqa-teal/40 text-muraqqa-teal hover:bg-muraqqa-teal/5 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
  ```
- **Builder icon action (Ghost with disabled state)**:
  ```tsx
  className="p-2 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white"
  ```

---

## 2. Pill Badges

- **Brand tagline badge** (Navbar & Footer brand mark):
  ```tsx
  className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-muraqqa-teal/15 text-muraqqa-navy"
  ```
- **Section header badge** (Hero, Features, Steps):
  ```tsx
  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-muraqqa-teal/15 text-muraqqa-navy border border-muraqqa-teal/30"
  ```
- **Trust checkmark icon badge**:
  ```tsx
  className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muraqqa-teal/20 text-muraqqa-navy"
  ```

---

## 3. Cards & Containers

- **Landing Feature Card** (`bg-muraqqa-paper` inside white section):
  ```tsx
  className="bg-muraqqa-paper border border-gray-200 rounded-2xl p-6 sm:p-8 text-start transition-all duration-200 hover:shadow-md hover:border-muraqqa-teal/50 flex flex-col justify-between"
  ```
- **Landing Step Card** (`bg-white` inside paper section):
  ```tsx
  className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-start shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
  ```
- **Feature Icon Box**:
  ```tsx
  <div className="w-12 h-12 rounded-xl bg-muraqqa-navy text-white flex items-center justify-center mb-5 shadow-xs">
    <Icon className="w-6 h-6 text-muraqqa-teal" aria-hidden="true" />
  </div>
  ```
- **Step Number**:
  ```tsx
  <div className="text-3xl sm:text-4xl font-black text-muraqqa-teal mb-4 font-mono select-none">
    01
  </div>
  ```
- **Builder Accordion Section Card**:
  ```tsx
  className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs"
  ```
  Accordion trigger header:
  ```tsx
  className="w-full px-5 py-4 flex items-center justify-between bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-start font-semibold text-muraqqa-navy"
  ```
- **Builder Sortable Item Card**:
  ```tsx
  className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-xs relative transition-shadow hover:shadow-md"
  ```


### Subtitle Scale Conventions
- **Section headers (Features, How It Works)**:
  `text-sm sm:text-base text-muraqqa-slate leading-relaxed` (max-w-3xl)
- **Hero primary subtitle & CTA Band**:
  `text-base sm:text-lg text-muraqqa-slate leading-relaxed max-w-2xl` (on dark: `text-gray-300`)
- **Footer brand summary**:
  `text-sm text-muraqqa-slate max-w-md leading-relaxed`

### Accessible Accordion / Disclosure Pattern
*(New pattern, not yet used in the codebase — use this for FAQ or collapsible sections)*:
```tsx
<div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
  <h3>
    <button
      type="button"
      id="faq-trigger-1"
      aria-expanded={isOpen}
      aria-controls="faq-panel-1"
      onClick={() => setIsOpen(!isOpen)}
      className="w-full px-5 py-4 flex items-center justify-between bg-gray-50/80 hover:bg-gray-100/80 transition-colors text-start font-semibold text-muraqqa-navy focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal"
    >
      <span>Question title here</span>
      <ChevronDown
        className={`w-5 h-5 text-muraqqa-slate transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
        aria-hidden="true"
      />
    </button>
  </h3>
  <div
    id="faq-panel-1"
    role="region"
    aria-labelledby="faq-trigger-1"
    hidden={!isOpen}
    className="p-5 text-sm text-muraqqa-slate leading-relaxed border-t border-gray-100 bg-white"
  >
    Answer content here.
  </div>
</div>
```
---

## 4. Navbar & Footer

- **Navbar Header**:
  ```tsx
  className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80"
  ```
  Inner container:
  ```tsx
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
  ```
  Nav link:
  ```tsx
  className="text-sm font-medium text-muraqqa-slate hover:text-muraqqa-navy transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal rounded px-1.5 py-1"
  ```
- **CTA Band Section**:
  ```tsx
  className="py-16 sm:py-20 bg-muraqqa-navy text-white text-center"
  ```
  Inner wrapper:
  ```tsx
  className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
  ```
- **Footer Section**:
  ```tsx
  className="bg-white border-t border-gray-200 py-12 sm:py-16"
  ```
  Inner wrapper:
  ```tsx
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  ```

---

## 5. Pagination & Dots

Container:
```tsx
className="flex items-center justify-center gap-2 mt-4 sm:mt-5"
```

- **Active Dot**:
  ```tsx
  className="h-2.5 w-7 rounded-full transition-all duration-300 bg-muraqqa-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muraqqa-navy"
  ```
- **Inactive Dot**:
  ```tsx
  className="h-2.5 w-2.5 rounded-full transition-all duration-300 bg-gray-300 hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muraqqa-navy"
  ```

*(See `reference/motion-a11y.md` for accessible ARIA attributes on pagination dots).*

---

## 6. Icons (`lucide-react`)

Always import from `lucide-react`. Do not add new icon packages.

| Size Class | Pixel Dimensions | Typical Usage |
| :--- | :--- | :--- |
| `w-3 h-3` | 12x12px | Micro indicators (e.g. check inside `w-4 h-4` badge) |
| `w-3.5 h-3.5` | 14x14px | Inline action icons (Languages toggle) |
| `w-4 h-4` | 16x16px | Badge icons (`ShieldCheck`), button control icons (`Printer`, `Plus`) |
| `w-5 h-5` | 20x20px | CTA arrows (`ArrowRight`, `ArrowLeft`), card chevrons, drag handles |
| `w-6 h-6` | 24x24px | Feature card category icons inside `w-12 h-12 rounded-xl` box |

### Icon Colors
- In navy container: `text-muraqqa-teal`.
- Inside teal pill badge: `text-muraqqa-navy`.
- In secondary light buttons: `text-muraqqa-navy`.
- Meta / chevron / subtle: `text-muraqqa-slate`.
- Always mark non-interactive icons with `aria-hidden="true"`.
