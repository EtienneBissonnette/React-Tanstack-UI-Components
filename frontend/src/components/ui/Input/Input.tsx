import { Input as BaseInput } from '@base-ui/react/input';
import { forwardRef, type InputHTMLAttributes } from 'react';
import './Input.css';

type InputSize = 'sm' | 'md' | 'lg';
type InputState = 'default' | 'error' | 'success';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  state?: InputState;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', state = 'default', className = '', ...props }, ref) => {
    const classes = ['input', className].filter(Boolean).join(' ');

    return (
      <BaseInput
        ref={ref}
        className={classes}
        data-size={size !== 'md' ? size : undefined}
        data-state={state !== 'default' ? state : undefined}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
