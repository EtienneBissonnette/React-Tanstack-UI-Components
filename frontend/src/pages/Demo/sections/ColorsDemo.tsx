import { DemoSection } from '../DemoSection';

export function ColorsDemo() {
  return (
    <DemoSection title="Colors">
      <div className="demo__color-grid">
        <div className="demo__color-swatch" data-color="bg">bg</div>
        <div className="demo__color-swatch" data-color="primary">primary</div>
        <div className="demo__color-swatch" data-color="secondary">secondary</div>
        <div className="demo__color-swatch" data-color="danger">danger</div>
        <div className="demo__color-swatch" data-color="success">success</div>
        <div className="demo__color-swatch" data-color="warning">warning</div>
      </div>
    </DemoSection>
  );
}
