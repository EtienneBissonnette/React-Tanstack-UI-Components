import { Menu as BaseMenu } from '@base-ui/react/menu';
import { forwardRef, type ReactNode, type ReactElement, type ComponentPropsWithoutRef } from 'react';
import './DropdownMenu.css';

type DropdownMenuSide = 'top' | 'right' | 'bottom' | 'left';
type DropdownMenuAlign = 'start' | 'center' | 'end';
type DropdownMenuIntent = 'default' | 'danger';

interface DropdownMenuRootProps {
  children: ReactNode;
}

interface DropdownMenuTriggerProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactElement;
}

interface DropdownMenuContentProps {
  children: ReactNode;
  side?: DropdownMenuSide;
  align?: DropdownMenuAlign;
  sideOffset?: number;
}

interface DropdownMenuItemProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  intent?: DropdownMenuIntent;
  disabled?: boolean;
  onSelect?: () => void;
}

interface DropdownMenuSeparatorProps {
  className?: string;
}

interface DropdownMenuGroupProps {
  children: ReactNode;
  label?: string;
}

const DropdownMenuRoot = ({ children }: DropdownMenuRootProps) => {
  return <BaseMenu.Root>{children}</BaseMenu.Root>;
};

DropdownMenuRoot.displayName = 'DropdownMenu';

const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, className = '', ...props }, ref) => {
    const classes = ['dropdown-menu__trigger', className].filter(Boolean).join(' ');

    return (
      <BaseMenu.Trigger ref={ref} className={classes} render={children} {...props} />
    );
  }
);

DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger';

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ children, side = 'bottom', align = 'start', sideOffset = 4 }, ref) => {
    return (
      <BaseMenu.Portal>
        <BaseMenu.Positioner side={side} align={align} sideOffset={sideOffset}>
          <BaseMenu.Popup ref={ref} className="dropdown-menu__content">
            {children}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    );
  }
);

DropdownMenuContent.displayName = 'DropdownMenu.Content';

const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ children, intent = 'default', disabled = false, onSelect, className = '', ...props }, ref) => {
    const classes = ['dropdown-menu__item', className].filter(Boolean).join(' ');

    return (
      <BaseMenu.Item
        ref={ref}
        className={classes}
        data-intent={intent !== 'default' ? intent : undefined}
        disabled={disabled}
        onClick={onSelect}
        {...props}
      >
        {children}
      </BaseMenu.Item>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenu.Item';

const DropdownMenuSeparator = ({ className = '' }: DropdownMenuSeparatorProps) => {
  const classes = ['dropdown-menu__separator', className].filter(Boolean).join(' ');
  return <BaseMenu.Separator className={classes} />;
};

DropdownMenuSeparator.displayName = 'DropdownMenu.Separator';

const DropdownMenuGroup = ({ children, label }: DropdownMenuGroupProps) => {
  return (
    <BaseMenu.Group className="dropdown-menu__group">
      {label && (
        <BaseMenu.GroupLabel className="dropdown-menu__group-label">
          {label}
        </BaseMenu.GroupLabel>
      )}
      {children}
    </BaseMenu.Group>
  );
};

DropdownMenuGroup.displayName = 'DropdownMenu.Group';

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
  Group: DropdownMenuGroup,
});
