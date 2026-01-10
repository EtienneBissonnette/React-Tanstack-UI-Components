import { Button } from '../../../components/ui';
import { DemoSection } from '../DemoSection';

export function ButtonDemo() {
  return (
    <DemoSection title="Button">
      <div className="demo__row">
        <Button>Default</Button>
        <Button intent="primary">Primary</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="danger">Danger</Button>
        <Button intent="ghost">Ghost</Button>
      </div>
      <div className="demo__row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="demo__row">
        <Button disabled>Disabled</Button>
        <Button intent="primary" disabled>Primary Disabled</Button>
      </div>
    </DemoSection>
  );
}
