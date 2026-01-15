import { useState } from 'react';
import { IconButton } from '@/components/ui';
import {
  Plus,
  Trash2,
  Settings,
  Heart,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Edit2,
  Copy,
} from 'lucide-react';
import { DemoSection } from '../../DemoSection';

export function IconButtonDemo() {
  const [loading, setLoading] = useState<string | null>(null);

  const simulateLoading = (id: string) => {
    setLoading(id);
    setTimeout(() => setLoading(null), 2000);
  };

  return (
    <DemoSection title="IconButton">
      {/* Variants */}
      <div className="demo-section__row">
        <IconButton aria-label="Ghost (default)">
          <Settings />
        </IconButton>
        <IconButton variant="soft" aria-label="Soft variant">
          <Settings />
        </IconButton>
        <IconButton variant="outline" aria-label="Outline variant">
          <Settings />
        </IconButton>
        <IconButton variant="solid" aria-label="Solid variant">
          <Settings />
        </IconButton>
      </div>

      {/* Intents - Ghost */}
      <div className="demo-section__row">
        <IconButton aria-label="Neutral">
          <Heart />
        </IconButton>
        <IconButton intent="primary" aria-label="Primary">
          <Plus />
        </IconButton>
        <IconButton intent="danger" aria-label="Danger">
          <Trash2 />
        </IconButton>
      </div>

      {/* Intents - Soft */}
      <div className="demo-section__row">
        <IconButton variant="soft" aria-label="Soft neutral">
          <Heart />
        </IconButton>
        <IconButton variant="soft" intent="primary" aria-label="Soft primary">
          <Plus />
        </IconButton>
        <IconButton variant="soft" intent="danger" aria-label="Soft danger">
          <Trash2 />
        </IconButton>
      </div>

      {/* Intents - Outline */}
      <div className="demo-section__row">
        <IconButton variant="outline" aria-label="Outline neutral">
          <Share2 />
        </IconButton>
        <IconButton variant="outline" intent="primary" aria-label="Outline primary">
          <Edit2 />
        </IconButton>
        <IconButton variant="outline" intent="danger" aria-label="Outline danger">
          <X />
        </IconButton>
      </div>

      {/* Intents - Solid */}
      <div className="demo-section__row">
        <IconButton variant="solid" aria-label="Solid neutral">
          <Check />
        </IconButton>
        <IconButton variant="solid" intent="primary" aria-label="Solid primary">
          <Plus />
        </IconButton>
        <IconButton variant="solid" intent="danger" aria-label="Solid danger">
          <Trash2 />
        </IconButton>
      </div>

      {/* Sizes */}
      <div className="demo-section__row">
        <IconButton size="sm" aria-label="Small">
          <Copy />
        </IconButton>
        <IconButton size="md" aria-label="Medium">
          <Copy />
        </IconButton>
        <IconButton size="lg" aria-label="Large">
          <Copy />
        </IconButton>
      </div>

      {/* Shapes */}
      <div className="demo-section__row">
        <IconButton shape="square" variant="soft" intent="primary" aria-label="Square">
          <ChevronLeft />
        </IconButton>
        <IconButton shape="circle" variant="soft" intent="primary" aria-label="Circle">
          <ChevronRight />
        </IconButton>
        <IconButton shape="circle" variant="solid" intent="primary" aria-label="Circle solid">
          <Plus />
        </IconButton>
      </div>

      {/* Disabled */}
      <div className="demo-section__row">
        <IconButton disabled aria-label="Disabled ghost">
          <MoreHorizontal />
        </IconButton>
        <IconButton variant="soft" disabled aria-label="Disabled soft">
          <MoreHorizontal />
        </IconButton>
        <IconButton variant="solid" intent="primary" disabled aria-label="Disabled solid">
          <Plus />
        </IconButton>
      </div>

      {/* Loading */}
      <div className="demo-section__row">
        <IconButton
          loading={loading === 'ghost'}
          onClick={() => simulateLoading('ghost')}
          aria-label="Click to load"
        >
          <Settings />
        </IconButton>
        <IconButton
          variant="soft"
          intent="primary"
          loading={loading === 'soft'}
          onClick={() => simulateLoading('soft')}
          aria-label="Click to load"
        >
          <Plus />
        </IconButton>
        <IconButton
          variant="solid"
          intent="danger"
          loading={loading === 'solid'}
          onClick={() => simulateLoading('solid')}
          aria-label="Click to delete"
        >
          <Trash2 />
        </IconButton>
      </div>
    </DemoSection>
  );
}
