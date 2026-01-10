import { Button as BaseButton } from '@base-ui/react/button';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.css';

type ButtonIntent = 'default' | 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntent;
  size?: ButtonSize;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ intent = 'default', size = 'md', className = '', children, ...props }, ref) => {
    const classes = ['button', className].filter(Boolean).join(' ');

    return (
      <BaseButton
        ref={ref}
        className={classes}
        data-intent={intent !== 'default' ? intent : undefined}
        data-size={size !== 'md' ? size : undefined}
        {...props}
      >
        {children}
      </BaseButton>
    );
  }
);

Button.displayName = 'Button';
