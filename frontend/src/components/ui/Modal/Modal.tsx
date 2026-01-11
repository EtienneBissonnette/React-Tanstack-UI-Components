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
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
} from './Modal.types';
import './Modal.css';

// Context for close function
interface ModalContextValue {
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('Modal compound components must be used within Modal');
  }
  return ctx;
};

// Main Modal component
const ModalRoot = forwardRef<
  HTMLDivElement,
  ModalProps & ComponentPropsWithoutRef<'div'>
>(
  (
    {
      children,
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
          <BaseDialog.Backdrop className="modal__backdrop" />
          <BaseDialog.Popup
            ref={ref}
            className={`modal__popup ${className}`.trim()}
            data-size={size}
            {...props}
          >
            <ModalContext.Provider value={{ close }}>
              {children}
            </ModalContext.Provider>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    );
  }
);

ModalRoot.displayName = 'Modal';

// Header compound
const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, showClose = true, className = '' }, ref) => {
    const { close } = useModalContext();

    return (
      <div ref={ref} className={`modal__header ${className}`.trim()}>
        <div className="modal__header-content">{children}</div>
        {showClose && (
          <button
            type="button"
            className="modal__close"
            onClick={close}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

// Body compound
const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, scrollable = true, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`modal__body ${className}`.trim()}
        data-scrollable={scrollable || undefined}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

// Footer compound
const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div ref={ref} className={`modal__footer ${className}`.trim()}>
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';

// Export compound component
export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
