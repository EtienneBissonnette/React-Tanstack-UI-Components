import { Avatar } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function AvatarDemo() {
  return (
    <DemoSection title="Avatar">
      <div className="demo-section__row">
        <Avatar size="xs" initials="XS" />
        <Avatar size="sm" initials="SM" />
        <Avatar size="md" initials="MD" />
        <Avatar size="lg" initials="LG" />
        <Avatar size="xl" initials="XL" />
      </div>
      <div className="demo-section__row">
        <Avatar src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
        <Avatar src="https://i.pravatar.cc/150?img=2" alt="Jane Smith" />
        <Avatar src="https://i.pravatar.cc/150?img=3" alt="Bob Wilson" />
        <Avatar initials="JD" />
        <Avatar alt="Auto Generated" />
      </div>
      <div className="demo-section__row">
        <Avatar shape="circle" initials="CI" />
        <Avatar shape="square" initials="SQ" />
        <Avatar shape="square" size="lg" src="https://i.pravatar.cc/150?img=4" alt="Square Avatar" />
      </div>
      <div className="demo-section__row">
        <Avatar src="invalid-url.jpg" initials="FB" />
        <span className="demo-section__label">Fallback on error</span>
      </div>
    </DemoSection>
  );
}
