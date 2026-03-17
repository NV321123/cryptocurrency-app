import { type Coin } from '@/entities/coin/model/types';

export interface CoinCardProps {
  coin: Coin;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
  isOnline: boolean;
}