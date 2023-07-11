import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ProcessedTokenData, State } from '@el-cap/interfaces';
import {
  checkCoinsOnWatchlist,
  processTokenData,
  sortPrices,
} from '@el-cap/utilities';

export const WATCHLIST_FEATURE_KEY = 'watchlist';

/*
 * Update these interfaces according to your requirements.
 */
export interface WatchlistEntity {
  name: string;
  image: string;
  coin: string;
  price: number;
  marketCap: number;
  volume: number;
  circulatingSupply: number;
  '1h': number;
  '24h': number;
  '7d': number;
  watchlist?: boolean;
}

export interface WatchlistState extends EntityState<WatchlistEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
}

export const watchlistAdapter = createEntityAdapter<WatchlistEntity>({
  selectId: (entity) => entity.coin,
});

export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchStatus',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const coins = state.contracts.entities;
    const address = state.user.user?.addr;

    const coinsOnWatchlist = await checkCoinsOnWatchlist(coins, address, true);
    const sortedPrices = sortPrices(coinsOnWatchlist);
    return sortedPrices || [];
  }
);

export const initialWatchlistState: WatchlistState =
  watchlistAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
  });

export const watchlistSlice = createSlice({
  name: WATCHLIST_FEATURE_KEY,
  initialState: initialWatchlistState,
  reducers: {
    add: watchlistAdapter.addOne,
    remove: watchlistAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state: WatchlistState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchWatchlist.fulfilled,
        (
          state: WatchlistState,
          action: PayloadAction<ProcessedTokenData[]>
        ) => {
          watchlistAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchWatchlist.rejected, (state: WatchlistState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const watchlistReducer = watchlistSlice.reducer;

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
 *   dispatch(watchlistActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const watchlistActions = watchlistSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllWatchlist);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = watchlistAdapter.getSelectors();

export const getWatchlistState = (rootState: RootState): WatchlistState =>
  rootState[WATCHLIST_FEATURE_KEY];

export const selectAllWatchlist = createSelector(getWatchlistState, selectAll);

export const selectWatchlistLoadingStatus = createSelector(
  getWatchlistState,
  (state) => state.loadingStatus
);

export const selectWatchlistEntities = createSelector(
  getWatchlistState,
  selectEntities
);
