import { useState } from 'react';
import { Radio, RadioGroup } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function RadioDemo() {
  const [plan, setPlan] = useState('pro');
  const [size, setSize] = useState('md');

  return (
    <DemoSection title="Radio">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Basic usage */}
        <RadioGroup
          label="Select a plan"
          value={plan}
          onValueChange={setPlan}
        >
          <Radio value="free" label="Free" description="Basic features, limited storage" />
          <Radio value="pro" label="Pro" description="All features, 100GB storage" />
          <Radio value="enterprise" label="Enterprise" description="Custom solutions, unlimited storage" />
        </RadioGroup>

        {/* Horizontal orientation */}
        <RadioGroup
          label="Size"
          value={size}
          onValueChange={setSize}
          orientation="horizontal"
        >
          <Radio value="sm" label="Small" />
          <Radio value="md" label="Medium" />
          <Radio value="lg" label="Large" />
        </RadioGroup>

        {/* Size variants */}
        <div className="demo-section__row" style={{ gap: 'var(--space-8)', flexWrap: 'wrap' }}>
          <RadioGroup label="Small size" size="sm" defaultValue="a">
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>

          <RadioGroup label="Large size" size="lg" defaultValue="x">
            <Radio value="x" label="Option X" />
            <Radio value="y" label="Option Y" />
          </RadioGroup>
        </div>

        {/* With disabled option */}
        <RadioGroup label="Availability" defaultValue="available">
          <Radio value="available" label="Available now" />
          <Radio value="preorder" label="Pre-order" />
          <Radio value="soldout" label="Sold out" disabled />
        </RadioGroup>
      </div>
    </DemoSection>
  );
}
