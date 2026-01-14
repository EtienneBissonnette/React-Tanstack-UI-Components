import type { AnyFieldApi } from '@tanstack/react-form';
import { Radio, RadioGroup } from '../Radio';
import { FormField } from './FormField';
import { useFormContext } from './useFormContext';

type RadioSize = 'sm' | 'md' | 'lg';
type RadioOrientation = 'horizontal' | 'vertical';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface FormRadioGroupProps {
  field: AnyFieldApi;
  /** Field label */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Radio options */
  options: RadioOption[];
  /** Size variant */
  size?: RadioSize;
  /** Layout orientation */
  orientation?: RadioOrientation;
  /** Mark as required */
  required?: boolean;
}

export function FormRadioGroup({
  field,
  label,
  hint,
  options,
  size = 'md',
  orientation = 'vertical',
  required,
}: FormRadioGroupProps) {
  const { form } = useFormContext();
  const errors = field.state.meta.errors;
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
      required={required}
    >
      <RadioGroup
        value={String(field.state.value ?? '')}
        onValueChange={(value) => {
          field.handleChange(value);
          field.handleBlur();
        }}
        size={size}
        orientation={orientation}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
          />
        ))}
      </RadioGroup>
    </FormField>
  );
}

FormRadioGroup.displayName = 'FormRadioGroup';
