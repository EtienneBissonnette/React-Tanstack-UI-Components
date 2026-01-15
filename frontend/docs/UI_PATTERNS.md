# UI Patterns

This document describes common UI patterns and component design principles used in this project.

---

## CSS Architecture

### Overview

The styling system uses CSS custom properties organized in layers:

```
globals.css
├── fonts.css (fontsource imports)
├── baseline/ (reset + base styles)
└── variables/
    ├── palettes.css   → Raw color definitions (11-shade scales)
    ├── themes.css     → Variant mappings (data-variant, data-accent)
    ├── colors.css     → Semantic tokens (light/dark modes)
    ├── fonts.css      → Typography presets (data-typography)
    ├── typography.css → Font sizes, weights, line heights
    ├── layout.css     → Spacing, z-index, overlay sizing
    └── shapes.css     → Border radius, shadows, durations
```

### Palette System

**File:** `src/styles/variables/palettes.css`

Raw color palettes with 11 shades each (50-950):

| Category | Palettes |
|----------|----------|
| **Neutrals** | zinc, slate, stone, gray, neutral |
| **Accents** | blue, red, green, orange, violet, rose |

```css
--zinc-50: #fafafa;
--zinc-100: #f4f4f5;
/* ... */
--zinc-950: #09090b;
```

### Variant System (Theme Switching)

**File:** `src/styles/variables/themes.css`

Three data attributes on `<html>` control theming:

| Attribute | Controls | Options |
|-----------|----------|---------|
| `data-theme` | Light/dark mode | `light`, `dark` |
| `data-variant` | Neutral palette | `zinc` (default), `slate`, `stone`, `gray`, `neutral` |
| `data-accent` | Primary color | `blue` (default), `red`, `green`, `orange`, `violet`, `rose` |

**How it works:**

```css
/* Default: zinc neutrals, blue accent */
:root {
  --scale-50: var(--zinc-50);
  --accent-500: var(--blue-500);
}

/* When data-variant="slate" → all neutrals become slate */
[data-variant='slate'] {
  --scale-50: var(--slate-50);
  --scale-100: var(--slate-100);
  /* ... all 11 shades remapped */
}

/* When data-accent="violet" → accent colors become violet */
[data-accent='violet'] {
  --accent-50: var(--violet-50);
  --accent-500: var(--violet-500);
  /* ... all 11 shades remapped */
}
```

### Semantic Color Tokens

**File:** `src/styles/variables/colors.css`

Components use semantic tokens, never raw colors:

```css
/* These adapt automatically to theme/variant/accent */
--color-bg            /* Background */
--color-fg            /* Foreground text */
--color-primary       /* Primary action (uses --accent-*) */
--color-danger        /* Destructive actions (always red) */
--color-success       /* Success states (always green) */
--color-border        /* Default borders */
```

**Light vs Dark mode differences:**

```css
/* Light mode */
--color-primary: var(--accent-500);
--color-bg: var(--color-white);

/* Dark mode - lighter shades for visibility */
[data-theme='dark'] {
  --color-primary: var(--accent-400);
  --color-bg: var(--scale-950);
}
```

### Typography System

**File:** `src/styles/variables/fonts.css`

Typography presets via `data-typography` on `<html>`:

| Preset | Display Font | Body Font |
|--------|--------------|-----------|
| `system` (default) | System fonts | System fonts |
| `modern` | Inter | Inter |
| `geometric` | Space Grotesk | DM Sans |
| `editorial` | Playfair Display | Source Sans 3 |

```css
[data-typography='geometric'] {
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}
```

**Size scale** (in `typography.css`):

```css
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
```

### Controlling Themes in React

**File:** `src/context/theme.tsx`

Use the `useTheme` hook:

```tsx
import { useTheme } from '@/context/useTheme';

function Settings() {
  const {
    resolvedMode,  // 'light' | 'dark' (actual mode after system resolution)
    mode,          // 'light' | 'dark' | 'system'
    variant,       // 'zinc' | 'slate' | 'stone' | 'gray' | 'neutral'
    accent,        // 'blue' | 'red' | 'green' | 'orange' | 'violet' | 'rose'
    typography,    // 'system' | 'modern' | 'geometric' | 'editorial'
    setMode,
    setVariant,
    setAccent,
    setTypography,
  } = useTheme();

  return (
    <Select value={accent} onValueChange={setAccent}>
      <Select.Option value="blue">Blue</Select.Option>
      <Select.Option value="violet">Violet</Select.Option>
    </Select>
  );
}
```

Theme settings persist to localStorage automatically.

### Component Variant Pattern

Components use data attributes for variants:

```css
/* Intent variants */
.button[data-intent='primary'] {
  background: var(--color-primary);
}
.button[data-intent='danger'] {
  background: var(--color-danger-muted);
}

/* Size variants */
.button[data-size='sm'] {
  padding: var(--space-1) var(--space-2);
}
```

---

## Shared Component Props

Most interactive components share a consistent prop API for sizing, styling, and semantic intent.

### size

Controls component dimensions. Default: `md`

| Value | Use Case |
|-------|----------|
| `sm` | Compact UIs, table cells, dense layouts |
| `md` | Standard size (default) |
| `lg` | Prominent actions, touch targets |

### variant

Controls visual style/emphasis. Default varies by component.

| Value | Purpose |
|-------|---------|
| `solid` | High emphasis, filled background |
| `soft` | Medium emphasis, muted/tinted background |
| `outline` | Medium emphasis, bordered with transparent fill |
| `ghost` | Low emphasis, transparent until hover |

**Used by:** `Button`, `IconButton`, `Badge`

### intent

Controls semantic color. Default: `default`

| Value | Purpose |
|-------|---------|
| `default` | Neutral, no specific meaning |
| `primary` | Primary actions (uses accent color) |
| `secondary` | Secondary actions, less prominent |
| `danger` | Destructive or warning actions |

**Used by:** `Button`, `IconButton`, `Badge`, `DropdownMenu.Item`

**Toast-specific intents:** `success`, `error`, `warning`, `info`

### status

Controls validation state for form inputs. Default: `default`

| Value | Purpose |
|-------|---------|
| `default` | No validation state |
| `error` | Invalid input |
| `success` | Valid input |

**Used by:** `Input`, `Textarea`

### Data Attribute Pattern

Props map to CSS data attributes for styling:

```tsx
// Component
<Button variant="soft" intent="primary" size="sm">

// Renders as
<button data-variant="soft" data-intent="primary" data-size="sm">

// CSS targets these
.button[data-variant='soft'][data-intent='primary'] { ... }
```

Default values are omitted from the DOM for cleaner markup.

---

## Form Implementation

### TanStack Form Integration

**Files:** `src/components/ui/Form/`

Forms use TanStack Form with Zod validation. The `Form` component wraps `useForm` and provides context to child fields.

```tsx
import { Form, FormInput, FormSelect, FormActions } from '@/components/ui';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  role: z.enum(['admin', 'user']),
});

function MyForm() {
  return (
    <Form
      schema={schema}
      defaultValues={{ email: '', role: 'user' }}
      onSubmit={(values) => console.log(values)}
    >
      {(form) => (
        <>
          <form.Field name="email">
            {(field) => <FormInput field={field} label="Email" />}
          </form.Field>

          <form.Field name="role">
            {(field) => (
              <FormSelect field={field} label="Role">
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </FormSelect>
            )}
          </form.Field>

          <FormActions>
            <Button type="submit">Save</Button>
          </FormActions>
        </>
      )}
    </Form>
  );
}
```

### Validation Behavior

- Validation runs on `onChange` and `onSubmit`
- Errors display after field blur OR form submission attempt
- Each field component handles error extraction consistently

### Available Form Components

| Component | Purpose |
|-----------|---------|
| `Form` | Wrapper with schema validation |
| `FormField` | Generic field with label/hint/error |
| `FormInput` | Text input field |
| `FormSelect` | Dropdown select |
| `FormCheckbox` | Checkbox with validation |
| `FormSwitch` | Toggle switch |
| `FormGroup` | Visual grouping with legend |
| `FormActions` | Button container |

---

## DataTable Implementation

### TanStack Table Integration

**Files:** `src/components/ui/DataTable/`

The DataTable uses a compound component pattern:

```tsx
import { DataTable, useDataTable } from '@/components/ui';

function MyTable() {
  const [data, setData] = useState(initialData);

  const { table } = useDataTable({
    data,
    columns,
    enableSorting: true,
    enableFiltering: true,
    enablePagination: true,
    enableRowSelection: true,
    pageSize: 10,
    onDataChange: setData,
  });

  return (
    <DataTable table={table} hoverable>
      <DataTable.Header />
      <DataTable.Body emptyState={<p>No data</p>} />
      <DataTable.Pagination showPageSizeSelect />
    </DataTable>
  );
}
```

### Editable Cells

Column definitions support inline editing with validation:

```tsx
const columns = [
  {
    accessorKey: 'email',
    header: 'Email',
    meta: {
      editable: true,
      editType: 'text',
      validate: (value) => {
        if (!value.includes('@')) {
          return { valid: false, message: 'Invalid email' };
        }
        return { valid: true };
      },
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      editable: true,
      editType: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    },
  },
];
```

### React Compiler Compatibility

**Issue:** TanStack Table's internal patterns conflict with React Compiler's automatic memoization. The compiler would incorrectly optimize away necessary state updates and references.

**Solution:** All DataTable files use the `"use no forget"` directive to opt out of React Compiler optimization:

```tsx
'use no forget';

import { useReactTable } from '@tanstack/react-table';
// ...
```

**Files requiring this directive:**
- `DataTable.tsx`, `DataTableHeader.tsx`, `DataTableBody.tsx`, `DataTablePagination.tsx`
- `hooks/useDataTable.ts`, `hooks/useSkipper.ts`
- `cells/EditableTextCell.tsx`, `cells/EditableSelectCell.tsx`, `cells/EditableCheckboxCell.tsx`

### Auto-Reset Skipping (useSkipper)

**File:** `src/components/ui/DataTable/hooks/useSkipper.ts`

When editing cells, TanStack Table normally resets pagination/sorting. The `useSkipper` hook prevents this:

```tsx
// From TanStack Table's editable-data example
export function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}
```

Used in `useDataTable`:

```tsx
const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

const table = useReactTable({
  autoResetPageIndex,
  meta: {
    updateData: (rowIndex, columnId, value) => {
      skipAutoResetPageIndex(); // Prevent reset during edit
      onDataChange?.(/* updated data */);
    },
  },
});
```

### ESLint Exceptions

Required exceptions for TanStack Table compatibility:

```tsx
// useDataTable.ts - TanStack's hook has different semantics
// eslint-disable-next-line react-hooks/incompatible-library
const table = useReactTable({...});

// useSkipper.ts - Intentional pattern from TanStack docs
// eslint-disable-next-line react-hooks/refs
```

---

## Overlay Components (Modal & Drawer)

### Overview

Overlays are UI elements that appear above the main content. This project provides two overlay components:

- **Modal**: Centered dialog for focused tasks (confirmations, forms, alerts)
- **Drawer**: Slide-in panel from any edge (navigation, filters, details)

### Control Patterns

| Pattern | Use Case | Example |
|---------|----------|---------|
| URL-driven | Shareable, bookmarkable overlays | `?overlay=delete-user` |
| Local state | Ephemeral confirmations, tooltips | `open={isOpen}` |

### URL-Driven Mode (Recommended)

Uses TanStack Router search params for type-safe, shareable overlay state.

**Benefits:**
- No context drilling required
- Browser back/forward works naturally
- URL is shareable/bookmarkable
- Type-safe with Zod validation

**Usage:**

```tsx
import { Modal } from '@/components/ui';

// URL-driven: opens when ?modal=delete-user is in URL
<Modal
  searchParamKey="modal"
  searchParamValue="delete-user"
  size="md"
  aria-labelledby="delete-title"
>
  <Modal.Header>
    <h2 id="delete-title">Delete User</h2>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to delete this user?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button>Cancel</Button>
    <Button intent="danger">Delete</Button>
  </Modal.Footer>
</Modal>
```

**Triggering URL-driven overlays:**

```tsx
import { Link } from '@tanstack/react-router';

// Use Link to set search params
<Link
  search={(prev) => ({ ...prev, modal: 'delete-user' })}
  replace
>
  Delete User
</Link>
```

### Local State Mode

For ephemeral overlays that shouldn't be in the URL:

```tsx
import { useState } from 'react';
import { Drawer } from '@/components/ui';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>

      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
        position="right"
        size="lg"
        aria-label="Settings"
      >
        <Drawer.Header>
          <h2>Settings</h2>
        </Drawer.Header>
        <Drawer.Body scrollable>
          <SettingsForm />
        </Drawer.Body>
      </Drawer>
    </>
  );
}
```

---

## Compound Components

Overlays use a compound component pattern with Header/Body/Footer for predictable layout:

```
┌──────────────────────────────┐
│  Header (fixed height)       │  ← Title + close button
├──────────────────────────────┤
│                              │
│  Body (flex: 1, scrollable)  │  ← Main content
│                              │
├──────────────────────────────┤
│  Footer (fixed height)       │  ← Action buttons
└──────────────────────────────┘
```

### Component Parts

| Part | Purpose | Props |
|------|---------|-------|
| `Header` | Title area with optional close button | `showClose?: boolean` |
| `Body` | Main content area, scrollable by default | `scrollable?: boolean` |
| `Footer` | Action buttons, right-aligned | - |

### Children Sizing

The Body component uses:
- `flex: 1; min-height: 0;` - Allows shrinking and scrolling
- `container-type: inline-size` - Enables container queries for responsive children

**Using container queries in children:**

```css
@container (max-width: 400px) {
  .my-form-grid {
    grid-template-columns: 1fr;
  }
}

@container (min-width: 401px) {
  .my-form-grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## Sizing Strategy

### Modal Sizes

| Size | Max Width | Use Case |
|------|-----------|----------|
| `sm` | 400px | Simple confirmations |
| `md` | 500px | Standard forms (default) |
| `lg` | 640px | Complex forms |
| `xl` | 800px | Rich content |
| `full` | 100vw - 32px | Full-screen modals |
| `content` | Fit content | Dynamic sizing |

### Drawer Sizes

For left/right drawers (width):

| Size | Width | Use Case |
|------|-------|----------|
| `sm` | 280px | Navigation menus |
| `md` | 360px | Standard panels (default) |
| `lg` | 480px | Detail views |
| `xl` | 640px | Complex forms |
| `full` | 100% | Full-width overlay |
| `content` | Fit content | Dynamic sizing |

For top/bottom drawers (height):

| Size | Height | Use Case |
|------|--------|----------|
| `sm` | 200px | Quick actions |
| `md` | 300px | Filters (default) |
| `lg` | 400px | Forms |
| `xl` | 500px | Complex content |
| `full` | 100% | Full-height overlay |
| `content` | Fit content | Dynamic sizing |

---

## Drawer Positions

```tsx
<Drawer position="left">   // Slides from left edge
<Drawer position="right">  // Slides from right edge (default)
<Drawer position="top">    // Slides from top edge
<Drawer position="bottom"> // Slides from bottom edge (mobile sheet)
```

---

## Accessibility

- **Focus trapping**: Tab cycles within overlay (handled by base-ui)
- **Escape key**: Closes overlay (configurable via `backdrop.closeOnEscape`)
- **Backdrop click**: Closes overlay (configurable via `backdrop.closeOnClick`)
- **ARIA**: `aria-label` or `aria-labelledby` required
- **Body scroll lock**: Prevents background scrolling when open

---

## Z-Index Layering

Overlays use these z-index tokens:

| Token | Value | Use |
|-------|-------|-----|
| `--z-drawer` | 300 | Drawer panels |
| `--z-modal` | 400 | Modal dialogs |
| `--z-overlay` | 500 | Backdrop overlays |
| `--z-toast` | 600 | Toast notifications |

This allows stacking (e.g., confirmation modal over settings drawer).

---

## Animation

Overlays animate on open/close:

- **Modal**: Scale + fade (`scale(0.95) → scale(1)`)
- **Drawer**: Slide from edge (`translateX/Y`)
- **Backdrop**: Fade (opacity `0 → 0.5`)

Animation uses duration tokens:
- Open: `--duration-normal` (200ms)
- Close: `--duration-fast` (100ms)

---

## Anti-Patterns

```tsx
// ❌ Missing accessibility
<Modal>
  <Modal.Body>Content</Modal.Body>
</Modal>

// ✅ Correct - includes aria-label
<Modal aria-label="Delete confirmation">
  <Modal.Body>Content</Modal.Body>
</Modal>
```

```tsx
// ❌ URL-driven for ephemeral confirmation
<Modal searchParamKey="modal" searchParamValue="confirm">
  Are you sure?
</Modal>

// ✅ Use local state for ephemeral overlays
<Modal open={showConfirm} onOpenChange={setShowConfirm}>
  Are you sure?
</Modal>
```
