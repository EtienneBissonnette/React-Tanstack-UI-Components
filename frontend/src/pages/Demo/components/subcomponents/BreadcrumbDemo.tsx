import { Home, FolderOpen } from 'lucide-react';
import { Breadcrumb } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function BreadcrumbDemo() {
  return (
    <DemoSection title="Breadcrumb">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Basic breadcrumb */}
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Products</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Category</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Product Details</Breadcrumb.Item>
        </Breadcrumb>

        {/* With icons */}
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">
              <Home size={14} />
              Home
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">
              <FolderOpen size={14} />
              Documents
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Report.pdf</Breadcrumb.Item>
        </Breadcrumb>

        {/* Small size */}
        <Breadcrumb size="sm">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Settings</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Account</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Security</Breadcrumb.Item>
        </Breadcrumb>

        {/* With ellipsis for truncation */}
        <Breadcrumb>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Ellipsis />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Parent</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Current Page</Breadcrumb.Item>
        </Breadcrumb>

        {/* Custom separator */}
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Users</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">John Doe</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </DemoSection>
  );
}
