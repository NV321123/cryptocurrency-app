import { type Coin } from '../model/types';

type CoinAction =
  | { type: 'SET_COINS'; payload: Coin[] }
  | { type: 'ADD_COIN'; payload: Coin }
  | { type: 'REMOVE_COIN'; payload: string }
  | { type: 'UPDATE_COIN_PRICE'; payload: { id: string; price: number } };

export const coinReducer = (state: Coin[], action: CoinAction): Coin[] => {
  switch (action.type) {
    case 'SET_COINS':
      return action.payload;

    case 'ADD_COIN':
      if (state.some((c) => c.id === action.payload.id)) return state;
      return [...state, action.payload];

    case 'REMOVE_COIN':
      return state.filter((c) => c.id !== action.payload);

    case 'UPDATE_COIN_PRICE': {
      return state.map((coin) => {
        if (coin.id !== action.payload.id) return coin;

        const newPrice = action.payload.price;
        let status: Coin['status'] = 'same';

        if (coin.price !== 0) {
           if (newPrice > coin.price) status = 'up';
           if (newPrice < coin.price) status = 'down';
           if (newPrice === coin.price) status = 'same';
        }

        return {
          ...coin,
          lastPrice: coin.price,
          price: newPrice,
          status,
        };
      });
    }

    default:
      return state;
  }
};