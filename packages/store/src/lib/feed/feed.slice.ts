import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import redstone from 'redstone-api';

import { RootState } from "../store";

export const FEED_FEATURE_KEY = 'feed';

/*
 * Update these interfaces according to your requirements.
 */
export interface FeedEntity {
  id: number;
}

export interface FeedState extends EntityState<FeedEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string | null;
}

export const feedAdapter = createEntityAdapter<FeedEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
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
 *   dispatch(fetchFeed())
 * }, [dispatch]);
 * ```
 */

export const fetchFeed = createAsyncThunk(
  'feed/fetchStatus',
  async (_, thunkAPI) => {
    try {
      console.log('fetching feed');
      const O = await redstone.getPrice(["BTC", "ETH", "BSC", "BNB", "ADA", "DOGE", "XRP", "DOT", "USDT", "SOL", "ICP", "UNI", "BCH", "LINK", "LTC", "MATIC", "XLM", "ETC", "VET", "THETA", "FIL", "TRX", "EOS", "SUSHI", "ATOM", "DAI", "AAVE", "XMR", "FTT", "ALGO", "CAKE", "HBAR", "KSM", "XTZ", "CEL", "NEO", "GRT", "SNX", "MIOTA", "MKR", "CRO", "COMP", "CHZ", "WAVES", "DCR", "HOT", "ZEC", "BAT", "RUNE", "MANA", "ENJ", "DASH", "SRM", "ZIL", "REN", "AVAX", "IOST", "KAVA", "OMG", "UMA", "QNT", "ZRX", "YFI", "CRV", "SXP", "1INCH", "LUNA", "FTM", "ANKR", "NANO", "CQT", "SC", "QTUM", "BNT", "BTT", "STX", "HNT", "OCEAN", "LSK", "AR", "SNT", "LRC", "BAL", "SUSHI", "CKB", "FLOW", "DODO", "CELO", "NEXO", "LPT", "HIVE", "MIR", "RSR", "NMR", "ARPA"]);
      console.log('O',O);
      const arr = Object.entries(O).map((item) => item[1]);
      console.log(arr);
      return arr;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const initialFeedState: FeedState = feedAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const feedSlice = createSlice({
  name: FEED_FEATURE_KEY,
  initialState: initialFeedState,
  reducers: {
    add: feedAdapter.addOne,
    remove: feedAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state: FeedState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchFeed.fulfilled,
        (state: FeedState, action: PayloadAction<FeedEntity[]>) => {
          feedAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchFeed.rejected, (state: FeedState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const feedReducer = feedSlice.reducer;

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
 *   dispatch(feedActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const feedActions = feedSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllFeed);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = feedAdapter.getSelectors();

export const getFeedState = (rootState: RootState): FeedState =>
  rootState[FEED_FEATURE_KEY];

export const selectAllFeed = createSelector(getFeedState, selectAll);

export const selectFeedLoadingStatus = createSelector(
  getFeedState,
  (state: FeedState) => state.loadingStatus
);

export const selectFeedEntities = createSelector(getFeedState, selectEntities);
