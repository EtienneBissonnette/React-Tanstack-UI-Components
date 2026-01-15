import { Button as BaseButton } from '@base-ui/react/button';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import './Button.css';

type ButtonVariant = 'solid' | 'soft' | 'ghost' | 'outline';
type ButtonIntent = 'default' | 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  size?: ButtonSize;
  loading?: boolean;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', intent = 'default', size = 'md', loading = false, className = '', disabled, children, ...props }, ref) => {
    const classes = ['button', className].filter(Boolean).join(' ');
    const isDisabled = disabled || loading;

    return (
      <BaseButton
        ref={ref}
        className={classes}
        data-variant={variant !== 'solid' ? variant : undefined}
        data-intent={intent !== 'default' ? intent : undefined}
        data-size={size !== 'md' ? size : undefined}
        data-loading={loading || undefined}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <span className="button__spinner">
            <Loader2 className="button__spinner-icon" />
          </span>
        )}
        <span className="button__content" data-hidden={loading || undefined}>
          {children}
        </span>
      </BaseButton>
    );
  }
);

Button.displayName = 'Button';
