import React, { useRef, memo } from 'react';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { type AddCoinFormProps } from './AddCoinForm.types';
import styles from './AddCoinForm.module.css';

export const AddCoinForm = memo<AddCoinFormProps>(({ 
  onSearch, 
  isLoading, 
  isOnline 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const symbol = inputRef.current?.value || '';
    
    if (symbol.trim()) {
      onSearch(symbol);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <form className={styles['add-coin-form']} onSubmit={handleSubmit}>
      <div className={styles['add-coin-form__input-wrapper']}>
        <Input
          label="Search Cryptocurrency"
          ref={inputRef}
          placeholder="e.g. BTC, ETH"
          disabled={isLoading || !isOnline}
        />
        <Button 
          variant="search" 
          type="submit" 
          disabled={isLoading || !isOnline}
          className={styles['add-coin-form__btn']}
        >
          {isLoading ? '...' : 'Search'}
        </Button>
      </div>
    </form>
  );
});