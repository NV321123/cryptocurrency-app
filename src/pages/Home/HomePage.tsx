import React, { useMemo } from 'react'; 
import { CoinCard } from '@/entities/coin/ui/CoinCard/CoinCard';
import { AddCoinForm } from '@/features/add-coin/ui/AddCoinForm/AddCoinForm';
import { UpdateAllButton } from '@/features/update-all/ui/UpdateAllButton/UpdateAllButton';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';
import { useCoins } from './hooks/useCoins';
import clsx from 'clsx';
import styles from './HomePage.module.css'; 

export const HomePage: React.FC = () => {
  const isOnline = useOnlineStatus();
  
  const {
    coins,
    isSearching,
    handleSearch,
    handleDeleteCoin,
    handleUpdateSingle,
    handleUpdateAll,
  } = useCoins(isOnline);

  const coinsList = useMemo(() => (
    <ul className={styles['coin-grid']}>
      {coins.map(coin => (
        <CoinCard
          key={coin.id}
          coin={coin}
          onDelete={handleDeleteCoin}
          onUpdate={handleUpdateSingle}
          isOnline={isOnline}
        />
      ))}
    </ul>
  ), [coins, handleDeleteCoin, handleUpdateSingle, isOnline]);

  console.log('HomePage');

  return (
    <div className={styles['home-page']}>
      <header className={styles['home-page__header']}>
        <h1>Cryptocurrency</h1>
        <div className={styles['connection-status']}>
          <span className={clsx(styles['status-dot'], isOnline ? styles.online : styles.offline)}></span>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </header>

      <main className={styles['home-page__main']}>
        <section className={styles['search-section']}>
          <AddCoinForm 
            onSearch={handleSearch} 
            isLoading={isSearching}
            isOnline={isOnline}
          />
        </section>

        <section className={styles['controls-section']}>
           <UpdateAllButton onUpdateAll={handleUpdateAll} isOnline={isOnline} />
        </section>

        <section className={styles['list-section']}>
          {coins.length === 0 ? (
            <p className={styles['empty-state']}>No cryptocurrencies followed yet.</p>
          ) : (
            coinsList
          )}
        </section>
      </main>
    </div>
  );
};