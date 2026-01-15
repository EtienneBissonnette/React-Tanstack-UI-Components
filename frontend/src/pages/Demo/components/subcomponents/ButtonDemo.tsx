import { useState } from 'react';
import { Button } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function ButtonDemo() {
  const [loading, setLoading] = useState<string | null>(null);

  const simulateLoading = (id: string) => {
    setLoading(id);
    setTimeout(() => setLoading(null), 2000);
  };

  return (
    <DemoSection title="Button">
      {/* Variants */}
      <div className="demo-section__row">
        <Button variant="solid">Solid</Button>
        <Button variant="soft">Soft</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      {/* Intents - Solid */}
      <div className="demo-section__row">
        <Button intent="primary">Primary</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="danger">Danger</Button>
      </div>

      {/* Intents - Soft */}
      <div className="demo-section__row">
        <Button variant="soft" intent="primary">Soft Primary</Button>
        <Button variant="soft" intent="secondary">Soft Secondary</Button>
        <Button variant="soft" intent="danger">Soft Danger</Button>
      </div>

      {/* Intents - Ghost */}
      <div className="demo-section__row">
        <Button variant="ghost" intent="primary">Ghost Primary</Button>
        <Button variant="ghost" intent="secondary">Ghost Secondary</Button>
        <Button variant="ghost" intent="danger">Ghost Danger</Button>
      </div>

      {/* Sizes */}
      <div className="demo-section__row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* Disabled */}
      <div className="demo-section__row">
        <Button disabled>Disabled</Button>
        <Button intent="primary" disabled>Primary Disabled</Button>
        <Button variant="ghost" disabled>Ghost Disabled</Button>
      </div>

      {/* Loading */}
      <div className="demo-section__row">
        <Button
          loading={loading === 'default'}
          onClick={() => simulateLoading('default')}
        >
          Click to Load
        </Button>
        <Button
          intent="primary"
          loading={loading === 'primary'}
          onClick={() => simulateLoading('primary')}
        >
          Save Changes
        </Button>
        <Button
          variant="soft"
          intent="danger"
          loading={loading === 'danger'}
          onClick={() => simulateLoading('danger')}
        >
          Delete
        </Button>
      </div>
    </DemoSection>
  );
}
