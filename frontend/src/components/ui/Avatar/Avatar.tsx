import { forwardRef, useState, type HTMLAttributes } from 'react';
import './Avatar.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarShape = 'circle' | 'square';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', initials, size = 'md', shape = 'circle', className = '', ...props }, ref) => {
    const [imageError, setImageError] = useState(false);
    const showImage = src && !imageError;
    // Show initials only if no src provided (not on error)
    const showInitials = !src && initials;
    // Show icon on error or when no src and no initials
    const showIcon = imageError || (!src && !initials);

    const classes = ['avatar', className].filter(Boolean).join(' ');

    // Generate initials from alt text if not provided
    const displayInitials = initials || alt
      .split(' ')
      .map((word) => word[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    return (
      <div
        ref={ref}
        className={classes}
        data-size={size !== 'md' ? size : undefined}
        data-shape={shape !== 'circle' ? shape : undefined}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt}
            className="avatar__image"
            onError={() => setImageError(true)}
          />
        )}
        {showInitials && (
          <span className="avatar__initials" aria-hidden="true">
            {displayInitials}
          </span>
        )}
        {showIcon && (
          <svg
            className="avatar__fallback-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
