import type { ReactNode } from 'react';

type FormActionsAlign = 'start' | 'center' | 'end' | 'between' | 'stretch';

interface FormActionsProps {
  align?: FormActionsAlign;
  children: ReactNode;
  className?: string;
}

export function FormActions({
  align = 'end',
  children,
  className = '',
}: FormActionsProps) {
  const classes = ['form-actions', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-align={align !== 'end' ? align : undefined}>
      {children}
    </div>
  );
}

FormActions.displayName = 'FormActions';
