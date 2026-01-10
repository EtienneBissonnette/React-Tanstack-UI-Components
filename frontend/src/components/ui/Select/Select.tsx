import { Select as BaseSelect } from '@base-ui/react/select';
import { forwardRef } from 'react';
import './Select.css';

type SelectSize = 'sm' | 'md' | 'lg';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  disabled?: boolean;
  className?: string;
  name?: string;
}

const ChevronIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 5 6 8 9 5" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="10 3 4.5 8.5 2 6" />
  </svg>
);

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Select...',
      size = 'md',
      disabled = false,
      className = '',
      name,
    },
    ref
  ) => {
    const classes = ['select', className].filter(Boolean).join(' ');

    return (
      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
      >
        <BaseSelect.Trigger
          ref={ref}
          className={`${classes}__trigger`}
          data-size={size !== 'md' ? size : undefined}
        >
          <BaseSelect.Value placeholder={placeholder} />
          <BaseSelect.Icon className="select__icon">
            <ChevronIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner className="select__positioner" sideOffset={4}>
            <BaseSelect.Popup className="select__popup">
              {options.map((option) => (
                <BaseSelect.Option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="select__option"
                >
                  <BaseSelect.OptionIndicator className="select__option-indicator">
                    <CheckIcon />
                  </BaseSelect.OptionIndicator>
                  <BaseSelect.OptionText>{option.label}</BaseSelect.OptionText>
                </BaseSelect.Option>
              ))}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    );
  }
);

Select.displayName = 'Select';
