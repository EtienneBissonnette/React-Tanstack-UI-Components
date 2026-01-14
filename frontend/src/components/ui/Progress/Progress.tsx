import { Progress as BaseProgress } from '@base-ui/react/progress';
import { forwardRef, type HTMLAttributes } from 'react';
import './Progress.css';

type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current progress value (0-100) */
  value?: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Size variant */
  size?: ProgressSize;
  /** Show percentage label */
  showValue?: boolean;
  /** Optional label text */
  label?: string;
  /** Indeterminate loading state */
  indeterminate?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = 'md',
      showValue = false,
      label,
      indeterminate = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = ['progress', className].filter(Boolean).join(' ');
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const isComplete = percentage >= 100;

    return (
      <BaseProgress.Root
        ref={ref}
        className={classes}
        value={indeterminate ? null : value}
        max={max}
        data-size={size !== 'md' ? size : undefined}
        data-complete={isComplete ? '' : undefined}
        data-indeterminate={indeterminate ? '' : undefined}
        {...props}
      >
        {(label || showValue) && (
          <div className="progress__header">
            {label && <span className="progress__label">{label}</span>}
            {showValue && !indeterminate && (
              <span className="progress__value">{Math.round(percentage)}%</span>
            )}
          </div>
        )}
        <BaseProgress.Track className="progress__track">
          <BaseProgress.Indicator
            className="progress__indicator"
            style={!indeterminate ? { width: `${percentage}%` } : undefined}
          />
        </BaseProgress.Track>
      </BaseProgress.Root>
    );
  }
);

Progress.displayName = 'Progress';
