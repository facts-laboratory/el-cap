import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import redstone from 'redstone-api';
import { getPrices } from './el-cap-kit.js';

import { RootState } from '../store';

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

type RedstoneObject = { [ticker: string]: unknown };
type RemainingObject = {
  [index: string]: { symbol: string } & Record<string, unknown>;
};

export function mergeObjects(
  redstone: RedstoneObject,
  remaining: RemainingObject
): Array<unknown> {
  const redstoneLowered: Record<string, unknown> = Object.keys(redstone).reduce<
    Record<string, unknown>
  >((c, k) => {
    c[k.toLowerCase()] = redstone[k];
    return c;
  }, {});

  return Object.keys(remaining).map((key) => {
    const symbolLower = remaining[key].symbol.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(redstoneLowered, symbolLower)) {
      return { ...remaining[key], ...(redstoneLowered[symbolLower] as object) };
    } else {
      return remaining[key];
    }
  });
}

export function mergeSingleCoinObjects(
  redstone: RedstoneObject,
  remaining: RemainingObject
): Array<unknown> {
  console.log('redstone', redstone, 'remaining', remaining);
  const redstoneLowered: Record<string, unknown> = Object.keys(redstone).reduce<
    Record<string, unknown>
  >((c, k) => {
    c[k.toLowerCase()] = redstone[k];
    return c;
  }, {});

  return Object.keys(remaining).map((key) => {
    const symbolLower = remaining[key].symbol.toLowerCase();
    if (Object.prototype.hasOwnProperty.call(redstoneLowered, symbolLower)) {
      return { ...remaining[key], ...(redstoneLowered[symbolLower] as object) };
    } else {
      return remaining[key];
    }
  });
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
  'feed/fetchFeed',
  async (_, thunkAPI) => {
    try {
      console.log('fetching feed');
      const prices = await getPrices();
      const combinedPrices = mergeObjects(prices.redstone, prices.remaining);
      console.log('prices', prices, 'combined', combinedPrices);
      return combinedPrices;
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
