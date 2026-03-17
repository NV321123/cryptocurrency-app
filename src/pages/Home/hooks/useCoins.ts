import { useReducer, useEffect, useCallback, useRef, useState } from 'react';
import { coinReducer } from '@/entities/coin/model/reducer';
import { type Coin } from '@/entities/coin/model/types';
import { fetchCoin } from '@/entities/coin/api/fetchCoin';
import { api } from '@/shared/lib/api';
import { storageService } from '@/shared/lib/storage/localStorage';
import { toast } from 'react-toastify';
import { INITIAL_COINS, STORAGE_KEY, UPDATE_INTERVAL_MS } from '../constants';

export const useCoins = (isOnline: boolean) => {

    const [coins, dispatch] = useReducer(coinReducer, INITIAL_COINS, (initial) => {
    const savedCoins = storageService.get<Coin[]>(STORAGE_KEY, []);
    if (savedCoins && savedCoins.length > 0) {
      const validCoins = savedCoins.filter((c: Coin) => 
        c && typeof c.price === 'number' && !isNaN(c.price)
      );
      return validCoins.length > 0 ? validCoins : initial;
    }
    return initial;
  });

  const [isSearching, setIsSearching] = useState(false);
  const coinsRef = useRef(coins);
  
  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);

  useEffect(() => {
    storageService.set(STORAGE_KEY, coins);
  }, [coins]);

  const fetchSingleCoinPrice = useCallback(async (symbol: string) => {
    try {
      const response = await api.get('/price', {
        params: { fsym: symbol, tsyms: 'USD', api_key: import.meta.env.VITE_API_KEY }
      });
      const newPrice = response.data.USD;
      dispatch({ type: 'UPDATE_COIN_PRICE', payload: { id: symbol, price: newPrice } });
    } catch (error) {
      console.error(`Error updating ${symbol}`, error);
    }
  }, []);

  const fetchAllPrices = useCallback(async () => {
    if (!isOnline) return;
    const currentCoins = coinsRef.current;
    const promises = currentCoins.map(coin => 
      api.get('/price', {
        params: { fsym: coin.id, tsyms: 'USD', api_key: import.meta.env.VITE_API_KEY }
      }).then(res => ({ id: coin.id, price: res.data.USD }))
      .catch(err => { console.error(err); return null; })
    );
    const results = await Promise.all(promises);
    results.forEach(result => {
      if (result && typeof result.price === 'number') {
        dispatch({ type: 'UPDATE_COIN_PRICE', payload: { id: result.id, price: result.price } });
      }
    });
  }, [isOnline]);

  useEffect(() => {
    fetchAllPrices();
    const id = setInterval(fetchAllPrices, UPDATE_INTERVAL_MS); 
    return () => clearInterval(id);
  }, [fetchAllPrices]);

  const handleSearch = useCallback(async (symbol: string) => {
    const upperSymbol = symbol.toUpperCase();

    if (coinsRef.current.some(c => c.id === upperSymbol)) {
      toast.info('This cryptocurrency is already in your list.');
      return;
    }

    if (!isOnline) {
      toast.error('You are offline.');
      return;
    }

    setIsSearching(true);
    try {
      const coinData = await fetchCoin(upperSymbol);
      
      dispatch({
        type: 'ADD_COIN',
        payload: { id: coinData.symbol, name: coinData.name, price: coinData.price, lastPrice: coinData.price, status: 'idle' }
      });
      
      toast.success(`${coinData.name} added successfully!`);
    } catch (error) {
      let errorMessage = 'Failed to find cryptocurrency';
      if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        if (msg.includes('timeout')) errorMessage = 'Request timed out.';
        else if (msg.includes('does not exist')) errorMessage = 'Cryptocurrency not found.';
        else if (msg.includes('api key')) errorMessage = 'API Error: Check your API Key configuration.';
        else errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsSearching(false);
    }
  }, [isOnline]);

  const handleDeleteCoin = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_COIN', payload: id });
  }, []);

  const handleUpdateSingle = useCallback((id: string) => {
    fetchSingleCoinPrice(id);
  }, [fetchSingleCoinPrice]);

  const handleUpdateAll = useCallback(() => {
    fetchAllPrices();
    if(isOnline) toast.info('Updating all coins...');
  }, [fetchAllPrices, isOnline]);

  return {
    coins,
    isSearching,
    handleSearch,
    handleDeleteCoin,
    handleUpdateSingle,
    handleUpdateAll,
  };
};