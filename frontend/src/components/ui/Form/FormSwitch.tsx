import type { AnyFieldApi } from '@tanstack/react-form';
import { Switch } from '../Switch';
import { FormField } from './FormField';
import { useFormContext } from './useFormContext';

type SwitchSize = 'sm' | 'md' | 'lg';

interface FormSwitchProps {
  field: AnyFieldApi;
  label?: string;
  switchLabel?: string;
  hint?: string;
  size?: SwitchSize;
  required?: boolean;
  disabled?: boolean;
}

export function FormSwitch({
  field,
  label,
  switchLabel,
  hint,
  size = 'md',
  required = false,
  disabled = false,
}: FormSwitchProps) {
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
      <Switch
        name={field.name}
        checked={Boolean(field.state.value)}
        onCheckedChange={(checked) => {
          field.handleChange(Boolean(checked));
          field.handleBlur(); // Mark as blurred to show validation errors
        }}
        size={size}
        label={switchLabel}
        disabled={disabled}
      />
    </FormField>
  );
}

FormSwitch.displayName = 'FormSwitch';
