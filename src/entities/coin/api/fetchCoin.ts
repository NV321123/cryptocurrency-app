import { api } from '@/shared/lib/api';

interface FetchCoinResult {
  symbol: string;
  name: string;
  price: number;
}

export const fetchCoin = async (symbol: string): Promise<FetchCoinResult> => {
  const upperSymbol = symbol.toUpperCase();

  const response = await api.get('/price', {
    params: {
      fsym: upperSymbol,
      tsyms: 'USD',
      api_key: import.meta.env.VITE_API_KEY
    },
    timeout: 2500 
  });

  const price = response.data.USD;

  if (typeof price !== 'number' || isNaN(price)) {
    throw new Error('Invalid price data received for this coin.');
  }

  console.log('fetchCoin');

  return {
    symbol: upperSymbol,
    name: upperSymbol,
    price: price
  };
};