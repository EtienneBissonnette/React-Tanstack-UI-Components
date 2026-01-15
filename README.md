# FastReact

A production-ready React frontend template powered by the TanStack ecosystem. Includes a comprehensive UI component library with consistent design tokens, theming, and accessibility built-in.

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Routing | TanStack Router (file-based) |
| Data Fetching | TanStack Query |
| Forms | TanStack Form + Zod |
| Tables | TanStack Table |
| Base Components | Base UI (unstyled primitives) |

## Architecture

### Component Library (`src/components/ui/`)

Pre-built components with consistent API:

- **Shared Props**: `size`, `variant`, `intent`, `status` across all components
- **Data Attributes**: Styling via `[data-*]` selectors for clean CSS
- **Compound Patterns**: `Modal.Header`, `Drawer.Body`, `DataTable.Pagination`

### Styling (`src/styles/`)

CSS custom properties organized in layers:

```
variables/
├── palettes.css   → Raw color scales (zinc, blue, red, etc.)
├── themes.css     → Theme switching (data-variant, data-accent)
├── colors.css     → Semantic tokens (--color-primary, --color-danger)
├── typography.css → Font sizes, weights
└── layout.css     → Spacing, z-index
```

**Theming**: Three `<html>` attributes control appearance:
- `data-theme`: light/dark mode
- `data-variant`: neutral palette (zinc, slate, stone)
- `data-accent`: primary color (blue, violet, rose, etc.)

### Forms

TanStack Form with Zod schema validation:

```tsx
<Form schema={schema} onSubmit={handleSubmit}>
  {(form) => (
    <form.Field name="email">
      {(field) => <FormInput field={field} label="Email" />}
    </form.Field>
  )}
</Form>
```

### Data Tables

TanStack Table with inline editing, sorting, filtering, pagination:

```tsx
const { table } = useDataTable({ data, columns, enableSorting: true });

<DataTable table={table}>
  <DataTable.Header />
  <DataTable.Body />
  <DataTable.Pagination />
</DataTable>
```

### Routing

File-based routing in `src/routes/`:

```
routes/
├── __root.tsx      → Root layout
├── index.tsx       → /
├── demo.tsx        → /demo
└── about.tsx       → /about
```

## Component Props

| Prop | Values | Purpose |
|------|--------|---------|
| `size` | `sm`, `md`, `lg` | Component dimensions |
| `variant` | `solid`, `soft`, `outline`, `ghost` | Visual emphasis |
| `intent` | `default`, `primary`, `secondary`, `danger` | Semantic color |
| `status` | `default`, `error`, `success` | Form validation state |

## Project Structure

```
frontend/
├── src/
│   ├── components/ui/    → Reusable UI components
│   ├── pages/            → Page components
│   ├── routes/           → TanStack Router file routes
│   ├── styles/           → Global CSS and tokens
│   ├── context/          → React context (theme, etc.)
│   └── lib/              → Utilities
├── docs/
│   ├── ARCHITECTURE.md   → Detailed architecture docs
│   ├── CSS_PATTERNS.md   → Styling guide and tokens
│   └── UI_PATTERNS.md    → Component patterns
└── public/
```

## Available Components

**Layout**: Card, Modal, Drawer, Tabs
**Forms**: Input, Textarea, Select, Checkbox, Switch, Radio, Form*
**Data**: DataTable, Badge, Avatar, Skeleton, Progress
**Feedback**: Toast, Tooltip
**Actions**: Button, IconButton, DropdownMenu
**Navigation**: Breadcrumb

## Documentation

- [Architecture](frontend/docs/ARCHITECTURE.md) - Detailed technical architecture
- [CSS Patterns](frontend/docs/CSS_PATTERNS.md) - Design tokens and styling
- [UI Patterns](frontend/docs/UI_PATTERNS.md) - Component usage patterns

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## License

MIT
