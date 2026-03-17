import { memo } from 'react';
import clsx from 'clsx';
import { type CoinInfoProps } from './CoinInfo.types';
import styles from './CoinInfo.module.css';

const formatPrice = (val: number | undefined) => {
  if (typeof val !== 'number' || isNaN(val)) return '...';
  return val.toFixed(2);
};

export const CoinInfo = memo<CoinInfoProps>(({ coin }) => {

  console.log('CoinInfo');

  return (
    <div className={styles['coin-info-wrapper']}>
      <h3 className={styles['coin-card__name']}>{coin.name}</h3>
      <div className={styles['coin-card__price-container']}>
        <span className={clsx(
          styles['coin-card__price'],
          { 
            [styles['coin-card__price--up']]: coin.status === 'up',
            [styles['coin-card__price--down']]: coin.status === 'down'
          }
        )}>
          ${formatPrice(coin.price)}
        </span>
        <div 
          className={clsx(styles['coin-card__status'], styles[`coin-card__status--${coin.status}`])}
          aria-live="polite"
          aria-label={`Status: ${coin.status}`}
        >
          {coin.status === 'up' && <span aria-hidden="true" className="arrow">▲</span>}
          {coin.status === 'down' && <span aria-hidden="true" className="arrow">▼</span>}
          {coin.status === 'same' && <span aria-hidden="true" className="arrow">-</span>}
          {coin.status === 'idle' && <span aria-hidden="true" className="arrow">...</span>}
        </div>
      </div>
    </div>
  );
});
