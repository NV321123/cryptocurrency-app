import { memo } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { type CoinActionsProps } from './CoinActions.types';
import styles from './CoinActions.module.css';

export const CoinActions = memo<CoinActionsProps>(({ 
  coinId, 
  coinName,
  onUpdate, 
  onDelete, 
  isOnline 
}) => {

  console.log('CoinActions');

  return (
    <div className={styles['coin-card__actions']}>
      <Button 
        variant="update" 
        onClick={() => onUpdate(coinId)} 
        className={styles['coin-card__update-btn']}
        disabled={!isOnline} 
      >
        Update
      </Button>
      <Button 
        variant="delete" 
        onClick={() => onDelete(coinId)} 
        aria-label={`Delete ${coinName}`}
      >
        Delete
      </Button>
    </div>
  );
});