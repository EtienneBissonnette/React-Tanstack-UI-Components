# CSS Patterns

## Token Reference

### Colors
```
--color-bg, --color-bg-secondary, --color-bg-hover, --color-bg-active
--color-fg, --color-fg-muted, --color-fg-subtle
--color-border, --color-border-hover
--color-primary, --color-primary-hover, --color-primary-fg
--color-danger, --color-success, --color-warning
```

### Spacing (8px base)
```
--space-1 (4px)  --space-2 (8px)   --space-3 (12px)  --space-4 (16px)
--space-5 (20px) --space-6 (24px)  --space-8 (32px)  --space-12 (48px)
```

### Typography
```
--text-xs (12px) --text-sm (14px) --text-base (16px) --text-lg (18px)
--font-normal (400) --font-medium (500) --font-semibold (600) --font-bold (700)
--leading-tight (1.25) --leading-normal (1.5)
```

### Shapes
```
--radius-sm (4px) --radius-md (8px) --radius-lg (12px) --radius-full
--shadow-sm --shadow-md --shadow-lg
--duration-fast (100ms) --duration-normal (200ms)
```

### Z-Index
```
--z-dropdown (100) --z-sticky (200) --z-drawer (300) --z-modal (400) --z-toast (600)
```

---

## BEM Naming

| Type | Pattern | Example |
|------|---------|---------|
| Block | `.block` | `.card`, `.button` |
| Element | `.block__element` | `.card__header` |
| Modifier | `.block--modifier` | `.card--elevated` |

**Rule**: Never nest elements → `.card__header__title` → `.card__title`

---

## Component Variants (data-attributes)

```css
/* Base */
.button {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  color: var(--color-fg);
  border: var(--border);
}

/* Intent */
.button[data-intent="primary"] {
  background: var(--color-primary);
  color: var(--color-primary-fg);
  border-color: var(--color-primary);
}

.button[data-intent="danger"] {
  background: var(--color-danger);
  color: var(--color-danger-fg);
}

/* Size */
.button[data-size="sm"] {
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
}

.button[data-size="lg"] {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
}
```

**Usage:**
```html
<button class="button" data-intent="primary" data-size="lg">Submit</button>
```

---

## Breakpoints (Mobile-First)

```css
/* Base: Mobile */
.component { padding: var(--space-4); }

/* sm: 640px+ */
@media (min-width: 640px) { }

/* md: 768px+ */
@media (min-width: 768px) { }

/* lg: 1024px+ */
@media (min-width: 1024px) { }
```

---

## Theming

Toggle theme: `<html data-theme="dark">`

Change brand color: Set `--hue-brand` (0-360)
```css
:root { --hue-brand: 280; } /* Purple */
```

---

## Anti-Patterns

```css
/* Hardcoded */              /* Tokens */
padding: 16px;               padding: var(--space-4);
color: #333;                 color: var(--color-fg);
border-radius: 8px;          border-radius: var(--radius-md);
```
