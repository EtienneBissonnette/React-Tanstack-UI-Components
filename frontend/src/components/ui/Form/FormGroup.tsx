import type { ReactNode } from 'react';

type FormGroupLayout = 'vertical' | 'horizontal' | 'inline';

interface FormGroupProps {
  legend?: string;
  description?: string;
  layout?: FormGroupLayout;
  children: ReactNode;
  className?: string;
}

export function FormGroup({
  legend,
  description,
  layout = 'vertical',
  children,
  className = '',
}: FormGroupProps) {
  const classes = ['form-group', className].filter(Boolean).join(' ');

  return (
    <fieldset
      className={classes}
      data-layout={layout !== 'vertical' ? layout : undefined}
    >
      {legend && (
        <legend className="form-group__legend">
          {legend}
          {description && (
            <span className="form-group__description">{description}</span>
          )}
        </legend>
      )}
      <div className="form-group__content">{children}</div>
    </fieldset>
  );
}

FormGroup.displayName = 'FormGroup';
