import type { ReactNode } from 'react';

/** Size presets for overlays */
export type OverlaySize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'content';

/** Drawer position */
export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

/** Shared props for overlay control */
export interface OverlayControlProps {
  /** Controlled open state (local mode) */
  open?: boolean;
  /** Callback when overlay requests close */
  onOpenChange?: (open: boolean) => void;
  /** Search param key for URL-driven mode (e.g., "overlay" or "modal") */
  searchParamKey?: string;
  /** Search param value to match for this overlay (e.g., "delete-user") */
  searchParamValue?: string;
}

/** Configuration for backdrop behavior */
export interface BackdropConfig {
  /** Whether clicking backdrop closes the overlay (default: true) */
  closeOnClick?: boolean;
  /** Whether pressing Escape closes the overlay (default: true) */
  closeOnEscape?: boolean;
  /** Custom backdrop className */
  className?: string;
}

/** Props for overlay header compound component */
export interface OverlayHeaderProps {
  children: ReactNode;
  /** Show close button (default: true) */
  showClose?: boolean;
  className?: string;
}

/** Props for overlay body compound component */
export interface OverlayBodyProps {
  children: ReactNode;
  /** Enable scrolling within body (default: true) */
  scrollable?: boolean;
  className?: string;
}

/** Props for overlay footer compound component */
export interface OverlayFooterProps {
  children: ReactNode;
  className?: string;
}
