import { Input as BaseInput } from '@base-ui/react/input';
import { forwardRef, type InputHTMLAttributes } from 'react';
import './Input.css';

type InputSize = 'sm' | 'md' | 'lg';
type InputStatus = 'default' | 'error' | 'success';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  status?: InputStatus;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', status = 'default', className = '', ...props }, ref) => {
    const classes = ['input', className].filter(Boolean).join(' ');

    return (
      <BaseInput
        ref={ref}
        className={classes}
        data-size={size !== 'md' ? size : undefined}
        data-status={status !== 'default' ? status : undefined}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
