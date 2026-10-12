---
name: muraqqa-theme
description: Project skill for Muraqqa (apps/web). Captures verified design tokens, typography, layout rhythm, component class recipes, RTL/i18n rules, and accessibility standards. Use whenever asked to build a page, add a section, style a component, create buttons/cards, or match the site theme in apps/web.
---

# Muraqqa Visual Theme & UI Conventions

Authoritative visual and styling system for `apps/web`. Derived directly from verified code.

---

## Before You Write Any UI (Golden Rules)

1. **Tokens Only**: Use official brand colors (`muraqqa-navy`, `muraqqa-teal`, `muraqqa-paper`, `muraqqa-slate`). Zero raw hex (`bg-[#...]`) or one-off values.
2. **Hard Contrast on Teal**: Text on `bg-muraqqa-teal` is ALWAYS `text-muraqqa-navy` (5.65:1). NEVER `text-white` (2.49:1 FAILS WCAG AA).
3. **No Small Teal Text**: Never use `text-muraqqa-teal` for body/descriptions on white or paper (2.49:1 fails AA). Allowed only for large display numbers (`font-black text-3xl`+) or borders.
4. **Slate Text Limit**: Do not use `text-muraqqa-slate` below `text-xs font-semibold` on white/paper (4.52:1 threshold).
5. **Strict Logical Properties**: Always use `ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`, `border-s-*`, `border-e-*`. NEVER `ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`.
6. **Bilingual Font Convention**: Set font dynamically by direction:
   `isRtl ? "font-persian" : "font-latin"`.
7. **Focus-Visible Standard**: Use Tailwind v4 `focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal` on light surfaces (`focus-visible:ring-white` on navy).
8. **No Dark Mode / No New Dependencies**: Muraqqa has no dark theme (`dark:` forbidden). Never add UI/icon dependencies (`lucide-react`, `clsx`, `tailwind-merge` already installed).

---

## Token Cheat Sheet

Source of truth: `src/app/globals.css` (`@theme`).

| Token | Hex | Tailwind Utility | Semantic Purpose |
| :--- | :--- | :--- | :--- |
| `muraqqa-navy` | `#1A2B4C` | `bg-muraqqa-navy`<br>`text-muraqqa-navy` | Primary brand; dark headings, body text, icon box bg, CTA band. |
| `muraqqa-teal` | `#14B8A6` | `bg-muraqqa-teal`<br>`text-muraqqa-teal` | Vibrant accent; primary CTA buttons, step numbers, borders. |
| `muraqqa-paper` | `#FAF9F6` | `bg-muraqqa-paper` | Warm off-white canvas; page root background, feature cards. |
| `muraqqa-slate` | `#64748B` | `text-muraqqa-slate` | Muted neutral; body descriptions, subtitles, secondary nav. |

---

## Detailed References

- [Design Tokens & Fonts](reference/tokens.md) — Exact colors, font variables, showcase accents, radii, shadows.
- [Component Class Recipes](reference/components.md) — Verbatim classes for buttons, pill badges, cards, nav, footer, dots.
- [RTL & i18n Rules](reference/rtl-i18n.md) — `dir`/`lang` propagation, logical spacing, Persian digits, dictionary schema.
- [Motion & Accessibility](reference/motion-a11y.md) — Focus rings, contrast ratio matrix, reduced motion, pagination a11y.
- [Section Template](templates/section.tsx.example) — Complete, clean landing-section skeleton.

---

## Do / Don't

| Practice | Do | Don't |
| :--- | :--- | :--- |
| **Colors** | `bg-muraqqa-navy text-white` | `bg-[#1A2B4C]` (no arbitrary hex) |
| **Teal CTA** | `bg-muraqqa-teal text-muraqqa-navy` | `bg-muraqqa-teal text-white` (fails contrast) |
| **Directional margin** | `ms-4` or `gap-4` | `ml-4` or `mr-4` (breaks RTL) |
| **Text alignment** | `text-start` | `text-left` |
| **Directional icons** | `const Arrow = isRtl ? ArrowLeft : ArrowRight` | Hardcoding `ArrowRight` or CSS transforms |
| **Persian typography** | Persian headings: `leading-[1.2]`, body: `leading-relaxed` | `tracking-tight` on Persian or tight line-height |
| **Dark mode** | Explicit light/paper backgrounds | Adding `dark:...` variants |
| **Focus styling** | `focus-visible:outline-hidden focus-visible:ring-2` | Plain `focus:ring-2` or default browser outline |
| **Dependencies** | Use `lucide-react`, `clsx`, `tailwind-merge` | Installing new component/icon libraries |

---

## Known Gaps (Legacy Bugs vs Preferred Patterns)

Do NOT copy existing bugs found during codebase audit. Use preferred patterns for new code:

| Item | Existing Code Issue (Do NOT Copy) | Preferred Pattern for New Code |
| :--- | :--- | :--- |
| **Tailwind config split** | `tailwind.config.ts` duplicates colors as legacy v3 artifact. | `src/app/globals.css` `@theme` is the only source of truth. Add tokens there only. |
| **Focus ring syntax** | Builder uses legacy `focus:ring-2` without `focus-visible:`. | Use landing standard: `focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal`. |
| **Shared UI primitives** | No shared `<Button>` or `<Badge>` components in codebase. | Use verified recipes in `reference/components.md` until extracted. |
| **Pagination dots a11y (Needs review)** | Showcase dots use `role="tablist"`/`role="tab"` without arrow-key navigation or a `tabpanel`. | In new code, use plain `<button>`s with `aria-label` and `aria-current={isActive ? "true" : undefined}`. |

---

## Verification Checklist

Run before submitting any UI change in `apps/web`:

- [ ] **No Raw Colors**: `git diff` shows zero hex codes (`#...`) in `.tsx` files; only `muraqqa-*` tokens.
- [ ] **Teal Contrast Check**: Every element with `bg-muraqqa-teal` uses `text-muraqqa-navy`.
- [ ] **No Physical Directions**: No `ml-`, `mr-`, `pl-`, `pr-`, `left-`, `right-` in changed files.
- [ ] **Bilingual Check**: Toggled between FA and EN; verified fonts, line-heights, and arrow directions.
- [ ] **Focus Visible**: Interactive controls have visible ring on keyboard Tab navigation.
- [ ] **Typecheck**: `npm run build` succeeds without TypeScript or Turbopack errors.
- [ ] **Lint**: `npm run lint` passes cleanly.

---

*Changelog*: Removed invalid `lg:text-5.5xl` in `LandingHero.tsx`, replaced undefined `text-navy-900` with `text-muraqqa-navy` in `Header.tsx`, and registered `font-latin` / `font-persian` utilities in `globals.css` via `@theme inline`.
