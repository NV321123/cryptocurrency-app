import { memo, forwardRef, useId } from 'react';
import clsx from 'clsx';
import { type InputProps } from './Input.types';
import styles from './Input.module.css';

export const Input = memo(forwardRef<HTMLInputElement, InputProps>(({ 
  label, 
  error, 
  className, 
  id, 
  ...props 
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={clsx(styles['input-group'], className)}>
      {label && (
        <label htmlFor={inputId} className={styles['input-label']}>
          {label}
        </label>
      )}

      <input 
        id={inputId} 
        ref={ref} 
        className={clsx(styles['input-field'], { [styles['input-field--error']]: error })} 
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props} 
      />
      {error && (
        <span id={`${inputId}-error`} className={styles['input-error']}>
          {error}
        </span>
      )}
    </div>
  );
}));

Input.displayName = 'Input';