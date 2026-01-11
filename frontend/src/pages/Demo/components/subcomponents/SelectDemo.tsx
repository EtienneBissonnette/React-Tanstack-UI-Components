import { useState } from 'react';
import { Select } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

export function SelectDemo() {
  const [value, setValue] = useState<string>();

  return (
    <DemoSection title="Select">
      <div className="demo-section__row">
        <Select options={options} placeholder="Select..." />
        <Select options={options} defaultValue="react" />
        <Select options={options} disabled placeholder="Disabled" />
      </div>
      <div className="demo-section__row">
        <Select
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Controlled"
        />
        <span className="demo-section__value">{value ?? 'none'}</span>
      </div>
      <div className="demo-section__row">
        <Select options={options} size="sm" placeholder="sm" />
        <Select options={options} size="md" placeholder="md" />
        <Select options={options} size="lg" placeholder="lg" />
      </div>
    </DemoSection>
  );
}
