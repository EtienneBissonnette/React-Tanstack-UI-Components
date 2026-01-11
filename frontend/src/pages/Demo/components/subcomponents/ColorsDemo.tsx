import { DemoSection } from '../../DemoSection';
import './ColorsDemo.css';

export function ColorsDemo() {
  return (
    <DemoSection title="Colors">
      <div className="colors-demo__grid">
        <div className="colors-demo__swatch" data-color="bg">bg</div>
        <div className="colors-demo__swatch" data-color="primary">primary</div>
        <div className="colors-demo__swatch" data-color="secondary">secondary</div>
        <div className="colors-demo__swatch" data-color="danger">danger</div>
        <div className="colors-demo__swatch" data-color="success">success</div>
        <div className="colors-demo__swatch" data-color="warning">warning</div>
      </div>
    </DemoSection>
  );
}
