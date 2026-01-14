import { forwardRef, type TextareaHTMLAttributes } from 'react';
import './Textarea.css';

type TextareaSize = 'sm' | 'md' | 'lg';
type TextareaState = 'default' | 'error' | 'success';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: TextareaSize;
  state?: TextareaState;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'md', state = 'default', className = '', ...props }, ref) => {
    const classes = ['textarea', className].filter(Boolean).join(' ');

    return (
      <textarea
        ref={ref}
        className={classes}
        data-size={size !== 'md' ? size : undefined}
        data-state={state !== 'default' ? state : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
