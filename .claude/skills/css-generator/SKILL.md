# CSS Generator Skill

CSS styling agent for creating and modifying component styles following BEM methodology and project design tokens.

## When to Use

Use this skill when:
- Creating new CSS files for components
- Modifying existing component styles
- Adding responsive styles or variants
- Working with design tokens
- Fixing layout or styling issues

## File Locations

### Component CSS (Co-located)

CSS files are **co-located with their components**. Place CSS files next to the component they style:

```
src/components/
├── Button/
│   ├── Button.tsx
│   └── Button.css        # Styles for Button component
├── Card/
│   ├── Card.tsx
│   ├── Card.css          # Shared styles for Card and its children
│   ├── CardHeader.tsx
│   ├── CardHeader.css    # Styles specific to CardHeader only
│   ├── CardBody.tsx
│   └── CardBody.css      # Styles specific to CardBody only
```

**Rules:**
- Component-specific CSS → same directory as the component
- Parent components with shared classes → put shared classes in parent's CSS
- Subcomponent-only classes → put in subcomponent's CSS file

**Example - Card with subcomponents:**

```css
/* Card.css - shared classes used across Card, CardHeader, CardBody */
.card {
  border: var(--border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
}

.card__divider {
  border-top: var(--border);
  margin: 0;
}
```

```css
/* CardHeader.css - only CardHeader-specific styles */
.card__header {
  padding: var(--space-4);
  font-weight: var(--font-semibold);
}
```

```css
/* CardBody.css - only CardBody-specific styles */
.card__body {
  padding: var(--space-4);
}
```

### Design Tokens (Global)

Global design tokens remain in `frontend/src/styles/variables/`:
- `palettes.css` - Raw color palettes (zinc, slate, blue, etc.)
- `themes.css` - Theme variant mappings
- `colors.css` - Semantic color tokens
- `layout.css` - Spacing, z-index, containers
- `shapes.css` - Border radius, shadows, transitions
- `typography.css` - Font sizes, weights, line heights

### Documentation

- `frontend/docs/CSS_PATTERNS.md` - Token reference and patterns

## Design Token Reference

### Colors (Semantic)
```css
/* Backgrounds */
--color-bg, --color-bg-secondary, --color-bg-hover, --color-bg-active

/* Foregrounds */
--color-fg, --color-fg-muted, --color-fg-subtle

/* Borders */
--color-border, --color-border-hover

/* Primary (accent color) */
--color-primary, --color-primary-hover, --color-primary-fg, --color-primary-muted

/* Secondary (neutral) */
--color-secondary, --color-secondary-hover, --color-secondary-fg, --color-secondary-border

/* Intent colors */
--color-danger, --color-danger-hover, --color-danger-fg, --color-danger-muted
--color-success, --color-success-hover, --color-success-fg, --color-success-muted
--color-warning, --color-warning-hover, --color-warning-fg, --color-warning-muted
```

### Color Scales (Raw Palettes)
```css
/* Neutrals (50-950) */
--zinc-*, --slate-*, --stone-*, --gray-*, --neutral-*

/* Accents (50-950) */
--blue-*, --red-*, --green-*, --orange-*, --violet-*, --rose-*

/* Theme-mapped scales */
--scale-50 through --scale-950  /* Maps to current variant */
--accent-50 through --accent-950  /* Maps to current accent */
```

### Spacing (8px base)
```css
--space-1 (4px)   --space-2 (8px)   --space-3 (12px)  --space-4 (16px)
--space-5 (20px)  --space-6 (24px)  --space-8 (32px)  --space-12 (48px)
--space-16 (64px)
```

### Typography
```css
/* Sizes */
--text-xs (12px)  --text-sm (14px)  --text-base (16px)
--text-lg (18px)  --text-xl (20px)  --text-2xl (24px)  --text-3xl (32px)

/* Weights */
--font-normal (400)  --font-medium (500)  --font-semibold (600)  --font-bold (700)

/* Line heights */
--leading-none (1)  --leading-tight (1.25)  --leading-normal (1.5)  --leading-relaxed (1.625)
```

### Shapes
```css
/* Border radius */
--radius-sm (4px)  --radius-md (8px)  --radius-lg (12px)  --radius-full (9999px)

/* Shadows */
--shadow-sm  --shadow-md  --shadow-lg

/* Transitions */
--duration-fast (100ms)  --duration-normal (200ms)  --duration-slow (300ms)

/* Border shorthand */
--border (1px solid var(--color-border))
```

### Z-Index Layers
```css
--z-dropdown (100)  --z-sticky (200)  --z-drawer (300)  --z-modal (400)  --z-toast (600)
```

### Breakpoints (Mobile-First)
```css
/* Base: Mobile */
/* sm: 640px+ */  @media (min-width: 640px) { }
/* md: 768px+ */  @media (min-width: 768px) { }
/* lg: 1024px+ */ @media (min-width: 1024px) { }
```

## BEM Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Block | `.block` | `.card`, `.button`, `.modal` |
| Element | `.block__element` | `.card__header`, `.card__body` |
| Modifier | `.block--modifier` | `.card--elevated`, `.card--compact` |

**Rule**: Never triple-nest elements. Use `.card__title` not `.card__header__title`.

## Component Variants (data-attributes)

Use data-attributes for variants instead of BEM modifiers for stateful/configurable properties:

```css
/* Intent variants */
.button[data-intent="primary"] { }
.button[data-intent="secondary"] { }
.button[data-intent="danger"] { }
.button[data-intent="ghost"] { }

/* Size variants */
.button[data-size="sm"] { }
.button[data-size="lg"] { }

/* State variants */
.input[data-state="error"] { }
.input[data-state="success"] { }
```

## Component Template

```css
/* ComponentName */
.component-name {
  /* Layout */
  display: flex;
  align-items: center;
  gap: var(--space-2);

  /* Sizing */
  padding: var(--space-2) var(--space-4);

  /* Typography */
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);

  /* Colors */
  color: var(--color-fg);
  background: var(--color-bg);
  border: var(--border);
  border-radius: var(--radius-md);

  /* Transitions */
  transition:
    background var(--duration-fast),
    border-color var(--duration-fast);
}

/* Hover state */
.component-name:hover {
  background: var(--color-bg-hover);
  border-color: var(--color-border-hover);
}

/* Focus state */
.component-name:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

/* Disabled state */
.component-name:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Intent: Primary */
.component-name[data-intent="primary"] {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-primary-fg);
}

.component-name[data-intent="primary"]:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

/* Intent: Secondary */
.component-name[data-intent="secondary"] {
  background: var(--color-secondary);
  border-color: var(--color-secondary-border);
  color: var(--color-secondary-fg);
}

.component-name[data-intent="secondary"]:hover {
  background: var(--color-secondary-hover);
}
```

## Anti-Patterns

**Never use hardcoded values:**
```css
/* BAD */
padding: 16px;
color: #333;
border-radius: 8px;
font-size: 14px;

/* GOOD */
padding: var(--space-4);
color: var(--color-fg);
border-radius: var(--radius-md);
font-size: var(--text-sm);
```

## Theming

Components automatically support theming via CSS variables:

- **Dark mode**: `[data-theme="dark"]` on `<html>`
- **Neutral variant**: `[data-variant="slate|stone|gray|neutral"]` on `<html>`
- **Accent color**: `[data-accent="red|green|orange|violet|rose"]` on `<html>`

No component-level changes needed - semantic tokens adapt automatically.

## Checklist

When creating/modifying CSS:
- [ ] Co-locate CSS file with its component
- [ ] Import CSS in the component file: `import './Component.css'`
- [ ] Put shared parent/child classes in parent's CSS
- [ ] Put subcomponent-only classes in subcomponent's CSS
- [ ] Use design tokens, never hardcoded values
- [ ] Follow BEM naming convention
- [ ] Use data-attributes for variants
- [ ] Include hover, focus, and disabled states
- [ ] Test in both light and dark themes
- [ ] Use mobile-first responsive design
