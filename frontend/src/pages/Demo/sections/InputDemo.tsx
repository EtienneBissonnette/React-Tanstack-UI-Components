import { useState } from 'react';
import { Input } from '../../../components/ui';
import { DemoSection } from '../DemoSection';

export function InputDemo() {
  const [value, setValue] = useState('');

  return (
    <DemoSection title="Input">
      <div className="demo__row demo__row--stack">
        <Input placeholder="Default input" />
        <Input
          placeholder="Controlled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input placeholder="Disabled" disabled />
      </div>
      <div className="demo__row demo__row--stack">
        <Input placeholder="Error state" state="error" />
        <Input placeholder="Success state" state="success" />
      </div>
      <div className="demo__row">
        <Input placeholder="sm" size="sm" />
        <Input placeholder="md" size="md" />
        <Input placeholder="lg" size="lg" />
      </div>
    </DemoSection>
  );
}
