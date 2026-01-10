import { DemoSection } from '../DemoSection';

const spacings = [1, 2, 3, 4, 6, 8];

export function SpacingDemo() {
  return (
    <DemoSection title="Spacing">
      <div className="demo__spacing-row">
        {spacings.map((n) => (
          <div key={n} className="demo__spacing-item">
            <div
              className="demo__spacing-box"
              style={{
                width: `var(--space-${n})`,
                height: `var(--space-${n})`,
              }}
            />
            <span>{n}</span>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}
