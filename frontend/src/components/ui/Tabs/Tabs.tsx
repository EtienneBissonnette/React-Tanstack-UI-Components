import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ReactNode } from 'react';
import './Tabs.css';

type TabsSize = 'sm' | 'md' | 'lg';

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  size?: TabsSize;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

function TabsRoot({
  defaultValue,
  value,
  onValueChange,
  children,
  className = '',
}: TabsProps) {
  const classes = ['tabs', className].filter(Boolean).join(' ');

  return (
    <BaseTabs.Root
      className={classes}
      defaultValue={defaultValue}
      value={value}
      onValueChange={(val) => {
        if (val !== null && onValueChange) {
          onValueChange(val);
        }
      }}
    >
      {children}
    </BaseTabs.Root>
  );
}

function TabsList({ children, size = 'md', className = '' }: TabsListProps) {
  const classes = ['tabs__list', className].filter(Boolean).join(' ');

  return (
    <BaseTabs.List
      className={classes}
      data-size={size !== 'md' ? size : undefined}
    >
      {children}
      <BaseTabs.Indicator className="tabs__indicator" />
    </BaseTabs.List>
  );
}

function TabsTrigger({
  value,
  children,
  disabled = false,
  className = '',
}: TabsTriggerProps) {
  const classes = ['tabs__trigger', className].filter(Boolean).join(' ');

  return (
    <BaseTabs.Tab className={classes} value={value} disabled={disabled}>
      {children}
    </BaseTabs.Tab>
  );
}

function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const classes = ['tabs__content', className].filter(Boolean).join(' ');

  return (
    <BaseTabs.Panel className={classes} value={value}>
      {children}
    </BaseTabs.Panel>
  );
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

TabsRoot.displayName = 'Tabs';
TabsList.displayName = 'Tabs.List';
TabsTrigger.displayName = 'Tabs.Trigger';
TabsContent.displayName = 'Tabs.Content';
