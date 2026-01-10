import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { forwardRef, type ComponentProps } from 'react';
import './Checkbox.css';

type CheckboxSize = 'sm' | 'md' | 'lg';

interface CheckboxProps extends ComponentProps<typeof BaseCheckbox.Root> {
  size?: CheckboxSize;
  label?: string;
}

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

const IndeterminateIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="2" y1="6" x2="10" y2="6" />
  </svg>
);

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ size = 'md', label, className = '', indeterminate, ...props }, ref) => {
    const classes = ['checkbox', className].filter(Boolean).join(' ');

    const checkbox = (
      <BaseCheckbox.Root
        ref={ref}
        className={classes}
        data-size={size !== 'md' ? size : undefined}
        indeterminate={indeterminate}
        {...props}
      >
        <BaseCheckbox.Indicator className="checkbox__indicator">
          {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
    );

    if (label) {
      return (
        <label className="checkbox__label" data-size={size !== 'md' ? size : undefined}>
          {checkbox}
          <span className="checkbox__text">{label}</span>
        </label>
      );
    }

    return checkbox;
  }
);

Checkbox.displayName = 'Checkbox';
