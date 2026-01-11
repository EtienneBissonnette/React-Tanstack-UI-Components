import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button, Drawer } from '../../../components/ui';
import { DemoSection } from '../DemoSection';
import type { DrawerPosition } from '../../../components/ui/Overlay';

export function DrawerDemo() {
  const [positionDrawerOpen, setPositionDrawerOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<DrawerPosition>('right');
  const [sizeDrawerOpen, setSizeDrawerOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  const openPositionDrawer = (position: DrawerPosition) => {
    setCurrentPosition(position);
    setPositionDrawerOpen(true);
  };

  const openSizeDrawer = (size: 'sm' | 'md' | 'lg' | 'xl') => {
    setCurrentSize(size);
    setSizeDrawerOpen(true);
  };

  return (
    <DemoSection title="Drawer">
      {/* Positions */}
      <div className="demo__row">
        <Button onClick={() => openPositionDrawer('left')}>Left</Button>
        <Button onClick={() => openPositionDrawer('right')}>Right</Button>
        <Button onClick={() => openPositionDrawer('top')}>Top</Button>
        <Button onClick={() => openPositionDrawer('bottom')}>Bottom</Button>
      </div>

      {/* Sizes */}
      <div className="demo__row">
        <Button intent="secondary" onClick={() => openSizeDrawer('sm')}>
          Small
        </Button>
        <Button intent="secondary" onClick={() => openSizeDrawer('md')}>
          Medium
        </Button>
        <Button intent="secondary" onClick={() => openSizeDrawer('lg')}>
          Large
        </Button>
        <Button intent="secondary" onClick={() => openSizeDrawer('xl')}>
          Extra Large
        </Button>
      </div>

      {/* URL-driven */}
      <div className="demo__row">
        <Link
          to="/demo"
          search={(prev) => ({ ...prev, drawer: 'nav' })}
          replace
        >
          <Button intent="primary">URL-Driven Drawer</Button>
        </Link>
      </div>

      {/* Position demo drawer */}
      <Drawer
        open={positionDrawerOpen}
        onOpenChange={setPositionDrawerOpen}
        position={currentPosition}
        size="md"
        aria-labelledby="position-drawer-title"
      >
        <Drawer.Header>
          <h2 id="position-drawer-title">
            Position: {currentPosition.charAt(0).toUpperCase() + currentPosition.slice(1)}
          </h2>
        </Drawer.Header>
        <Drawer.Body>
          <p>
            This drawer slides in from the <strong>{currentPosition}</strong> edge.
          </p>
          <p style={{ marginTop: 'var(--space-4)' }}>
            Available positions: <code>left</code>, <code>right</code>,{' '}
            <code>top</code>, <code>bottom</code>
          </p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setPositionDrawerOpen(false)}>Close</Button>
        </Drawer.Footer>
      </Drawer>

      {/* Size demo drawer */}
      <Drawer
        open={sizeDrawerOpen}
        onOpenChange={setSizeDrawerOpen}
        position="right"
        size={currentSize}
        aria-labelledby="size-drawer-title"
      >
        <Drawer.Header>
          <h2 id="size-drawer-title">Size: {currentSize.toUpperCase()}</h2>
        </Drawer.Header>
        <Drawer.Body>
          <p>
            This drawer demonstrates the <strong>{currentSize}</strong> size variant.
          </p>
          <p style={{ marginTop: 'var(--space-4)' }}>
            For left/right drawers, size controls width.
            <br />
            For top/bottom drawers, size controls height.
          </p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => setSizeDrawerOpen(false)}>Close</Button>
        </Drawer.Footer>
      </Drawer>

      {/* URL-driven drawer */}
      <Drawer
        searchParamKey="drawer"
        searchParamValue="nav"
        position="right"
        size="md"
        aria-labelledby="url-drawer-title"
      >
        <Drawer.Header>
          <h2 id="url-drawer-title">Navigation</h2>
        </Drawer.Header>
        <Drawer.Body>
          <p>
            This drawer is controlled via URL search params.
          </p>
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-fg-muted)' }}>
            Check the URL - it now includes <code>?drawer=nav</code>
          </p>
          <nav style={{ marginTop: 'var(--space-6)' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: 'var(--space-2) 0' }}>Home</li>
              <li style={{ padding: 'var(--space-2) 0' }}>Products</li>
              <li style={{ padding: 'var(--space-2) 0' }}>About</li>
              <li style={{ padding: 'var(--space-2) 0' }}>Contact</li>
            </ul>
          </nav>
        </Drawer.Body>
        <Drawer.Footer>
          <Link
            to="/demo"
            search={(prev) => ({ ...prev, drawer: undefined })}
            replace
          >
            <Button>Close</Button>
          </Link>
        </Drawer.Footer>
      </Drawer>
    </DemoSection>
  );
}
