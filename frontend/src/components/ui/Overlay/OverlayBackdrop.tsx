import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { forwardRef, type ComponentProps } from 'react';
import './OverlayBackdrop.css';

export interface OverlayBackdropProps
  extends ComponentProps<typeof BaseDialog.Backdrop> {
  className?: string;
}

export const OverlayBackdrop = forwardRef<HTMLDivElement, OverlayBackdropProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <BaseDialog.Backdrop
        ref={ref}
        className={`overlay-backdrop ${className}`.trim()}
        {...props}
      />
    );
  }
);

OverlayBackdrop.displayName = 'OverlayBackdrop';
