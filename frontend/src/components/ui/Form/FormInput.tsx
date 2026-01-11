import type { AnyFieldApi } from '@tanstack/react-form';
import type { InputHTMLAttributes } from 'react';
import { Input } from '../Input';
import { FormField } from './FormField';
import { useFormContext } from './useFormContext';

type InputSize = 'sm' | 'md' | 'lg';

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'name'> {
  field: AnyFieldApi;
  label?: string;
  hint?: string;
  size?: InputSize;
}

export function FormInput({
  field,
  label,
  hint,
  size = 'md',
  ...props
}: FormInputProps) {
  const { form } = useFormContext();
  const errors = field.state.meta.errors;
  // Show errors if field has been blurred OR form submission was attempted
  const isBlurred = field.state.meta.isBlurred;
  const isSubmitted = form.state.submissionAttempts > 0;
  const showErrors = (isBlurred || isSubmitted) && errors && errors.length > 0;
  const errorMessages = showErrors
    ? errors.map((e: unknown) =>
        typeof e === 'string' ? e : (e as { message?: string })?.message ?? String(e)
      )
    : undefined;

  return (
    <FormField
      label={label}
      htmlFor={field.name}
      hint={hint}
      error={errorMessages}
      required={props.required}
    >
      <Input
        id={field.name}
        name={field.name}
        value={String(field.state.value ?? '')}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        size={size}
        state={showErrors ? 'error' : 'default'}
        {...props}
      />
    </FormField>
  );
}

FormInput.displayName = 'FormInput';
