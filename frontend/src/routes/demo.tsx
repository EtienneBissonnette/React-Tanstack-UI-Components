import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button, Checkbox, Input, Select, Switch } from '../components/ui';

export const Route = createFileRoute('/demo')({
  component: DemoPage,
});

const selectOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

function DemoPage() {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [selected, setSelected] = useState<string>();

  return (
    <div className="demo">
      <h1 className="demo__title">Component Demo</h1>

      {/* Buttons */}
      <section className="demo__section">
        <h2 className="demo__section-title">Button</h2>
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
          <Button intent="primary" disabled>
            Primary Disabled
          </Button>
        </div>
      </section>

      {/* Input */}
      <section className="demo__section">
        <h2 className="demo__section-title">Input</h2>
        <div className="demo__row demo__row--stack">
          <Input placeholder="Default input" />
          <Input placeholder="With value" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <Input placeholder="Disabled" disabled />
        </div>
        <div className="demo__row demo__row--stack">
          <Input placeholder="Error state" state="error" />
          <Input placeholder="Success state" state="success" />
        </div>
        <div className="demo__row">
          <Input placeholder="Small" size="sm" />
          <Input placeholder="Medium" size="md" />
          <Input placeholder="Large" size="lg" />
        </div>
      </section>

      {/* Checkbox */}
      <section className="demo__section">
        <h2 className="demo__section-title">Checkbox</h2>
        <div className="demo__row">
          <Checkbox label="Default checkbox" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Disabled" disabled />
        </div>
        <div className="demo__row">
          <Checkbox
            label="Controlled"
            checked={checked}
            onCheckedChange={(val) => setChecked(val)}
          />
          <span className="demo__value">Value: {checked ? 'true' : 'false'}</span>
        </div>
        <div className="demo__row">
          <Checkbox label="Small" size="sm" />
          <Checkbox label="Medium" size="md" />
          <Checkbox label="Large" size="lg" />
        </div>
        <div className="demo__row">
          <Checkbox label="Indeterminate" indeterminate />
        </div>
      </section>

      {/* Switch */}
      <section className="demo__section">
        <h2 className="demo__section-title">Switch</h2>
        <div className="demo__row">
          <Switch label="Default switch" />
          <Switch label="Checked" defaultChecked />
          <Switch label="Disabled" disabled />
        </div>
        <div className="demo__row">
          <Switch
            label="Controlled"
            checked={switched}
            onCheckedChange={(val) => setSwitched(val)}
          />
          <span className="demo__value">Value: {switched ? 'on' : 'off'}</span>
        </div>
        <div className="demo__row">
          <Switch label="Small" size="sm" />
          <Switch label="Medium" size="md" />
          <Switch label="Large" size="lg" />
        </div>
      </section>

      {/* Select */}
      <section className="demo__section">
        <h2 className="demo__section-title">Select</h2>
        <div className="demo__row">
          <Select options={selectOptions} placeholder="Choose framework..." />
          <Select options={selectOptions} defaultValue="react" />
          <Select options={selectOptions} disabled placeholder="Disabled" />
        </div>
        <div className="demo__row">
          <Select
            options={selectOptions}
            value={selected}
            onValueChange={setSelected}
            placeholder="Controlled"
          />
          <span className="demo__value">Value: {selected ?? 'none'}</span>
        </div>
        <div className="demo__row">
          <Select options={selectOptions} size="sm" placeholder="Small" />
          <Select options={selectOptions} size="md" placeholder="Medium" />
          <Select options={selectOptions} size="lg" placeholder="Large" />
        </div>
      </section>

      {/* Theme Toggle */}
      <section className="demo__section">
        <h2 className="demo__section-title">Theme</h2>
        <div className="demo__row">
          <Button
            intent="primary"
            onClick={() => {
              const html = document.documentElement;
              const current = html.getAttribute('data-theme');
              html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
            }}
          >
            Toggle Dark Mode
          </Button>
        </div>
      </section>

      {/* Colors */}
      <section className="demo__section">
        <h2 className="demo__section-title">Colors</h2>
        <div className="demo__color-grid">
          <div className="demo__color-swatch" data-color="bg">
            --color-bg
          </div>
          <div className="demo__color-swatch" data-color="bg-secondary">
            --color-bg-secondary
          </div>
          <div className="demo__color-swatch" data-color="primary">
            --color-primary
          </div>
          <div className="demo__color-swatch" data-color="danger">
            --color-danger
          </div>
          <div className="demo__color-swatch" data-color="success">
            --color-success
          </div>
          <div className="demo__color-swatch" data-color="warning">
            --color-warning
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="demo__section">
        <h2 className="demo__section-title">Typography</h2>
        <p style={{ fontSize: 'var(--text-xs)' }}>Text XS (12px)</p>
        <p style={{ fontSize: 'var(--text-sm)' }}>Text SM (14px)</p>
        <p style={{ fontSize: 'var(--text-base)' }}>Text Base (16px)</p>
        <p style={{ fontSize: 'var(--text-lg)' }}>Text LG (18px)</p>
        <p style={{ fontSize: 'var(--text-xl)' }}>Text XL (20px)</p>
        <p style={{ fontSize: 'var(--text-2xl)' }}>Text 2XL (24px)</p>
      </section>

      {/* Spacing */}
      <section className="demo__section">
        <h2 className="demo__section-title">Spacing</h2>
        <div className="demo__spacing-grid">
          {[1, 2, 3, 4, 6, 8, 12].map((n) => (
            <div key={n} className="demo__spacing-item">
              <div
                className="demo__spacing-box"
                style={{ width: `var(--space-${n})`, height: `var(--space-${n})` }}
              />
              <span>--space-{n}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
