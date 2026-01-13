import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Card.css';

type CardVariant = 'default' | 'bordered' | 'elevated';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  children?: ReactNode;
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', interactive = false, className = '', children, ...props }, ref) => {
    const classes = ['card', className].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        data-variant={variant !== 'default' ? variant : undefined}
        data-padding={padding !== 'md' ? padding : undefined}
        data-interactive={interactive || undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardRoot.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['card__header', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'Card.Header';

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['card__body', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'Card.Body';

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    const classes = ['card__footer', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
