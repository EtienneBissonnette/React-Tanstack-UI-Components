---
name: css-generator
description: CSS styling agent for creating and modifying component styles following BEM methodology. Use when Claude needs to create CSS files, modify existing styles, add component styling, or work with design tokens. Triggers on CSS-related tasks including styling components, fixing layout issues, adding responsive styles, or any work involving .css files in the frontend.
---

# CSS Generator

Agent for creating and modifying CSS in this project.

## Before Writing CSS

1. Read the BEM guidelines: `.claude/docs/css-bem-guidelines.md`
2. Review design tokens in `frontend/src/shared/styles/variables/`:
   - `colors.css` - Color tokens (`--background`, `--foreground`, `--accent-*`)
   - `layout.css` - Spacing (`--gap`, `--padding`, `--margin`)
   - `typography.css` - Font sizes/weights (`--fs-*`, `--fw-*`)
   - `shapes.css` - Borders, radius, shadows (`--border-radius`, `--shadow-*`)

## CSS File Organization

### Rule: Local Relativeness

Place CSS files relative to the components that use them:

```
component/
├── index.tsx
├── component.css          # Classes for this component only
└── subcomponents/
    └── child/
        ├── index.tsx
        └── child.css      # Classes for child only
```

### When to Create Separate CSS Files

| Scenario | Location |
|----------|----------|
| Component has its own classes | Same folder as component |
| Parent shares classes with children | Parent folder only |
| Subcomponent has unique classes | Subcomponent folder |

### Examples

**Separate files** - Each component has unique classes:
```
header/
├── header.css             # .header, .header__container
└── subcomponents/
    └── header-profile/
        └── header-profile.css  # .header-profile, .header-profile__email
```

**Shared at parent** - Parent defines classes used by children:
```
form/
├── form.css               # .form, .form__row, .form__field (used by all children)
└── subcomponents/
    └── form-field/
        └── index.tsx      # Uses .form__field from parent, no CSS file needed
```

## BEM Quick Reference

```css
/* Block */
.component { }

/* Element (flat, never nested) */
.component__header { }
.component__body { }

/* Modifier (always with base class) */
.component--active { }
.component--large { }
```

HTML usage - always include base + modifier:
```html
<div class="component component--active">
```

## Required Practices

1. **Design tokens only** - Never hardcode colors, spacing, or sizes
2. **Mobile-first** - Default styles for mobile, media queries for larger
3. **Both themes** - Test colors work in light AND dark mode
4. **Focus states** - Include `:focus-visible` for accessibility
5. **Transitions** - Use `--transition-fast` or `--transition-base`

## Token Usage

```css
/* Spacing - use calc() with --gap */
gap: calc(var(--gap) * 2);           /* 16px */
padding: var(--padding);              /* 16px */
margin-bottom: calc(var(--margin) * 0.5);

/* Colors - semantic tokens */
color: var(--foreground);
background: var(--background-secondary);
border-color: var(--accent-primary);

/* Typography */
font-size: var(--fs-lg);
font-weight: var(--fw-semibold);

/* Shapes */
border-radius: var(--border-radius);
box-shadow: var(--shadow-md);
```
