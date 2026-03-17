import { memo } from 'react';
import clsx from 'clsx';
import { type ButtonProps } from './Button.types';
import styles from './Button.module.css';

const toKebabCase = (str: string) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

export const Button = memo<ButtonProps>(({ 
  variant = 'search', 
  className, 
  children, 
  ...props 
}) => {

  const variantClass = `btn--${toKebabCase(variant)}`;

  console.log((`Button ${variant}`));


  return (
    <button 
      className={clsx(styles.btn, styles[variantClass], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';