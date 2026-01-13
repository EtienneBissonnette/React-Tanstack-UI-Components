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
      <div className="demo-section__row">
        <Button>Default</Button>
        <Button intent="primary">Primary</Button>
        <Button intent="secondary">Secondary</Button>
        <Button intent="danger">Danger</Button>
        <Button intent="ghost">Ghost</Button>
      </div>
      <div className="demo-section__row">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="demo-section__row">
        <Button disabled>Disabled</Button>
        <Button intent="primary" disabled>Primary Disabled</Button>
      </div>
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
