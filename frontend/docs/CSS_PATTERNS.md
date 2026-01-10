# CSS Patterns

## File Structure (Co-located CSS)

```
src/components/Button/
├── Button.tsx
└── Button.css
```

- Place CSS next to the component it styles
- Import in component: `import './Component.css'`

---

## Token Reference

### Colors
```
--color-bg, --color-bg-secondary, --color-bg-hover
--color-fg, --color-fg-muted, --color-fg-subtle
--color-border, --color-border-hover
--color-primary, --color-primary-hover, --color-primary-fg, --color-primary-muted
--color-secondary, --color-secondary-hover, --color-secondary-fg
--color-danger, --color-success, --color-warning (+ hover, fg, muted)
```

### Typography
```
--font-sans          (body font, controlled by typography preset)
--font-heading       (display font, controlled by typography preset)
--font-mono          (monospace)
--text-xs/sm/base/lg/xl/2xl/3xl
--font-normal/medium/semibold/bold
--leading-tight/normal/relaxed
```

### Spacing
```
--space-1 (4px) --space-2 (8px) --space-3 (12px) --space-4 (16px)
--space-5 (20px) --space-6 (24px) --space-8 (32px) --space-12 (48px)
```

### Shapes
```
--radius-sm/md/lg/full
--shadow-sm/md/lg
--duration-fast (100ms) --duration-normal (200ms)
--z-dropdown/sticky/drawer/modal/toast
```

---

## BEM Naming

| Type | Pattern | Example |
|------|---------|---------|
| Block | `.block` | `.button` |
| Element | `.block__element` | `.button__icon` |
| Modifier | `.block--modifier` | `.button--ghost` |

---

## Component Variants (data-attributes)

```css
.button { /* base */ }
.button[data-intent="primary"] { background: var(--color-primary); }
.button[data-size="sm"] { padding: var(--space-1) var(--space-2); }
```

---

## Theming System

### Data Attributes on `<html>`

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-theme` | `light`, `dark` | Light/dark mode |
| `data-variant` | `zinc`, `slate`, `stone`, `gray`, `neutral` | Neutral palette |
| `data-accent` | `blue`, `red`, `green`, `orange`, `violet`, `rose` | Accent color |
| `data-typography` | `system`, `modern`, `geometric`, `editorial` | Font pairing |

### Typography Presets

| Preset | Display | Body |
|--------|---------|------|
| `system` | System stack | System stack |
| `modern` | Inter | Inter |
| `geometric` | Space Grotesk | DM Sans |
| `editorial` | Playfair Display | Source Sans 3 |

### React Hook

```tsx
import { useTheme } from '@/context';

const {
  resolvedMode, variant, accent, typography,
  setMode, setVariant, setAccent, setTypography
} = useTheme();
```

### Key Principle

Always use semantic tokens (`--color-primary`, `--font-heading`) not raw values. The theming system remaps these based on user preferences.

---

## Anti-Patterns

```css
/* Bad */                        /* Good */
color: #333;                     color: var(--color-fg);
font-family: 'Inter';            font-family: var(--font-sans);
padding: 16px;                   padding: var(--space-4);
```
