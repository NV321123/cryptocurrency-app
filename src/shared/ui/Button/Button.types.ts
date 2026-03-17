import { type ReactNode } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'search' | 'updateAll' | 'update' | 'delete';
  children: ReactNode;
}