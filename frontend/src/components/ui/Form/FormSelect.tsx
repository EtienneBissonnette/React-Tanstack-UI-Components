import type { AnyFieldApi } from '@tanstack/react-form';
import type { CSSProperties } from 'react';
import { Select } from '../Select';
import { FormField } from './FormField';
import { useFormContext } from './useFormContext';

type SelectSize = 'sm' | 'md' | 'lg';
type SelectSide = 'top' | 'bottom' | 'left' | 'right';
type SelectAlign = 'start' | 'center' | 'end';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
}

interface FormSelectProps {
  field: AnyFieldApi;
  options: SelectOption[];
  label?: string;
  hint?: string;
  placeholder?: string;
  size?: SelectSize;
  side?: SelectSide;
  align?: SelectAlign;
  sideOffset?: number;
  required?: boolean;
  disabled?: boolean;
}

export function FormSelect({
  field,
  options,
  label,
  hint,
  placeholder = 'Select...',
  size = 'md',
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  required = false,
  disabled = false,
}: FormSelectProps) {
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
      hint={hint}
      error={errorMessages}
      required={required}
    >
      <Select
        name={field.name}
        value={String(field.state.value ?? '')}
        onValueChange={(value) => field.handleChange(value)}
        options={options}
        placeholder={placeholder}
        size={size}
        side={side}
        align={align}
        sideOffset={sideOffset}
        disabled={disabled}
      />
    </FormField>
  );
}

FormSelect.displayName = 'FormSelect';
