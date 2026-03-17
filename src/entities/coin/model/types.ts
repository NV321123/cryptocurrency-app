export type CoinStatus = 'up' | 'down' | 'same' | 'idle';

export interface Coin {
  id: string;
  name: string;
  price: number;
  lastPrice: number;
  status: CoinStatus;
}