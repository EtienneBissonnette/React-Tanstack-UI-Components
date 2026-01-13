import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import './Skeleton.css';

type SkeletonVariant = 'text' | 'circular' | 'rectangular';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, animate = true, className = '', style, ...props }, ref) => {
    const classes = ['skeleton', className].filter(Boolean).join(' ');

    const computedStyle: CSSProperties = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    };

    return (
      <div
        ref={ref}
        className={classes}
        data-variant={variant !== 'text' ? variant : undefined}
        data-animate={animate ? undefined : 'false'}
        style={computedStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
