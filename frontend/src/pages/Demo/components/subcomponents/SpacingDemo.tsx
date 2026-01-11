import { DemoSection } from '../../DemoSection';
import './SpacingDemo.css';

const spacings = [1, 2, 3, 4, 6, 8];

export function SpacingDemo() {
  return (
    <DemoSection title="Spacing">
      <div className="spacing-demo__row">
        {spacings.map((n) => (
          <div key={n} className="spacing-demo__item">
            <div
              className="spacing-demo__box"
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
