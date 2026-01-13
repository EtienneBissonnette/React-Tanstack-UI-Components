"use no forget";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { ToastContext, type Toast, type ToastType } from "./hooks/useToast";
import "./Toast.css";

// Icon map for toast types
const toastIcons: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

// Toast Provider
interface ToastProviderProps {
  children: ReactNode;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = "top-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      setToasts((prev) => {
        const newToasts = [{ ...toast, id }, ...prev];
        return newToasts.slice(0, maxToasts);
      });
      return id;
    },
    [maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, clearToasts }}
    >
      {children}
      {createPortal(
        <ToastViewport
          toasts={toasts}
          position={position}
          onRemove={removeToast}
        />,
        document.body
      )}
    </ToastContext.Provider>
  );
}

// Toast Viewport (container for all toasts)
interface ToastViewportProps {
  toasts: Toast[];
  position: string;
  onRemove: (id: string) => void;
}

function ToastViewport({ toasts, position, onRemove }: ToastViewportProps) {
  return (
    <div className="toast-viewport" data-position={position}>
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
          index={index}
        />
      ))}
    </div>
  );
}

// Individual Toast Item
interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
  index: number;
}

function ToastItem({ toast, onRemove, index }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(toast.duration ?? 5000);
  const startTimeRef = useRef(0);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  }, [onRemove, toast.id]);

  // Timer management
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        remainingRef.current -= Date.now() - startTimeRef.current;
      }
      return;
    }

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(handleClose, remainingRef.current);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, handleClose]);

  const Icon = toastIcons[toast.type];

  return (
    <div
      className="toast"
      data-type={toast.type}
      data-exiting={isExiting || undefined}
      style={{ "--toast-index": index } as React.CSSProperties}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="alert"
      aria-live="assertive"
    >
      <div className="toast__glow" />
      <div className="toast__content">
        <div className="toast__icon-wrapper">
          <Icon className="toast__icon" />
        </div>
        <div className="toast__text">
          <div className="toast__title">{toast.title}</div>
          {toast.message && (
            <div className="toast__message">{toast.message}</div>
          )}
        </div>
        <button
          className="toast__close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      </div>
      <div className="toast__progress" data-paused={isPaused || undefined}>
        <div
          className="toast__progress-bar"
          style={{ animationDuration: `${toast.duration ?? 5000}ms` }}
        />
      </div>
    </div>
  );
}

ToastProvider.displayName = "ToastProvider";
