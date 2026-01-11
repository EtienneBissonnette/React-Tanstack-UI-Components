import type { ReactNode } from 'react';
import type {
  OverlayControlProps,
  OverlaySize,
  DrawerPosition,
  BackdropConfig,
} from '../Overlay/Overlay.types';

export interface DrawerProps extends OverlayControlProps {
  /** Drawer content */
  children: ReactNode;
  /** Which edge the drawer slides from */
  position?: DrawerPosition;
  /** Size preset - controls width (left/right) or height (top/bottom) */
  size?: OverlaySize;
  /** Backdrop configuration */
  backdrop?: BackdropConfig;
  /** Additional className for the drawer container */
  className?: string;
  /** ARIA label for the drawer */
  'aria-label'?: string;
  /** ARIA labelledby - ID of element containing the drawer title */
  'aria-labelledby'?: string;
}

export interface DrawerHeaderProps {
  children: ReactNode;
  /** Show close button (default: true) */
  showClose?: boolean;
  className?: string;
}

export interface DrawerBodyProps {
  children: ReactNode;
  /** Enable scrolling within body (default: true) */
  scrollable?: boolean;
  className?: string;
}

export interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}
