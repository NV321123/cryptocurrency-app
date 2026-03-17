export interface CoinActionsProps {
  coinId: string;
  coinName: string;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  isOnline: boolean;
}