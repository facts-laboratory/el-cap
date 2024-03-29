import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ProcessedTokenData, State } from '@el-cap/interfaces';
import { getCoin } from '../feed/el-cap-kit.js';
import {
  getCrewMemberContract,
  readState,
} from '@el-cap/contract-integrations';

import { RootState } from '../store';
import { checkCoinsOnWatchlist } from '@el-cap/utilities';

export const COIN_FEATURE_KEY = 'coin';

/*
 * Update these interfaces according to your requirements.
 */

export interface CoinState extends EntityState<ProcessedTokenData> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const coinAdapter = createEntityAdapter<ProcessedTokenData>();

export const fetchCoin = createAsyncThunk(
  'coin/fetchStatus',
  async (input: { symbol: string; name: string }, thunkAPI) => {
    const { symbol, name } = input;
    const state = thunkAPI.getState() as RootState;
    const address = state.user.user?.addr;

    try {
      const coinData = await getCoin({ symbol, name });
      const processedCoin = {
        name: coinData.remaining.name || '',
        image: coinData.remaining.image?.large || '',
        coin: coinData.redstone.symbol || '',
        price: coinData.redstone.value || 0,
        marketCap: coinData.remaining.market_data.market_cap.usd || 0,
        volume: coinData.remaining.market_data.total_volume.usd || 0,
        circulatingSupply:
          coinData.remaining.market_data.circulating_supply || 0,
        '1h':
          coinData.remaining.market_data.price_change_percentage_1h_in_currency
            .usd || 0,
        '24h':
          coinData.remaining.market_data.price_change_percentage_24h_in_currency
            .usd || 0,
        '7d':
          coinData.remaining.market_data.price_change_percentage_7d_in_currency
            .usd || 0,
      };
      const coinWithWatchListFlag = await checkCoinsOnWatchlist(
        [processedCoin],
        address
      );

      return coinWithWatchListFlag;
    } catch (error) {
      return [];
    }
  }
);

export const initialCoinState: CoinState = coinAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const coinSlice = createSlice({
  name: COIN_FEATURE_KEY,
  initialState: initialCoinState,
  reducers: {
    add: coinAdapter.addOne,
    remove: coinAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoin.pending, (state: CoinState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchCoin.fulfilled,
        (state: CoinState, action: PayloadAction<ProcessedTokenData[]>) => {
          coinAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      );
  },
});

/*
 * Export reducer for store configuration.
 */
export const coinReducer = coinSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(coinActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const coinActions = coinSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllCoin);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = coinAdapter.getSelectors();

export const getCoinState = (rootState: RootState): CoinState =>
  rootState[COIN_FEATURE_KEY];

export const selectAllCoin = createSelector(getCoinState, selectAll);

export const selectCoinLoadingStatus = createSelector(
  getCoinState,
  (state: CoinState) => state.loadingStatus
);

export const selectCoinEntities = createSelector(getCoinState, selectEntities);
