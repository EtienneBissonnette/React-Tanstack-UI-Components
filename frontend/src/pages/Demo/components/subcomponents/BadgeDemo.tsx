import { Badge } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function BadgeDemo() {
  return (
    <DemoSection title="Badge">
      <div className="demo-section__row">
        <Badge>Default</Badge>
        <Badge intent="primary">Primary</Badge>
        <Badge intent="secondary">Secondary</Badge>
        <Badge intent="success">Success</Badge>
        <Badge intent="warning">Warning</Badge>
        <Badge intent="danger">Danger</Badge>
      </div>
      <div className="demo-section__row">
        <Badge variant="solid">Solid</Badge>
        <Badge variant="solid" intent="primary">Primary</Badge>
        <Badge variant="solid" intent="success">Success</Badge>
        <Badge variant="solid" intent="warning">Warning</Badge>
        <Badge variant="solid" intent="danger">Danger</Badge>
      </div>
      <div className="demo-section__row">
        <Badge variant="outline">Outline</Badge>
        <Badge variant="outline" intent="primary">Primary</Badge>
        <Badge variant="outline" intent="success">Success</Badge>
        <Badge variant="outline" intent="warning">Warning</Badge>
        <Badge variant="outline" intent="danger">Danger</Badge>
      </div>
      <div className="demo-section__row">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </DemoSection>
  );
}
