import { memo } from 'react';
import { type CoinCardProps } from './CoinCard.types'; 
import { CoinInfo } from '../CoinInfo/CoinInfo';
import { CoinActions } from '../CoinActions/CoinActions';
import styles from './CoinCard.module.css';

export const CoinCard = memo<CoinCardProps>(({ coin, onDelete, onUpdate, isOnline }) => {
  const cardLabel = `${coin.name} cryptocurrency, current price ${coin.price} USD`;

  console.log('CoinCard');

  return (
    <li className={styles['coin-card']} aria-label={cardLabel}>
      <CoinInfo coin={coin} />
      <CoinActions 
        coinId={coin.id}
        coinName={coin.name}
        onUpdate={onUpdate}
        onDelete={onDelete}
        isOnline={isOnline}
      />
    </li>
  );
}, (prevProps, nextProps) => {
  return prevProps.coin === nextProps.coin;
});