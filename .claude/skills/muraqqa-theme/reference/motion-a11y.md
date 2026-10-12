# Motion and Accessibility (a11y) Standards

Exact interaction, contrast, and accessibility conventions for Muraqqa (`apps/web`).

---

## 1. Focus Ring Standards

Muraqqa uses Tailwind v4's `focus-visible:` pseudo-class with `outline-hidden` to avoid default browser outline doubling:

### Light Ground (Buttons, links, interactive cards)
```css
focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-muraqqa-teal
```

### Dark Navy Ground (CTA Band buttons)
```css
focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white
```

### Pagination Dots
```css
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muraqqa-navy
```

*Legacy Warning*: Do NOT use the older Tailwind v3 pattern `focus:ring-2 focus:outline-hidden` (found in some legacy builder panels). Always use `focus-visible:` so mouse users don't see rings on click.

---

## 2. Contrast Rules & Verified Ratios

Every color pair in the UI has been measured against WCAG 2.1 AA (minimum 4.5:1 for normal text, 3:1 for large text / UI components):

| Foreground Color | Background Color | Measured Ratio | WCAG Compliance | Usage Rule |
| :--- | :--- | :--- | :--- | :--- |
| `muraqqa-navy` (`#1A2B4C`) | White (`#FFFFFF`) | **14.06:1** | Passes AAA (>= 7:1) | Primary text, titles, headings. |
| `muraqqa-navy` (`#1A2B4C`) | `muraqqa-paper` (`#FAF9F6`) | **13.35:1** | Passes AAA (>= 7:1) | Primary text on paper canvas. |
| `muraqqa-navy` (`#1A2B4C`) | `muraqqa-teal` (`#14B8A6`) | **5.65:1** | **Passes AA (>= 4.5:1)** | **MANDATORY**: All text on teal buttons/badges must be navy. |
| White (`#FFFFFF`) | `muraqqa-teal` (`#14B8A6`) | **2.49:1** | **FAILS AA (Insufficient)** | **STRICTLY FORBIDDEN**: Never put white text on brand teal. |
| `muraqqa-teal` (`#14B8A6`) | White (`#FFFFFF`) | **2.49:1** | **FAILS AA for normal text** | Permitted ONLY on decorative numbers (`text-3xl font-black`) or borders. |
| `muraqqa-teal` (`#14B8A6`) | `muraqqa-paper` (`#FAF9F6`) | **2.36:1** | **FAILS AA for normal text** | Never use for body or description text. |
| `muraqqa-slate` (`#64748B`) | White (`#FFFFFF`) | **4.76:1** | Passes AA (>= 4.5:1) | Descriptions, subtitles. Do not use below `text-xs font-semibold`. |
| `muraqqa-slate` (`#64748B`) | `muraqqa-paper` (`#FAF9F6`) | **4.52:1** | Passes AA (>= 4.5:1) | Subtitles, body text on paper. |
| White (`#FFFFFF`) | `muraqqa-navy` (`#1A2B4C`) | **14.06:1** | Passes AAA (>= 7:1) | CTA Band text, dark card headings. |

---

## 3. Motion & Transitions

- **Hover on opacity**: `hover:opacity-90 transition-opacity` (used on teal buttons).
- **Hover on background**: `hover:bg-gray-50 transition-colors` or `hover:bg-white/20 transition-colors`.
- **Card elevation**: `shadow-xs hover:shadow-md transition-shadow` or `transition-all duration-200 hover:shadow-md hover:border-muraqqa-teal/50`.
- **Icon rotation**: `transition-transform duration-200` with `rotate-180` (accordion toggle).
- **Slideshow / carousel**: `transition-all duration-500 ease-out motion-reduce:transition-none`.

### Prefers-Reduced-Motion Pattern
Always respect `prefers-reduced-motion`. In components with timers or continuous animations, pause them:

```tsx
const subscribeReducedMotion = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
};

// In component:
const reducedMotion = useSyncExternalStore(
  subscribeReducedMotion,
  () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  () => false
);

// Disable automatic interval if reducedMotion is true
const isPaused = reducedMotion || isHovered || isFocused;
```
For CSS classes, add `motion-reduce:transition-none`.

---

## 4. Pagination Dots and Carousel Accessibility

### Existing Showcase Pattern (Needs Review)
The landing page hero showcase currently implements dots as:
```tsx
<div role="tablist">
  <button role="tab" aria-selected={isActive} aria-current={isActive ? "true" : undefined} ... />
</div>
```
*A11y Gap*: Tablists require arrow-key navigation between tabs, `aria-controls` pointing to tabpanels, and associated panels.

### Preferred Pattern for New Code
For new carousels, sliders, or pagination dots:
```tsx
<div role="group" aria-label="Slide navigation" className="flex items-center justify-center gap-2">
  {items.map((item, idx) => {
    const isActive = idx === currentIndex;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => setCurrentIndex(idx)}
        aria-label={`Go to slide ${idx + 1} of ${items.length}`}
        aria-current={isActive ? "true" : undefined}
        className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muraqqa-navy ${
          isActive ? "w-7 bg-muraqqa-navy" : "w-2.5 bg-gray-300 hover:bg-gray-400"
        }`}
      />
    );
  })}
</div>
```
