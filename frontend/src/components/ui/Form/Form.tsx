import { useForm } from '@tanstack/react-form';
import type { FormHTMLAttributes, ReactNode } from 'react';
import type { z } from 'zod';
import { FormContext } from './useFormContext';
import './Form.css';

// Form component props
interface FormProps<TFormData extends Record<string, unknown>>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
  schema?: z.ZodType<TFormData>;
  defaultValues?: Partial<TFormData>;
  onSubmit: (values: TFormData) => void | Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactNode | ((form: any) => ReactNode);
}

export function Form<TFormData extends Record<string, unknown>>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className = '',
  ...props
}: FormProps<TFormData>) {
  const form = useForm({
    defaultValues: defaultValues as TFormData,
    validators: schema
      ? {
          onChange: schema,
          onSubmit: schema,
        }
      : undefined,
    onSubmit: async ({ value }) => {
      await onSubmit(value as TFormData);
    },
  });

  const classes = ['form', className].filter(Boolean).join(' ');

  return (
    <FormContext.Provider value={{ form }}>
      <form
        className={classes}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        {...props}
      >
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FormContext.Provider>
  );
}

Form.displayName = 'Form';
