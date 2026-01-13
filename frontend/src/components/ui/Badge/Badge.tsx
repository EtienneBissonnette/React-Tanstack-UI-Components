import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Badge.css';

type BadgeIntent = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeVariant = 'solid' | 'soft' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: BadgeIntent;
  size?: BadgeSize;
  variant?: BadgeVariant;
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ intent = 'default', size = 'md', variant = 'soft', className = '', children, ...props }, ref) => {
    const classes = ['badge', className].filter(Boolean).join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        data-intent={intent !== 'default' ? intent : undefined}
        data-size={size !== 'md' ? size : undefined}
        data-variant={variant !== 'soft' ? variant : undefined}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
