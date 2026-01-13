import { Card, Button } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function CardDemo() {
  return (
    <DemoSection title="Card">
      <div className="demo-section__row" style={{ alignItems: 'flex-start' }}>
        <Card style={{ width: 280 }}>
          <Card.Header>
            <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)' }}>
              Default Card
            </h3>
          </Card.Header>
          <Card.Body>
            <p style={{ margin: 0, color: 'var(--color-fg-muted)', fontSize: 'var(--text-sm)' }}>
              This is the card body content with default styling.
            </p>
          </Card.Body>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>

        <Card variant="bordered" style={{ width: 280 }}>
          <Card.Header>
            <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)' }}>
              Bordered
            </h3>
          </Card.Header>
          <Card.Body>
            <p style={{ margin: 0, color: 'var(--color-fg-muted)', fontSize: 'var(--text-sm)' }}>
              Card with a more pronounced border.
            </p>
          </Card.Body>
        </Card>

        <Card variant="elevated" style={{ width: 280 }}>
          <Card.Header>
            <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)' }}>
              Elevated
            </h3>
          </Card.Header>
          <Card.Body>
            <p style={{ margin: 0, color: 'var(--color-fg-muted)', fontSize: 'var(--text-sm)' }}>
              Card with shadow elevation and no border.
            </p>
          </Card.Body>
        </Card>
      </div>

      <div className="demo-section__row" style={{ alignItems: 'flex-start' }}>
        <Card interactive style={{ width: 280 }}>
          <Card.Body>
            <h3 style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)' }}>
              Interactive Card
            </h3>
            <p style={{ margin: 0, color: 'var(--color-fg-muted)', fontSize: 'var(--text-sm)' }}>
              Hover over this card to see the interactive effect.
            </p>
          </Card.Body>
        </Card>

        <Card padding="sm" style={{ width: 200 }}>
          <Card.Body>Small padding</Card.Body>
        </Card>

        <Card padding="lg" style={{ width: 200 }}>
          <Card.Body>Large padding</Card.Body>
        </Card>
      </div>
    </DemoSection>
  );
}
