import type { ReactNode } from 'react';

interface DemoSectionProps {
  title: string;
  children: ReactNode;
}

export function DemoSection({ title, children }: DemoSectionProps) {
  return (
    <section className="demo__section">
      <h3 className="demo__section-title">{title}</h3>
      <div className="demo__section-content">{children}</div>
    </section>
  );
}
