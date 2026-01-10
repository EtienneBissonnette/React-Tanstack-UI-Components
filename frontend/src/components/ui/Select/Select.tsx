import { Select as BaseSelect } from '@base-ui/react/select';
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

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select...',
  size = 'md',
  disabled = false,
  className = '',
  name,
}: SelectProps) {
  return (
    <BaseSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={(val) => {
        if (val !== null && onValueChange) {
          onValueChange(val);
        }
      }}
      disabled={disabled}
      name={name}
    >
      <BaseSelect.Trigger
        className={`select__trigger${className ? ` ${className}` : ''}`}
        data-size={size !== 'md' ? size : undefined}
      >
        <BaseSelect.Value>
          {(val) => {
            if (val === null || val === undefined) {
              return <span className="select__placeholder">{placeholder}</span>;
            }
            const selected = options.find((o) => o.value === val);
            return selected?.label ?? val;
          }}
        </BaseSelect.Value>
        <BaseSelect.Icon className="select__icon">
          <ChevronIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner className="select__positioner" sideOffset={4}>
          <BaseSelect.Popup className="select__popup">
            {options.map((option) => (
              <BaseSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="select__item"
              >
                <BaseSelect.ItemIndicator className="select__item-indicator">
                  <CheckIcon />
                </BaseSelect.ItemIndicator>
                <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
