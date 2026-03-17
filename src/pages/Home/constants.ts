import { type Coin } from '@/entities/coin/model/types';

export const STORAGE_KEY = 'cryptoCoins';

export const INITIAL_COINS: Coin[] = [
  {
    id: 'DOGE',
    name: 'DOGE',
    price: 0,
    lastPrice: 0,
    status: 'idle',
  }
];

export const UPDATE_INTERVAL_MS = 10000; 