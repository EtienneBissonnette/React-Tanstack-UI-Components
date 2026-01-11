import type { ReactNode } from 'react';
import './DemoSection.css';

interface DemoSectionProps {
  title: string;
  children: ReactNode;
}

export function DemoSection({ title, children }: DemoSectionProps) {
  return (
    <section className="demo-section">
      <h3 className="demo-section__title">{title}</h3>
      <div className="demo-section__content">{children}</div>
    </section>
  );
}
