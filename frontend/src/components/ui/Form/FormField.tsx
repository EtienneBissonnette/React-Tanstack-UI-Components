import type { ReactNode } from 'react';

interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string | string[];
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required = false,
  children,
  className = '',
}: FormFieldProps) {
  const classes = ['form-field', className].filter(Boolean).join(' ');
  const hasError = Boolean(error && (typeof error === 'string' || error.length > 0));
  const errorMessages = Array.isArray(error) ? error : error ? [error] : [];

  return (
    <div className={classes} data-error={hasError ? '' : undefined}>
      {label && (
        <label className="form-field__label" htmlFor={htmlFor}>
          {label}
          {required && <span className="form-field__required">*</span>}
        </label>
      )}
      <div className="form-field__control">{children}</div>
      {hint && !hasError && <p className="form-field__hint">{hint}</p>}
      {hasError && (
        <div className="form-field__errors">
          {errorMessages.map((msg, index) => (
            <p key={index} className="form-field__error">
              {msg}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

FormField.displayName = 'FormField';
