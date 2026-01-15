'use no forget';

import { createContext, useContext } from 'react';

// Toast intent (notification type)
export type ToastIntent = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  intent: ToastIntent;
  title: string;
  message?: string;
  duration?: number;
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
