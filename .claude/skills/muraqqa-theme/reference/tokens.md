# Muraqqa Design Tokens

Source of truth: `apps/web/src/app/globals.css` (`@theme` block).
Tailwind v4 parses `@theme` directly. `apps/web/tailwind.config.ts` is legacy v3 configuration and must not be used for new tokens.

---

## 1. Brand Color Tokens

| Token Name | Hex Value | CSS Variable | Tailwind Utility | Semantic Role |
| :--- | :--- | :--- | :--- | :--- |
| **muraqqa-navy** | `#1A2B4C` | `--color-muraqqa-navy` | `bg-muraqqa-navy`<br>`text-muraqqa-navy`<br>`border-muraqqa-navy` | Primary brand; dark headings, main text, icon containers, CTA band background. |
| **muraqqa-teal** | `#14B8A6` | `--color-muraqqa-teal` | `bg-muraqqa-teal`<br>`text-muraqqa-teal`<br>`border-muraqqa-teal` | Vibrant accent; primary CTA button backgrounds, step numbers, icons on navy, badge borders. |
| **muraqqa-paper** | `#FAF9F6` | `--color-muraqqa-paper` | `bg-muraqqa-paper`<br>`text-muraqqa-paper`<br>`border-muraqqa-paper` | Warm off-white canvas; page root background, feature cards, resume sheet base. |
| **muraqqa-slate** | `#64748B` | `--color-muraqqa-slate` | `bg-muraqqa-slate`<br>`text-muraqqa-slate`<br>`border-muraqqa-slate` | Neutral muted; subtitle copy, body descriptions, secondary nav links, footer text. |

### Hard Contrast Rules
- **Text on `bg-muraqqa-teal`**: ALWAYS `text-muraqqa-navy` (5.65:1 contrast). NEVER `text-white` (2.49:1, fails WCAG AA).
- **`text-muraqqa-teal` on white / paper**: 2.49:1 / 2.36:1 (fails WCAG AA for body text). FORBIDDEN for readable text. Permitted ONLY on decorative display numerals (`text-3xl font-black font-mono`) or borders.
- **`text-muraqqa-slate` on white / paper**: 4.76:1 / 4.52:1 (passes WCAG AA 4.5:1). Do NOT use below `text-xs font-semibold`.

---

## 2. Local Showcase Accents (Component-Scoped)

Defined locally in `apps/web/src/components/landing/ResumeShowcase.tsx`.
**DO NOT** use these as global brand tokens for site pages or builder chrome. They exist only for resume template styling:

| Accent Key | Header / Accent Class | Badge / Tint Class | Pill / Box Class |
| :--- | :--- | :--- | :--- |
| `navy` | `bg-muraqqa-navy text-white` | `bg-muraqqa-teal text-muraqqa-navy` | `bg-muraqqa-paper border-muraqqa-navy/20` |
| `teal` | `bg-teal-700 text-white` | `bg-teal-100 text-teal-900` | `bg-teal-50 border-teal-200` |
| `indigo` | `bg-indigo-700 text-white` | `bg-indigo-100 text-indigo-900` | `bg-indigo-50 border-indigo-200` |
| `amber` | `bg-amber-700 text-white` | `bg-amber-100 text-amber-900` | `bg-amber-50 border-amber-200` |
| `slate` | `bg-slate-700 text-white` | `bg-slate-200 text-slate-900` | `bg-slate-100 border-slate-300` |
| `rose` | `bg-rose-700 text-white` | `bg-rose-100 text-rose-900` | `bg-rose-50 border-rose-200` |
| `emerald` | `bg-emerald-700 text-white` | `bg-emerald-100 text-emerald-900` | `bg-emerald-50 border-emerald-200` |

---

## 3. Typography Tokens

Loaded in `apps/web/src/app/layout.tsx` via `next/font/google`:
- **Vazirmatn**: CSS variable `--font-vazirmatn` (subsets: `arabic`, `latin`).
- **Geist Sans**: CSS variable `--font-geist-sans` (subset: `latin`).
- **Geist Mono**: CSS variable `--font-geist-mono` (subset: `latin`).

### Application Convention
Registered in `src/app/globals.css` via `@theme inline` mapping Next.js font variables:
```css
@theme inline {
  --font-latin: var(--font-geist-sans);
  --font-persian: var(--font-vazirmatn);
}
```
Use the standard font utilities:
```tsx
// Root shell & resume cards
className={isRtl ? "font-persian" : "font-latin"}
```
- **`font-latin`**: Resolves to Geist Sans (`var(--font-geist-sans)`).
- **`font-persian`**: Resolves to Vazirmatn (`var(--font-vazirmatn)`).
- **`font-mono`**: Tailwind built-in mono stack for code/numbers. `--font-sans` and `font-mono` remain untouched.
- **Persian line heights**: Vazirmatn headings require `leading-[1.2]` or `leading-tight`. Body text requires `leading-relaxed` (1.625) to avoid Persian glyph clashing.

---

## 4. Radii & Shadows

Standard Tailwind v4 values in actual use:

### Radii
- `rounded` (`0.25rem` / 4px): Icon buttons, inline code, micro badges.
- `rounded-md` (`0.375rem` / 6px): Builder input fields, brand link focus ring.
- `rounded-lg` (`0.5rem` / 8px): Buttons, action triggers, sortable builder cards.
- `rounded-xl` (`0.75rem` / 12px): Feature icon boxes (48x48), builder accordion cards.
- `rounded-2xl` (`1rem` / 16px): Landing feature cards, step cards, showcase preview card.
- `rounded-full` (`9999px`): Pill badges, trust icons, pagination dots.

### Shadows
- `shadow-2xs` / `shadow-xs`: Buttons, nav CTA, micro cards (`shadow-xs`).
- `shadow-sm`: Hero primary CTA button.
- `shadow-md`: CTA band button, card hover state (`hover:shadow-md`).
- `shadow-xl` / `shadow-2xl`: Showcase resume card, builder A4 paper canvas.
