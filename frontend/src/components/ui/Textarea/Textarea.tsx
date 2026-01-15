import { forwardRef, type TextareaHTMLAttributes } from 'react';
import './Textarea.css';

type TextareaSize = 'sm' | 'md' | 'lg';
type TextareaStatus = 'default' | 'error' | 'success';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: TextareaSize;
  status?: TextareaStatus;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'md', status = 'default', className = '', ...props }, ref) => {
    const classes = ['textarea', className].filter(Boolean).join(' ');

    return (
      <textarea
        ref={ref}
        className={classes}
        data-size={size !== 'md' ? size : undefined}
        data-status={status !== 'default' ? status : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
