import { useState, useEffect, useRef } from 'react';
import { Progress, Button } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function ProgressDemo() {
  const [value, setValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isAnimating) {
      intervalRef.current = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            setIsAnimating(false);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAnimating]);

  const startAnimation = () => {
    setValue(0);
    setIsAnimating(true);
  };

  return (
    <DemoSection title="Progress">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Interactive demo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Progress value={value} label="Upload progress" showValue />
          <Button size="sm" onClick={startAnimation} disabled={isAnimating}>
            {isAnimating ? 'Uploading...' : 'Start Upload'}
          </Button>
        </div>

        {/* Sizes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Progress value={60} size="sm" label="Small" showValue />
          <Progress value={45} size="md" label="Medium (default)" showValue />
          <Progress value={75} size="lg" label="Large" showValue />
        </div>

        {/* Indeterminate */}
        <Progress indeterminate label="Loading..." />

        {/* Complete state (100%) */}
        <Progress value={100} label="Complete" showValue />
      </div>
    </DemoSection>
  );
}
