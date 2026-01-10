import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { forwardRef, type ComponentProps } from 'react';
import './Switch.css';

type SwitchSize = 'sm' | 'md' | 'lg';

interface SwitchProps extends Omit<ComponentProps<typeof BaseSwitch.Root>, 'className'> {
  size?: SwitchSize;
  label?: string;
  className?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ size = 'md', label, className = '', ...props }, ref) => {
    const classes = ['switch', className].filter(Boolean).join(' ');

    const switchElement = (
      <BaseSwitch.Root
        ref={ref}
        className={classes}
        data-size={size !== 'md' ? size : undefined}
        {...props}
      >
        <BaseSwitch.Thumb className="switch__thumb" />
      </BaseSwitch.Root>
    );

    if (label) {
      return (
        <label className="switch__label" data-size={size !== 'md' ? size : undefined}>
          {switchElement}
          <span className="switch__text">{label}</span>
        </label>
      );
    }

    return switchElement;
  }
);

Switch.displayName = 'Switch';
