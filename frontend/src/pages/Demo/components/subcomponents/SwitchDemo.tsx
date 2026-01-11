import { useState } from 'react';
import { Switch } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function SwitchDemo() {
  const [on, setOn] = useState(false);

  return (
    <DemoSection title="Switch">
      <div className="demo-section__row">
        <Switch label="Default" />
        <Switch label="On" defaultChecked />
        <Switch label="Disabled" disabled />
      </div>
      <div className="demo-section__row">
        <Switch
          label="Controlled"
          checked={on}
          onCheckedChange={setOn}
        />
        <span className="demo-section__value">{on ? 'on' : 'off'}</span>
      </div>
      <div className="demo-section__row">
        <Switch label="sm" size="sm" />
        <Switch label="md" size="md" />
        <Switch label="lg" size="lg" />
      </div>
    </DemoSection>
  );
}
