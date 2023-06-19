import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ProcessedTokenData } from '@el-cap/interfaces';
import { processTokenData } from '@el-cap/utilities';
import { getCoin } from '../feed/el-cap-kit.js';

import { RootState } from '../store';

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

    console.log('fetching Coin', symbol, name);
    try {
      const coinData = await getCoin({ symbol, name });
      console.log('coindata', coinData);
      const processedCoin = processTokenData({
        ...coinData.redstone,
        ...coinData.remaining,
      });
      return [processedCoin];
    } catch (error) {
      console.log('fetching error', error);
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
          console.log('coin action', action);
          coinAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchCoin.rejected, (state: CoinState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
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
