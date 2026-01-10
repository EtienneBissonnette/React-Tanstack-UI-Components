import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Check, Minus } from 'lucide-react';
import { forwardRef, type ComponentProps } from 'react';
import './Checkbox.css';

type CheckboxSize = 'sm' | 'md' | 'lg';

interface CheckboxProps extends ComponentProps<typeof BaseCheckbox.Root> {
  size?: CheckboxSize;
  label?: string;
}

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
          {indeterminate ? <Minus size={12} /> : <Check size={12} />}
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
