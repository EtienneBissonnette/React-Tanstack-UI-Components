# UI Patterns

This document describes common UI patterns and component design principles used in this project.

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
