import { Button as BaseButton } from '@base-ui/react/button';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import './IconButton.css';

type IconButtonVariant = 'solid' | 'soft' | 'ghost' | 'outline';
type IconButtonIntent = 'neutral' | 'primary' | 'danger';
type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonShape = 'square' | 'circle';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: IconButtonVariant;
  /** Color intent */
  intent?: IconButtonIntent;
  /** Button size */
  size?: IconButtonSize;
  /** Button shape */
  shape?: IconButtonShape;
  /** Loading state - shows spinner and disables interaction */
  loading?: boolean;
  /** Icon element to render */
  children: ReactNode;
  /** Accessible label (required for icon-only buttons) */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'ghost',
      intent = 'neutral',
      size = 'md',
      shape = 'square',
      loading = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const classes = ['icon-button', className].filter(Boolean).join(' ');
    const isDisabled = disabled || loading;

    return (
      <BaseButton
        ref={ref}
        className={classes}
        data-variant={variant !== 'ghost' ? variant : undefined}
        data-intent={intent !== 'neutral' ? intent : undefined}
        data-size={size !== 'md' ? size : undefined}
        data-shape={shape !== 'square' ? shape : undefined}
        data-loading={loading || undefined}
        disabled={isDisabled}
        {...props}
      >
        <span className="icon-button__icon" data-hidden={loading || undefined}>
          {children}
        </span>
        {loading && (
          <span className="icon-button__spinner">
            <Loader2 className="icon-button__spinner-icon" />
          </span>
        )}
      </BaseButton>
    );
  }
);

IconButton.displayName = 'IconButton';
