import { Tooltip, Button } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function TooltipDemo() {
  return (
    <DemoSection title="Tooltip">
      <div className="demo-section__row">
        <Tooltip content="This is a tooltip" side="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip content="This is a tooltip" side="right">
          <Button>Right</Button>
        </Tooltip>
        <Tooltip content="This is a tooltip" side="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip content="This is a tooltip" side="left">
          <Button>Left</Button>
        </Tooltip>
      </div>
      <div className="demo-section__row">
        <Tooltip content="Aligned to start" side="bottom" align="start">
          <Button>Start</Button>
        </Tooltip>
        <Tooltip content="Aligned to center" side="bottom" align="center">
          <Button>Center</Button>
        </Tooltip>
        <Tooltip content="Aligned to end" side="bottom" align="end">
          <Button>End</Button>
        </Tooltip>
      </div>
      <div className="demo-section__row">
        <Tooltip content="This tooltip appears instantly" delayDuration={0}>
          <Button>No Delay</Button>
        </Tooltip>
        <Tooltip content="This tooltip has a longer delay" delayDuration={800}>
          <Button>Long Delay</Button>
        </Tooltip>
      </div>
      <div className="demo-section__row">
        <Tooltip
          content={
            <span>
              Tooltips can have <strong>rich content</strong> with formatting
            </span>
          }
        >
          <Button intent="primary">Rich Content</Button>
        </Tooltip>
      </div>
    </DemoSection>
  );
}
