import { useState } from 'react';
import { Checkbox } from '../../../components/ui';
import { DemoSection } from '../DemoSection';

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <DemoSection title="Checkbox">
      <div className="demo__row">
        <Checkbox label="Default" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Disabled" disabled />
      </div>
      <div className="demo__row">
        <Checkbox
          label="Controlled"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <span className="demo__value">{checked ? 'true' : 'false'}</span>
      </div>
      <div className="demo__row">
        <Checkbox label="sm" size="sm" />
        <Checkbox label="md" size="md" />
        <Checkbox label="lg" size="lg" />
      </div>
      <div className="demo__row">
        <Checkbox label="Indeterminate" indeterminate />
      </div>
    </DemoSection>
  );
}
