import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  mergeObjects,
  sortPrices,
  processTokenData,
  sortTopCoins,
} from '@el-cap/utilities';
import { TopCoins } from '@el-cap/interfaces';
import { getPrices } from './el-cap-kit.js';

import { RootState } from '../store';

export const FEED_FEATURE_KEY = 'feed';

/*
 * Update these interfaces according to your requirements.
 */
export interface FeedEntity {
  [index: string]: { symbol: string } & Record<string, unknown>;
}

export interface FeedState extends EntityState<FeedEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  topLoadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  topCoins: TopCoins;
}

export const feedAdapter = createEntityAdapter<FeedEntity>({
  selectId: (entity) => entity.coin,
});

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (key: string, thunkAPI) => {
    try {
      console.log('fetching feed', key);
      const { feed } = thunkAPI.getState() as RootState;
      const { entities } = feed;
      console.log('feedPage', feed, key);

      if (Object.keys(entities).length === 0) {
        // Run this if there are no entities
        const prices = await getPrices();
        console.log('Prices: ', prices); // Logging prices
        const combinedPrices = mergeObjects(prices.redstone, prices.remaining);

        const processedPrices = processTokenData(combinedPrices);
        console.log('Processed Prices: ', processedPrices); // Logging processedPrices

        const sortedPrices = sortPrices(processedPrices, key);
        console.log('Sorted Prices: ', sortedPrices); // Logging sortedPrices

        return sortedPrices;
      } else {
        const sortedPrices = sortPrices(entities, key);
        console.log('Sorted Prices: ', sortedPrices); // Logging sortedPrices

        return sortedPrices;
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const getTopCoins = createAsyncThunk(
  'feed/getTopCoins',
  async (_, thunkAPI) => {
    try {
      const { feed } = thunkAPI.getState() as RootState;
      const { entities } = feed;
      console.log('Fetching top coins');

      // Process and sort the data
      const sortedTopCoins = sortTopCoins(entities);

      return sortedTopCoins;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch top coins');
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
          console.log('loaded feed', action.payload);
          feedAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchFeed.rejected, (state: FeedState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(getTopCoins.pending, (state: FeedState) => {
        state.topLoadingStatus = 'loading';
      })
      .addCase(
        getTopCoins.fulfilled,
        (state: FeedState, action: PayloadAction<TopCoins[]>) => {
          state.topCoins = action.payload;
          state.topLoadingStatus = 'loaded';
        }
      )
      .addCase(getTopCoins.rejected, (state: FeedState, action) => {
        state.topLoadingStatus = 'error';
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

export const selectTopLoadingStatus = createSelector(
  getFeedState,
  (state: FeedState) => state.topLoadingStatus
);

export const selectTopCoins = createSelector(
  getFeedState,
  (state: FeedState) => state.topCoins
);
