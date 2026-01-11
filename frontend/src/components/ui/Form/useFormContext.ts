import { createContext, useContext } from 'react';

// Form context to share form instance with children
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormContext = createContext<{ form: any } | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return context;
}
