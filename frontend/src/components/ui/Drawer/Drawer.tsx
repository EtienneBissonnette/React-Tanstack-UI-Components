import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import {
  forwardRef,
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
} from 'react';
import { X } from 'lucide-react';
import { useOverlay } from '@/hooks/useOverlay';
import type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
} from './Drawer.types';
import './Drawer.css';

// Context for close function
interface DrawerContextValue {
  close: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

const useDrawerContext = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error('Drawer compound components must be used within Drawer');
  }
  return ctx;
};

// Main Drawer component
const DrawerRoot = forwardRef<
  HTMLDivElement,
  DrawerProps & ComponentPropsWithoutRef<'div'>
>(
  (
    {
      children,
      position = 'right',
      size = 'md',
      backdrop = {},
      className = '',
      open,
      onOpenChange,
      searchParamKey,
      searchParamValue,
      ...props
    },
    ref
  ) => {
    const { isOpen, close } = useOverlay({
      open,
      onOpenChange,
      searchParamKey,
      searchParamValue,
    });

    const { closeOnClick = true } = backdrop;

    return (
      <BaseDialog.Root
        open={isOpen}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) close();
        }}
        disablePointerDismissal={!closeOnClick}
      >
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className="drawer__backdrop" />
          <BaseDialog.Popup
            ref={ref}
            className={`drawer__popup ${className}`.trim()}
            data-position={position}
            data-size={size}
            {...props}
          >
            <DrawerContext.Provider value={{ close }}>
              {children}
            </DrawerContext.Provider>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    );
  }
);

DrawerRoot.displayName = 'Drawer';

// Header compound
const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, showClose = true, className = '' }, ref) => {
    const { close } = useDrawerContext();

    return (
      <div ref={ref} className={`drawer__header ${className}`.trim()}>
        <div className="drawer__header-content">{children}</div>
        {showClose && (
          <button
            type="button"
            className="drawer__close"
            onClick={close}
            aria-label="Close drawer"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

DrawerHeader.displayName = 'DrawerHeader';

// Body compound
const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, scrollable = true, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`drawer__body ${className}`.trim()}
        data-scrollable={scrollable || undefined}
      >
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = 'DrawerBody';

// Footer compound
const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div ref={ref} className={`drawer__footer ${className}`.trim()}>
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = 'DrawerFooter';

// Export compound component
export const Drawer = Object.assign(DrawerRoot, {
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
});
