import type { ReactNode } from 'react';
import type {
  OverlayControlProps,
  OverlaySize,
  BackdropConfig,
} from '../Overlay/Overlay.types';

export interface ModalProps extends OverlayControlProps {
  /** Modal content */
  children: ReactNode;
  /** Size preset - controls max-width */
  size?: OverlaySize;
  /** Backdrop configuration */
  backdrop?: BackdropConfig;
  /** Additional className for the modal container */
  className?: string;
  /** ARIA label for the modal (required for accessibility) */
  'aria-label'?: string;
  /** ARIA labelledby - ID of element containing the modal title */
  'aria-labelledby'?: string;
}

export interface ModalHeaderProps {
  children: ReactNode;
  /** Show close button (default: true) */
  showClose?: boolean;
  className?: string;
}

export interface ModalBodyProps {
  children: ReactNode;
  /** Enable scrolling within body (default: true) */
  scrollable?: boolean;
  className?: string;
}

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}
