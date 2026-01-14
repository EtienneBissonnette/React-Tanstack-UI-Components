import { ChevronRight } from 'lucide-react';
import {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
  type AnchorHTMLAttributes,
  Children,
  isValidElement,
  cloneElement,
  type ReactElement,
} from 'react';
import './Breadcrumb.css';

type BreadcrumbSize = 'sm' | 'md';

/* =============================================================================
   Breadcrumb - Root navigation container
   ============================================================================= */

interface BreadcrumbRootProps extends HTMLAttributes<HTMLElement> {
  /** Size variant */
  size?: BreadcrumbSize;
  /** Custom separator element */
  separator?: ReactNode;
  children: ReactNode;
}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbRootProps>(
  ({ size = 'md', separator, children, className = '', ...props }, ref) => {
    const classes = ['breadcrumb', className].filter(Boolean).join(' ');

    return (
      <nav
        ref={ref}
        className={classes}
        aria-label="Breadcrumb"
        data-size={size !== 'md' ? size : undefined}
        {...props}
      >
        <BreadcrumbList separator={separator}>{children}</BreadcrumbList>
      </nav>
    );
  }
);

BreadcrumbRoot.displayName = 'Breadcrumb';

/* =============================================================================
   BreadcrumbList - Ordered list of items
   ============================================================================= */

interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {
  separator?: ReactNode;
  children: ReactNode;
}

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ separator, children, className = '', ...props }, ref) => {
    const classes = ['breadcrumb__list', className].filter(Boolean).join(' ');
    const childArray = Children.toArray(children).filter(isValidElement);
    const lastIndex = childArray.length - 1;

    return (
      <ol ref={ref} className={classes} {...props}>
        {childArray.map((child, index) => {
          const isLast = index === lastIndex;
          // Clone the child and add isLast prop
          const clonedChild = cloneElement(child as ReactElement<BreadcrumbItemProps>, {
            isLast,
          });

          return (
            <li key={index} className="breadcrumb__list-item">
              {clonedChild}
              {!isLast && (
                <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
              )}
            </li>
          );
        })}
      </ol>
    );
  }
);

BreadcrumbList.displayName = 'Breadcrumb.List';

/* =============================================================================
   BreadcrumbItem - Individual breadcrumb item
   ============================================================================= */

interface BreadcrumbItemProps extends HTMLAttributes<HTMLSpanElement> {
  /** Internal: marks this as the current page */
  isLast?: boolean;
  children: ReactNode;
}

const BreadcrumbItem = forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  ({ isLast, children, className = '', ...props }, ref) => {
    const classes = ['breadcrumb__item', className].filter(Boolean).join(' ');

    // If this is the last item, render as current page
    if (isLast) {
      return (
        <span
          ref={ref}
          className={classes}
          aria-current="page"
          data-current=""
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

BreadcrumbItem.displayName = 'Breadcrumb.Item';

/* =============================================================================
   BreadcrumbLink - Clickable breadcrumb link
   ============================================================================= */

interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ children, className = '', ...props }, ref) => {
    const classes = ['breadcrumb__link', className].filter(Boolean).join(' ');

    return (
      <a ref={ref} className={classes} {...props}>
        {children}
      </a>
    );
  }
);

BreadcrumbLink.displayName = 'Breadcrumb.Link';

/* =============================================================================
   BreadcrumbSeparator - Visual separator between items
   ============================================================================= */

interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ children, className = '', ...props }, ref) => {
    const classes = ['breadcrumb__separator', className].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classes} aria-hidden="true" {...props}>
        {children || <ChevronRight size={14} />}
      </span>
    );
  }
);

BreadcrumbSeparator.displayName = 'Breadcrumb.Separator';

/* =============================================================================
   BreadcrumbEllipsis - Truncation indicator
   ============================================================================= */

const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className = '', ...props }, ref) => {
    const classes = ['breadcrumb__ellipsis', className].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        ...
      </span>
    );
  }
);

BreadcrumbEllipsis.displayName = 'Breadcrumb.Ellipsis';

/* =============================================================================
   Export compound component
   ============================================================================= */

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
});
