import { DemoSection } from '../DemoSection';

export function TypographyDemo() {
  return (
    <DemoSection title="Typography">
      <div className="demo__typography">
        <p style={{ fontSize: 'var(--text-xs)' }}>text-xs (12px)</p>
        <p style={{ fontSize: 'var(--text-sm)' }}>text-sm (14px)</p>
        <p style={{ fontSize: 'var(--text-base)' }}>text-base (16px)</p>
        <p style={{ fontSize: 'var(--text-lg)' }}>text-lg (18px)</p>
        <p style={{ fontSize: 'var(--text-xl)' }}>text-xl (20px)</p>
        <p style={{ fontSize: 'var(--text-2xl)' }}>text-2xl (24px)</p>
      </div>
    </DemoSection>
  );
}
