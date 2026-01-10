import { Select as BaseSelect } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import './Select.css';

type SelectSize = 'sm' | 'md' | 'lg';
type SelectSide = 'top' | 'bottom' | 'left' | 'right';
type SelectAlign = 'start' | 'center' | 'end';

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
  side?: SelectSide;
  align?: SelectAlign;
  sideOffset?: number;
}

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
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
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
          <ChevronDown size={14} />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          className="select__positioner"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup className="select__popup">
            {options.map((option) => (
              <BaseSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="select__item"
              >
                <BaseSelect.ItemIndicator className="select__item-indicator">
                  <Check size={12} />
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
