import { Tabs } from '@/components/ui';
import { ThemeControls } from './ThemeControls';
import { ComponentsDemo } from './components';
import { FormDemo } from './forms';
import { TablesDemo } from './tables';
import './Demo.css';

export function Demo() {
  return (
    <div className="demo">
      <ThemeControls />
      <header className="demo__header">
        <h1 className="demo__title">Design System</h1>
        <p className="demo__subtitle">
          Interactive component showcase with theme customization
        </p>
      </header>

      <div className="demo__tabs">
        <Tabs defaultValue="components">
          <Tabs.List>
            <Tabs.Trigger value="components">Components</Tabs.Trigger>
            <Tabs.Trigger value="forms">Forms</Tabs.Trigger>
            <Tabs.Trigger value="tables">Tables</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="components">
            <ComponentsDemo />
          </Tabs.Content>

          <Tabs.Content value="forms">
            <FormDemo />
          </Tabs.Content>

          <Tabs.Content value="tables">
            <TablesDemo />
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}
